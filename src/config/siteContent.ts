// =============================================================================
// Brand Go Studio - Site Content Configuration
// 所有文案、图片路径、价格数据必须在此文件维护，组件只能引用此文件
// =============================================================================

// -----------------------------------------------------------------------------
// Global Settings
// -----------------------------------------------------------------------------
export const siteSettings = {
  siteName: 'Brand Go Studio',
  logoPath: '/logo.svg',
  logoAlt: 'Brand Go Studio',
  language: 'zh' as 'zh' | 'en',
  setLanguage: (lang: 'zh' | 'en') => {},
};

// -----------------------------------------------------------------------------
// Navigation
// -----------------------------------------------------------------------------
export const navigation = {
  links: [
    { id: 'ai-radar', label_zh: 'AI Radar', label_en: 'AI Radar', href: '#ai-radar' },
    { id: 'solutions', label_zh: 'Solutions', label_en: 'Solutions', href: '#solutions' },
    { id: 'cases', label_zh: 'Cases', label_en: 'Cases', href: '#cases' },
    { id: 'pricing', label_zh: 'Pricing', label_en: 'Pricing', href: '#pricing' },
  ],
  signInButton: {
    label_zh: 'Sign In',
    label_en: 'Sign In',
  },
};

// -----------------------------------------------------------------------------
// Hero Section
// -----------------------------------------------------------------------------
export const heroSection = {
  title_zh: '让中国品牌赢在全球舞台',
  title_en: 'Let Chinese Brands Win on the Global Stage',
  subtitle_zh: 'AI驱动的出海营销武器库，精准定位、强势破局、本土化落地',
  subtitle_en: 'AI-Powered Outbound Marketing Arsenal — Precision Targeting, Breakthrough, Localization',
  primaryButton: {
    label_zh: '了解三擎模型',
    label_en: 'Explore 3-Engine System',
    href: '#solutions',
  },
  secondaryButton: {
    label_zh: '预约诊断',
    label_en: 'Book Diagnosis',
    href: '#pricing',
  },
};

// -----------------------------------------------------------------------------
// Manifesto Section
// -----------------------------------------------------------------------------
export const manifestoSection = {
  eyebrow_zh: '行业开炮',
  eyebrow_en: 'Industry Manifesto',
  headline_zh: '出海不是冒险',
  headline_en: 'Going Global Is Not Gambling',
  paragraphs_zh: [
    '大多数品牌在海外溺亡，不是因为产品差，而是因为看不清战场。',
    '信息差、判断差、执行差——三重鸿沟吞噬了无数野心。',
    '我们不是代理商，我们是你的第二大脑。',
    '用AI撕开信息壁垒，用数据重构决策链路。',
  ],
  paragraphs_en: [
    'Most brands drown overseas, not because of poor products, but because they can\'t see the battlefield.',
    'Information gap, judgment gap, execution gap — three chasms devour countless ambitions.',
    'We are not an agency. We are your second brain.',
    'Tear down information barriers with AI. Rebuild decision chains with data.',
  ],
};

// -----------------------------------------------------------------------------
// AI Weapon Section
// -----------------------------------------------------------------------------
export const aiWeaponSection = {
  eyebrow_zh: 'AI 战情室',
  eyebrow_en: 'AI War Room',
  title_zh: '你的市场洞察超级引擎',
  title_en: 'Your Market Intelligence Super Engine',
  dashboardImage: '/dashboard-mockup.png',
  dashboardImageAlt_zh: 'AI战情室数据看板',
  dashboardImageAlt_en: 'AI War Room Dashboard',
  features: [
    {
      id: 'scan',
      title_zh: '扫描盲区',
      title_en: 'Scan Blind Spots',
      description_zh: 'AI实时追踪竞品动态，识别市场空白点与新兴机会',
      description_en: 'AI tracks competitor movements in real-time, identifying market gaps and emerging opportunities',
      icon: 'scan',
    },
    {
      id: 'lock',
      title_zh: '锁定空隙',
      title_en: 'Lock Target Gaps',
      description_zh: '精准定位细分人群，锁定竞争对手忽视的高价值用户群',
      description_en: 'Precisely target segments and lock onto high-value user groups competitors overlook',
      icon: 'lock',
    },
    {
      id: 'localize',
      title_zh: '本土化落地',
      title_en: 'Localize & Land',
      description_zh: '深度本地化策略，让品牌真正融入目标市场的文化语境',
      description_en: 'Deep localization strategies that integrate your brand into target market cultural contexts',
      icon: 'localize',
    },
  ],
};

// -----------------------------------------------------------------------------
// Services Section (3-Engine System)
// -----------------------------------------------------------------------------
export const servicesSection = {
  eyebrow_zh: '三擎模型',
  eyebrow_en: '3-Engine System',
  title_zh: '三位一体的增长引擎',
  title_en: 'The Trinity Growth System',
  subtitle_zh: '战略、内容、投流，缺一不可',
  subtitle_en: 'Strategy, Content, Media Buying — All Three Are Essential',
  engines: [
    {
      id: 'strategy',
      title_zh: '战略引擎',
      title_en: 'Strategy Engine',
      tagline_zh: '洞察驱动决策',
      tagline_en: 'Insight-Driven Decisions',
      description_zh: '基于AI大数据分析，深度研究目标市场、竞品格局、用户画像，制定精准出海战略路径。',
      description_en: 'Based on AI big data analysis, deep research on target markets, competitor landscape, and user personas to formulate precise global strategy.',
      features_zh: [
        '市场机会评估',
        '竞品深度分析',
        '用户画像建模',
        '进入策略制定',
      ],
      features_en: [
        'Market opportunity assessment',
        'Deep competitor analysis',
        'User persona modeling',
        'Entry strategy formulation',
      ],
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      id: 'content',
      title_zh: '内容引擎',
      title_en: 'Content Engine',
      tagline_zh: '创意驱动传播',
      tagline_en: 'Creativity-Driven Distribution',
      description_zh: '结合AI生成能力与本土创意团队，打造符合目标市场审美与文化的高质量内容矩阵。',
      description_en: 'Combining AI generation with local creative teams to build high-quality content matrices matching target market aesthetics and culture.',
      features_zh: [
        '品牌故事重构',
        '多语言内容生产',
        '本地化创意适配',
        '跨平台内容分发',
      ],
      features_en: [
        'Brand story reconstruction',
        'Multi-language content production',
        'Localized creative adaptation',
        'Cross-platform content distribution',
      ],
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      id: 'media',
      title_zh: '投流引擎',
      title_en: 'Media Engine',
      tagline_zh: '效率驱动增长',
      tagline_en: 'Efficiency-Driven Growth',
      description_zh: '智能投放系统实时优化广告表现，精准触达目标人群，最大化ROI。',
      description_en: 'Intelligent ad system for real-time optimization, precise targeting, and maximized ROI.',
      features_zh: [
        '智能投放优化',
        '多渠道整合管理',
        '实时效果追踪',
        'ROI最大化',
      ],
      features_en: [
        'Smart campaign optimization',
        'Multi-channel integration',
        'Real-time performance tracking',
        'ROI maximization',
      ],
      gradient: 'from-purple-500 to-pink-500',
    },
  ],
};

// -----------------------------------------------------------------------------
// Case Study Section
// -----------------------------------------------------------------------------
export const caseStudySection = {
  eyebrow_zh: '硬核复盘',
  eyebrow_en: 'Case Study',
  backgroundImage: '/case-study-bg.jpg',
  tags: [
    { label_zh: '消费电子', label_en: 'Consumer Electronics' },
    { label_zh: '欧美市场', label_en: 'EU & US Market' },
    { label_zh: '品牌建设', label_en: 'Brand Building' },
  ],
  title_zh: '从0到1亿：消费电子品牌的出海破局之路',
  title_en: 'From Zero to 100M: A Consumer Electronics Brand\'s Breakthrough Journey',
  description_zh: '通过AI市场扫描发现蓝海赛道，本土化内容策略实现品牌溢价，智能投流带来持续增长。12个月，品牌从默默无闻到品类TOP3。',
  description_en: 'Through AI market scanning to discover blue ocean tracks, localized content strategy to achieve brand premium, and smart media buying for sustained growth. 12 months from obscurity to category TOP3.',
  metrics: [
    { value: '12', unit_zh: '个月', unit_en: 'Months', label_zh: '市场突破', label_en: 'To Market Breakthrough' },
    { value: '100M+', unit_zh: '', unit_en: '', label_zh: '年GMV', label_en: 'Annual GMV' },
    { value: 'TOP3', unit_zh: '', unit_en: '', label_zh: '品类排名', label_en: 'Category Ranking' },
    { value: '380%', unit_zh: '', unit_en: '', label_zh: 'ROI提升', label_en: 'ROI Increase' },
  ],
};

// -----------------------------------------------------------------------------
// Pricing Section
// -----------------------------------------------------------------------------
export const pricingSection = {
  eyebrow_zh: '伴跑报价',
  eyebrow_en: 'Partnership Pricing',
  title_zh: '让我们开始共创',
  title_en: 'Let\'s Start Creating Together',
  invitationCard: {
    title_zh: '品牌出海月度顾问服务',
    title_en: 'Monthly Brand Globalization Advisory',
    subtitle_zh: '适合志在长远的成长型品牌',
    subtitle_en: 'For Growth-Oriented Brands with Long-Term Vision',
    price: '1,999',
    currency: '¥',
    period_zh: '元/月',
    period_en: '/month',
    features_zh: [
      'AI市场扫描与竞品监测（周报）',
      '月度战略咨询与复盘会议',
      '内容策略与本土化建议',
      '投流策略指导与效果追踪',
    ],
    features_en: [
      'AI market scanning & competitor monitoring (weekly reports)',
      'Monthly strategic consulting & review meetings',
      'Content strategy & localization advice',
      'Media buying guidance & performance tracking',
    ],
    cta_zh: '预约咨询',
    cta_en: 'Book Consultation',
  },
  note_zh: '* 首月合作可享7天无条件退款保证',
  note_en: '* First month comes with 7-day unconditional refund guarantee',
};

// -----------------------------------------------------------------------------
// Footer
// -----------------------------------------------------------------------------
export const footer = {
  copyright_zh: '© 2026 Brand Go Studio. 赋能中国品牌全球化。',
  copyright_en: '© 2026 Brand Go Studio. Empowering Chinese Brands for Global Success.',
  socialLinks: [
    { name: 'LinkedIn', icon: 'linkedin', url: '#' },
    { name: 'Twitter', icon: 'twitter', url: '#' },
    { name: 'WeChat', icon: 'wechat', url: '#' },
  ],
};

// -----------------------------------------------------------------------------
// Helper Hook - Language Aware Content
// -----------------------------------------------------------------------------
export const useContent = (lang: 'zh' | 'en' = 'zh') => {
  const t = <T extends Record<string, any>>(obj: T, key: keyof T): any => {
    const value = obj[key];
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      if ('label_zh' in value && 'label_en' in value) {
        return lang === 'zh' ? value.label_zh : value.label_en;
      }
      if ('title_zh' in value && 'title_en' in value) {
        return lang === 'zh' ? value.title_zh : value.title_en;
      }
      if ('description_zh' in value && 'description_en' in value) {
        return lang === 'zh' ? value.description_zh : value.description_en;
      }
    }
    return value;
  };

  const getLocalized = <T extends Record<string, any>>(
    obj: T,
    key: keyof T,
    suffix: '_zh' | '_en' = lang === 'zh' ? '_zh' : '_en'
  ): any => {
    const localizedKey = `${String(key)}${suffix}`;
    return obj[localizedKey] || obj[key];
  };

  return { t, getLocalized, lang };
};
