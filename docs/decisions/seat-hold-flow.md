# 좌석 클릭 → HOLD API 호출 흐름 — 결정 기록

## Context

`SeatMap.tsx`의 좌석 클릭 핸들러(현재 `console.log` placeholder)와
`ReservationContent.tsx`의 하드코딩된 `selectedSeatIds={[]}`를 실제 HOLD API 흐름으로
교체하기 위해, 4가지 축(낙관적 업데이트 여부/호출 시점/상태 위치/로딩·에러 관리)에
대한 옵션·트레이드오프를 비교했고 Human이 아래와 같이 결정했다. 이 문서는 **결정
기록**이며, 아직 구현은 진행하지 않는다.

## 결정 사항

**1. 낙관적 업데이트 방식 — 응답 대기(비낙관적)**
`holdSeat` 호출 성공 응답을 받은 뒤에만 좌석을 "선택됨"으로 확정한다. 클릭 즉시
UI를 낙관적으로 바꾸지 않으므로 실패 시 되돌리는 롤백 로직이 필요 없다.

**2. HOLD API 호출 시점 — 클릭마다 개별 요청**
좌석 클릭 시마다 `holdSeat([id], holdUserId)`를 개별 호출한다(배치 없음).

**3. `selectedSeatIds` 상태 위치 — `ReservationContent.tsx`**
`useState<number[]>([])`로 `ReservationContent`에서 관리하고, `SeatMap`/
`SelectedSeatSummary`에 props로 내려준다. `ReservationPage`까지는 올리지 않는다.

**4. 로딩/에러 관리 위치 — `ReservationContent.tsx`, 좌석별 pending 상태**
클릭마다 개별 요청이 나가므로(결정 2) 좌석별로 진행 중 여부를 구분해야 한다 —
단일 boolean 플래그가 아니라 `Set<number>`/`Record<number, boolean>` 형태의
좌석별 pending 상태가 필요하다. 이 상태도 `ReservationContent`가 소유한다.

**5. 페이지 이탈 시 release — 보류**
unmount/beforeunload에서 `releaseSeat`를 호출하는 로직은 이번 범위에 포함하지
않는다. 사용자가 아무 조치 없이 페이지를 벗어난 좌석은 서버의 5분 만료 sweep
(조회/취소 시점 검사)에 의존해 자동 회수된다.

**6. HOLD 일부 실패 UX — 개별 실패, Toast + refetch**
호출 단위가 좌석 1개이므로(결정 2) "배치 중 일부만 실패"하는 상황 자체가 없다.
실패한 좌석은 선택 상태에 반영하지 않고, Toast로 실패를 알린 뒤 좌석 목록을
refetch해서 최신 상태(다른 사용자가 이미 선점했을 수 있음)를 다시 보여준다.
release(cancel) 실패에도 동일 패턴을 대칭 적용한다.

> ✅ **해결됨**: 토스트 라이브러리로 `sonner`를 도입했다(직접 구현 대신 라이브러리
> 선택 — Toast 자체가 이번 작업의 핵심 구현 영역이 아니라는 판단). `src/app/layout.tsx`에
> `<Toaster>`를 한 번 마운트하고, 색상은 새로 정의하지 않고 기존 디자인 토큰을
> CSS 변수로 매핑해서 재사용한다. `ReservationContent.tsx`의 HOLD/release 실패
> 처리는 기존 `seatError` 로컬 state + 인라인 에러 텍스트를 걷어내고 `toast.error(...)`
> 호출로 교체했다.

**7. ID 기준 — `TicketSeat.id`로 잠정 가정**
`holdSeat`/`releaseSeat` 호출의 `ids`는 우선 `TicketSeat.id` 기준으로 구현한다.
`seatId`가 맞는 것으로 백엔드 계약이 확정되면 `seatService.ts` 내부만 교체한다
(컴포넌트는 서비스 함수만 호출하므로 영향 없음).

**8. `useMutation` 도입 — 확정**
HOLD/cancel 등 서버 상태 변경 요청은 `useMutation`으로 관리한다. 이 코드베이스에
`useMutation` 사용 사례가 없었으므로 이번이 첫 도입이 된다.

**9. 좌석 해제(deselect) 시 처리 — 즉시 `releaseSeat` 호출**
사용자가 이미 HOLD 성공한 좌석을 선택 해제하면, 그 즉시 `releaseSeat([id],
holdUserId)`를 호출해 반납한다. 마음이 바뀐 좌석이 5분 동안 다른 사용자에게
묶여 있지 않도록 하기 위함이다. (결정 2: 클릭마다 개별 요청이므로 해제도 동일하게
개별 요청으로 처리 — 배치 방식이었다면 필요 없었을 네트워크 호출.)

## 결정에 따라 자연스럽게 정리되는 것들

- 축 3(상태 위치)과 축 4(로딩/에러 위치)가 모두 `ReservationContent`로 모이므로,
  이 화면의 서버 통신·선택 상태는 전부 한 컴포넌트가 소유한다는 기존 규칙
  (`useQuery`가 이미 이 파일에 있는 것과 일관)이 유지된다.
- 클릭마다 개별 호출(결정 2) + 즉시 해제(결정 9) 조합이라, "선택됨"과 "서버가 실제
  HOLD 확정함"이 항상 같은 의미로 유지된다 — 응답 대기 방식(결정 1)과 맞물려
  "로컬 선택 vs 서버 확정 hold"라는 두 겹 상태를 따로 만들 필요가 없다.
- 대신 좌석 수만큼 네트워크 요청이 발생하고(선택 시 hold, 해제 시 release), 각 요청은
  좌석별 pending 상태(결정 4)로 개별 추적해야 한다.

## Critical Files (구현 시 손댈 지점 — 지금은 수정하지 않음)

- `src/views/reservation/components/SeatMap.tsx` — onSeatClick 콜백을 props로 받아 클릭 시 상위 컴포넌트에 전달하고, 좌석별 pending 상태에 따른 disabled/스타일 반영. useMutation과 HOLD/release 요청은 ReservationContent.tsx에서 관리한다.
- `src/views/reservation/components/ReservationContent.tsx` — `selectedSeatIds`
  `useState`, 좌석별 pending 상태, hold/release `useMutation` 소유
- `src/views/reservation/components/SelectedSeatSummary.tsx` — 실제 `selectedSeatIds`
  기반 개수/금액 계산으로 교체
- `src/services/seatService.ts` — 변경 없음(이미 `holdSeat`/`releaseSeat` 시그니처
  존재), 다만 `ids` 기준이 `seatId`로 확정되면 이 파일만 수정
- Toast 관련: `sonner` 도입 완료 — `src/app/layout.tsx`(`<Toaster>` 마운트),
  `src/views/reservation/components/ReservationContent.tsx`(`toast.error(...)` 사용)
  (결정 6 참고)

## 다음 단계

이 문서는 결정 기록이며 구현 계획이 아니다. 실제 구현에 들어갈 때 위 Critical
Files를 기준으로 파일별 변경 계획을 별도로 잡는다.
