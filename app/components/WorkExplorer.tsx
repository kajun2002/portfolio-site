"use client";

import { useEffect, useRef, useState } from "react";
import { getWorkItem, workItems, type WorkItem } from "../data/workItems";

function AnimatedMetric({ value }: { value: string }) {
  const match = /^([+≈-]?)(\d+(?:\.\d+)?)(%)?$/.exec(value);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!match) return;
    const target = Number(match[2]);
    const decimals = (match[2].split(".")[1] ?? "").length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setDisplay(target); return; }

    let frame = 0;
    const startAnimation = () => {
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - started) / 800, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Number((target * eased).toFixed(decimals)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { startAnimation(); observer.disconnect(); }
    }, { threshold: .6 });
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);

  if (!match) return <strong className="t-metric">{value}</strong>;
  const decimals = (match[2].split(".")[1] ?? "").length;
  return <strong ref={ref} className={`t-metric tnum ${match[1] === "+" ? "metric-up" : ""}`}>{match[1]}{display.toFixed(decimals)}{match[3] && <span className="metric-unit">{match[3]}</span>}</strong>;
}

function MetricStrip({ metrics }: { metrics: WorkItem["metrics"] }) {
  return (
    <div className="work-metrics">
      {metrics.map((metric) => {
        const numeric = Number(metric.value.replace(/[^\d.]/g, ""));
        const barWidth = Number.isFinite(numeric) ? Math.min(numeric, 100) : 0;
        return <div key={metric.label}><AnimatedMetric value={metric.value} /><span className="t-caption">{metric.label}</span>{metric.value.includes("%") && <span className="metric-bar" aria-hidden="true"><i style={{ width: `${barWidth}%` }} /></span>}</div>;
      })}
    </div>
  );
}

const companionArtwork: Partial<Record<WorkItem["id"], { src: string; alt: string }>> = {
  sick: { src: "/qqpet-help-treatment.png", alt: "QQ 宠物帮忙治疗图标" },
  bath: { src: "/qqpet-bath-puff.png", alt: "沐浴球图标" },
  skill: { src: "/qqpet-intercom.png", alt: "AI 对讲图标" },
};

const fireConstraints = [
  ["火花不能轻易获得，否则不会珍惜", "连续互踩 3 天才建立火花"],
  ["建立过程难以感知", "加入火花「点亮中」状态，从第 1 天起给进度引导"],
  ["不能静态展示，需持续投入", "火花等级给出成长目标（正向牵引）+「待重燃」形成损失厌恶（负向约束）"],
  ["但也不能轻易失去，否则用户直接弃坑", "7 天容错窗口，保留恢复机会"],
];

function FireProjectDetail() {
  return (
    <div className="section-shell detail-body fire-case">
      <h2 className="sr-only">踩踩续火花项目复盘</h2>

      <section className="fire-st-flow" aria-label="从背景到核心判断的产品推导">
        <article className="fire-stage fire-stage-s">
          <div className="fire-stage-marker"><b>S</b><span>Background</span></div>
          <h3 className="t-title-2">背景</h3>
          <p className="t-body-sm">已有「踩踩」功能承接 QQ 资料卡点赞的轻互动习惯：低成本表达关注，也能外显社交活跃度。</p>
          <p className="t-body-sm">但它只能回答「我有多受欢迎」，无法回答「我和谁关系更特别」——互动完成即结束，双方没有继续投入的理由。</p>
        </article>

        <div className="fire-flow-arrow" aria-hidden="true">→</div>

        <article className="fire-stage fire-stage-t">
          <div className="fire-stage-marker"><b>T</b><span>Core thesis</span></div>
          <h3 className="t-title-2">核心判断</h3>
          <p className="t-body"><strong>需要把好友间的零散互动沉淀为社交资产。</strong></p>
          <p className="t-body-sm fire-force-lead">因为资产一旦形成，会同时产生两种力：</p>
          <div className="fire-force-model">
            <div><small>对自己是</small><strong>沉没成本</strong><span>不愿放弃已积累的东西</span></div>
            <b aria-hidden="true">＋</b>
            <div><small>对对方是</small><strong>社交压力</strong><span>不能单方面抛弃共同经营的关系</span></div>
          </div>
          <div className="fire-force-result"><span aria-hidden="true">↓</span><strong>这两种力共同驱动用户互动回访。</strong></div>
        </article>
      </section>

      <section className="fire-actions" aria-labelledby="fire-action-title">
        <header className="fire-section-heading"><div className="fire-stage-marker"><b>A</b><span>Action</span></div><h3 className="t-title-1" id="fire-action-title">行动</h3></header>

        <article className="fire-mechanism">
          <div className="fire-subsection-heading"><b className="tnum">01</b><h4 className="t-title-2">机制设计：从四项约束反推设计</h4></div>
          <div className="fire-constraint-table" role="table" aria-label="四项约束与对应设计">
            <div className="fire-constraint-head" role="row"><strong role="columnheader">约束</strong><span aria-hidden="true">→</span><strong role="columnheader">对应设计</strong></div>
            {fireConstraints.map(([constraint, design]) => (
              <div className="fire-constraint-row" role="row" key={constraint}>
                <span role="cell">{constraint}</span><b aria-hidden="true">→</b><span role="cell">{design}</span>
              </div>
            ))}
          </div>
        </article>

        <div className="fire-action-lower">
          <article className="fire-perception">
            <div className="fire-subsection-heading"><b className="tnum">02</b><h4 className="t-title-2">关系感知：让资产被看见</h4></div>
            <div className="fire-perception-map">
              <div><strong>关系可感知</strong><p className="t-body-sm">互动越频繁，火花等级越高，把持续投入转化为可见的成长进度</p></div>
              <span aria-hidden="true">＋</span>
              <div><strong>关系专属化</strong><p className="t-body-sm">多场景统一外显补足 QQ 宠物缺少高频关系展示位的短板；踩踩按钮异化为火花形态，配点亮动效，强化「这段关系与众不同」</p></div>
            </div>
          </article>

          <article className="fire-equity">
            <div className="fire-subsection-heading"><b className="tnum">03</b><h4 className="t-title-2">权益绑定：把关系资产变成账户资产</h4></div>
            <p className="t-body-sm">火花与勋章、宠物打工加成联动，形成闭环：</p>
            <div className="fire-equity-chain" aria-label="权益激励闭环">
              <span>持续互动</span><b aria-hidden="true">→</b><span>关系成长</span><b aria-hidden="true">→</b><span>权益解锁</span><b aria-hidden="true">→</b><span>反向激励互动</span>
            </div>
            <p className="t-body-sm">让用户动机从短期「打卡」升级为长期「经营」。</p>
          </article>
        </div>
      </section>

      <section className="fire-results" aria-labelledby="fire-result-title">
        <header className="fire-section-heading"><div className="fire-stage-marker"><b>R</b><span>Result</span></div><h3 className="t-title-1" id="fire-result-title">结果</h3></header>
        <div className="fire-result-grid">
          <article className="fire-retention-result"><div className="retention-values"><strong>65%</strong><span aria-hidden="true">→</span><strong>72%</strong></div><b className="result-delta">+7pp</b><p>踩踩次日留存 65% → 72%（+7pp）</p></article>
          <article className="fire-coverage-result"><div className="coverage-ring"><strong>≈70%</strong></div><p>续火花用户占踩踩用户约 70%</p></article>
          <article className="fire-frequency-result"><strong>+106.5%</strong><div className="comparison-bars" aria-hidden="true"><i /><i /></div><p>火花关系用户日均踩踩次数比非火花用户高 106.5%</p></article>
        </div>
      </section>
    </div>
  );
}

const bathSolutions = [
  [<><strong>进度条与清洁值对应</strong></>, "洗澡过程中即可实时感知清洁值变化"],
  [<><strong>段数即消耗量</strong>——按所选道具清洁力划分节点（香皂片 10 点／段，浴球 30 点／段）</>, "消耗预期前置到操作之前，开始前即知总成本"],
  [<><strong>拖拽即时推进</strong>——进度条随手势实时反馈</>, "保留搓澡的过程感与操作乐趣"],
  [<><strong>达节点方结算</strong>——推至节点才扣除道具并计入清洁值，未达则回退且不消耗</>, "消除误扣顾虑，规则严谨且可回退"],
];

function BathProjectDetail() {
  return (
    <div className="section-shell detail-body bath-case">
      <h2 className="sr-only">洗澡与一键护理项目复盘</h2>
      <p className="bath-scope-note t-caption">本节不展开该需求的完整内容，仅聚焦当时遇到的一个核心交互难点。</p>

      <section className="bath-background" aria-labelledby="bath-background-title">
        <div className="bath-stage-marker"><b>S</b><span>Background</span></div>
        <div><h3 className="t-title-2" id="bath-background-title">背景</h3><p className="t-body">洗澡是宠物养成中的高频照顾行为，采用<strong>拖拽香皂搓澡</strong>的交互形式完成。</p></div>
      </section>

      <section className="bath-challenge" aria-labelledby="bath-challenge-title">
        <header className="bath-section-heading"><div className="bath-stage-marker"><b>T</b><span>Core challenge</span></div><h3 className="t-title-1" id="bath-challenge-title">核心难点：连续交互下的消耗不可预期</h3></header>

        <div className="bath-compare" aria-label="离散交互与连续交互对比">
          <article className="bath-compare-discrete">
            <span className="bath-compare-label">喂食 · 离散交互</span>
            <div className="bath-discrete-flow"><span>点击一次</span><b aria-hidden="true">→</b><span>扣除一个饼干</span><b aria-hidden="true">→</b><span>增加 10 点体力</span></div>
            <p className="t-body-sm">一次操作对应一次结算，用户对成本有天然预期。</p>
          </article>
          <div className="bath-vs" aria-hidden="true">VS</div>
          <article className="bath-compare-continuous">
            <span className="bath-compare-label">拖拽搓澡 · 连续交互</span>
            <div className="bath-continuous-line"><span>开始拖拽</span><i /><span>何时结算？</span></div>
            <p className="t-body-sm">拖拽搓澡不具备这种操作边界，由此产生两个问题：</p>
            <div className="bath-pain-points">
              <div><b>01</b><strong>消耗不可预期。</strong><span>用户既无法预判&quot;洗至干净需要多少道具&quot;，也无法感知&quot;拖动到何种程度会扣除一块香皂&quot;。</span></div>
              <div><b>02</b><strong>心智规则断裂。</strong><span>用户已建立&quot;一次操作 = 一次消耗 = 一次收益&quot;的认知，连续交互打破了这一规则，带来误操作顾虑与消费迟疑。</span></div>
            </div>
          </article>
        </div>

        <div className="bath-rejected" aria-label="两种不成立的直觉方案">
          <h4 className="t-title-3">而两种直觉方案均不成立：</h4>
          <article><span>方案 A</span><strong>按时长实时扣除</strong><p className="t-body-sm">时长与道具数量无法一一对应（1 秒扣一块，那 1.5 秒呢），规则本身即不可解释；</p></article>
          <article><span>方案 B</span><strong>结束后一次性结算</strong><p className="t-body-sm">过程中缺乏反馈，用户对实际扣除量心里没底，容易担心被多扣。</p></article>
        </div>

        <blockquote className="bath-core-insight"><small>真正要解决的不是&quot;扣多少&quot;，而是</small><strong>让用户在连续操作中，同时获得过程感与消耗预期</strong></blockquote>
      </section>

      <section className="bath-solution" aria-labelledby="bath-solution-title">
        <header className="bath-section-heading"><div className="bath-stage-marker"><b>A</b><span>Action</span></div><div><h3 className="t-title-1" id="bath-solution-title">解法：分段进度条 + 节点结算</h3><p className="t-body-sm">将连续动作离散化，把进度条从展示组件重新定义为<strong>连续交互与离散消耗之间的转译中介</strong>。</p></div></header>
        <div className="bath-solution-layout">
          <figure className="bath-demo">
            <video src="/qqpet-bath-demo.mov" autoPlay muted loop playsInline controls preload="metadata" aria-label="拖拽香皂搓澡与分段进度反馈演示" />
            <figcaption className="t-caption"><strong>核心概念</strong><span>分段进度条 + 节点结算</span></figcaption>
          </figure>
          <div className="bath-solution-map" role="table" aria-label="设计与解决问题的对应关系">
            <div className="bath-solution-head" role="row"><strong role="columnheader">设计</strong><span aria-hidden="true">→</span><strong role="columnheader">解决的问题</strong></div>
            {bathSolutions.map(([design, outcome], index) => (
              <div className="bath-solution-row" role="row" key={index}>
                <span role="cell">{design}</span><b aria-hidden="true">→</b><span role="cell">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bath-result" aria-labelledby="bath-result-title">
        <div className="bath-stage-marker"><b>R</b><span>Result &amp; learning</span></div>
        <div><h3 className="t-title-2" id="bath-result-title">结果与沉淀</h3><p className="t-body">本次设计在<strong>保留原有拖拽交互趣味性</strong>的基础上，最大限度对齐了用户的操作预期，优化了连续交互下的消耗感知。</p><p className="t-body">同时也提升了我<strong>从用户体验视角出发、针对交互类需求进行体验优化</strong>的设计能力。</p></div>
      </section>
    </div>
  );
}

export function WorkExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? getWorkItem(selectedId) : undefined;

  function openProject(id: string) {
    setSelectedId(id);
    window.setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  function closeProject() {
    setSelectedId(null);
    window.setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  function toggleProject(id: string) {
    openProject(id);
  }

  const fire = getWorkItem("fire")!;
  const invite = getWorkItem("invite")!;
  const companion = workItems.filter((item) => item.level2 === "人－宠物");

  return (
    <section className="work-deck" id="work">
      {!selected ? <div className="section-shell work-overview">
        <header className="slide-heading">
          <div><span className="t-overline">Work map · QQ 宠物</span><h2 className="t-title-1">从业务目标到产品答案</h2></div>
          <p className="t-body-sm">围绕 QQ 关系链构建与维系目标，以 QQ 宠物为载体，从 <strong>促活</strong> 与 <strong>拉新</strong> 两条主线出发：促活围绕「人—人」与「人—宠物」两层关系提升互动与回访，拉新通过社交裂变拓展新增领养。</p>
        </header>

        <div className="work-tree" aria-label="实习工作目录">
          <article className="tree-branch activate-branch">
            <div className="branch-title"><span className="t-overline tnum">01 / Activation</span><h3 className="t-title-2">促活：</h3><p className="t-body-sm">提高存量活跃</p></div>
            <div className="branch-content">
              <section className="relationship-group primary-group">
                <div className="group-label"><strong className="t-title-3">人－人</strong><small>沉淀关系资产，强化彼此感知</small></div>
                <button className={`project-node project-node-main tone-${fire.tone}`} type="button" onClick={() => toggleProject(fire.id)} aria-controls="work-detail">
                  <div className="node-title-row"><h4 className="t-title-2">{fire.title}</h4><span className="node-priority t-caption">重点项目</span></div><p className="t-body-sm">{fire.subtitle}</p>
                  <img className="fire-level-art" src="/qqpet-fire-levels.png" alt="不同阶段的火花关系图标" />
                  <MetricStrip metrics={fire.metrics} />
                </button>
              </section>
              <section className="relationship-group companion-group">
                <div className="group-label"><strong className="t-title-3">人－宠物</strong><small>打造被需要感，加深情感投入</small></div>
                <div className="companion-nodes">
                  {companion.map((item) => (
                    <button className={`project-node compact-node tone-${item.tone} ${companionArtwork[item.id] ? "has-art" : ""}`} type="button" key={item.id} onClick={() => toggleProject(item.id)} aria-controls="work-detail">
                      <span className="t-title-3">{item.title}</span><small className="t-body-sm">{item.subtitle}</small><i className="node-plus" aria-hidden="true">＋</i>
                      {companionArtwork[item.id] && <img className="compact-node-art" src={companionArtwork[item.id]!.src} alt={companionArtwork[item.id]!.alt} />}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </article>

          <article className="tree-branch acquire-branch">
            <div className="branch-title"><span className="t-overline tnum">02 / Acquisition</span><h3 className="t-title-2">拉新：</h3><p className="t-body-sm">拓展新增来源</p></div>
            <div className="branch-content single-branch-content">
              <div className="group-label"><strong className="t-title-3">社交裂变</strong></div>
              <button className={`project-node project-node-main tone-${invite.tone}`} type="button" onClick={() => toggleProject(invite.id)} aria-controls="work-detail">
                <div className="node-title-row"><h4 className="t-title-2">{invite.title}</h4><span className="node-priority t-caption">增长项目</span></div><p className="t-body-sm">{invite.subtitle}</p>
                <img className="invite-bar-art" src="/qqpet-invite-bar.png" alt="邀请奖励活动栏：限时邀请好友领养并获得奖励" />
                <MetricStrip metrics={invite.metrics} />
              </button>
            </div>
          </article>
        </div>
      </div> : (
            <div className={`work-detail tone-${selected.tone}`} id="work-detail" role="region" aria-label={`${selected.title}项目复盘`}>
              <div className="context-bar">
                <div className="section-shell context-inner">
                  <div className="context-path t-caption"><span>{selected.level1}</span>{selected.level2 && <><b aria-hidden="true">›</b><span>{selected.level2}</span></>}<b aria-hidden="true">›</b><strong>{selected.title}</strong></div>
                  <div className="context-switcher" aria-label="切换项目">
                    {workItems.map((item) => <button type="button" key={item.id} className={`t-caption ${item.id === selected.id ? "active" : ""}`} onClick={() => openProject(item.id)}>{item.title}</button>)}
                    <button className="collapse-detail t-caption" type="button" onClick={closeProject}>收起详情 ×</button>
                  </div>
                </div>
              </div>
              {selected.id === "fire" ? <FireProjectDetail /> : selected.id === "bath" ? <BathProjectDetail /> : <div className="section-shell detail-body">
                <h2 className="sr-only">{selected.title}项目复盘</h2>
                <div className="detail-framing">
                  <article><span className="t-overline">Background</span><h3 className="t-title-2">问题背景</h3><p className="t-body-sm">{selected.background}</p></article>
                  <article className="thesis-card"><span className="t-overline">Core thesis</span><h3 className="t-title-2">核心判断</h3><p className="t-body">{selected.thesis}</p></article>
                </div>
                <section className="detail-actions">
                  <div className="detail-section-title"><span className="t-overline">Action</span><h3 className="t-title-1">产品推导与核心方案</h3></div>
                  <div className="action-grid">
                    {selected.sections.map((section, index) => <article key={section.title}><b className="tnum">{String(index + 1).padStart(2, "0")}</b><h4 className="t-title-3">{section.title}</h4><p className="t-body-sm">{section.body}</p></article>)}
                  </div>
                </section>
                <section className="detail-result"><span className="t-overline">Result / Learning</span><p className="t-body">{selected.result}</p></section>
              </div>}
            </div>
      )}
    </section>
  );
}
