import "./globals.css";

import type { Metadata } from "next";
import { Toaster } from "sonner";

import { blackHanSans } from "@/lib/fonts";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "자리요! | 공연 티켓 예매",
  description: "기다리던 공연, 원하는 자리에서. 간편하게 공연을 예매해보세요.",
};

// sonner는 toast 타입별 색을 --normal-*/--success-*/--error-* CSS 변수로 읽는다
// (https://github.com/emilkowalski/sonner 참고). inline style로 넘기는 이유는
// sonner가 자체 styles.css를 import하므로, globals.css에 같은 선택자로 값을
// 정의해도 번들 시 CSS 로드 순서에 따라 sonner 기본값이 나중에 이겨버릴 수
// 있기 때문 — inline style은 항상 외부 스타일시트보다 우선하므로 이 문제가 없다.
const toasterThemeStyle = {
  "--normal-bg": "var(--color-surface)",
  "--normal-border": "var(--color-border)",
  "--normal-text": "var(--color-text)",
  "--success-bg": "var(--color-success-soft)",
  "--success-border": "var(--color-success)",
  "--success-text": "var(--color-success)",
  "--error-bg": "var(--color-danger-soft)",
  "--error-border": "var(--color-danger)",
  "--error-text": "var(--color-danger)",
} as React.CSSProperties;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={blackHanSans.variable}>
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
        <Toaster style={toasterThemeStyle} />
      </body>
    </html>
  );
}
