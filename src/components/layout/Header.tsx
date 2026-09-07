"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuthStore } from "@/stores/authStore";

import MenuIcon from "../icons/MenuIcon";
import UserIcon from "../icons/UserIcon";
import Container from "./Container";

const Header = () => {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname?.startsWith(path);
  };

  const menuClassName = (path: string) =>
    `transition-colors ${
      isActive(path)
        ? "text-brand font-semibold border-b border-primary"
        : "hover:text-brand-hover active:text-brand-active"
    }`;

  return (
    <header className="flex w-full items-center justify-center border-b">
      <Container>
        <div className="flex w-full items-center justify-between py-5">
          <Link href="/" className="text-brand text-xl font-bold">
            TICKET
          </Link>

          <nav className="hidden items-center gap-9 md:text-sm md:font-medium lg:flex">
            <Link href="/" className={menuClassName("/")}>
              홈
            </Link>

            <Link href="/tickets" className={menuClassName("/tickets")}>
              예매하기
            </Link>

            {user && (
              <Link href="/mypage" className={menuClassName("/mypage")}>
                마이페이지
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4 md:gap-7">
            <MenuIcon className="text-brand cursor-pointer lg:hidden" />

            <Link href={user ? "/mypage" : "/login"} aria-label={user ? "마이페이지" : "로그인"}>
              <UserIcon className="text-brand cursor-pointer" />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
