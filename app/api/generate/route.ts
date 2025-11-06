import { NextRequest, NextResponse } from 'next/server';

function buildPollinationsUrl(prompt: string) {
  const encoded = encodeURIComponent(prompt.trim());
  // Using seed for variability and width/height for decent resolution
  return `https://image.pollinations.ai/prompt/${encoded}?n=1&width=768&height=768&seed=${Math.floor(Math.random()*1e9)}`;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return new NextResponse('Invalid prompt', { status: 400 });
    }

    const url = buildPollinationsUrl(prompt);

    // Optionally, we could proxy the image bytes. For now return the URL for performance.
    return NextResponse.json({ url });
  } catch (e) {
    return new NextResponse('Bad request', { status: 400 });
  }
}
