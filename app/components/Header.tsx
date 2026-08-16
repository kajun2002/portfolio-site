export function Header() {
  return (
    <header className="site-header">
      <div className="section-shell header-inner">
        <a className="brand" href="/#about" aria-label="返回个人介绍"><span aria-hidden="true">K</span><div><strong className="t-title-3">Kaiden Fu</strong><small className="t-caption">Product Portfolio</small></div></a>
        <nav aria-label="主导航"><a className="t-body-sm" href="/#about">个人介绍</a><a className="t-body-sm" href="/#work">实习主要工作</a><a className="t-body-sm" href="/#reflection">经验沉淀与思考</a></nav>
      </div>
    </header>
  );
}
