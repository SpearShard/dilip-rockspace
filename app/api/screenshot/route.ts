import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false`
    );
    const data = await res.json();

    if (data?.data?.screenshot?.url) {
      return NextResponse.redirect(data.data.screenshot.url);
    }

    return NextResponse.json({ error: 'No screenshot' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
