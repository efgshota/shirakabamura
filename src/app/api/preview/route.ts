import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");
  const contentId = searchParams.get("contentId");
  const draftKey = searchParams.get("draftKey");

  if (!process.env.MICROCMS_PREVIEW_SECRET || secret !== process.env.MICROCMS_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  if (!contentId || !draftKey) {
    return new Response("Missing contentId or draftKey", { status: 400 });
  }

  (await draftMode()).enable();
  redirect(`/property/${contentId}?draftKey=${draftKey}`);
}
