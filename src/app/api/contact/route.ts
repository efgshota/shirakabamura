import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const ADMIN_EMAIL = "shirakabamura@cfquod.jp";
const FROM_EMAIL = "noreply@shirakabamura.com";
const SITE_NAME = "白樺村";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "メール送信が設定されていません" }, { status: 500 });
  }
  const resend = new Resend(apiKey);

  try {
    const { name, email, phone, message, recaptchaToken } = await req.json();

    // 必須項目チェック
    if (!name || !email || !message) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
    }

    // reCAPTCHA v3 サーバーサイド検証（スコア 0.5 未満はボットと判定）
    if (process.env.RECAPTCHA_SECRET_KEY) {
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success || verifyData.score < 0.5) {
        return NextResponse.json({ error: "スパムの疑いがあるため送信できませんでした" }, { status: 400 });
      }
    }

    // ── 管理者への通知メール ──────────────────────────
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `【${SITE_NAME}】お問い合わせ：${name} 様`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #253c30;">
          <h2 style="color: #253c30; border-bottom: 2px solid #94b3ba; padding-bottom: 8px;">
            新しいお問い合わせが届きました
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; width: 120px; font-weight: bold; color: #94b3ba;">
                お名前
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                ${name}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #94b3ba;">
                メール
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                <a href="mailto:${email}" style="color: #253c30;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #94b3ba;">
                電話番号
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                ${phone}
              </td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #94b3ba; vertical-align: top;">
                本文
              </td>
              <td style="padding: 12px 0; white-space: pre-wrap;">
                ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
              </td>
            </tr>
          </table>
          <p style="margin-top: 32px; font-size: 12px; color: #999;">
            このメールは ${SITE_NAME}（shirakabamura.com）のお問い合わせフォームから自動送信されました。
          </p>
        </div>
      `,
    });

    // ── ユーザーへの自動返信メール ──────────────────────
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `【${SITE_NAME}】お問い合わせを受け付けました`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #253c30;">
          <h2 style="color: #253c30; border-bottom: 2px solid #94b3ba; padding-bottom: 8px;">
            お問い合わせありがとうございます
          </h2>
          <p style="line-height: 1.8; margin-top: 24px;">
            ${name} 様<br><br>
            白樺村へのお問い合わせを受け付けました。<br>
            内容を確認の上、担当者より改めてご連絡いたします。<br>
            しばらくお待ちください。
          </p>
          <div style="background: #f4f4f0; border-radius: 8px; padding: 20px; margin-top: 32px;">
            <h3 style="margin: 0 0 16px; font-size: 14px; color: #94b3ba;">送信内容の確認</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; width: 100px; font-weight: bold; color: #94b3ba;">
                  お名前
                </td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #94b3ba;">
                  メール
                </td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                  ${email}
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #94b3ba;">
                  電話番号
                </td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                  ${phone}
                </td>
              </tr>
              ` : ""}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #94b3ba; vertical-align: top;">
                  本文
                </td>
                <td style="padding: 8px 0; white-space: pre-wrap; font-size: 13px;">
                  ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                </td>
              </tr>
            </table>
          </div>
          <p style="margin-top: 32px; line-height: 1.8;">
            白樺村<br>
            <a href="https://shirakabamura.com" style="color: #94b3ba;">shirakabamura.com</a>
          </p>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            ※ このメールは自動送信です。このメールへの返信はできません。
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}
