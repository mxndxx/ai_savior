import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
  const CONVERTKIT_BASE_URL = "https://api.kit.com/v4";

  if (!CONVERTKIT_API_KEY) {
    return NextResponse.json(
      { error: "ConvertKit API 키가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `${CONVERTKIT_BASE_URL}/broadcasts/${params.id}`,
      {
        headers: {
          "X-Kit-Api-Key": CONVERTKIT_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ConvertKit API 응답 오류:", response.status, errorText);

      if (response.status === 404) {
        return NextResponse.json(
          { error: "브로드캐스트를 찾을 수 없습니다." },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          error: `ConvertKit API 오류: ${response.status}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data.broadcast);
  } catch (error) {
    console.error("ConvertKit 브로드캐스트 가져오기 실패:", error);
    return NextResponse.json(
      {
        error: "브로드캐스트를 가져오는 중 오류가 발생했습니다.",
        details: error instanceof Error ? error.message : "알 수 없는 오류",
      },
      { status: 500 }
    );
  }
}