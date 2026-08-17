"use client";

import { useEffect, useState } from "react";

const navigation = [
  { id: "about", label: "个人介绍" },
  { id: "experience", label: "个人经历" },
  { id: "work", label: "实习主要工作" },
  { id: "reflection", label: "经验沉淀与思考" },
];

export function Header() {
  const [activeId, setActiveId] = useState("about");

  useEffect(() => {
    const currentHash = window.location.hash.slice(1);
    if (navigation.some((item) => item.id === currentHash)) setActiveId(currentHash);

    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.1, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="section-shell header-inner">
        <a className="brand" href="/#about" aria-label="返回个人介绍"><span aria-hidden="true">K</span><div><strong className="t-title-3">Kaiden Fu</strong><small className="t-caption">Product Portfolio</small></div></a>
        <nav aria-label="主导航">
          {navigation.map((item) => (
            <a
              key={item.id}
              className={`t-body-sm${activeId === item.id ? " active" : ""}`}
              href={`/#${item.id}`}
              aria-current={activeId === item.id ? "page" : undefined}
              onClick={() => setActiveId(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
