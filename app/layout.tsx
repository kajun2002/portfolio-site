import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "付嘉俊｜产品经理作品集",
  description: "付嘉俊的产品工作、项目复盘与个人思考。",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
