# Kaiden 产品作品集 · portfolio-site

个人产品作品集网站，单页滚动结构，展示实习期间的产品工作与经验沉淀。

- **线上地址**：<https://www.kaidenfu.cn>
- **仓库**：<https://github.com/kajun2002/portfolio-site>

## 技术栈

| 项目 | 说明 |
| --- | --- |
| 框架 | React 19 + Vite + TypeScript |
| 样式 | 原生 CSS（`app/globals.css`，使用 CSS 变量管理设计 token） |
| 部署 | GitHub Pages + GitHub Actions 自动部署 |

> 注意：`app/` 目录是项目自定义的组织方式，本项目**不是** Next.js。

## 环境要求

- Node.js `>=22.13.0`

## 本地开发

```bash
npm install
npm run dev      # 开发服务器（热更新）
npm run build    # 构建验证
npm run start    # 预览构建产物（端口 4733）
npm run lint     # 代码检查
```

## 发布上线

推送到 `main` 分支即自动构建部署，无需手动操作：

```bash
npm run build    # 先确认构建通过
git add <改动文件>
git commit -m "简要说明"
git push         # 1-3 分钟后线上生效
```

- 构建状态：<https://github.com/kajun2002/portfolio-site/actions>
- 自动化配置：`.github/workflows/deploy.yml`
- 线上查看需硬刷新（`Cmd+Shift+R`）破缓存

## 目录结构

```text
app/
├─ main.tsx                  # 应用入口
├─ page.tsx                  # 单页主体：个人介绍 / 经历 / 工作地图入口 / 经验沉淀
├─ globals.css               # 全部样式与设计 token
├─ components/
│  ├─ Header.tsx             # 顶部导航
│  ├─ WorkExplorer.tsx       # 工作地图 + 5 个项目详情页
│  └─ ContactButton.tsx      # 联系方式
└─ data/
   ├─ workItems.ts           # 项目数据（标题、指标、背景、结论等）
   └─ projects.ts            # 项目元信息

public/                      # 图片、视频等静态资源
.github/workflows/deploy.yml # 自动部署配置
```

## 文档

- **`AGENT-HANDOFF.md`** —— AI agent 交接说明（接手前必读：上手步骤、页面结构、设计规范、协作约定、发布流程）
- **`docs/DESIGN-SPEC.md`** —— 网页设计规范 v3.0（设计令牌、字阶、间距、色彩、阴影、动效的硬性依据）
- `docs/答辩问答准备.md` —— 项目内容与业务背景参考
- `PUBLISH-REQUEST.md` —— 已废弃（旧发布流程遗留）

## 换电脑 / 新环境

本仓库是**唯一真实来源**，源码、静态资源、锁文件、部署配置全部已提交。
在新机器上 `git clone` + `pnpm install` 即可继续开发与发布，无需迁移任何本地文件。
