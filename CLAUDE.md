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
// src/app/(main)/reservation/[id]/page.tsx
import ReservationPage from "@/views/reservation/ReservationPage";
const Reservation = () => <ReservationPage />;
export default Reservation;
```

All real UI and logic (data fetching, state, layout composition) lives in `src/views/<feature>/<FeatureName>Page.tsx` plus a co-located `components/` folder. When adding a new page, create the view under `src/views/`, not inline in `src/app/`.

Current features: `home`, `login`, `signup`, `tickets` (listing), `detail` (ticket detail), `reservation` (seat selection flow), `mypage`.

`reservation`은 `/reservation/[id]` 동적 라우트이며, `id`는 `ticket_id`를 의미한다.

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

## AI 협업 트랙 (Light / Standard / Core FE)

이 프로젝트의 목적은 신입 프론트엔드 개발자로서 설계·구현·문제해결 능력을
보여주는 것이다. AI 활용 자체는 목표가 아니며, **FE ownership > AI 활용**
순서로 판단한다. 아래 원칙은 절차 준수 자체가 목적이 아니라, 실제 학습과
프로젝트 품질을 지키기 위한 가이드다. 작업 특성에 따라 유연하게 조정한다.

### 트랙 판단 기준

작업을 시작하기 전에 아래 세 가지를 함께 고려해서 트랙을 정한다. 목록으로
미리 고정하지 않고, 매 작업 시작 시점에 판단한다.

1. **포트폴리오 핵심성** — 이 기능이 프로젝트에서 기술 역량을 보여주는 지점인가
2. **기술적 위험도/복잡도** — 상태 전이, 동시성, 실패 처리 등 잘못 만들면
   비용이 크거나 판단이 까다로운 지점인가
3. **학습 가치** — 직접 겪어야 실력이 느는 문제인가, 아니면 반복적인 패턴인가

세 기준을 함께 봤을 때 셋 다 낮으면 Light, 일부만 해당하면 Standard,
다수 또는 결정적으로 해당하면 Core FE로 판단한다.

**애매하면 Claude Code가 먼저 트랙을 제안한다.** 예: "이 작업은 [위험도/복잡도]
때문에 Core로 보는 게 나을 것 같은데, 어떻게 진행할까요?"

### Light

반복 UI, 단순 레이아웃, Mock 데이터/함수, boilerplate, 기계적 리팩터링,
이미 정해진 컨벤션의 반복 적용.

`Spec → AI Implement → Verification → Human Diff Review`

### Standard

일반적인 FE 기능. 판단과 구현 경험은 필요하지만 프로젝트 핵심 문제는 아님.

`Spec → Human Direction → Human + AI 병행 구현 → Verification → Review`

### Core FE

설계와 핵심 구현을 Human이 주도한다. 예: 좌석 상태관리, 예약 상태 전이,
동시성 처리, 대기열, 결제 흐름 및 실패/복구, 서버-클라이언트 상태 책임분리,
핵심 architecture, 주요 API 에러 처리 등 — 위 세 기준으로 매번 판단.

`Problem Definition → (필요시) Research/Discussion → Human Design →
Human Implement → AI Critical Review → Human Fix → Verification →
(기능 완료 시 1회) Explainability Check → (선별적) Record`

**Core FE에서 Claude Code의 기본 역할**: 코드 탐색, 개념 설명, 선택지/trade-off
비교, 설계에 대한 반론, 디버깅 보조, critical review, edge case 탐색.
"구현해줘"보다 "설명해줘/비교해줘/검토해줘"로 요청하는 것을 기본으로 한다.
질문했다고 해서 해당 기능 전체 구현을 Claude가 대신하는 방향으로 자동
전환하지 않는다.

**Core FE 테스트 처리**: 무엇을 검증해야 하는지, 테스트 전략과 핵심 테스트
케이스는 Human이 먼저 판단한다. 그 이후 반복적인 테스트 코드 작성이나
추가 edge case 후보 생성은 Claude Code에 맡길 수 있다.

**Explainability Check**: Core FE 기능 하나가 완료됐을 때만 수행한다 (매
커밋마다 하지 않음). Claude가 면접관처럼 3~5개 질문하고("왜 이렇게
설계했는가", "다른 방법은", "왜 이 상태가 필요한가", "edge case는",
"trade-off는"), Human이 실제로 답할 수 있는지 확인한다. 막히는 질문이
있으면 그 부분만 다시 이해하거나 수정한다. 문제없으면 별도 기록도 필요 없다.

### 기록 원칙

AI 활용 기록은 최소화한다. 중요한 architecture 결정, AI review가 실제
문제를 발견한 사례, AI 활용 방식 자체를 바꾸게 만든 사례 정도만 선별해서
남긴다. 기록을 위해 개발 흐름을 끊지 않는다.
