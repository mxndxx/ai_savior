import { NextResponse } from "next/server";
import { CONVERTKIT_CONFIG, CONVERTKIT_ERROR_MESSAGES } from "@/constants/convertkit";

export async function POST(request: Request) {
  if (!CONVERTKIT_CONFIG.API_KEY) {
    return NextResponse.json(
      { error: CONVERTKIT_ERROR_MESSAGES.NO_API_KEY },
      { status: 500 },
    );
  }

  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "태그 이름이 필요합니다." },
        { status: 400 },
      );
    }

    const response = await fetch(`${CONVERTKIT_CONFIG.BASE_URL}${CONVERTKIT_CONFIG.ENDPOINTS.TAGS}`, {
      method: "POST",
      headers: {
        [CONVERTKIT_CONFIG.HEADERS.API_KEY_HEADER]: CONVERTKIT_CONFIG.API_KEY!,
        "Content-Type": CONVERTKIT_CONFIG.HEADERS.CONTENT_TYPE,
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ConvertKit API 응답 오류:", response.status, errorText);

      let errorMessage = `ConvertKit API 오류: ${response.status}`;
      if (response.status === 401) {
        errorMessage = CONVERTKIT_ERROR_MESSAGES.INVALID_API_KEY;
      } else if (response.status === 403) {
        errorMessage = CONVERTKIT_ERROR_MESSAGES.NO_PERMISSION;
      }

      return NextResponse.json(
        {
          error: errorMessage,
          details: errorText,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("ConvertKit 태그 생성 실패:", error);
    return NextResponse.json(
      {
        error: CONVERTKIT_ERROR_MESSAGES.TAG_CREATION_ERROR,
        details: error instanceof Error ? error.message : CONVERTKIT_ERROR_MESSAGES.UNKNOWN_ERROR,
      },
      { status: 500 },
    );
  }
}
