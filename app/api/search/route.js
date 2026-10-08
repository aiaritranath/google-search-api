import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// ---------- Creator info (returned in every response) ----------
const CREATOR = {
  name: 'Aritra Nath',
  owner: '@its_aritra_nath',
  instagram: '@its_aritra_nath',
  instagram_url: 'https://instagram.com/its_aritra_nath',
  api_name: 'Google Search API',
  version: '1.0.0',
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
};

function reply(body, status = 200) {
  return NextResponse.json(body, { status, headers: CORS_HEADERS });
}

// ---------- Handle preflight ----------
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // Key can come from ?key=  OR  header  x-api-key
  const key = searchParams.get('key') || request.headers.get('x-api-key');
  const query = searchParams.get('search') || searchParams.get('q');
  const num = Math.min(Math.max(parseInt(searchParams.get('num') || '10', 10) || 10, 1), 10);
  const start = Math.min(Math.max(parseInt(searchParams.get('start') || '1', 10) || 1, 1), 91);

  // ---------- Auth ----------
  if (!key) {
    return reply(
      { success: false, error: 'Missing API key', hint: 'Add ?key=YOUR_KEY to the URL', creator: CREATOR },
      401
    );
  }

  if (key !== process.env.API_KEY) {
    return reply({ success: false, error: 'Invalid API key', creator: CREATOR }, 403);
  }

  // ---------- Validate query ----------
  if (!query || !query.trim()) {
    return reply(
      { success: false, error: 'Missing search query', hint: 'Add ?search=coffee to the URL', creator: CREATOR },
      400
    );
  }

  // ---------- Check server config ----------
  if (!process.env.GOOGLE_API_KEY || !process.env.GOOGLE_CX) {
    return reply({ success: false, error: 'Server is not configured correctly', creator: CREATOR }, 500);
  }

  // ---------- Call Google Custom Search ----------
  try {
    const url = new URL('https://www.googleapis.com/customsearch/v1');
    url.searchParams.set('key', process.env.GOOGLE_API_KEY);
    url.searchParams.set('cx', process.env.GOOGLE_CX);
    url.searchParams.set('q', query);
    url.searchParams.set('num', String(num));
    url.searchParams.set('start', String(start));

    const res = await fetch(url.toString(), { cache: 'no-store' });
    const data = await res.json();

    if (!res.ok) {
      return reply(
        {
          success: false,
          error: data?.error?.message || 'Google Search API error',
          code: data?.error?.code || res.status,
          creator: CREATOR,
        },
        res.status === 429 ? 429 : 502
      );
    }

    const results = (data.items || []).map((item, i) => ({
      position: start + i,
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      displayLink: item.displayLink,
      favicon: item.pagemap?.cse_image?.[0]?.src || null,
    }));

    return reply({
      success: true,
      creator: CREATOR,
      query,
      page: Math.floor((start - 1) / num) + 1,
      resultsPerPage: num,
      totalResults: data.searchInformation?.formattedTotalResults || '0',
      searchTimeSeconds: Number(data.searchInformation?.formattedSearchTime || 0),
      count: results.length,
      results,
    });
  } catch (err) {
    return reply({ success: false, error: 'Internal server error', message: err.message, creator: CREATOR }, 500);
  }
}