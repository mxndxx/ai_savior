import { NextResponse } from "next/server";
import { CONVERTKIT_CONFIG, CONVERTKIT_ERROR_MESSAGES } from "@/constants/convertkit";

interface ConvertKitEmailTemplate {
  id: number;
  name: string;
  is_default: boolean;
  category: string;
}

interface ConvertKitEmailTemplatesResponse {
  email_templates: ConvertKitEmailTemplate[];
  pagination: {
    has_previous_page: boolean;
    has_next_page: boolean;
    start_cursor: string;
    end_cursor: string;
    per_page: number;
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");

  if (!CONVERTKIT_CONFIG.API_KEY) {
    return NextResponse.json(
      { error: CONVERTKIT_ERROR_MESSAGES.NO_API_KEY },
      { status: 500 },
    );
  }

  try {
    // Kit v4 API는 X-Kit-Api-Key 헤더를 사용합니다
    // per_page 파라미터로 10개만 요청, cursor가 있으면 추가
    const url = new URL(`${CONVERTKIT_CONFIG.BASE_URL}${CONVERTKIT_CONFIG.ENDPOINTS.EMAIL_TEMPLATES}`);
    url.searchParams.append("per_page", CONVERTKIT_CONFIG.PAGINATION.DEFAULT_PER_PAGE.toString());
    if (cursor) {
      url.searchParams.append("after", cursor);
    }

    const response = await fetch(url.toString(), {
      headers: {
        [CONVERTKIT_CONFIG.HEADERS.API_KEY_HEADER]: CONVERTKIT_CONFIG.API_KEY!,
        "Content-Type": CONVERTKIT_CONFIG.HEADERS.CONTENT_TYPE,
      },
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

    const data: ConvertKitEmailTemplatesResponse = await response.json();
    // console.log(data);
    return NextResponse.json({
      email_templates: data.email_templates,
      nextCursor: data.pagination.has_next_page
        ? data.pagination.end_cursor
        : null,
    });
  } catch (error) {
    console.error("ConvertKit 이메일 템플릿 가져오기 실패:", error);
    return NextResponse.json(
      {
        error: CONVERTKIT_ERROR_MESSAGES.EMAIL_TEMPLATES_FETCH_ERROR,
        details: error instanceof Error ? error.message : CONVERTKIT_ERROR_MESSAGES.UNKNOWN_ERROR,
      },
      { status: 500 },
    );
  }
}
