import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "경제지표 차트 생성기",
  description:
    "한국은행 ECOS API와 KOSIS API 데이터를 활용한 경제지표 시계열 차트 생성 도구",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
