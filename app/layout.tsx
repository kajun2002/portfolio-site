import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kaiden-product-portfolio.lijueying666.chatgpt.site"),
  title: "付嘉俊｜产品经理作品集",
  description: "付嘉俊的产品工作、项目复盘与个人思考。",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "付嘉俊｜产品经理作品集",
    description: "关系机制、AI 产品与增长策略——QQ 宠物产品项目复盘。",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "付嘉俊产品经理作品集" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "付嘉俊｜产品经理转正答辩",
    description: "关系机制、AI 产品与增长策略——QQ 宠物产品项目复盘。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
