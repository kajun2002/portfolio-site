import { workItems } from "./data/workItems";

export const sectionIds = ["about", "experience", "work", "reflection"] as const;
export type SectionId = (typeof sectionIds)[number];

export function isSectionId(value: string): value is SectionId {
  return (sectionIds as readonly string[]).includes(value);
}

export type Route = { section: SectionId; projectId: string | null };

/**
 * 路由全部编码在 hash 里：#work 是工作地图，#work/fire 是单个项目复盘。
 * 这样刷新、分享链接和浏览器前进后退都能落回同一个视图。
 */
export function parseHash(hash: string): Route {
  const [section, projectId] = hash.replace(/^#/, "").split("/");
  if (section === "work" && projectId && workItems.some((item) => item.id === projectId)) {
    return { section: "work", projectId };
  }
  return { section: isSectionId(section) ? section : "about", projectId: null };
}

export function toHash(section: SectionId, projectId?: string | null) {
  return projectId ? `#${section}/${projectId}` : `#${section}`;
}
