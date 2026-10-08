const CREATOR = {
  owner: '@its_aritra_nath',
  instagram: '@its_aritra_nath',
  instagram_url: 'https://instagram.com/its_aritra_nath',
};

export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui', maxWidth: 760, margin: '0 auto', padding: 40, lineHeight: 1.6 }}>
      <h1>🔎 Google Search API</h1>
      <p>
        Private JSON search API by <strong>{CREATOR.owner}</strong>
      </p>

      <h2>Usage</h2>
      <pre style={{ background: '#f4f4f4', padding: 16, borderRadius: 8, overflowX: 'auto' }}>
{`GET /api/search?key=YOUR_KEY&search=coffee
GET /api/search?key=YOUR_KEY&search=coffee&num=5
GET /api/search?key=YOUR_KEY&search=coffee&start=11`}
      </pre>

      <h2>Headers (alternative to ?key=)</h2>
      <pre style={{ background: '#f4f4f4', padding: 16, borderRadius: 8 }}>
{`x-api-key: YOUR_KEY`}
      </pre>

      <h2>Creator</h2>
      <ul>
        <li>Owner: {CREATOR.owner}</li>
        <li>
          Instagram: <a href={CREATOR.instagram_url}>{CREATOR.instagram}</a>
        </li>
      </ul>
    </main>
  );
}