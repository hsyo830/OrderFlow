"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import type { NavItem } from "@/constants/navigation";
import { cn } from "@/lib/cn/utils";

import CloseIcon from "../icons/CloseIcon";
import Container from "./Container";

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  items: readonly NavItem[];
  isActive: (path: string) => boolean;
}

const MobileMenu = ({ id, isOpen, onClose, items, isActive }: MobileMenuProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 열리면 메뉴 안으로 포커스 이동
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // 열려 있는 동안 배경 스크롤 잠금
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // Esc로 닫기 + Tab 포커스를 메뉴 안에 가두기
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      const isInside = panelRef.current.contains(active);

      if (event.shiftKey && (active === first || !isInside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !isInside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 열린 채로 lg 이상으로 커지면 닫기 (스크롤 잠금이 남지 않도록)
  useEffect(() => {
    if (!isOpen) return;

    const mediaQuery = window.matchMedia("(min-width: 64rem)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isOpen, onClose]);

  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="전체 메뉴"
      inert={!isOpen}
      className={cn(
        "bg-background fixed inset-0 z-50 flex flex-col lg:hidden",
        "motion-safe:transition-[translate,visibility] motion-safe:duration-300 motion-safe:ease-out",
        isOpen ? "visible translate-x-0" : "invisible translate-x-full",
      )}
    >
      <div className="flex w-full justify-center border-b">
        <Container>
          <div className="flex w-full items-center justify-between py-5">
            <span className="font-logo text-brand text-xl">JARIYO</span>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="메뉴 닫기"
              className="text-brand cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>
        </Container>
      </div>

      <nav aria-label="모바일 메뉴" className="flex w-full flex-1 justify-center overflow-y-auto">
        <Container>
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href} className="border-b">
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block py-5 text-lg font-medium transition-colors",
                    isActive(item.href)
                      ? "text-brand font-semibold"
                      : "text-foreground hover:text-brand-hover active:text-brand-active",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </div>
  );
};

export default MobileMenu;
