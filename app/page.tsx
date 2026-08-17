"use client";

import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { WorkExplorer } from "./components/WorkExplorer";

const sectionIds = ["about", "experience", "work", "reflection"] as const;
type SectionId = (typeof sectionIds)[number];

function isSectionId(value: string): value is SectionId {
  return sectionIds.includes(value as SectionId);
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("about");

  const navigateTo = useCallback((id: string, pushHistory = true) => {
    if (!isSectionId(id)) return;
    setActiveSection(id);
    if (pushHistory) window.history.pushState(null, "", `#${id}`);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
  }, []);

  useEffect(() => {
    const syncFromLocation = () => {
      const hash = window.location.hash.slice(1);
      navigateTo(isSectionId(hash) ? hash : "about", false);
    };
    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    return () => {
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
    };
  }, [navigateTo]);

  return (
    <main className="deck-site">
      <div className="aurora" aria-hidden="true" />
      <Header activeId={activeSection} onNavigate={navigateTo} />
      {activeSection === "about" && <section className="landing-deck deck-slide section-shell" id="about">
        <div className="landing-copy">
          <span className="t-overline">About me · 个人介绍</span>
          <h1 className="landing-title"><span>Hi,</span><span>我是 <em>Kaiden</em></span></h1>
          <div className="landing-tags" aria-label="个性标签">
            <span className="chip chip-mint t-body-sm">热爱运动</span>
            <span className="chip chip-violet t-body-sm">勇于探索</span>
            <span className="chip chip-amber t-body-sm">旅行与体验</span>
            <span className="chip chip-rose t-body-sm">ENFP</span>
          </div>
          <p className="landing-signature">从业务目标出发，把复杂问题拆成清晰判断，用可落地、可验证的产品方案创造真实价值。</p>
        </div>
        <div className="landing-visual" aria-label="Kaiden 的运动生活照">
          <img src="/hero-athletic-outline-v2.png" alt="Kaiden 运动生活照" />
        </div>
        <div className="deck-page-no t-caption tnum">01 / 04</div>
      </section>}

      {activeSection === "experience" && <section className="experience-deck deck-slide section-shell" id="experience">
        <header className="slide-heading experience-heading">
          <div><span className="t-overline">Experience</span><h2 className="t-title-1">教育与实习经历</h2></div>
        </header>
        <div className="intro-experience-grid">
          <section className="experience-panel education-panel">
            <div className="panel-heading"><span className="t-overline">Education</span><h2 className="t-title-2">教育经历</h2></div>
            <div className="resume-entries education-entries">
              <article>
                <div className="entry-top"><h3 className="t-title-3">深圳大学</h3><time className="t-caption tnum">2024.09—至今</time></div>
                <p className="t-body-sm">管理科学与工程 · 硕士（推免）</p>
                <small className="t-caption tnum">GPA 3.68/4（3/11）</small>
                <div className="entry-honors"><span className="t-caption">研究生特等奖学金</span><span className="t-caption">研究生一等奖学金</span></div>
              </article>
              <article>
                <div className="entry-top"><h3 className="t-title-3">湖南农业大学</h3><time className="t-caption tnum">2020.09—2024.09</time></div>
                <p className="t-body-sm">工程管理 · 学士</p>
                <small className="t-caption tnum">GPA 3.77/4（2/86）</small>
                <div className="entry-honors"><span className="t-caption">湖南省优秀毕业生</span><span className="t-caption">BIM 毕设大赛全国二等奖</span></div>
              </article>
            </div>
          </section>
          <section className="experience-panel internship-panel">
            <div className="panel-heading"><span className="t-overline">Internship</span><h2 className="t-title-2">实习经历</h2></div>
            <div className="resume-entries internship-entries">
              <article className="featured-entry">
                <div className="entry-top"><h3 className="t-title-3">腾讯 · AI 产品应用中心</h3><time className="t-caption tnum">2026.05—2026.08</time></div>
                <p className="t-body-sm">产品经理（QQ 宠物业务）</p>
                <small className="t-caption">负责关系互动、陪伴养成、AI 对讲与裂变增长产品设计</small>
              </article>
              <article>
                <div className="entry-top"><h3 className="t-title-3">虎牙科技</h3><time className="t-caption tnum">2025.12—2026.03</time></div>
                <p className="t-body-sm">海外 KOL 运营实习生</p>
                <small className="t-caption">负责海外游戏赛道达人增长、分阶合作与投放体系优化</small>
              </article>
              <article>
                <div className="entry-top"><h3 className="t-title-3">OPPO · 应用分发部</h3><time className="t-caption tnum">2025.07—2025.09</time></div>
                <p className="t-body-sm">产品运营实习生</p>
                <small className="t-caption">负责搜索承接、内容供给与 AI 智能打标流程优化</small>
              </article>
            </div>
          </section>
        </div>
        <div className="deck-page-no t-caption tnum">02 / 04</div>
      </section>}

      {activeSection === "work" && <WorkExplorer />}

      {activeSection === "reflection" && <section className="reflection-deck deck-slide" id="reflection">
        <div className="section-shell reflection-deck-inner">
          <header className="slide-heading"><div><span className="t-overline">Reflection</span><h2 className="t-title-1">经验沉淀与思考</h2></div><p className="t-body-sm">把项目经验沉淀成可复用的产品判断，而不是一次性的执行动作。</p></header>
          <div className="reflection-map">
            <article><span className="t-overline tnum">01</span><h3 className="t-title-2">问题定义</h3><p className="t-body-sm">从业务目标向下拆解，先找到真正影响目标的核心矛盾，再设计可执行、可验证的产品答案。</p></article>
            <article><span className="t-overline tnum">02</span><h3 className="t-title-2">方案取舍</h3><p className="t-body-sm">综合用户价值、业务收益与实现成本给出判断；资源受限时，以 MVP 守住最关键的用户价值。</p></article>
            <article><span className="t-overline tnum">03</span><h3 className="t-title-2">体验设计</h3><p className="t-body-sm">从用户连续行为与情绪体验出发，让规则、反馈和产品调性形成一致的体验表达。</p></article>
            <article><span className="t-overline tnum">04</span><h3 className="t-title-2">AI 产品</h3><p className="t-body-sm">AI 能力不止是 Prompt，而是模型选择、业务评测、玩法设计与持续迭代的完整链路。</p></article>
          </div>
          <div className="reflection-closing"><strong className="t-body-sm">发现问题</strong><b aria-hidden="true">→</b><strong className="t-body-sm">拆解原因</strong><b aria-hidden="true">→</b><strong className="t-body-sm">明确目标</strong><b aria-hidden="true">→</b><strong className="t-body-sm">评估方案</strong><b aria-hidden="true">→</b><strong className="t-body-sm">验证结果</strong></div>
          <footer className="deck-footer"><span className="t-caption">付嘉俊 · 产品经理转正答辩</span><span className="t-overline">Thank you</span></footer>
        </div>
        <div className="deck-page-no section-shell t-caption tnum">04 / 04</div>
      </section>}
    </main>
  );
}
