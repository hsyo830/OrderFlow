# 예약 생성 연동 (feature/reservation-create)

## 확정 (백엔드 확인됨)

- POST /api/reservation (baseURL이 /api까지 포함 → 코드에서는 /reservation)
- 요청 body: { ticketSeatIds: number[] } (TicketSeat.id), userId 불필요(JWT로 식별)
- 응답: { reservationId: number, orderId: string, amount: number }
- 예약 생성 시 좌석 HOLD → PAYMENT_PENDING
- PATCH /api/reservation/cancel 로 PAYMENT_PENDING 예약을 취소하면 좌석이 AVAILABLE로 복귀
  (취소 요청 body는 미확인: { reservationIds: number[] } 가정)

## 이번 브랜치에서 정한 것

- 예약 생성 후 좌석 선택 잠금(A안), 1단계로 돌아가도 변경/해제 불가
- 같은 좌석으로 다시 [결제하기] → 기존 예약 재사용 (API 재호출 없음)
- 새 예약 자동 생성 금지: 취소 API는 있지만 "좌석 변경 시 취소 후 재생성" 흐름은 이번 범위 아님
- 에러 처리: 응답 유무로만 분류 (4xx는 1단계 복귀+refetch+안내, 응답 없음/5xx는 불확실 상태로 [결제하기] 비활성)
- FIXME: step을 단일 기준으로, 불변식(step>=2 ⇒ 좌석 있음, step===3 ⇒ reservation 있음) 보정

## 후보 (백엔드 확인 후 결정)

- 재사용 거절 시 처리: A3(refetch 결과 모두 AVAILABLE이면 로컬 예약 초기화, 아니면 잠금 유지+안내)
- 불확실 상태의 [다시 시도]: 백엔드가 같은 좌석 재요청에 기존 예약을 반환하면 허용

## 미확정 (백엔드 확인 필요)

- PAYMENT_PENDING 만료 시간, 만료 후 좌석 상태
- 같은 유저/좌석 재요청 시 응답
- 4xx 에러 코드 구분
- amount와 좌석 가격 합계의 일치 여부

## 알려진 한계

- 새로고침/탭 이탈 시 reservation state 소실 (조회 API 없음)
- 다중 탭 중복 예약은 백엔드 idempotency에 의존
- 요청 중 이탈(언마운트) 시 서버에 예약만 남음 (#7, 새로고침 한계와 같은 계열)
- DevTools 오프라인은 mutation을 paused로 만들어서 불확실 상태 테스트에 쓸 수 없음(대신 request blocking이나 5초 초과 throttling)

## 구현 후 critical review로 정한 것 (2026-10-23)

### 발견

- 잠금이 응답이 온 뒤(reservation !== null)에만 걸려서, 요청 중과 불확실 상태에는
  좌석 변경이 가능했다. 요청 중 [이전]으로 좌석을 바꾸면 응답이 이전 좌석으로
  예약을 만들고 갇히는 경로가 있었다(#2, 정상 네트워크에서도 최대 5초).
- DevTools 오프라인은 요청이 나가지 않고 mutation이 paused 상태가 된다
  (React Query networkMode: "online" 기본값). 불확실 상태 테스트에 쓸 수 없고,
  "예약 생성 중..."에 무기한 머문다(#1).

### 결정

- isSeatLocked = reservation !== null || isPending || isReservationUncertain
  (원칙: 서버에 내 예약이 있거나 있을 수 있는 동안에는 좌석을 바꾸지 않는다)
- 요청 중 [이전] 비활성화 (실제 방어는 잠금, 이쪽은 UX)
- 1단계 잠금 안내 문구를 상태별로 분리
- 오프라인이면 mutate하지 않고 안내만 한다. 요청이 나가지 않은 게 확실하므로
  불확실 상태로 만들지 않는다(onlineManager.isOnline() 사용)

### 이번 브랜치에서 하지 않은 것

- #4 불변식 강화 (step === 3 ⇒ 예약 좌석 = 현재 선택)
- #5 4xx 후 selectedSeatIds 정리 (백엔드 holdUserId 제공 여부에 따라 결정)
- #6 useRef 가드 (같은 tick 중복 호출, 발생 가능성 낮음)
- #7 요청 중 이탈 (알려진 한계)

### 테스트 방법 메모

- 불확실 상태: Request blocking(*/reservation) 또는 5초 초과 latency throttling
- 오프라인(DevTools)으로는 확인 불가
