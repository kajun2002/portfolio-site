import { ContactButton } from "./components/ContactButton";
import { Header } from "./components/Header";
import { WorkExplorer } from "./components/WorkExplorer";

export default function Home() {
  return (
    <main className="deck-site">
      <Header />
      <section className="deck-intro deck-slide section-shell" id="about">
        <div className="deck-profile">
          <div className="deck-photo"><img src="/resume-profile-source.png" alt="付嘉俊" /></div>
          <div className="deck-identity">
            <span className="deck-overline">ABOUT ME · 产品经理</span>
            <h1>付嘉俊 <small>Kaiden Fu</small></h1>
            <p>关注关系型产品、AI 陪伴体验与增长策略；习惯从业务目标出发，定位核心矛盾并给出可验证的产品方案。</p>
            <div className="deck-tags"><span>社交机制</span><span>AI 产品</span><span>增长策略</span><span>体验设计</span></div>
            <ContactButton className="deck-contact" />
          </div>
        </div>
        <div className="deck-experience">
          <div className="deck-section-title"><span>EDUCATION & EXPERIENCE</span><h2>个人经历</h2></div>
          <div className="career-line">
            <article><time>2020.09</time><i /><h3>湖南农业大学</h3><p>工程管理 · 学士</p><small>GPA 3.77/4 · 2/86</small></article>
            <article><time>2024.09</time><i /><h3>深圳大学</h3><p>管理科学与工程 · 硕士（推免）</p><small>GPA 3.68/4 · 3/11</small></article>
            <article><time>2025.07</time><i /><h3>OPPO · 应用分发部</h3><p>产品运营</p><small>搜索承接与内容供给优化</small></article>
            <article className="current"><time>2026.05</time><i /><h3>腾讯 · AI 产品应用中心</h3><p>产品经理（QQ 宠物）</p><small>社交、养成、AI 对讲与增长</small></article>
          </div>
        </div>
        <div className="deck-page-no">01 / 03</div>
      </section>

      <WorkExplorer />

      <section className="reflection-deck deck-slide" id="reflection">
        <div className="section-shell reflection-deck-inner">
          <header className="slide-heading"><div><span>REFLECTION</span><h2>经验沉淀与思考</h2></div><p>把项目经验沉淀成可复用的产品判断，而不是一次性的执行动作。</p></header>
          <div className="reflection-map">
            <article><span>01</span><h3>问题定义</h3><p>从业务目标向下拆解，先找到真正影响目标的核心矛盾，再设计可执行、可验证的产品答案。</p></article>
            <article><span>02</span><h3>方案取舍</h3><p>综合用户价值、业务收益与实现成本给出判断；资源受限时，以 MVP 守住最关键的用户价值。</p></article>
            <article><span>03</span><h3>体验设计</h3><p>从用户连续行为与情绪体验出发，让规则、反馈和产品调性形成一致的体验表达。</p></article>
            <article><span>04</span><h3>AI 产品</h3><p>AI 能力不止是 Prompt，而是模型选择、业务评测、玩法设计与持续迭代的完整链路。</p></article>
          </div>
          <div className="reflection-closing"><strong>发现问题</strong><b>→</b><strong>拆解原因</strong><b>→</b><strong>明确目标</strong><b>→</b><strong>评估方案</strong><b>→</b><strong>验证结果</strong></div>
          <footer className="deck-footer"><span>付嘉俊 · 产品经理作品集</span><ContactButton className="deck-contact" label="联系我" /></footer>
        </div>
        <div className="deck-page-no section-shell">03 / 03</div>
      </section>
    </main>
  );
}
