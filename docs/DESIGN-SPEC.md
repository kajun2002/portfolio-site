# 网页设计规范 v3.0

> **风格**：Apple Spatial Computing —— 明亮白底 + 极光流光 + 微玻璃拟态
> **张力**：秩序作骨架，灵动作皮肤。字阶、间距、对齐严格约束结构；色彩、光效、动效负责气质。
> **用途**：自包含规范，可直接提供给任何 AI 作为设计与前端实现依据。
> **说明**：标记「必须」「禁止」为硬性约束，不得协商。

**快速上手**：只需实现 → 读第 11 章复制令牌 + 第 13 章摘要。需要理解依据 → 从第 0 章顺读。

---

## 0. 六条核心原则

冲突时以此裁决。

1. **秩序作骨架，灵动作皮肤** — 规范约束结构，不约束气质。
2. **主色定结构，点缀添活力** — 主色负责链接与关键数据；高饱和点缀色仅用于标签、图标、微光，单种面积 <2%。
3. **玻璃优于实心** — 卡片半透明 + 背景模糊，让极光透过来形成空间纵深。
4. **层次靠阴影 + 光边** — 五级阴影建纵深，玻璃卡配内高光模拟受光，色块用带色阴影发光。
5. **动效表达空间关系** — 视差倾斜、呼吸光效制造物理感，但必须短、可预期。
6. **字号下限不可妥协** — 正文 ≥15px，标注 ≥13px。

---

## 1. 色彩

三层结构：主色定结构，辅助色构渐变，点缀色添活力。

### 1.1 主色 Azure

承担链接、激活态、主要数据。大面积可用。

| 令牌 | 色值 | 用途 |
|---|---|---|
| `--azure-50` | `#EFF6FF` | 标签底、图标容器底 |
| `--azure-100` | `#DBEAFE` | 浅填充 |
| `--azure-200` | `#BFDBFE` | 浅描边 |
| `--azure-300` | `#93C5FD` | 弱强调 |
| `--azure-400` | `#60A5FA` | 渐变端点 |
| `--azure-500` | `#3B82F6` | **标准主色** |
| `--azure-600` | `#2563EB` | 悬停、数据大字 |
| `--azure-700` | `#1D4ED8` | 深色文字 |
| `--azure-800` | `#1E40AF` | — |

### 1.2 辅助色 Violet

与主色构成 135° 渐变，是系统的视觉签名。

`--violet-50 #F5F3FF` · `100 #EDE9FE` · `200 #DDD6FE` · `300 #C4B5FD` · `400 #A78BFA` · `500 #8B5CF6` · `600 #7C3AED` · `700 #6D28D9`

### 1.3 点缀色

**这是活力的主要来源。** 每组三档：50 浅底 / 400 明亮 / 600 文字。

| 色系 | 50 | 400 | 600 | 语义倾向 |
|---|---|---|---|---|
| Mint | `#ECFDF5` | `#34D399` | `#059669` | 成长、健康 |
| Cyan | `#ECFEFF` | `#22D3EE` | `#0891B2` | 增长、技术 |
| Amber | `#FFFBEB` | `#FBBF24` | `#D97706` | AI、创意 |
| Rose | `#FFF1F2` | `#FB7185` | `#E11D48` | 陪伴、情感 |
| Lime | `#F7FEE7` | `#A3E635` | `#65A30D` | 活力、新增 |
| Peach | `#FFF7ED` | `#FB923C` | `#EA580C` | 温暖、社交 |

**使用规则（必须）**
- 单页最多 **3 种**点缀色
- 每种着色面积 **<2%**
- **仅限**：标签背景（50 档）、图标（600 档）、图标容器底（50 档）、微光阴影
- **禁止**：卡片大面积底色、正文文字、页面背景

### 1.4 中性灰阶

| 令牌 | 色值 | 用途 | 约束 |
|---|---|---|---|
| `--ink-950` | `#0A0A0F` | 极深 | — |
| `--ink-900` | `#16181D` | 页面主标题 | — |
| `--ink-800` | `#22252B` | 区块标题、强调 | — |
| `--ink-700` | `#383C44` | 正文 | — |
| `--ink-600` | `#52565F` | 次要正文 | — |
| `--ink-500` | `#71757E` | 标注 | 正文最浅可用 |
| `--ink-400` | `#9AA0A8` | 时间戳、弱提示 | **禁用于正文** |
| `--ink-300` | `#C7CBD1` | 分割线、水印 | 仅装饰 |
| `--ink-200` | `#E4E7EB` | 分割线 | 仅装饰 |
| `--ink-100` | `#F1F3F5` | 进度条底 | 仅装饰 |
| `--ink-050` | `#F8F9FB` | 浅底 | 仅装饰 |

### 1.5 表面与玻璃

| 令牌 | 值 | 用途 |
|---|---|---|
| `--surface-base` | `#FCFCFD` | 页面底（极光叠加其上） |
| `--surface-raised` | `#FFFFFF` | 实心卡片 |
| `--surface-sunken` | `#F5F6F8` | 内嵌区、标签底 |
| `--glass-1` | `rgba(255,255,255,.55)` | 大容器（最透） |
| `--glass-2` | `rgba(255,255,255,.68)` | **标准卡片** |
| `--glass-3` | `rgba(255,255,255,.82)` | 导航、悬浮层（最实） |
| `--glass-edge` | `rgba(255,255,255,.72)` | 顶部内高光 |
| `--glass-line` | `rgba(255,255,255,.45)` | 玻璃描边 |

```css
--glass-blur-sm: blur(12px) saturate(160%);
--glass-blur-md: blur(20px) saturate(180%);   /* 标准 */
--glass-blur-lg: blur(32px) saturate(200%);
```

> `saturate()` 是关键 —— 让透过玻璃的极光更饱和，产生色彩渗透效果。

### 1.6 语义色

涨红跌绿，中国区惯例。

| 令牌 | 色值 | 用途 |
|---|---|---|
| `--up` | `#F43F5E` | 数据上涨 |
| `--up-bg` | `#FFF1F3` | 上涨浅底 |
| `--down` | `#10B981` | 数据下降 |
| `--down-bg` | `#ECFDF5` | 下降浅底 |
| `--warn` | `#F59E0B` | 提示、待验证 |
| `--warn-bg` | `#FFFBEB` | 提示浅底 |

### 1.7 描边

```css
--line-hair:   rgba(22,24,29,.055);   /* 内部分割线 */
--line-soft:   rgba(22,24,29,.09);    /* 次要边框 */
--line-strong: rgba(22,24,29,.14);    /* 悬停 */
--line-azure:  rgba(59,130,246,.30);  /* 激活 */
--line-violet: rgba(139,92,246,.28);  /* 辅助激活 */
```

### 1.8 配额

- 主色 + 辅助色着色面积合计 **≤18%**
- 点缀色单种 **<2%**，同页 **≤3 种**
- 高饱和色**禁止**用于超过一个卡片的连续区域

---

## 2. 极光背景

空间感来源。四层径向渐变叠在浅底上，缓慢漂移。

```css
--aurora-a: radial-gradient(60% 50% at 12% 8%,  rgba(59,130,246,.16) 0%, transparent 62%);
--aurora-b: radial-gradient(55% 45% at 88% 4%,  rgba(139,92,246,.14) 0%, transparent 60%);
--aurora-c: radial-gradient(50% 42% at 78% 62%, rgba(34,211,238,.11) 0%, transparent 62%);
--aurora-d: radial-gradient(48% 40% at 8% 78%,  rgba(251,113,133,.09) 0%, transparent 60%);
```

```css
.aurora{
  position:fixed; inset:0; z-index:0; pointer-events:none;
  background:var(--aurora-a),var(--aurora-b),var(--aurora-c),var(--aurora-d);
  background-color:var(--surface-base);
}
@media (prefers-reduced-motion: no-preference){
  .aurora{ animation:auroraDrift 26s cubic-bezier(.65,0,.35,1) infinite alternate; }
}
@keyframes auroraDrift{
  0%   { transform:translate3d(0,0,0) scale(1) }
  50%  { transform:translate3d(-1.5%,1%,0) scale(1.04) }
  100% { transform:translate3d(1.5%,-1%,0) scale(1.02) }
}
```

**约束**
- 单层透明度 **≤.16**，叠加后背景仍须明亮
- 漂移周期 **≥20s**，位移 **≤2%**
- 内容层**必须** `position:relative; z-index:1`，否则被极光遮挡交互

### 渐变

```css
--grad-brand: linear-gradient(135deg, var(--azure-500), var(--violet-500));
--grad-cool:  linear-gradient(135deg, var(--cyan-400),  var(--azure-500));
--grad-warm:  linear-gradient(135deg, var(--amber-400), var(--rose-400));
--grad-hair:  linear-gradient(90deg, transparent, rgba(59,130,246,.35), transparent);
```

**允许**：Logo 底、渐变文字（每页 ≤2 处）、进度条、数据条、装饰细线、图标容器
**禁止**：卡片大面积底色、页面背景

---

## 3. 玻璃拟态

### 3.1 标准卡片

```css
.glass{
  position:relative;
  background:var(--glass-2);
  -webkit-backdrop-filter:var(--glass-blur-md);
  backdrop-filter:var(--glass-blur-md);
  border:1px solid var(--glass-line);
  border-radius:var(--r-md);
  box-shadow:var(--sh-glass);
}
```

三档：`.glass-soft`（大容器）· `.glass`（标准）· `.glass-solid`（嵌套卡片）

**嵌套规则**：内层必须比外层更实（`.glass` 内用 `.glass-solid`），最多嵌 2 层。

### 3.2 呼吸光效

卡片顶部缓慢明暗变化，模拟环境光流动。

```css
.breathe::before{
  content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background:radial-gradient(120% 60% at 50% -10%, rgba(255,255,255,.85) 0%, transparent 58%);
  opacity:.5;
}
@media (prefers-reduced-motion: no-preference){
  .breathe::before{ animation:breathe 7s cubic-bezier(.65,0,.35,1) infinite }
}
@keyframes breathe{ 0%,100%{opacity:.34} 50%{opacity:.62} }
```

**约束**：单页 **≤4 处**，仅用于重点卡片。全页都在呼吸等于都不突出。

### 3.3 顶部渐变细线

低成本提升精致度。

```css
.hairline-top::after{
  content:""; position:absolute; left:12%; right:12%; top:0; height:1px;
  background:var(--grad-hair); border-radius:1px; pointer-events:none;
}
```

---

## 4. 字体与字阶

### 4.1 字体族

```css
--font-sans:    -apple-system, BlinkMacSystemFont, "SF Pro Text",
                "PingFang SC", "Helvetica Neue", "Microsoft YaHei", sans-serif;
--font-display: -apple-system, BlinkMacSystemFont, "SF Pro Display",
                "PingFang SC", "Helvetica Neue", sans-serif;
--font-mono:    "SF Mono", ui-monospace, "JetBrains Mono", Menlo, monospace;
```

### 4.2 字阶（封闭 9 档，禁止取中间值）

| 层级 | 令牌 | 字号 | 字重 | 行高 | 字距 | 用途 |
|---|---|---|---|---|---|---|
| Display | `--fs-display` | `clamp(42px,4.4vw,64px)` | 600 | 1.14 | -.026em | 页面主标题，每页仅一次 |
| Title 1 | `--fs-title-1` | `clamp(28px,2.6vw,38px)` | 600 | 1.14 | -.014em | 区块主标题 |
| Title 2 | `--fs-title-2` | `clamp(21px,1.7vw,26px)` | 600 | 1.3 | -.014em | 卡片标题、项目名 |
| Title 3 | `--fs-title-3` | `17px` | 600 | 1.3 | 0 | 卡片小标题 |
| Body | `--fs-body` | `16px` | 400 | 1.6 | 0 | 正文 |
| Body S | `--fs-body-sm` | `15px` | 400 | 1.6 | 0 | 卡片描述（**正文下限**） |
| Caption | `--fs-caption` | `13px` | 400 | 1.6 | 0 | 标注（**全局下限**） |
| Overline | `--fs-overline` | `12px` | 600 | 1 | .14em | 英文眉标，大写 |
| Metric | `--fs-metric` | `clamp(28px,2.4vw,40px)` | 600 | 1.05 | -.026em | 数据大字，等宽数字 |

### 4.3 硬性约束

- **禁止小于 13px 的任何文字**（含单位、徽标数字）
- 正文类 **≥15px**
- 单卡片内 **≤3 级字号**
- 字重仅 `400 / 500 / 600`，**禁止 700+**（中文小字号会糊）
- **禁止行内 `font-size`**，必须套用工具类
- 所有数字加 `font-variant-numeric: tabular-nums`
- 单位符号可缩至 `.58em`，但实际渲染不低于 13px

### 4.4 行高与字距

```css
--lh-tight:1.14;  --lh-snug:1.3;  --lh-normal:1.6;  --lh-relaxed:1.75;
--ls-display:-.026em; --ls-title:-.014em; --ls-body:0; --ls-overline:.14em;
```

> 中文**禁止**加正字距，会破坏字形间架；英文大字用负字距收紧，眉标用正字距展开。

### 4.5 渐变文字

```css
.t-grad{
  background:var(--grad-brand);
  -webkit-background-clip:text; background-clip:text;
  -webkit-text-fill-color:transparent; color:transparent;
}
```

**约束**：每页 **≤2 处**，仅用于 Display / Title 1 的关键词，禁止整句渐变。

### 4.6 中英文混排

**必须**：眉标 `12px/600/.14em/uppercase`；眉标与标题间距 12px；中英文间留半角空格（「AI 应用产品中心」）
**禁止**：中文标题与眉标同字号；眉标不加字距；数字用比例字体

---

## 5. 对齐与 Bento 栅格

### 5.1 对齐铁律

| 元素 | 对齐 | 说明 |
|---|---|---|
| 标题与正文 | **左对齐** | 中文段落禁止居中或右对齐 |
| 英文眉标 | **左对齐，置于标题上方** | 禁止与标题同行分置两端 |
| 数据大字 | **左对齐** | 便于纵向对比 |
| 时间、页码、占比 | 右对齐 | **唯一允许右对齐的元素** |
| 卡片内元素 | 统一起始于内边距 | 同卡片内不得有两个起始位 |

**错误（双轴线）**
```html
<div style="display:flex;justify-content:space-between">
  <span class="t-overline">EDUCATION</span>
  <span class="t-title-2">教育经历</span>  <!-- 右对齐，与卡片脱节 -->
</div>
```

**正确（单轴线）**
```html
<div>
  <div class="t-overline">Education</div>
  <div class="t-title-2" style="margin-top:var(--sp-1)">教育经历</div>
</div>
```

**自检**：画一条竖线穿过主标题左边缘，所有标题、卡片、正文左边界都应落在该线或其等距缩进上。

### 5.2 Bento 栅格

12 列，卡片按内容权重占据不等宽度，形成节奏感。

```css
.bento{ display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); gap:var(--sp-4) }
.c3{grid-column:span 3} .c4{grid-column:span 4} .c5{grid-column:span 5}
.c6{grid-column:span 6} .c7{grid-column:span 7} .c8{grid-column:span 8}
.c9{grid-column:span 9} .c12{grid-column:span 12}

@media(max-width:1040px){
  .c3,.c4,.c5{grid-column:span 6}
  .c7,.c8,.c9{grid-column:span 12}
}
@media(max-width:720px){ .bento>*{grid-column:span 12 !important} }
```

**编排原则**
- **主次分明**：重点内容占 7–8 列，次要占 4–5 列，**禁止全部均分**（均分即呆板）
- **同行总和为 12**：`c7+c5` · `c8+c4` · `c6+c6`
- **横贯卡片**：章节标头、总结区用 `c12`，形成呼吸节奏
- 必须用 `minmax(0,1fr)` 而非 `1fr`，防内容溢出
- 单区块内 Bento 行数 **≤4 行**

---

## 6. 间距、圆角、阴影

### 6.1 间距（4px 基准）

| 令牌 | 值 | 用途 |
|---|---|---|
| `--sp-1` | 4px | 微调 |
| `--sp-2` | 8px | 图标与文字 |
| `--sp-3` | 12px | 眉标与标题 |
| `--sp-4` | 16px | Bento 间隙 |
| `--sp-5` | 20px | 小卡片内边距 |
| `--sp-6` | 24px | **标准卡片内边距** |
| `--sp-7` | 28px | — |
| `--sp-8` | 32px | 大卡片内边距、页面留白 |
| `--sp-10` | 40px | — |
| `--sp-12` | 48px | 区块分隔 |
| `--sp-16` | 64px | 区块底部 |
| `--sp-20` | 80px | 章节呼吸区 |
| `--sp-24` | 96px | 页面顶部 |

语义别名：`--pad-card: var(--sp-6)` · `--pad-card-lg: var(--sp-8)`
卡片内边距**只能**取这两个值。

### 6.2 圆角

| 令牌 | 值 | 用途 |
|---|---|---|
| `--r-xs` | 8px | 徽标 |
| `--r-sm` | 12px | 按钮、嵌套小卡 |
| `--r-md` | 18px | **标准卡片** |
| `--r-lg` | 24px | 大区块 |
| `--r-xl` | 32px | 页面级容器 |
| `--r-2xl` | 40px | 特大容器 |
| `--r-full` | 999px | 药丸、头像 |

### 6.3 五级阴影

```css
--sh-1: 0 1px 2px rgba(22,24,29,.04), 0 1px 3px rgba(22,24,29,.03);
--sh-2: 0 2px 6px rgba(22,24,29,.05), 0 4px 12px rgba(22,24,29,.04);
--sh-3: 0 4px 12px rgba(22,24,29,.06), 0 12px 28px rgba(22,24,29,.05);
--sh-4: 0 8px 20px rgba(22,24,29,.07), 0 24px 48px rgba(22,24,29,.06);
--sh-5: 0 16px 32px rgba(22,24,29,.09), 0 40px 80px rgba(22,24,29,.08);
```

对应：`sh-1` 小标签 → `sh-2` 静态卡 → `sh-3` 重点卡 → `sh-4` 悬停 → `sh-5` 弹层

### 6.4 玻璃阴影（外阴影 + 内高光）

```css
--sh-glass: 0 2px 8px rgba(22,24,29,.04),
            0 12px 32px rgba(22,24,29,.06),
            inset 0 1px 0 var(--glass-edge);
--sh-glass-hover: 0 6px 16px rgba(22,24,29,.06),
            0 24px 56px rgba(22,24,29,.10),
            inset 0 1px 0 var(--glass-edge);
```

> `inset 0 1px 0` 是玻璃质感的核心 —— 模拟顶部受光亮边。**缺这行玻璃会显得扁平。**

### 6.5 带色阴影（让色块发光）

```css
--sh-azure:  0 4px 14px rgba(59,130,246,.24), 0 12px 32px rgba(59,130,246,.14);
--sh-violet: 0 4px 14px rgba(139,92,246,.22), 0 12px 32px rgba(139,92,246,.12);
--sh-mint:   0 4px 14px rgba(52,211,153,.22);
--sh-rose:   0 4px 14px rgba(251,113,133,.22);
```

**用途**：主按钮、Logo、彩色标签悬停。**约束**：单页 ≤6 处，透明度 ≤.24。

---

## 7. 组件

### 7.1 药丸眉标

```html
<span class="eyebrow">
  <svg width="14" height="14">…</svg>
  <span class="t-overline">About me · 个人介绍</span>
</span>
```
```css
.eyebrow{
  display:inline-flex; align-items:center; gap:var(--sp-2);
  padding:var(--sp-2) var(--sp-4); border-radius:var(--r-full);
  background:var(--glass-2); border:1px solid var(--glass-line);
  box-shadow:var(--sh-1);
}
```

### 7.2 彩色标签 Chip

点缀色的主要载体，年轻感的主要来源。

```css
.chip{
  display:inline-flex; align-items:center; gap:var(--sp-2);
  height:34px; padding:0 var(--sp-4); border-radius:var(--r-full);
  font-size:var(--fs-caption); font-weight:var(--fw-medium);
  border:1px solid transparent; transition:all .18s var(--ease-out);
}
.chip:hover{ transform:translateY(-2px) }

.chip-mint  { background:var(--mint-50);  color:var(--mint-600);   border-color:rgba(52,211,153,.28) }
.chip-violet{ background:var(--violet-50);color:var(--violet-700); border-color:var(--line-violet) }
.chip-amber { background:var(--amber-50); color:var(--amber-600);  border-color:rgba(251,191,36,.32) }
.chip-cyan  { background:var(--cyan-50);  color:var(--cyan-600);   border-color:rgba(34,211,238,.3) }
```

同组标签用不同色系可增加活力，但同页 ≤3 种色系。

### 7.3 图标容器

38×38 圆角方块，点缀色的第二载体。

```css
.ico-box{ width:38px; height:38px; border-radius:var(--r-sm); flex:0 0 38px;
          display:flex; align-items:center; justify-content:center }
.ico-azure { background:var(--azure-50);  color:var(--azure-600) }
.ico-violet{ background:var(--violet-50); color:var(--violet-600) }
.ico-mint  { background:var(--mint-50);   color:var(--mint-600) }
.ico-amber { background:var(--amber-50);  color:var(--amber-600) }
.ico-rose  { background:var(--rose-50);   color:var(--rose-600) }
.ico-cyan  { background:var(--cyan-50);   color:var(--cyan-600) }
```

### 7.4 数据指标 + 增长条

数字下方加随滚动增长的细条，把静态数字变成可感知的量。

```html
<div class="metric">
  <div class="t-metric tnum" data-count="47.45" data-suffix="%" data-dec="2">47.45%</div>
  <div class="t-caption">活动期新增领养贡献</div>
  <div class="bar"><i data-bar="47"></i></div>
</div>
```
```css
.bar{ height:3px; border-radius:2px; background:var(--ink-100);
      margin-top:var(--sp-3); overflow:hidden }
.bar i{ display:block; height:100%; width:0; border-radius:2px;
        background:var(--grad-brand); transition:width .9s var(--ease-out) }
```

**规则**：数字用 Metric 字阶 + `.tnum`；单位缩至 `.58em`；数字下必须有口径说明；涨跌用语义色 + 正负号双重标识。

### 7.5 丝滑展开

```css
.exp-panel{ display:grid; grid-template-rows:0fr;
            transition:grid-template-rows .32s var(--ease-glide) }
.exp-panel>div{ overflow:hidden }
[aria-expanded="true"]+.exp-panel{ grid-template-rows:1fr }

.plus{ transition:transform .32s var(--ease-spring) }
[aria-expanded="true"] .plus{ transform:rotate(135deg); background:var(--grad-brand); color:#fff }
```

> `grid-template-rows: 0fr → 1fr` 比 `max-height` 更平滑，且不需预知高度。

### 7.6 按钮

- 高度 40px（主/次）或 36px（文字按钮），圆角 `--r-sm` 或 `--r-full`
- 主按钮：`background:var(--grad-brand)` + `box-shadow:var(--sh-azure)`
- 次按钮：`background:var(--glass-3)` + `border:1px solid var(--line-soft)`
- 每屏 ≤1 个主按钮

---

## 8. 动效

### 8.1 曲线与时长

```css
--ease-out:    cubic-bezier(.32,.72,0,1);      /* 主力入场 */
--ease-in-out: cubic-bezier(.65,0,.35,1);      /* 状态切换、极光 */
--ease-spring: cubic-bezier(.34,1.46,.64,1);   /* 弹性，仅小元素 */
--ease-glide:  cubic-bezier(.22,1,.36,1);      /* 丝滑展开 */

--dur-fast:.18s;  --dur-base:.32s;  --dur-slow:.56s;
--dur-slower:.9s; --dur-breathe:7s;
```

| 场景 | 时长 | 曲线 |
|---|---|---|
| 悬停 / 按下 | `.18s` | ease-out |
| 状态切换、展开 | `.32s` | glide / spring |
| 滚动入场 | `.56s` | ease-out |
| 数字滚动、数据条 | `.9s` | ease-out |
| 呼吸光效 | `7s` 循环 | ease-in-out |
| 极光漂移 | `26s` 循环 | ease-in-out |

### 8.2 六类标准动效

```css
/* 1. 滚动入场 */
.reveal{ opacity:0; transform:translateY(20px) scale(.985);
         transition:opacity .56s var(--ease-out), transform .56s var(--ease-out) }
.reveal.in{ opacity:1; transform:none }

/* 2. tvOS 视差倾斜 */
.tilt{
  transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) scale(var(--tz,1));
  transition:transform .32s var(--ease-out), box-shadow .32s var(--ease-out);
  transform-style:preserve-3d; will-change:transform;
}
.tilt:hover{ box-shadow:var(--sh-glass-hover) }

/* 3. 悬停抬升 */
.lift{ transition:transform .32s var(--ease-out), box-shadow .32s var(--ease-out),
                  border-color .32s var(--ease-out) }
.lift:hover{ transform:translateY(-4px); box-shadow:var(--sh-4); border-color:var(--line-azure) }

/* 4. 按下反馈 */
.press{ transition:transform .18s var(--ease-out) }
.press:active{ transform:scale(.975) }

/* 5-6. 呼吸光效与极光见第 2、3 章 */

/* 兜底（必须） */
@media (prefers-reduced-motion: reduce){
  .reveal{ opacity:1; transform:none }
  .aurora{ animation:none }
  *{ animation:none !important; transition-duration:.01ms !important }
}
```

### 8.3 视差倾斜 JS

```js
document.querySelectorAll('[data-tilt]').forEach(function(card){
  var max = 5;   // 禁止超过 6deg
  card.addEventListener('pointermove', function(ev){
    var r = card.getBoundingClientRect();
    var px = (ev.clientX - r.left)/r.width  - .5;
    var py = (ev.clientY - r.top )/r.height - .5;
    card.style.setProperty('--ry', (px*max).toFixed(2)+'deg');
    card.style.setProperty('--rx', (-py*max).toFixed(2)+'deg');
    card.style.setProperty('--tz','1.012');
  });
  card.addEventListener('pointerleave', function(){
    card.style.setProperty('--ry','0deg');
    card.style.setProperty('--rx','0deg');
    card.style.setProperty('--tz','1');
  });
});
```

**约束**：倾角 ≤6deg（超过会晕）；缩放 ≤1.02；单页 ≤4 张视差卡片；仅用于重点卡。

### 8.4 数字滚动 + 数据条 JS

```js
function count(el){
  var t = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec||'0',10);
  var pre = el.dataset.prefix||'', suf = el.dataset.suffix||'';
  function paint(v){ el.innerHTML = pre + v.toFixed(dec) + '<span style="font-size:.58em">'+suf+'</span>' }
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){ paint(t); return }
  var st = performance.now(), dur = 900;
  function tick(now){
    var p = Math.min((now-st)/dur,1), e = 1-Math.pow(1-p,3);   // easeOutCubic
    paint(t*e);
    if(p<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
var mo = new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting){ count(e.target); mo.unobserve(e.target) } });
},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(function(el){ mo.observe(el) });

var bo = new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(e.isIntersecting){
      var el = e.target;
      setTimeout(function(){ el.style.width = el.dataset.bar+'%' },120);
      bo.unobserve(el);
    }
  });
},{threshold:.5});
document.querySelectorAll('[data-bar]').forEach(function(el){ bo.observe(el) });
```

### 8.5 禁令

- 禁止无限循环动画（例外：呼吸光效、极光漂移，周期 ≥7s）
- 禁止入场延迟超过 240ms
- 禁止 `transform` / `opacity` 之外的属性做高频动画
- **必须**响应 `prefers-reduced-motion`

---

## 9. 图标

| 维度 | 规范 |
|---|---|
| 风格 | 线框，`stroke-width:1.8`，圆角端点 |
| 尺寸 | **仅 14 / 16 / 19 / 24px** |
| 颜色 | 在 `.ico-box` 内用对应 600 档；独立使用时 `--ink-400` |
| 数量 | 单页 ≤12 处 |
| 位置 | 眉标前置、图标容器内、标签内、页脚水印 |

**禁止**：彩色实心 emoji 替代图标；品牌形象作大面积背景；图标大于相邻标题字号

### 内置图标（可直接内联）

```html
<!-- 火花 · 关系 -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3.5c2.6 3 4.4 5.2 4.4 8a4.4 4.4 0 1 1-8.8 0c0-2.8 1.8-5 4.4-8Z"/>
  <path d="M12 12.6c1 1.2 1.6 2 1.6 3a1.6 1.6 0 0 1-3.2 0c0-1 .6-1.8 1.6-3Z"/>
</svg>

<!-- 增长 -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 18 9.4 12l3.4 3.2L20 7.6"/><path d="M15.4 7.6H20v4.6"/>
</svg>

<!-- 双向连接 -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="7" cy="7" r="2.6"/><circle cx="17" cy="17" r="2.6"/><path d="M9.4 9.4 14.6 14.6"/>
</svg>

<!-- 柱状图 · 数据 -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
  <path d="M4 18V9.6M9.4 18V5M14.8 18v-6.4M20.2 18V8"/>
</svg>

<!-- 学历 -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 8.4 12 4.2l9 4.2-9 4.2Z"/><path d="M7 10.8v4.6c0 1.6 2.2 2.8 5 2.8s5-1.2 5-2.8v-4.6"/>
</svg>

<!-- 公文包 · 经历 -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="7.4" width="18" height="12.2" rx="2.4"/>
  <path d="M8.8 7.4V5.8c0-.9.7-1.6 1.6-1.6h3.2c.9 0 1.6.7 1.6 1.6v1.6"/>
</svg>

<!-- 靶心 · 目标 -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3.6v4.2M12 16.2v4.2M4.8 12h4.2M15 12h4.2"/><circle cx="12" cy="12" r="3.2"/>
</svg>

<!-- 放大镜 · 洞察 -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="10.6" cy="10.6" r="6.2"/><path d="M15.4 15.4 20 20"/>
</svg>
```

---

## 10. 可访问性底线

| 项目 | 要求 |
|---|---|
| 字号下限 | 正文 ≥15px，标注 ≥13px |
| 对比度 | 正文 ≥4.5:1，大标题 ≥3:1；`--ink-400` 及更浅禁用于正文 |
| 玻璃对比度 | 玻璃卡上文字必须实测 —— 半透明会降对比，必要时改用 `--glass-3` |
| 点击区域 | ≥40×40px，视觉不足时用透明内边距补足 |
| 焦点可见 | 禁止移除 outline；`2px solid var(--azure-500)`，`offset 3px` |
| 不依赖颜色 | 涨跌须有 +/− 符号或文字 |
| 语义结构 | 标题不跳级；折叠用 `<button aria-expanded aria-controls>`；装饰 SVG 加 `aria-hidden="true"` |
| 动效 | 必须响应 `prefers-reduced-motion` |
| 兜底 | `backdrop-filter` 不支持时退化为半透明底，须确保文字仍可读 |

---

## 11. 全量令牌（可直接复制）

```css
:root{
  /* 主色 Azure */
  --azure-50:#EFF6FF; --azure-100:#DBEAFE; --azure-200:#BFDBFE; --azure-300:#93C5FD;
  --azure-400:#60A5FA; --azure-500:#3B82F6; --azure-600:#2563EB; --azure-700:#1D4ED8;
  --azure-800:#1E40AF;

  /* 辅助色 Violet */
  --violet-50:#F5F3FF; --violet-100:#EDE9FE; --violet-200:#DDD6FE; --violet-300:#C4B5FD;
  --violet-400:#A78BFA; --violet-500:#8B5CF6; --violet-600:#7C3AED; --violet-700:#6D28D9;

  /* 点缀色 */
  --mint-50:#ECFDF5;  --mint-400:#34D399;  --mint-600:#059669;
  --cyan-50:#ECFEFF;  --cyan-400:#22D3EE;  --cyan-600:#0891B2;
  --amber-50:#FFFBEB; --amber-400:#FBBF24; --amber-600:#D97706;
  --rose-50:#FFF1F2;  --rose-400:#FB7185;  --rose-600:#E11D48;
  --lime-50:#F7FEE7;  --lime-400:#A3E635;  --lime-600:#65A30D;
  --peach-50:#FFF7ED; --peach-400:#FB923C; --peach-600:#EA580C;

  /* 中性灰阶 */
  --ink-950:#0A0A0F; --ink-900:#16181D; --ink-800:#22252B; --ink-700:#383C44;
  --ink-600:#52565F; --ink-500:#71757E; --ink-400:#9AA0A8; --ink-300:#C7CBD1;
  --ink-200:#E4E7EB; --ink-100:#F1F3F5; --ink-050:#F8F9FB;

  /* 表面与玻璃 */
  --surface-base:#FCFCFD; --surface-raised:#FFFFFF; --surface-sunken:#F5F6F8;
  --glass-1:rgba(255,255,255,.55);
  --glass-2:rgba(255,255,255,.68);
  --glass-3:rgba(255,255,255,.82);
  --glass-blur-sm:blur(12px) saturate(160%);
  --glass-blur-md:blur(20px) saturate(180%);
  --glass-blur-lg:blur(32px) saturate(200%);
  --glass-edge:rgba(255,255,255,.72);
  --glass-line:rgba(255,255,255,.45);

  /* 语义色 */
  --up:#F43F5E;   --up-bg:#FFF1F3;
  --down:#10B981; --down-bg:#ECFDF5;
  --warn:#F59E0B; --warn-bg:#FFFBEB;

  /* 描边 */
  --line-hair:rgba(22,24,29,.055);
  --line-soft:rgba(22,24,29,.09);
  --line-strong:rgba(22,24,29,.14);
  --line-azure:rgba(59,130,246,.30);
  --line-violet:rgba(139,92,246,.28);

  /* 极光四层 */
  --aurora-a:radial-gradient(60% 50% at 12% 8%,  rgba(59,130,246,.16) 0%, transparent 62%);
  --aurora-b:radial-gradient(55% 45% at 88% 4%,  rgba(139,92,246,.14) 0%, transparent 60%);
  --aurora-c:radial-gradient(50% 42% at 78% 62%, rgba(34,211,238,.11) 0%, transparent 62%);
  --aurora-d:radial-gradient(48% 40% at 8% 78%,  rgba(251,113,133,.09) 0%, transparent 60%);

  /* 渐变 */
  --grad-brand:linear-gradient(135deg,var(--azure-500) 0%,var(--violet-500) 100%);
  --grad-cool: linear-gradient(135deg,var(--cyan-400) 0%,var(--azure-500) 100%);
  --grad-warm: linear-gradient(135deg,var(--amber-400) 0%,var(--rose-400) 100%);
  --grad-hair: linear-gradient(90deg,transparent,rgba(59,130,246,.35),transparent);

  /* 字体 */
  --font-sans:-apple-system,BlinkMacSystemFont,"SF Pro Text","PingFang SC","Helvetica Neue","Microsoft YaHei",sans-serif;
  --font-display:-apple-system,BlinkMacSystemFont,"SF Pro Display","PingFang SC","Helvetica Neue",sans-serif;
  --font-mono:"SF Mono",ui-monospace,"JetBrains Mono",Menlo,monospace;

  /* 字阶 */
  --fs-display:clamp(42px,4.4vw,64px);
  --fs-title-1:clamp(28px,2.6vw,38px);
  --fs-title-2:clamp(21px,1.7vw,26px);
  --fs-title-3:17px;
  --fs-body:16px;
  --fs-body-sm:15px;
  --fs-caption:13px;
  --fs-overline:12px;
  --fs-metric:clamp(28px,2.4vw,40px);

  /* 字重 / 行高 / 字距 */
  --fw-regular:400; --fw-medium:500; --fw-semibold:600;
  --lh-tight:1.14; --lh-snug:1.3; --lh-normal:1.6; --lh-relaxed:1.75;
  --ls-display:-.026em; --ls-title:-.014em; --ls-body:0; --ls-overline:.14em;

  /* 间距 */
  --sp-1:4px;  --sp-2:8px;  --sp-3:12px; --sp-4:16px; --sp-5:20px;
  --sp-6:24px; --sp-7:28px; --sp-8:32px; --sp-10:40px;
  --sp-12:48px; --sp-16:64px; --sp-20:80px; --sp-24:96px;
  --pad-card:var(--sp-6); --pad-card-lg:var(--sp-8);

  /* 圆角 */
  --r-xs:8px; --r-sm:12px; --r-md:18px; --r-lg:24px;
  --r-xl:32px; --r-2xl:40px; --r-full:999px;

  /* 阴影五级 */
  --sh-1:0 1px 2px rgba(22,24,29,.04),0 1px 3px rgba(22,24,29,.03);
  --sh-2:0 2px 6px rgba(22,24,29,.05),0 4px 12px rgba(22,24,29,.04);
  --sh-3:0 4px 12px rgba(22,24,29,.06),0 12px 28px rgba(22,24,29,.05);
  --sh-4:0 8px 20px rgba(22,24,29,.07),0 24px 48px rgba(22,24,29,.06);
  --sh-5:0 16px 32px rgba(22,24,29,.09),0 40px 80px rgba(22,24,29,.08);

  /* 玻璃阴影（含内高光） */
  --sh-glass:0 2px 8px rgba(22,24,29,.04),0 12px 32px rgba(22,24,29,.06),
             inset 0 1px 0 var(--glass-edge);
  --sh-glass-hover:0 6px 16px rgba(22,24,29,.06),0 24px 56px rgba(22,24,29,.10),
             inset 0 1px 0 var(--glass-edge);

  /* 带色阴影 */
  --sh-azure:0 4px 14px rgba(59,130,246,.24),0 12px 32px rgba(59,130,246,.14);
  --sh-violet:0 4px 14px rgba(139,92,246,.22),0 12px 32px rgba(139,92,246,.12);
  --sh-mint:0 4px 14px rgba(52,211,153,.22);
  --sh-rose:0 4px 14px rgba(251,113,133,.22);

  /* 动效 */
  --ease-out:cubic-bezier(.32,.72,0,1);
  --ease-in-out:cubic-bezier(.65,0,.35,1);
  --ease-spring:cubic-bezier(.34,1.46,.64,1);
  --ease-glide:cubic-bezier(.22,1,.36,1);
  --dur-fast:.18s; --dur-base:.32s; --dur-slow:.56s;
  --dur-slower:.9s; --dur-breathe:7s;
  --tilt-max:6deg; --tilt-lift:1.02;

  /* 布局与层级 */
  --container:1280px; --gutter:var(--sp-6); --bento-gap:var(--sp-4); --nav-h:62px;
  --z-aurora:0; --z-content:1; --z-nav:100; --z-overlay:200;
}
```

### 排版工具类（必须配套）

```css
.t-display{font-family:var(--font-display);font-size:var(--fs-display);font-weight:var(--fw-semibold);
  line-height:var(--lh-tight);letter-spacing:var(--ls-display);color:var(--ink-900)}
.t-title-1{font-family:var(--font-display);font-size:var(--fs-title-1);font-weight:var(--fw-semibold);
  line-height:var(--lh-tight);letter-spacing:var(--ls-title);color:var(--ink-900)}
.t-title-2{font-size:var(--fs-title-2);font-weight:var(--fw-semibold);line-height:var(--lh-snug);
  letter-spacing:var(--ls-title);color:var(--ink-800)}
.t-title-3{font-size:var(--fs-title-3);font-weight:var(--fw-semibold);line-height:var(--lh-snug);color:var(--ink-800)}
.t-body{font-size:var(--fs-body);font-weight:var(--fw-regular);line-height:var(--lh-normal);color:var(--ink-700)}
.t-body-sm{font-size:var(--fs-body-sm);font-weight:var(--fw-regular);line-height:var(--lh-normal);color:var(--ink-600)}
.t-caption{font-size:var(--fs-caption);font-weight:var(--fw-regular);line-height:var(--lh-normal);color:var(--ink-500)}
.t-overline{font-size:var(--fs-overline);font-weight:var(--fw-semibold);line-height:1;
  letter-spacing:var(--ls-overline);text-transform:uppercase;color:var(--azure-600)}
.t-metric{font-family:var(--font-display);font-size:var(--fs-metric);font-weight:var(--fw-semibold);
  line-height:1.05;letter-spacing:var(--ls-display);font-variant-numeric:tabular-nums;color:var(--ink-900)}
.tnum{font-variant-numeric:tabular-nums}
.t-grad{background:var(--grad-brand);-webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;color:transparent}
```

---

## 12. 实施顺序与自检

### 12.1 搭建顺序

按此顺序可避免返工：

1. **铺极光层** — 先写 `.aurora` 与 `.page{position:relative;z-index:1}`，确认层级正确
2. **定容器与栅格** — 设 `--container` 与 `.bento` 12 列，用灰块占位排出主次比例
3. **套字阶** — 所有文本直接套 `.t-*` 类，此时不加任何颜色
4. **加玻璃表面** — 卡片加 `.glass`，检查 `backdrop-filter` 生效、文字对比度达标
5. **分配阴影层级** — 按 `sh-2` 静态、`sh-3` 重点、`sh-4` 悬停铺开
6. **点缀上色** — 最后才加彩色标签与图标容器
7. **挂动效** — 入场 → 悬停 → 视差 → 数字滚动，每加一类测一次减少动效
8. **跑自检清单**

> **颜色放第 6 步是刻意的** —— 先用无彩状态确认结构与层次成立，再上色，才不会用颜色掩盖布局问题。

### 12.2 自检清单

**色彩**
- [ ] 主色 + 辅助色面积 ≤18%
- [ ] 点缀色同页 ≤3 种，单种 <2%
- [ ] 点缀色未用于大面积底色或正文
- [ ] 涨红跌绿

**极光与玻璃**
- [ ] 极光层 `z-index:0` + `pointer-events:none`，内容层 `z-index:1`
- [ ] 极光单层透明度 ≤.16，周期 ≥20s
- [ ] 玻璃卡有 `backdrop-filter` + `saturate()`
- [ ] 玻璃阴影含 `inset 0 1px 0` 内高光
- [ ] 呼吸光效 ≤4 处
- [ ] 玻璃嵌套内层更实，≤2 层

**文字**
- [ ] 无小于 13px 的文字（含单位、徽标）
- [ ] 正文 ≥15px
- [ ] 全部套 `.t-*` 类，无行内 font-size
- [ ] 单卡片 ≤3 级字号
- [ ] 渐变文字 ≤2 处
- [ ] 数字加 `.tnum`

**布局**
- [ ] Bento 同行总和为 12
- [ ] 有主次差异，非全部均分
- [ ] 全部左对齐，仅时间与占比右对齐
- [ ] 眉标在标题上方
- [ ] 用 `minmax(0,1fr)`
- [ ] 1040 / 720px 断点降级正常

**层次**
- [ ] 阴影按 5 级梯度，非全部同级
- [ ] 悬停阴影明显强于静态
- [ ] 带色阴影 ≤6 处，透明度 ≤.24

**动效**
- [ ] 视差倾角 ≤6deg，缩放 ≤1.02，≤4 张卡
- [ ] 关键数据有滚动 + 数据条增长
- [ ] 展开用 `grid-template-rows:0fr→1fr`
- [ ] 含 `prefers-reduced-motion` 兜底

**可访问性**
- [ ] 玻璃卡上文字对比度实测达标
- [ ] 可交互元素 ≥40×40px
- [ ] 保留 focus outline
- [ ] 折叠用 `<button aria-expanded>`
- [ ] 装饰 SVG 加 `aria-hidden`

---

## 13. 最短执行摘要

只读一段的话读这段。

> 生成 Apple 空间计算风格页面。**结构严格、皮肤活泼**。
>
> 主色 `#3B82F6`、辅助 `#8B5CF6`，二者 135° 渐变为视觉签名；点缀色（`#34D399`/`#22D3EE`/`#FBBF24`/`#FB7185`）只用于标签底与图标，同页 ≤3 种、单种面积 <2%。
>
> 背景铺四层极光（蓝 .16 / 紫 .14 / 青 .11 / 粉 .09）叠在 `#FCFCFD` 上，`z-index:0` 且 26s 缓慢漂移；内容层 `z-index:1`。
>
> 卡片用玻璃：`rgba(255,255,255,.68)` + `blur(20px) saturate(180%)` + 圆角 18px + 阴影**必含** `inset 0 1px 0 rgba(255,255,255,.72)` 内高光。
>
> 字阶封闭 9 档，**禁止 <13px**，正文 ≥15px，字重仅 400/500/600，禁止行内 font-size。
>
> 全部左对齐，眉标在标题上方，仅时间与占比右对齐。
>
> Bento 12 列栅格，重点卡占 7–8 列、次要占 4–5 列，**禁止全部均分**，同行总和为 12。
>
> 阴影分 5 级梯度，按钮用带色阴影发光。
>
> 六类动效：入场 .56s、悬停抬升 .32s、按下 .18s、视差倾斜 ≤6deg、呼吸光效 7s、数字滚动 .9s。**必须写 `prefers-reduced-motion` 兜底。**

---

## 14. 换色指南

只需替换两组变量并同步四处引用：

```css
/* 1. 主色与辅助色 */
--azure-500: <新主色>;  --azure-600: <深 12%>;  --azure-50: <极浅，L≈97%>;
--violet-500: <新辅助色>; --violet-600: <深 12%>; --violet-50: <极浅>;

/* 2. 极光（必须同步，否则背景与主色不协调） */
--aurora-a: radial-gradient(60% 50% at 12% 8%, rgba(<新主色RGB>,.16) 0%, transparent 62%);
--aurora-b: radial-gradient(55% 45% at 88% 4%, rgba(<新辅助色RGB>,.14) 0%, transparent 60%);

/* 3. 带色阴影 */
--sh-azure: 0 4px 14px rgba(<新主色RGB>,.24), 0 12px 32px rgba(<新主色RGB>,.14);

/* 4. 描边 */
--line-azure: rgba(<新主色RGB>,.30);
```

**不需改动**：灰阶、字阶、间距、圆角、阴影梯度、动效。

### 配色搭配

主色与辅助色应满足：**色相差 30–60°，明度接近，饱和度接近**。

| 场景 | 主色 | 辅助色 | 气质 |
|---|---|---|---|
| 科技 / 产品 | 蓝 `#3B82F6` | 紫 `#8B5CF6` | 理性、可信 |
| 消费 / 社交 | 紫 `#8B5CF6` | 粉 `#EC4899` | 年轻、活泼 |
| 效率 / 工具 | 青 `#06B6D4` | 蓝 `#3B82F6` | 清爽、专业 |
| 创意 / 内容 | 橙 `#F97316` | 玫 `#F43F5E` | 温暖、有张力 |
| 金融 / 商务 | 深蓝 `#1D4ED8` | 靛 `#4F46E5` | 稳重、权威 |

> 选橙 / 玫作主色时，涨跌红绿会与主色冲突，改用「深红 / 深绿 + 箭头图标」双重标识。

### 深色模式三条关键差异

```css
@media (prefers-color-scheme: dark){
  :root{
    --surface-base:#08090C;
    --glass-2:rgba(28,30,36,.62);
    --glass-line:rgba(255,255,255,.09);
    --glass-edge:rgba(255,255,255,.08);
    --ink-900:#F8F9FB; --ink-700:#C7CBD1; --ink-500:#71757E;
    --azure-500:#60A5FA; --violet-500:#A78BFA;
    --aurora-a:radial-gradient(60% 50% at 12% 8%, rgba(96,165,250,.22) 0%, transparent 62%);
  }
}
```

1. **内高光要弱** — 从 `.72` 降到 `.08`，否则像描白边
2. **阴影几乎无效** — 深底上不可见，层次改靠描边与玻璃透明度差异
3. **极光要更强** — 透明度从 `.16` 提到 `.22`，否则看不出色雾

---

**v3.0** · Apple Spatial Computing · 秩序作骨架，灵动作皮肤
