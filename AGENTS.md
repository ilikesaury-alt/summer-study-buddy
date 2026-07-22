# AGENTS.md — AI 协作规范与项目活文档

> 本文件是所有 AI 编码工具(TRAE / opencode / codex / cursor 等)在本项目的协作规范与活文档。
> AI 助手在每次会话开始时应读取本文件,并严格遵守其中约定。

## 二、项目概述

**暑假学习小管家** — 面向二升三小学生的暑假学习 PWA 应用。

### 核心功能
- **作业打卡**:每日作业清单勾选,完成获得星星
- **复习出题**:二年级知识闯关(语文/数学/英语),错题自动入库
- **预习新知**:三年级新课预习(古诗背诵/词语默写/数学/英语词汇)
- **成长记录**:学习进度、勋章系统、数据导入导出

### 目标用户
即将升三年级的小学生,主要在平板/手机上使用。

### 部署地址
- Cloudflare Pages:`https://summer-study-buddy.pages.dev`(主)
- GitHub Pages:`https://ilikesaury-alt.github.io/summer-study-buddy/`(备)

---

## 三、技术栈

| 类别 | 技术 |
|---|---|
| 框架 | React 18 + TypeScript |
| 构建 | Vite 6 |
| 路由 | React Router v6(HashRouter) |
| 状态 | Zustand + persist 中间件(LocalStorage) |
| 样式 | Tailwind CSS(自定义 sun/mint/coral/sky2/ink 色板) |
| 动画 | Framer Motion |
| 图标 | lucide-react |
| PWA | vite-plugin-pwa(workbox) |
| 部署 | Cloudflare Pages / GitHub Actions → GitHub Pages |

---

## 四、技术约定(硬约束,不可违反)

### 路由
- **必须使用 HashRouter**,不得改为 BrowserRouter(子路径部署会空白)

### 教材版本对齐
- 语文:人教版(二年级下/三年级上)
- 数学:北师版(二年级下/三年级上)
- 英语:外研新启航(二年级下/三年级上)

### 英语发音
- 所有英语内容必须配 SpeakButton 发音按钮
- 发音必须用 onClick 用户手势触发(移动端自动播放策略)
- SpeakButton 三级降级:speechSynthesis → 有道 TTS audio → 静默
- 所有异步回调必须 try/catch,防止 React 18 卸载整页

### PWA 缓存
- workbox 配置 skipWaiting: true + clientsClaim: true
- HTML 用 NetworkFirst(3 秒超时回退缓存)
- onNeedRefresh 时自动 reload

### base 路径
- vite.config.ts 自动检测:GitHub Pages 用子路径,Cloudflare/本地用根路径
- 不要硬编码 base

### 错误边界
- 路由级用 SafeBoundary 包裹,出错只卸载当前页,保留 Layout 导航
- 全局监听 speechSynthesis 相关 error / unhandledrejection 并静默

### 数据存储
- 所有数据本地存(LocalStorage),不联网
- store 必须有 version 字段和 merge 函数,便于未来迁移

---

## 五、项目结构

```
src/
├── components/         通用组件
│   ├── SpeakButton.tsx     发音按钮(三级降级)
│   ├── SafeBoundary.tsx    轻量错误边界
│   ├── Layout.tsx          底部导航布局
│   ├── PageHeader.tsx      页面标题
│   ├── EmptyHint.tsx       空状态提示
│   ├── StarBurst.tsx       星星迸发动画
│   ├── Confetti.tsx        撒花动画
│   └── ProgressRing.tsx    进度环
├── pages/              页面
│   ├── Checkin.tsx          作业打卡
│   ├── Review.tsx           复习选科
│   ├── Quiz.tsx             闯关答题
│   ├── WrongBook.tsx        错题本
│   ├── Preview.tsx          预习入口
│   ├── ChineseRecite.tsx    古诗背诵
│   ├── Dictation.tsx        词语默写
│   ├── MathPreview.tsx      数学预习
│   ├── EnglishPreview.tsx   英语词汇
│   └── Growth.tsx           成长记录
├── data/               题库与预习数据
│   ├── reviewQuestions.ts   复习题库(按教材版本)
│   ├── previewData.ts       预习内容
│   └── badges.ts            勋章定义
├── store/
│   └── useStudyStore.ts     Zustand store(persist)
├── utils/
│   ├── date.ts              日期工具
│   └── quizEngine.ts        出题引擎
├── lib/
│   └── utils.ts             cn() 等工具
├── App.tsx                  路由 + 错误边界
├── main.tsx                 入口 + SW 注册
├── types.ts                 类型定义
└── index.css                Tailwind + 自定义样式
```

---

## 六、功能清单与进度

> 每次迭代后更新本章节

### 已完成
- [x] 作业打卡(每日清单、星星奖励、连续打卡)
- [x] 复习闯关(三学科题库、计时、错题入库)
- [x] 错题本(查看、解析、标记已掌握、清空)
- [x] 古诗背诵(人教版三上 9 首古诗)
- [x] 词语默写(22 个词语)
- [x] 数学预习(北师版三上 7 节)
- [x] 英语词汇(外研新启航三上 25 词,翻转卡片)
- [x] 成长记录(进度、勋章、数据导入导出)
- [x] PWA 离线支持 + 自动更新
- [x] 移动端英语发音(SpeakButton 三级降级)
- [x] 错误边界(防止整页崩溃)

### 待办
- [ ] Cloudflare Pages 部署切换(从 workers.dev 迁移到 pages.dev)
- [ ] 手机端访问稳定性验证

---

## 七、已知问题与经验

- GitHub Pages 国内访问不稳定,Cloudflare Pages 是更优选择
- Service Worker 缓存可能导致用户看到旧版本,首次配置更新后需手动清一次缓存
- 移动端国产浏览器 speechSynthesis 可能存在但不可用,必须 try/catch + 降级
- `workers.dev` 域名在国内手机网络下可能被屏蔽,优先用 `pages.dev`
- git push 到 github.com 在国内网络常超时,可关代理重试或用 wrangler 直传

---

## 八、更新日志

| 日期 | 内容 |
|---|---|
| 2026-07-22 | 初始创建:固化 plan-build-review-doc 工作流,记录项目约定与进度 |
