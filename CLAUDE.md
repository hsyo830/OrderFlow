# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Orderflow ("TICKETY") is a Next.js ticketing/reservation service (real-time queue + seat selection) built with the App Router, TypeScript, Tailwind CSS v4, Supabase, React Query, and Zustand.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint
```

Node version is pinned via `.nvmrc` / `package.json#engines` to `24.x`.

There is no `test` script in `package.json`, but `vitest` is installed and at least one test file exists (`src/utils/validator.test.ts`). Run tests directly with npx, no vitest config file exists so it uses defaults:

```bash
npx vitest run                       # run all tests once
npx vitest run src/utils/validator.test.ts   # run a single file
npx vitest                           # watch mode
```

## Environment

Supabase credentials are read from `.env.local` (not committed):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## Architecture

### Pages are thin, views hold the logic

Routes live under `src/app` (App Router, with `(auth)` and `(main)` route groups for distinct layouts). Every `page.tsx` is a trivial wrapper that renders one component from `src/views/<feature>/`:

```tsx
// src/app/(main)/reservation/page.tsx
import ReservationPage from "@/views/reservation/ReservationPage";
const Reservation = () => <ReservationPage />;
export default Reservation;
```

All real UI and logic (data fetching, state, layout composition) lives in `src/views/<feature>/<FeatureName>Page.tsx` plus a co-located `components/` folder. When adding a new page, create the view under `src/views/`, not inline in `src/app/`.

Current features: `home`, `login`, `signup`, `tickets` (listing), `detail` (ticket detail), `reservation` (seat selection flow), `mypage`.

### Data layer

- `src/lib/supabase/client.ts` — `createClient()` builds a browser Supabase client (`@supabase/ssr`'s `createBrowserClient`). There is currently no server-side Supabase client.
- `src/services/*Service.ts` — plain async functions that call Supabase directly and `throw error` on failure (e.g. `fetchTickets`, `fetchTicketDetail` in `ticketService.ts`). Views call these through React Query (`useQuery({ queryKey, queryFn })`), not by fetching directly.
- `QueryProvider` (`src/providers/QueryProvider.tsx`) wraps the app with a single `QueryClient` instance; it's mounted once in the root layout.
- Supabase tables referenced so far: `tickets`, `venues`, `ticket_grade_price`. Types for these live in `src/types/ticket.ts` (`Ticket`, `TicketGradePrice`, `Venue`, plus joined shapes `TicketListData`/`TicketDetail`).

### Auth

- `AuthProvider` (`src/providers/AuthProvider.tsx`) is mounted once in the root layout, reads the current Supabase session on mount, and pushes the user into a global Zustand store.
- `useAuthStore` (`src/stores/authStore.ts`) holds `{ user, isInitialized }` and is the single source of truth for auth state read elsewhere (e.g. `Header` conditionally shows "마이페이지" / login link based on `user`).
- Provider nesting in `src/app/layout.tsx` is `QueryProvider > AuthProvider > children`.

### Styling / design tokens

Tailwind v4 is configured CSS-first (no `tailwind.config.js`). `src/app/globals.css` defines the entire design system as CSS custom properties on `:root` (background/surface, text, border, input, brand, primary/secondary button colors, dark-surface tokens for the seat-selection/payment flow, etc.), then re-exposes them to Tailwind via an `@theme inline { ... }` block. Use the semantic Tailwind classes those tokens produce (e.g. `text-brand`, `bg-surface-2`, `border-border`) rather than raw hex values or arbitrary Tailwind color utilities, so the app stays reskinnable from one file.

### Categories

`src/constants/Category.ts` defines the canonical list of ticket categories (`categories`, `as const satisfies readonly Category[]`) and derives the `TicketCategory` union type from it. Category icon components live in `src/components/icons/CategoryIcons/`. Add a new category by extending this array (with its icon), not by hand-writing a union type elsewhere.

### Path alias

`@/*` maps to `src/*` (see `tsconfig.json`). Imports must go through `@/...`, not relative paths across top-level folders.

### Import ordering

ESLint enforces `simple-import-sort` (imports and exports) — run `npm run lint` (or let your editor's ESLint integration) to auto-group/sort imports rather than ordering them by hand.

## Reservation Flow (as of 2026-09-14, verified against Supabase)

설계: 좌석 선택 → ticket_seats.status = HOLD → 예약 생성(PAYMENT_PENDING)
→ 결제 → ticket_seats.status = SOLD, reservation.status = COMPLETED

### 실사용 테이블

- `ticket_seats` (복수) — 좌석 상태 테이블, 현재 50개 전부 AVAILABLE
- `ticket_seat_grades` (복수) — 좌석별 가격 연결 테이블
- (구 `ticket_seat`, `ticket_saet_grades`는 중복/오타로 삭제됨 — 참고용 기록)

### 미검증 / 미구현

- reservation 생성 시 대응하는 ticket_seats.status가 실제로 같이 바뀌는지 미검증
  (기존 테스트 데이터는 삭제 예정, 재검증 필요)
- HOLD 만료(5분) 로직 미구현 — hold_user_id, hold_expires_at 컬럼 아직 없음,
  해당 기능 작업 시 추가 예정 (현재 블로킹 아님)
- 좌석 중복 선점 방지(동시성 처리)는 설계만 있고 구현 여부 미확인
