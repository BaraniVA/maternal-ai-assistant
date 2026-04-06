# Maternal AI Assistant

<div align="center">
<img width="1200" height="475" alt="Maternal AI Assistant preview" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A mobile-first maternal wellness companion built with React, Vite, TypeScript, Tailwind CSS, and Motion. The app is designed as a supportive pregnancy dashboard with chat, appointment tracking, guided yoga, mood check-ins, and a profile timeline.

## Features

- Supportive home dashboard with pregnancy context, daily insight cards, and quick action tiles.
- AI-style chat interface for pregnancy, postpartum, and newborn-care questions.
- Appointment planner with reminder offsets and delete/add flows.
- Guided pregnancy yoga view with pose videos, voice guidance, and a timer.
- Mood selector and language picker for a more personalized experience.
- Profile screen with journey milestones and trimester progress.

## Requirements

- Node.js 18 or newer
- npm

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file if you need to override the default secrets by copying `.env.example` to `.env.local` and updating the values.

3. Add your Gemini API key if you plan to use Gemini-backed features:

   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser at the local Vite URL shown in the terminal, usually `http://localhost:3000`.

## Scripts

- `npm run dev` starts the Vite dev server on port `3000`.
- `npm run build` builds the production bundle.
- `npm run preview` previews the production build locally.
- `npm run lint` runs TypeScript type checking.
- `npm run clean` removes the `dist` directory.

## Environment Variables

The app is configured to read `GEMINI_API_KEY` through Vite. The repository also includes `.env.example` with the expected variables used by the app and the AI Studio runtime.

## Project Structure

- `src/App.tsx` contains the full application UI and interaction logic.
- `src/main.tsx` bootstraps the React app.
- `src/index.css` defines the theme, fonts, and shared visual styles.
- `vite.config.ts` configures Vite, Tailwind, and environment variable injection.

## Notes

- This repository currently behaves like a front-end prototype with local UI state.
- Browser notifications and speech synthesis are used for reminders and yoga voice guidance.
- Pregnancy-related content is informational only and should not replace medical advice.

## AI Studio

This project was originally generated for Google AI Studio and can also be run there if your environment is configured for it.
