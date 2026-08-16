import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { getProject, projects } from "../../data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <main className={`project-page tone-${project.tone}`}>
      <Header />
      <section className="project-hero section-shell">
        <a className="back-link" href="/#work">← 返回主要工作</a>
        <div className="project-hero-grid">
          <div>
            <div className="eyebrow"><span className="status-dot" /> {project.tag}</div>
            <h1>{project.title}</h1>
            <p className="project-subtitle">{project.subtitle}</p>
            <blockquote>{project.thesis}</blockquote>
          </div>
          <div className="project-metrics">
            {project.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="project-content section-shell">
        <div className="project-background"><span className="section-kicker">BACKGROUND</span><h2>项目背景与核心判断</h2><p>{project.context}</p></div>
        {project.decision && (
          <div className="decision-block">
            <div className="section-mini-title"><span>策略比较</span><h2>为什么选择这条路径</h2></div>
            <div className="decision-grid">{project.decision.map((item, index) => (
              <article className={(index === 1 && project.slug === "fire") || (index === 2 && project.slug === "invite") ? "selected" : ""} key={item.title}>
                <span>0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p>
              </article>
            ))}</div>
          </div>
        )}
        <div className="project-sections">
          {project.sections.map((section) => (
            <section className="case-section" key={section.eyebrow}>
              <div className="case-heading"><span>{section.eyebrow}</span><h2>{section.title}</h2>{section.intro && <p>{section.intro}</p>}</div>
              <div className="case-points">{section.points.map((point, index) => (
                <article key={point.title}><span>{index + 1}</span><div><h3>{point.title}</h3><p>{point.body}</p></div></article>
              ))}</div>
            </section>
          ))}
        </div>
        <section className="project-result">
          <span className="section-kicker">CONCLUSION</span><h2>结果与结论</h2><p>{project.takeaway}</p>
          <div className="result-metrics">{project.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
        </section>
        <a className="next-project" href={`/projects/${next.slug}`}><span>下一个项目</span><strong>{next.title}</strong><i aria-hidden>→</i></a>
      </section>
    </main>
  );
}
