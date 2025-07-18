import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get("url");
  
  if (!imageUrl) {
    return NextResponse.json(
      { error: "Image URL is required" },
      { status: 400 }
    );
  }

  try {
    // 네이버 블로그 이미지인지 확인
    const url = new URL(imageUrl);
    if (!url.hostname.includes("pstatic.net")) {
      // 네이버 이미지가 아니면 원본 URL 그대로 리다이렉트
      return NextResponse.redirect(imageUrl);
    }

    // 네이버 이미지는 프록시로 가져오기
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Referer": "https://blog.naver.com/",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType || "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}