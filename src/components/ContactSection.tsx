"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

import { useScrollTrigger } from "./useScrollTrigger";
import styles from "./ContactSection.module.css";

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
  const { ref: birdRef, visible: birdVisible } = useScrollTrigger(0.3);
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState<Step>("input");
  const [errors, setErrors] = useState<FormErrors>({});
  const [agreeError, setAgreeError] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const [recaptchaKey, setRecaptchaKey] = useState(0);

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
    const sitekeySet = !!RECAPTCHA_SITE_KEY;
    const recaptchaFailed = sitekeySet && !recaptchaToken;
    setRecaptchaError(recaptchaFailed);
    if (Object.keys(errs).length > 0 || !agreed || recaptchaFailed) return;
    setStep("confirm");
    scrollToContact();
  };

  // ── 送信する ────────────────────────────────────
  const handleSubmit = async () => {
    setStep("sending");
    try {
      // TODO: フォーム送信バックエンド接続
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStep("complete");
      setFormData(EMPTY_FORM);
      setAgreed(false);
    } catch {
      setStep("error");
    }
  };

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
    setRecaptchaToken(null);
    setRecaptchaError(false);
    setRecaptchaKey((k) => k + 1);
    scrollToContact();
  };

  return (
    <section id="contact" className={styles.contact}>
      {/* Bird decoration */}
      <div
        ref={birdRef}
        className={`${styles.birdWrap} ${birdVisible ? styles.birdVisible : ""}`}
      >
        <svg
          className={styles.bird}
          width="100"
          height="60"
          viewBox="0 0 120 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 40C40 20 15 15 2 25C15 20 35 22 50 35L45 30C30 18 10 18 2 25"
            fill="#7BBEC8"
            opacity="0.9"
          />
          <path
            d="M60 40C80 20 105 15 118 25C105 20 85 22 70 35L75 30C90 18 110 18 118 25"
            fill="#7BBEC8"
            opacity="0.9"
          />
          <ellipse cx="60" cy="42" rx="8" ry="5" fill="#7BBEC8" />
          <path d="M52 42L30 55L35 48" fill="#7BBEC8" opacity="0.7" />
        </svg>
      </div>

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
          <h2 className={`${styles.title} font-tsuku`}>お問い合わせ</h2>
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
            {RECAPTCHA_SITE_KEY && (
              <div className={styles.recaptchaWrap}>
                <ReCAPTCHA
                  key={recaptchaKey}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(token) => {
                    setRecaptchaToken(token);
                    if (token) setRecaptchaError(false);
                  }}
                  onExpired={() => setRecaptchaToken(null)}
                />
                {recaptchaError && (
                  <p className={styles.errorMsg}>reCAPTCHA を完了してください</p>
                )}
              </div>
            )}
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
            <h3 className={`${styles.completeTitle} font-tsuku`}>
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
