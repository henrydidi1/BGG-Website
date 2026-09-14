"use client";
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';

// ==========================================
// 1. 中英双语内容字典 (卡片内拉长对比版)
// ==========================================
const dict = {
  en: {
    nav: { goradar: "GoRadar AI™", services: "Services", cases: "Use Cases", pricing: "Pricing", faq: "FAQ", contact: "Contact", signin: "Sign In", langSwitch: "中" },
    hero: {
      eyebrow: "GLOBAL MARKET ENTRY & GROWTH PARTNER",
      title: "MARKET RADAR: ON.\nGUESSWORK: OFF.",
      who: "For Chinese businesses with established products, supply chains or export foundations.",
      value: "Use GoRadar AI™ to see overseas markets more clearly, identify buyers, customers and channel opportunities,\nand turn market intelligence into action.",
      how: "GoRadar AI™ continuously monitors markets, competitors, lead signals and industry changes\nto support market entry and ongoing growth decisions."
    },
    marquee: ["GoRadar AI™ Intelligence", "MARKET ENTRY", "MARKET GROWTH", "BUYER & CHANNEL DEVELOPMENT", "CONTENT & LOCALIZATION", "PAID MEDIA"],
    problems: {
      kicker: "THE CHALLENGE",
      title: "YOU MAY HAVE THE PRODUCT\nAND THE FOUNDATION.\nWHAT YOU NEED IS A CLEARER PATH TO GLOBAL GROWTH.",
      items: [
        "Established products, but uncertainty about which overseas market to prioritize.",
        "Trade shows, platforms, and outreach are active, but new customers remain inconsistent.",
        "Overseas buyers compare on price, making lasting relationships and brand recognition harder to build.",
        "The ambition to expand is clear, but the path from market insight to customer development is not."
      ]
    },
    services: {
      kicker: "HOW WE WORK",
      title: "From\nSeeing the Opportunity\nto\nMarket Entry & Growth",
      desc: "GoRadar AI™ informs both entry into new markets and growth in markets you already serve. We select execution capabilities around the business goal.",
      s1: {
        title: "GoRadar AI™ Intelligence Radar",
        label: "See overseas markets clearly with GoRadar AI™",
        desc: "Continuous intelligence for markets, buyers and growth opportunities. GoRadar AI™ brings together updated signals on demand, competitors, potential buyers, channels, and industry shifts to support decisions for both Market Entry and Market Growth.",
        btnOpen: "EXPLORE GoRadar AI™",
        btnClose: "CLOSE GoRadar AI™ DETAILS",
        features: [
          {
            name: "MARKET INTELLIGENCE",
            detail: "Review demand, trends, countries, categories, and market opportunities."
          },
          {
            name: "COMPETITIVE INTELLIGENCE",
            detail: "Monitor competitors and track changes in their positioning and activity."
          },
          {
            name: "BUYER & LEAD DISCOVERY",
            detail: "Research potential buyers, distributors, target accounts, and lead opportunities."
          },
          {
            name: "INDUSTRY WATCH",
            detail: "Follow industry shifts, market developments, and risk signals."
          },
          {
            name: "OPPORTUNITY RADAR",
            detail: "Spot new markets, channels, customer needs, and potential partnerships to validate next."
          }
        ]
      },
      s2: {
        title: "MARKET ENTRY",
        label: "Enter a New Overseas Market",
        desc: "We help you prioritize where to enter, who to sell to, and how to reach them, then complete an initial round of market validation.",
        bullets: [
          "Market and country prioritization",
          "Buyer, distributor & channel research",
          "Positioning, offer & route-to-market",
          "Website and landing-page audit & recommendations",
          "Search, content & channel-entry strategy",
          "Initial market and customer-acquisition validation"
        ],
        kpis: [
          "GOAL: A CLEAR ENTRY PATH",
          "METHOD: TEST BEFORE SCALING"
        ]
      },
      s3: {
        title: "MARKET GROWTH",
        label: "Grow an Existing Overseas Business",
        desc: "For businesses already active overseas, we keep improving customer development, channels and acquisition paths to find the next growth opportunities.",
        bullets: [
          "Buyer & customer development",
          "Website optimization & SEO",
          "Content localization & social distribution",
          "Paid media audit, testing & optimization",
          "Channel & partner development",
          "Ongoing optimization based on market feedback"
        ],
        kpis: [
          "GOAL: MORE RELEVANT OPPORTUNITIES",
          "METHOD: LEARN AND REFINE"
        ]
      }
    },
    capabilities: {
      kicker: "EXECUTION CAPABILITIES",
      title: "THE RIGHT WORK\nFOR THE GOAL",
      desc: "These are ways to execute Market Entry or Market Growth, chosen by need and agreed scope—not a fixed bundle for every client.",
      items: [
        { title: "BUYER, CHANNEL & LEAD DEVELOPMENT", desc: "Buyer and account research, distributor discovery, outreach, and lead-generation support." },
        { title: "WEBSITE & SEO", desc: "Website positioning, landing pages, search visibility, and conversion improvements where needed." },
        { title: "CONTENT & LOCALIZATION", desc: "Content strategy, AI-assisted research, social content, localization, and product or brand messaging." },
        { title: "PAID MEDIA", desc: "Search and social ads, audience and creative tests, landing-page tests, and optimization." },
        { title: "CHANNEL & PARTNER DEVELOPMENT", desc: "Research and develop opportunities with distributors, resellers, importers, and local partners." },
        { title: "SPONSORSHIPS & CREATOR MARKETING", desc: "Assess sponsorship and creator partnerships when they fit the audience, market, and project scope." }
      ]
    },
    audiences: {
      kicker: "WHO WE HELP",
      title: "BUILT FOR DIFFERENT\nROUTES OVERSEAS",
      desc: "We work with Chinese businesses with established products, supply-chain strengths, or export experience, including:",
      items: [
        { title: "Manufacturers & Supply-Chain Businesses", desc: "Explore new markets, find buyers and distributors, strengthen export growth, and build a brand beyond the product." },
        { title: "Exporters & Trading Companies", desc: "Find new markets and buyers, reduce reliance on a few accounts, and build more direct, stable customer relationships." },
        { title: "DTC & Consumer Brands", desc: "Enter or grow overseas markets through the right mix of search, content, website optimization, paid media, and relevant partnerships." }
      ]
    },
    protocol: {
      kicker: "THE FIRST 90 DAYS",
      title: "FROM OPPORTUNITY\nTO MARKET VALIDATION",
      desc: "The first 90 days establish and test an initial market path. The work and pace depend on your starting point, business model, and agreed scope—not a promise of orders within 90 days.",
      p1: {
        tag: "01 / UNDERSTAND",
        title: "READ THE MARKET",
        desc: "Review demand, competition, potential buyers, and channels with GoRadar AI™ to identify where an opportunity may exist."
      },
      p2: {
        tag: "02 / DEFINE",
        title: "DEFINE HOW TO SELL",
        desc: "Clarify the ideal buyer, positioning, offer, and route to market before committing to execution."
      },
      p3: {
        tag: "03 / VALIDATE",
        title: "START VALIDATING",
        desc: "Choose a route suited to the business: buyer or distributor outreach, search, and content for B2B and export teams; search, paid media, content, or creators for DTC brands. We test selected channels rather than all of them at once."
      },
      p4: {
        tag: "04 / DECIDE",
        title: "SET THE NEXT DIRECTION",
        desc: "Use market feedback to see which buyers respond, which messages work, and which markets or channels merit more investment. Continue, adjust, or scale based on evidence."
      }
    },
    cases: {
      title: "TYPICAL\nUSE CASES",
      desc: "Eight common challenges across manufacturing, export, trading, B2B, and DTC businesses.",
      list: [
        {
          tag: "MARKET ENTRY",
          title: "Not sure which overseas market to enter first",
          desc: "A new market looks promising, but the first investment is unclear. BrandGo.Global uses GoRadar AI™ to compare demand, competition, buyers, and channels so you can choose what to validate."
        },
        {
          tag: "EXPORT GROWTH",
          title: "Established products or supply chain, but limited overseas customer growth",
          desc: "Your products and delivery are established, yet overseas customer growth is limited. BrandGo.Global reviews market fit, buyer groups, and routes to market to identify practical tests."
        },
        {
          tag: "CUSTOMER PIPELINE",
          title: "Trade shows, platforms, and outreach are active, but customers remain inconsistent",
          desc: "You keep prospecting, but new customer flow is uneven. BrandGo.Global combines buyer research, channel tests, and follow-up paths to build a clearer acquisition process."
        },
        {
          tag: "BUYER DISCOVERY",
          title: "Want to reach real overseas buyers, distributors, or decision-makers",
          desc: "The right accounts and contacts are difficult to identify. BrandGo.Global researches buyer, distributor, and decision-maker opportunities and helps prioritize outreach."
        },
        {
          tag: "MARKET DIVERSIFICATION",
          title: "Already exporting, but too dependent on a few markets or old customers",
          desc: "Existing export revenue relies on a narrow set of markets or accounts. BrandGo.Global compares adjacent markets, buyer segments, and channel opportunities for measured expansion."
        },
        {
          tag: "WEBSITE & TRUST",
          title: "Website and brand messaging do not yet build overseas customer trust",
          desc: "Potential customers see the offer but lack a clear reason to choose you beyond price. BrandGo.Global reviews positioning, website content, and local messaging to support credibility."
        },
        {
          tag: "DIRECT RELATIONSHIPS",
          title: "Want more direct customer relationships beyond trading, agents, or platforms",
          desc: "Intermediaries generate sales, but you have limited direct access to end customers. BrandGo.Global helps develop positioning, owned channels, and buyer outreach suited to your model."
        },
        {
          tag: "DTC ACQUISITION",
          title: "Overseas customer acquisition costs keep rising for a DTC or consumer brand",
          desc: "Paid acquisition is getting more expensive and the next improvement is unclear. BrandGo.Global tests audiences, creatives, landing pages, search, and content to find a stronger path."
        }
      ]
    },
    about: {
      title: "BUSINESS RESULTS\nCOME FIRST.",
      manifesto: "Impressions and likes are useful signals. Our focus is leads, acquisition costs, conversion rates, and meaningful growth.\n\nAs your overseas growth team, we connect market insight with content and advertising execution, using actual performance to guide the next investment.",
      stat: "10+ YEARS",
      statDesc: "IN CROSS-BORDER BUSINESS & SUPPLY CHAINS",
      teamTitle: "Founder",
      member1: {
        name: "Yusheng Yang",
        role: "Founder",
        bio: [
          "Yusheng studied Finance at Lancaster University and earned a master's in Project Management at the University of Warwick. His career across China and Asia connects brand development, commercial strategy, and cross-border business.",
          "He brings more than a decade of experience in branding, marketing, go-to-market strategy, and global supply chains, including building consumer brands and managing cross-border supply-chain projects. His focus is practical: who to sell to, how to position the offer, and where to invest first.",
          "At BrandGo.Global, he leads market entry strategy and GoRadar AI™ product architecture, connecting market intelligence with content, advertising, and localization to help Chinese businesses turn opportunities into action. He focuses on how companies with product, supply-chain, or export strengths can reach broader overseas markets, customers, and brand growth."
        ]
      }
    },
    pricing: {
      kicker: "GROWTH JOURNEY",
      title: "From Opportunity\nto Market Entry & Growth",
      subtitle: "Start with the stage your business needs now.",
      journeyNote: "Explore and Monitor can inform the next move. Enter or Grow based on where your business stands; these are not required steps.",
      or: "OR",
      motionLabel: "CORE GROWTH MOTIONS",
      fees: "Media spend, professional production, creator fees, sponsorship rights, travel and other third-party costs are billed separately.",
      offers: [
        {
          stage: "EXPLORE",
          name: "Hidden Market Opportunity Scan",
          price: "US$29",
          period: "one-time",
          mode: "ONE-TIME INTELLIGENCE SNAPSHOT",
          desc: "Identify overlooked overseas opportunities through demand shifts, competitor moves, buyer signals and market gaps.",
          features: [
            "Hidden opportunity signals",
            "Important competitor moves",
            "Sample buyer / channel opportunities",
            "Market gaps & key risks",
            "Evidence-backed findings",
            "Prioritized next move"
          ],
          terms: "One Opportunity Scan per business.",
          detail: "Submit your company and product information first. We’ll confirm fit before sending the US$29 payment instructions.",
          scope: "",
          credit: "Upgrade within 30 days of completing your Scan to GoRadar AI™, Market Entry or Market Growth Partner and your $29 Scan fee will be credited in full.",
          motions: [],
          btn: "Request My Opportunity Scan",
          source: "scan" as const
        },
        {
          stage: "MONITOR",
          name: "GoRadar AI™",
          price: "US$399",
          period: "/ month",
          mode: "CONTINUOUS INTELLIGENCE PRODUCT",
          desc: "Keep track of market shifts, competitor moves, buyer opportunities and what to prioritize next.",
          features: [
            "Full GoRadar AI™ workspace and product access",
            "Continuous market and industry monitoring",
            "Competitor, buyer & account intelligence",
            "Opportunity discovery and evidence-backed recommendations",
            "Alerts, watchlists, onboarding & product support"
          ],
          terms: "Monthly subscription.",
          detail: "60 minutes of Founder Strategy Review each month — book as one 60-minute session or two 30-minute sessions to interpret market intelligence, discuss priorities and decide next actions.",
          scope: "Product support and intelligence interpretation are included; ongoing execution and new consulting deliverables are separate engagements.",
          credit: "",
          motions: [],
          btn: "Start with GoRadar AI™",
          source: "goradar" as const
        },
        {
          stage: "ENTER",
          name: "Market Entry",
          price: "From US$3,500",
          period: "/ project",
          mode: "SCOPED MARKET-ENTRY ENGAGEMENT",
          desc: "A scoped engagement that takes one priority market from intelligence to first real-world validation.",
          features: [
            "One priority market and one core product line",
            "One or two primary buyer profiles / ICPs",
            "Positioning, offer & route-to-market",
            "Buyer and channel mapping",
            "One primary validation path and First Validation Cycle",
            "Initial market feedback and Continue / Adjust / Stop / Scale recommendation"
          ],
          terms: "Typical engagement: 4–8 weeks. Final scope is confirmed before the project starts.",
          detail: "Ongoing strategic access with unlimited scheduled strategy discussions during the engagement.",
          scope: "Completion means the agreed First Validation Cycle and initial market feedback, not guaranteed sales. Additional markets, product lines and out-of-scope work are quoted separately.",
          credit: "",
          motions: [],
          btn: "Discuss Market Entry",
          source: "market-entry" as const
        },
        {
          stage: "GROW",
          name: "Market Growth Partner",
          price: "From US$2,499",
          period: "/ month",
          mode: "ONGOING INTELLIGENCE + FOCUSED EXECUTION",
          desc: "Ongoing intelligence, strategy and focused execution for businesses already active in overseas markets.",
          features: [
            "Full GoRadar AI™ access and ongoing Growth Plan",
            "One agreed Core Growth Motion",
            "Supporting work within the agreed scope",
            "Reporting and ongoing optimization"
          ],
          terms: "Minimum 3 months; then month-to-month.",
          detail: "Ongoing strategic access with unlimited scheduled strategy discussions and growth reviews.",
          scope: "Execution scope is built around the highest-priority commercial motion in your Growth Plan. Supporting work required to make it effective is included within the agreed scope. Additional growth motions can be scoped separately.",
          credit: "",
          motions: ["Buyer & Channel Development", "Website & Search Growth", "Paid Acquisition", "Content & Social Growth", "Partnerships & Influence"],
          btn: "Discuss Market Growth",
          source: "market-growth" as const
        }
      ],
      lead: {
        stage: "LEAD",
        eyebrow: "NEED BROADER MARKET LEADERSHIP?",
        name: "Fractional CMO / Multi-Market Growth",
        price: "Custom",
        desc: "Senior-level strategy, multi-market coordination, growth planning and ongoing commercial leadership for more complex international expansion.",
        btn: "Talk to Us"
      }
    },
    faq: {
      title: "BEFORE\nWE START",
      items: [
        {
          q: "How do I purchase an Opportunity Scan?",
          a: "Submit your company and product information first. Once we confirm the Scan is a fit, we’ll send the US$29 payment instructions privately. We start the Scan after receiving payment. One Opportunity Scan per business."
        },
        {
          q: "Does GoRadar AI™ include human strategy support?",
          a: "US$399 per month includes full GoRadar AI™ product access, onboarding, product support and intelligence interpretation, plus 60 minutes of scheduled Founder Strategy Review each month. Book one 60-minute session or two 30-minute sessions to discuss priorities and next decisions. Ongoing execution, campaign management, website work, outbound work and new consulting deliverables are not included."
        },
        {
          q: "What services do you provide?",
          a: "GoRadar AI™ supports market, competitor, buyer, and opportunity decisions. Market Entry helps define and validate a route into a new market; Market Growth improves an existing overseas business. Buyer and channel development, website and SEO, content, paid media, and partnerships are execution capabilities chosen by goal and agreed scope."
        },
        {
          q: "Who is this for? Can we work together before launching overseas?",
          a: "We work with Chinese businesses with established products, supply-chain strengths, or export experience entering or expanding overseas. That includes manufacturers, exporters, trading companies, B2B businesses, and DTC or consumer brands. If you have not launched yet, we can start with market assessment and priorities."
        },
        {
          q: "How can you work with our existing team or agency?",
          a: "We can work around the gaps in your current setup. Choose GoRadar AI™ for intelligence and guidance, Market Entry for a scoped validation project, Market Growth Partner for focused ongoing execution, or Fractional CMO for broader leadership. We agree on responsibilities, account access and communication before starting."
        },
        {
          q: "Which platforms and channels do you cover?",
          a: "Content and advertising support covers Google, Meta (Facebook / Instagram), TikTok, LinkedIn, YouTube, and Xiaohongshu (RED). The actual channels depend on where your customers are, your goals, and your plan. We start with priority channels and validate them before expanding."
        },
        {
          q: "How do we start, and what should we prepare?",
          a: "We first align on products, target markets, goals, and your current setup, then agree on responsibilities and the first step. Prepare a product or service overview, website and account links, existing content, and any available ad, sales, or inquiry data. Incomplete data is fine: we identify gaps and prepare content, tracking, and tests as needed."
        },
        {
          q: "How soon will we see a direction or early results?",
          a: "Market direction usually comes before acquisition results; timing depends on your starting point, budget, and customer buying cycle. We begin with market and problem assessment, then use small tests to look for inquiry and conversion signals. The first 90 days provide a continuous cycle of analysis, testing, and optimization, with no sales or return guarantee."
        },
        {
          q: "When does a Market Entry project finish?",
          a: "Market Entry is a scoped project, typically 4–8 weeks, completed when the agreed First Validation Cycle and initial real-world market feedback are delivered with a Continue, Adjust, Stop or Scale recommendation—not when sales are guaranteed. Strategy discussions can be scheduled throughout the engagement, but execution deliverables follow the agreed scope. A full website build, long-term ad management or outreach, unlimited content, and additional markets or product lines are quoted separately if needed."
        },
        {
          q: "Does Market Growth Partner include every growth service?",
          a: "No. From US$2,499 per month, the Growth Plan selects one core commercial motion and the supporting work needed within the agreed scope. It does not include all five growth motions or unlimited deliverables. Additional motions can be scoped separately. Strategy discussions are unlimited when scheduled during the engagement."
        },
        {
          q: "Are media spend and other third-party costs included?",
          a: "No. Media spend, professional production, creator fees, sponsorship rights, travel, external tools and databases are separate. We confirm scope and any third-party costs before work starts."
        },
        {
          q: "How does pricing and the initial term work?",
          a: "The Scan is US$29 once per business; GoRadar AI™ is US$399 per month. Market Entry starts from US$3,500 per scoped project. Market Growth Partner starts from US$2,499 per month with a 3-month initial term, then continues month to month. Fractional CMO / Multi-Market Growth is custom scoped. These are starting points, not a required purchase sequence."
        },
        {
          q: "How do we start with Sponsorships & Creator Marketing?",
          a: "Start with who you want to reach and how you want those audiences to understand your brand. We can help assess sponsorship directions, influencer or creator fit, and partnership content for local audiences. Partners, delivery scope, and budget are agreed per project; a full sponsorship or creator campaign is not automatically included in every plan."
        }
      ]
    },
    contact: {
      status: "● RADAR SYSTEM: READY",
      title: "Let's talk about your growth.",
      subtitle: "Leave your email and we'll get in touch.\nIf you'd like, you can tell us a little more.",
      form: {
        name: "NAME",
        namePh: "John Doe",
        company: "COMPANY / BRAND",
        companyPh: "Your brand or company",
        website: "BRAND WEBSITE",
        websitePh: "brand.com",
        email: "WORK EMAIL",
        emailPh: "hello@brand.com",
        moreInfoLabel: "Tell us more (optional)",
        wechat: "WECHAT ID",
        wechatPh: "wechat_handle",
        whatsapp: "WHATSAPP",
        whatsappPh: "+86 136 0000 0000",
        message: "WHAT WOULD YOU LIKE TO TALK ABOUT?",
        messagePh: "For example: We sell home products, currently export mainly to Southeast Asia, and want to develop distributors and new customers in Europe.",
        submit: "START THE CONVERSATION",
        submitting: "SUBMITTING…",
        success: "Submission received.",
        error: "Submission failed. Please try again.",
        errorEmail: "Please enter a valid work email.",
      }
    },
    footer: { left: "© 2026 BrandGo.Global", right: "GLOBAL TEAM. STRATEGY PUT INTO ACTION.", clientLogin: "Client Login" },
    mobile: { openMenu: "Open navigation menu", closeMenu: "Close navigation menu" }
  },
  zh: {
    nav: { goradar: "GoRadar AI™", services: "服务", cases: "应用场景", pricing: "定价", faq: "常见问题", contact: "联系我们", signin: "登录", langSwitch: "EN" },
    hero: {
      eyebrow: "全球市场进入与增长伙伴",
      title: "雷达全开。\n告别盲猜。",
      who: "帮助有成熟产品、供应链或出口基础的中国企业",
      value: "通过 GoRadar AI™\n看清海外市场，\n找到买家、客户与渠道机会，\n并把市场判断转化为实际行动。",
      how: "GoRadar AI™ 持续监测市场、\n竞争对手、客户线索和行业变化，\n为市场进入与持续增长提供判断依据。"
    },
    marquee: ["GoRadar AI™ Intelligence", "MARKET ENTRY", "MARKET GROWTH", "BUYER & CHANNEL DEVELOPMENT", "CONTENT & LOCALIZATION", "PAID MEDIA"],
    problems: {
      kicker: "THE CHALLENGE",
      title: "你可能已经有产品和市场基础。\n缺的是更清晰的海外增长路径。",
      items: [
        "有成熟产品，却不知道哪个海外市场值得先投入。",
        "展会、平台和业务开发一直在做，但新客户仍然不稳定。",
        "海外客户很多时候只比较价格，很难形成稳定的客户关系与品牌认知。",
        "知道要拓展海外，却缺少从市场判断到客户开发的完整方法。"
      ]
    },
    services: {
      kicker: "HOW WE WORK",
      title: "从\n看清机会\n到\n市场进入与增长",
      desc: "GoRadar AI™ 同时支持新市场进入与已有市场增长。围绕具体业务目标，选择合适的增长执行能力。",
      s1: {
        title: "GoRadar AI™ 情报雷达",
        label: "通过 GoRadar AI™ 看清海外市场",
        desc: "持续发现市场、客户与增长机会。GoRadar AI™ 汇集持续更新的需求、竞争对手、潜在买家、渠道与行业变化信号，为全球市场进入和海外市场增长提供情报与决策支持。",
        btnOpen: "了解 GoRadar AI™ 的机会发现方式",
        btnClose: "收起 GoRadar AI™ 详情",
        features: [
          {
            name: "市场情报",
            detail: "分析市场需求、趋势、国家、品类与潜在机会。"
          },
          {
            name: "竞争情报",
            detail: "监听竞争对手，跟踪其定位与市场动作的变化。"
          },
          {
            name: "买家与线索发现",
            detail: "研究潜在买家、经销商、目标账户和线索机会。"
          },
          {
            name: "行业动态",
            detail: "关注行业变化、市场动态与风险信号。"
          },
          {
            name: "机会雷达",
            detail: "发现值得下一步验证的新市场、新渠道、新需求与合作机会。"
          }
        ]
      },
      s2: {
        title: "全球市场进入",
        label: "Market Entry",
        desc: "帮助你判断先做哪里、卖给谁、怎么进入，并完成第一轮市场验证。",
        bullets: [
          "市场与国家优先级判断",
          "买家、经销商与渠道研究",
          "定位、产品主张与进入路径梳理",
          "官网审计、落地页与建站建议",
          "搜索、内容与渠道进入策略",
          "第一轮市场与获客验证"
        ],
        kpis: [
          "目标：清晰的进入路径",
          "方法：先验证再放大"
        ]
      },
      s3: {
        title: "海外市场增长",
        label: "Market Growth",
        desc: "针对已经有海外业务的企业，持续优化客户、渠道与获客路径，找到下一步增长机会。",
        bullets: [
          "买家与客户开发",
          "官网优化与 SEO 增长",
          "内容本地化与社媒传播",
          "广告投放审计、测试与优化",
          "渠道与合作伙伴拓展",
          "基于市场反馈持续优化"
        ],
        kpis: [
          "目标：更多相关机会",
          "方法：边验证边优化"
        ]
      }
    },
    capabilities: {
      kicker: "EXECUTION CAPABILITIES",
      title: "按目标选择\n增长执行能力",
      desc: "这些是支持市场进入和市场增长的执行手段，按业务需要与确认的合作范围组合，不是每家企业都必须购买的固定清单。",
      items: [
        { title: "买家、渠道与线索开发", desc: "买家与目标账户研究、经销商发现、主动开发和线索获取支持。" },
        { title: "官网与搜索增长", desc: "根据需要优化官网定位、落地页、SEO 与转化路径；不默认重做网站。" },
        { title: "海外内容与本地化", desc: "内容策略、AI 辅助研究、社媒内容、本地化与产品及品牌表达。" },
        { title: "海外广告与获客", desc: "搜索与社交广告、受众和素材测试、落地页测试与优化。" },
        { title: "渠道与合作伙伴拓展", desc: "研究并开发经销商、转售商、进口商和本地合作伙伴机会。" },
        { title: "品牌赞助与达人营销", desc: "在符合市场、受众和项目范围时，评估赞助与创作者合作机会。" }
      ]
    },
    audiences: {
      kicker: "WHO WE HELP",
      title: "服务不同起点的\n中国出海企业",
      desc: "我们服务有成熟产品、供应链或出口基础的中国企业，包括：",
      items: [
        { title: "制造商与供应链企业", desc: "寻找新市场、买家和经销商，拓展出口业务，并建立产品之外的品牌认知。" },
        { title: "出口商与贸易企业", desc: "开发新市场和买家，减少对少数客户的依赖，建立更直接、稳定的客户关系。" },
        { title: "DTC 与消费品牌", desc: "按实际需要组合搜索、内容、网站优化、广告与相关合作，进入或扩大海外市场。" }
      ]
    },
    protocol: {
      kicker: "THE FIRST 90 DAYS",
      title: "前 90 天，\n从判断机会到验证市场",
      desc: "前 90 天的目标是建立并验证第一条市场路径。具体工作与节奏按企业起点、业务模式和合作范围确认，不承诺 90 天获得订单。",
      p1: {
        tag: "01 / 看清机会",
        title: "看清市场",
        desc: "结合 GoRadar AI™ 分析需求、竞争、潜在买家与渠道，判断哪些机会值得优先关注。"
      },
      p2: {
        tag: "02 / 定义路径",
        title: "定义怎么卖",
        desc: "明确目标买家、竞争定位、产品主张与进入路径，再决定需要哪些执行工作。"
      },
      p3: {
        tag: "03 / 开始测试",
        title: "开始验证",
        desc: "根据企业类型选择路径：B2B、出口和贸易企业可测试买家或经销商开发、搜索与内容；DTC 品牌可测试搜索、广告、内容或创作者合作。不要求同时执行所有渠道。"
      },
      p4: {
        tag: "04 / 决定下一步",
        title: "找到下一步方向",
        desc: "根据市场反馈看哪类客户有反应、哪些信息有效，以及哪些市场和渠道值得继续投入。决定继续、调整或逐步放大。"
      }
    },
    cases: {
      title: "典型应用场景",
      desc: "从制造、出口、贸易、B2B 到 DTC，看看哪一种海外增长难题与你有关。",
      list: [
        {
          tag: "MARKET ENTRY",
          title: "不知道先做哪个海外市场",
          desc: "新市场看起来有机会，却不知道先把资源投向哪里。BrandGo.Global 用 GoRadar AI™ 对比需求、竞争、买家与渠道，帮助确定优先验证的方向。"
        },
        {
          tag: "EXPORT GROWTH",
          title: "有成熟产品或供应链，但海外客户增长有限",
          desc: "产品和交付已较成熟，海外客户增长却有限。BrandGo.Global 梳理市场匹配、买家类型与进入路径，找出值得测试的机会。"
        },
        {
          tag: "CUSTOMER PIPELINE",
          title: "展会、平台和业务开发都在做，但客户仍不稳定",
          desc: "业务开发没有停，新客户却时多时少。BrandGo.Global 结合买家研究、渠道测试与跟进路径，帮助建立更清晰的客户开发流程。"
        },
        {
          tag: "BUYER DISCOVERY",
          title: "想找到真正的海外买家、经销商或决策者",
          desc: "目标客户存在，却难以识别合适的企业和联系人。BrandGo.Global 研究买家、经销商与决策者机会，帮助确定开发优先级。"
        },
        {
          tag: "MARKET DIVERSIFICATION",
          title: "已经出口，但太依赖少数市场或老客户",
          desc: "现有订单过于依赖少数市场或客户。BrandGo.Global 对比相邻市场、买家群体与渠道机会，支持有节奏地拓展。"
        },
        {
          tag: "WEBSITE & TRUST",
          title: "网站和品牌表达还无法建立海外客户信任",
          desc: "潜在客户看到了产品，却缺少价格之外的选择理由。BrandGo.Global 检查定位、网站内容和本地化表达，支持建立更清晰的可信度。"
        },
        {
          tag: "DIRECT RELATIONSHIPS",
          title: "想从贸易、代理或平台模式建立更直接的客户关系",
          desc: "现有渠道能带来销售，却难以直接了解最终客户。BrandGo.Global 按业务模式梳理定位、自有渠道和买家开发路径。"
        },
        {
          tag: "DTC ACQUISITION",
          title: "DTC 或消费品牌的海外获客成本持续上升",
          desc: "广告越来越贵，下一步该改哪里却不清楚。BrandGo.Global 测试受众、素材、落地页、搜索与内容，寻找更合适的获客路径。"
        }
      ]
    },
    about: {
      title: "我们更关心\n生意结果。",
      manifesto: "曝光和点赞可以看，但它们不是最终目标。我们更关心线索、获客成本、转化率和真实增长。\n\n我们作为你的海外增长团队，把市场判断、内容和广告执行连接起来，用实际表现决定下一步投入。",
      stat: "10+ 年",
      statDesc: "跨境业务与供应链经验",
      teamTitle: "创始人",
      member1: {
        name: "Yusheng Yang",
        role: "创始人",
        bio: [
          "Yusheng Yang（杨雨昇）在 Lancaster University 学习金融，并在 University of Warwick 获得项目管理硕士学位。他的职业经历横跨中国与亚洲市场，连接品牌、商业策略与跨境业务。",
          "拥有十余年品牌、营销、市场进入（GTM）和全球供应链相关经验，参与过消费品牌的建立与发展，以及跨境供应链项目。他关注企业进入海外市场时最实际的问题：卖给谁、如何表达、先把资源投入哪里。",
          "在 BrandGo.Global，他负责市场进入策略与 GoRadar AI™ 产品架构，把市场情报与内容、广告和本地化执行连接起来，帮助中国企业从判断机会走向实际行动。他长期关注有产品、供应链或出口基础的中国企业，如何走向更广的海外市场、客户与品牌增长。"
        ]
      }
    },
    pricing: {
      kicker: "GROWTH JOURNEY",
      title: "从发现机会，\n到进入市场与持续增长",
      subtitle: "你现在在哪一步，就从哪一步开始。",
      journeyNote: "先发现或持续监测机会，再根据企业所处阶段选择进入新市场或增长已有业务；无需依次购买所有方案。",
      or: "或",
      motionLabel: "可选择的核心增长方向",
      fees: "广告媒体预算、专业制作、达人费用、赞助权益、差旅及其他第三方成本另计。",
      offers: [
        {
          stage: "EXPLORE",
          name: "海外市场隐藏机会诊断",
          price: "US$29",
          period: "单次诊断",
          mode: "一次性市场情报快照",
          desc: "从需求变化、竞争动作、买家线索和市场空白中，找出几条最值得进一步验证的海外机会。",
          features: [
            "隐藏机会信号",
            "重要竞争动作",
            "买家 / 渠道机会样本",
            "市场空白与关键风险",
            "有证据支持的判断",
            "下一步优先动作"
          ],
          terms: "每个企业仅提供一次 Opportunity Scan。",
          detail: "提交企业与产品信息后，我们会先确认是否适合进行 Scan。审核通过后，再发送 US$29 付款方式。",
          scope: "",
          credit: "Scan 完成后 30 天内升级 GoRadar AI™、Market Entry 或 Market Growth Partner，$29 诊断费用可全额抵扣。",
          motions: [],
          btn: "申请我的 Opportunity Scan",
          source: "scan" as const
        },
        {
          stage: "MONITOR",
          name: "GoRadar AI™",
          price: "US$399",
          period: "/ 月",
          mode: "持续市场情报产品",
          desc: "持续掌握市场变化、竞争动作、买家机会和下一步优先事项。",
          features: [
            "完整 GoRadar AI™ workspace 与产品权限",
            "市场与行业持续监测",
            "竞争对手、买家与目标账户情报",
            "机会发现与有证据支持的建议",
            "提醒、关注列表、产品导入与支持"
          ],
          terms: "按月订阅。",
          detail: "每月包含 60 分钟 Founder Strategy Review。可预约 1 × 60 分钟或 2 × 30 分钟，用于解读市场情报、讨论业务优先级和下一步行动。",
          scope: "包含产品支持与情报解读；持续执行和新的咨询交付需另行约定。",
          credit: "",
          motions: [],
          btn: "开启我的 GoRadar AI™",
          source: "goradar" as const
        },
        {
          stage: "ENTER",
          name: "全球市场进入",
          price: "From US$3,500",
          period: "/ 项目",
          mode: "按范围确认的市场进入项目",
          desc: "围绕一个优先市场、一条核心产品线和一个明确进入目标，从市场判断推进到第一轮真实市场验证。",
          features: [
            "1 个优先市场与 1 条核心产品线",
            "1–2 个主要买家画像 / ICP",
            "定位、产品主张与进入路径",
            "买家与渠道地图",
            "1 条主要验证路径与 First Validation Cycle",
            "第一轮真实市场反馈及继续 / 调整 / 停止 / 放大建议"
          ],
          terms: "通常合作 4–8 周；最终范围在项目开始前确认。",
          detail: "合作期间可随时预约策略讨论与项目复盘；策略会议不限次数（需预约）。",
          scope: "完成双方约定的第一轮验证并获得真实市场反馈，不保证订单。额外市场、产品线及范围外工作另行报价。",
          credit: "",
          motions: [],
          btn: "聊聊市场进入",
          source: "market-entry" as const
        },
        {
          stage: "GROW",
          name: "海外市场增长伙伴",
          price: "From US$2,499",
          period: "/ 月",
          mode: "持续情报 + 聚焦执行",
          desc: "针对已经开始海外业务的企业，持续找到并执行最值得投入的增长机会。",
          features: [
            "完整 GoRadar AI™ 权限与持续 Growth Plan",
            "一项约定的核心增长方向",
            "约定范围内必需的配套工作",
            "效果汇报与持续优化"
          ],
          terms: "最低合作 3 个月，之后按月续约。",
          detail: "合作期间可随时预约策略讨论与增长复盘；策略会议不限次数（需预约）。",
          scope: "具体执行范围围绕 Growth Plan 中最高优先级增长目标确定。为推进核心方向所必需的配套工作，在约定范围内包含；额外增长方向可另行确认范围与报价。",
          credit: "",
          motions: ["买家、经销商与渠道开发", "官网与搜索增长", "广告与付费获客", "内容与社媒增长", "渠道合作、品牌赞助与达人增长"],
          btn: "聊聊市场增长",
          source: "market-growth" as const
        }
      ],
      lead: {
        stage: "LEAD",
        eyebrow: "NEED BROADER MARKET LEADERSHIP?",
        name: "Fractional CMO / Multi-Market Growth",
        price: "Custom",
        desc: "适合需要高层市场战略、多市场统筹、增长规划与持续商业决策支持的复杂海外业务。",
        btn: "聊聊更复杂的海外增长"
      }
    },
    faq: {
      title: "合作前，\n你可能想问",
      items: [
        {
          q: "Opportunity Scan 怎么购买？",
          a: "先提交企业与产品信息。我们确认适合进行 Scan 后，会私下发送 US$29 付款方式；收到付款后启动诊断。每个企业仅提供一次 Scan。"
        },
        {
          q: "GoRadar AI™ 包含人工策略支持吗？",
          a: "每月 US$399 包含完整 GoRadar AI™ 产品权限、产品导入、产品支持与情报解读，以及每月 60 分钟需预约的 Founder Strategy Review。可选 1 × 60 分钟或 2 × 30 分钟，用于讨论优先级和下一步判断；不包含持续执行、广告管理、网站工作、主动客户开发或新的咨询交付。"
        },
        {
          q: "你们具体能帮我做哪些事？",
          a: "GoRadar AI™ 帮助判断市场、竞争、买家与机会；全球市场进入帮助建立并验证新市场路径；海外市场增长帮助优化已有海外业务。买家和渠道开发、官网与搜索、内容、广告及相关合作是按目标与确认范围选择的执行能力。"
        },
        {
          q: "什么样的企业适合？还没开始出海也可以吗？",
          a: "适合有成熟产品、供应链或出口基础，希望进入或扩大海外市场的中国企业，包括制造商、出口商、贸易企业、B2B 企业及 DTC 与消费品牌。尚未开始出海，也可以先从市场判断与优先级梳理入手。"
        },
        {
          q: "已经有自己的团队或代理，你们怎么配合？",
          a: "可以围绕现有团队的缺口配合。需要情报与判断依据可选 GoRadar AI™；新市场验证可选全球市场进入；聚焦持续执行可选海外市场增长伙伴；更复杂的统筹可讨论 Fractional CMO。合作前先对齐分工、账号权限与沟通方式。"
        },
        {
          q: "覆盖哪些海外平台和渠道？",
          a: "内容与广告支持覆盖 Google、Meta（Facebook / Instagram）、TikTok、LinkedIn、YouTube 和小红书等渠道。实际选择取决于客户在哪里、你的业务目标和套餐范围。先集中验证重点渠道，再决定是否扩展。"
        },
        {
          q: "合作怎么开始？我们需要准备什么？",
          a: "先对齐产品、目标市场、业务目标与现有基础，再确定分工和第一步。请准备产品或服务介绍、网站与账号链接、已有内容，以及可提供的广告、销售或询盘数据。没有完整数据也可以开始，我们会先梳理缺口，再按需要安排内容、追踪和测试。"
        },
        {
          q: "多久能看清方向，或看到初步结果？",
          a: "市场判断通常先于获客结果，具体速度取决于现有基础、预算和客户决策周期。前期先完成市场与问题梳理，随后通过小范围测试观察询盘和转化信号。前 90 天用于形成分析、测试与优化的连续过程，不能视为销售额或回报保证。"
        },
        {
          q: "全球市场进入项目做到什么程度结束？",
          a: "这是按范围确认的项目，通常为 4–8 周。完成双方约定的 First Validation Cycle、取得第一轮真实市场反馈，并给出继续、调整、停止或放大的建议，即为本轮项目成果；不保证获得订单。合作期间可预约策略讨论，但交付仍以确认的范围为准。完整建站、长期投放或买家开发、无限内容、额外市场与产品线等如需开展，另行报价。"
        },
        {
          q: "海外市场增长伙伴包含所有增长服务吗？",
          a: "不包含。起价每月 US$2,499，Growth Plan 会确定一项核心增长方向及约定范围内必需的配套工作，并非五类增长手段全部包含，也不代表交付数量不限。额外增长方向可单独确认范围与报价；合作期间策略讨论不限次数，但需预约。"
        },
        {
          q: "广告预算和第三方费用包含吗？",
          a: "不包含。广告媒体预算、专业制作、达人费用、赞助权益、差旅、外部工具和数据库等费用另计。具体范围及第三方成本会在开始前确认。"
        },
        {
          q: "如何收费？合作期限是多久？",
          a: "机会诊断每家企业一次，US$29；GoRadar AI™ 每月 US$399。全球市场进入按项目报价，US$3,500 起；海外市场增长伙伴每月 US$2,499 起，初期至少合作 3 个月，之后按月续约。Fractional CMO / Multi-Market Growth 根据范围定制报价。各方案是不同起点，不需要依次购买。"
        },
        {
          q: "想做品牌赞助与达人营销，应该怎么开始？",
          a: "先明确你想触达谁，以及希望通过合作建立怎样的品牌认知。我们可以协助评估赞助方向、达人或创作者匹配，以及合作内容和本地表达。合作对象、执行范围与预算按项目确认，不代表每个套餐都包含完整的赞助或达人项目。"
        }
      ]
    },
    contact: {
      status: "● 雷达系统：准备就绪",
      title: "聊聊您的增长目标。",
      subtitle: "留下邮箱，我们会联系您。\n如果愿意，也可以告诉我们更多。",
      form: {
        name: "姓名",
        namePh: "请输入您的姓名",
        company: "公司 / 品牌",
        companyPh: "请输入您的公司或品牌名",
        website: "品牌网址",
        websitePh: "brand.com",
        email: "工作邮箱",
        emailPh: "hello@brand.com",
        moreInfoLabel: "告诉我们更多（可选）",
        wechat: "微信号",
        wechatPh: "请填写您的微信号",
        whatsapp: "WhatsApp",
        whatsappPh: "+86 136 0000 0000",
        message: "想和我们聊什么？",
        messagePh: "例如：我们主营家居产品，目前主要出口东南亚，希望开发欧洲经销商和新客户。",
        submit: "开启对话",
        submitting: "提交中…",
        success: "提交成功，我们已收到您的信息。",
        error: "提交失败，请稍后重试。",
        errorEmail: "请填写有效的工作邮箱。",
      }
    },
    footer: { left: "© 2026 BrandGo.Global", right: "全球协作。策略与执行落地。", clientLogin: "客户登录" },
    mobile: { openMenu: "打开导航菜单", closeMenu: "关闭导航菜单" }
  }
};

// ==========================================
// 2. 类型 & 常量
// ==========================================

type SourcePlan = "scan" | "goradar" | "market-entry" | "market-growth" | "fractional-cmo" | "direct";

interface FormValues {
  name: string;
  company: string;
  website: string;
  email: string;
  wechat: string;
  whatsapp: string;
  message: string;
}

const EMPTY_FORM: FormValues = {
  name: "",
  company: "",
  website: "",
  email: "",
  wechat: "",
  whatsapp: "",
  message: ""
};

function normalizeWebsiteUrl(value: string): string {
  const trimmed = value.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

// ==========================================
// 3. Page Component
// ==========================================

export default function Page() {
  const [lang, setLang] = useState<'en' | 'zh'>('zh');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [radarExpanded, setRadarExpanded] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const t = dict[lang];

  // ─── Contact form state ─────────────────────────────────────
  // Plain React state — this is a low-pressure consultation form.
  // No external form library or router state required.
  type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
  const [formValues, setFormValues] = useState<FormValues>(EMPTY_FORM);
  const [honeypot, setHoneypot] = useState('');
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
  }>({});

  // Hidden sourcePlan — never displayed in the UI, never inferred
  // back to a "selected package". Pricing CTAs set this, success
  // resets it to "direct" so the next Direct submission does not
  // inherit a previous Pricing attribution.
  const [sourcePlan, setSourcePlan] = useState<SourcePlan>('direct');

  // ─── Direct attribution reset ─────────────────────────────────────
  // Header Contact (`<a href="#contact">`) changes the URL hash;
  // Pricing CTAs scroll via JS without touching the hash. So:
  //   - initial hash === "#contact"  →  sourcePlan = direct
  //   - hashchange to "#contact"     →  sourcePlan = direct
  // We deliberately do NOT touch `formValues` here — any interest
  // chips the user already toggled should stay selected.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isContactHash = () => window.location.hash === '#contact';

    const resetIfContact = () => {
      if (isContactHash()) {
        setSourcePlan((prev) => (prev === 'direct' ? prev : 'direct'));
      }
    };

    // Initial load: if the user lands on /#contact directly,
    // make sure sourcePlan starts as "direct".
    resetIfContact();

    window.addEventListener('hashchange', resetIfContact);
    return () => window.removeEventListener('hashchange', resetIfContact);
  }, []);

  const submitting = formStatus === 'submitting';

  const handleFieldChange =
    (key: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((prev) => ({ ...prev, [key]: e.target.value }));
      // Clear the email error as the user edits it.
      if (key === 'email') {
        setValidationErrors((prev) => {
          if (!prev[key]) return prev;
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    };

  const validateBeforeSubmit = (): boolean => {
    const next: typeof validationErrors = {};
    const emailTrim = formValues.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrim || !emailRegex.test(emailTrim)) {
      next.email = t.contact.form.errorEmail;
    }
    setValidationErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return; // hard double-submit guard

    if (!validateBeforeSubmit()) {
      setFormStatus('error');
      setErrorMessage(t.contact.form.error);
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');

    const normalizedWebsite = formValues.website.trim()
      ? normalizeWebsiteUrl(formValues.website)
      : '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formValues,
          website: normalizedWebsite,
          sourcePlan,
          companyWebsite2: honeypot,
        }),
      });
      if (!res.ok) {
        setFormStatus('error');
        setErrorMessage(t.contact.form.error);
        return;
      }
      // Success: clear fields and reset sourcePlan to 'direct'
      // so the next direct submission does not inherit a
      // previous Pricing attribution.
      setFormStatus('success');
      setFormValues(EMPTY_FORM);
      setHoneypot('');
      setValidationErrors({});
      setSourcePlan('direct');
      setShowMoreInfo(false);
    } catch {
      setFormStatus('error');
      setErrorMessage(t.contact.form.error);
    }
  };

  const resetForm = () => {
    setFormStatus('idle');
    setErrorMessage('');
  };

  // ─── Pricing CTA handler ─────────────────────────────────────
  // 1. update sourcePlan
  // 2. smooth scroll to #contact.
  //
  // We do NOT show plan name, price, or any "selected" confirmation —
  // this is a low-pressure consultation form, not a checkout.
  const handlePricingClick = useCallback(
    (plan: SourcePlan) => {
      setSourcePlan(plan);
      // Defer scroll to next frame so React can flush state.
      if (typeof window !== 'undefined') {
        window.requestAnimationFrame(() => {
          const el = document.getElementById('contact');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    },
    [],
  );

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

        <div className="flex-1 flex flex-col xl:flex-row items-start xl:items-end justify-between gap-8 mt-24 md:mt-32 pt-10">
          <div className="min-w-0 w-full xl:w-[70%] pb-4 md:pb-8">
            <p className="text-xs md:text-sm font-bold tracking-widest mb-6">{t.hero.eyebrow}</p>
            <h1 className={`text-[clamp(2.75rem,13vw,3.75rem)] ${lang === "en" ? "md:text-[clamp(4rem,9.4vw,6rem)] xl:text-[clamp(5rem,6vw,7rem)]" : "md:text-8xl lg:text-9xl"} font-black uppercase tracking-tighter leading-[0.95] whitespace-pre-line`}>
              {t.hero.title}
            </h1>
          </div>
          <div className="min-w-0 w-full xl:w-[40%] md:pb-6 flex flex-col gap-4 md:gap-5 text-black">
            <p className="text-base md:text-lg font-semibold leading-snug text-balance">{t.hero.who}</p>
            <p className="text-lg md:text-xl font-bold leading-snug whitespace-pre-line md:whitespace-normal text-balance">{t.hero.value}</p>
            <p className="text-sm md:text-base font-medium leading-relaxed whitespace-pre-line md:whitespace-normal text-black/75 text-balance">{t.hero.how}</p>
          </div>
        </div>

        <div className="flex justify-end mt-12">
          <a href="#goradar" className="bg-black text-[#E5FF00] rounded-full size-20 md:size-24 flex items-center justify-center hover:bg-zinc-800 hover:scale-105 transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-12 md:h-12">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </section>

      {/* ==================== 2. MARQUEE 无限跑马灯 (GoRadar 锚点) ==================== */}
      {/* `<span id="radar">` 保留旧 #radar anchor 兼容，浏览器仍能滚动到同一 section 顶部。
          不影响布局（空 inline 元素，0 尺寸）。*/}
      <section id="goradar" data-section-theme="dark" className="bg-[#0A0A0A] text-[#E5FF00] py-6 border-y border-white/20 overflow-hidden">
        <span id="radar" aria-hidden="true" />
        <div className="flex overflow-hidden relative w-full">
          {[0, 1].map((repeat) => (
            <div key={repeat} aria-hidden={repeat === 1 ? true : undefined} className="flex shrink-0 w-max items-center animate-[marquee_28s_linear_infinite] motion-reduce:animate-none gap-10 px-5">
              {t.marquee.map((item) => (
                <React.Fragment key={item}>
                  <span lang="en" className="text-sm md:text-lg font-bold tracking-widest whitespace-nowrap">{item}</span>
                  <span className="w-px h-5 bg-current -skew-x-12 opacity-60" aria-hidden="true" />
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 3. 客户问题 ==================== */}
      <section data-section-theme="dark" className="bg-[#0A0A0A] text-white px-6 md:px-8 py-24 border-b border-white/20">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-[#E5FF00] mb-6" lang="en">{t.problems.kicker}</p>
          <h2 className="max-w-5xl text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] whitespace-pre-line text-balance mb-14">
            {t.problems.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {t.problems.items.map((problem, idx) => (
              <div key={problem} className="flex gap-5 py-6 border-t border-white/20">
                <span className="shrink-0 text-[#E5FF00] font-black">0{idx + 1}</span>
                <p className="text-lg md:text-xl font-bold leading-snug text-gray-300">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 4. GoRadar、市场进入与市场增长 ==================== */}
      <section id="services" data-section-theme="dark" className="bg-[#0A0A0A] text-white px-6 md:px-8 py-32 flex flex-col lg:flex-row gap-16 lg:gap-12">
        <div className="lg:w-[35%]">
          <div className="sticky top-24 h-fit">
            <p className="text-xs font-bold tracking-widest text-[#E5FF00] mb-6" lang="en">{t.services.kicker}</p>
            <h2 className="font-black tracking-tighter leading-[1.08] mb-6 text-balance">
              {t.services.title.split("\n").map((line, index) => (
                <span key={`${line}-${index}`} className={`block ${index % 2 === 0 ? "text-2xl md:text-3xl lg:text-3xl text-gray-400" : "text-4xl md:text-6xl lg:text-[clamp(2.4rem,3.5vw,3.5rem)]"}`}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-bold leading-relaxed max-w-sm">
              {t.services.desc}
            </p>
          </div>
        </div>

        <div className="lg:w-[65%] flex flex-col">

          <div className="border-b border-white/20 py-16 first:pt-0 flex flex-col gap-6">
            <div className="flex items-start gap-4 md:gap-6 mb-2">
              <span className="shrink-0 text-xl font-black text-[#E5FF00] tracking-tighter">[ 01 ]</span>
              <div className="min-w-0">
                <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white text-balance">
                  <span className="whitespace-nowrap">GoRadar AI™</span>{" "}<span className="whitespace-nowrap">{t.services.s1.title.slice("GoRadar AI™".length).trim()}</span>
                </h3>
                <p className="mt-3 text-base md:text-lg font-bold text-[#E5FF00]">{t.services.s1.label}</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed max-w-2xl mb-2 whitespace-pre-line">
              {t.services.s1.desc}
            </p>

            <button
              onClick={() => setRadarExpanded(!radarExpanded)}
              aria-expanded={radarExpanded}
              className="self-start text-[#E5FF00] border border-[#E5FF00] px-4 py-2 text-sm font-black tracking-tight hover:bg-[#E5FF00] hover:text-black transition-colors inline-flex items-center gap-2"
            >
              <span>{radarExpanded ? t.services.s1.btnClose : t.services.s1.btnOpen}</span>
              {!radarExpanded && (
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M3 3l10 10M6 13h7V6" />
                </svg>
              )}
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
              <div className="flex items-start gap-4 md:gap-6 mb-2">
                <span className="shrink-0 text-xl font-black text-[#E5FF00] tracking-tighter">[ 0{idx + 2} ]</span>
                <div className="min-w-0">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white text-balance">{s.title}</h3>
                  <p className="mt-3 text-base md:text-lg font-bold text-[#E5FF00]">{s.label}</p>
                </div>
              </div>

              <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed max-w-2xl mb-2 whitespace-pre-line">
                {s.desc}
              </p>

              <ul className="flex flex-col gap-4 mb-4">
                {s.bullets?.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1 w-3 h-3 shrink-0 bg-[#E5FF00]" aria-hidden="true" />
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

      {/* ==================== 5. 增长执行能力 ==================== */}
      <section data-section-theme="dark" className="bg-[#111111] text-white px-6 md:px-8 py-24 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-[#E5FF00] mb-6" lang="en">{t.capabilities.kicker}</p>
          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-14">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] whitespace-pre-line text-balance">{t.capabilities.title}</h2>
            <p className="max-w-md text-lg md:text-xl text-gray-400 font-medium leading-relaxed">{t.capabilities.desc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.capabilities.items.map((item, idx) => (
              <article key={item.title} className="min-w-0 border border-white/20 p-6 md:p-8">
                <span className="text-sm font-black text-[#E5FF00]">0{idx + 1}</span>
                <h3 className="text-xl md:text-2xl font-black tracking-tight mt-8 mb-4 text-balance">{item.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 6. 服务对象 ==================== */}
      <section data-section-theme="dark" className="bg-[#0A0A0A] text-white px-6 md:px-8 py-24 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-[#E5FF00] mb-6" lang="en">{t.audiences.kicker}</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] whitespace-pre-line text-balance mb-6">{t.audiences.title}</h2>
          <p className="text-lg md:text-xl text-gray-400 font-medium max-w-3xl mb-14">{t.audiences.desc}</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {t.audiences.items.map((item, idx) => (
              <article key={item.title} className="min-w-0 border-t-2 border-[#E5FF00] bg-[#1A1A1A] p-6 md:p-8">
                <span className="text-sm font-black text-[#E5FF00]">0{idx + 1}</span>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight mt-8 mb-5 text-balance">{item.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 7. THE 90-DAY PROTOCOL (ROADMAP) ==================== */}
      <section id="protocol" data-section-theme="dark" className="bg-[#0A0A0A] text-white px-6 md:px-8 py-32 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-[#E5FF00] mb-6" lang="en">{t.protocol.kicker}</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[1.1] whitespace-pre-line text-balance mb-8">
            {t.protocol.title}
          </h2>

          <p className="max-w-3xl mb-16 text-gray-400 text-lg font-medium leading-relaxed">{t.protocol.desc}</p>

          {/* Timeline */}
          <div className="max-w-4xl ml-2 md:ml-8 border-l-4 border-white/20">
            {[t.protocol.p1, t.protocol.p2, t.protocol.p3, t.protocol.p4].map((phase, idx) => (
              <div key={idx} className="relative pl-8 md:pl-16 pb-12 last:pb-0">
                <div className="absolute -left-[10px] top-0 size-4 bg-[#E5FF00]"></div>
                <div className="bg-[#E5FF00] text-black px-3 py-1 text-xs md:text-sm font-bold uppercase inline-block mb-4">
                  {phase.tag}
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white text-balance">
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

      {/* ==================== 5. USE CASES 应用场景区 ==================== */}
      <section id="cases" data-section-theme="yellow" className="bg-[#E5FF00] text-black px-6 md:px-8 py-32 border-t border-black/20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[1.1] whitespace-pre-line text-balance">
            {t.cases.title}
          </h2>
          <p className="text-lg md:text-xl font-bold max-w-md">
            {t.cases.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.cases.list.map((c, idx) => (
            <article key={c.tag} className="border border-black p-6 md:p-8 flex flex-col">
              <div className="flex justify-between items-center gap-4 text-xs font-bold tracking-wider mb-6">
                <span>0{idx + 1}</span>
                <span className="border border-current px-2 py-1" lang="en">{c.tag}</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight leading-snug mb-4 text-balance">
                {c.title}
              </h3>
              <p className="font-medium text-sm md:text-base leading-relaxed opacity-80">
                {c.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ==================== 6. ABOUT 宣言与创始人区 ==================== */}
      <section id="about" data-section-theme="dark" className="bg-[#0A0A0A] text-white px-6 md:px-8 py-32 border-t border-white/20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 mb-32 max-w-7xl mx-auto">
          <div className="lg:w-[60%]">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] whitespace-pre-line text-balance mb-8">{t.about.title}</h2>
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
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className="border border-white/20 p-8 md:p-10 hover:bg-[#1A1A1A] transition-colors flex flex-col">
              <div className="text-[#E5FF00] font-black tracking-tighter text-3xl md:text-4xl mb-2">{t.about.member1.name}</div>
              <div className="text-sm font-bold tracking-widest text-white/50 mb-6 uppercase">{t.about.member1.role}</div>
              <div className="space-y-4 max-w-5xl text-base md:text-lg text-gray-400 font-medium leading-relaxed">
                {t.about.member1.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 7. Growth Journey ==================== */}
      <section id="pricing" data-section-theme="dark" className="bg-[#0A0A0A] text-white px-6 md:px-8 py-24 md:py-32 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mb-12 md:mb-16">
            <p className="text-xs font-bold tracking-widest text-[#E5FF00] mb-6" lang="en">{t.pricing.kicker}</p>
            <h2 className="text-4xl md:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.08] whitespace-pre-line text-balance mb-6">
              {t.pricing.title}
            </h2>
            <p className="text-lg md:text-2xl font-bold mb-3">{t.pricing.subtitle}</p>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-3xl">{t.pricing.journeyNote}</p>
          </div>

          <div className="border-y border-white/20 py-5 mb-8 flex flex-col md:flex-row md:items-center gap-3 md:gap-5 text-sm font-black tracking-wide" lang="en" aria-label="Growth Journey">
            <span className="text-[#E5FF00]">EXPLORE</span>
            <span className="text-gray-500" aria-hidden="true"><span className="md:hidden">↓</span><span className="hidden md:inline">→</span></span>
            <span className="text-[#E5FF00]">MONITOR</span>
            <span className="text-gray-500" aria-hidden="true"><span className="md:hidden">↓</span><span className="hidden md:inline">→</span></span>
            <span className="flex items-center gap-3 flex-wrap">
              <span className="text-[#E5FF00]">ENTER</span>
              <span className="text-gray-500">{t.pricing.or}</span>
              <span className="text-[#E5FF00]">GROW</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 items-stretch">
            {t.pricing.offers.map((offer, idx) => (
              <article key={offer.stage} className={offer.stage === 'MONITOR' ? 'min-w-0 border-2 border-[#E5FF00] p-6 lg:p-7 flex flex-col' : 'min-w-0 border-2 border-white/20 p-6 lg:p-7 flex flex-col'}>
                <p className="text-xs font-black tracking-widest text-[#E5FF00] mb-5" lang="en">0{idx + 1} / {offer.stage}</p>
                <h3 className="text-2xl lg:text-[clamp(1.25rem,1.75vw,1.6rem)] font-black tracking-tight leading-tight text-balance mb-3">{offer.name}</h3>
                <p className="text-[0.7rem] font-bold tracking-wide text-[#E5FF00] mb-5">{offer.mode}</p>
                <p className="text-sm text-gray-300 leading-relaxed xl:min-h-28 mb-6">{offer.desc}</p>
                <div className="border-t border-white/20 pt-5 mb-5">
                  <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
                    {offer.price.startsWith('From ') ? (
                      <><span className="text-sm font-bold text-gray-400">From</span><span className="text-3xl lg:text-[clamp(1.7rem,2.4vw,2.3rem)] font-black tracking-tighter whitespace-nowrap">{offer.price.slice(5)}</span></>
                    ) : (
                      <span className="text-4xl font-black tracking-tighter whitespace-nowrap">{offer.price}</span>
                    )}
                    <span className="text-sm font-bold text-gray-400">{offer.period}</span>
                  </div>
                  <p className="text-xs font-bold text-gray-400 leading-snug mt-3">{offer.terms}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm font-medium leading-snug">
                      <span className="w-1.5 h-1.5 bg-[#E5FF00] shrink-0 mt-1.5" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {offer.motions.length > 0 && (
                  <div className="border-t border-white/20 pt-4 mb-5">
                    <p className="text-xs font-black text-[#E5FF00] tracking-wide mb-3">{t.pricing.motionLabel}</p>
                    <p className="text-xs text-gray-300 leading-relaxed">{offer.motions.join(' · ')}</p>
                  </div>
                )}
                {offer.detail && <p className="text-sm font-semibold leading-relaxed text-[#E5FF00] mb-4">{offer.detail}</p>}
                {offer.scope && <p className="text-xs text-gray-400 leading-relaxed mb-4">{offer.scope}</p>}
                {offer.credit && <p className="text-xs font-semibold leading-relaxed border-l-2 border-[#E5FF00] pl-3 mb-5">{offer.credit}</p>}
                <button
                  type="button"
                  data-pricing-source={offer.source}
                  onClick={() => handlePricingClick(offer.source)}
                  className="mt-auto w-full bg-[#E5FF00] text-black hover:bg-white transition-colors rounded-full px-4 py-4 text-sm font-black text-center"
                >
                  {offer.btn}
                </button>
              </article>
            ))}
          </div>

          <div className="mt-8 border-2 border-[#E5FF00] p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-3xl">
              <p className="text-xs font-black tracking-widest text-[#E5FF00] mb-3" lang="en">{t.pricing.lead.stage} / {t.pricing.lead.eyebrow}</p>
              <h3 className="text-2xl md:text-4xl font-black tracking-tight text-balance mb-3">{t.pricing.lead.name}</h3>
              <p className="text-base text-gray-300 leading-relaxed">{t.pricing.lead.desc}</p>
            </div>
            <div className="shrink-0 lg:w-56">
              <p className="text-3xl font-black mb-4">{t.pricing.lead.price}</p>
              <button type="button" data-pricing-source="fractional-cmo" onClick={() => handlePricingClick('fractional-cmo')} className="w-full bg-[#E5FF00] text-black hover:bg-white transition-colors rounded-full px-5 py-4 text-sm font-black">
                {t.pricing.lead.btn}
              </button>
            </div>
          </div>
          <p className="max-w-4xl mt-8 text-sm text-gray-400 leading-relaxed">{t.pricing.fees}</p>
        </div>
      </section>

      {/* ==================== 8. FAQ 区 ==================== */}
      <section id="faq" data-section-theme="dark" className="bg-[#0A0A0A] text-white px-6 md:px-8 py-24 md:py-32 border-t border-white/20">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] whitespace-pre-line text-balance mb-16">{t.faq.title}</h2>
        <div className="flex flex-col border-t border-white/20">
          {t.faq.items.map((item, idx) => (
            <div key={item.q} className="border-b border-white/20">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                aria-controls={`faq-answer-${idx}`}
                className="w-full py-8 flex items-start justify-between text-left gap-4 hover:text-[#E5FF00] transition-colors"
              >
                <span className="text-xl md:text-2xl font-bold tracking-tight flex-1 text-balance">{item.q}</span>
                <span className={`shrink-0 mt-1 w-5 h-5 transition-transform duration-200 ${openFaq === idx ? 'rotate-45' : ''}`}>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              {openFaq === idx && (
                <div id={`faq-answer-${idx}`} className="pb-8 text-gray-400 text-base md:text-lg leading-relaxed pr-8 md:pr-12 max-w-5xl">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 9. CONTACT / 免费咨询表单 ==================== */}
      <section id="contact" data-section-theme="yellow" className="bg-[#E5FF00] text-black px-6 md:px-8 py-24 md:py-32 border-t-4 border-black">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* 左侧：对话邀约文案 */}
          <div className="lg:w-[45%] lg:sticky lg:top-32">
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

          {/* 右侧：简化表单 */}
          <div className="lg:w-[55%] w-full">
            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit}
              noValidate={false}
            >

              {/* Hidden sourcePlan */}
              <input
                type="hidden"
                name="sourcePlan"
                value={sourcePlan}
                readOnly
              />

              {/* 工作邮箱 (必填) — 放在最上面 */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-black uppercase tracking-widest text-black/70"
                >
                  {t.contact.form.email}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  disabled={submitting}
                  value={formValues.email}
                  onChange={handleFieldChange('email')}
                  aria-invalid={Boolean(validationErrors.email)}
                  aria-describedby={validationErrors.email ? 'contact-email-error' : undefined}
                  className="w-full border-4 border-black bg-transparent px-6 py-5 text-2xl font-black focus:outline-none focus:bg-white transition-colors duration-300 placeholder-black/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder={t.contact.form.emailPh}
                />
                {validationErrors.email && (
                  <p
                    id="contact-email-error"
                    role="alert"
                    className="text-sm font-black uppercase tracking-tight text-black"
                  >
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Tell us more disclosure */}
              <button
                type="button"
                onClick={() => setShowMoreInfo(!showMoreInfo)}
                aria-expanded={showMoreInfo}
                aria-controls="contact-more-info"
                disabled={submitting}
                className="self-start text-sm font-black uppercase tracking-widest text-black/70 border-b border-black hover:text-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:underline"
              >
                {t.contact.form.moreInfoLabel}
                <span className="ml-2 inline-block w-4 h-4 align-middle">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition-transform duration-200 ${showMoreInfo ? 'rotate-45' : ''}`}>
                    <line x1="8" y1="2" x2="8" y2="14" />
                    <line x1="2" y1="8" x2="14" y2="8" />
                  </svg>
                </span>
              </button>

              {/* Optional fields — absent from the accessibility tree while collapsed */}
              {showMoreInfo && (
                <div
                  id="contact-more-info"
                  className="flex flex-col gap-8"
                >
                {/* 姓名 | 公司 / 品牌 (并排) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-black uppercase tracking-widest text-black/70"
                    >
                      {t.contact.form.name}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      disabled={submitting}
                      value={formValues.name}
                      onChange={handleFieldChange('name')}
                      className="w-full border-4 border-black bg-transparent px-6 py-5 text-2xl font-black focus:outline-none focus:bg-white transition-colors duration-300 placeholder-black/20 disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder={t.contact.form.namePh}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="contact-company"
                      className="text-sm font-black uppercase tracking-widest text-black/70"
                    >
                      {t.contact.form.company}
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      disabled={submitting}
                      value={formValues.company}
                      onChange={handleFieldChange('company')}
                      className="w-full border-4 border-black bg-transparent px-6 py-5 text-2xl font-black focus:outline-none focus:bg-white transition-colors duration-300 placeholder-black/20 disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder={t.contact.form.companyPh}
                    />
                  </div>
                </div>

                {/* 品牌网址 */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="contact-website"
                    className="text-sm font-black uppercase tracking-widest text-black/70"
                  >
                    {t.contact.form.website}
                  </label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    inputMode="url"
                    disabled={submitting}
                    value={formValues.website}
                    onChange={handleFieldChange('website')}
                    className="w-full border-4 border-black bg-transparent px-6 py-5 text-2xl font-black focus:outline-none focus:bg-white transition-colors duration-300 placeholder-black/20 disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder={t.contact.form.websitePh}
                  />
                </div>

                {/* 微信号 | WhatsApp (并排) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="contact-wechat"
                      className="text-sm font-black uppercase tracking-widest text-black/70"
                    >
                      {t.contact.form.wechat}
                    </label>
                    <input
                      id="contact-wechat"
                      name="wechat"
                      type="text"
                      autoComplete="off"
                      disabled={submitting}
                      value={formValues.wechat}
                      onChange={handleFieldChange('wechat')}
                      className="w-full border-4 border-black bg-transparent px-6 py-5 text-xl font-black focus:outline-none focus:bg-white transition-colors duration-300 placeholder-black/20 disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder={t.contact.form.wechatPh}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="contact-whatsapp"
                      className="text-sm font-black uppercase tracking-widest text-black/70"
                    >
                      {t.contact.form.whatsapp}
                    </label>
                    <input
                      id="contact-whatsapp"
                      name="whatsapp"
                      type="text"
                      autoComplete="off"
                      inputMode="tel"
                      disabled={submitting}
                      value={formValues.whatsapp}
                      onChange={handleFieldChange('whatsapp')}
                      className="w-full border-4 border-black bg-transparent px-6 py-5 text-xl font-black focus:outline-none focus:bg-white transition-colors duration-300 placeholder-black/20 disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder={t.contact.form.whatsappPh}
                    />
                  </div>
                </div>

                {/* 留言 (选填, textarea) */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-black uppercase tracking-widest text-black/70"
                  >
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    disabled={submitting}
                    value={formValues.message}
                    onChange={handleFieldChange('message')}
                    className="w-full min-h-[7rem] max-h-64 border-4 border-black bg-transparent px-6 py-4 text-lg font-bold leading-relaxed focus:outline-none focus:bg-white transition-colors duration-300 placeholder-black/20 disabled:opacity-60 disabled:cursor-not-allowed resize-y"
                    placeholder={t.contact.form.messagePh}
                  />
                </div>
                </div>
              )}

              {/* Honeypot */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-10000px',
                  top: 'auto',
                  width: 0,
                  height: 0,
                  overflow: 'hidden',
                }}
              >
                <label htmlFor="companyWebsite2">
                  Company Website 2
                  <input
                    id="companyWebsite2"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
              </div>

              {/* 提交按钮 */}
              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                aria-live="polite"
                className="mt-6 w-full bg-black text-[#E5FF00] border-4 border-black py-6 md:py-8 text-3xl md:text-4xl font-black uppercase tracking-tighter hover:bg-transparent hover:text-black transition-all duration-300 flex items-center justify-center gap-4 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-[#E5FF00]"
              >
                <span>{submitting ? t.contact.form.submitting : t.contact.form.submit}</span>
                {!submitting && (
                  <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </button>

              {/* Inline status feedback */}
              <div
                aria-live="polite"
                role="status"
                className="min-h-[1.5rem] -mt-2"
              >
                {formStatus === 'success' && (
                  <div className="bg-black text-[#E5FF00] border-4 border-black px-4 py-3 font-black uppercase tracking-tight flex items-center justify-between gap-4">
                    <span>{t.contact.form.success}</span>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-sm font-black uppercase tracking-widest underline underline-offset-4 hover:text-white"
                    >
                      {lang === 'zh' ? '再提交一次' : 'Submit another'}
                    </button>
                  </div>
                )}
                {formStatus === 'error' && (
                  <div
                    role="alert"
                    className="bg-white text-black border-4 border-black px-4 py-3 font-black uppercase tracking-tight"
                  >
                    {errorMessage || t.contact.form.error}
                  </div>
                )}
              </div>

            </form>
          </div>

        </div>
      </section>

      <footer data-section-theme="dark" className="bg-[#0A0A0A] text-white px-6 md:px-8 py-8 w-full border-t border-white/20">
        <div className="flex flex-col gap-6">
          <nav aria-label={lang === "zh" ? "页脚导航" : "Footer navigation"} className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-gray-300">
            {[
              { label: t.nav.goradar, href: "#goradar" },
              { label: t.nav.services, href: "#services" },
              { label: t.nav.cases, href: "#cases" },
              { label: t.nav.pricing, href: "#pricing" },
              { label: t.nav.faq, href: "#faq" },
              { label: t.nav.contact, href: "#contact" },
            ].map((item) => (
              <a key={item.href} href={item.href} className="hover:text-[#E5FF00] transition-colors">
                {item.label}
              </a>
            ))}
            <a href="https://app.brandgo.global/" className="text-[#E5FF00] hover:text-white transition-colors">
              {t.footer.clientLogin}
            </a>
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-bold uppercase tracking-tight text-gray-500">
            <span>{t.footer.left}</span>
            <span>{t.footer.right}</span>
          </div>
        </div>
      </footer>

    </main>
  );
}
