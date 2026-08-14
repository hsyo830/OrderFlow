import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ticketing",
  description: "실시간 대기열과 좌석 선점을 지원하는 티켓 예매 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
