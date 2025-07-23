import { NextResponse } from "next/server";
import crypto from "crypto";

const SOLAPI_API_KEY = process.env.SOLAPI_API_KEY;
const SOLAPI_API_SECRET = process.env.SOLAPI_API_SECRET;

function generateSignature(apiSecret: string, date: string, salt: string) {
  const data = date + salt;
  return crypto.createHmac("sha256", apiSecret).update(data).digest("hex");
}

export async function GET(request: Request) {
  try {
    if (!SOLAPI_API_KEY || !SOLAPI_API_SECRET) {
      return NextResponse.json(
        { error: "Solapi API credentials not configured" },
        { status: 500 },
      );
    }

    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");

    // Generate auth headers
    const date = new Date().toISOString();
    const salt = crypto.randomBytes(64).toString("hex");
    const signature = generateSignature(SOLAPI_API_SECRET, date, salt);

    // Solapi API endpoint for Kakao Alimtalk templates
    const baseUrl = "https://api.solapi.com/kakao/v1/templates";
    const url = new URL(baseUrl);

    if (cursor) {
      url.searchParams.append("startKey", cursor);
    }

    // Add limit
    url.searchParams.append("limit", "10");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `HMAC-SHA256 apiKey=${SOLAPI_API_KEY}, date=${date}, salt=${salt}, signature=${signature}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Solapi API error:", errorText);
      return NextResponse.json(
        { error: `Solapi API error: ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    console.log(data);

    // Transform the response to match our interface
    const templates =
      data.templateList?.map((template: any) => ({
        id: template.templateId,
        templateId: template.templateId,
        name: template.name,
        emphasizeTitle: template.emphasizeTitle,
        emphasizeSubtitle: template.emphasizeSubtitle,
        content: template.content,
        dateCreated: template.dateCreated,
        dateUpdated: template.dateUpdated,
      })) || [];

    // console.log("템플릿 api 호출: ", templates);

    return NextResponse.json({
      templates,
      nextCursor: data.nextKey || null,
    });
  } catch (error) {
    console.error("Failed to fetch Solapi templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 },
    );
  }
}
