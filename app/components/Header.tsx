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

  return (
    <header className="site-header">
      <div className="section-shell header-inner">
        <a className="brand" href="#about" aria-label="返回个人介绍" onClick={(event) => { event.preventDefault(); onNavigate("about"); }}><span aria-hidden="true">K</span><div><strong className="t-title-3">Kaiden Fu</strong><small className="t-caption">Product Portfolio</small></div></a>
        <nav aria-label="主导航">
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
