import { ContactButton } from "./ContactButton";

export function Header() {
  return (
    <header className="site-header">
      <div className="section-shell header-inner">
        <a className="brand" href="/"><span>K</span><div><strong>Kaiden Fu</strong><small>Product Portfolio</small></div></a>
        <nav aria-label="主导航"><a href="/#about">个人简介</a><a href="/#work">工作全景</a><a href="/#reflection">总结思考</a></nav>
        <ContactButton className="header-contact" />
      </div>
    </header>
  );
}
