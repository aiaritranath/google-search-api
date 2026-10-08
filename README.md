# 🔎 Google Search API

A private, JSON-based Google Search API built with **Next.js** and deployed on **Vercel**.

It requires a private API key and returns clean, structured search results — including the API creator's details in every response.

> **Creator:** [@its_aritra_nath](https://instagram.com/its_aritra_nath)  
> **Instagram:** [@its_aritra_nath](https://instagram.com/its_aritra_nath)

---

## ✨ Features

- 🔐 **Private API key** — only requests with the correct key are allowed.
- 📦 **JSON output** — perfect for apps, bots, or integrations.
- 👤 **Creator info** — every response includes the API owner's details.
- ⚡ **Serverless** — runs on Vercel's edge network.
- 🌐 **CORS enabled** — call it from any frontend or backend.
- 🔄 **Pagination** — supports `num` and `start` parameters.
- 🧩 **Rewrite** — `/search` maps to `/api/search` for cleaner URLs.

---

## 🛠 Tech Stack

- [Next.js 14](https://nextjs.org/) — App Router
- [Vercel](https://vercel.com/) — Hosting
- [Google Custom Search JSON API](https://developers.google.com/custom-search/v1/overview) — Search provider

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A [Google Cloud](https://console.cloud.google.com/) account
- A [Vercel](https://vercel.com/) account for deployment

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/google-search-api.git
cd google-search-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
API_KEY=aritra
GOOGLE_API_KEY=your_google_api_key_here
GOOGLE_CX=your_custom_search_engine_id_here
```

| Variable | Description |
|---|---|
| `API_KEY` | Your private API key. The example value is `aritra`; change it for production. |
| `GOOGLE_API_KEY` | Your Google Cloud API key. |
| `GOOGLE_CX` | Your Programmable Search Engine ID. |

### 4. Get Google credentials

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/).
2. Go to **APIs & Services → Library**.
3. Search for **Custom Search API** and enable it.
4. Go to **APIs & Services → Credentials**.
5. Create an **API Key** and copy it. This is your `GOOGLE_API_KEY`.
6. Go to [Google Programmable Search Engine](https://programmablesearchengine.google.com/).
7. Create a search engine and configure it to search the web.
8. Copy the **Search engine ID (cx)**. This is your `GOOGLE_CX`.

> **Note:** Google API quotas and pricing/availability can change. Check Google's current documentation for the latest limits.

### 5. Run locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Test the API:

```text
http://localhost:3000/api/search?key=aritra&search=coffee
```

---

## ☁️ Deploy to Vercel

### Option A — GitHub Integration

1. Push your project to GitHub:

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/google-search-api.git
git push -u origin main
```

2. Open [Vercel](https://vercel.com/) and select **Add New → Project**.
3. Import your GitHub repository.
4. Add these environment variables:

| Name | Value |
|---|---|
| `API_KEY` | Your private API key |
| `GOOGLE_API_KEY` | Your Google API key |
| `GOOGLE_CX` | Your search engine ID |

5. Click **Deploy**.

Your API will be available at:

```text
https://YOUR_PROJECT.vercel.app/api/search?key=YOUR_API_KEY&search=coffee
```

Or through the rewrite:

```text
https://YOUR_PROJECT.vercel.app/search?key=YOUR_API_KEY&search=coffee
```

### Option B — Vercel CLI

Install the Vercel CLI:

```bash
npm install -g vercel
```

Deploy:

```bash
vercel
```

Add environment variables:

```bash
vercel env add API_KEY
vercel env add GOOGLE_API_KEY
vercel env add GOOGLE_CX
```

Deploy to production:

```bash
vercel --prod
```

---

## 📡 API Usage

### Endpoint

```http
GET /api/search
```

Or:

```http
GET /search
```

### Query Parameters

| Parameter | Required | Default | Description |
|---|---:|---:|---|
| `key` | ✅ Yes | — | Private API key. Can also be sent as `x-api-key`. |
| `search` | ✅ Yes | — | Search query, for example `coffee`. |
| `num` | ❌ No | `10` | Number of results per page, typically 1–10. |
| `start` | ❌ No | `1` | Starting result index. |

---

## 🧪 Example Requests

### Basic search

```bash
curl "https://YOUR_PROJECT.vercel.app/api/search?key=YOUR_API_KEY&search=coffee"
```

### Limit to 5 results

```bash
curl "https://YOUR_PROJECT.vercel.app/api/search?key=YOUR_API_KEY&search=coffee&num=5"
```

### Pagination

```bash
curl "https://YOUR_PROJECT.vercel.app/api/search?key=YOUR_API_KEY&search=coffee&start=11"
```

### Using the API key header

```bash
curl -H "x-api-key: YOUR_API_KEY" \
"https://YOUR_PROJECT.vercel.app/api/search?search=coffee"
```

---

## 📦 Example Response

```json
{
  "success": true,
  "creator": {
    "name": "Aritra Nath",
    "owner": "@its_aritra_nath",
    "instagram": "@its_aritra_nath",
    "instagram_url": "https://instagram.com/its_aritra_nath",
    "api_name": "Google Search API",
    "version": "1.0.0"
  },
  "query": "coffee",
  "page": 1,
  "resultsPerPage": 10,
  "totalResults": "1,230,000,000",
  "searchTimeSeconds": 0.42,
  "count": 10,
  "results": [
    {
      "position": 1,
      "title": "Coffee - Wikipedia",
      "link": "https://en.wikipedia.org/wiki/Coffee",
      "snippet": "Coffee is a brewed drink prepared from roasted coffee beans...",
      "displayLink": "en.wikipedia.org",
      "favicon": null
    }
  ]
}
```

> The exact response values depend on the Google API response and your implementation.

---

## ❌ Error Responses

All errors can include the `creator` block.

```json
{
  "success": false,
  "error": "Invalid API key",
  "creator": {
    "name": "Aritra Nath",
    "owner": "@its_aritra_nath",
    "instagram": "@its_aritra_nath"
  }
}
```

| Status | Meaning |
|---:|---|
| `400` | Missing or invalid search query |
| `401` | Missing API key |
| `403` | Invalid API key or access denied |
| `429` | Rate limit or quota exceeded |
| `500` | Server configuration error |
| `502` | Upstream Google API error |

> Exact status codes depend on the API implementation.

---

## 🔒 Security

### Change the default API key

Do **not** use:

```env
API_KEY=aritra
```

for a production deployment.

Generate a strong random secret instead, for example:

```env
API_KEY=aritra_9f3k2_example_random_secret
```

### Never commit `.env.local`

Make sure your `.gitignore` contains:

```gitignore
.env*
!.env.example
```

### Keep Google credentials server-side

Never expose:

```text
GOOGLE_API_KEY
```

or other private credentials through client-side environment variables.

Do **not** prefix server-only secrets with:

```text
NEXT_PUBLIC_
```

### Rate limiting

For a public-facing deployment, consider adding rate limiting using a service such as [Upstash](https://upstash.com/) and `@upstash/ratelimit`.

---

## 📁 Project Structure

```text
google-search-api/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.js
│   ├── layout.js
│   └── page.js
├── next.config.js
├── package.json
├── .env.local
├── .gitignore
└── README.md
```

---

## 👤 Creator

### Aritra Nath

- Instagram: [@its_aritra_nath](https://instagram.com/its_aritra_nath)
- Owner: [@its_aritra_nath](https://instagram.com/its_aritra_nath)

Every API response can include creator information in the `creator` field.

---

## 📄 License

MIT © [Aritra Nath](https://instagram.com/its_aritra_nath)

---

## 🙏 Acknowledgements

- [Google Custom Search JSON API](https://developers.google.com/custom-search/v1/overview)
- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**Made with ❤️ by Aritra Nath**
