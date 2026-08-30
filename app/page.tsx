"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "./components/Header";
import { WorkExplorer } from "./components/WorkExplorer";
import { isSectionId, parseHash, sectionIds, toHash, type SectionId } from "./route";

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const [projectId, setProjectId] = useState<string | null>(null);
  const projectIdRef = useRef<string | null>(null);
  const [isWaving, setIsWaving] = useState(false);
  const scrollLockTimer = useRef<number | null>(null);
  const waveTimer = useRef<number | null>(null);
  const isProgrammaticScroll = useRef(false);
  const visualRef = useRef<HTMLButtonElement | null>(null);
  const heroImgRef = useRef<HTMLImageElement | null>(null);
  const [heroBox, setHeroBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  // 滚动监听里要读当前项目，但不能让它成为监听器的依赖，否则每次切换都要重绑
  useEffect(() => {
    projectIdRef.current = projectId;
  }, [projectId]);

  // 计算 hero 图片内容（object-fit: contain）在容器内的实际显示区域，
  // 让气泡锚定到图片本身，屏幕缩放时不偏移。
  useEffect(() => {
    const update = () => {
      const img = heroImgRef.current;
      const visual = visualRef.current;
      if (!img || !visual || !img.naturalWidth) return;
      const ir = img.getBoundingClientRect();
      const vr = visual.getBoundingClientRect();
      const scale = Math.min(ir.width / img.naturalWidth, ir.height / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      setHeroBox({
        x: ir.left - vr.left + (ir.width - w) / 2,
        y: ir.top - vr.top + (ir.height - h),
        w,
        h,
      });
    };
    update();
    const ro = new ResizeObserver(update);
    const visual = visualRef.current;
    const img = heroImgRef.current;
    if (visual) ro.observe(visual);
    window.addEventListener("resize", update);
    img?.addEventListener("load", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      img?.removeEventListener("load", update);
    };
  }, []);

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
    // 详情页打开时 URL 归项目所有，滚动不得把 #work/fire 改写回 #work
    if (projectIdRef.current) return;
    if (window.location.hash !== `#${current}`) {
      window.history.replaceState(null, "", `#${current}`);
    }
  }, []);

  // 详情的开合会改变页面高度，所以位置要等布局稳定后再测量。
  const scrollToSection = useCallback((id: SectionId, smooth: boolean) => {
    if (scrollLockTimer.current) window.clearTimeout(scrollLockTimer.current);
    isProgrammaticScroll.current = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = smooth && !reduceMotion ? "smooth" : "instant";
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      const section = document.getElementById(id);
      const headerHeight = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
      if (section) window.scrollTo({ top: Math.max(0, section.offsetTop - headerHeight), behavior });
      scrollLockTimer.current = window.setTimeout(() => {
        isProgrammaticScroll.current = false;
        updateActiveFromScroll();
      }, behavior === "smooth" ? 900 : 80);
    }));
  }, [updateActiveFromScroll]);

  const navigateTo = useCallback((id: string) => {
    if (!isSectionId(id)) return;
    setProjectId(null);
    setActiveSection(id);
    window.history.pushState(null, "", toHash(id));
    scrollToSection(id, true);
  }, [scrollToSection]);

  const openProject = useCallback((id: string) => {
    setProjectId(id);
    setActiveSection("work");
    window.history.pushState(null, "", toHash("work", id));
    scrollToSection("work", false);
  }, [scrollToSection]);

  const closeProject = useCallback(() => {
    setProjectId(null);
    setActiveSection("work");
    window.history.pushState(null, "", toHash("work"));
    scrollToSection("work", false);
  }, [scrollToSection]);

  useEffect(() => {
    const syncFromLocation = () => {
      const route = parseHash(window.location.hash);
      setProjectId(route.projectId);
      setActiveSection(route.section);
      scrollToSection(route.section, false);
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
  }, [scrollToSection, updateActiveFromScroll]);

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
          ref={visualRef}
          className={`landing-visual${isWaving ? " is-waving" : ""}`}
          onClick={triggerWave}
          disabled={isWaving}
          aria-label={isWaving ? "Kaiden 正在挥手打招呼" : "点击 Kaiden，让他挥手打招呼"}
        >
          <img ref={heroImgRef} className="hero-ai hero-ai-standing" src="/hero-ai-standing.png" alt="Kaiden 与小狗的 3D 卡通形象" />
          <img className="hero-ai hero-ai-waving" src="/hero-ai-waving.png" alt="" aria-hidden="true" />
          <span
            className="speech-bubble"
            style={heroBox ? { left: heroBox.x + heroBox.w * 0.04, top: heroBox.y + heroBox.h * 0.12 } : undefined}
            aria-hidden="true"
          >Hi, 👋</span>
          <span
            className="speech-bubble speech-bubble-pet"
            style={heroBox ? { left: heroBox.x + heroBox.w * 0.87, top: heroBox.y + heroBox.h * 0.66 } : undefined}
            aria-hidden="true"
          >Hi，我是巴乐</span>
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
                <div className="entry-top"><h3 className="t-title-3">腾讯 · AI 应用产品中心</h3><time className="t-caption tnum">2026.05—2026.08</time></div>
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

      <WorkExplorer selectedId={projectId} onOpen={openProject} onClose={closeProject} />

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
                  <div className="reflection-item-head"><span className="tnum">01</span><h4>完整跑通需求 0-1 全流程</h4><span className="reflection-tag">闭环</span></div>
                  <p className="reflection-support">实习期间完整参与用户洞察、方案设计、PRD 撰写、设计开发协同、上线验收与数据复盘，<strong>能够从需求判断持续跟进至上线结果，并结合数据与用户反馈迭代方案</strong>。</p>
                </article>
                <article className="reflection-item">
                  <div className="reflection-item-head"><span className="tnum">02</span><h4>具备 Owner 意识，推动项目落地</h4><span className="reflection-tag">Owner意识</span></div>
                  <p className="reflection-support">独立负责邀请奖励活动一/二期、洗澡交互、踩踩续火花等多期需求。面对排期、资源与方案变化，<strong>能够围绕核心目标主动判断优先级并做取舍</strong>。例如邀请活动仅有两天上线窗口时，将方案拆分为两条消息分阶段交付，优先保证用户能够感知「成功邀请的是谁」这一核心目标。</p>
                </article>
                <article className="reflection-item">
                  <div className="reflection-item-head"><span className="tnum">03</span><h4>跨团队协作与风险意识</h4><span className="reflection-tag">协作</span></div>
                  <p className="reflection-support">需求推进中不仅关注方案本身，也会<strong>提前识别实现边界、协作依赖与潜在风险</strong>。与设计、开发明确方案优先级与实现边界；邀请奖励活动涉及点券资产及黑灰产风险时，主动拉通安全团队配置防刷规则，保障活动安全上线。</p>
                </article>
                <article className="reflection-item">
                  <div className="reflection-item-head"><span className="tnum">04</span><h4>AI 应用与提效</h4><span className="reflection-tag">AI提效</span></div>
                  <p className="reflection-support">使用 AI 快速生成 HTML 原型、概念视觉图与简易 Demo，提升方案验证效率；同时<strong>将数据埋点、需求文档等高频工作沉淀为可复用 Skill</strong>，将标准流程、检查项和常见易错点固化，减少重复工作与交付遗漏。</p>
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
                  <div className="reflection-item-head"><span className="tnum">01</span><h4>AI 时代，产品经理的价值是策略决策</h4><span className="reflection-tag">判断</span></div>
                  <p className="reflection-support">AI 可以快速完成信息整理、问题罗列和方案生成等重复性工作，但无法替代产品经理做最终判断。<strong>产品经理的核心价值，是定义问题、明确目标、做出取舍</strong>。</p>
                  <p className="reflection-support">例如火花需求中，我曾提出增加「点亮中」状态，复盘后意识到，关键不在于「要加」，而在于为什么加、解决什么问题、会带来什么副作用，以及是否适合当前产品阶段。</p>
                </article>
                <article className="reflection-item">
                  <div className="reflection-item-head"><span className="tnum">02</span><h4>从平台逻辑转向用户体验</h4><span className="reflection-tag">体验</span></div>
                  <p className="reflection-support">生病需求原通过弹窗告知宠物自愈，但既遮挡宠物表现，也削弱了主人回归时的情感连接，因此改为由宠物以角色口吻表达状态变化。这让我意识到，<strong>平台逻辑关注「信息有没有传达」，产品设计更要关注「用户如何感知这条信息」</strong>，让功能自然融入用户体验。</p>
                </article>
                <article className="reflection-item">
                  <div className="reflection-item-head"><span className="tnum">03</span><h4>把项目经验沉淀为可复用能力</h4><span className="reflection-tag">复盘</span></div>
                  <p className="reflection-support">每次项目结束后，我会复盘哪些判断有效、哪些问题前期遗漏、哪些卡点可以提前规避，并<strong>将重复问题进一步沉淀为流程、检查项或工具</strong>，避免在后续项目中重复踩坑。</p>
                </article>
              </div>
            </section>
          </div>

          <section className="reflection-group" aria-labelledby="reflection-finale-title">
            <header className="reflection-group-head">
              <span className="t-overline tnum">03 / SUMMARY</span>
              <h3 id="reflection-finale-title" className="t-title-2">总结</h3>
            </header>
            <div className="reflection-finale">
              <p>这段实习让我从基础执行，逐步建立起产品闭环意识、跨团队协作能力、工具提效能力与复盘沉淀习惯。</p>
              <p><strong className="finale-highlight">从「能完成分配的需求」，成长到「能定义问题、论证路径、推动落地并判断下一步」。</strong></p>
              <p>后续我希望继续提升业务理解、产品判断与复杂需求推进能力。</p>
            </div>
          </section>
          <footer className="deck-footer"><span className="t-caption">付嘉俊 · 产品经理转正答辩</span><span className="t-overline">Thank you</span></footer>
        </div>
      </section>
    </main>
  );
}
