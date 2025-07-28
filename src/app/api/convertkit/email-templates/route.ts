import { NextResponse } from "next/server";

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
  // TODO 상수 데이터 분리
  const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
  const CONVERTKIT_BASE_URL = "https://api.kit.com/v4";

  if (!CONVERTKIT_API_KEY) {
    return NextResponse.json(
      { error: "ConvertKit API 키가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  try {
    // Kit v4 API는 X-Kit-Api-Key 헤더를 사용합니다
    // per_page 파라미터로 10개만 요청, cursor가 있으면 추가
    const url = new URL(`${CONVERTKIT_BASE_URL}/email_templates`);
    url.searchParams.append("per_page", "10");
    if (cursor) {
      url.searchParams.append("after", cursor);
    }

    const response = await fetch(url.toString(), {
      headers: {
        "X-Kit-Api-Key": CONVERTKIT_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ConvertKit API 응답 오류:", response.status, errorText);

      let errorMessage = `ConvertKit API 오류: ${response.status}`;
      if (response.status === 401) {
        errorMessage =
          "ConvertKit API 키가 유효하지 않습니다. API 키를 확인해주세요.";
      } else if (response.status === 403) {
        errorMessage =
          "ConvertKit API 접근 권한이 없습니다. 계정 권한을 확인해주세요.";
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
        error: "ConvertKit 이메일 템플릿을 가져오는 중 오류가 발생했습니다.",
        details: error instanceof Error ? error.message : "알 수 없는 오류",
      },
      { status: 500 },
    );
  }
}
