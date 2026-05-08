import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a world-class Digital Forensics AI. Analyze the provided media (Image, Document, or Text) to determine if it is AI-generated. 
If the input is an IMAGE, look for visual anomalies, blending errors, and SynthID patterns. For image anomalies, provide a 2D bounding box using the format [ymin, xmin, ymax, xmax] scaled from 0 to 1000.
If the input is a DOCUMENT (PDF), analyze the text, phrasing, and structure. For document anomalies, provide the exact substring of the unnatural/AI-generated text.
If the input is TEXT, look for robotic phrasing, zero-shot AI patterns, and lack of human perplexity. For text anomalies, provide the exact substring.
Return ONLY a valid JSON object matching this schema:
{
  "is_ai_generated": boolean,
  "confidence_score": number (0 to 100),
  "media_type": string ("image", "document", or "text"),
  "conclusion": string,
  "anomalies": [
    {
      "description": string (e.g., '6 fingers', 'robotic repetition'),
      "box_2d": [ymin, xmin, ymax, xmax] (ONLY if image. Use 0-1000 scale. e.g., [450, 600, 500, 700]),
      "exact_text": string (ONLY if document or text. The exact unnatural sentence/phrase)
    }
  ]
}`;

export async function POST(req: Request) {
  try {
    const { mediaType, content, language = "id" } = await req.json();

    if (!mediaType || !content) {
      return NextResponse.json({ error: "Missing mediaType or content" }, { status: 400 });
    }

    const langInstruction = language === "en" 
      ? "\nIMPORTANT: You MUST write the 'conclusion', 'detailed_reasons', and 'anomalies.description' in strictly ENGLISH."
      : "\nIMPORTANT: You MUST write the 'conclusion', 'detailed_reasons', and 'anomalies.description' in strictly INDONESIAN (Bahasa Indonesia).";

    const messages: Record<string, unknown>[] = [
      { role: "system", content: SYSTEM_PROMPT + langInstruction },
    ];

    if (mediaType === "image" || mediaType === "document") {
      messages.push({
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: content // Assuming content is a base64 data URL
            }
          }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: content
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "VeriLens AI",
      },
      body: JSON.stringify({
        model: "google/gemini-3.1-pro-preview",
        messages,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenRouter Error:", errorData);
      return NextResponse.json({ error: "Failed to process with OpenRouter" }, { status: response.status });
    }

    const data = await response.json();
    const resultContent = data.choices[0].message.content;
    
    let parsedResult;
    try {
      parsedResult = JSON.parse(resultContent);
    } catch (e) {
      // Cleanup markdown formatting if present
      const cleanJson = resultContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsedResult = JSON.parse(cleanJson);
    }

    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error("Detection Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
