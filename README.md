# Market Tracker Web

The React frontend for Market Tracker, a crowdsourced crop price tool for Ethiopian markets. Anyone can browse prices by crop and market. Registered users can submit new prices.

Backend repo: https://github.com/surafeladane/market-tracker-api

## Features

- Browse prices with crop and market filters
- Sign up, log in and log out (token-based)
- Submit prices when logged in
- Multi-page navigation with React Router

## Tech stack

React, Vite, React Router

## Run it locally

You need the backend running first (see the backend repo's README). Then:

```
npm install
npm run dev
```

Open http://localhost:5173/

## What I'd build next

- Price trend charts per crop and market
- A mobile-first layout, since most users would be on phones