"use client";

import Image from "next/image";
import { useState } from "react";
import { useScrollTrigger } from "./useScrollTrigger";
import styles from "./ContactSection.module.css";

type FormData = {
  name: string;
  email: string;
  emailConfirm: string;
  phone: string;
  message: string;
};

type Step = "input" | "confirm" | "sending" | "complete" | "error";

const EMPTY_FORM: FormData = {
  name: "",
  email: "",
  emailConfirm: "",
  phone: "",
  message: "",
};

export default function ContactSection() {
  const { ref: birdRef, visible: birdVisible } = useScrollTrigger(0.3);
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState<Step>("input");

  // ── 確認画面へ進む ──────────────────────────────
  const handleToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("プライバシーポリシーに同意してください");
      return;
    }
    if (formData.email !== formData.emailConfirm) {
      alert("メールアドレスが一致しません。ご確認ください。");
      return;
    }
    setStep("confirm");
    window.scrollTo({ top: 0, behavior: "smooth" });
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
  };

  // ── 最初に戻る ──────────────────────────────────
  const handleReset = () => {
    setStep("input");
    setFormData(EMPTY_FORM);
    setAgreed(false);
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
          <p className={styles.contactPerson}>担当: 平大路拓也</p>
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <input
                type="email"
                placeholder="メールアドレス（確認用） *"
                required
                value={formData.emailConfirm}
                onChange={(e) => setFormData({ ...formData, emailConfirm: e.target.value })}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <input
                type="tel"
                placeholder="電話番号"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={styles.input}
              />
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
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span>プライバシーポリシーに同意する</span>
              </label>
            </div>
            <div className={styles.submit}>
              <button type="submit" className="c-moreBtn">
                確認画面へ
              </button>
            </div>
          </form>
        )}

        {/* ══ STEP 2: 確認画面 ══ */}
        {(step === "confirm" || step === "sending") && (
          <div className={styles.confirmWrap}>
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
            <button
              onClick={handleReset}
              className="c-moreBtn"
              style={{ marginTop: 32 }}
            >
              トップへ戻る
            </button>
          </div>
        )}

        {/* エラー（確認画面以外で出た場合のフォールバック） */}
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
