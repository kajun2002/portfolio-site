import { ContactButton } from "./ContactButton";

export function Header() {
  return (
    <header className="site-header">
      <div className="section-shell header-inner">
        <a className="brand" href="/"><span>K</span><div><strong>Kaiden Fu</strong><small>Product Portfolio</small></div></a>
        <nav aria-label="主导航"><a href="/#about">关于我</a><a href="/#work">主要工作</a><a href="/#experience">个人经历</a><a href="/#reflection">总结思考</a></nav>
        <ContactButton className="header-contact" />
      </div>
    </header>
  );
}
