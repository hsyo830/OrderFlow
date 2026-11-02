"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useId, useRef, useState } from "react";

import { loginNavItem, navItems } from "@/constants/navigation";
import { useAuthStore } from "@/stores/authStore";

import MenuIcon from "../icons/MenuIcon";
import UserIcon from "../icons/UserIcon";
import Container from "./Container";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  const mobileMenuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname?.startsWith(path) ?? false;
  };

  const menuClassName = (path: string) =>
    `transition-colors ${
      isActive(path)
        ? "text-brand font-semibold border-b border-primary"
        : "hover:text-brand-hover active:text-brand-active"
    }`;

  const visibleNavItems = navItems.filter((item) => !("requiresAuth" in item) || user);
  // 비로그인 시 UserIcon(→ 로그인)과 같은 규칙으로 모바일 메뉴에 로그인 항목 노출
  const mobileNavItems = user ? visibleNavItems : [...visibleNavItems, loginNavItem];

  return (
    <header className="flex w-full items-center justify-center border-b">
      <Container>
        <div className="flex w-full items-center justify-between py-5">
          <Link href="/" className="font-logo text-brand text-xl">
            JARIYO
          </Link>

          <nav className="hidden items-center gap-9 md:text-sm md:font-medium lg:flex">
            {visibleNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={menuClassName(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-7">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="메뉴 열기"
              aria-expanded={isMobileMenuOpen}
              aria-controls={mobileMenuId}
              className="text-brand cursor-pointer lg:hidden"
            >
              <MenuIcon />
            </button>

            <Link href={user ? "/mypage" : "/login"} aria-label={user ? "마이페이지" : "로그인"}>
              <UserIcon className="text-brand cursor-pointer" />
            </Link>
          </div>
        </div>
      </Container>

      <MobileMenu
        id={mobileMenuId}
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        items={mobileNavItems}
        isActive={isActive}
      />
    </header>
  );
};

export default Header;
