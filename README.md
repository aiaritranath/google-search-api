"# google-search-api" 
Security notes (read these)
API_KEY=aritra is weak. Anyone who sees the URL can use your API. Since it's in a query string, it appears in browser history, Vercel logs, and Referer headers. For a public project, consider a longer random string like aritra_9f3k2....

Your Google key never leaves the server. It lives in Vercel env vars and is only used server-side — good.

Rate limiting: add Upstash Redis + @upstash/ratelimit if you want to cap requests per IP. Free tier is plenty.

Never commit .env.local — add it to .gitignore (Next.js does this by default).

Don't put NEXT_PUBLIC_ in front of any of these variables, or they'll be exposed to the browser.

About that failed URL fetch
The fetch of google-search-api.versel.com/key=aritra&search=coffee failed because that hostname doesn't resolve — versel.com isn't Vercel's domain, and the path is missing the ?. Once you deploy with the code above, your live URL will be https://<your-project-name>.vercel.app/api/search?key=aritra&search=coffee, and it will respond with JSON.

