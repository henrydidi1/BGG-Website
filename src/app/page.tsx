"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';

// ==========================================
// 1. 中英双语内容字典 (卡片内拉长对比版)
// ==========================================
const dict = {
  en: {
    nav: { goradar: "GoRadar AI", services: "Services", cases: "Cases", pricing: "Pricing", faq: "FAQ", contact: "Contact", signin: "Sign In", langSwitch: "中" },
    hero: { 
      title: "MARKET RADAR: ON.\nGUESSWORK: OFF.", 
      subtitle: "Powered by our proprietary GoRadar\u00A0AI™.\nWe uncover hidden market opportunities, craft data-driven strategies,\nand acquire high-value clients globally." 
    },
    marquee: ["GoRadar AI™", "STRATEGY", "CONTENT STUDIO", "PERFORMANCE ADS"],
    services: {
      title: "CORE SERVICES:\nTHE 3-ENGINE SYSTEM",
      desc: "Transforming compute power into global market share. Here is our execution roadmap.",
      s1: { 
        title: "GoRadar AI™ SYSTEM", 
        desc: "Our proprietary market intelligence engine.\nWe don't guess the market; we compute it.",
        btnOpen: "EXPLORE THE RADAR ↘",
        btnClose: "CLOSE TERMINAL ✕",
        features: [
          { name: "COMPETITOR BLINDSPOT SCANNER", detail: "Real-time tracking of global competitors to identify untargeted, high-margin search keywords." },
          { name: "CROSS-BORDER DEMAND MATRIX", detail: "Algorithms that match local overseas search intent directly with your supply chain advantages." },
          { name: "AI AUDIENCE SIMULATOR", detail: "Simulates ad performance across demographics before you spend a single dollar on media buying." }
        ]
      },
      s2: { 
        title: "GLOBAL CONTENT", 
        desc: "AI-enhanced cultural storytelling that breaks borders.\nDominating TikTok, Instagram, YouTube, and RED.",
        bullets: [
          "Viral Creative & UGC Production",
          "Cross-Cultural Localization",
          "Influencer & KOL Partnerships",
          "Community Management"
        ],
        kpis: ["KPI: ENGAGEMENT RATE", "KPI: BRAND IMPRESSION"]
      },
      s3: { 
        title: "PERFORMANCE ADS", 
        desc: "Precision media buying executed like a quantitative portfolio.\nWe ruthlessly scale budgets and optimize conversion funnels.",
        bullets: [
          "Search Intent Capture (Google/LinkedIn)",
          "Social Lead Gen & Sales (Meta/TikTok)",
          "Retargeting & A/B Testing",
          "Landing Page CRO Optimization"
        ],
        kpis: ["KPI: CPA / CPL", "KPI: TARGET ROAS"]
      },
    },
    protocol: {
      title: "THE 90-DAY ROADMAP",
      intro: {
        title: "WHY DO WE NEED 90 DAYS?",
        reasons: [
          { title: "NO FAKE PROMISES", desc: "AI ad models and cross-cultural trust require 30-45 days of data feeding. Anyone promising 'week-one virality' is burning your brand equity." },
          { title: "ZERO BLACK BOXES", desc: "Our roadmap is precise to the week. From audits to asset launches, you track every hard deliverable. You know exactly where your money goes." },
          { title: "DATA-BACKED SCALING", desc: "We spend small in the first 30 days on high-frequency A/B testing. We then heavily fund the proven high-ROI models in the next 60 days to minimize risk." }
        ]
      },
      p1: { tag: "PHASE 01: WEEK 1", title: "AUDIT & STRATEGY", desc: "Plug into the GoRadar AI™ Dashboard. We audit your past wasted spend, reverse-engineer competitor blindspots, and deliver your GTM Strategy Blueprint." },
      p2: { tag: "PHASE 02: WEEK 2-3", title: "CREATIVE & TRACKING SETUP", desc: "Deploy pixel-perfect tracking (GA4/Meta CAPI) before spending a dime. We simultaneously deliver 30+ cross-cultural high-converting visual assets." },
      p3: { tag: "PHASE 03: MONTH 1", title: "LAUNCH & AGGRESSIVE TESTING", desc: "Initiate live campaigns. We high-frequency test audience and creative combinations, forcefully feed the AI algorithms, and lock in your first high-ROI model." },
      p4: { tag: "PHASE 04: MONTH 2-3+", title: "SCALE & DOMINATE", desc: "Kill underperforming ads. We allocate 80% of the budget to proven winner models, scaling exponentially while strictly capping your CPA redline." }
    },
    cases: {
      title: "BATTLE-TESTED WINS",
      desc: "We don't sell theories. We deploy compute to capture market share.",
      list: [
        {
          tag: "B2B / HEAVY SUPPLY CHAIN",
          title: "BREAKING THE EUROPEAN TRUST BARRIER",
          metric: "380% ROI",
          desc: "Built a zero-to-one high-converting infrastructure for heavy-duty compressed furniture. Transitioned their global image from 'cheap factory' to 'premium lifestyle choice'.",
          img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" 
        },
        {
          tag: "D2C / CONSUMER ELECTRONICS",
          title: "SCALING THE US MARKET WITH AI ADS",
          metric: "$2.4M ARR",
          desc: "Deployed aggressive A/B testing on Meta and TikTok. Used GoRadar AI™ to identify untargeted tech-enthusiast demographics, cutting CPA by 42% in 60 days.",
          img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
        },
        {
          tag: "HIGH-TICKET / SAAS",
          title: "DOMINATING ENTERPRISE LEAD GEN",
          metric: "5X INQUIRIES",
          desc: "Overhauled SEO architecture and executed precision LinkedIn Ads to bypass gatekeepers, connecting directly with C-level executives in Southeast Asia.",
          img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    about: {
      title: "WE HATE VANITY METRICS.",
      manifesto: "Too many agencies hide behind 'impressions' and 'likes'.\nYou can't deposit clicks at the bank.\n\nWe act as an extension of your growth team.\nWe speak your language: Supply Chains, Net Margins, CAC, and LTV.",
      stat: "10+ YEARS",
      statDesc: "CROSS-BORDER FRONTLINE EXPERIENCE",
      teamTitle: "THE MINDS BEHIND THE MACHINE",
      teamDesc: "Distributed globally, executing precisely. Operating out of core global hubs (Bali, Singapore, Kuala Lumpur, Amsterdam) to stay intimately close to enterprise supply chains and global markets.",
      member1: {
        name: "YUSHENG YANG",
        role: "CO-FOUNDER",
        desc: "Holding a BSc in Accounting & Finance from Lancaster University and a Master's from the University of Warwick, Yusheng brings over a decade of frontline experience scaling B2B/D2C cross-border supply chains. As a GTM strategist and the architect behind GoRadar AI™, he bridges European business acumen with Asian manufacturing power. Outside the war room, he is a competitive ultra-trail runner, applying the discipline of endurance sports to long-term business growth."
      },
      member2: {
        name: "WARREN GOLDSMITH",
        role: "HEAD OF DIGITAL",
        desc: "A British native with a BSc from UCL and an MSc from Imperial College Business School, Warren brings 8 years of hardcore digital performance expertise. He is the mastermind behind our precision media buying and AI-driven conversion funnels. Treating ad spend like a quantitative hedge fund, he leverages his rigorous financial background to ruthlessly optimize for maximum ROI."
      }
    },
    pricing: {
      title: "PRICING PROTOCOL",
      subtitle: "TRANSPARENT RETAINERS",
      note: "✳ Billed quarterly. 90-day minimum commitment for algorithm maturity.",
      btnExpand: "↓ VIEW FULL FEATURE COMPARISON",
      btnCollapse: "↑ HIDE FULL COMPARISON",
      includedText: "✓ INCLUDED",
      tiers: [
        {
          name: "GoRadar AI™ TIER",
          price: "$399", oldPrice: "$599", period: "/ MO",
          desc: "Data and direction. For teams needing precise targeting coordinates without full execution.",
          features: [
            "GoRadar AI™ Live Dashboard",
            "1v1 Monthly Strategy Diagnostic (60m)",
            "Ad Account Health Audit",
            "Untapped Keywords Report"
          ],
          addon: "",
          btn: "GET RADAR ACCESS ↗",
          highlight: false
        },
        {
          name: "CORE ENGINE TIER",
          price: "$999", oldPrice: "$1,499", period: "/ MO",
          desc: "Your lightweight global growth department. We steer the AI and execute the core campaigns.",
          features: [
            "Everything in GoRadar AI™ Tier",
            "1 Ads + 1 Content Platform Execution",
            "Up to $5,000 Ad Spend Management",
            "Bi-weekly War Room Sync"
          ],
          addon: "+$349/mo per extra platform",
          btn: "START CORE ENGINE ↗",
          highlight: true
        },
        {
          name: "FRACTIONAL CMO TIER",
          price: "$2,499+", oldPrice: "$3,999", period: "/ MO",
          desc: "Hand over your global growth lifeline. We handle the entire funnel from strategy to execution.",
          features: [
            "Everything in Core Engine Tier",
            "Unlimited Platforms (Meta/Google/TikTok)",
            "Up to $30,000 Ad Spend Management",
            "SEO & B2B Trust Infrastructure",
            "24/7 Async War Room Access"
          ],
          addon: "",
          btn: "HIRE YOUR CMO ↗",
          highlight: false
        }
      ],
      comparisonDetails: [
        {
          category: "GoRadar AI™ Strategy",
          items: [
            { name: "Competitor Blindspot Scanner", t1: "1 Report / Mo", t2: "2 Reports / Mo", t3: "Live Monitoring" },
            { name: "1v1 Strategy & Data Sync", t1: "1x (60 mins)", t2: "2x (Bi-weekly)", t3: "4x (Weekly Deep Dive)" },
            { name: "Ad Account & Site Health Audit", t1: "✔", t2: "✔", t3: "✔" },
            { name: "GTM Strategy Customization", t1: "✘", t2: "✔", t3: "✔" }
          ]
        },
        {
          category: "Infrastructure",
          items: [
            { name: "Social Matrix Setup & SEO", t1: "✘", t2: "1-2 Core Platforms", t3: "Omnichannel Setup" },
            { name: "Landing Page CRO Diagnostics", t1: "✘", t2: "✔", t3: "Extreme A/B Testing" }
          ]
        },
        {
          category: "Global Content Studio",
          items: [
            { name: "AI Visual Assets Production", t1: "✘", t2: "Core Campaign Sets", t3: "Saturated + Localized" },
            { name: "Social Distribution Scheduling", t1: "✘", t2: "Daily on Core Platforms", t3: "Omnichannel Saturated" },
            { name: "Engagement & Lead Routing", t1: "✘", t2: "✔", t3: "24/7 Deep Nurturing" },
            { name: "KOL/UGC Resource Mgmt", t1: "✘", t2: "✘", t3: "Monthly Quota Managed" }
          ]
        },
        {
          category: "Performance Ads",
          items: [
            { name: "Account Setup & Pixel Tracking", t1: "✘", t2: "✔", t3: "✔" },
            { name: "Ad Strategy & Audience", t1: "✘", t2: "1 Core Channel", t3: "All-Funnel (Google/Meta/LI)" },
            { name: "Quant A/B Testing & ROAS", t1: "✘", t2: "✔", t3: "High-Frequency Testing" },
            { name: "Zero-Fee Ad Spend Cap", t1: "✘", t2: "Up to $5,000", t3: "Up to $30,000" },
            { name: "Overage Management Fee", t1: "✘", t2: "10% Flat", t3: "8-10% Tiered" }
          ]
        },
        {
          category: "War Room Support",
          items: [
            { name: "Response & Troubleshooting", t1: "48h Email", t2: "24h Weekdays", t3: "24/7 Priority" }
          ]
        }
      ]
    },
    faq: {
      title: "FAQ",
      q1: { q: "HOW DOES GoRadar AI™ WORK?", a: "It scans global data to find high-margin keywords and competitor blindspots, allowing us to acquire clients efficiently." },
      q2: { q: "WHAT PLATFORMS DO YOU COVER?", a: "We execute full-funnel campaigns across Google, Meta (FB/IG), TikTok, LinkedIn, YouTube, and Xiaohongshu (RED)." },
      q3: { q: "WHY DO YOU REQUIRE QUARTERLY BILLING?", a: "AI algorithm maturity and cross-border marketing optimizations take time. The 90-day commitment ensures we build a robust, scalable conversion funnel rather than chasing short-term vanity clicks." }
    },
    contact: { 
      status: "● RADAR SYSTEM: READY",
      title: "CLAIM YOUR\nFREE AUDIT.", 
      subtitle: "Stop guessing.\nLet GoRadar AI™ scan your market blindspots.\nDrop your details below to initiate the diagnostic.",
      form: {
        name: "YOUR NAME",
        website: "BRAND URL / WEBSITE",
        email: "WORK EMAIL",
        social: "WHATSAPP / WECHAT",
        submit: "INITIATE RADAR SCAN ↘"
      }
    },
    footer: { left: "© 2026 BrandGo.Global STUDIO", right: "DISTRIBUTED GLOBALLY. EXECUTED PRECISELY." },
    mobile: { openMenu: "Open navigation menu", closeMenu: "Close navigation menu" }
  },
  zh: {
    nav: { goradar: "GoRadar AI", services: "服务", cases: "案例", pricing: "定价", faq: "常见问题", contact: "联系我们", signin: "登录", langSwitch: "EN" },
    hero: { 
      title: "雷达全开。\n告别盲猜。", 
      subtitle: "以自研 GoRadar\u00A0AI™ 为核心武器。\n我们为您挖掘隐秘市场机会、\n制定数据驱动战略，\n并在全球范围内高效收割高净值客户。" 
    },
    marquee: ["GoRadar AI™", "AI 数据战略", "全球内容工作室", "算力投流中心"],
    services: {
      title: "核心服务：\n三位一体增长引擎",
      desc: "将算力转化为全球市场份额，以下是我们的硬核交付清单。",
      s1: { 
        title: "GoRadar AI™ 战情系统", 
        desc: "我们全域营销策略的底层大脑。\n拒绝盲目试错，用算力锁定胜局。",
        btnOpen: "展开雷达系统 ↘",
        btnClose: "收起雷达面板 ✕",
        features: [
          { name: "竞品流量盲区扫描 (BLINDSPOT SCANNER)", detail: "全网抓取海外头部竞品数据，精准定位利润极高但被同行忽视的流量空隙与搜索词。" },
          { name: "跨境供应链需求矩阵 (DEMAND MATRIX)", detail: "将海外本土的真实搜索意图，与中国制造业/重履约产品的核心供应链优势进行算法匹配。" },
          { name: "AI 受众高频模拟器 (AUDIENCE SIMULATOR)", detail: "在花掉您第一分钱预算前，利用 AI 预演各圈层受众的转化概率，确保首战即爆单。" }
        ]
      },
      s2: { 
        title: "全球内容工作室", 
        desc: "打破文化壁垒的跨国视觉叙事。\n基于本土洞察，全面主导主流社媒心智。",
        bullets: [
          "爆款短视频策划与海外 UGC 摄制",
          "多语种跨文化深度本地化包装",
          "精准达人矩阵建联与带货管理",
          "社媒资产沉淀与私域活跃度运营"
        ],
        kpis: ["KPI: 账号互动率", "KPI: 品牌全域曝光量"]
      },
      s3: { 
        title: "算力投流中心", 
        desc: "如同管理量化基金般操盘全域广告。\n极速测品、放大预算，对转化漏斗进行极限优化。",
        bullets: [
          "精准收割高意向搜索与企业端线索",
          "社交媒体信息流爆单与询盘转化",
          "全漏斗再营销追单与高频创意测试",
          "着陆页转化率 (CRO) 极限优化"
        ],
        kpis: ["KPI: 获客成本 (CPA/CPL)", "KPI: 目标投资回报率 (ROAS)"]
      },
    },
    protocol: {
      title: "90 天增长路线图",
      intro: {
        title: "为什么我们需要 90 天？",
        reasons: [
          { title: "拒绝虚假承诺", desc: "海外 AI 广告模型的深度学习与跨文化信任建立，客观上需要 30-45 天的数据喂养。任何承诺'首周爆单'的机构都在透支您的品牌。" },
          { title: "告别黑盒操作", desc: "我们的路线图精确到周。从战略审计到素材上线，您能实时看到每一个进度节点的硬核交付物，钱花得明明白白。" },
          { title: "算力测品，利润放大", desc: "前 30 天花小钱进行高频 A/B 测试排除错误选项；后 60 天重仓砸向被验证的高 ROI 模型，将您的风险降到最低。" }
        ]
      },
      p1: { tag: "第一阶段: 第1周", title: "审计与战略蓝图", desc: "接入 GoRadar AI™ 战情大屏。排查历史浪费漏洞，反向扒取头部竞品流量盲区，输出《全域出海 GTM 战略坐标报告》。" },
      p2: { tag: "第二阶段: 第2-3周", title: "创意引擎与追踪基建", desc: "在花掉您第一分钱广告费之前，完成全域像素级精准埋点 (GA4/CAPI)。同步交付首批 30+ 组跨文化高转化视觉素材。" },
      p3: { tag: "第三阶段: 第1个月", title: "启动与极速测品", desc: "启动首轮实弹投放。高频测试受众标签与视觉素材，淘汰劣质模型，强制喂养 AI 算法，跑通首个高 ROI 获客模型。" },
      p4: { tag: "第四阶段: 第2-3个月+", title: "重仓放大与全局统治", desc: "关停无效消耗，将 80% 的预算重仓砸向被数据验证的'赢家模型'。在严控 CAC（获客成本）红线的前提下，指数级放大预算。" }
    },
    cases: {
      title: "硬核实战复盘",
      desc: "我们不卖理论。我们用算力直接收割市场份额。",
      list: [
        {
          tag: "B2B 重履约 / 欧洲市场",
          title: "打破欧洲本土信任壁垒",
          metric: "380% ROI",
          desc: "为重型压缩沙发搭建从 0 到 1 的高转化独立站基建。彻底扭转海外采购商对'廉价代工厂'的刻板印象，重塑高端供应链定位。",
          img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" 
        },
        {
          tag: "D2C 消费电子 / 北美市场",
          title: "AI 算力驱动的规模化爆单",
          metric: "$2.4M 年营收",
          desc: "在 Meta 和 TikTok 部署饱和式 A/B 测试。利用 GoRadar AI™ 锁定被忽视的科技发烧友细分受众，60 天内将获客成本 (CPA) 暴降 42%。",
          img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
        },
        {
          tag: "高客单价出海 / 东南亚大B",
          title: "精准猎杀企业级决策者",
          metric: "5倍 询盘增长",
          desc: "重构全站 SEO 矩阵并执行 LinkedIn 精准 ABM 投放，直接绕过基层采购，精准触达东南亚 C-Level 核心决策层。",
          img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    about: {
      title: "我们鄙视虚荣指标。",
      manifesto: "太多代运营躲在「曝光量」和「点赞数」背后。\n但您没法把「点击量」存进银行。\n\n我们是您增长团队的算力外脑。\n我们只谈核心商业指标：跨境供应链、净利润率、CAC 与 LTV。",
      stat: "10+ 年",
      statDesc: "跨境出海与供应链一线操盘经验",
      teamTitle: "幕后大脑",
      teamDesc: "全球分布式协作。我们常驻巴厘岛、新加坡、吉隆坡、阿姆斯特丹等核心商业枢纽，保持对跨境出海与全球供应链的绝对敏锐。",
      member1: {
        name: "YUSHENG YANG",
        role: "联合创始人",
        desc: "拥有兰卡斯特大学会计与金融学士及华威大学硕士学位，积累了十余年亚洲核心供应链与品牌出海操盘经验。作为资深 GTM 战略专家与 GoRadar AI™ 的底层架构师，他深谙中欧商业文化差异。业余时间，他是一名活跃于国际赛事的硬核超马越野跑者，将极限耐力的长期主义完美融入商业增长。"
      },
      member2: {
        name: "WARREN GOLDSMITH",
        role: "数字营销负责人",
        desc: "英国籍高管，拥有伦敦大学学院 (UCL) 学士与帝国理工商学院硕士学位。作为拥有 8 年硬核实战经验的数字营销操盘手，Warren 是统筹精准媒介购买与 AI 转化漏斗的幕后大脑。他将严谨的英式金融逻辑带入流量市场，如同管理量化对冲基金般，以极度冷酷的数据算力榨干每一分预算的 ROI。"
      }
    },
    pricing: {
      title: "订阅报价",
      subtitle: "按月透明计费，无隐形抽成",
      note: "✳ 按季度结算预付。最低签约 90 天，保障跑通高转化模型。",
      btnExpand: "↓ 展开完整服务细节对比",
      btnCollapse: "↑ 收起服务细节对比",
      includedText: "✓ 包含",
      tiers: [
        {
          name: "GoRadar AI™ 战术版",
          price: "$399", oldPrice: "$599", period: "/ 月",
          desc: "不提供代运营劳动力，只提供精准的炮火坐标。适合自带执行团队的企业。",
          features: [
            "提供实时 GoRadar AI™ 战情大屏",
            "每月 1 次主理人 1V1 战略诊断",
            "现有独立站/广告账户健康度体检",
            "竞品高转化词库全盘扫描"
          ],
          addon: "",
          btn: "获取雷达权限 ↗",
          highlight: false
        },
        {
          name: "核心引擎版",
          price: "$999", oldPrice: "$1,499", period: "/ 月",
          desc: "用算力驱动内容，用数据锁死 ROI。中小出海企业的主力增长引擎。",
          features: [
            "包含【战术版】所有核心权益",
            "接管 1个广告 + 1个内容平台",
            "最高免收 $5,000 消耗管理费",
            "每双周战情室战略同步对焦会议"
          ],
          addon: "每增加一个渠道模块 +$349/月",
          btn: "启动核心引擎 ↗",
          highlight: true
        },
        {
          name: "全球共享 CMO 版",
          price: "$2,499+", oldPrice: "$3,999", period: "/ 月",
          desc: "把海外增长命脉交给我们。您只管接单交付，我们负责全域市场火力攻坚。",
          features: [
            "包含【核心引擎版】所有权益",
            "全域火力覆盖 (Google/Meta/TikTok/LinkedIn)",
            "最高免收 $30,000 消耗管理费",
            "独立站 SEO 与海外信任基建重塑",
            "进入 24/7 专属战情室极速响应"
          ],
          addon: "",
          btn: "雇佣您的 CMO ↗",
          highlight: false
        }
      ],
      comparisonDetails: [
        {
          category: "GoRadar AI™ 算力与战略",
          items: [
            { name: "竞品盲区与搜索雷达报告", t1: "每月 1 份", t2: "每月 2 份", t3: "实时动态监测" },
            { name: "1V1 战略与数据复盘会", t1: "1 次 (60分钟)", t2: "2 次 (双周对焦)", t3: "4 次 (每周深度会)" },
            { name: "独立站/广告健康度审计", t1: "✔", t2: "✔", t3: "✔" },
            { name: "顶层 GTM 战略定制", t1: "✘", t2: "✔", t3: "✔" }
          ]
        },
        {
          category: "品牌信任基建",
          items: [
            { name: "账号矩阵搭建与 SEO 埋词", t1: "✘", t2: "1-2 个核心平台", t3: "全域平台统筹" },
            { name: "独立站 CRO 转化诊断", t1: "✘", t2: "✔", t3: "极限优化与 A/B 测试" }
          ]
        },
        {
          category: "全球内容工作室",
          items: [
            { name: "AI 跨文化高转化素材产出", t1: "✘", t2: "按战役定量交付", t3: "饱和式素材深度本地化" },
            { name: "社媒矩阵日程规划与分发", t1: "✘", t2: "重点平台日更分发", t3: "全网矩阵饱和式分发" },
            { name: "粉丝深度互动与私域引导", t1: "✘", t2: "✔", t3: "全天候线索清洗跟进" },
            { name: "本土 KOL/UGC 资源对接", t1: "✘", t2: "✘", t3: "每月定量达人管理" }
          ]
        },
        {
          category: "算力投流中心",
          items: [
            { name: "开户、像素/CAPI 数据追踪", t1: "✘", t2: "✔", t3: "✔" },
            { name: "广告投放策略与人群构建", t1: "✘", t2: "单一核心渠道", t3: "全域多渠道联投" },
            { name: "量化测品与 ROAS 优化", t1: "✘", t2: "✔", t3: "高频高维测试模型" },
            { name: "免收 15% 管理费广告额度", t1: "✘", t2: "最高涵盖 $5,000", t3: "最高涵盖 $30,000" },
            { name: "超额广告消耗绩效管理费", t1: "✘", t2: "超出部分收 10%", t3: "超出部分收 8%-10%" }
          ]
        },
        {
          category: "战情室支持",
          items: [
            { name: "专属战情室响应与答疑", t1: "48小时邮件支持", t2: "工作日 24小时响应", t3: "24/7 优先极速响应" }
          ]
        }
      ]
    },
    faq: {
      title: "常见问题",
      q1: { q: "GoRadar AI™ 如何运作？", a: "它通过扫描全球搜索与社媒数据，找出高利润关键词与竞品流量盲区，帮助我们以极低成本获客。" },
      q2: { q: "你们覆盖哪些营销平台？", a: "我们提供全漏斗营销执行，深度覆盖 Google, Meta (FB/IG), TikTok, LinkedIn, YouTube 以及小红书。" },
      q3: { q: "为什么要求按季度结算？", a: "跨国营销模型学习与高价值客户的转化需要客观的数据积累周期。90天的锁定期确保我们能为您跑通高 ROAS 转化闭环，而不是追求短期的虚假流量。" }
    },
    contact: { 
      status: "● 雷达系统：准备就绪",
      title: "申请免费\n品牌诊断。", 
      subtitle: "停止盲目试错。\n让 GoRadar\u00A0AI™ 深度扫描您的流量盲区。\n留下信息，我们的战略大脑将即刻为您启动诊断。",
      form: {
        name: "您的姓名",
        website: "独立站 / 品牌网址",
        email: "工作邮箱",
        social: "WhatsApp / 微信号码",
        submit: "启动雷达扫描 ↘"
      }
    },
    footer: { left: "© 2026 BrandGo.Global STUDIO", right: "全球分布式协作。极致精准执行。" },
    mobile: { openMenu: "打开导航菜单", closeMenu: "关闭导航菜单" }
  }
};

export default function Page() {
  const [lang, setLang] = useState<'en' | 'zh'>('zh');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [radarExpanded, setRadarExpanded] = useState(false); 
  const [showSla, setShowSla] = useState(false);

  const t = dict[lang];

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white font-sans selection:bg-[#E5FF00] selection:text-black">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
      `}} />

      <Header
        lang={lang}
        setLang={setLang}
        t={{
          brand: "BrandGo.Global",
          nav: t.nav,
          mobile: t.mobile,
        }}
      />

      {/* ==================== 1. HERO 实力宣言区 ==================== */}
      <section id="hero" data-section-theme="yellow" className="bg-[#E5FF00] text-black min-h-[90vh] px-6 md:px-8 py-8 flex flex-col justify-between">
        <nav className="flex items-start justify-between w-full">
          <Link href="/" className="flex items-center">
            <Image
              src="/LOGO-BLACK.png"
              alt="BrandGo.Global"
              width={160}
              height={160}
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
              priority
            />
          </Link>
        </nav>
        
        <div className="flex-1 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mt-24 md:mt-32 pt-10">
          <div className="md:w-[70%] pb-4 md:pb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] whitespace-pre-line">
              {t.hero.title}
            </h1>
          </div>
          <div className="md:w-[40%] md:pb-6">
            <p className="text-lg md:text-xl font-bold leading-tight text-black whitespace-pre-line">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
        
        <div className="flex justify-end mt-12">
          <button className="bg-black text-[#E5FF00] rounded-full size-20 md:size-24 flex items-center justify-center text-3xl md:text-4xl hover:bg-zinc-800 hover:scale-105 transition-all">
            ↘
          </button>
        </div>
      </section>

      {/* ==================== 2. MARQUEE 无限跑马灯 (GoRadar 锚点) ==================== */}
      {/* `<span id="radar">` 保留旧 #radar anchor 兼容，浏览器仍能滚动到同一 section 顶部。
          不影响布局（空 inline 元素，0 尺寸）。*/}
      <section id="goradar" data-section-theme="dark" className="bg-[#0A0A0A] text-[#E5FF00] py-6 border-y border-white/20 overflow-hidden">
        <span id="radar" aria-hidden="true" />
        <div className="flex overflow-hidden relative w-full">
          <div className="flex shrink-0 w-max items-center animate-[marquee_20s_linear_infinite] gap-16 px-8">
            {t.marquee.map((item, i) => (
              <React.Fragment key={i}>
                <span className="text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap">{item}</span>
                <span className="text-xl md:text-2xl font-bold">✳</span>
              </React.Fragment>
            ))}
          </div>
          <div className="flex shrink-0 w-max items-center animate-[marquee_20s_linear_infinite] gap-16 px-8">
            {t.marquee.map((item, i) => (
              <React.Fragment key={i}>
                <span className="text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap">{item}</span>
                <span className="text-xl md:text-2xl font-bold">✳</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 3. 核心三擎服务区 ==================== */}
      <section id="services" data-section-theme="dark" className="bg-[#0A0A0A] text-white px-6 md:px-8 py-32 flex flex-col lg:flex-row gap-16 lg:gap-12">
        <div className="lg:w-[35%]">
          <div className="sticky top-24 h-fit">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-6 whitespace-pre-line">
              {t.services.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-bold leading-relaxed max-w-sm">
              {t.services.desc}
            </p>
          </div>
        </div>
        
        <div className="lg:w-[65%] flex flex-col">
          
          <div className="border-b border-white/20 py-16 first:pt-0 flex flex-col gap-6">
            <div className="flex items-center gap-6 mb-2">
              <span className="text-2xl font-black text-[#E5FF00] tracking-tighter">[ 01 ]</span>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                {t.services.s1.title}
              </h3>
            </div>
            <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed max-w-2xl mb-2 whitespace-pre-line">
              {t.services.s1.desc}
            </p>
            
            <button 
              onClick={() => setRadarExpanded(!radarExpanded)}
              className="self-start text-[#E5FF00] border border-[#E5FF00] px-4 py-2 text-sm font-black tracking-tight hover:bg-[#E5FF00] hover:text-black transition-colors"
            >
              {radarExpanded ? t.services.s1.btnClose : t.services.s1.btnOpen}
            </button>

            {radarExpanded && (
              <div className="mt-6 bg-zinc-900 border-l-4 border-[#E5FF00] p-6 md:p-8 flex flex-col gap-6">
                {t.services.s1.features?.map((feat, i) => (
                  <div key={i}>
                    <h4 className="text-lg font-black tracking-tight text-white mb-2">
                      <span className="text-[#E5FF00] mr-2">_</span>{feat.name}
                    </h4>
                    <p className="text-sm md:text-base text-gray-400 font-medium leading-relaxed">
                      {feat.detail}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {[t.services.s2, t.services.s3].map((s, idx) => (
            <div key={idx} className="border-b border-white/20 py-16 flex flex-col gap-6">
              <div className="flex items-center gap-6 mb-2">
                <span className="text-2xl font-black text-[#E5FF00] tracking-tighter">[ 0{idx + 2} ]</span>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                  {s.title}
                </h3>
              </div>
              
              <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed max-w-2xl mb-2 whitespace-pre-line">
                {s.desc}
              </p>
              
              <ul className="flex flex-col gap-4 mb-4">
                {s.bullets?.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-[#E5FF00] font-black mt-0.5 leading-none text-xl">✳</span>
                    <span className="font-bold text-base md:text-lg leading-tight">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap items-center gap-3 mt-4 text-[#E5FF00] font-black text-sm md:text-base tracking-tight">
                {s.kpis?.map((kpi, i) => (
                  <React.Fragment key={i}>
                    <span>{kpi}</span>
                    {i < (s.kpis?.length ?? 0) - 1 && <span className="text-white/30">{"///"}</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ==================== 4. THE 90-DAY PROTOCOL (ROADMAP) ==================== */}
      <section id="protocol" data-section-theme="dark" className="bg-[#0A0A0A] text-white px-6 md:px-8 py-32 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16">
            {t.protocol.title}
          </h2>
          
          {/* Intro / Benefits Grid */}
          <div className="mb-24">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-8 text-[#E5FF00]">
              {t.protocol.intro.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.protocol.intro.reasons.map((reason, idx) => (
                <div key={idx} className="bg-[#111] border-t-4 border-[#E5FF00] p-8">
                  <h4 className="text-xl font-black mb-4">{reason.title}</h4>
                  <p className="text-gray-400 text-sm md:text-base font-bold leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl ml-2 md:ml-8 border-l-4 border-white/20">
            {[t.protocol.p1, t.protocol.p2, t.protocol.p3, t.protocol.p4].map((phase, idx) => (
              <div key={idx} className="relative pl-10 md:pl-16 pb-20 last:pb-0">
                <div className="absolute -left-[10px] top-0 size-4 bg-[#E5FF00]"></div>
                <div className="bg-[#E5FF00] text-black px-3 py-1 text-xs md:text-sm font-bold uppercase inline-block mb-4">
                  {phase.tag}
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white">
                  {phase.title}
                </h3>
                <p className="text-gray-400 text-base md:text-lg font-medium leading-relaxed max-w-2xl whitespace-pre-line">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 5. CASES 实战复盘区 ==================== */}
      <section id="cases" data-section-theme="yellow" className="bg-[#E5FF00] text-black px-6 md:px-8 py-32 border-t border-black/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95]">
            {t.cases.title}
          </h2>
          <p className="text-lg md:text-xl font-bold max-w-md">
            {t.cases.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.cases.list.map((c, idx) => (
            <div key={idx} className="border border-black p-6 hover:bg-black hover:text-[#E5FF00] transition-all duration-300 group flex flex-col cursor-pointer">
              <div className="relative w-full aspect-video mb-6 overflow-hidden bg-black">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="text-xs font-black uppercase border border-current px-2 py-1 self-start mb-6">
                {c.tag}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
                {c.title}
              </h3>
              <div className="text-4xl font-black tracking-tighter mb-4">
                {c.metric}
              </div>
              <p className="font-medium text-sm md:text-base opacity-80 mt-auto">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 6. ABOUT 宣言与团队区 ==================== */}
      <section id="about" data-section-theme="dark" className="bg-[#0A0A0A] text-white px-6 md:px-8 py-32 border-t border-white/20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 mb-32 max-w-7xl mx-auto">
          <div className="lg:w-[60%]">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">{t.about.title}</h2>
            <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed whitespace-pre-line max-w-3xl">
              {t.about.manifesto}
            </p>
          </div>
          <div className="lg:w-[40%] flex items-center justify-center lg:justify-end">
            <div className="w-full md:w-auto bg-[#1A1A1A] border border-white/10 p-12 flex flex-col items-center justify-center text-center">
              <span className="text-6xl md:text-7xl lg:text-8xl font-black text-[#E5FF00] tracking-tighter mb-4">{t.about.stat}</span>
              <span className="text-sm md:text-base font-bold text-white tracking-widest max-w-[200px]">{t.about.statDesc}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">{t.about.teamTitle}</h3>
            <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed max-w-2xl">
              {t.about.teamDesc}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[t.about.member1, t.about.member2].map((member, idx) => (
              <div key={idx} className="border border-white/20 p-8 md:p-10 hover:bg-[#1A1A1A] transition-colors flex flex-col">
                <div className="text-[#E5FF00] font-black tracking-tighter text-3xl md:text-4xl mb-2">{member.name}</div>
                <div className="text-sm font-bold tracking-widest text-white/50 mb-6 uppercase">{member.role}</div>
                <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed mt-auto">
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 7. PRICING 订阅价格区 (带卡片内无限拉长对比) ==================== */}
      <section id="pricing" data-section-theme="dark" className="bg-[#0A0A0A] px-6 md:px-8 py-32 border-t border-white/20">
        
        {/* 标题与季付提示 */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#E5FF00] mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-xl md:text-2xl font-black text-gray-400 tracking-tight mb-4">
            {t.pricing.subtitle}
          </p>
          <div className="inline-block bg-[#1A1A1A] text-gray-300 font-bold px-6 py-2 rounded-full text-sm md:text-base border border-white/10">
            {t.pricing.note}
          </div>
        </div>

        {/* 价格卡片网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch mb-12">
          {t.pricing.tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`p-8 md:p-10 flex flex-col border-2 transition-colors duration-300 ${
                tier.highlight 
                  ? 'bg-[#E5FF00] border-[#E5FF00] text-black shadow-2xl' 
                  : 'bg-[#0A0A0A] border-white/20 text-white hover:border-white/50'
              }`}
            >
              <div className="mb-6">
                <h3 className="text-3xl font-black tracking-tight">
                  {tier.name}
                </h3>
              </div>
              
              {/* 划线价在上，当前价在下，完美对齐 */}
              <div className="mb-6 border-b-2 border-current pb-6 flex flex-col items-start">
                <span className={`text-xl font-black line-through mb-1 ${tier.highlight ? 'text-black/50' : 'text-gray-600'}`}>
                  {tier.oldPrice}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl lg:text-[4rem] font-black tracking-tighter leading-none">{tier.price}</span>
                  <span className={`text-xl font-bold ${tier.highlight ? 'text-black/70' : 'text-gray-500'}`}>{tier.period}</span>
                </div>
              </div>

              <div className="mb-8">
                <p className={`text-sm font-bold leading-relaxed ${tier.highlight ? 'text-black/80' : 'text-gray-300'}`}>
                  {tier.desc}
                </p>
              </div>

              {/* 默认的简要特征列表 */}
              <ul className="mb-8 flex-1 space-y-5">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 font-black text-lg leading-none">✳</span>
                    <p className={`text-sm font-bold ${tier.highlight ? 'text-black/90' : 'text-white'}`}>
                      {feat}
                    </p>
                  </li>
                ))}
              </ul>
              
              <div className="h-6 mb-6 flex items-center justify-center">
                {tier.addon && (
                  <span className={`text-xs font-black tracking-wider uppercase px-3 py-1 rounded border ${tier.highlight ? 'border-black/30 text-black/70' : 'border-white/20 text-gray-400'}`}>
                    {tier.addon}
                  </span>
                )}
              </div>

              <button 
                className={`w-full py-5 text-lg font-black tracking-tight rounded-full transition-colors ${
                  tier.highlight 
                    ? 'bg-black text-[#E5FF00] hover:bg-zinc-800' 
                    : 'bg-white text-black hover:bg-[#E5FF00]'
                }`}
              >
                {tier.btn}
              </button>

              {/* ================= 卡片内无限拉长对比区 (In-Card Accordion) ================= */}
              <div className={`transition-all duration-700 ease-in-out overflow-hidden ${showSla ? 'max-h-[3000px] opacity-100 mt-12' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className={`border-t-2 ${tier.highlight ? 'border-black/20' : 'border-white/20'} pt-8 flex flex-col gap-8`}>
                  {t.pricing.comparisonDetails.map((cat, catIdx) => (
                    <div key={catIdx}>
                      <div className={`text-xs font-black uppercase tracking-widest mb-5 px-3 py-1.5 inline-block ${tier.highlight ? 'bg-black text-[#E5FF00]' : 'bg-[#1A1A1A] text-[#E5FF00]'}`}>
                        {cat.category}
                      </div>
                      <ul className="space-y-0">
                        {cat.items.map((item, itemIdx) => {
                          const val = idx === 0 ? item.t1 : idx === 1 ? item.t2 : item.t3;
                          const hasFeature = val !== '✘';
                          
                          return (
                            <li key={itemIdx} className={`flex flex-col gap-1.5 py-4 border-b ${tier.highlight ? 'border-black/10' : 'border-white/10'} last:border-0 last:pb-0`}>
                              <span className={`text-xs font-bold ${tier.highlight ? 'text-black/60' : 'text-gray-400'}`}>
                                {item.name}
                              </span>
                              <span className={`text-sm md:text-base font-black ${hasFeature ? (tier.highlight ? 'text-black' : 'text-white') : (tier.highlight ? 'text-black/30' : 'text-gray-600')}`}>
                                {val === '✔' ? t.pricing.includedText : val === '✘' ? '—' : val}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              {/* ================= 结束 ================= */}
              
            </div>
          ))}
        </div>

        {/* 统一控制三个卡片同步拉长的全局按钮 */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => setShowSla(!showSla)}
            className="border-2 border-[#E5FF00] text-[#E5FF00] px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-[#E5FF00] hover:text-black transition-colors duration-300"
          >
            {showSla ? t.pricing.btnCollapse : t.pricing.btnExpand}
          </button>
        </div>

      </section>

      {/* ==================== 8. FAQ 区 ==================== */}
      <section id="faq" data-section-theme="dark" className="bg-[#0A0A0A] text-white px-6 md:px-8 py-24 md:py-32 border-t border-white/20">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-16">{t.faq.title}</h2>
        <div className="flex flex-col border-t border-white/20">
          {[t.faq.q1, t.faq.q2, t.faq.q3].map((item, idx) => (
            <div key={idx} className="border-b border-white/20">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-8 flex items-start justify-between text-left gap-4 hover:text-[#E5FF00] transition-colors"
              >
                <span className="text-xl md:text-2xl font-bold tracking-tight flex-1">{item.q}</span>
                <span className={`text-2xl font-bold shrink-0 mt-1 transition-transform ${openFaq === idx ? 'rotate-90' : ''}`}>▶</span>
              </button>
              {openFaq === idx && (
                <div className="pb-8 text-gray-400 text-lg pr-12">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 9. CONTACT / 免费诊断表单 ==================== */}
      <section id="contact" data-section-theme="yellow" className="bg-[#E5FF00] text-black px-6 md:px-8 py-24 md:py-32 border-t-4 border-black">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* 左侧：诱饵文案 */}
          <div className="lg:w-[45%] sticky top-32">
            <div className="inline-block border-2 border-black px-4 py-2 font-black uppercase tracking-widest text-xs md:text-sm mb-12 animate-pulse">
              {t.contact.status}
            </div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 whitespace-pre-line">
              {t.contact.title}
            </h2>
            <p className="text-xl md:text-2xl font-bold leading-relaxed max-w-lg whitespace-pre-line">
              {t.contact.subtitle}
            </p>
          </div>

          {/* 右侧：粗野主义硬核表单 */}
          <div className="lg:w-[55%] w-full">
            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              
              {/* 姓名 */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-black uppercase tracking-widest text-black/70">
                  {t.contact.form.name}
                </label>
                <input 
                  type="text" 
                  required
                  className="w-full border-4 border-black bg-transparent px-6 py-5 text-2xl font-black focus:outline-none focus:bg-white transition-colors duration-300 placeholder-black/20" 
                  placeholder="John Doe" 
                />
              </div>

              {/* 网址 */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-black uppercase tracking-widest text-black/70">
                  {t.contact.form.website}
                </label>
                <input 
                  type="url" 
                  required
                  className="w-full border-4 border-black bg-transparent px-6 py-5 text-2xl font-black focus:outline-none focus:bg-white transition-colors duration-300 placeholder-black/20" 
                  placeholder="www.yourbrand.com" 
                />
              </div>

              {/* 邮箱与社交软件 (并排) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="flex flex-col gap-3">
                   <label className="text-sm font-black uppercase tracking-widest text-black/70">
                     {t.contact.form.email}
                   </label>
                   <input 
                     type="email" 
                     required
                     className="w-full border-4 border-black bg-transparent px-6 py-5 text-xl font-black focus:outline-none focus:bg-white transition-colors duration-300 placeholder-black/20" 
                     placeholder="hello@brand.com" 
                   />
                 </div>
                 
                 <div className="flex flex-col gap-3">
                   <label className="text-sm font-black uppercase tracking-widest text-black/70">
                     {t.contact.form.social}
                   </label>
                   <input 
                     type="text" 
                     required
                     className="w-full border-4 border-black bg-transparent px-6 py-5 text-xl font-black focus:outline-none focus:bg-white transition-colors duration-300 placeholder-black/20" 
                     placeholder="+1 234 567 8900" 
                   />
                 </div>
              </div>

              {/* 提交按钮 */}
              <button 
                type="submit" 
                className="mt-6 w-full bg-black text-[#E5FF00] border-4 border-black py-6 md:py-8 text-3xl md:text-4xl font-black uppercase tracking-tighter hover:bg-transparent hover:text-black transition-all duration-300 flex items-center justify-center gap-4 group"
              >
                {t.contact.form.submit}
              </button>

            </form>
          </div>
          
        </div>
      </section>

      <footer data-section-theme="dark" className="bg-[#0A0A0A] text-white px-6 md:px-8 py-8 w-full border-t border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-tight text-gray-500">
          <span>{t.footer.left}</span>
          <span>{t.footer.right}</span>
        </div>
      </footer>
      
    </main>
  );
}
