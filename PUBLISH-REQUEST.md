# 发布请求（已废弃）

> ⚠️ **本文档已于 2026-10-15 废弃，无需再使用。**

## 废弃原因

本文档原本用于旧的发布流程：Sites 托管 + 由另一个 agent（Codex）手动执行发布。

该项目现已迁移至 **GitHub Pages + GitHub Actions 自动部署**，不再需要任何手动发布请求。

## 现在的发布方式

推送到 GitHub 的 `main` 分支即自动构建上线：

```bash
cd /Users/kaidenfu/Documents/Codex/2026-08-10/https-doc-weixin-qq-com-doc/portfolio-site

npm run build    # 先验证构建无报错
git add <改动文件>
git commit -m "简要说明"
git push         # 推送后 1-3 分钟线上自动生效
```

- 线上地址：<https://www.kaidenfu.cn>（硬刷新 `Cmd+Shift+R` 破缓存）
- 构建状态：<https://github.com/kajun2002/portfolio-site/actions>
- 自动化配置：`.github/workflows/deploy.yml`

详见 `AGENT-HANDOFF.md` 第 8 节。
