import { ContactButton } from "./components/ContactButton";
import { Header } from "./components/Header";
import { projects } from "./data/projects";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="hero section-shell" id="about">
        <div className="hero-copy reveal">
          <div className="eyebrow"><span className="status-dot" /> 产品经理 · AI 产品与社交体验</div>
          <h1>把用户问题，<br /><span>推导成可验证的产品答案。</span></h1>
          <p className="hero-lead">我是付嘉俊，关注关系型产品、AI 陪伴体验与增长策略。我的工作习惯是从业务目标出发，找到核心矛盾，在用户价值、业务收益和实现成本之间做清晰取舍。</p>
          <div className="hero-actions">
            <a className="button primary" href="#work">查看主要工作 <span aria-hidden>↘</span></a>
            <ContactButton className="button secondary" />
          </div>
          <div className="hero-meta"><span>深圳大学 · 管理科学与工程</span><span>腾讯 QQ 宠物 · 产品经理</span><span>求职方向 · 产品经理</span></div>
        </div>
        <div className="hero-visual reveal delay-1" aria-label="付嘉俊个人照片">
          <div className="portrait-card">
            <div className="portrait-crop"><img src="/resume-profile-source.png" alt="付嘉俊" /></div>
            <div className="portrait-caption"><div><strong>Kaiden Fu</strong><span>Product Manager</span></div><div className="paw-mark" aria-hidden>✦</div></div>
          </div>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="floating-note note-one">关系机制</div><div className="floating-note note-two">AI 评测</div>
        </div>
      </section>

      <section className="strategy-band"><div className="section-shell strategy-grid">
        <div><span className="section-kicker">WORK LOGIC</span><h2>我的工作，接在 QQ 的关系目标上</h2></div>
        <div className="strategy-flow" aria-label="QQ 宠物工作主线">
          <div className="flow-node"><span>01</span><strong>拉新</strong><small>引入新的关系</small></div><div className="flow-line"><i /></div>
          <div className="flow-node"><span>02</span><strong>促活</strong><small>激活已有关系</small></div><div className="flow-line"><i /></div>
          <div className="flow-node accent"><span>03</span><strong>留存</strong><small>让关系持续发生</small></div>
        </div>
      </div></section>

      <section className="section-shell work-section" id="work">
        <div className="section-heading"><div><span className="section-kicker">SELECTED WORK</span><h2>主要工作</h2></div><p>首页看结论，进入项目看完整的背景、推导、方案与取舍。</p></div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <a href={`/projects/${project.slug}`} className={`project-card tone-${project.tone}`} key={project.slug}>
              <div className="project-card-top"><span className="project-index">0{index + 1}</span><span className="project-tag">{project.tag}</span></div>
              <div className="project-icon" aria-hidden>{project.icon}</div><h3>{project.title}</h3><p>{project.summary}</p>
              <div className="metric-row">{project.metrics.slice(0, 2).map((metric) => <div className="metric" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
              <div className="card-link">查看完整复盘 <span aria-hidden>→</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="experience-section" id="experience"><div className="section-shell">
        <div className="section-heading light"><div><span className="section-kicker">EXPERIENCE</span><h2>教育与实习经历</h2></div><p>工程管理与管理科学训练，让我同时关注体验逻辑与落地约束。</p></div>
        <div className="experience-grid">
          <div className="experience-column"><h3>教育经历</h3>
            <article className="timeline-item"><div className="timeline-dot" /><span className="timeline-date">2024.09 — 至今</span><h4>深圳大学 <em>推免</em></h4><p>管理科学与工程 · 硕士</p><small>GPA 3.68/4 · 专业排名 3/11</small></article>
            <article className="timeline-item"><div className="timeline-dot" /><span className="timeline-date">2020.09 — 2024.09</span><h4>湖南农业大学</h4><p>工程管理 · 学士</p><small>GPA 3.77/4 · 专业排名 2/86</small></article>
          </div>
          <div className="experience-column"><h3>实习经历</h3>
            <article className="timeline-item featured"><div className="timeline-dot" /><span className="timeline-date">2026.05 — 2026.08</span><h4>腾讯 · AI 产品应用中心</h4><p>产品经理（QQ 宠物业务）</p><small>关系增长、养成体验、AI 对讲与产品质量治理</small></article>
            <article className="timeline-item"><div className="timeline-dot" /><span className="timeline-date">2025.07 — 2025.09</span><h4>OPPO · 应用分发部</h4><p>产品运营</p><small>重建搜索承接链路，搜索满足率由 58% 提升至 65%</small></article>
          </div>
        </div>
      </div></section>

      <section className="section-shell reflection-section" id="reflection">
        <div className="section-heading"><div><span className="section-kicker">REFLECTION</span><h2>个人总结与思考</h2></div><p>项目给我的不只是功能经验，更是一套可以复用的判断方式。</p></div>
        <div className="reflection-layout">
          <div className="reflection-statement"><span>我的产品方法</span><h3>从目标出发，<br />用判断连接问题与结果。</h3><p>发现问题 → 拆解原因 → 明确目标 → 评估方案 → 验证结果</p></div>
          <div className="reflection-list">
            <article><span>01</span><div><h4>先定义问题，再讨论方案</h4><p>从大盘目标向下拆到可行动作，让每一层都有论证、不重不漏。</p></div></article>
            <article><span>02</span><div><h4>产品经理需要给出判断</h4><p>汇报不止呈现选项，还要基于用户价值、业务收益与风险给出当下最优解。</p></div></article>
            <article><span>03</span><div><h4>AI 是能力放大器，不是判断替代品</h4><p>用 AI 提升原型和评测效率，但业务边界、体验标准和最终决策必须由产品负责。</p></div></article>
            <article><span>04</span><div><h4>上线是验证的开始</h4><p>同时关注漏斗内优化与功能天花板，把数据复盘转化为下一轮产品判断。</p></div></article>
          </div>
        </div>
      </section>
      <section className="contact-cta"><div className="section-shell contact-cta-inner"><div><span className="section-kicker">LET&apos;S CONNECT</span><h2>期待一起，把复杂问题做成清晰产品。</h2></div><ContactButton className="button white" label="联系我" /></div></section>
      <footer className="footer section-shell"><span>© 2026 Kaiden Fu</span><span>Product · AI · Social Experience</span></footer>
    </main>
  );
}
