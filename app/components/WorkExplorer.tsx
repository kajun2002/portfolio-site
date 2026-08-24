"use client";

import { useEffect, useRef, useState } from "react";
import { getWorkItem, workItems, type WorkItem } from "../data/workItems";
import { toHash } from "../route";

/** 左栏直接复用工作地图的树状分组，让详情页里也能看到项目所属的主线。 */
const railBranches = [
  {
    overline: "01 / Activation",
    label: "促活",
    groups: [
      { label: "人－人", items: workItems.filter((item) => item.level1 === "促活" && item.level2 === "人－人") },
      { label: "人－宠物", items: workItems.filter((item) => item.level1 === "促活" && item.level2 === "人－宠物") },
    ],
  },
  {
    overline: "02 / Acquisition",
    label: "拉新",
    groups: [{ label: "社交裂变", items: workItems.filter((item) => item.level1 === "拉新") }],
  },
];

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

type DetailSectionHeadingProps = {
  letter: string;
  english: string;
  title: string;
  id?: string;
  className?: string;
};

function DetailSectionHeading({ english, title, id, className = "" }: DetailSectionHeadingProps) {
  return (
    <header className={`detail-heading${className ? ` ${className}` : ""}`}>
      <div className="detail-heading-copy">
        <span className="detail-heading-english">{english}</span>
        <h3 className="detail-heading-title" id={id}>{title}</h3>
      </div>
    </header>
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
          <DetailSectionHeading letter="S" english="Background" title="背景" />
          <p className="t-body-sm">已有「踩踩」功能承接 QQ 资料卡点赞的轻互动习惯：低成本表达关注，也能外显社交活跃度。</p>
          <p className="t-body-sm">但它只能回答「我有多受欢迎」，无法回答「我和谁关系更特别」——互动完成即结束，双方没有继续投入的理由。</p>
          <figure className="fire-background-figure">
            <img src="/fire-behavior-migration.png" alt="从 QQ 资料卡点赞到 QQ 宠物踩踩的轻互动行为迁移示意图" />
            <figcaption className="t-caption">行为迁移：从 QQ 资料卡点赞到宠物主页「踩踩」互动</figcaption>
          </figure>
        </article>

        <div className="fire-flow-arrow" aria-hidden="true">→</div>

        <article className="fire-stage fire-stage-t">
          <DetailSectionHeading letter="T" english="Core thesis" title="核心判断" />
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
        <DetailSectionHeading letter="A" english="Action" title="行动" id="fire-action-title" />

        <article className="fire-mechanism">
          <div className="fire-subsection-heading"><b className="tnum">01</b><h4 className="t-title-2">机制设计：从四项约束反推设计</h4></div>
          <div className="fire-mechanism-grid">
            <div className="fire-constraint-table" role="table" aria-label="四项约束与对应设计">
              <div className="fire-constraint-head" role="row"><strong role="columnheader">约束</strong><span aria-hidden="true">→</span><strong role="columnheader">对应设计</strong></div>
              {fireConstraints.map(([constraint, design]) => (
                <div className="fire-constraint-row" role="row" key={constraint}>
                  <span role="cell">{constraint}</span><b aria-hidden="true">→</b><span role="cell">{design}</span>
                </div>
              ))}
            </div>
            <figure className="fire-mechanism-figure">
              <img src="/fire-stages-and-levels.png" alt="火花从点亮、成长到待重燃的阶段与分级设计" />
              <figcaption className="t-caption">火花阶段与分级：由关系建立、成长到维护，承接四项约束的完整机制</figcaption>
            </figure>
          </div>
        </article>

        <div className="fire-action-lower">
          <article className="fire-perception">
            <div className="fire-subsection-heading"><b className="tnum">02</b><h4 className="t-title-2">关系感知：让资产被看见</h4></div>
            <div className="fire-perception-map">
              <div className="fire-perception-item">
                <strong>关系可感知</strong>
                <p className="t-body-sm">互动越频繁，火花等级越高，把持续投入转化为可见的成长进度</p>
                <figure className="fire-perception-media">
                  <img src="/fire-relationship-card.jpg" alt="展示互踩天数与好友关系的火花分享卡" />
                  <figcaption className="t-caption">将互动时长转化为可展示的关系成果</figcaption>
                </figure>
              </div>
              <span aria-hidden="true">＋</span>
              <div className="fire-perception-item">
                <strong>关系专属化</strong>
                <p className="t-body-sm">多场景统一外显补足 QQ 宠物缺少高频关系展示位的短板；踩踩按钮异化为火花形态，配点亮动效，强化「这段关系与众不同」</p>
                <figure className="fire-perception-media">
                  <video src="/fire-exclusive-animation.mov" controls preload="metadata" playsInline aria-label="火花关系专属动效演示">
                    当前浏览器不支持视频播放。
                  </video>
                  <figcaption className="t-caption">点击播放：火花状态与专属交互动效</figcaption>
                </figure>
              </div>
            </div>
          </article>

          <article className="fire-equity">
            <div className="fire-subsection-heading"><b className="tnum">03</b><h4 className="t-title-2">权益绑定：把关系资产变成账户资产</h4></div>
            <div className="fire-equity-layout">
              <div className="fire-equity-copy">
                <p className="t-body-sm">火花与勋章、宠物打工加成联动，形成闭环：</p>
                <div className="fire-equity-chain" aria-label="权益激励闭环">
                  <span>持续互动</span><b aria-hidden="true">→</b><span>关系成长</span><b aria-hidden="true">→</b><span>权益解锁</span><b aria-hidden="true">→</b><span>反向激励互动</span>
                </div>
                <p className="t-body-sm">让用户动机从短期「打卡」升级为长期「经营」。</p>
              </div>
              <div className="fire-equity-figures">
                <figure className="fire-equity-figure">
                  <img src="/fire-medal.jpg" alt="续火花满七天后获得的火花勋章" />
                  <figcaption className="t-caption">关系成长后解锁火花勋章</figcaption>
                </figure>
                <figure className="fire-equity-figure">
                  <img src="/fire-spark-bonus.png" alt="不同火花等级对应不同的宠物打工金币加成" />
                  <figcaption className="t-caption">火花等级越高，打工加成越多</figcaption>
                </figure>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="fire-results" aria-labelledby="fire-result-title">
        <DetailSectionHeading letter="R" english="Result" title="结果" id="fire-result-title" />
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

function SicknessProjectDetail() {
  return (
    <div className="section-shell detail-body sickness-case">
      <h2 className="sr-only">生病机制项目复盘</h2>

      <section className="sickness-st-flow" aria-label="从背景到核心作用的产品推导">
        <article className="sickness-stage sickness-stage-s">
          <DetailSectionHeading letter="S" english="Background" title="背景" />
          <p className="t-body">养成玩法缺少「不照顾会有代价」的负向激励，宠物状态始终稳定，用户缺少必须回来的理由。</p>
        </article>

        <div className="sickness-flow-arrow" aria-hidden="true">→</div>

        <article className="sickness-stage sickness-stage-t">
          <DetailSectionHeading letter="T" english="Core role" title="核心作用" />
          <p className="t-body">通过生病状态强化宠物的被需要感，以负向激励驱动用户定期回访照顾。</p>
          <p className="t-body">同时把生病这一负向状态，转化为社交互动与流失召回的触点。</p>
        </article>
      </section>

      <section className="sickness-actions" aria-labelledby="sickness-action-title">
        <DetailSectionHeading letter="A" english="Action" title="两个核心设计" id="sickness-action-title" />
        <div className="sickness-action-grid">
          <article className="sickness-action-card">
            <div className="sickness-action-heading">
              <b className="tnum">01</b>
              <h4 className="t-title-2">帮好友治疗：把负向状态转化为社交互动</h4>
            </div>
            <p className="t-body-sm">推动「帮好友治疗」功能上线，好友可为生病宠物提供治疗，形成「发现—帮助—回访致谢」的互动闭环，让生病不只是个人负担，也成为好友间的互动理由。</p>
            <div className="sickness-action-loop" aria-label="好友治疗互动闭环">
              <span>发现</span><b aria-hidden="true">→</b><span>帮助</span><b aria-hidden="true">→</b><span>回访致谢</span>
            </div>
            <figure className="sickness-action-media">
              <img src="/sickness-help-treatment.png" alt="QQ 宠物帮好友治疗页面" />
              <figcaption className="t-caption">帮忙治疗页面：好友可直接为生病宠物提供治疗</figcaption>
            </figure>
          </article>

          <article className="sickness-action-card">
            <div className="sickness-action-heading">
              <b className="tnum">02</b>
              <h4 className="t-title-2">情感化召回：把流失回归转化为情感重逢</h4>
            </div>
            <p className="t-body-sm">针对流失回归场景，将主人回归行为与宠物康复过程绑定：接入「治疗中」状态与治愈动效，把一条系统通知转化为共同参与的情感重逢，用情感连接驱动留存。</p>
            <div className="sickness-recall-shift" aria-label="从冷处理到情感重逢的方案转变">
              <span>系统自动治愈</span><b aria-hidden="true">→</b><strong>主人共同参与康复</strong>
            </div>
            <figure className="sickness-action-media">
              <img src="/sickness-return-recovery.png" alt="回归用户与宠物共同康复时的自愈气泡" />
              <figcaption className="t-caption">回归用户自愈气泡：把系统结果通知转化为情感重逢</figcaption>
            </figure>
          </article>
        </div>
      </section>

      <section className="sickness-results" aria-labelledby="sickness-result-title">
        <DetailSectionHeading letter="R" english="Result" title="结果" id="sickness-result-title" />
        <p className="t-body">在原有养成链路中补齐了负向激励环节，并使宠物的负向状态同时承接照顾动机、好友互动与流失召回三重作用。</p>
        <div className="sickness-result-chain" aria-label="生病机制承接的三重作用">
          <span>照顾动机</span><b aria-hidden="true">＋</b><span>好友互动</span><b aria-hidden="true">＋</b><span>流失召回</span>
        </div>
      </section>
    </div>
  );
}

function BathProjectDetail() {
  return (
    <div className="section-shell detail-body bath-case">
      <h2 className="sr-only">洗澡与一键护理项目复盘</h2>
      <p className="bath-scope-note t-caption">本节不展开该需求的完整内容，仅聚焦当时遇到的一个核心交互难点。</p>

      <section className="bath-intro-card" aria-labelledby="bath-background-title">
        <div className="bath-intro-text">
          <DetailSectionHeading letter="S" english="Background" title="背景" id="bath-background-title" />
          <p className="t-body bath-background-copy">洗澡是宠物养成中的高频照顾行为，采用<strong>拖拽香皂搓澡</strong>的交互形式完成。</p>

          <div className="bath-intro-challenge">
            <DetailSectionHeading letter="T" english="Core challenge" title="核心难点" id="bath-challenge-title" />

            <p className="t-body-sm bath-challenge-intro">
              洗澡采用<strong>拖拽香皂搓澡</strong>的连续交互形式——这与喂食等离散交互（点击一次 = 扣除一个饼干 = 增加体力）有本质区别：<strong>连续动作没有天然的操作边界</strong>。
            </p>

            <div className="bath-pain-list">
              <div className="bath-pain-item"><b>01</b><span className="bath-pain-title">消耗不可预期</span><span className="bath-pain-desc">用户无法预判「洗至干净需要多少道具」，也无法感知「拖动到何种程度会扣除一块香皂」。</span></div>
              <div className="bath-pain-item"><b>02</b><span className="bath-pain-title">心智规则断裂</span><span className="bath-pain-desc">用户已建立「一次操作 = 一次消耗 = 一次收益」的认知，连续交互打破这一规则，带来误操作顾虑与消费迟疑。</span></div>
            </div>

            <p className="t-body-sm bath-reject-intro">而两种直觉方案均不成立：</p>
            <div className="bath-reject-row">
              <span className="bath-reject-tag">A</span><span>按时长实时扣除 → 时长与道具数量无法一一对应（1 秒扣一块，那 1.5 秒呢），规则本身不可解释</span>
            </div>
            <div className="bath-reject-row">
              <span className="bath-reject-tag">B</span><span>结束后一次性结算 → 过程中缺乏反馈，用户对实际扣除量心里没底，容易担心被多扣</span>
            </div>

            <blockquote className="bath-core-insight">让用户在连续操作中，同时获得<strong>过程感</strong>与<strong>消耗预期</strong></blockquote>
          </div>
        </div>

        <figure className="bath-bg-figure">
          <img src="/bath-demo.jpg" alt="拖拽香皂给宠物搓澡的交互界面" />
          <figcaption className="t-caption">拖拽香皂，给宠物洗香香</figcaption>
        </figure>
      </section>

      <section className="bath-solution" aria-labelledby="bath-solution-title">
        <DetailSectionHeading letter="A" english="Action" title="解法：分段进度条 + 节点结算" id="bath-solution-title" />
        <div className="bath-solution-layout">
          <figure className="bath-demo">
            <video src="/qqpet-bath-demo.mov" autoPlay muted loop playsInline controls preload="metadata" aria-label="拖拽香皂搓澡与分段进度反馈演示" />
            <figcaption className="t-caption"><strong>核心概念</strong><span>分段进度条 + 节点结算</span></figcaption>
          </figure>
          <div className="bath-solution-map" role="table" aria-label="设计与解决问题的对应关系">
            <p className="bath-solution-thesis">将连续动作离散化，把进度条从展示组件重新定义为<strong>连续交互与离散消耗之间的转译中介</strong>。</p>
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
        <DetailSectionHeading letter="R" english="Result & learning" title="结果与沉淀" id="bath-result-title" />
        <div className="bath-result-copy"><p className="t-body">本次设计在<strong>保留原有拖拽交互趣味性</strong>的基础上，最大限度对齐了用户的操作预期，优化了连续交互下的消耗感知。</p><p className="t-body">同时也提升了我<strong>从用户体验视角出发、针对交互类需求进行体验优化</strong>的设计能力。</p></div>
      </section>
    </div>
  );
}

const inviteMechanisms = [
  ["每成功邀请 1 人即得 50 点券", "即时反馈，降低参与门槛，拉一人是一人"],
  ["每日上限 3 人", "控制成本与质量"],
  ["活动限时 3 天", "制造紧迫感，抢在流量退潮前完成验证"],
];

function SkillProjectDetail() {
  return (
    <div className="section-shell detail-body skill-case">
      <h2 className="sr-only">AI 对讲 Skill 项目复盘</h2>

      <section className="skill-background" aria-labelledby="skill-background-title">
        <DetailSectionHeading letter="S" english="Background" title="背景" id="skill-background-title" />
        <p className="t-body">用户与宠物的对话停留在<strong>「打招呼—闲聊—退出」</strong>的浅层循环，缺少话题钩子与持续互动动机。而传统指令式 Prompt 使用门槛偏高，普通用户既不易理解，也难以持续使用。</p>
      </section>

      <section className="skill-thesis" aria-labelledby="skill-thesis-title">
        <DetailSectionHeading letter="T" english="Core thesis" title="核心判断" id="skill-thesis-title" />
        <blockquote className="skill-core-insight">
          宠物不同于工具型 AI——它不需要更「聪明」，而是要<strong>更有活感、有趣味、有话题</strong>。因此关键不在于提升模型能力，而在于用一套可承载性格与话题的机制，<strong>替代用户直接书写 Prompt</strong>。
        </blockquote>
      </section>

      <section className="skill-actions" aria-labelledby="skill-actions-title">
        <DetailSectionHeading letter="A" english="Action" title="行动" id="skill-actions-title" />

        <article className="skill-action-card">
          <div className="skill-action-head">
            <b className="tnum">01</b>
            <h4 className="t-title-3">玩法设计：从市场调研到宠物场景落地</h4>
          </div>
          <p className="t-body-sm">前期调研市面上的主流 Skill 玩法，以<strong>是否契合宠物人设、是否具备话题延展性、是否有可分享产物</strong>为筛选标准，收敛出适合宠物场景的方向，并开发落地<strong>「宠物答案书」「图片评论家」</strong>等 Skill。</p>
        </article>

        <article className="skill-action-card">
          <div className="skill-action-head">
            <b className="tnum">02</b>
            <h4 className="t-title-3">评测体系：让约束可被验证</h4>
          </div>
          <p className="t-body-sm skill-action-lead">核心认知是——<strong>约束不能只写在 Prompt 里，必须下沉为可执行的评测 case</strong>，否则无法判断它是否真的生效。</p>
          <p className="t-body-sm">因此基于宠物业务自建评测集，覆盖性格表现、指令遵循、信息补全等维度，并区分正向约束与负向约束；在 eval 平台设计技能能力指标（含负向拒答验证）与路由边界指标，依据评测结果定位缺陷并驱动迭代。</p>
        </article>
      </section>

      <section className="skill-result" aria-labelledby="skill-result-title">
        <DetailSectionHeading letter="R" english="Result & learning" title="结果与沉淀" id="skill-result-title" />
        <p className="t-body">将<strong>「Skill 调研 → 开发 → 评测 → 迭代」</strong>沉淀为可复用链路，可迁移至其他 AI 技能场景。</p>
      </section>
    </div>
  );
}

function InviteProjectDetail() {
  return (
    <div className="section-shell detail-body invite-case">
      <h2 className="sr-only">邀请奖励活动项目复盘</h2>

      <section className="invite-background" aria-labelledby="invite-background-title">
        <DetailSectionHeading letter="S" english="Background" title="背景" id="invite-background-title" />
        <p className="t-body invite-bg-copy">灰度放量初期，新增领养主要依靠平台流量驱动。核心流量释放完毕后，<strong>自然新增增速明显回落</strong>，需要开辟可持续的新增来源。</p>

        <div className="invite-strategy-part">
          <DetailSectionHeading letter="T" english="Strategy" title="策略选择：为什么是社交裂变" id="invite-strategy-title" />
          <p className="t-body-sm invite-section-intro">当时可选路径有三条：继续争取平台放量、通过内容玩法创新吸引用户、开展社交裂变。</p>
          <div className="invite-strategy-compare" aria-label="三条增长路径比较">
            <article><span className="tnum">01</span><h4 className="t-title-3">继续争取平台放量</h4></article>
            <article><span className="tnum">02</span><h4 className="t-title-3">通过内容玩法创新吸引用户</h4></article>
            <article className="invite-strategy-choice"><span className="tnum">03 · 选择</span><h4 className="t-title-3">开展社交裂变</h4><p className="t-body-sm">它借助存量用户的关系链，可触达原本不关注宠物、常规宣发也无法覆盖的人群，<strong>是唯一能突破产品触达边界的手段</strong>；同时复用已有邀请入口与领养链路，是窗口期内最快可验证的方案。</p></article>
            <div className="invite-strategy-ceiling"><span aria-hidden="true">↳</span><p className="t-body-sm">前两条存在共同的天花板——<strong>触达范围均受限于产品内的既有人群</strong>。</p></div>
          </div>
        </div>
      </section>

      <section className="invite-actions" aria-labelledby="invite-actions-title">
        <DetailSectionHeading letter="A" english="Action" title="行动" id="invite-actions-title" />

        <article className="invite-target">
          <div className="invite-target-layout">
            <div className="invite-subsection-heading invite-target-lead"><b className="tnum">01</b><h4 className="t-title-2">目标与口径：让激励直接服务最终目标</h4></div>
            <div className="invite-target-left">
            <div className="invite-north-star"><small>北极星指标</small><strong>邀请渠道带来的新增领养用户数</strong></div>
            <div className="invite-definition-compare" aria-label="常规做法与有效邀请口径对比">
              <div><small>部分裂变活动</small><strong>“发送邀请”即计为成功</strong><span>分享、点击均未转化为真实新增</span></div>
              <b aria-hidden="true">VS</b>
              <div><small>有效邀请口径</small><strong>受邀好友完成宠物领养</strong><span>确保奖励发放与业务目标严格对齐</span></div>
            </div>
            <p className="t-body-sm">部分裂变活动将&quot;发送邀请&quot;即计为成功，但分享、点击均未转化为真实新增。以完成领养作为口径，可确保奖励发放与业务目标严格对齐。</p>

            <div className="invite-subsection-heading"><b className="tnum">02</b><h4 className="t-title-2">机制设计：以参与门槛倒推奖励模型</h4></div>
            <p className="t-body-sm">在主流裂变玩法（满 N 人发奖／每邀一人即发奖／阶梯大奖）中，选择<strong>每邀 1 人即得奖</strong>。</p>
            <p className="t-body-sm">判断依据：既然口径是&quot;完成领养&quot;，<strong>受邀方的转化成本本就较高</strong>；若再要求邀满 3 人才发奖，参与压力过大、易中途放弃。</p>
            <div className="invite-mechanism-table" role="table" aria-label="机制与设计意图">
              <div className="invite-mechanism-head" role="row"><strong role="columnheader">机制</strong><b aria-hidden="true">→</b><strong role="columnheader">设计意图</strong></div>
              {inviteMechanisms.map(([mechanism, intent]) => <div className="invite-mechanism-row" role="row" key={mechanism}><span role="cell">{mechanism}</span><b aria-hidden="true">→</b><span role="cell">{intent}</span></div>)}
            </div>
            </div>

            <figure className="invite-activity-figure">
              <img src="/invite-activity.png" alt="邀请奖励活动页面" />
              <figcaption className="t-caption"><strong>活动页面</strong><span>邀请奖励活动整体形态</span></figcaption>
            </figure>
          </div>
        </article>

        <article className="invite-mvp">
          <div className="invite-subsection-heading"><b className="tnum">03</b><h4 className="t-title-2">卡点取舍：能力受限下的 MVP 判断</h4></div>
          <div className="invite-mvp-evolution" aria-label="原方案到落地方案的取舍过程">
            <figure><span className="invite-figure-label">原方案</span><img src="/invite-mvp-before.png" alt="原方案：奖励邮件呈现好友信息与主页入口" /><figcaption className="t-caption">在奖励邮件中呈现受邀好友信息与主页访问入口</figcaption></figure>
            <div className="invite-mvp-constraint"><small>遇到约束</small><strong>配置平台不支持该能力</strong><strong>上线窗口仅两天</strong><span aria-hidden="true">→</span></div>
            <figure><span className="invite-figure-label">落地方案</span><img src="/invite-mvp-after.png" alt="落地方案：好友到来通知和奖励到账通知" /><figcaption className="t-caption">好友到来通知 + 奖励到账通知两条消息</figcaption></figure>
          </div>
          <div className="invite-mvp-copy">
            <p className="t-body-sm"><strong>原方案：</strong>在奖励邮件中呈现受邀好友信息与主页访问入口，使新用户到来后<strong>即刻产生一次熟人互动</strong>。</p>
            <p className="t-body-sm"><strong>约束：</strong>配置平台不支持该能力，且上线窗口仅两天。</p>
            <p className="t-body-sm"><strong>取舍：</strong>拆分为「好友到来通知 + 奖励到账通知」两条消息。方案并非最优形态，但在能力受限下<strong>守住了&quot;感知到具体是谁&quot;这一核心目标</strong>，以最小成本抢住流量窗口。</p>
          </div>
        </article>

        <article className="invite-risk">
          <div className="invite-subsection-heading"><b className="tnum">04</b><h4 className="t-title-2">风险前置：主动引入安全评估</h4></div>
          <p className="t-body">活动涉及点券发放，主动拉通安全中心识别黑灰产风险，并配置有效邀请上限与防刷规则。</p>
        </article>
      </section>

      <section className="invite-results" aria-labelledby="invite-results-title">
        <DetailSectionHeading letter="R" english="Result & learning" title="结果与沉淀" id="invite-results-title" />
        <div className="invite-result-visuals" aria-label="邀请活动效果验证">
          <article><small>邀请入口点击 UV</small><strong>+95.31%</strong></article>
          <article className="invite-before-after"><small>邀请渠道日均新增领养</small><div><span>1.0 万</span><b aria-hidden="true">→</b><strong>9.7 万</strong></div><em>+861.29%</em></article>
          <article className="invite-before-after"><small>邀请渠道贡献占比</small><div><span>11.52%</span><b aria-hidden="true">→</b><strong>55.02%</strong></div></article>
          <article><small>大盘日均新增</small><strong>+101.24%</strong></article>
        </div>
        <p className="t-body-sm invite-result-summary">邀请入口点击 UV 提升 <strong>95.31%</strong>；邀请渠道日均新增领养由 1.0 万增至 9.7 万（<strong>+861.29%</strong>），贡献占比由 11.52% 提升至 <strong>55.02%</strong>；带动大盘日均新增提升 <strong>101.24%</strong>，成为本期新增增长的核心来源。</p>
        <div className="invite-learning-grid">
          <article><div className="invite-subsection-heading"><h4 className="t-title-2">能力沉淀</h4></div><p className="t-body-sm">本次需求锻炼了我在<strong>策略选择、MVP 判断与跨部门协同</strong>三方面的能力：能在多条路径中论证取舍依据，能在能力与时间受限时识别&quot;什么必须保、什么可以让&quot;，也能主动前置识别风险并推动协同解决。</p></article>
          <article className="invite-cognition"><div className="invite-subsection-heading"><h4 className="t-title-2">认知延伸</h4></div><blockquote>拉新的终点不是量，而是互动。</blockquote><p className="t-body-sm">更重要的是意识到：<strong>拉新的终点不是量，而是互动。</strong> 若邀请而来的是沉默用户，对业务并无价值。因此在活动之后，我推动了好友列表推荐新注册用户等需求，把新增承接到互动场景中——这也是我的工作从拉新自然延伸到促活的原因。</p></article>
        </div>
      </section>
    </div>
  );
}

type WorkExplorerProps = {
  selectedId: string | null;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export function WorkExplorer({ selectedId, onOpen, onClose }: WorkExplorerProps) {
  const workRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLElement | null>(null);
  const selected = selectedId ? getWorkItem(selectedId) : undefined;

  // 左栏在矮屏上会自己滚动，切换项目后把当前项带回视野。
  useEffect(() => {
    const rail = railRef.current;
    const active = rail?.querySelector<HTMLElement>("a[aria-current='page']");
    if (!rail || !active || rail.scrollHeight <= rail.clientHeight) return;
    const railRect = rail.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    if (activeRect.top >= railRect.top && activeRect.bottom <= railRect.bottom) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({
      top: rail.scrollTop + (activeRect.top - railRect.top) - (railRect.height - activeRect.height) / 2,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  }, [selectedId]);

  function handleOpen(event: React.MouseEvent, id: string) {
    // 保留 href 让中键/右键「新标签打开」可用，普通点击仍走 SPA
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    onOpen(id);
  }

  function handleClose(event: React.MouseEvent) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    onClose();
  }

  const fire = getWorkItem("fire")!;
  const invite = getWorkItem("invite")!;
  const companion = workItems.filter((item) => item.level2 === "人－宠物");

  return (
    <section className={`work-deck${selected ? " is-detail-mode" : ""}`} id="work" ref={workRef}>
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
                <button className={`project-node project-node-main tone-${fire.tone}`} type="button" onClick={() => onOpen(fire.id)}>
                  <div className="node-title-row"><h4 className="t-title-2">{fire.title}</h4><span className="node-priority t-caption">重点项目</span></div><p className="t-body-sm">{fire.subtitle}</p>
                  <img className="fire-level-art" src="/qqpet-fire-levels.png" alt="不同阶段的火花关系图标" />
                  <MetricStrip metrics={fire.metrics} />
                </button>
              </section>
              <section className="relationship-group companion-group">
                <div className="group-label"><strong className="t-title-3">人－宠物</strong><small>打造被需要感，加深情感投入</small></div>
                <div className="companion-nodes">
                  {companion.map((item) => (
                    <button className={`project-node compact-node tone-${item.tone} ${companionArtwork[item.id] ? "has-art" : ""}`} type="button" key={item.id} onClick={() => onOpen(item.id)}>
                      <span className="t-title-3">{item.title}</span><small className="t-body-sm">{item.subtitle}</small>
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
              <button className={`project-node project-node-main tone-${invite.tone}`} type="button" onClick={() => onOpen(invite.id)}>
                <div className="node-title-row"><h4 className="t-title-2">{invite.title}</h4><span className="node-priority t-caption">增长项目</span></div><p className="t-body-sm">{invite.subtitle}</p>
                <img className="invite-bar-art" src="/qqpet-invite-bar.png" alt="邀请奖励活动栏：限时邀请好友领养并获得奖励" />
                <MetricStrip metrics={invite.metrics} />
              </button>
            </div>
          </article>
        </div>
      </div> : (
            <div className={`work-detail tone-${selected.tone}`} id="work-detail">
              <div className="detail-topbar">
                <div className="section-shell detail-topbar-inner">
                  <a className="detail-topbar-back t-caption" href={toHash("work")} onClick={handleClose}><b aria-hidden="true">←</b>工作地图</a>
                  <span className="detail-topbar-title">{selected.title}</span>
                  <span className="detail-topbar-count t-caption tnum">{selectedIndex + 1} / {workItems.length}</span>
                </div>
              </div>
              <div className="section-shell detail-layout">
                <aside className="project-rail" ref={railRef}>
                  <a className="rail-back t-caption" href={toHash("work")} onClick={handleClose}><b aria-hidden="true">←</b>工作地图</a>
                  <nav className="rail-nav" aria-label="项目导航">
                    {railBranches.map((branch) => (
                      <div className="rail-branch" key={branch.label}>
                        <span className="rail-overline t-overline tnum">{branch.overline}</span>
                        <strong className="rail-branch-title">{branch.label}</strong>
                        {branch.groups.map((group) => (
                          <div className="rail-group" key={group.label}>
                            <small className="rail-group-label">{group.label}</small>
                            <ul>
                              {group.items.map((item) => (
                                <li key={item.id}>
                                  <a
                                    className={`rail-item tone-${item.tone}${item.id === selected.id ? " active" : ""}`}
                                    href={toHash("work", item.id)}
                                    aria-current={item.id === selected.id ? "page" : undefined}
                                    onClick={(event) => handleOpen(event, item.id)}
                                  >
                                    <i className="rail-dot" aria-hidden="true" />
                                    <span>{item.title}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ))}
                  </nav>
                </aside>

                <div className="detail-main">
                  <article className="work-detail-content" key={selected.id} aria-label={`${selected.title}项目复盘`}>
                {selected.id === "fire" ? <FireProjectDetail /> : selected.id === "sick" ? <SicknessProjectDetail /> : selected.id === "bath" ? <BathProjectDetail /> : selected.id === "skill" ? <SkillProjectDetail /> : selected.id === "invite" ? <InviteProjectDetail /> : <div className="section-shell detail-body">
                  <h2 className="sr-only">{selected.title}项目复盘</h2>
                  <div className="detail-framing">
                    <article><DetailSectionHeading letter="S" english="Background" title="问题背景" /><p className="t-body-sm">{selected.background}</p></article>
                    <article className="thesis-card"><DetailSectionHeading letter="T" english="Core thesis" title="核心判断" /><p className="t-body">{selected.thesis}</p></article>
                  </div>
                  <section className="detail-actions">
                    <DetailSectionHeading letter="A" english="Action" title="产品推导与核心方案" />
                    <div className="action-grid">
                      {selected.sections.map((section, index) => <article key={section.title}><b className="tnum">{String(index + 1).padStart(2, "0")}</b><h4 className="t-title-3">{section.title}</h4><p className="t-body-sm">{section.body}</p></article>)}
                    </div>
                  </section>
                  <section className="detail-result"><DetailSectionHeading letter="R" english="Result / Learning" title="结果与沉淀" /><p className="t-body">{selected.result}</p></section>
                </div>}
                  </article>

                  <footer className="detail-next">
                    <a className="detail-next-map t-caption" href={toHash("work")} onClick={handleClose}>回到工作地图</a>
                  </footer>
                </div>
              </div>
            </div>
      )}
    </section>
  );
}
