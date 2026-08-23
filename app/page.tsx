"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "./components/Header";
import { WorkExplorer } from "./components/WorkExplorer";

const sectionIds = ["about", "experience", "work", "reflection"] as const;
type SectionId = (typeof sectionIds)[number];

function isSectionId(value: string): value is SectionId {
  return sectionIds.includes(value as SectionId);
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const [isWaving, setIsWaving] = useState(false);
  const scrollLockTimer = useRef<number | null>(null);
  const waveTimer = useRef<number | null>(null);
  const isProgrammaticScroll = useRef(false);

  const triggerWave = useCallback(() => {
    if (isWaving) return;
    setIsWaving(true);
    if (waveTimer.current) window.clearTimeout(waveTimer.current);
    waveTimer.current = window.setTimeout(() => {
      setIsWaving(false);
      waveTimer.current = null;
    }, 1450);
  }, [isWaving]);

  const updateActiveFromScroll = useCallback(() => {
    if (isProgrammaticScroll.current) return;
    const headerHeight = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
    const marker = window.scrollY + headerHeight + 2;
    let current: SectionId = "about";
    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= marker) current = id;
    }
    setActiveSection(current);
    if (window.location.hash !== `#${current}`) {
      window.history.replaceState(null, "", `#${current}`);
    }
  }, []);

  const navigateTo = useCallback((id: string, pushHistory = true, smooth = true) => {
    if (!isSectionId(id)) return;
    const section = document.getElementById(id);
    if (!section) return;
    setActiveSection(id);
    if (pushHistory) window.history.pushState(null, "", `#${id}`);
    if (scrollLockTimer.current) window.clearTimeout(scrollLockTimer.current);
    isProgrammaticScroll.current = true;
    const headerHeight = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: Math.max(0, section.offsetTop - headerHeight),
      behavior: smooth && !reduceMotion ? "smooth" : "instant",
    });
    scrollLockTimer.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
      updateActiveFromScroll();
    }, smooth && !reduceMotion ? 900 : 50);
  }, [updateActiveFromScroll]);

  useEffect(() => {
    const syncFromLocation = () => {
      const hash = window.location.hash.slice(1);
      window.requestAnimationFrame(() => navigateTo(isSectionId(hash) ? hash : "about", false, false));
    };
    syncFromLocation();
    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    return () => {
      if (scrollLockTimer.current) window.clearTimeout(scrollLockTimer.current);
      if (waveTimer.current) window.clearTimeout(waveTimer.current);
      window.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
    };
  }, [navigateTo, updateActiveFromScroll]);

  return (
    <main className="deck-site">
      <div className="aurora" aria-hidden="true" />
      <Header activeId={activeSection} onNavigate={navigateTo} />
      <section className="landing-deck deck-slide section-shell" id="about">
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
        <button
          type="button"
          className={`landing-visual${isWaving ? " is-waving" : ""}`}
          onClick={triggerWave}
          disabled={isWaving}
          aria-label={isWaving ? "Kaiden 正在挥手打招呼" : "点击 Kaiden，让他挥手打招呼"}
        >
          <img className="hero-ai hero-ai-standing" src="/hero-ai-standing.png" alt="Kaiden 与小狗的 3D 卡通形象" />
          <img className="hero-ai hero-ai-waving" src="/hero-ai-waving.png" alt="" aria-hidden="true" />
          <span className="speech-bubble" aria-hidden="true">Hi, 👋</span>
        </button>
      </section>

      <section className="experience-deck deck-slide section-shell" id="experience">
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
      </section>

      <WorkExplorer />

      <section className="reflection-deck deck-slide" id="reflection">
        <div className="section-shell reflection-deck-inner">
          <header className="slide-heading reflection-heading">
            <div><span className="t-overline">Reflection</span><h2 className="t-title-1">经验沉淀与思考</h2></div>
          </header>

          <div className="reflection-groups">
            <section className="reflection-group" aria-labelledby="reflection-experience-title">
              <header className="reflection-group-head">
                <span className="t-overline tnum">01 / EXPERIENCE</span>
                <h3 id="reflection-experience-title" className="t-title-2">经验沉淀</h3>
              </header>
              <div className="reflection-list">
                <article className="reflection-item">
                  <span className="reflection-tag">闭环</span>
                  <div className="reflection-item-head"><span className="tnum">01</span><h4>走过需求 0-1 的全流程</h4></div>
                  <p className="reflection-key">从需求洞察到数据复盘，每个环节都有第一手认知。</p>
                  <p className="reflection-support">实习中完整参与了用户洞察、PRD 撰写、设计开发对接、上线验收与数据复盘。</p>
                </article>
                <article className="reflection-item">
                  <span className="reflection-tag">Owner</span>
                  <div className="reflection-item-head"><span className="tnum">02</span><h4>具备 owner 意识，推动项目落地</h4></div>
                  <p className="reflection-key">对项目结果负责，关键节点主动判断、推动落地。</p>
                  <p className="reflection-support">独立负责邀请奖励活动一/二期、洗澡交互、踩踩续火花多期优化；两天上线窗口下将活动拆为两条消息，守住「感知到具体是谁」的核心目标抢下流量。</p>
                </article>
                <article className="reflection-item">
                  <span className="reflection-tag">协作</span>
                  <div className="reflection-item-head"><span className="tnum">03</span><h4>跨团队协作能力</h4></div>
                  <p className="reflection-key">产品是跨团队协作的枢纽：把各方拉齐到同一目标，专业能力才能转化为落地结果。</p>
                  <p className="reflection-support">与设计、开发对接时清楚产品要输出什么、把守哪条边界；邀请奖励活动涉及点券与黑灰产风险时，主动拉通安全同学配置防刷规则。</p>
                </article>
                <article className="reflection-item">
                  <span className="reflection-tag">提效</span>
                  <div className="reflection-item-head"><span className="tnum">04</span><h4>AI 与工具提效能力</h4></div>
                  <p className="reflection-key">把 AI 从「辅助表达」用成「个人工作系统」。</p>
                  <p className="reflection-support">用 AI 生成 HTML 原型、概念视觉图与简易 Demo；把高频工作沉淀为可复用方法——整理数据埋点与需求文档 skill，将标准流程、注意事项、AI 易错点固化下来。</p>
                </article>
              </div>
            </section>

            <section className="reflection-group reflection-thinking" aria-labelledby="reflection-thinking-title">
              <header className="reflection-group-head">
                <span className="t-overline tnum">02 / THINKING</span>
                <h3 id="reflection-thinking-title" className="t-title-2">产品思考</h3>
              </header>
              <div className="reflection-list">
                <article className="reflection-item">
                  <span className="reflection-tag">判断</span>
                  <div className="reflection-item-head"><span className="tnum">01</span><h4>提出想法只是起点，给出判断才是产品价值</h4></div>
                  <p className="reflection-key">产品判断是在用户价值、业务目标与实现成本之间做阶段性取舍。</p>
                  <p className="reflection-support">火花需求中我曾提出参考抖音增加「点亮中」状态。复盘后意识到「加一个状态」很简单，但<strong>为什么加、怎么加</strong>（不打扰、不产生社交压力地完成引导）才是产品要回答的问题。</p>
                </article>
                <article className="reflection-item">
                  <span className="reflection-tag">方法</span>
                  <div className="reflection-item-head"><span className="tnum">02</span><h4>AI 可以提效，但不能代替业务判断</h4></div>
                  <p className="reflection-key">AI 帮我表达得更快，不能替我想清楚。</p>
                  <p className="reflection-support">业务背景、用户路径与状态流转，最了解的人只能是自己——过度依赖 AI 的典型失败是「文档看似完整，核心逻辑不闭环」。我的顺序：先想清楚边界，再交给 AI 做表达。</p>
                </article>
                <article className="reflection-item">
                  <span className="reflection-tag">复盘</span>
                  <div className="reflection-item-head"><span className="tnum">03</span><h4>复盘与沉淀，是让经验变成能力的唯一方式</h4></div>
                  <p className="reflection-key">做完不等于结束，能否复用才决定成长速度。</p>
                  <p className="reflection-support">复盘围绕固定问题：问题定义是否清楚、评审是否反复、上线数据是否符合预期、卡点能否用流程避免；同时把评审结论与数据口径显性化同步，协作方清楚结论与下一步，需求才顺畅。</p>
                </article>
              </div>
            </section>
          </div>

          <section className="reflection-finale" aria-labelledby="reflection-finale-title">
            <span className="t-overline">总结</span>
            <p>这段实习让我从基础执行，逐步建立起产品闭环意识、跨团队协作能力、工具提效能力与复盘沉淀习惯。</p>
            <p><strong id="reflection-finale-title" className="finale-highlight">从「能完成分配的需求」，到「能定义问题、论证路径、推动落地并判断下一步」。</strong></p>
            <p>后续我希望继续提升业务理解、产品判断与复杂需求推进能力。</p>
          </section>
          <footer className="deck-footer"><span className="t-caption">付嘉俊 · 产品经理转正答辩</span><span className="t-overline">Thank you</span></footer>
        </div>
      </section>
    </main>
  );
}
