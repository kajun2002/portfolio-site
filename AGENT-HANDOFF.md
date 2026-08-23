# QQ 宠物转正答辩作品集｜Agent 交接说明

## 1. 项目与线上地址

### 项目根目录

```text
/Users/kaidenfu/Documents/Codex/2026-08-10/https-doc-weixin-qq-com-doc/portfolio-site
```

### 线上地址

- 网站首页：<https://kaiden-product-portfolio.lijueying666.chatgpt.site/>
- 实习主要工作：<https://kaiden-product-portfolio.lijueying666.chatgpt.site/#work>

### 托管配置

```text
/Users/kaidenfu/Documents/Codex/2026-08-10/https-doc-weixin-qq-com-doc/portfolio-site/.openai/hosting.json
```

这是一个 Sites 托管项目。修改网站时必须先阅读并遵守 `sites-building` 技能；需要发布上线时，再使用 `sites-hosting` 技能。

---

## 2. 接手前检查

1. 阅读项目代码和设计规范，不要直接重构。
2. 运行 `git status`，确认当前工作区状态并保留已有修改。
3. 浏览线上页面与本地实现，理解单页滚动、一级导航、二级项目导航及详情展开逻辑。
4. 修改文件优先使用 `apply_patch`，不要覆盖用户已有代码。
5. 用户未要求发布时不要擅自上线；若要求“更新线上”，完成构建和验证后再发布。

---

## 3. 核心文件与职责

### 3.1 页面整体结构

```text
app/page.tsx
```

负责：

- 整个单页作品集的页面结构
- 首页个人介绍
- 教育与实习经历
- 实习主要工作
- 经验沉淀与思考
- 一级导航的锚点、滚动和选中状态
- 首页 AI 人物点击挥手交互

一级板块 ID：

| ID | 板块 |
| --- | --- |
| `about` | 个人介绍 |
| `experience` | 个人经历 |
| `work` | 实习主要工作 |
| `reflection` | 经验沉淀与思考 |

> 网站必须保持“单页长滚动”模式，不要拆成多个独立路由页面。

### 3.2 顶部导航

```text
app/components/Header.tsx
```

负责：

- 顶部一级导航
- 当前板块的毛玻璃高亮状态
- 接收 `activeId` 并同步选中栏目

### 3.3 工作概览与项目详情

```text
app/components/WorkExplorer.tsx
```

负责：

- “促活 / 拉新”工作全景
- 踩踩续火花、生病机制、洗澡与一键护理、AI 对讲 Skill、邀请奖励活动
- 项目详情展开与收起
- 二级项目 Tab
- 项目详情内容渲染
- 二级导航固定在一级导航下方

关键交互约束：

- 概览状态展示促活、拉新的总体内容。
- 点击项目后在当前页面展开详情，不跳转新页面。
- 展开详情后，不能继续显示或露出概览页残留内容。
- 二级导航必须固定在一级导航下方。
- 切换二级 Tab 时，只替换下方主体内容。
- 二级导航位置不能跳动，也不能露出教育经历等上一板块内容。
- 只有首次进入详情时允许滚动定位；切换详情 Tab 时不要反复将页面向上滚动。

### 3.4 项目详情数据

```text
app/data/projects.ts
```

负责：

- 踩踩续火花详情
- 生病机制详情
- 洗澡与一键护理详情
- AI 对讲 Skill 详情
- 邀请奖励活动详情
- 各项目的 S/T/A/R 内容、指标、图片和视频

修改项目正文、详情结构或插入项目素材时，优先从此文件检查和处理。

### 3.5 工作概览数据

```text
app/data/workItems.ts
```

负责：

- 工作概览卡片标题
- 项目简述
- 指标
- 标签
- 项目图标

### 3.6 全局样式

```text
app/globals.css
```

负责：

- 全局设计变量和字体层级
- 蓝白渐变背景
- 毛玻璃卡片
- 卡片圆角、阴影和间距
- 一级、二级导航
- 项目详情排版
- 响应式适配
- 防止数字、图片和卡片溢出

修改前先搜索现有 class，尽量复用，不要新建一套互相冲突的样式。

### 3.7 素材目录

```text
public/
```

网页内通过 `/文件名` 引用。主要素材：

| 文件 | 用途 |
| --- | --- |
| `fire-behavior-migration.png` | 踩踩行为迁移 |
| `fire-stages-and-levels.png` | 火花阶段与分级 |
| `fire-relationship-card.jpg` | 火花关系卡 |
| `fire-medal.jpg` | 火花勋章 |
| `fire-exclusive-animation.mov` | 火花专属动效 |
| `sickness-help-treatment.png` | 帮好友治疗 |
| `sickness-return-recovery.png` | 回归康复 |
| `qqpet-bath-demo.mov` | 洗澡交互视频 |
| `invite-activity.png` | 邀请活动页 |
| `invite-mvp-before.png` | 邀请原方案 |
| `invite-mvp-after.png` | MVP 落地方案 |
| `hero-ai-standing.png` | 首页 AI 人物静止状态 |
| `hero-ai-waving.png` | 首页 AI 人物挥手状态 |

新增素材时先复制到 `public/`，再在代码中引用，不要长期依赖桌面或临时目录路径。

---

## 4. 设计规范与参考文件

接手后优先阅读：

```text
/Users/kaidenfu/WorkBuddy/2026-08-09-23-07-12/portfolio/DESIGN-SPEC.md
/Users/kaidenfu/WorkBuddy/2026-08-09-23-07-12/portfolio/PROMPT-UI优化.md
/Users/kaidenfu/WorkBuddy/2026-08-09-23-07-12/portfolio/PROMPT-经验沉淀与思考.md
```

这些文件是设计和内容参考资料；当前用户提出的具体修改要求优先级更高。

### 整体视觉方向

- 腾讯蓝白主色
- 轻量渐变与毛玻璃质感
- 少量 QQ 宠物元素
- 专业转正答辩风格
- 现代、简洁，但不能信息过少
- 动效克制，不影响答辩阅读
- 当前已回滚过暖橙配色方案，不要再次把全站改成暖色系

---

## 5. 版式与内容原则

### 5.1 答辩优先

每个主要页面应尽量在一屏内传达足够信息，但不能为了塞进一屏而过度压缩。内容需紧凑但不拥挤，模块间留白均衡。

### 5.2 项目详情叙事

项目详情要让评委看懂：

```text
背景 → 判断 → 行动 → 结果
```

优先使用：

- 对比结构
- 因果箭头
- 流程图
- 前后方案对照
- 数据增量图示
- 图片与视频

不要把所有内容做成样式相同的文字卡片。

### 5.3 详情章节标题统一

所有项目详情页的章节标题统一使用：

1. 英文大写眉标在上。
2. 中文粗体标题在下。
3. 图标、英文、中文保持统一间距、字号和样式。

禁止部分页面使用中英文左右并排、部分页面上下排列。

### 5.4 数据规范

- 不展示敏感的绝对用户量。
- 优先使用增长率、渗透率、点击率和留存变化。
- 数据卡大数字使用黑色或近黑色，不使用整块高饱和彩色。
- 窄窗口必须自动换行或缩放，禁止数字破窗。

### 5.5 图片与视频

- 图片保持原比例，不拉伸。
- 使用统一圆角、边框和轻阴影。
- 移动端截图限制高度。
- 视频默认不自动播放，优先点击播放并显示 `controls`。
- 素材必须服务于对应叙事，不要只作装饰。

### 5.6 可用性与响应式

- 交互区域至少 `40 × 40px`。
- 保留 focus outline。
- 支持 `prefers-reduced-motion`。
- 桌面端与窄窗口均不得截断、溢出。
- 全站不展示 `01/04`、`02/04` 等页码。

---

## 6. 既定页面结构

### 6.1 首页

- 只展示“Hi, 我是 Kaiden”。
- 标签：热爱运动、勇于探索、旅行与体验、ENFP。
- 一句个人能力签名。
- 右侧展示 AI 人物和狗狗。
- 点击人物后切换为挥手状态，结束后恢复静止。
- 不在首页展示教育或项目详情。

### 6.2 个人经历

- 教育经历和实习经历采用卡片形式。
- 包含深圳大学、湖南农业大学、腾讯、虎牙、OPPO。
- 内容需要有足够视觉占比，避免卡片下方出现大片无效空白。

### 6.3 实习主要工作

```text
促活：提高存量活跃
├── 人—人：踩踩续火花
└── 人—宠物
    ├── 生病机制
    ├── 洗澡与一键护理
    └── AI 对讲 Skill

拉新：邀请奖励活动
```

工作概览与项目详情共用当前页面内展开机制。

### 6.4 经验沉淀与思考

- 内容和呈现逻辑以 `PROMPT-经验沉淀与思考.md` 为准。
- 保留现有统一视觉系统。

---

## 7. 构建与验证

### 7.1 进入项目

```bash
cd /Users/kaidenfu/Documents/Codex/2026-08-10/https-doc-weixin-qq-com-doc/portfolio-site
```

### 7.2 构建

```bash
pnpm run build
```

如果系统找不到 Node 或 pnpm：

```bash
PATH=/Users/kaidenfu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/kaidenfu/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH pnpm run build
```

### 7.3 验收清单

- [ ] 构建无报错。
- [ ] 一级导航锚点正常。
- [ ] 一级导航高亮与滚动位置同步。
- [ ] 二级导航固定位置正常。
- [ ] 二级 Tab 切换不露出上一板块。
- [ ] 展开、收起项目正常。
- [ ] 图片和视频资源无 404。
- [ ] 宽屏和窄屏无溢出、破窗或裁切。
- [ ] 全站没有页码残留。
- [ ] 未修改用户要求保持不变的内容与样式。

---

## 8. 发布线上

仅在用户明确要求发布时执行：

1. 完成本地构建。
2. 在浏览器中验证核心交互和响应式效果。
3. 使用 `sites-hosting` 保存版本并发布。
4. 发布后访问线上地址复查。
5. 向用户说明发布结果、版本和线上网址。

---

## 9. 当前版本状态

最近一次针对二级导航的修复提交：

```text
c7554872b36ec516f97d907f93cdc25420c89df0
Fix sticky project detail navigation
```

接手后不要默认回退版本，应先以当前工作区和线上效果为准排查。

---


