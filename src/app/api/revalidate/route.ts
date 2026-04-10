import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("X-MICROCMS-Signature");

  if (!process.env.MICROCMS_WEBHOOK_SECRET || secret !== process.env.MICROCMS_WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // microCMS のコンテンツ更新時に全関連ページを再生成
    revalidatePath("/");
    revalidatePath("/property");
    revalidatePath("/property/[slug]", "page");
    revalidatePath("/news");
    revalidatePath("/news/[slug]", "page");
    revalidatePath("/stories");
    revalidatePath("/stories/[slug]", "page");
    revalidatePath("/info");

    return Response.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return new Response("Revalidation failed", { status: 500 });
  }
}
