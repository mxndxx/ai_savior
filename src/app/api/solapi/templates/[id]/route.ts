import { NextResponse } from "next/server";
import crypto from "crypto";

const SOLAPI_API_KEY = process.env.SOLAPI_API_KEY;
const SOLAPI_API_SECRET = process.env.SOLAPI_API_SECRET;

function generateSignature(apiSecret: string, date: string, salt: string) {
  const data = date + salt;
  return crypto.createHmac("sha256", apiSecret).update(data).digest("hex");
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    if (!SOLAPI_API_KEY || !SOLAPI_API_SECRET) {
      return NextResponse.json(
        { error: "Solapi API credentials not configured" },
        { status: 500 },
      );
    }

    const templateId = params.id;

    // Generate auth headers
    const date = new Date().toISOString();
    const salt = crypto.randomBytes(64).toString("hex");
    const signature = generateSignature(SOLAPI_API_SECRET, date, salt);

    // Solapi API endpoint
    const url = `https://api.solapi.com/kakao/v1/templates/${templateId}`;

    const response = await fetch(url, {
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

    const template = await response.json();

    console.log("Solapi template API response:", template);

    // Transform the response to match our interface
    return NextResponse.json({
      id: template.templateId,
      templateId: template.templateId,
      name: template.name || template.templateName || "",
      emphasizeTitle: template.emphasizeTitle || "",
      emphasizeSubtitle: template.emphasizeSubtitle || "",
      content:
        template.content ||
        template.templateContent ||
        template.templateBody ||
        "",
      dateCreated: template.dateCreated,
      dateUpdated: template.dateUpdated,
      status: template.status,
    });
  } catch (error) {
    console.error("Failed to fetch Solapi template:", error);
    return NextResponse.json(
      { error: "Failed to fetch template" },
      { status: 500 },
    );
  }
}
