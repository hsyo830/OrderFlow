# 🎫 Orderflow (TICKETY)

**실시간 좌석 선점과 대기열을 지원하는 티켓 예매 서비스**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3ECF8E?logo=supabase)](https://supabase.com/)
[![AWS](https://img.shields.io/badge/Deploy-AWS%20EC2-orange?logo=amazonaws)](https://aws.amazon.com/)

<!-- 서비스 미리보기 스크린샷/GIF를 이 자리에 추가하세요 -->

🔗 **Demo** | http://13.55.126.121/
🔗 **GitHub** | [hsyo830/OrderFlow](https://github.com/hsyo830/OrderFlow)

---

## 🎫 프로젝트 개요

- 공연 탐색부터 좌석 선택, 예매까지 실제 티켓팅 서비스의 핵심 사용자 플로우를 구현한 B2C 예매 서비스
- 좌석 상태(예약 가능/임시 선점/판매 완료)를 서버 기준으로 관리해, 여러 사용자가 동시에 같은 좌석을 선택하는 상황에서도 데이터 정합성을 보장하도록 설계
- Supabase 기반 인증과 실제 공연/좌석 데이터 연동으로 조회부터 좌석 선점까지의 흐름을 제공

---

## 🎫 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| **개발 환경** | VS Code · ESLint · Prettier · Git & GitHub |
| **프레임워크** | Next.js 16 (App Router) · React 19 · TypeScript |
| **스타일링** | Tailwind CSS v4 |
| **상태 관리** | Zustand · TanStack Query |
| **폼 관리** | React Hook Form · Zod |
| **인증/DB** | Supabase (Auth · PostgreSQL) |
| **알림 UI** | sonner |
| **테스트** | Vitest |
| **빌드/배포** | Next.js Build · AWS EC2 |

---

## 🎫 프로젝트 실행 방법

```bash
# 패키지 설치
npm install

# 로컬 개발 서버
npm run dev

# ESLint 규칙 검사
npm run lint

# 단위 테스트 실행
npx vitest run

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

---

## 🎫 주요 기능

| 기능 | 설명 |
| --- | --- |
| **회원가입 / 로그인** | Supabase Auth 기반 인증, React Hook Form + Zod로 폼 검증 |
| **공연 목록 / 상세** | 카테고리별 공연 조회, 공연장·일정·좌석 등급별 가격 정보 제공 |
| **좌석 선택** | 등급별(VIP/S/R) 좌석 배치와 실시간 상태(선택 가능/불가) 표시 |
| **좌석 선점(HOLD)** | 서버 응답 기준으로 좌석 확정, 동시 선점 시 한 명만 성공하도록 처리 |
| **선택 개수 제한** | 응답 대기 중인 요청까지 반영해 최대 선택 개수를 정확히 검증 |
| **로그인 가드** | 비로그인 사용자의 예매 페이지 접근을 라우트 단에서 차단 |
| **실패 알림/복구** | 좌석 선점 실패 시 Toast로 안내하고 최신 좌석 상태로 재동기화 |

---

## 🎫 GitHub 브랜치 전략

| 브랜치 | 용도 | 비고 |
| --- | --- | --- |
| **main** | 최종 배포용 | 운영 환경 |
| **develop** | 기능 통합용 | 테스트 / 통합 |
| **feature/\*** | 기능별 작업용 | 개인 작업 브랜치 |
| **chore/\*** | 설정/환경 작업용 | 빌드 도구, 라이브러리 설정 등 |

---

## 🎫 Commit 컨벤션

| 타입 | 설명 | 예시 |
| --- | --- | --- |
| **feat** | 새로운 기능 추가 | `feat: 좌석 선택/해제 및 금액 계산 로직 구현` |
| **fix** | 버그 수정 | `fix: 로그인/회원가입 페이지 모바일 반응형 레이아웃 수정` |
| **refactor** | 기능 변화 없는 리팩토링 | `refactor: 회원가입/로그인 폼 검증을 RHF + Zod로 리팩토링` |
| **test** | 테스트 코드 추가/수정 | `test: seatService HOLD/release 로직 단위 테스트 추가` |
| **docs** | 문서 수정 | `docs: CLAUDE.md에 예약 시나리오 및 스키마 현황 추가` |
| **chore** | 빌드/설정/의존성 관련 변경 | `chore: react-hook-form, zod 설치 및 취약점 패치` |

---

## 🗂️ 프로젝트 구조

```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # 로그인/회원가입 레이아웃 그룹
│   └── (main)/                 # 메인 레이아웃 그룹
│       ├── tickets/            # 공연 목록/상세
│       └── reservation/[id]/   # 예매(좌석 선택 ~ 결제) 페이지
├── views/                       # 페이지별 실제 UI/로직 (thin page / thick view)
│   ├── login/ · signup/
│   ├── tickets/ · detail/
│   └── reservation/
├── components/                  # 공통 컴포넌트
├── services/                    # API 호출 함수 (Mock/실제 API 경계)
├── stores/                      # Zustand 스토어
├── schemas/                     # Zod 검증 스키마
├── types/                       # TypeScript 타입 정의
├── providers/                   # Query/Auth 등 Provider
└── lib/                         # Supabase 클라이언트 등 라이브러리 설정

docs/
└── decisions/                   # 핵심 기능 설계 결정 기록
```
