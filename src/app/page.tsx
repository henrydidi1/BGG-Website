"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

type Lang = "en" | "zh";

const copy = {
  en: {
    nav: [
      ["what", "What We Do"],
      ["who", "Who We Help"],
      ["examples", "Examples"],
      ["process", "How We Work"],
      ["founders", "Founders"],
    ],
    hero: {
      eyebrow: "CROSS-BORDER SPORTS PARTNERSHIPS",
      a: "Connecting",
      b: "brands and sport",
      c: "across markets.",
      body: "Sponsor Key helps ambitious Chinese brands build international sports partnerships while helping global rights holders develop meaningful commercial relationships with China.",
      cta: "Start a Conversation",
      more: "See What We Do",
    },
    strip: [
      ["CHINA ↔ EUROPE", "Bridging markets through sport"],
      ["STRATEGY", "Start with clarity"],
      ["PARTNERSHIPS", "Build the right relationships"],
      ["ACTIVATION", "Turn rights into real-world impact"],
    ],
    what: {
      kicker: "WHAT WE DO",
      title: "Sponsorship is not media buying. It is market entry through sport.",
      intro: "We work across the commercial journey — from market logic and rights selection to negotiation, activation and long-term partnership value.",
      cards: [
        ["01", "Cross-Border Strategy", "Define the role of sport in market entry, clarify audiences and build a sponsorship thesis around real commercial objectives."],
        ["02", "Rights & Partner Matching", "Identify relevant clubs, federations, events and rights holders, then structure the conversations that can become credible partnerships."],
        ["03", "Activation & Partnership Development", "Translate rights into locally relevant campaigns, stakeholder relationships and measurable value beyond logo placement."],
      ],
    },
    who: {
      kicker: "WHO WE HELP",
      title: "Two sides of one market bridge.",
      a: "Chinese brands going global",
      ad: "EV, technology, consumer, outdoor and growth-stage businesses seeking credibility, local relevance and access in international markets.",
      b: "Global sports rights holders",
      bd: "Clubs, federations, events and properties seeking commercially serious relationships with brands and decision-makers in China.",
    },
    examples: {
      kicker: "MARKET EXAMPLES",
      title: "The market is already moving.",
      note: "Public market examples for context only. These are not Sponsor Key client projects.",
      rows: [
        ["MOBILITY × FOOTBALL", "BYD × UEFA EURO", "A visible example of a Chinese mobility brand using elite European football to accelerate international familiarity and trust."],
        ["CONSUMER TECH × FOOTBALL", "Hisense × UEFA", "A sustained European football presence showing how sponsorship can support long-term category credibility across markets."],
        ["TECHNOLOGY × GLOBAL SPORT", "Alibaba × Olympic Movement", "A global partnership illustrating how a Chinese enterprise brand can use sport as a platform for reputation, access and international relevance."],
      ],
    },
    process: {
      kicker: "HOW WE WORK",
      title: "Clarity first. Rights second. Activation always.",
      steps: [
        ["01", "Clarify", "Business objective, market priority, audience and commercial constraints."],
        ["02", "Match", "Build a focused shortlist of rights, properties and partnership routes."],
        ["03", "Negotiate", "Shape the commercial structure, rights package and cross-border conversation."],
        ["04", "Activate", "Turn the partnership into a market-facing platform with long-term value."],
      ],
    },
    perspective: {
      kicker: "INTERNATIONAL PERSPECTIVE",
      title: "China ↔ Europe",
      body: "Sponsor Key sits between two commercial cultures. We translate not just language, but expectations, decision-making, value logic and the realities of partnership execution.",
      cn: "China market understanding",
      eu: "European sports access",
      bridge: "SPORT AS THE COMMERCIAL BRIDGE",
    },
    founders: {
      kicker: "FOUNDERS",
      title: "Built from both sides of the partnership table.",
      dname: "Declan Flynn",
      drole: "Co-Founder · International Partnerships",
      dbody: "MBA in Football Industries with experience in international commercial agreements and partnership development. Declan brings an operator's understanding of European sports properties, rights-holder priorities and relationship-led dealmaking.",
      yname: "Yusheng Yang",
      yrole: "Co-Founder · Cross-Border Strategy",
      ybody: "Finance background at Lancaster University and MSc Project Management at Warwick, with more than a decade in brand operations, marketing and GTM. Yusheng focuses on what Chinese outbound businesses need to build authority and commercial relevance internationally.",
    },
    contact: {
      kicker: "CONTACT",
      title: "Start with the opportunity, not the pitch deck.",
      body: "Tell us what market, brand or sports property you are thinking about. We will take it from there.",
      name: "Name",
      company: "Company",
      email: "Corporate email",
      message: "How can we help?",
      submit: "Start a Conversation",
      direct: "Or email partnerships@sponsorkey.global",
    },
    footer: "Cross-border sports partnerships · China ↔ Europe",
  },
  zh: {
    nav: [
      ["what", "我们做什么"],
      ["who", "服务对象"],
      ["examples", "市场案例"],
      ["process", "合作方式"],
      ["founders", "创始人"],
    ],
    hero: {
      eyebrow: "跨境体育赞助合作",
      a: "连接品牌与体育",
      b: "跨越市场",
      c: "创造长期价值。",
      body: "Sponsor Key 帮助有全球化雄心的中国品牌建立国际体育合作，同时帮助全球体育版权方与中国市场建立有价值、可持续的商业关系。",
      cta: "开始沟通",
      more: "了解我们做什么",
    },
    strip: [
      ["中国 ↔ 欧洲", "以体育连接市场"],
      ["战略", "先把方向看清"],
      ["合作", "找到真正合适的关系"],
      ["激活", "让权益转化为真实影响"],
    ],
    what: {
      kicker: "我们做什么",
      title: "赞助不是买广告位，而是通过体育进入市场。",
      intro: "从市场判断、权益选择与商业谈判，到合作激活和长期价值，我们参与赞助合作的完整商业链路。",
      cards: [
        ["01", "跨境赞助战略", "明确体育赞助在市场进入中的角色、目标受众与商业目标，建立清晰可执行的赞助逻辑。"],
        ["02", "体育权益与伙伴匹配", "筛选与品牌市场目标真正相关的俱乐部、协会、赛事和体育资产，并推动高质量商业对话。"],
        ["03", "赞助激活与合作发展", "把赞助权益转化为本地化传播、利益相关方关系与可衡量的商业价值，而不是停留在 Logo 曝光。"],
      ],
    },
    who: {
      kicker: "服务对象",
      title: "连接同一条商业桥梁的两端。",
      a: "正在全球化的中国品牌",
      ad: "新能源、科技、消费、户外以及成长型企业，希望在海外建立可信度、本地相关性与真实市场入口。",
      b: "全球体育版权方",
      bd: "俱乐部、体育协会、赛事及其他体育资产，希望与中国品牌和决策者建立严肃、长期的商业合作。",
    },
    examples: {
      kicker: "市场案例",
      title: "市场已经在发生变化。",
      note: "以下均为公开市场案例，仅用于展示行业趋势，并非 Sponsor Key 客户项目。",
      rows: [
        ["新能源 × 足球", "BYD × UEFA EURO", "中国汽车品牌通过欧洲顶级足球资产快速建立国际认知和品牌信任的代表性案例。"],
        ["消费科技 × 足球", "Hisense × UEFA", "长期投入欧洲足球赞助，展示赞助如何持续支撑品牌在海外市场的品类认知和可信度。"],
        ["科技 × 全球体育", "Alibaba × Olympic Movement", "中国企业通过全球体育平台建立国际声誉、商业触点和长期市场相关性的典型路径。"],
      ],
    },
    process: {
      kicker: "合作方式",
      title: "先把方向看清，再谈权益；合作必须落到激活。",
      steps: [
        ["01", "明确目标", "厘清商业目标、重点市场、目标人群和现实约束。"],
        ["02", "精准匹配", "建立聚焦的体育权益、赛事与合作路径清单。"],
        ["03", "商业谈判", "设计合作结构、权益组合，并推进跨境商业沟通。"],
        ["04", "落地激活", "让赞助成为真正面向市场的长期商业平台。"],
      ],
    },
    perspective: {
      kicker: "国际视角",
      title: "中国 ↔ 欧洲",
      body: "Sponsor Key 位于两种商业文化之间。我们翻译的不只是语言，更包括双方的商业预期、决策方式、价值逻辑，以及合作真正落地时的现实问题。",
      cn: "理解中国企业",
      eu: "连接欧洲体育",
      bridge: "以体育成为商业桥梁",
    },
    founders: {
      kicker: "创始人",
      title: "团队来自合作关系的两端。",
      dname: "Declan Flynn",
      drole: "联合创始人 · 国际合作",
      dbody: "Football Industries MBA 背景，并拥有国际商业协议与合作伙伴开发经验。Declan 更理解欧洲体育版权方的商业逻辑、合作优先级以及以关系为核心的交易方式。",
      yname: "杨雨昇 Yusheng Yang",
      yrole: "联合创始人 · 跨境战略",
      ybody: "Lancaster University 金融背景、Warwick University 项目管理硕士，拥有十余年品牌运营、营销与 GTM 实践经验，专注理解中国企业出海时如何在国际市场建立权威、信任与商业相关性。",
    },
    contact: {
      kicker: "联系",
      title: "先从机会开始，不必先准备一份完整 Pitch Deck。",
      body: "告诉我们你正在考虑的市场、品牌或体育资产，我们可以从这里开始。",
      name: "姓名",
      company: "公司",
      email: "工作邮箱",
      message: "你希望我们如何协助？",
      submit: "开始沟通",
      direct: "或直接邮件至 partnerships@sponsorkey.global",
    },
    footer: "跨境体育赞助合作 · 中国 ↔ 欧洲",
  },
} as const;

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Glyph({ kind }: { kind: number }) {
  if (kind === 0) return <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="10"/><circle cx="16" cy="16" r="4"/><path d="M16 2v4M30 16h-4M16 30v-4M2 16h4"/></svg>;
  if (kind === 1) return <svg viewBox="0 0 32 32"><circle cx="11" cy="16" r="7"/><circle cx="21" cy="16" r="7"/><path d="M14 11l4 10M18 11l-4 10"/></svg>;
  if (kind === 2) return <svg viewBox="0 0 32 32"><path d="M5 24V15M12 24V10M19 24V14M26 24V6"/><path d="M4 7l7 2 7-4 9 2"/></svg>;
  return <svg viewBox="0 0 32 32"><path d="M3 22c5-9 9-12 13-12s8 3 13 12"/><path d="M7 22h18M16 10v12"/></svg>;
}

export default function SponsorKeyPreview() {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const t = copy[lang];
  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Sponsor Key enquiry — ${String(data.get("company") || data.get("name") || "Website")}`);
    const body = encodeURIComponent(`Name: ${String(data.get("name") || "")}\nCompany: ${String(data.get("company") || "")}\nEmail: ${String(data.get("email") || "")}\n\n${String(data.get("message") || "")}`);
    window.location.href = `mailto:partnerships@sponsorkey.global?subject=${subject}&body=${body}`;
  };

  const reveal = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.65 } };

  return (
    <main className="sk-site">
      <header className="sk-nav">
        <button className="brand" onClick={() => jump("top")}>SponsorKey.<strong>Global</strong></button>
        <nav className="desktop-links">
          {t.nav.map(([id, label]) => <button key={id} onClick={() => jump(id)}>{label}</button>)}
        </nav>
        <div className="nav-actions">
          <div className="lang"><button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button><span>/</span><button className={lang === "zh" ? "active" : ""} onClick={() => setLang("zh")}>中文</button></div>
          <button className="gold small" onClick={() => jump("contact")}>{t.hero.cta}<Arrow/></button>
          <button className="burger" onClick={() => setMenu(v => !v)} aria-label="Menu"><span/><span/></button>
        </div>
        {menu && <div className="mobile-links">{[...t.nav, ["perspective", lang === "en" ? "Perspective" : "国际视角"], ["contact", lang === "en" ? "Contact" : "联系"]].map(([id,label]) => <button key={id} onClick={() => jump(id)}>{label}</button>)}</div>}
      </header>

      <section id="top" className="hero">
        <div className="hero-photo"/><div className="hero-overlay"/>
        <div className="contours" aria-hidden="true"><i/><i/><i/><i/><i/></div>
        <motion.div className="hero-copy" initial={{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{duration:.9}}>
          <div className="kicker"><span/>{t.hero.eyebrow}</div>
          <h1><span>{t.hero.a}</span><span>{t.hero.b}</span><em>{t.hero.c}</em></h1>
          <p>{t.hero.body}</p>
          <div className="hero-actions"><button className="gold" onClick={() => jump("contact")}>{t.hero.cta}<Arrow/></button><button className="ghost" onClick={() => jump("what")}>{t.hero.more} ↓</button></div>
        </motion.div>
        <div className="pager"><b>01</b><div><span/><span/><span/><span/><span/><span/><span/></div><small>07</small></div>
        <div className="hero-strip">
          {t.strip.map((x,i)=><div className="strip-cell" key={x[0]}><span className="round"><Glyph kind={i}/></span><div><b>{x[0]}</b><small>{x[1]}</small></div></div>)}
        </div>
      </section>

      <section id="what" className="section">
        <div className="heading"><motion.div {...reveal}><div className="section-kicker">02 · {t.what.kicker}</div><h2>{t.what.title}</h2></motion.div><motion.p {...reveal}>{t.what.intro}</motion.p></div>
        <div className="cards3">{t.what.cards.map((x,i)=><motion.article key={x[0]} className="tactile raised service" {...reveal}><span className="number">{x[0]}</span><span className="emboss"><Glyph kind={i}/></span><h3>{x[1]}</h3><p>{x[2]}</p></motion.article>)}</div>
      </section>

      <section id="who" className="section alt">
        <motion.div className="solo" {...reveal}><div className="section-kicker">03 · {t.who.kicker}</div><h2>{t.who.title}</h2></motion.div>
        <div className="cards2"><motion.article className="who tactile inset" {...reveal}><span>A</span><h3>{t.who.a}</h3><p>{t.who.ad}</p><div className="tags"><b>EV</b><b>TECH</b><b>CONSUMER</b><b>OUTDOOR</b></div></motion.article><motion.article className="who tactile raised" {...reveal}><span>B</span><h3>{t.who.b}</h3><p>{t.who.bd}</p><div className="tags"><b>CLUBS</b><b>FEDERATIONS</b><b>EVENTS</b><b>RIGHTS</b></div></motion.article></div>
      </section>

      <section id="examples" className="section">
        <div className="heading"><motion.div {...reveal}><div className="section-kicker">04 · {t.examples.kicker}</div><h2>{t.examples.title}</h2></motion.div><motion.p className="notice" {...reveal}>{t.examples.note}</motion.p></div>
        <div className="example-list">{t.examples.rows.map((x,i)=><motion.article className="example" key={x[1]} {...reveal}><span>0{i+1}</span><small>{x[0]}</small><h3>{x[1]}</h3><p>{x[2]}</p><b>↗</b></motion.article>)}</div>
      </section>

      <section id="process" className="section alt">
        <motion.div className="solo" {...reveal}><div className="section-kicker">05 · {t.process.kicker}</div><h2>{t.process.title}</h2></motion.div>
        <div className="cards4">{t.process.steps.map((x,i)=><motion.article key={x[0]} className={`step ${i%2 ? "pressed" : "lifted"}`} {...reveal}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></motion.article>)}</div>
      </section>

      <section id="perspective" className="section perspective">
        <div className="orb"/>
        <motion.div className="pers-copy" {...reveal}><div className="section-kicker">06 · {t.perspective.kicker}</div><h2>{t.perspective.title}</h2><p>{t.perspective.body}</p></motion.div>
        <motion.div className="bridge" {...reveal}><div className="tower"><b>CN</b><small>{t.perspective.cn}</small></div><div className="ridges"><i/><i/><i/><i/><i/><span>{t.perspective.bridge}</span></div><div className="tower"><b>EU</b><small>{t.perspective.eu}</small></div></motion.div>
      </section>

      <section id="founders" className="section alt">
        <motion.div className="solo" {...reveal}><div className="section-kicker">07 · {t.founders.kicker}</div><h2>{t.founders.title}</h2></motion.div>
        <div className="cards2 founders"><motion.article className="founder tactile raised" {...reveal}><span className="avatar">DF</span><div><h3>{t.founders.dname}</h3><b>{t.founders.drole}</b><p>{t.founders.dbody}</p></div></motion.article><motion.article className="founder tactile inset" {...reveal}><span className="avatar">YY</span><div><h3>{t.founders.yname}</h3><b>{t.founders.yrole}</b><p>{t.founders.ybody}</p></div></motion.article></div>
      </section>

      <section id="contact" className="section contact">
        <motion.div className="contact-copy" {...reveal}><div className="section-kicker">08 · {t.contact.kicker}</div><h2>{t.contact.title}</h2><p>{t.contact.body}</p><a href="mailto:partnerships@sponsorkey.global">{t.contact.direct} <Arrow/></a></motion.div>
        <motion.form className="form tactile raised" onSubmit={submit} {...reveal}><label>{t.contact.name}<input name="name" required/></label><label>{t.contact.company}<input name="company"/></label><label>{t.contact.email}<input name="email" type="email" required/></label><label className="full">{t.contact.message}<textarea name="message" rows={5}/></label><button className="gold full" type="submit">{t.contact.submit}<Arrow/></button></motion.form>
      </section>

      <footer><div className="brand foot-brand">SponsorKey.<strong>Global</strong></div><span>{t.footer}</span><span>© 2026 Sponsor Key</span></footer>

      <style jsx global>{`
        :root{--bg:#090b0d;--alt:#0d1013;--panel:#11151a;--ink:#f2f1ec;--muted:#9299a1;--gold:#d4af37;--gold2:#e6cb72;--line:rgba(255,255,255,.085)}
        *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg)!important;color:var(--ink)!important;font-family:var(--font-geist-sans),Arial,sans-serif!important}.sk-site{background:var(--bg);overflow:hidden}button,input,textarea{font:inherit}button{color:inherit}a{color:inherit;text-decoration:none}#what,#who,#examples,#process,#perspective,#founders,#contact{scroll-margin-top:76px}
        .sk-nav{height:76px;position:fixed;z-index:80;inset:0 0 auto;display:flex;align-items:center;padding:0 3.3vw;gap:22px;background:linear-gradient(180deg,rgba(8,10,12,.97),rgba(8,10,12,.77));backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.07)}.brand{border:0;background:none;padding:0;cursor:pointer;font-size:19px;font-weight:650;letter-spacing:-.045em;white-space:nowrap}.brand strong{color:var(--gold);font-weight:650}.desktop-links{margin-left:auto;display:flex;align-items:center;gap:23px}.desktop-links button{border:0;background:none;color:#bfc3c7;font-size:11px;cursor:pointer;padding:10px 0}.desktop-links button:hover{color:var(--gold2)}.nav-actions{display:flex;align-items:center;gap:12px}.lang{display:flex;align-items:center;gap:6px;border-radius:99px;padding:8px 10px;background:#0d1013;color:#69717a;box-shadow:inset 3px 3px 7px #050607,inset -2px -2px 5px rgba(255,255,255,.035);font-size:10px}.lang button{border:0;background:none;color:#717982;padding:0;cursor:pointer}.lang button.active{color:var(--gold2)}.gold{min-height:51px;border:1px solid rgba(255,255,255,.12);background:var(--gold);color:#10100d;font-weight:650;padding:0 21px;display:inline-flex;align-items:center;justify-content:center;gap:12px;cursor:pointer;box-shadow:0 10px 28px rgba(212,175,55,.16),inset 1px 1px 0 rgba(255,255,255,.38),inset -2px -2px 0 rgba(91,68,4,.2)}.gold:hover{background:#e2c55d;transform:translateY(-1px)}.gold svg,.contact-copy svg{width:17px;height:17px}.gold.small{min-height:40px;padding:0 15px;font-size:10px}.burger{display:none;width:42px;height:42px;border:0;background:none;padding:10px;cursor:pointer}.burger span{display:block;height:1px;background:#eee;margin:6px 0}.mobile-links{display:none}
        .hero{min-height:100svh;padding-top:76px;position:relative;display:flex;overflow:hidden;border-bottom:1px solid var(--line)}.hero-photo{position:absolute;inset:0 0 0 42%;background:url('https://unsplash.com/photos/abV5LdRGo_k/download?force=true&w=2200') center/cover no-repeat;filter:saturate(.62) contrast(1.12) brightness(.58);transform:scale(1.015)}.hero-overlay{position:absolute;inset:0;background:linear-gradient(90deg,#080a0c 0%,#080a0c 35%,rgba(8,10,12,.92) 48%,rgba(8,10,12,.28) 77%,rgba(8,10,12,.58) 100%),linear-gradient(0deg,rgba(8,10,12,.92) 0%,transparent 35%)}.contours{position:absolute;left:-180px;top:13%;width:520px;height:520px;opacity:.34}.contours i{position:absolute;border-radius:50%;border:1px solid rgba(255,255,255,.024);box-shadow:4px 4px 10px rgba(0,0,0,.8),-2px -2px 5px rgba(255,255,255,.015),inset 3px 3px 8px rgba(255,255,255,.01),inset -3px -3px 8px rgba(0,0,0,.7)}.contours i:nth-child(1){inset:0}.contours i:nth-child(2){inset:34px}.contours i:nth-child(3){inset:68px}.contours i:nth-child(4){inset:102px}.contours i:nth-child(5){inset:136px}.hero-copy{position:relative;z-index:3;width:min(790px,65vw);padding:9vh 0 180px 6vw;align-self:center}.kicker,.section-kicker{display:flex;align-items:center;gap:12px;color:var(--gold2);font-size:10px;font-weight:650;letter-spacing:.16em;text-transform:uppercase}.kicker span{width:34px;height:1px;background:var(--gold)}h1,h2,.example h3,.founder h3{font-family:Georgia,'Times New Roman',serif}.hero h1{margin:27px 0 25px;font-weight:400;font-size:clamp(62px,7.25vw,124px);line-height:.89;letter-spacing:-.057em}.hero h1 span,.hero h1 em{display:block}.hero h1 em{font-style:normal;color:var(--gold2)}.hero-copy>p{max-width:640px;color:#b8bdc2;font-size:14px;line-height:1.78}.hero-actions{display:flex;align-items:center;gap:28px;margin-top:34px}.ghost{border:0;background:none;color:#e5e5e0;cursor:pointer;font-size:12px}.ghost:hover{color:var(--gold2)}.pager{position:absolute;z-index:4;right:3vw;top:20%;display:flex;flex-direction:column;align-items:center;gap:10px;color:#8d9298}.pager b{color:var(--gold2);font-size:12px}.pager small{font-size:9px}.pager>div{height:165px;width:1px;background:rgba(255,255,255,.13);display:flex;flex-direction:column;justify-content:space-between}.pager>div span{width:5px;height:5px;border-radius:50%;background:#484b4f;transform:translateX(-2px)}.pager>div span:first-child{background:var(--gold);box-shadow:0 0 0 4px rgba(212,175,55,.09)}.hero-strip{position:absolute;z-index:5;bottom:0;left:0;right:0;min-height:126px;display:grid;grid-template-columns:repeat(4,1fr);background:rgba(8,10,12,.9);backdrop-filter:blur(15px);border-top:1px solid rgba(255,255,255,.08)}.strip-cell{display:flex;gap:15px;align-items:center;padding:24px 2.7vw;border-right:1px solid rgba(255,255,255,.07)}.strip-cell:last-child{border:0}.round,.emboss{display:grid;place-items:center;border-radius:50%;background:#0e1114;box-shadow:8px 8px 17px rgba(0,0,0,.78),-4px -4px 11px rgba(255,255,255,.018),inset 1px 1px 0 rgba(255,255,255,.035)}.round{width:46px;height:46px;flex:0 0 46px}.round svg,.emboss svg{width:25px;height:25px;fill:none;stroke:var(--gold2);stroke-width:1.15}.strip-cell b{display:block;font-size:10px;letter-spacing:.09em;margin-bottom:6px}.strip-cell small{display:block;color:#777f87;font-size:10px;line-height:1.4;max-width:155px}
        .section{padding:118px 6vw;position:relative;border-bottom:1px solid var(--line);background:var(--bg)}.section.alt{background:var(--alt)}.heading{display:grid;grid-template-columns:1.45fr .55fr;gap:8vw;align-items:end;margin-bottom:60px}.heading h2,.solo h2,.pers-copy h2,.contact-copy h2{margin:18px 0 0;font-weight:400;font-size:clamp(42px,5vw,78px);line-height:.98;letter-spacing:-.047em}.heading>p{color:var(--muted);font-size:13px;line-height:1.75;max-width:465px}.cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.tactile{border:1px solid rgba(255,255,255,.05)}.raised{background:linear-gradient(145deg,#13171b,#0e1114);box-shadow:15px 15px 34px rgba(0,0,0,.56),-8px -8px 22px rgba(255,255,255,.017),inset 1px 1px 0 rgba(255,255,255,.035),inset -1px -1px 0 rgba(0,0,0,.6)}.inset{background:#0d1013;box-shadow:inset 10px 10px 23px rgba(0,0,0,.72),inset -6px -6px 17px rgba(255,255,255,.018),1px 1px 0 rgba(255,255,255,.018)}.service{min-height:420px;padding:30px;position:relative}.number{color:#626a72;font-size:10px;letter-spacing:.1em}.emboss{width:68px;height:68px;margin:64px 0 30px}.service h3,.who h3,.step h3{font-size:20px;margin:0 0 14px;font-weight:600}.service p,.who p,.step p,.founder p{color:#89919a;font-size:12px;line-height:1.7}.solo{margin-bottom:55px}.cards2{display:grid;grid-template-columns:1fr 1fr;gap:22px}.who{min-height:400px;padding:38px;display:flex;flex-direction:column}.who>span{color:var(--gold2);font-size:10px}.who h3{font-family:Georgia,serif;font-size:38px;font-weight:400;letter-spacing:-.04em;margin-top:auto}.who p{max-width:560px}.tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:28px}.tags b{border:1px solid rgba(255,255,255,.08);color:#737b84;font-size:8px;letter-spacing:.13em;padding:7px 9px;font-weight:500}.notice{border-left:1px solid var(--gold);padding-left:17px}.example-list{border-top:1px solid var(--line)}.example{min-height:154px;display:grid;grid-template-columns:55px 185px minmax(230px,1fr) minmax(320px,1.3fr) 38px;gap:22px;align-items:center;border-bottom:1px solid var(--line)}.example>span{font-size:9px;color:#555d65}.example>small{color:var(--gold2);font-size:8px;letter-spacing:.13em;line-height:1.45}.example h3{font-weight:400;font-size:28px;letter-spacing:-.035em}.example p{color:#89919a;font-size:11px;line-height:1.7}.example>b{width:35px;height:35px;border-radius:50%;display:grid;place-items:center;background:#0e1114;color:var(--gold2);box-shadow:5px 5px 13px rgba(0,0,0,.68),-3px -3px 8px rgba(255,255,255,.014)}.cards4{display:grid;grid-template-columns:repeat(4,1fr);gap:17px}.step{min-height:280px;padding:28px;border:1px solid rgba(255,255,255,.04)}.step.lifted{background:#101419;box-shadow:10px 10px 26px rgba(0,0,0,.53),-5px -5px 15px rgba(255,255,255,.014)}.step.pressed{background:#0c0f12;box-shadow:inset 9px 9px 20px rgba(0,0,0,.67),inset -5px -5px 14px rgba(255,255,255,.014)}.step>span{color:var(--gold2);font-size:9px;letter-spacing:.12em}.step h3{margin-top:98px}
        .perspective{min-height:720px;display:grid;grid-template-columns:.8fr 1.2fr;gap:7vw;align-items:center;background:radial-gradient(circle at 52% 35%,#161716 0%,#0b0d0f 46%,#080a0c 76%);overflow:hidden}.orb{position:absolute;width:600px;height:600px;border-radius:50%;left:49%;top:50%;transform:translate(-50%,-50%);border:1px solid rgba(255,255,255,.025);box-shadow:inset 28px 28px 70px rgba(0,0,0,.72),inset -18px -18px 52px rgba(255,255,255,.018),0 0 130px rgba(212,175,55,.035)}.pers-copy{position:relative;z-index:2}.pers-copy h2{color:var(--gold2);font-size:clamp(66px,7vw,112px)}.pers-copy p{color:#939aa2;max-width:530px;font-size:13px;line-height:1.8}.bridge{position:relative;z-index:2;display:grid;grid-template-columns:110px 1fr 110px;align-items:center;gap:18px}.tower{height:220px;border-radius:34px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#101317;border:1px solid rgba(255,255,255,.04);box-shadow:13px 13px 30px rgba(0,0,0,.56),-6px -6px 18px rgba(255,255,255,.015)}.tower b{font-family:Georgia,serif;font-size:39px;color:var(--gold2);font-weight:400}.tower small{writing-mode:vertical-rl;margin-top:15px;color:#737b84;font-size:8px;letter-spacing:.08em}.ridges{height:250px;position:relative;display:flex;align-items:center;justify-content:center}.ridges i{position:absolute;left:0;right:0;height:72px;border-radius:50%;border-top:1px solid rgba(212,175,55,.22);box-shadow:0 -6px 18px rgba(212,175,55,.025),inset 0 7px 16px rgba(0,0,0,.72)}.ridges i:nth-child(1){transform:translateY(-64px) scaleX(.9)}.ridges i:nth-child(2){transform:translateY(-32px) scaleX(.95)}.ridges i:nth-child(3){transform:scaleX(1)}.ridges i:nth-child(4){transform:translateY(32px) scaleX(.95)}.ridges i:nth-child(5){transform:translateY(64px) scaleX(.9)}.ridges span{position:relative;z-index:2;font-size:8px;letter-spacing:.12em;color:#baa95e;text-align:center}.founders{margin-top:15px}.founder{min-height:390px;padding:38px;display:grid;grid-template-columns:105px 1fr;gap:32px;align-items:end}.avatar{width:96px;height:96px;border-radius:50%;display:grid;place-items:center;background:#0f1316;color:var(--gold2);font-family:Georgia,serif;font-size:29px;box-shadow:10px 10px 23px rgba(0,0,0,.6),-5px -5px 14px rgba(255,255,255,.014),inset 1px 1px 0 rgba(255,255,255,.03)}.inset .avatar{box-shadow:inset 7px 7px 17px rgba(0,0,0,.7),inset -4px -4px 12px rgba(255,255,255,.015)}.founder h3{font-weight:400;font-size:35px;letter-spacing:-.035em;margin:0}.founder div>b{display:block;margin:9px 0 20px;color:var(--gold2);font-size:9px;text-transform:uppercase;letter-spacing:.1em}.contact{display:grid;grid-template-columns:.8fr 1.2fr;gap:8vw;align-items:start;background:#080a0c}.contact-copy>p{color:#90979f;max-width:515px;font-size:13px;line-height:1.8;margin:24px 0 32px}.contact-copy a{display:inline-flex;align-items:center;gap:10px;color:var(--gold2);font-size:11px}.form{padding:32px;display:grid;grid-template-columns:1fr 1fr;gap:21px}.form label{display:flex;flex-direction:column;gap:9px;color:#89919a;font-size:9px;letter-spacing:.09em;text-transform:uppercase}.form input,.form textarea{border:0;border-bottom:1px solid rgba(255,255,255,.12);background:#0c0f12;color:#eee;padding:14px 5px;outline:none;box-shadow:inset 2px 3px 7px rgba(0,0,0,.65)}.form textarea{resize:vertical;min-height:115px;border:1px solid rgba(255,255,255,.07);padding:14px}.form input:focus,.form textarea:focus{border-color:rgba(212,175,55,.62)}.full{grid-column:1/-1}footer{min-height:100px;padding:0 6vw;display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;border-top:1px solid rgba(255,255,255,.06);color:#666e76;font-size:9px;letter-spacing:.07em}.foot-brand{color:#ddd;font-size:17px}footer>span:nth-child(2){text-align:center}footer>span:last-child{text-align:right}
        @media(max-width:1100px){.desktop-links{display:none}.nav-actions{margin-left:auto}.burger{display:block}.mobile-links{position:absolute;display:flex;top:76px;left:0;right:0;flex-direction:column;padding:18px 6vw 25px;background:#0b0e11;border-bottom:1px solid var(--line)}.mobile-links button{border:0;border-bottom:1px solid rgba(255,255,255,.05);background:none;text-align:left;padding:13px 0}.hero-photo{left:32%}.hero-copy{width:min(770px,77vw)}.cards3{grid-template-columns:1fr}.service{min-height:340px}.emboss{margin-top:38px}.cards4{grid-template-columns:1fr 1fr}.perspective{grid-template-columns:1fr}.example{grid-template-columns:45px 150px minmax(190px,1fr) minmax(250px,1.2fr) 36px;gap:15px}.founder{grid-template-columns:90px 1fr}}
        @media(max-width:760px){.sk-nav{height:66px;padding:0 18px}.brand{font-size:17px}.gold.small{display:none}.mobile-links{top:66px}.hero{padding-top:66px;min-height:920px}.hero-photo{inset:0;background-position:58% center;filter:saturate(.55) contrast(1.08) brightness(.43)}.hero-overlay{background:linear-gradient(180deg,rgba(8,10,12,.72),rgba(8,10,12,.9) 47%,#080a0c 78%)}.hero-copy{width:100%;padding:76px 22px 310px;align-self:flex-start}.hero h1{font-size:clamp(50px,15vw,78px);line-height:.91;margin-top:22px}.hero-copy>p{font-size:12px;max-width:94%}.hero-actions{flex-direction:column;align-items:flex-start;gap:17px}.pager{display:none}.hero-strip{grid-template-columns:1fr 1fr;min-height:250px}.strip-cell{padding:17px 15px}.round{width:38px;height:38px;flex-basis:38px}.round svg{width:21px}.strip-cell b,.strip-cell small{font-size:8px}.section{padding:82px 22px}.heading{grid-template-columns:1fr;gap:20px;margin-bottom:38px}.heading h2,.solo h2,.pers-copy h2,.contact-copy h2{font-size:clamp(38px,11.5vw,58px)}.cards2{grid-template-columns:1fr}.who{min-height:370px;padding:29px}.who h3{font-size:36px}.example{grid-template-columns:34px 1fr 30px;gap:9px 14px;padding:23px 0}.example>span{grid-row:1/4;align-self:start}.example>small,.example h3,.example p{grid-column:2}.example h3{margin:3px 0;font-size:26px}.example p{margin:3px 0}.example>b{grid-column:3;grid-row:1/4;align-self:center}.cards4{grid-template-columns:1fr}.step{min-height:225px}.step h3{margin-top:68px}.perspective{min-height:auto;gap:55px}.pers-copy h2{font-size:60px}.bridge{grid-template-columns:76px 1fr 76px;gap:10px}.tower{height:180px;border-radius:25px}.tower b{font-size:28px}.ridges{height:200px}.founder{min-height:0;padding:27px;grid-template-columns:1fr;gap:25px}.avatar{width:82px;height:82px}.founder h3{font-size:30px}.contact{grid-template-columns:1fr}.form{grid-template-columns:1fr;padding:23px}.full{grid-column:1}footer{grid-template-columns:1fr;gap:12px;padding:27px 22px}footer>span:nth-child(2),footer>span:last-child{text-align:left}}
      `}</style>
    </main>
  );
}
