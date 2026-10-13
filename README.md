# CineVerse — Movie & Anime Recommendation System

A responsive React + Vite mini project inspired by cinematic anime streaming interfaces.

## Features
- Full-screen, muted, continuously looping MP4 background video (optional local file).
- Dark cinematic layout with animated poster artwork and responsive UI.
- Search by title, genre, type, and description.
- Filter by Anime / Movies and genres.
- Recommendation rows and match scores.
- Title detail pages with related-title recommendations.
- Add/remove titles from a demo list.
- Graceful poster image fallbacks.

## Requirements
- Node.js 18+ (recommended)
- npm

## Run locally
1. Extract the ZIP.
2. Open a terminal in the project folder.
3. Install packages:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
5. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Add the looping background video
Copy a video you own or have permission to use to:
`public/background.mp4`

The video must be named exactly `background.mp4`. It will autoplay muted and loop.
Without the file, the animated gradient background remains visible.

## Build for deployment
```bash
npm run build
npm run preview
```
The production website is generated in `dist/`.

## Project structure
- `src/main.jsx` — app UI, sample catalogue, search/filter/recommendation logic
- `src/styles.css` — visual design and responsive styles
- `public/background.mp4` — add your optional loop video here
- `index.html` — page entry point

## Notes
- This is a functional front-end demo using a sample catalogue and simple content-based
  matching (shared genres). It does not stream copyrighted movies or anime.
- The "Watch trailer" button is a demo placeholder. For a real deployment, connect
  official trailer URLs or licensed streaming providers.
- Poster artwork is loaded from TMDB image URLs and Google Fonts is used for typography,
  so those visual assets need an internet connection. If a poster is unavailable, a
  placeholder is shown.
