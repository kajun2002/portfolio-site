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
            <span className="deck-overline">ABOUT ME · 个人介绍</span>
            <h1>付嘉俊 <small>Kaiden Fu</small></h1>
            <p>关注关系型产品、AI 陪伴体验与增长策略；习惯从业务目标出发，定位核心矛盾并给出可验证的产品方案。</p>
            <div className="deck-tags"><span>🏃 热爱运动</span><span>⌘ AI Coding 探索者</span><span>✈ 旅行体验派</span></div>
          </div>
        </div>
        <div className="intro-experience-grid">
          <section className="experience-panel education-panel">
            <div className="panel-heading"><span>EDUCATION</span><h2>教育经历</h2></div>
            <div className="resume-entries education-entries">
              <article>
                <div className="entry-top"><h3>深圳大学</h3><time>2024.09—至今</time></div>
                <p>管理科学与工程 · 硕士（推免）</p>
                <small>GPA 3.68/4（3/11）</small>
                <div className="entry-honors"><span>研究生特等奖学金</span><span>研究生一等奖学金</span></div>
              </article>
              <article>
                <div className="entry-top"><h3>湖南农业大学</h3><time>2020.09—2024.09</time></div>
                <p>工程管理 · 学士</p>
                <small>GPA 3.77/4（2/86）</small>
                <div className="entry-honors"><span>湖南省优秀毕业生</span><span>BIM 毕设大赛全国二等奖</span></div>
              </article>
            </div>
          </section>
          <section className="experience-panel internship-panel">
            <div className="panel-heading"><span>INTERNSHIP</span><h2>实习经历</h2></div>
            <div className="resume-entries internship-entries">
              <article className="featured-entry">
                <div className="entry-top"><h3>腾讯 · AI 产品应用中心</h3><time>2026.05—2026.08</time></div>
                <p>产品经理（QQ 宠物业务）</p>
                <small>负责关系互动、陪伴养成、AI 对讲与裂变增长产品设计</small>
              </article>
              <article>
                <div className="entry-top"><h3>虎牙科技</h3><time>2025.12—2026.03</time></div>
                <p>海外 KOL 运营实习生</p>
                <small>负责海外游戏赛道达人增长、分阶合作与投放体系优化</small>
              </article>
              <article>
                <div className="entry-top"><h3>OPPO · 应用分发部</h3><time>2025.07—2025.09</time></div>
                <p>产品运营实习生</p>
                <small>负责搜索承接、内容供给与 AI 智能打标流程优化</small>
              </article>
            </div>
          </section>
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
          <footer className="deck-footer"><span>付嘉俊 · 产品经理转正答辩</span><span>THANK YOU</span></footer>
        </div>
        <div className="deck-page-no section-shell">03 / 03</div>
      </section>
    </main>
  );
}
