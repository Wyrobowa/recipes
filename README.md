# Recipes Web (React + Vite)

A lightweight React admin UI for `recipes-admin`, built with Vite (not Next.js).

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

By default, the app calls:

`http://localhost:3000/recipes`

Set `VITE_API_BASE_URL` in `.env` if your backend runs elsewhere.

## Current API assumptions

The UI currently expects these endpoints:

- `GET /recipes` -> array of recipe objects
- `POST /recipes` with `{ title, description }`
- `DELETE /recipes/:id`

It renders either `title` or `name`, and either `description` or `instructions`.

If `recipes-admin` uses different field names/routes, update [`src/App.tsx`](./src/App.tsx).

## Scripts

- `npm run dev` - start development server
- `npm run build` - type-check and build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
