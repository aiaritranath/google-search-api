# 🔎 Google Search API

A private, JSON-based Google Search API built with Next.js and deployed on Vercel.
It proxies Google Custom Search, returns clean JSON, and includes the API creator's details in every response.

**Creator:** [@its_aritra_nath](https://instagram.com/its_aritra_nath)  
**Instagram:** [@its_aritra_nath](https://instagram.com/its_aritra_nath)

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Local Setup](#-local-setup)
- [Environment Variables](#-environment-variables)
- [Getting Google API Credentials](#-getting-google-api-credentials)
- [Running Locally](#-running-locally)
- [API Usage](#-api-usage)
- [Example Response](#-example-response)
- [Deploy to Vercel](#-deploy-to-vercel)
- [Security Notes](#-security-notes)
- [License](#-license)

---

## ✨ Features

- 🔐 **Private API key** – only requests with `key=aritra` (or a custom key) are allowed.
- 📦 **JSON output** – clean, structured response with search results.
- 👤 **Creator details** – every response includes the API owner's info.
- 🌐 **CORS enabled** – can be called from any browser or frontend app.
- ⚡ **Deployed on Vercel** – serverless, fast, and free.
- 🔄 **Pagination** – supports `start` and `num` parameters.
- 🛡️ **Server-side Google key** – your Google API key never reaches the client.

---

## 🧰 Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [Vercel](https://vercel.com/) (hosting)
- [Google Custom Search JSON API](https://developers.google.com/custom-search/v1/overview)

---

## 📁 Project Structure
