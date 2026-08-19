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
                  <MetricStrip metrics={fire.metrics} /><span className="node-action t-body-sm">展开项目复盘 <b aria-hidden="true">→</b></span>
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
                <MetricStrip metrics={invite.metrics} /><span className="node-action t-body-sm">展开项目复盘 <b aria-hidden="true">→</b></span>
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
              <div className="section-shell detail-body">
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
              </div>
            </div>
      )}
    </section>
  );
}
