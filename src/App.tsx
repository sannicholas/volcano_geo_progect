import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Globe, Search, Sparkles, Map as MapIcon, Layers, Activity, Video, Mic, ChevronRight, Battery, AlertTriangle, Crosshair, X, LogOut, User, TrendingUp, Network } from 'lucide-react';

// --- Translations ---
const dict = {
  zh: {
    nav: { s1: "交互规范", s2: "工作流重塑", s3: "图数合一", console: "体验控制台", login: "登录", logout: "退出" },
    hero: { tag: "下一代人工智能驱动引擎", title1: "意图驱动的", title2: "空间智能", desc: "火山全域 GEO 控制台的流式交互与极简重塑。从“地理工具”到“空间大脑”的范式转移。", scroll: "向下滚动探索" },
    s1: { tag: "Key Driver 01", title: "交互重构：\n面向企业的 Stream 流式交互", desc: "打破传统表单与菜单的僵化，引入基于大模型的“对话式+流式生成”体验。在律师处理复杂案件时，系统通过自然语言交互实现全网线索搜集与深度线索关联。流式反馈将海量卷宗、资金流向与人物关系动态串联，让认知资源完全集中于“业务思辨”。", li1: "全局意图命令栏 (Omni-Command Bar)", li2: "所想即所见，实时流式反馈", li3: "渐进式线索渲染与多模态证据链", prompt: "搜集嫌疑人A的全部资金往来线索，并关联其核心利益网络。", res1_title: "线索搜集完毕", res1_desc: "已提取 142 笔异常资金流水", res2_title: "线索关联成功", res2_desc: "发现隐藏利益输送网络" },
    s2: { tag: "Key Driver 02", title: "流程极简：\n基于“渐进式揭示”重塑工作流", desc: "隐藏底层算法复杂性，采用“渐进式揭示”按需提供高级工具。在新能源车辆生产设计中，从全球视角的宏观热力图，到点击异常区域动态展开的微观 3D 电池数字孪生，实现无缝下钻。", li1: "上下文感知菜单 (Contextual UI)", li2: "预测用户意图，按需浮现工具", li3: "从宏观洞察到微观剖析的丝滑过渡", panel_title: "电池温控异常", panel_tag: "高纬度极寒", panel_temp: "当前温度", panel_rate: "衰减速率预测", panel_btn: "调取时序数据流" },
    s3: { tag: "Key Driver 03", title: "视觉升维：打造“图数合一”的\n多模态沉浸式体验", desc: "将数据大屏升级为承载多模态商业意图的超级画布。在电商场景中，精准捕捉用户搜索意图，将产品实词与拓展词升级路径可视化。悬停核心商品节点，即刻浮现高转化拓展词、AI生成营销文案与多模态投放建议。", card_title: "核心产品实词：智能手表", card_tag: "高转化拓展词", card_ai: "AI 建议：将拓展词升级为“运动心率防水智能手表”，预计点击率提升 45%。" },
    cta: { title: "准备好重塑空间智能了吗？", desc: "从概念验证到灯塔项目落地，释放空间计算与多模态大模型的商业潜力。", btn: "启动概念验证 (PoC)" },
    auth: { login_title: "登录 GEO ID", reg_title: "创建 GEO ID", email: "企业邮箱", pass: "密码", login_btn: "登录", reg_btn: "注册", to_reg: "没有 GEO ID？立即创建。", to_login: "已有 GEO ID？直接登录。" }
  },
  en: {
    nav: { s1: "Interaction", s2: "Workflow", s3: "Visualization", console: "Console", login: "Sign In", logout: "Sign Out" },
    hero: { tag: "Next-Gen AI-Driven Engine", title1: "Intent-Driven", title2: "Spatial Intelligence", desc: "Stream UI and progressive disclosure for Volcano GEO Console. A paradigm shift from 'map tool' to 'spatial brain'.", scroll: "Scroll to explore" },
    s1: { tag: "Key Driver 01", title: "Interaction Redefined:\nEnterprise Stream UI", desc: "Breaking the rigidity of traditional forms and menus by introducing an LLM-based 'conversational + streaming' experience. When lawyers handle complex cases, the system uses natural language interaction for comprehensive clue gathering and deep clue association. Streaming feedback dynamically connects massive files, fund flows, and character relationships, focusing cognitive resources on 'business reasoning'.", li1: "Omni-Command Bar", li2: "WYSIWYG, Real-time Streaming Feedback", li3: "Progressive Clue Rendering & Multimodal Evidence", prompt: "Gather all financial clues for Suspect A and associate their core interest network.", res1_title: "Clues Gathered", res1_desc: "Extracted 142 abnormal financial transactions", res2_title: "Clues Associated", res2_desc: "Hidden interest transfer network discovered" },
    s2: { tag: "Key Driver 02", title: "Workflow Simplified:\nProgressive Disclosure", desc: "Hiding underlying algorithmic complexity by providing advanced tools on-demand via 'Progressive Disclosure'. In EV production design, seamlessly drill down from a global macro heatmap to a micro 3D battery digital twin by clicking an anomaly.", li1: "Contextual UI", li2: "Predicting User Intent, On-Demand Tools", li3: "Seamless Transition from Macro to Micro", panel_title: "Battery Temp Anomaly", panel_tag: "High Lat Extreme Cold", panel_temp: "Current Temp", panel_rate: "Decay Rate Prediction", panel_btn: "Fetch Time-Series Data" },
    s3: { tag: "Key Driver 03", title: "Visual Elevation:\nMultimodal Immersive Canvas", desc: "Upgrading dashboards into an infinite canvas for multimodal commercial intent. In e-commerce, precisely capture user search intent, visualizing product real words and expansion word upgrade paths. Hover over core product nodes to instantly reveal high-conversion expansion words, AI-generated marketing copy, and multimodal ad suggestions.", card_title: "Core Real Word: Smartwatch", card_tag: "High-Conv Expansion", card_ai: "AI Suggestion: Upgrade expansion word to 'Sports Heart Rate Waterproof Smartwatch', expected CTR +45%." },
    cta: { title: "Ready to reshape spatial intelligence?", desc: "From PoC to Lighthouse projects, unleash the commercial potential of spatial computing and multimodal LLMs.", btn: "Start Proof of Concept (PoC)" },
    auth: { login_title: "Sign in to GEO ID", reg_title: "Create GEO ID", email: "Work Email", pass: "Password", login_btn: "Sign In", reg_btn: "Register", to_reg: "No GEO ID? Create one now.", to_login: "Already have a GEO ID? Sign in." }
  }
};

type Lang = 'zh' | 'en';

// --- Helper Components ---

const GlassPanel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl ${className}`}>
    {children}
  </div>
);

const TypewriterText = ({ text, delay = 0, start = false }: { text: string, delay?: number, start?: boolean }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!start) {
      setDisplayedText("");
      return;
    }
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay, start]);

  return <span>{displayedText}<span className="animate-pulse">_</span></span>;
};

// --- Sections ---

const HeroSection = ({ t }: { t: any }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div ref={ref} className="h-screen relative flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img src="https://picsum.photos/seed/darkearth/1920/1080" className="w-full h-full object-cover opacity-40 mix-blend-screen" alt="Earth" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
      </div>
      
      <motion.div style={{ opacity, y }} className="relative z-10 text-center max-w-5xl px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-200 tracking-wider">{t.hero.tag}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6 leading-tight">
            {t.hero.title1}<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{t.hero.title2}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
            {t.hero.desc}
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs uppercase tracking-[0.3em]">{t.hero.scroll}</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
      </motion.div>
    </div>
  );
};

const StreamUISection = ({ t }: { t: any }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const [isTyping, setIsTyping] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.6 && !isTyping) {
        setIsTyping(true);
        setTimeout(() => setShowResult(true), 3000); // Show result after typing
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isTyping]);

  return (
    <div ref={ref} className="min-h-screen bg-black py-32 relative flex items-center" id="interaction">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <h3 className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-4">{t.s1.tag}</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight whitespace-pre-line">
            {t.s1.title}
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-8">
            {t.s1.desc}
          </p>
          <ul className="space-y-4">
            {[t.s1.li1, t.s1.li2, t.s1.li3].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive Mockup */}
        <div className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-gray-900/50">
          <img src="https://picsum.photos/seed/networkgraph/800/600" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale" alt="Network" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          {/* Omni Command Bar */}
          <GlassPanel className="absolute top-8 left-8 right-8 p-4 flex items-center gap-4">
            <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />
            <div className="flex-1 text-gray-200 font-mono text-sm">
              <TypewriterText text={t.s1.prompt} start={isTyping} />
            </div>
          </GlassPanel>

          {/* Streaming Results */}
          <AnimatePresence>
            {showResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 left-8 right-8 space-y-4"
              >
                <GlassPanel className="p-4 flex items-center gap-4 border-l-4 border-l-blue-500">
                  <Search className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-sm text-white font-medium">{t.s1.res1_title}</div>
                    <div className="text-xs text-gray-400">{t.s1.res1_desc}</div>
                  </div>
                </GlassPanel>
                
                <GlassPanel className="p-4 flex items-center gap-4 border-l-4 border-l-red-500">
                  <Network className="w-5 h-5 text-red-400" />
                  <div>
                    <div className="text-sm text-white font-medium">{t.s1.res2_title}</div>
                    <div className="text-xs text-gray-400">{t.s1.res2_desc}</div>
                  </div>
                </GlassPanel>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glowing Route (SVG) */}
          <AnimatePresence>
            {showResult && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600">
                <motion.path
                  d="M 200 400 Q 300 300 400 350 T 600 200"
                  fill="transparent"
                  stroke="url(#glow)"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ProgressiveUISection = ({ t }: { t: any }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.7) setIsExpanded(true);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={ref} className="min-h-screen bg-[#0a0a0a] py-32 relative flex items-center border-t border-white/5" id="workflow">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Interactive Mockup */}
        <div className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-black order-2 lg:order-1">
          <img src="https://picsum.photos/seed/heatmap/800/600" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Heatmap" referrerPolicy="no-referrer" />
          
          {/* Macro View - Glowing Dot */}
          <motion.div 
            className="absolute top-1/3 left-1/3 w-6 h-6 bg-red-500 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.8)] cursor-pointer z-20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={() => setIsExpanded(!isExpanded)}
          />

          {/* Micro View - Contextual Panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="absolute top-1/3 left-[calc(33%+2rem)] w-80 z-30"
              >
                <GlassPanel className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <Battery className="w-4 h-4 text-red-400" />
                      {t.s2.panel_title}
                    </h4>
                    <span className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded">{t.s2.panel_tag}</span>
                  </div>
                  
                  {/* Mock 3D Wireframe */}
                  <div className="h-32 bg-black/50 rounded-lg mb-4 border border-white/5 relative overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
                    <motion.div 
                      className="w-24 h-12 border border-blue-500/50 rounded transform rotate-12 skew-x-12"
                      animate={{ rotateY: 360 }}
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">{t.s2.panel_temp}</span>
                      <span className="text-red-400">-24°C</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">{t.s2.panel_rate}</span>
                      <span className="text-white">+15%</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white text-xs py-2 rounded transition-colors">
                    {t.s2.panel_btn}
                  </button>
                </GlassPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="order-1 lg:order-2">
          <h3 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-4">{t.s2.tag}</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight whitespace-pre-line">
            {t.s2.title}
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-8">
            {t.s2.desc}
          </p>
          <ul className="space-y-4">
            {[t.s2.li1, t.s2.li2, t.s2.li3].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CanvasUISection = ({ t }: { t: any }) => {
  return (
    <div className="min-h-screen bg-black py-32 relative flex items-center border-t border-white/5 overflow-hidden" id="visualization">
      <div className="absolute inset-0 z-0">
        <img src="https://picsum.photos/seed/citynight/1920/1080" className="w-full h-full object-cover opacity-30" alt="City" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center mb-16">
        <h3 className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">{t.s3.tag}</h3>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight whitespace-pre-line">
          {t.s3.title}
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
          {t.s3.desc}
        </p>
      </div>

      {/* Full width interactive canvas mockup */}
      <div className="max-w-5xl mx-auto relative h-[500px] w-full z-10">
        <GlassPanel className="w-full h-full p-2 relative overflow-hidden group">
          <img src="https://picsum.photos/seed/ecommerce/1200/600" className="w-full h-full object-cover rounded-xl opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Data Canvas" referrerPolicy="no-referrer" />
          
          {/* Hover Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center animate-pulse cursor-pointer peer">
              <div className="w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,1)]" />
            </div>
            
            {/* Multimodal Hover Card */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 opacity-0 peer-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <GlassPanel className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{t.s3.card_title}</span>
                  <span className="flex items-center gap-1 text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded">
                    <TrendingUp className="w-3 h-3" /> {t.s3.card_tag}
                  </span>
                </div>
                
                {/* Video Placeholder */}
                <div className="h-24 bg-black/60 rounded flex items-center justify-center relative overflow-hidden">
                  <Video className="w-6 h-6 text-gray-500 absolute z-10" />
                  <img src="https://picsum.photos/seed/smartwatch/300/200" className="w-full h-full object-cover opacity-40" alt="Product" referrerPolicy="no-referrer" />
                </div>

                {/* Audio Wave Placeholder */}
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded">
                  <Mic className="w-4 h-4 text-purple-400" />
                  <div className="flex-1 flex items-center gap-1 h-4">
                    {[...Array(10)].map((_, i) => (
                      <motion.div 
                        key={i} 
                        className="w-1 bg-purple-400 rounded-full"
                        animate={{ height: ['20%', '100%', '20%'] }}
                        transition={{ repeat: Infinity, duration: 1 + Math.random(), delay: Math.random() }}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {t.s3.card_ai}
                </p>
              </GlassPanel>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<Lang>('zh');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<{ email: string } | null>(null);

  const t = dict[lang];

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    setUser({ email: 'enterprise@example.com' });
    setShowAuth(false);
  };

  return (
    <div className="bg-black text-white font-sans selection:bg-white/20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 h-16 flex items-center justify-between bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2">
          <Globe className="w-6 h-6 text-white" />
          <span className="font-bold tracking-widest text-lg">GEO</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#interaction" className="hover:text-white transition-colors">{t.nav.s1}</a>
          <a href="#workflow" className="hover:text-white transition-colors">{t.nav.s2}</a>
          <a href="#visualization" className="hover:text-white transition-colors">{t.nav.s3}</a>
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="text-xs font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
          >
            {lang === 'zh' ? 'EN' : '中文'}
          </button>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400 hidden sm:inline-block">{user.email}</span>
              <button 
                onClick={() => setUser(null)}
                className="text-sm font-medium bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline-block">{t.nav.logout}</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => { setAuthMode('login'); setShowAuth(true); }}
              className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              {t.nav.login}
            </button>
          )}
        </div>
      </header>

      <main>
        <HeroSection t={t} />
        <StreamUISection t={t} />
        <ProgressiveUISection t={t} />
        <CanvasUISection t={t} />
        
        {/* CTA */}
        <section className="py-32 bg-black text-center relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">{t.cta.title}</h2>
            <p className="text-xl text-gray-400 mb-10">
              {t.cta.desc}
            </p>
            <button 
              onClick={() => { setAuthMode('register'); setShowAuth(true); }}
              className="bg-white text-black text-lg font-medium px-8 py-4 rounded-full hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              {t.cta.btn} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a0a0a] py-8 text-center text-gray-500 text-sm border-t border-white/5">
        <p>Copyright © {new Date().getFullYear()} 火山全域 GEO. All rights reserved.</p>
      </footer>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#111] w-full max-w-md rounded-3xl p-8 relative border border-white/10 shadow-2xl"
            >
              <button 
                onClick={() => setShowAuth(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-8">
                <Globe className="w-10 h-10 text-white mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-white">
                  {authMode === 'login' ? t.auth.login_title : t.auth.reg_title}
                </h2>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <input 
                    type="email" 
                    required
                    placeholder={t.auth.email}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <input 
                    type="password" 
                    required
                    placeholder={t.auth.pass}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-white text-black font-medium rounded-xl px-4 py-3 mt-4 hover:bg-gray-200 transition-colors"
                >
                  {authMode === 'login' ? t.auth.login_btn : t.auth.reg_btn}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button 
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {authMode === 'login' ? t.auth.to_reg : t.auth.to_login}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
