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
    nav: { goradar: "GoRadar AI", services: "Services", cases: "Use Cases", pricing: "Pricing", faq: "FAQ", contact: "Contact", signin: "Sign In", langSwitch: "中" },
    hero: {
      eyebrow: "AI-POWERED GLOBAL GROWTH TEAM",
      title: "MARKET RADAR: ON.\nGUESSWORK: OFF.",
      subtitle: "BrandGo.Global helps Chinese businesses understand overseas markets, find customers, and put growth plans into action.\nWe use GoRadar AI to track markets, competitors, and customer needs, then deliver the strategy, content, and advertising to reach them."
    },
    marquee: ["MARKET INTELLIGENCE", "CONTENT & LOCALIZATION", "PAID MEDIA", "SPONSORSHIPS & CREATOR MARKETING"],
    services: {
      kicker: "WHAT WE HELP YOU DO",
      title: "FOUR WAYS\nTO GROW OVERSEAS",
      desc: "Understand the market. Build trust through content. Find customers. Extend your reach.",
      s1: {
        title: "UNDERSTAND THE MARKET",
        label: "GoRadar AI",
        desc: "GoRadar AI is our AI market intelligence app. It uses continuously updated market, competitor, customer-demand, and trend signals to help your team assess opportunities and decide where to go and what to do first.",
        btnOpen: "EXPLORE THE RADAR",
        btnClose: "CLOSE RADAR DETAILS",
        features: [
          {
            name: "COMPETITOR & SEARCH OPPORTUNITIES",
            detail: "Uses updated overseas competitor and search data to identify underserved needs and keywords for your team to evaluate."
          },
          {
            name: "CUSTOMER DEMAND & SUPPLY CHAIN FIT",
            detail: "Matches overseas search demand with your manufacturing, product, and delivery strengths to help assess which needs fit your business."
          },
          {
            name: "AI-ASSISTED AUDIENCE & CAMPAIGN ANALYSIS",
            detail: "Uses available audience, market, and campaign inputs to support targeting and test-planning decisions."
          }
        ]
      },
      s2: {
        title: "CREATE CONTENT THAT CONNECTS",
        label: "Content & Localization",
        desc: "Use AI to explore content ideas, angles, and local expressions, then bring them to your overseas social and content channels. Help customers understand your brand, want to engage with it, and learn to trust it. Execution scope is confirmed in the selected plan and content schedule.",
        bullets: [
          "Content Strategy, Topics & Messaging",
          "Short-Form Video & User-Generated Content",
          "Multilingual Content & Cultural Localization",
          "Social Publishing and Community Support"
        ],
        kpis: [
          "FOCUS: ENGAGEMENT",
          "FOCUS: BRAND AWARENESS"
        ]
      },
      s3: {
        title: "ACQUIRE CUSTOMERS",
        label: "Paid Media & Growth",
        desc: "Combine ad management, GoRadar AI-assisted analysis, and ongoing optimization. Test audiences, creatives, channels, and landing pages, then use real data to build and improve customer-acquisition paths, support inquiries and conversions, and improve acquisition efficiency.",
        bullets: [
          "Ad Analysis & Campaign Recommendations",
          "Search & Social Ads, B2B Lead-Generation Support",
          "Audience, Creative & Channel A/B Testing",
          "Retargeting & Landing Page Optimization"
        ],
        kpis: [
          "FOCUS: ACQUISITION COST",
          "FOCUS: LEAD & CONVERSION QUALITY"
        ]
      },
      s4: {
        title: "Build Influence",
        label: "Sponsorships & Creator Marketing",
        desc: "Help brands reach relevant overseas audiences and support visibility and trust-building.",
        bullets: [
          "Sponsorship Strategy & Opportunity Assessment",
          "Influencer / Creator Matching & Collaboration Planning",
          "Partnership Content & Local Messaging",
          "Visibility & Trust-Building Support"
        ],
        kpis: [
          "FOCUS: BRAND FIT",
          "FOCUS: RELEVANT REACH"
        ]
      }
    },
    protocol: {
      kicker: "THE FIRST 90 DAYS",
      title: "HOW WE\nGET STARTED",
      desc: "Agree on the direction before increasing investment. These are the usual steps for execution engagements; the work and pace depend on your existing setup and chosen plan.",
      p1: {
        tag: "UNDERSTAND",
        title: "CLARIFY THE MARKET & THE PROBLEM",
        desc: "Start with your products, customers, and goals. Use GoRadar AI to review the market and competition, identify priorities, and agree on what to validate first."
      },
      p2: {
        tag: "PREPARE",
        title: "PUT THE FOUNDATIONS IN PLACE",
        desc: "Review your website and accounts, prepare localized content, and check conversion tracking so tests have useful materials and reliable data. Build on what is already working and fill the gaps."
      },
      p3: {
        tag: "TEST",
        title: "TEST WITH A CONTROLLED BUDGET",
        desc: "Test priority audiences, content, and channels on a small scale. Review inquiries, conversions, and acquisition costs together to decide what to continue and what to adjust."
      },
      p4: {
        tag: "REFINE",
        title: "BUILD ON WHAT WORKS",
        desc: "Improve content and campaigns using test feedback, then gradually direct resources toward effective approaches. Regular reviews make progress, budget use, and next steps clear."
      }
    },
    cases: {
      title: "TYPICAL\nUSE CASES",
      desc: "Recognize a challenge your business is facing? These common needs and ways we can help are a starting point for a conversation.",
      list: [
        {
          tag: "MARKET ENTRY",
          title: "Not sure which overseas market to enter first",
          desc: "You are ready to expand but unsure where to invest first. BrandGo.Global uses GoRadar AI to analyze demand, trends, and competition so you can prioritize markets to validate."
        },
        {
          tag: "EUROPE",
          title: "Bringing a Chinese supply-chain brand to Europe",
          desc: "Your products and delivery are competitive, but European customers do not know your brand yet. BrandGo.Global combines market analysis, localized content, and channel testing to shape your market entry."
        },
        {
          tag: "D2C ACQUISITION",
          title: "North American D2C acquisition is getting expensive",
          desc: "Ads keep spending and creatives are losing effectiveness, but the cause is unclear. BrandGo.Global tests audiences, creatives, channels, and landing pages to find more effective acquisition combinations."
        },
        {
          tag: "B2B LEADS",
          title: "Struggling to reach overseas decision-makers",
          desc: "You know which companies to target but struggle to reach the people who make buying decisions. BrandGo.Global combines market intelligence, search, LinkedIn, and content to build a clearer path to relevant leads."
        },
        {
          tag: "GROWTH REVIEW",
          title: "Already overseas, but growth has stalled",
          desc: "Your website, ads, and overseas social channels are active, but growth has slowed. BrandGo.Global reviews markets, competitors, and channel performance to identify opportunities worth testing next."
        },
        {
          tag: "BRAND BUILDING",
          title: "Export orders are coming in, but a brand is missing",
          desc: "You are fulfilling export orders, but customers mainly remember your products and prices. BrandGo.Global develops positioning, product messaging, and localized content to turn supply strengths into a recognizable brand."
        },
        {
          tag: "PARTNERSHIPS",
          title: "Unsure where to start with sponsorships or creators",
          desc: "You want more exposure but are unsure who to work with, what to create, or how to budget. BrandGo.Global helps define audiences, brand fit, and partnership direction before agreeing on a practical project scope."
        },
        {
          tag: "DIRECT ACQUISITION",
          title: "Selling through platforms or agents, but wanting direct customers",
          desc: "Sales are established, but customer relationships and new orders still depend mainly on platforms or agents. BrandGo.Global combines your brand website, content, and ad tests to help build your own customer reach and direct acquisition capability."
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
          "At BrandGo.Global, he leads market entry strategy and GoRadar AI product architecture, connecting market intelligence with content, advertising, and localization to help Chinese businesses turn opportunities into action."
        ]
      }
    },
    pricing: {
      kicker: "WAYS TO WORK TOGETHER",
      title: "CHOOSE YOUR\nLEVEL OF SUPPORT",
      subtitle: "Monthly pricing. GoRadar AI is available month to month; execution services have a 90-day minimum.",
      note: "Execution service plans are billed monthly in advance.",
      guidance: "Have an execution team? Start with intelligence. Need delivery? Choose execution. Need ongoing leadership across channels? Choose Fractional CMO.",
      fees: "Plan prices cover tools and services. Media spend, sponsorship and media rights, creator fees, production costs, and other third-party costs are billed separately. The $5,000 / $30,000 limits are monthly ad spend caps with no additional management fee, not included ad budgets. See the full comparison for extra-platform and overage fees.",
      disclaimer: "Final scope, channel coverage, and third-party costs are confirmed before the engagement begins.",
      btnExpand: "↓ VIEW FULL FEATURE COMPARISON",
      btnCollapse: "↑ HIDE FULL COMPARISON",
      includedText: "✓ INCLUDED",
      tiers: [
        {
          name: "GoRadar AI™ TIER",
          price: "$399", oldPrice: "$599", period: "/ MO",
          billing: "Monthly subscription",
          mode: "INTELLIGENCE & GUIDANCE",
          desc: "For businesses with an execution team that need clearer market insight and priorities. Use GoRadar AI and regular strategy reviews to guide your next actions.",
          features: [
            "GoRadar AI™ Dashboard",
            "Monthly Scheduled 1:1 Strategy Review (60m)",
            "Website & Ad Account Audit",
            "Competitor & Keyword Opportunities Report"
          ],
          addon: "",
          btn: "GET RADAR ACCESS",
          highlight: false
        },
        {
          name: "CORE ENGINE TIER",
          price: "$999", oldPrice: "$1,499", period: "/ MO",
          billing: "90-day minimum, billed monthly in advance",
          mode: "CONTENT & AD EXECUTION",
          desc: "For businesses with a product and target market that need hands-on content and advertising support. Get execution, testing, and optimization across priority channels.",
          features: [
            "Everything in GoRadar AI™ Tier",
            "1 Ad + 1 Content Platform Managed",
            "No Additional Ad Management Fee on Up to $5,000 Monthly Ad Spend",
            "Scheduled Strategy Review Every Two Weeks"
          ],
          addon: "+$349/mo per extra platform",
          btn: "START CORE ENGINE",
          highlight: true
        },
        {
          name: "FRACTIONAL CMO TIER",
          price: "$2,499+", oldPrice: "$3,999", period: "/ MO",
          billing: "90-day minimum, billed monthly in advance",
          mode: "ONGOING GROWTH LEADERSHIP",
          desc: "For businesses growing across channels that need ongoing strategic direction and coordination. A fractional CMO connects market insight, content, advertising, and reviews.",
          features: [
            "Everything in Core Engine Tier",
            "Multi-Channel Coordination (Scope Agreed per Engagement)",
            "No Additional Ad Management Fee on Up to $30,000 Monthly Ad Spend",
            "Website SEO & Brand Trust Building",
            "Priority Support with Communication Cadence Agreed at Onboarding"
          ],
          addon: "",
          btn: "HIRE YOUR CMO",
          highlight: false
        }
      ],
      comparisonDetails: [
        {
          category: "GoRadar AI™ Intelligence & Strategy",
          items: [
            { name: "Competitor & Search Opportunities Report", t1: "1 Report / Mo", t2: "2 Reports / Mo", t3: "Ongoing Monitoring" },
            { name: "Scheduled Strategy Review", t1: "Monthly (60 mins)", t2: "About 2x / Mo", t3: "Weekly" },
            { name: "Ad Account & Site Health Audit", t1: "✔", t2: "✔", t3: "✔" },
            { name: "Custom Go-to-Market Strategy (GTM)", t1: "✘", t2: "✔", t3: "✔" }
          ]
        },
        {
          category: "Brand & Website Foundations",
          items: [
            { name: "Social Account Setup & Search Optimization (SEO)", t1: "✘", t2: "1-2 Core Platforms", t3: "Multi-Channel Coordination (Scope Agreed per Engagement)" },
            { name: "Website Conversion Review (CRO)", t1: "✘", t2: "✔", t3: "Ongoing Optimization & A/B Testing" }
          ]
        },
        {
          category: "Content & Localization",
          items: [
            { name: "AI-Assisted Localized Visual Production", t1: "✘", t2: "Defined Sets per Campaign", t3: "Volume Production & In-Depth Localization" },
            { name: "Social Content Scheduling & Publishing", t1: "✘", t2: "Content Execution and Publishing Based on the Agreed Monthly Plan", t3: "Ongoing Multi-Channel Content Coordination and Publishing" },
            { name: "Community Engagement & Lead Routing", t1: "✘", t2: "✔", t3: "Lead Organization and Conversion-Path Support" },
            { name: "KOL/UGC Resource Mgmt", t1: "✘", t2: "✘", t3: "Creator Partnership Support (Scope Agreed per Project)" }
          ]
        },
        {
          category: "Ads & Growth",
          items: [
            { name: "Ad Account Setup & Pixel/CAPI Tracking", t1: "✘", t2: "✔", t3: "✔" },
            { name: "Ad Strategy & Target Audiences", t1: "✘", t2: "1 Core Channel", t3: "Coordinated Multi-Channel Campaigns" },
            { name: "A/B Testing & Ad Return Optimization (ROAS)", t1: "✘", t2: "✔", t3: "Ongoing Testing and Optimization Based on Available Budget, Traffic, and Creative Volume" },
            { name: "Monthly Ad Spend with No Additional Management Fee", t1: "✘", t2: "Up to $5,000", t3: "Up to $30,000" },
            { name: "Overage Management Fee", t1: "✘", t2: "10% on Spend Above $5,000", t3: "8–10% on Spend Above $30,000, Based on Scale" }
          ]
        },
        {
          category: "Communication & Support",
          items: [
            { name: "Initial Response & Troubleshooting", t1: "Email Response Within 2 Business Days", t2: "Response Within 1 Business Day", t3: "Priority Support; Communication Cadence Agreed at Onboarding" }
          ]
        }
      ]
    },
    faq: {
      title: "BEFORE\nWE START",
      items: [
        {
          q: "What is GoRadar AI? Can I choose it without execution services?",
          a: "GoRadar AI is our AI market intelligence and decision support app, available through the GoRadar AI™ Tier without an execution plan. It analyzes markets, competitors, search trends, and customer needs, with the strategy reviews included in your plan to help prioritize action. Decisions still need business context and validation through real execution."
        },
        {
          q: "What services do you provide?",
          a: "We help with four areas: market understanding, content, customer acquisition, and brand reach. These cover GoRadar AI, overseas content and localization, advertising and optimization, and Sponsorships & Creator Marketing. Deliverables depend on the chosen plan or agreed project scope."
        },
        {
          q: "Who is this for? Can we work together before launching overseas?",
          a: "We work with Chinese businesses entering or expanding in overseas markets, including B2B companies, D2C businesses, and brands with supply-chain strengths. If you have not launched yet, we can start with market assessment and priorities. Clear product information, goals, and available resources help us agree on a useful starting point."
        },
        {
          q: "How can you work with our existing team or agency?",
          a: "We can work around the gaps in your current setup. Choose GoRadar AI for intelligence and guidance, Core Engine for content and ad execution, or Fractional CMO for ongoing strategy and coordination across channels. We agree on responsibilities, account access, and communication before starting."
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
          q: "Is the advertising budget included in the service fee?",
          a: "No: plan prices cover tools and services, while media spend is separate. The $5,000 Core Engine and $30,000 Fractional CMO limits are monthly ad spend caps with no additional management fee, not ad credits. Extra-platform charges and overage management fees are listed in the plan comparison."
        },
        {
          q: "How does billing work? Is there a long-term commitment?",
          a: "GoRadar AI is available for $399 as a monthly subscription. Core Engine and Fractional CMO have a 90-day minimum and are billed monthly in advance. Media spend, sponsorship and media rights, creator fees, production costs, and other third-party costs are billed separately."
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
        messagePh: "Tell us briefly about your goal or what you're working through",
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
    nav: { goradar: "GoRadar AI", services: "服务", cases: "应用场景", pricing: "定价", faq: "常见问题", contact: "联系我们", signin: "登录", langSwitch: "EN" },
    hero: {
      eyebrow: "AI 驱动的海外增长团队",
      title: "雷达全开。\n告别盲猜。",
      subtitle: "BrandGo.Global 帮中国企业看清海外市场、找到客户，并把增长真正做起来。\n我们用 GoRadar AI 持续监测市场、竞争对手和客户需求，再把策略、内容、广告和获客执行落地。"
    },
    marquee: ["MARKET INTELLIGENCE", "CONTENT & LOCALIZATION", "PAID MEDIA", "SPONSORSHIPS & CREATOR MARKETING"],
    services: {
      kicker: "WHAT WE HELP YOU DO",
      title: "我们具体帮你\n做四件事",
      desc: "看清市场，做好内容，获得客户，再扩大品牌影响。",
      s1: {
        title: "看清市场",
        label: "GoRadar AI",
        desc: "GoRadar AI 是我们的 AI 海外市场情报应用，结合定期更新的市场、竞争对手、客户需求与趋势信号，帮你的团队判断机会，决定先进入哪里、先做什么。",
        btnOpen: "展开雷达系统",
        btnClose: "收起雷达面板",
        features: [
          {
            name: "竞争对手与搜索机会",
            detail: "持续监测海外竞争对手和搜索数据，找出尚未被充分覆盖的需求与关键词，供团队评估增长机会。"
          },
          {
            name: "客户需求与供应链匹配",
            detail: "将海外客户的搜索需求与你的制造、产品及交付优势进行匹配，帮助判断哪些需求更适合你的业务。"
          },
          {
            name: "AI 辅助受众与广告方向分析",
            detail: "结合已有受众、市场与投放信息，为受众选择和测试方向提供决策支持。"
          }
        ]
      },
      s2: {
        title: "做好内容",
        label: "海外内容与本地化",
        desc: "用 AI 辅助寻找内容灵感、传播角度和本地表达，再落实到海外社媒与内容渠道，让海外用户看得懂、愿意看，也愿意相信你的品牌。具体执行范围按套餐与内容计划确认。",
        bullets: [
          "内容方向、选题与传播表达",
          "短视频与用户内容（UGC）制作",
          "多语种内容与文化本地化",
          "社媒内容发布与基础互动支持"
        ],
        kpis: [
          "关注：内容互动",
          "关注：品牌认知"
        ]
      },
      s3: {
        title: "获得客户",
        label: "海外广告与增长",
        desc: "把广告投放、GoRadar AI 辅助分析和持续优化放在一起，测试受众、素材、渠道与落地页，用实际数据建立和优化获客路径，推动询盘与转化，并提升获客效率。",
        bullets: [
          "广告分析与投放方向建议",
          "搜索与社交广告、B2B 线索获取支持",
          "受众、素材与渠道 A/B 测试",
          "再营销与落地页转化优化"
        ],
        kpis: [
          "关注：获客成本",
          "关注：线索与转化质量"
        ]
      },
      s4: {
        title: "扩大影响",
        label: "品牌赞助与达人营销",
        desc: "帮助品牌触达更相关的海外受众，并支持品牌认知与信任建设。",
        bullets: [
          "品牌赞助方向与合作机会评估",
          "达人 / 创作者匹配与合作策划",
          "合作内容与本地传播表达",
          "品牌认知与信任建设支持"
        ],
        kpis: [
          "关注：品牌匹配度",
          "关注：相关受众触达"
        ]
      }
    },
    protocol: {
      kicker: "THE FIRST 90 DAYS",
      title: "前 90 天，\n这样开始合作",
      desc: "先确定方向，再逐步投入。下面是执行型合作的常见推进方式；具体工作和节奏，结合你的现有基础与所选套餐确认。",
      p1: {
        tag: "了解业务",
        title: "看清市场和问题",
        desc: "从你的产品、客户与目标出发，结合 GoRadar AI 梳理市场和竞争，明确优先市场、关键问题，以及接下来要验证的方向。"
      },
      p2: {
        tag: "准备基础",
        title: "搭好数据、内容与投放基础",
        desc: "检查网站和账号，准备本地化内容与转化追踪，让后续测试有素材可用、有数据可看。已有基础可以继续使用，缺什么再补什么。"
      },
      p3: {
        tag: "小范围验证",
        title: "用有限预算测试方向",
        desc: "从重点受众、内容和渠道开始测试，一起看询盘、转化与获客成本，判断哪些方向值得继续，哪些需要调整。"
      },
      p4: {
        tag: "持续优化",
        title: "把有效方法逐步放大",
        desc: "根据测试反馈优化内容与投放，再把资源逐步投入有效方向。定期复盘进展、预算使用和下一步安排，让你清楚合作在往哪里走。"
      }
    },
    cases: {
      title: "典型应用场景",
      desc: "看看这些出海难题，是否也在困扰你。以下是典型需求与支持方式，供你对照自己的业务。",
      list: [
        {
          tag: "MARKET ENTRY",
          title: "不知道先做哪个海外市场",
          desc: "准备出海，却拿不准哪个市场值得先投入。BrandGo.Global 用 GoRadar AI 分析需求、趋势与竞争，帮你确定优先验证的市场。"
        },
        {
          tag: "EUROPE",
          title: "有供应链优势，想把品牌带进欧洲",
          desc: "产品和交付有竞争力，欧洲客户却还不了解你的品牌。BrandGo.Global 结合市场分析、本地化内容与渠道测试，帮助品牌找到进入欧洲的合适表达。"
        },
        {
          tag: "D2C ACQUISITION",
          title: "北美 D2C 获客越来越贵",
          desc: "广告持续花钱，素材越来越难跑出效果，却不清楚问题在哪。BrandGo.Global 从受众、素材、渠道和落地页逐项测试，寻找更有效的获客组合。"
        },
        {
          tag: "B2B LEADS",
          title: "想找海外客户，却接触不到决策者",
          desc: "知道想卖给哪些企业，却很难找到真正负责采购和拍板的人。BrandGo.Global 结合市场情报、搜索、LinkedIn 与内容，帮助建立通向目标客户的线索路径。"
        },
        {
          tag: "GROWTH REVIEW",
          title: "已经在出海，但增长开始停滞",
          desc: "网站、广告和海外社媒都在做，增长却卡住了。BrandGo.Global 重新审视市场、竞争与渠道表现，帮你找出下一步值得测试的机会。"
        },
        {
          tag: "BRAND BUILDING",
          title: "有外贸订单，还没有自己的海外品牌",
          desc: "外贸订单在交付，客户记住的却主要是产品和价格。BrandGo.Global 从品牌定位、产品表达与本地化内容入手，把供应能力变成客户能理解和记住的品牌价值。"
        },
        {
          tag: "PARTNERSHIPS",
          title: "想做赞助或达人合作，不知道从哪开始",
          desc: "想扩大曝光，却不知道该找谁合作、内容怎么做、预算怎么安排。BrandGo.Global 帮你梳理目标受众、品牌匹配度与合作方向，再确定可执行的项目范围。"
        },
        {
          tag: "DIRECT ACQUISITION",
          title: "平台或代理能卖货，想建立直接获客能力",
          desc: "已有销售渠道，但客户关系和新增订单仍主要依赖平台或代理。BrandGo.Global 结合品牌网站、内容与广告测试，帮助你逐步建立自己的客户触达和直接获客能力。"
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
          "在 BrandGo.Global，他负责市场进入策略与 GoRadar AI 产品架构，把市场情报与内容、广告和本地化执行连接起来，帮助中国企业从判断机会走向实际行动。"
        ]
      }
    },
    pricing: {
      kicker: "WAYS TO WORK TOGETHER",
      title: "选择适合你的\n合作方式",
      subtitle: "按月报价。GoRadar AI 可按月订阅；执行型服务最低合作 90 天。",
      note: "服务型合作按月预付。",
      guidance: "团队能执行，先选工具；需要有人落地，选执行；需要跨渠道持续推进，选长期统筹。",
      fees: "套餐价格为工具与服务费。广告媒体预算、赞助与媒体权益费、达人合作费、制作成本及其他第三方费用另计。$5,000 / $30,000 指每月不另收广告管理费的投放额度上限，不是包含的广告预算；额外平台及超额费用见完整对比。",
      disclaimer: "具体交付范围、渠道数量和第三方费用将在合作开始前确认。",
      btnExpand: "↓ 展开完整服务细节对比",
      btnCollapse: "↑ 收起服务细节对比",
      includedText: "✓ 包含",
      tiers: [
        {
          name: "GoRadar AI™ 战术版",
          price: "$399", oldPrice: "$599", period: "/ 月",
          billing: "按月订阅，可按月续订",
          mode: "工具与策略支持",
          desc: "适合已有执行团队，需要看清市场、比较机会、确定优先级的企业。用 GoRadar AI 与定期策略复盘，为团队行动提供依据。",
          features: [
            "GoRadar AI™ 市场情报看板",
            "每月 1 次定期策略复盘（60 分钟）",
            "现有独立站/广告账户检查",
            "竞争对手与潜在关键词报告"
          ],
          addon: "",
          btn: "获取雷达权限",
          highlight: false
        },
        {
          name: "核心引擎版",
          price: "$999", oldPrice: "$1,499", period: "/ 月",
          billing: "最低合作 90 天，按月预付",
          mode: "内容与广告执行",
          desc: "适合已有产品和目标市场，需要有人把内容与广告做起来的企业。围绕重点渠道执行、测试与优化，补上日常落地能力。",
          features: [
            "包含【战术版】所有核心权益",
            "管理 1 个广告 + 1 个内容平台",
            "每月广告消耗在 $5,000 以内，不另收广告管理费",
            "每两周 1 次定期策略复盘"
          ],
          addon: "每增加一个渠道模块 +$349/月",
          btn: "启动核心引擎",
          highlight: true
        },
        {
          name: "全球共享 CMO 版",
          price: "$2,499+", oldPrice: "$3,999", period: "/ 月",
          billing: "最低合作 90 天，按月预付",
          mode: "长期增长统筹",
          desc: "适合已在多个渠道推进海外业务，需要持续统筹策略与执行的企业。由共享 CMO 协调市场判断、内容、投放与复盘。",
          features: [
            "包含【核心引擎版】所有权益",
            "多渠道统筹（具体范围按合作方案确认）",
            "每月广告消耗在 $30,000 以内，不另收广告管理费",
            "独立站 SEO 与品牌信任建设",
            "优先支持，具体沟通机制在合作开始时确认"
          ],
          addon: "",
          btn: "雇佣您的 CMO",
          highlight: false
        }
      ],
      comparisonDetails: [
        {
          category: "GoRadar AI™ 市场情报与策略",
          items: [
            { name: "竞争对手与搜索机会报告", t1: "每月 1 份", t2: "每月 2 份", t3: "持续监测" },
            { name: "定期策略复盘", t1: "每月 1 次（60 分钟）", t2: "每月约 2 次", t3: "每周 1 次" },
            { name: "独立站/广告账户检查", t1: "✔", t2: "✔", t3: "✔" },
            { name: "市场进入策略定制 (GTM)", t1: "✘", t2: "✔", t3: "✔" }
          ]
        },
        {
          category: "品牌与网站基础",
          items: [
            { name: "社媒账号搭建与搜索优化 (SEO)", t1: "✘", t2: "1-2 个核心平台", t3: "多渠道统筹（具体范围按合作方案确认）" },
            { name: "独立站转化诊断 (CRO)", t1: "✘", t2: "✔", t3: "持续优化与 A/B 测试" }
          ]
        },
        {
          category: "海外内容与本地化",
          items: [
            { name: "AI 辅助本地化素材制作", t1: "✘", t2: "按推广活动定量交付", t3: "批量素材制作与深度本地化" },
            { name: "社媒内容排期与发布", t1: "✘", t2: "按月内容计划执行与发布", t3: "多渠道内容统筹与持续发布" },
            { name: "粉丝互动与线索引导", t1: "✘", t2: "✔", t3: "线索整理与转化路径支持" },
            { name: "本土 KOL/UGC 资源对接", t1: "✘", t2: "✘", t3: "达人 / 创作者合作支持（按项目与范围确认）" }
          ]
        },
        {
          category: "海外广告与增长",
          items: [
            { name: "开户、像素/CAPI 数据追踪", t1: "✘", t2: "✔", t3: "✔" },
            { name: "广告策略与目标受众", t1: "✘", t2: "单一核心渠道", t3: "多渠道联合投放" },
            { name: "A/B 测试与广告回报优化 (ROAS)", t1: "✘", t2: "✔", t3: "根据预算、流量和素材条件持续进行测试与优化" },
            { name: "不另收管理费的每月广告消耗额度", t1: "✘", t2: "最高 $5,000", t3: "最高 $30,000" },
            { name: "超额广告消耗管理费", t1: "✘", t2: "超过 $5,000 的部分按 10% 收取", t3: "超过 $30,000 的部分根据投放规模按 8–10% 收取" }
          ]
        },
        {
          category: "沟通与支持",
          items: [
            { name: "首次响应与答疑", t1: "首次邮件回复：2 个工作日内", t2: "首次回复：1 个工作日内", t3: "优先支持，具体沟通机制在合作开始时确认" }
          ]
        }
      ]
    },
    faq: {
      title: "合作前，\n你可能想问",
      items: [
        {
          q: "GoRadar AI 是什么？可以只用工具吗？",
          a: "GoRadar AI 是帮助团队看清海外市场的 AI 情报与决策支持应用，可以选择 GoRadar AI™ 战术版，无需购买执行型服务。它分析市场、竞争、搜索趋势与客户需求，并配合套餐中的策略复盘，帮助你决定先做什么。具体判断仍需结合业务情况，并通过实际执行验证。"
        },
        {
          q: "你们具体能帮我做哪些事？",
          a: "主要是四件事：看清市场、做好内容、获得客户、扩大影响。对应 GoRadar AI、海外内容与本地化、广告投放与优化，以及品牌赞助与达人营销。具体交付按所选套餐或项目范围确认。"
        },
        {
          q: "什么样的企业适合？还没开始出海也可以吗？",
          a: "适合希望进入或拓展海外市场的中国企业，包括 B2B、D2C 和有供应链基础的品牌。尚未开始出海，也可以先从市场判断与优先级梳理入手。有清楚的产品信息、目标和可投入资源，会更容易确定合适的起点。"
        },
        {
          q: "已经有自己的团队或代理，你们怎么配合？",
          a: "可以围绕现有团队的缺口配合。如果缺市场情报和判断依据，可以先选 GoRadar AI；需要内容与广告执行，可考虑核心引擎版；需要跨渠道的长期策略统筹，可考虑全球共享 CMO 版。合作前先对齐分工、账号权限与沟通方式。"
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
          q: "广告预算包含在服务费里吗？",
          a: "不包含，套餐价格是工具与服务费用，媒体广告预算另计。核心引擎版的 $5,000 和全球共享 CMO 版的 $30,000，是每月不加收广告管理费的投放额度上限，不是赠送的广告金额。额外平台和超出额度的管理费可在套餐对比中查看。"
        },
        {
          q: "套餐如何收费？需要长期签约吗？",
          a: "GoRadar AI $399 可按月订阅。核心引擎版和全球共享 CMO 版最低合作 90 天，服务型套餐按月预付。广告媒体预算、赞助与媒体权益费、达人合作费、制作成本及其他第三方费用另计。"
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
        messagePh: "简单告诉我们您的目标或目前遇到的问题",
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

type SourcePlan = "radar" | "core-engine" | "fractional-cmo" | "direct";

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
  const [showSla, setShowSla] = useState(false);
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
          <div className="min-w-0 w-full xl:w-[40%] md:pb-6">
            <p className="text-lg md:text-xl font-bold leading-tight text-black whitespace-pre-line">
              {t.hero.subtitle}
            </p>
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

      {/* ==================== 3. 四项核心服务 ==================== */}
      <section id="services" data-section-theme="dark" className="bg-[#0A0A0A] text-white px-6 md:px-8 py-32 flex flex-col lg:flex-row gap-16 lg:gap-12">
        <div className="lg:w-[35%]">
          <div className="sticky top-24 h-fit">
            <p className="text-xs font-bold tracking-widest text-[#E5FF00] mb-6" lang="en">{t.services.kicker}</p>
            <h2 className="text-5xl md:text-7xl lg:text-[clamp(3rem,4.5vw,4.5rem)] font-black tracking-tighter leading-[1.1] mb-6 whitespace-pre-line text-balance">
              {t.services.title}
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
                <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white text-balance">{t.services.s1.title}</h3>
                <p className="mt-3 text-base md:text-lg font-bold text-[#E5FF00]">{t.services.s1.label}</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed max-w-2xl mb-2 whitespace-pre-line">
              {t.services.s1.desc}
            </p>

            <button
              onClick={() => setRadarExpanded(!radarExpanded)}
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

          {[t.services.s2, t.services.s3, t.services.s4].map((s, idx) => (
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

      {/* ==================== 4. THE 90-DAY PROTOCOL (ROADMAP) ==================== */}
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

      {/* ==================== 7. PRICING 订阅价格区 (带卡片内无限拉长对比) ==================== */}
      <section id="pricing" data-section-theme="dark" className="bg-[#0A0A0A] px-6 md:px-8 py-32 border-t border-white/20">

        {/* 标题与付款方式提示 */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <p className="text-xs font-bold tracking-widest text-[#E5FF00] mb-6" lang="en">{t.pricing.kicker}</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] whitespace-pre-line text-balance text-[#E5FF00] mb-6">
            {t.pricing.title}
          </h2>
          <p className="max-w-3xl text-base md:text-lg leading-relaxed text-gray-300 mb-6">{t.pricing.guidance}</p>
          <p className="text-xl md:text-2xl font-black text-gray-400 tracking-tight mb-4">
            {t.pricing.subtitle}
          </p>
          <div className="inline-block bg-[#1A1A1A] text-gray-300 font-bold px-6 py-2 rounded-full text-sm md:text-base border border-white/10">
            {t.pricing.note}
          </div>
          <p className="max-w-3xl mt-6 text-sm leading-relaxed text-gray-400">{t.pricing.fees}</p>
        </div>

        {/* 价格卡片网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch mb-12">
          {t.pricing.tiers.map((tier, idx) => {
            // Pricing-tier → sourcePlan + auto-interest mapping.
            // We intentionally keep this mapping local to the
            // Pricing section so the Contact form has no idea
            // which plan the user clicked.
            let onCta: () => void = () => {};
            if (idx === 0) {
              onCta = () => handlePricingClick('radar');
            } else if (idx === 1) {
              onCta = () => handlePricingClick('core-engine');
            } else if (idx === 2) {
              onCta = () => handlePricingClick('fractional-cmo');
            }

            return (
              <div
                key={idx}
                className={`p-8 md:p-10 flex flex-col border-2 transition-colors duration-300 ${
                  tier.highlight
                    ? 'bg-[#E5FF00] border-[#E5FF00] text-black shadow-2xl'
                    : 'bg-[#0A0A0A] border-white/20 text-white hover:border-white/50'
                }`}
              >
                <div className="mb-6">
                  <p className="text-xs font-bold tracking-wider mb-4">0{idx + 1} / {tier.mode}</p>
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
                  <p className={`mt-4 text-sm font-black leading-snug ${tier.highlight ? 'text-black/75' : 'text-gray-300'}`}>
                    {tier.billing}
                  </p>
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
                      <span className="mt-1 w-2 h-2 shrink-0 bg-current" aria-hidden="true" />
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
                  type="button"
                  onClick={onCta}
                  className={`w-full py-5 text-lg font-black tracking-tight rounded-full transition-colors flex items-center justify-center gap-2 ${
                    tier.highlight
                      ? 'bg-black text-[#E5FF00] hover:bg-zinc-800'
                      : 'bg-white text-black hover:bg-[#E5FF00]'
                  }`}
                >
                  <span>{tier.btn}</span>
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
                    <path d="M3 13L13 3M6 3h7v7" />
                  </svg>
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
            );
          })}
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

        <p className="max-w-3xl mx-auto mt-8 text-center text-xs md:text-sm leading-relaxed text-gray-500">
          {t.pricing.disclaimer}
        </p>

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
