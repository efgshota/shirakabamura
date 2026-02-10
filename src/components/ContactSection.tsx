"use client";

import Image from "next/image";
import { useState } from "react";
import { useScrollTrigger } from "./useScrollTrigger";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const { ref: birdRef, visible: birdVisible } = useScrollTrigger(0.3);
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("プライバシーポリシーに同意してください");
      return;
    }
    setStatus("sending");
    try {
      // TODO: フォーム送信バックエンド接続
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("sent");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      {/* Bird decoration above contact */}
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

        {status === "sent" ? (
          <div className={styles.thanks}>
            <p>お問い合わせありがとうございます。</p>
            <p>内容を確認の上、折り返しご連絡いたします。</p>
            <button
              onClick={() => setStatus("idle")}
              className="c-moreBtn"
              style={{ marginTop: 24 }}
            >
              新しいお問い合わせ
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="お名前 *"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <input
                type="email"
                placeholder="メールアドレス *"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <input
                type="tel"
                placeholder="電話番号"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <textarea
                placeholder="本文 *"
                required
                rows={10}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
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
            {status === "error" && (
              <p className={styles.error}>
                送信に失敗しました。もう一度お試しください。
              </p>
            )}
            <div className={styles.submit}>
              <button
                type="submit"
                disabled={status === "sending"}
                className="c-moreBtn"
              >
                {status === "sending" ? "送信中..." : "入力確認画面へ"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
