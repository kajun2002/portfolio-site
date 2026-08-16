"use client";

import { useState } from "react";
import { getWorkItem, workItems, type WorkItem } from "../data/workItems";

function MetricStrip({ metrics }: { metrics: WorkItem["metrics"] }) {
  return (
    <div className="work-metrics">
      {metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
    </div>
  );
}

export function WorkExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? getWorkItem(selectedId) : undefined;

  function choose(id: string) {
    setSelectedId(id);
    window.setTimeout(() => document.getElementById("work-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
  }

  const fire = getWorkItem("fire")!;
  const invite = getWorkItem("invite")!;
  const companion = workItems.filter((item) => item.level2 === "人－宠物");

  return (
    <section className="work-deck" id="work">
      <div className="section-shell work-overview">
        <header className="slide-heading">
          <div><span>WORK MAP · QQ 宠物</span><h2>从业务目标到产品答案</h2></div>
          <p>围绕 <b>促活</b> 与 <b>拉新</b> 两条主线，分别经营“人－人”关系、“人－宠物”陪伴，并拓展新增来源。点击项目展开复盘。</p>
        </header>

        <div className="work-tree" aria-label="实习工作目录">
          <article className="tree-branch activate-branch">
            <div className="branch-title"><span>01</span><div><small>ACTIVATION</small><h3>促活</h3></div><p>提升关系活跃与回访</p></div>
            <div className="branch-content">
              <section className="relationship-group primary-group">
                <div className="group-label"><small>关系对象</small><strong>人－人</strong></div>
                <button className="project-node project-node-main tone-orange" type="button" onClick={() => choose(fire.id)} aria-expanded={selectedId === fire.id}>
                  <span className="node-priority">重点项目</span><h4>{fire.title}</h4><p>{fire.subtitle}</p><MetricStrip metrics={fire.metrics} /><i>展开项目复盘 →</i>
                </button>
              </section>
              <section className="relationship-group companion-group">
                <div className="group-label"><small>关系对象</small><strong>人－宠物</strong></div>
                <div className="companion-nodes">
                  {companion.map((item) => (
                    <button className={`project-node compact-node tone-${item.tone}`} type="button" key={item.id} onClick={() => choose(item.id)} aria-expanded={selectedId === item.id}>
                      <span>{item.title}</span><small>{item.subtitle}</small><i>＋</i>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </article>

          <article className="tree-branch acquire-branch">
            <div className="branch-title"><span>02</span><div><small>ACQUISITION</small><h3>拉新</h3></div><p>拓展新增领养来源</p></div>
            <div className="branch-content single-branch-content">
              <button className="project-node project-node-main tone-blue" type="button" onClick={() => choose(invite.id)} aria-expanded={selectedId === invite.id}>
                <span className="node-priority">增长项目</span><h4>{invite.title}</h4><p>{invite.subtitle}</p><MetricStrip metrics={invite.metrics} /><i>展开项目复盘 →</i>
              </button>
              <div className="growth-logic"><span>自然增长放缓</span><b>→</b><span>关系链触达</span><b>→</b><span>完成领养</span></div>
            </div>
          </article>
        </div>
        <div className="deck-page-no">02 / 03</div>
      </div>

      {selected && (
        <div className={`work-detail detail-${selected.tone}`} id="work-detail">
          <div className="context-bar">
            <div className="section-shell context-inner">
              <div className="context-path"><span>{selected.level1}</span>{selected.level2 && <><b>›</b><span>{selected.level2}</span></>}<b>›</b><strong>{selected.title}</strong></div>
              <div className="context-switcher">
                {workItems.map((item) => <button type="button" key={item.id} className={item.id === selected.id ? "active" : ""} onClick={() => choose(item.id)}>{item.title}</button>)}
                <button className="collapse-detail" type="button" onClick={() => setSelectedId(null)}>收起 ×</button>
              </div>
            </div>
          </div>
          <div className="section-shell detail-body">
            <header className="detail-hero">
              <div><span className="detail-path">{selected.level1} / {selected.level2 ?? "增长"}</span><h2>{selected.title}</h2><p>{selected.subtitle}</p></div>
              <MetricStrip metrics={selected.metrics} />
            </header>
            <div className="detail-framing">
              <article><span>BACKGROUND</span><h3>问题背景</h3><p>{selected.background}</p></article>
              <article className="thesis-card"><span>CORE THESIS</span><h3>核心判断</h3><p>{selected.thesis}</p></article>
            </div>
            <section className="detail-actions">
              <div className="detail-section-title"><span>ACTION</span><h3>产品推导与核心方案</h3></div>
              <div className="action-grid">
                {selected.sections.map((section, index) => <article key={section.title}><b>{String(index + 1).padStart(2, "0")}</b><h4>{section.title}</h4><p>{section.body}</p></article>)}
              </div>
            </section>
            <section className="detail-result"><span>RESULT / LEARNING</span><p>{selected.result}</p></section>
          </div>
        </div>
      )}
    </section>
  );
}
