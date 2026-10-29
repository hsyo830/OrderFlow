export type NavItem = {
  href: string;
  label: string;
  requiresAuth?: boolean;
};

// PC 헤더와 모바일 메뉴가 공유하는 메뉴 항목
export const navItems = [
  { href: "/", label: "홈" },
  { href: "/tickets", label: "예매하기" },
  { href: "/mypage", label: "마이페이지", requiresAuth: true },
] as const satisfies readonly NavItem[];

// 비로그인 상태에서 헤더 UserIcon이 연결하는 항목 (모바일 메뉴에서 텍스트로 노출)
export const loginNavItem: NavItem = { href: "/login", label: "로그인" };
