import type { Metadata } from "next";
// Geist 폰트 가져오기 (산세리프 및 모노스페이스)
import { Geist, Geist_Mono } from "next/font/google";
// 전역 CSS 파일 가져오기
import "./globals.css";
// Next.js Link 컴포넌트 가져오기 (클라이언트 측 라우팅용)
import Link from "next/link";

// Geist Sans 폰트 설정 및 CSS 변수로 할당
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Geist Mono 폰트 설정 및 CSS 변수로 할당
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 메타데이터 객체 정의 (SEO 및 문서 제목 설정)
export const metadata: Metadata = {
  title: "사이트 A",
  description: "스프링부트, Next.js 연동",
};

/**
 * RootLayout 컴포넌트: 전체 애플리케이션의 최상위 레이아웃을 정의함.
 *
 * @param children 현재 라우트 세그먼트의 페이지 컴포넌트를 포함하는 React 노드
 * @returns HTML 문서 구조
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // HTML 문서 시작: 언어는 한국어(ko)로 설정
    <html lang="ko">
      <body
        // 폰트 CSS 변수 적용 및 기본 레이아웃 스타일 정의
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* 헤더 영역 시작 */}
        <header>
          {/* 내비게이션 바: Link 컴포넌트로 클라이언트 측 라우팅 구현 */}
          <nav className="flex">
            {/* 메인 페이지 링크 */}
            <Link href="/" className="p-2 rounded hover:bg-gray-700">
              메인
            </Link>
            {/* 글 목록 페이지 링크 */}
            <Link href="/posts" className="p-2 rounded hover:bg-gray-700">
              글 목록
            </Link>
          </nav>
        </header>
        {/* 메인 콘텐츠 영역 시작: flex-1로 남은 공간을 모두 채우도록 설정 */}
        <main className="flex-1 flex flex-col">{children}</main>
        {/* 푸터 영역 시작 */}
        <footer className="text-center p-2">푸터</footer>
      </body>
    </html>
  );
}