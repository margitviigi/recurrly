# Recurrly

Recurrly is an Expo SDK 54 application for tracking subscriptions and upcoming renewals. It uses Expo Router, Clerk authentication, NativeWind, and TypeScript.

## Requirements

- Node.js 20.19 or newer
- npm
- An Expo-compatible iOS/Android environment, Expo Go, or a web browser
- A Clerk application with email/password authentication and email verification enabled
- Clerk Native API enabled for native builds

## Environment

Create a local `.env` file:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
```

Only the Clerk publishable key belongs in the mobile app environment. Keep `CLERK_SECRET_KEY` in a backend or secure CI environment, never in client code.

## Development

```bash
npm install
npm start
```

The current custom Clerk flow works in Expo Go, development builds, and web. After changing native config plugins, rebuild native projects with `npx expo run:ios` or `npx expo run:android`.

## Validation

```bash
npm run typecheck
npm run lint
npx expo install --check
```

Before shipping authentication, verify a real sign-up and email-code confirmation, sign-in, sign-out, and session restoration after restarting the app.

## Project structure

- `app/(auth)` — public Clerk sign-in and sign-up routes
- `app/(tabs)` — authenticated tab routes
- `app/subscriptions` — authenticated subscription detail routes
- `components` — reusable UI components
- `constants` — theme, assets, and placeholder subscription data
- `lib` — formatting helpers
