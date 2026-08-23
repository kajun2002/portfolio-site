# 发布请求
请只负责发布到线上，不做内容检查、不做 UI 核对、不做额外验证。

## 发布信息
- 项目路径：`/Users/kaidenfu/Documents/Codex/2026-08-10/https-doc-weixin-qq-com-doc/portfolio-site`
- 发布提交：`9d59daf`（当前本地 HEAD，含全部 5 个改动：8cd66ae 标题堆叠 → e77eca7 内容重构 → 461fed9 文案压缩+标签样式 → 709e97f 总结卡字号 → 9d59daf 总结卡改为加粗下划线）
- 修改状态：已由其他 agent 完成，可直接上线

## 上次失败说明（SitesConnectorError: e77eca7 is not the current HEAD）
上次请求误用了旧提交号 e77eca7。请以**当前本地 HEAD `9d59daf`** 为准：把当前源码状态 commit 并 push 到站点仓库后，以 push 后的 branch-head SHA 作为 commit_sha 保存版本并部署。

## 执行要求
- 直接按站点发布流程保存版本并部署
- 不需要额外阅读业务文档
- 不需要本地人工验收
- 如果发布成功：只回复线上 URL
- 如果发布失败：只回复 1. 失败报错原文 2. 阻塞原因 3. 我下一步需要补什么

## 遇到以下情况的处理方式
- 如果源码 HEAD 不一致：停止，不继续排查，只告诉我当前本地 commit 和站点要求的 HEAD 不一致
- 如果缺少 hosting 配置：停止，只告诉我缺少 `.openai/hosting.json`
- 如果需要权限或外部仓库同步：停止，只告诉我需要哪一项权限/同步动作

## 备注
- 无需回滚
- 无需优化代码
- 无需改文案
- 无需重新 build（除非发布流程强制要求）
