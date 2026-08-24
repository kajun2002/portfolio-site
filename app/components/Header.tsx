import { useEffect, useRef } from "react";

const navigation = [
  { id: "about", label: "个人介绍" },
  { id: "experience", label: "个人经历" },
  { id: "work", label: "实习主要工作" },
  { id: "reflection", label: "经验沉淀与思考" },
];

type HeaderProps = {
  activeId: string;
  onNavigate: (id: string) => void;
};

export function Header({ activeId, onNavigate }: HeaderProps) {
  const navRef = useRef<HTMLElement | null>(null);

  // 窄屏导航装不下四个标签会横向滚动，把当前项居中，
  // 避免用户看不到自己正处在哪一节。只改 scrollLeft，不影响页面纵向滚动。
  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector<HTMLElement>("a.active");
    if (!nav || !active || nav.scrollWidth <= nav.clientWidth) return;
    const navRect = nav.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const offset = activeRect.left - navRect.left - (navRect.width - activeRect.width) / 2;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    nav.scrollTo({ left: Math.max(0, nav.scrollLeft + offset), behavior: reduceMotion ? "instant" : "smooth" });
  }, [activeId]);

  return (
    <header className="site-header">
      <div className="section-shell header-inner">
        <a className="brand" href="#about" aria-label="返回个人介绍" onClick={(event) => { event.preventDefault(); onNavigate("about"); }}><span aria-hidden="true">K</span><div><strong className="t-title-3">Kaiden Fu</strong><small className="t-caption">Product Portfolio</small></div></a>
        <nav aria-label="主导航" ref={navRef}>
          {navigation.map((item) => (
            <a
              key={item.id}
              className={`t-body-sm${activeId === item.id ? " active" : ""}`}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "page" : undefined}
              onClick={(event) => { event.preventDefault(); onNavigate(item.id); }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
