"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

import { useScrollTrigger } from "./useScrollTrigger";
import styles from "./ContactSection.module.css";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
const RECAPTCHA_SCRIPT_ID = "grecaptcha-v3-script";

type GrecaptchaLike = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

// react-google-recaptcha-v3 のProviderを使うと、api.jsの`?render=KEY`による自動レンダーと
// ライブラリ側の手動 grecaptcha.render が競合し "Invalid site key or not loaded" が出ていた。
// ここでは素のGoogle reCAPTCHAスクリプトを直接扱うシンプルな実装に切り替える。
const ensureRecaptchaScript = () => {
  if (!RECAPTCHA_SITE_KEY) return;
  if (typeof document === "undefined") return;
  if (document.getElementById(RECAPTCHA_SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = RECAPTCHA_SCRIPT_ID;
  script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};

const waitForGrecaptcha = (timeoutMs = 5000) =>
  new Promise<GrecaptchaLike | null>((resolve) => {
    const start = Date.now();
    const tick = () => {
      if (typeof window !== "undefined") {
        const g = (window as unknown as { grecaptcha?: GrecaptchaLike }).grecaptcha;
        if (g && typeof g.ready === "function" && typeof g.execute === "function") {
          resolve(g);
          return;
        }
      }
      if (Date.now() - start >= timeoutMs) {
        resolve(null);
        return;
      }
      setTimeout(tick, 100);
    };
    tick();
  });

const getRecaptchaToken = async (action: string): Promise<string> => {
  if (!RECAPTCHA_SITE_KEY) throw new Error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set");
  const g = await waitForGrecaptcha();
  if (!g) throw new Error("grecaptcha did not become ready within 5s");
  return new Promise<string>((resolve, reject) => {
    g.ready(async () => {
      try {
        const token = await g.execute(RECAPTCHA_SITE_KEY, { action });
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  });
};

type FormData = {
  name: string;
  email: string;
  emailConfirm: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type Step = "input" | "confirm" | "sending" | "complete" | "error";

const EMPTY_FORM: FormData = {
  name: "",
  email: "",
  emailConfirm: "",
  phone: "",
  message: "",
};

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);


const isValidPhone = (v: string) => {
  const digits = v.replace(/[\-\s\(\)\+]/g, "");
  return /^\d{10,11}$/.test(digits);
};

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function ContactSection() {
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState<Step>("input");
  const [errors, setErrors] = useState<FormErrors>({});
  const [agreeError, setAgreeError] = useState(false);
  // ContactSection がマウントされた時点でreCAPTCHAスクリプトの読み込みを開始する。
  // ページ全体にProviderを置く必要はなく、このセクションで完結させる。
  useEffect(() => {
    ensureRecaptchaScript();
  }, []);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!isValidEmail(formData.email)) {
      e.email = "正しいメールアドレスを入力してください";
    }
    if (formData.email !== formData.emailConfirm) {
      e.emailConfirm = "メールアドレスが一致しません";
    }
    if (formData.phone && !isValidPhone(formData.phone)) {
      e.phone = "電話番号は10〜11桁の数字で入力してください（ハイフン可）";
    }
    return e;
  };

  // ── 確認画面へ進む ──────────────────────────────
  const handleToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setAgreeError(!agreed);
    if (Object.keys(errs).length > 0 || !agreed) return;
    setStep("confirm");
    scrollToContact();
  };

  // ── 送信する ────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    setStep("sending");

    // reCAPTCHA v3 トークン取得（見えない検証）
    // 素のGoogle reCAPTCHA APIを直接呼ぶ。失敗しても送信は継続しサーバー側の判定に委ねる。
    let recaptchaToken: string | null = null;
    if (RECAPTCHA_SITE_KEY) {
      try {
        recaptchaToken = await getRecaptchaToken("contact_form");
      } catch (err) {
        console.error("[contact] getRecaptchaToken failed:", err);
      }
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          recaptchaToken,
        }),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        console.error("[contact] POST /api/contact failed:", res.status, body);
        throw new Error(`Send failed (${res.status})`);
      }
      setStep("complete");
      setFormData(EMPTY_FORM);
      setAgreed(false);
    } catch (err) {
      console.error("[contact] submit error:", err);
      setStep("error");
    }
  }, [formData]);

  // ── 入力に戻る ──────────────────────────────────
  const handleBack = () => {
    setStep("input");
    scrollToContact();
  };

  // ── 最初に戻る ──────────────────────────────────
  const handleReset = () => {
    setStep("input");
    setFormData(EMPTY_FORM);
    setAgreed(false);
    setErrors({});
    setAgreeError(false);
    scrollToContact();
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        {/* タイトル */}
        <div
          ref={titleRef}
          className={`${styles.titleWrap} ${titleVisible ? styles.visible : ""}`}
        >
          <div className={styles.titleIcon}>
            <Image
              src="/images/common/icon_contact.svg"
              alt=""
              width={134}
              height={134}
            />
          </div>
          <h2 className={styles.title}>お問い合わせ</h2>
        </div>

        {/* ── ステップインジケーター ── */}
        {step !== "complete" && (
          <div className={styles.steps}>
            <div className={`${styles.step} ${step === "input" ? styles.stepActive : styles.stepDone}`}>
              <span className={styles.stepNum}>1</span>
              <span className={styles.stepLabel}>入力</span>
            </div>
            <div className={styles.stepLine} />
            <div className={`${styles.step} ${step === "confirm" || step === "sending" ? styles.stepActive : ""}`}>
              <span className={styles.stepNum}>2</span>
              <span className={styles.stepLabel}>確認</span>
            </div>
            <div className={styles.stepLine} />
            <div className={styles.step}>
              <span className={styles.stepNum}>3</span>
              <span className={styles.stepLabel}>完了</span>
            </div>
          </div>
        )}

        {/* ══ STEP 1: 入力フォーム ══ */}
        {step === "input" && (
          <form onSubmit={handleToConfirm} className={styles.form}>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="お名前 *"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <input
                type="email"
                placeholder="メールアドレス *"
                required
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              />
              {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
            </div>
            <div className={styles.field}>
              <input
                type="email"
                placeholder="メールアドレス（確認用） *"
                required
                value={formData.emailConfirm}
                onChange={(e) => {
                  setFormData({ ...formData, emailConfirm: e.target.value });
                  if (errors.emailConfirm) setErrors({ ...errors, emailConfirm: undefined });
                }}
                className={`${styles.input} ${errors.emailConfirm ? styles.inputError : ""}`}
              />
              {errors.emailConfirm && <p className={styles.errorMsg}>{errors.emailConfirm}</p>}
            </div>
            <div className={styles.field}>
              <input
                type="tel"
                placeholder="電話番号"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
              />
              {errors.phone && <p className={styles.errorMsg}>{errors.phone}</p>}
            </div>
            <div className={styles.field}>
              <textarea
                placeholder="本文 *"
                required
                rows={10}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={styles.textarea}
              />
            </div>
            <div className={styles.checkField}>
              <label className={styles.checkLabel}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    if (agreeError) setAgreeError(false);
                  }}
                />
                <span>プライバシーポリシーに同意する</span>
              </label>
              {agreeError && (
                <p className={styles.errorMsg}>プライバシーポリシーに同意してください</p>
              )}
            </div>
            <div className={styles.submit}>
              <button type="submit" className={`c-moreBtn ${styles.submitBtn}`}>
                確認画面へ
              </button>
            </div>
          </form>
        )}

        {/* ══ STEP 2: 確認画面 ══ */}
        {(step === "confirm" || step === "sending") && (
          <div className={styles.confirmWrap}>
            <p className={styles.confirmWarning}>
              まだお問い合わせは完了していません。以下の内容でお間違いなければ送信するを押してください。
            </p>
            <p className={styles.confirmNote}>
              以下の内容でお間違いなければ「送信する」を押してください。
            </p>
            <dl className={styles.confirmList}>
              <div className={styles.confirmRow}>
                <dt className={styles.confirmLabel}>お名前</dt>
                <dd className={styles.confirmValue}>{formData.name}</dd>
              </div>
              <div className={styles.confirmRow}>
                <dt className={styles.confirmLabel}>メールアドレス</dt>
                <dd className={styles.confirmValue}>{formData.email}</dd>
              </div>
              {formData.phone && (
                <div className={styles.confirmRow}>
                  <dt className={styles.confirmLabel}>電話番号</dt>
                  <dd className={styles.confirmValue}>{formData.phone}</dd>
                </div>
              )}
              <div className={styles.confirmRow}>
                <dt className={styles.confirmLabel}>本文</dt>
                <dd className={`${styles.confirmValue} ${styles.confirmMessage}`}>
                  {formData.message.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < formData.message.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <div className={styles.confirmActions}>
              <button
                type="button"
                onClick={handleBack}
                disabled={step === "sending"}
                className={`${styles.backBtn} c-moreBtn`}
              >
                入力に戻る
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={step === "sending"}
                className="c-moreBtn"
              >
                {step === "sending" ? "送信中..." : "送信する"}
              </button>
            </div>
          </div>
        )}

        {/* ══ STEP 3: 完了画面 ══ */}
        {step === "complete" && (
          <div className={styles.complete}>
            <div className={styles.completeIcon}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="32" cy="32" r="31" stroke="#94b3ba" strokeWidth="2" />
                <path
                  d="M18 32L27 41L46 22"
                  stroke="#94b3ba"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className={styles.completeTitle}>
              送信が完了しました
            </h3>
            <p className={styles.completeText}>
              お問い合わせいただきありがとうございます。
              <br />
              内容を確認の上、担当者より折り返しご連絡いたします。
              <br />
              しばらくお待ちください。
            </p>
            <p className={styles.completeNote}>
              この後 shirakabamura@cfquod.jp からご連絡します。
              <br />
              cfquod.jp ドメインのメールが迷惑メールフォルダに振り分けられる可能性がありますので、受信設定や迷惑メールフォルダのご確認をお願いします。
            </p>
            <button
              onClick={handleReset}
              className="c-moreBtn"
              style={{ marginTop: 32 }}
            >
              トップへ戻る
            </button>
          </div>
        )}

        {/* エラー */}
        {step === "error" && (
          <div className={styles.errorWrap}>
            <p className={styles.error}>
              送信に失敗しました。お手数ですが、もう一度お試しください。
            </p>
            <button onClick={handleBack} className="c-moreBtn" style={{ marginTop: 24 }}>
              戻る
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
