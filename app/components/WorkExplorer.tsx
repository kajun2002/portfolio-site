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
      {metrics.map((metric) => <div key={metric.label}><AnimatedMetric value={metric.value} /><span className="t-caption">{metric.label}</span></div>)}
    </div>
  );
}

export function WorkExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const selected = selectedId ? getWorkItem(selectedId) : undefined;

  useEffect(() => () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  function openProject(id: string) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setSelectedId(id);
    window.requestAnimationFrame(() => setExpanded(true));
    window.setTimeout(() => document.getElementById("work-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
  }

  function closeProject() {
    setExpanded(false);
    closeTimer.current = window.setTimeout(() => {
      setSelectedId(null);
      window.requestAnimationFrame(() => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 320);
  }

  function toggleProject(id: string) {
    if (selectedId === id && expanded) { closeProject(); return; }
    openProject(id);
  }

  const fire = getWorkItem("fire")!;
  const invite = getWorkItem("invite")!;
  const companion = workItems.filter((item) => item.level2 === "人－宠物");

  return (
    <section className="work-deck" id="work">
      {!selected && <div className="section-shell work-overview">
        <header className="slide-heading">
          <div><span className="t-overline">Work map · QQ 宠物</span><h2 className="t-title-1">从业务目标到产品答案</h2></div>
          <p className="t-body-sm">围绕 <strong>促活</strong> 与 <strong>拉新</strong> 两条主线，分别经营“人－人”关系、“人－宠物”陪伴，并拓展新增来源。点击项目即可在当前页面展开复盘。</p>
        </header>

        <div className="work-tree" aria-label="实习工作目录">
          <article className="tree-branch activate-branch">
            <div className="branch-title"><span className="t-overline tnum">01 / Activation</span><h3 className="t-title-2">促活</h3><p className="t-body-sm">提升关系活跃与用户回访</p></div>
            <div className="branch-content">
              <section className="relationship-group primary-group">
                <div className="group-label"><small className="t-caption">关系对象</small><strong className="t-title-3">人－人</strong></div>
                <button className="project-node project-node-main" type="button" onClick={() => toggleProject(fire.id)} aria-expanded={selectedId === fire.id && expanded} aria-controls="work-detail-panel">
                  <span className="node-priority t-caption">重点项目</span><h4 className="t-title-2">{fire.title}</h4><p className="t-body-sm">{fire.subtitle}</p><MetricStrip metrics={fire.metrics} /><span className="node-action t-body-sm">{selectedId === fire.id && expanded ? "收起项目复盘" : "展开项目复盘"} <b aria-hidden="true">→</b></span>
                </button>
              </section>
              <section className="relationship-group companion-group">
                <div className="group-label"><small className="t-caption">关系对象</small><strong className="t-title-3">人－宠物</strong></div>
                <div className="companion-nodes">
                  {companion.map((item) => (
                    <button className="project-node compact-node" type="button" key={item.id} onClick={() => toggleProject(item.id)} aria-expanded={selectedId === item.id && expanded} aria-controls="work-detail-panel">
                      <span className="t-title-3">{item.title}</span><small className="t-body-sm">{item.subtitle}</small><i className="node-plus" aria-hidden="true">＋</i>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </article>

          <article className="tree-branch acquire-branch">
            <div className="branch-title"><span className="t-overline tnum">02 / Acquisition</span><h3 className="t-title-2">拉新</h3><p className="t-body-sm">拓展新增领养来源</p></div>
            <div className="branch-content single-branch-content">
              <button className="project-node project-node-main" type="button" onClick={() => toggleProject(invite.id)} aria-expanded={selectedId === invite.id && expanded} aria-controls="work-detail-panel">
                <span className="node-priority t-caption">增长项目</span><h4 className="t-title-2">{invite.title}</h4><p className="t-body-sm">{invite.subtitle}</p><MetricStrip metrics={invite.metrics} /><span className="node-action t-body-sm">{selectedId === invite.id && expanded ? "收起项目复盘" : "展开项目复盘"} <b aria-hidden="true">→</b></span>
              </button>
              <div className="growth-logic" aria-label="增长链路"><span className="t-caption">自然增长放缓</span><b aria-hidden="true">→</b><span className="t-caption">关系链触达</span><b aria-hidden="true">→</b><span className="t-caption">完成领养</span></div>
            </div>
          </article>
        </div>
        <div className="deck-page-no t-caption tnum">02 / 03</div>
      </div>}

      <div className={`detail-expand ${expanded ? "is-open" : ""}`} id="work-detail-panel">
        <div className="detail-expand-inner">
          {selected && (
            <div className="work-detail" id="work-detail" role="region" aria-label={`${selected.title}项目复盘`}>
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
                <header className="detail-hero">
                  <div><span className="t-overline">{selected.level1} / {selected.level2 ?? "增长"}</span><h2 className="t-title-1">{selected.title}</h2><p className="t-body">{selected.subtitle}</p></div>
                  <MetricStrip metrics={selected.metrics} />
                </header>
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
        </div>
      </div>
    </section>
  );
}
