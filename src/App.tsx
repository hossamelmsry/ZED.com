import React, { useState, useEffect, useRef } from 'react';
import {
  Layers,
  Box,
  Cpu,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Globe,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  Play,
  Pause,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Mail,
  Clock,
  Send,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Check
} from 'lucide-react';

// Type definitions
type Language = 'ar' | 'en';
type MeshType = 'cube' | 'octahedron' | 'pyramid';
type RenderMode = 'wireframe' | 'solid' | 'points';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 3D Canvas Controls State
  const [meshType, setMeshType] = useState<MeshType>('cube');
  const [renderMode, setRenderMode] = useState<RenderMode>('wireframe');
  const [themeColor, setThemeColor] = useState<string>('#00F0FF');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zoomScale, setZoomScale] = useState(1);
  const [liveFps, setLiveFps] = useState(60);

  // Estimator State
  const [projectType, setProjectType] = useState<number>(1500);
  const [projectTypeName, setProjectTypeName] = useState<string>('ar_mobile');
  const [platforms, setPlatforms] = useState<{ [key: string]: boolean }>({
    ios: true,
    android: true,
    webgl: false,
    vr: false
  });
  const [features, setFeatures] = useState<{ [key: string]: boolean }>({
    backend: false,
    modeling: true,
    multiplayer: false
  });

  // Portfolio Filter State
  const [activeFilter, setActiveFilter] = useState<'all' | 'ar' | 'unity' | 'edu'>('all');
  const [selectedProjectModal, setSelectedProjectModal] = useState<any | null>(null);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'ar',
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Language switch handler
  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
    document.documentElement.lang = nextLang;
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
  };

  // Sync initial lang
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Translations dictionary
  const t = {
    ar: {
      siteTitle: "ZED.COM",
      tagline: "AR & UNITY LABS",
      navServices: "الخدمات",
      navPortfolio: "معرض الأعمال",
      navDemo: "العرض التفاعلي",
      navEstimator: "حاسبة المشروع",
      navWhy: "لماذا ZED؟",
      navContact: "تواصل معنا",
      startProject: "ابتدئ مشروعك",
      langSwitch: "English",
      heroBadge: "المختبر البرمجي المتقدم لتقنيات Unity والواقع المعزز",
      heroTitlePrefix: "نُشكّل المستقبل بـ",
      heroTitleHighlight: "تجارب واقع معزز (AR)",
      heroTitleSuffix: "وحلول Unity متكاملة للأعمال",
      heroDesc: "في ZED.com، ندمج هندسة البرمجيات النظيفة (Clean Code) مع أحدث تقنيات المحاكاة التفاعلية لتطوير تطبيقات هاتفية، حلول تعليمية، وأنظمة تفاعلية مخصصة ترفع من القيمة السوقية لعلامتك التجارية.",
      ctaConsultation: "طلب استشارة وتقييم مشروعك",
      ctaDemo: "تجربة النموذج التفاعلي 3D",
      statProjects: "+ مشروع AR & Unity منجز",
      statQuality: "% جودة واستقرار الأكواد",
      statSectors: "+ قطاع تجاري وتعليمي",
      statSecurity: "حماية وأمان البيانات",
      
      // Services
      servicesSub: "خدماتنا التقنية",
      servicesTitle: "حلول تفاعلية مصممة بأعلى معايير الدقة",
      servicesDesc: "نستخدم محركات Unity وأطر الواقع المعزز المتقدمة لبناء تجارب استثنائية تمزج بين الأداء السلس والتصميم العصري.",
      serv1Title: "تطبيقات الواقع المعزز (AR)",
      serv1Desc: "تطوير تطبيقات تفاعلية تعتمد على تتبع الصور، الأسطح والأجسام (Image, Plane & Object Tracking) باستخدام AR Foundation وVuforia لعرض المنتجات ونمذجة المساحات بدقة متناهية.",
      serv1f1: "تتبع سريع ودقيق للعناصر ثنائية وثلاثية الأبعاد",
      serv1f2: "توافق كامل مع أنظمة iOS (ARKit) وAndroid (ARCore)",
      serv1f3: "تكامل سلس مع المتاجر وقواعد البيانات السحابية",

      serv2Title: "تطوير وهندسة أنظمة Unity المخصصة",
      serv2Desc: "بناء وتطوير الهندسة البرمجية للمشاريع المعقدة وفق بنية كود نظيفة وقابلة للتوسع (Clean Architecture & Design Patterns) لضمان ثبات معدل الإطارات وسلاسة التشغيل.",
      serv2f1: "هيكلية أكواد معيارية واضحة وموثقة",
      serv2f2: "تحسين الأداء ورفع معدل FPS لتقليل استهلاك البطارية",
      serv2f3: "تطوير إضافات (Plugins) وحزم C# مخصصة",

      serv3Title: "التطبيقات والمحاكاة التعليمية",
      serv3Desc: "تحويل المناهج التخصصية والتدريبات الصناعية المعقدة إلى بيئات ثلاثية الأبعاد تفاعلية تتيح للمتدرب التجربة الواقعية بأعلى معايير السلامة والأمان.",
      serv3f1: "محاكاة طبية وصناعية دقيقة للمعدات والأعضاء",
      serv3f2: "آليات تحفيز وتلعيب (Gamification) لرفع المشاركة",
      serv3f3: "لوحات تحليل بيانات ومتابعة تقدم المتعلمين",

      // Portfolio
      portSub: "سجل الإنجازات",
      portTitle: "نماذج مختارة من أعمال ZED",
      filterAll: "الكل",
      filterAr: "الواقع المعزز (AR)",
      filterUnity: "محرك Unity",
      filterEdu: "تطبيقات تعليمية",
      viewProject: "معاينة التفاصيل",
      close: "إغلاق",

      // 3D Demo
      demoSub: "عرض حي مباشر",
      demoTitle: "محرك المعاينة ثلاثي الأبعاد المباشر",
      demoDesc: "تحكّم في المجسمات الهندسية أدناه واختبر استجابة المحاكاة في متصفحك مباشرة بدون تحميل. يمكنك تدوير المجسم، تغيير أنماط العرض، وتبديل الألوان في الوقت الفعلي.",
      step1: "اسحب بالماوس أو اللمس لتدوير المجسم في الفضاء",
      step2: "بدّل بين الأنماط (شبكي Wireframe / مجسم Solid / نقاط Points)",
      step3: "اختر ألوان النيون المخصصة ومعدل التكبير والتصغير",
      meshCube: "مكعب تفاعلي",
      meshOcta: "بلورة ثمانية",
      meshPyramid: "هرم ثلاثي",
      modeWire: "شبكي (Wireframe)",
      modeSolid: "مظلل (Solid)",
      modePoints: "نقاط (Points)",

      // Estimator
      calcSub: "تقدير ذكي وفوري",
      calcTitle: "حاسبة تكلفة ومدة المشروع",
      calcDesc: "حدد متطلبات تطبيقك للحصول على مؤشر تقديري شفاف للوقت والتكلفة المتوقعة لمشروعك مع فريق ZED.",
      calcTypeLabel: "1. نوع المشروع الأساسي:",
      typeAr: "تطبيق AR للموبايل",
      typeUnity: "نظام Unity مخصص للألعاب/المحاكاة",
      typeEdu: "منصة تعليمية وتدريبية تفاعلية",
      typeWeb: "تطبيق ثلاثي الأبعاد للويب (WebGL)",
      calcPlatLabel: "2. المنصات المستهدفة:",
      platIos: "iOS (iPhone / iPad)",
      platAndroid: "Android",
      platWeb: "المتصفح (Web Player / WebGL)",
      platVr: "نظارات الواقع الافتراضي (Meta Quest / XR)",
      calcFeatLabel: "3. إضافات وخدمات مكملة:",
      featBackend: "خادم سحابي ولوحة تحكم (Backend API & Admin)",
      featModeling: "تصميم ونمذجة مجسمات 3D مخصصة (Custom 3D Assets)",
      featMultiplayer: "دعم تعدد المستخدمين والشبكات (Multiplayer / Photon)",
      calcEstTitle: "الجدول الزمني التقديري للمشروع",
      calcWeeksText: (min: number, max: number) => `المدة المتوقعة: ${min} - ${max} أسابيع عمل`,
      calcBookBtn: "تأكيد المواصفات ونقلها لنموذج التواصل",

      // Why Us
      whySub: "القيمة المضافة",
      whyTitle: "لماذا تختار شراكة ZED.com؟",
      whyDesc: "نحن لسنا مجرد مبرمجين، بل شركاء نجاح يضمنون تحويل فكرتك التقنية إلى منتج ملموس يعتمد على أحدث مقاييس الجودة العالمية.",
      why1Title: "حماية تامة وسرية البيانات 100%",
      why1Desc: "توقيع اتفاقيات عدم الإفصاح (NDA) ونقل كامل لملكية الشيفرة المصدرية والمجسمات إلى حسابات العميل فور التسليم.",
      why2Title: "كود برمجي نظيف وقابل للتطوير",
      why2Desc: "نعتمد مبادئ SOLID وهياكل التصميم البرمجي المعتمدة من Unity، مما يجعل إضافة الميزات المستقبلية أمراً يسيراً دون الحاجة لإعادة البناء.",
      why3Title: "تسليم سريع للمنتج الأولي (MVP)",
      why3Desc: "منهجية Agile مرنة تمكنك من طرح نموذج أولي قابل للاختبار في السوق والمؤتمرات خلال أسابيع قليلة لجمع الآراء.",

      // Contact
      contactSub: "تواصل مع خبرائنا",
      contactTitle: "دعنا نحول فكرتك إلى واقع تفاعلي مبهر",
      contactDesc: "فريق مهندسي Unity وAR في ZED جاهز لمراجعة فكرتك وتقديم استشارة تقنية تفصيلية مجانية لتحديد مسار التنفيذ الأمثل.",
      contactEmailLabel: "البريد الإلكتروني المباشر",
      contactHoursLabel: "أوقات العمل والدعم الفني",
      contactHours: "الأحد - الخميس (9:00 ص - 6:00 م)",
      formName: "الاسم الكامل *",
      formEmail: "البريد الإلكتروني *",
      formPhone: "رقم الهاتف / الواتساب",
      formService: "نوع الخدمة المطلوبة",
      formNotes: "تفاصيل ونطاق المشروع *",
      formSubmit: "إرسال طلب الاستشارة المجانية",
      formSuccess: "تم استلام طلبك بنجاح! سيتواصل معك أحد كبار مهندسينا خلال 24 ساعة.",

      // Footer
      footerCopy: "جميع الحقوق محفوظة © 2026 ZED Labs. مختبر الابتكار التفاعلي والواقع المعزز."
    },
    en: {
      siteTitle: "ZED.COM",
      tagline: "AR & UNITY LABS",
      navServices: "Services",
      navPortfolio: "Portfolio",
      navDemo: "3D Demo",
      navEstimator: "Cost Estimator",
      navWhy: "Why ZED?",
      navContact: "Contact",
      startProject: "Start Project",
      langSwitch: "العربية",
      heroBadge: "Advanced Software Lab for Unity & Augmented Reality",
      heroTitlePrefix: "Shaping the Future with",
      heroTitleHighlight: "Augmented Reality (AR)",
      heroTitleSuffix: "& Enterprise Unity Solutions",
      heroDesc: "At ZED.com, we fuse Clean Code engineering with state-of-the-art interactive simulation to build mobile applications, educational platforms, and custom real-time systems that elevate your market presence.",
      ctaConsultation: "Request Free Consultation",
      ctaDemo: "Try Interactive 3D Demo",
      statProjects: "+ AR & Unity Projects Delivered",
      statQuality: "% Code Quality & Framerate Stability",
      statSectors: "+ Commercial & Educational Sectors",
      statSecurity: "Data Protection & IP Privacy",

      // Services
      servicesSub: "Technical Services",
      servicesTitle: "Engineered Interactive Solutions for Modern Enterprises",
      servicesDesc: "We leverage Unity engines and modern AR frameworks to deliver immersive experiences pairing smooth performance with aesthetic excellence.",
      serv1Title: "Augmented Reality (AR) Applications",
      serv1Desc: "Interactive apps built upon image, plane, and object tracking using AR Foundation and Vuforia for virtual showrooms and real-world spatial anchoring.",
      serv1f1: "Sub-millisecond tracking for 2D images & 3D real surfaces",
      serv1f2: "Full cross-platform deployment on iOS (ARKit) & Android (ARCore)",
      serv1f3: "Seamless integration with e-commerce backends & cloud storage",

      serv2Title: "Custom Unity Systems & Architecture",
      serv2Desc: "Clean code software architecture for complex interactive applications following SOLID principles and design patterns for maximum frame rates and zero clutter.",
      serv2f1: "Modular, decoupled, and well-documented C# architecture",
      serv2f2: "Performance profiling with steady 60/90+ FPS and thermal stability",
      serv2f3: "Custom native C++/C# plugins and bridge libraries",

      serv3Title: "Educational & Training Simulations",
      serv3Desc: "Transforming intricate curriculums and high-risk industrial safety protocols into interactive 3D simulations that maximize retention and hands-on skill mastery.",
      serv3f1: "Accurate industrial & biomedical asset simulations",
      serv3f2: "Gamification layers, reward systems, and milestone tracking",
      serv3f3: "Comprehensive student progress analytics and grading dashboards",

      // Portfolio
      portSub: "Proven Track Record",
      portTitle: "Featured Case Studies & Productions",
      filterAll: "All",
      filterAr: "Augmented Reality (AR)",
      filterUnity: "Unity Engine",
      filterEdu: "Educational Tech",
      viewProject: "Inspect Project",
      close: "Close",

      // 3D Demo
      demoSub: "Live Demonstration",
      demoTitle: "Real-Time In-Browser 3D Preview Engine",
      demoDesc: "Interact with the mathematical 3D geometry below to evaluate real-time viewport simulation directly in your browser. Drag to spin, switch rendering modes, and tune shaders on the fly.",
      step1: "Click & drag with mouse or touch to rotate the geometry",
      step2: "Toggle rendering modes (Wireframe / Solid / Point Cloud)",
      step3: "Adjust neon chroma, zoom factor, and animation speeds",
      meshCube: "Interactive Cube",
      meshOcta: "Octahedron Crystal",
      meshPyramid: "Tri-Pyramid",
      modeWire: "Wireframe",
      modeSolid: "Solid Mesh",
      modePoints: "Point Cloud",

      // Estimator
      calcSub: "Smart Estimation",
      calcTitle: "Project Timeline & Cost Estimator",
      calcDesc: "Select your project specifications below to get a transparent preliminary budget and development timeline with ZED.com engineers.",
      calcTypeLabel: "1. Core Project Archetype:",
      typeAr: "Mobile AR Application",
      typeUnity: "Custom Unity Simulation / Game Core",
      typeEdu: "Interactive Educational Platform",
      typeWeb: "WebGL Browser 3D Application",
      calcPlatLabel: "2. Target Platforms:",
      platIos: "iOS (iPhone / iPad)",
      platAndroid: "Android",
      platWeb: "Web Browser (WebGL / WebAssembly)",
      platVr: "Virtual Reality (Meta Quest / OpenXR)",
      calcFeatLabel: "3. Specialized Capabilities:",
      featBackend: "Cloud Backend API & Admin Dashboard",
      featModeling: "Custom 3D Asset Modeling & PBR Textures",
      featMultiplayer: "Real-Time Multiplayer & Photon Networking",
      calcEstTitle: "Estimated Project Timeline",
      calcWeeksText: (min: number, max: number) => `Estimated Timeframe: ${min} - ${max} Business Weeks`,
      calcBookBtn: "Apply Specifications to Consultation Form",

      // Why Us
      whySub: "Value Proposition",
      whyTitle: "Why Partner with ZED.com?",
      whyDesc: "We act as your dedicated engineering core, ensuring your spatial computing products are delivered on-schedule with world-class engineering standards.",
      why1Title: "100% IP & Data Confidentiality",
      why1Desc: "Comprehensive bilateral Non-Disclosure Agreements (NDAs) with complete source code and git repository handoff upon project completion.",
      why2Title: "Clean Architecture & Scalability",
      why2Desc: "Built on strict SOLID principles and Unity certified workflows, guaranteeing hassle-free future feature expansion without refactoring nightmares.",
      why3Title: "Rapid MVP Sprint Delivery",
      why3Desc: "Agile 2-week sprint cycles allowing you to demo working, testable builds to stakeholders and investors in record time.",

      // Contact
      contactSub: "Connect With Us",
      contactTitle: "Let's Transform Your Vision Into Real-Time Reality",
      contactDesc: "Our senior Unity and spatial computing engineers are ready to discuss your architecture, feasibility, and deliver a tailored technical roadmap.",
      contactEmailLabel: "Direct Inquiries",
      contactHoursLabel: "Business Support Hours",
      contactHours: "Sun - Thu (9:00 AM - 6:00 PM GMT+3)",
      formName: "Full Name *",
      formEmail: "Corporate Email *",
      formPhone: "Phone / WhatsApp",
      formService: "Primary Service Interest",
      formNotes: "Project Scope & Description *",
      formSubmit: "Submit Consultation Request",
      formSuccess: "Your request was received successfully! A senior tech lead will contact you within 24 hours.",

      // Footer
      footerCopy: "All rights reserved © 2026 ZED Labs. Interactive Innovation & Spatial Computing."
    }
  };

  const currentT = t[lang];

  // Portfolio items data
  const portfolioItems = [
    {
      id: 'ar-furniture',
      category: 'ar',
      badge: 'AR Foundation',
      title: lang === 'ar' ? 'تطبيق المعرض الافتراضي للأثاث والمفروشات' : 'Spatial AR Interior & Furniture Showroom',
      desc: lang === 'ar' ? 'تمكين العملاء من معاينة وتثبيت قطع الأثاث بمقاساتها الفيزيائية الدقيقة في الغرفة مع إضاءة واقعية وظلال طبيعية.' : 'Enabling real-scale furniture placement in customer living rooms with dynamic surface detection and environmental lighting.',
      tags: ['#AR_Foundation', '#Unity', '#C#', '#PBR_Shaders'],
      icon: Box,
      accent: 'cyan'
    },
    {
      id: 'edu-bio',
      category: 'edu',
      badge: 'Interactive 3D',
      title: lang === 'ar' ? 'منصة أطلس الأحياء والخلية التفاعلية' : 'Interactive Biology Atlas & Cellular Anatomy',
      desc: lang === 'ar' ? 'تطبيق محاكاة ثلاثي الأبعاد تفاعلي يتيح للطلاب تشريح الخلية الحيوية واستكشاف العضيات والمجهريات بدقة مجهرية.' : 'Comprehensive 3D simulation letting students dissect microscopic cells, organelles, and molecular structures in real time.',
      tags: ['#Interactive_3D', '#Education', '#Vuforia', '#Gamification'],
      icon: Layers,
      accent: 'purple'
    },
    {
      id: 'unity-industry',
      category: 'unity',
      badge: 'Industrial Sim',
      title: lang === 'ar' ? 'محاكي السلامة والصيانة الصناعية' : 'Heavy Machinery & Safety Maintenance Simulator',
      desc: lang === 'ar' ? 'بيئة تدريبية تفاعلية للمهندسين لفحص توربينات ومحركات الضغط العالي مع تدريب إجرائي تفصيلي يقلل حوادث العمل.' : 'High-fidelity training system for engineers to operate and troubleshoot high-pressure industrial equipment safely.',
      tags: ['#Unity_Engine', '#Clean_Architecture', '#Simulation', '#Physics'],
      icon: Cpu,
      accent: 'pink'
    },
    {
      id: 'ar-automotive',
      category: 'ar',
      badge: 'Automotive AR',
      title: lang === 'ar' ? 'معرض السيارات التفاعلي بالواقع المعزز' : 'Spatial Automotive Configurator & AR Demo',
      desc: lang === 'ar' ? 'معاينة السيارات وتغيير الألوان والجنوط والمقصورة الداخلية بالكامل بنسب حقيقية 1:1 عبر كاميرا الهاتف الذكي.' : 'Real-time 1:1 scale car inspection with custom paint, wheel configurations, and animated interior mechanics.',
      tags: ['#ARCore', '#ARKit', '#Raycasting', '#RealTimeShaders'],
      icon: Smartphone,
      accent: 'cyan'
    },
    {
      id: 'edu-medical',
      category: 'edu',
      badge: 'Medical Sim',
      title: lang === 'ar' ? 'نظام التدريب الجراحي والمحاكاة الطبية' : 'Surgical Procedure & Anatomy Simulation Lab',
      desc: lang === 'ar' ? 'برنامج تدريب طبي للأطباء والممرضين يوضح خطوات العمليات الجراحية الدقيقة بمجسمات عالية التفصيل.' : 'Precision medical training app simulating surgical procedures with procedural guidance and anatomical layer peeling.',
      tags: ['#Medical_Tech', '#Unity_3D', '#StepByStep', '#Haptic'],
      icon: Layers,
      accent: 'purple'
    },
    {
      id: 'unity-metaverse',
      category: 'unity',
      badge: 'WebGL Engine',
      title: lang === 'ar' ? 'معرض العمارة الافتراضي للمتصفح' : 'Architectural Real Estate WebGL Walkthrough',
      desc: lang === 'ar' ? 'جولات تفاعلية ثلاثية الأبعاد للمشاريع العقارية الضخمة تعمل مباشرة في متصفح الويب دون الحاجة لتثبيت أي تطبيق.' : 'Architectural exploration of luxury developments with baked global illumination running smoothly in web browsers.',
      tags: ['#WebGL', '#Optimization', '#BakeLight', '#ThreeD'],
      icon: Box,
      accent: 'pink'
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  // Background Particles Canvas
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    let particles: Particle[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(45, Math.floor(window.innerWidth / 30));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00F0FF';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00F0FF';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - dist / 130) * 0.5})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Live 3D Interactive Canvas Engine
  const cubeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotAngleX = useRef(0.3);
  const rotAngleY = useRef(0.4);
  const isDraggingRef = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = cubeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Geometries
    const getVertices = () => {
      if (meshType === 'cube') {
        const s = 85 * zoomScale;
        return [
          [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
          [-s, -s, s],  [s, -s, s],  [s, s, s],  [-s, s, s]
        ];
      } else if (meshType === 'octahedron') {
        const s = 110 * zoomScale;
        return [
          [0, -s, 0], [0, s, 0],
          [-s, 0, 0], [s, 0, 0],
          [0, 0, -s], [0, 0, s]
        ];
      } else {
        // Pyramid
        const s = 90 * zoomScale;
        return [
          [0, -s, 0],
          [-s, s, -s], [s, s, -s], [s, s, s], [-s, s, s]
        ];
      }
    };

    const getEdges = () => {
      if (meshType === 'cube') {
        return [
          [0,1], [1,2], [2,3], [3,0],
          [4,5], [5,6], [6,7], [7,4],
          [0,4], [1,5], [2,6], [3,7]
        ];
      } else if (meshType === 'octahedron') {
        return [
          [0,2], [0,3], [0,4], [0,5],
          [1,2], [1,3], [1,4], [1,5],
          [2,4], [4,3], [3,5], [5,2]
        ];
      } else {
        // Pyramid
        return [
          [0,1], [0,2], [0,3], [0,4],
          [1,2], [2,3], [3,4], [4,1]
        ];
      }
    };

    const project = (x: number, y: number, z: number, cWidth: number, cHeight: number) => {
      const distance = 340;
      const fov = distance / (distance + z + 120);
      return {
        x: x * fov + cWidth / 2,
        y: y * fov + cHeight / 2,
        scale: fov
      };
    };

    const rotateX = (pt: number[], rad: number) => {
      const y = pt[1] * Math.cos(rad) - pt[2] * Math.sin(rad);
      const z = pt[1] * Math.sin(rad) + pt[2] * Math.cos(rad);
      return [pt[0], y, z];
    };

    const rotateY = (pt: number[], rad: number) => {
      const x = pt[0] * Math.cos(rad) + pt[2] * Math.sin(rad);
      const z = -pt[0] * Math.sin(rad) + pt[2] * Math.cos(rad);
      return [x, pt[1], z];
    };

    const render = (now: number) => {
      // FPS calculation
      frameCount++;
      if (now - fpsTimer >= 500) {
        const currentCalculatedFps = Math.round((frameCount * 1000) / (now - fpsTimer));
        setLiveFps(Math.min(60, Math.max(30, currentCalculatedFps)));
        frameCount = 0;
        fpsTimer = now;
      }
      lastTime = now;

      const rect = canvas.getBoundingClientRect();
      const cWidth = rect.width;
      const cHeight = rect.height;

      ctx.clearRect(0, 0, cWidth, cHeight);

      if (isAutoRotating && !isDraggingRef.current) {
        rotAngleY.current += 0.009;
        rotAngleX.current += 0.005;
      }

      const rawVertices = getVertices();
      const edges = getEdges();

      const transformed = rawVertices.map(v => {
        let r = rotateX(v, rotAngleX.current);
        r = rotateY(r, rotAngleY.current);
        return r;
      });

      // Render mode: Solid Face Accents
      if (renderMode === 'solid') {
        ctx.fillStyle = themeColor === '#00F0FF' ? 'rgba(0, 240, 255, 0.12)' : 'rgba(168, 85, 247, 0.14)';
        // Draw triangles between connected vertices
        for (let i = 0; i < edges.length; i += 2) {
          const edgeA = edges[i];
          const edgeB = edges[(i + 1) % edges.length];
          const p1 = project(transformed[edgeA[0]][0], transformed[edgeA[0]][1], transformed[edgeA[0]][2], cWidth, cHeight);
          const p2 = project(transformed[edgeA[1]][0], transformed[edgeA[1]][1], transformed[edgeA[1]][2], cWidth, cHeight);
          const p3 = project(transformed[edgeB[0]][0], transformed[edgeB[0]][1], transformed[edgeB[0]][2], cWidth, cHeight);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Render mode: Wireframe Edges
      if (renderMode === 'wireframe' || renderMode === 'solid') {
        ctx.strokeStyle = themeColor;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 14;
        ctx.shadowColor = themeColor;

        edges.forEach(edge => {
          const p1 = project(transformed[edge[0]][0], transformed[edge[0]][1], transformed[edge[0]][2], cWidth, cHeight);
          const p2 = project(transformed[edge[1]][0], transformed[edge[1]][1], transformed[edge[1]][2], cWidth, cHeight);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });
      }

      // Render Vertices / Points
      transformed.forEach(pt => {
        const p = project(pt[0], pt[1], pt[2], cWidth, cHeight);
        ctx.beginPath();
        const r = renderMode === 'points' ? 6 * p.scale : 4 * p.scale;
        ctx.arc(p.x, p.y, Math.max(2, r), 0, Math.PI * 2);
        ctx.fillStyle = renderMode === 'points' ? themeColor : '#ffffff';
        ctx.shadowBlur = renderMode === 'points' ? 20 : 8;
        ctx.shadowColor = themeColor;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [meshType, renderMode, themeColor, isAutoRotating, zoomScale]);

  // Pointer interaction for 3D canvas
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    rotAngleY.current += dx * 0.008;
    rotAngleX.current += dy * 0.008;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Cost Estimator Calculations
  const platformPrice = (platforms.ios ? 500 : 0) + (platforms.android ? 500 : 0) + (platforms.webgl ? 800 : 0) + (platforms.vr ? 1000 : 0);
  const featurePrice = (features.backend ? 600 : 0) + (features.modeling ? 400 : 0) + (features.multiplayer ? 900 : 0);
  const totalEstimate = projectType + platformPrice + featurePrice;
  const estimatedWeeksMin = Math.max(2, Math.floor(totalEstimate / 850));
  const estimatedWeeksMax = estimatedWeeksMin + 2;

  // Apply estimate to contact form
  const applyEstimateToForm = () => {
    const selectedPlatformsList = Object.entries(platforms)
      .filter(([_, val]) => val)
      .map(([key]) => key.toUpperCase())
      .join(', ');
    const autoNotes = lang === 'ar'
      ? `طلب بناء على حاسبة المشروع: نوع المشروع: ${projectTypeName} | المنصات: [${selectedPlatformsList}] | المدة المتوقعة: ${estimatedWeeksMin}-${estimatedWeeksMax} أسابيع عمل.`
      : `Inquiry via Estimator: Project Type: ${projectTypeName} | Target Platforms: [${selectedPlatformsList}] | Est. Timeline: ${estimatedWeeksMin}-${estimatedWeeksMax} business weeks.`;

    setFormData(prev => ({
      ...prev,
      service: projectTypeName === 'ar_mobile' ? 'ar' : projectTypeName === 'unity_custom' ? 'unity' : 'edu',
      notes: autoNotes
    }));

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form submit handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'ar',
        notes: ''
      });
    }, 6000);
  };

  return (
    <div className={`min-h-screen bg-[#080C14] text-slate-100 font-['Cairo',sans-serif] selection:bg-cyan-500 selection:text-black`}>
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-panel border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-neon-cyan transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-[#080C14] rounded-[10px] flex items-center justify-center">
                  <span className="font-black text-xl tracking-wider text-cyan-400">Z</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-widest text-white leading-none">
                  {currentT.siteTitle.replace('.COM', '')}
                  <span className="text-cyan-400">.COM</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider">{currentT.tagline}</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
              <a href="#services" className="hover:text-cyan-400 transition-colors">{currentT.navServices}</a>
              <a href="#portfolio" className="hover:text-cyan-400 transition-colors">{currentT.navPortfolio}</a>
              <a href="#ar-demo" className="hover:text-cyan-400 transition-colors">{currentT.navDemo}</a>
              <a href="#estimator" className="hover:text-cyan-400 transition-colors">{currentT.navEstimator}</a>
              <a href="#why-zed" className="hover:text-cyan-400 transition-colors">{currentT.navWhy}</a>
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="px-3.5 py-2 rounded-xl glass-panel border border-slate-700/80 text-xs font-bold hover:border-cyan-400 text-slate-200 transition-all flex items-center gap-2 group cursor-pointer"
                aria-label="Switch Language"
              >
                <Globe className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
                <span>{currentT.langSwitch}</span>
              </button>

              <a
                href="#contact"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-sm shadow-neon-cyan hover:brightness-110 transition-all duration-300 flex items-center gap-2"
              >
                <span>{currentT.startProject}</span>
                {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#080C14]/95 backdrop-blur-xl px-6 py-6 transition-all">
            <div className="flex flex-col gap-4 text-base font-semibold">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400">{currentT.navServices}</a>
              <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400">{currentT.navPortfolio}</a>
              <a href="#ar-demo" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400">{currentT.navDemo}</a>
              <a href="#estimator" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400">{currentT.navEstimator}</a>
              <a href="#why-zed" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400">{currentT.navWhy}</a>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <button
                  onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 px-4 rounded-xl glass-panel border border-slate-700 text-xs font-bold text-slate-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>{currentT.langSwitch}</span>
                </button>
              </div>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-sm"
              >
                {currentT.startProject}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
        {/* Dynamic Canvas Background */}
        <canvas ref={heroCanvasRef} className="absolute inset-0 w-full h-full z-0 opacity-45 pointer-events-none" />

        {/* Dynamic Glow Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-8 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>{currentT.heroBadge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
            {currentT.heroTitlePrefix}{' '}
            <span className="text-gradient">{currentT.heroTitleHighlight}</span>
            <br className="hidden sm:inline" />{' '}
            {currentT.heroTitleSuffix}
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-slate-400 font-normal leading-relaxed mb-10">
            {currentT.heroDesc}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-black font-black text-base shadow-neon-cyan hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>{currentT.ctaConsultation}</span>
            </a>
            <a
              href="#ar-demo"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel text-white font-bold text-base border border-slate-700 hover:border-cyan-400 hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2"
            >
              <Box className="w-5 h-5 text-cyan-400" />
              <span>{currentT.ctaDemo}</span>
            </a>
          </div>

          {/* Real-time KPI Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <div className="glass-panel p-6 rounded-2xl text-center border-t-2 border-t-cyan-500">
              <span className="block text-3xl sm:text-4xl font-black text-white mb-1">50+</span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">{currentT.statProjects}</span>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center border-t-2 border-t-blue-500">
              <span className="block text-3xl sm:text-4xl font-black text-white mb-1">99.4%</span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">{currentT.statQuality}</span>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center border-t-2 border-t-purple-500">
              <span className="block text-3xl sm:text-4xl font-black text-white mb-1">15+</span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">{currentT.statSectors}</span>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center border-t-2 border-t-pink-500">
              <span className="block text-3xl sm:text-4xl font-black text-white mb-1">100%</span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">{currentT.statSecurity}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative z-10 border-t border-slate-800/80 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">{currentT.servicesSub}</h2>
            <p className="text-3xl sm:text-5xl font-black text-white mb-4">{currentT.servicesTitle}</p>
            <p className="text-slate-400 text-base sm:text-lg">{currentT.servicesDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="glass-panel rounded-2xl p-8 glass-panel-hover transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl mb-6 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{currentT.serv1Title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{currentT.serv1Desc}</p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{currentT.serv1f1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{currentT.serv1f2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{currentT.serv1f3}</span>
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="glass-panel rounded-2xl p-8 glass-panel-hover transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-2xl mb-6 group-hover:bg-purple-500 group-hover:text-black transition-all">
                  <Cpu className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{currentT.serv2Title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{currentT.serv2Desc}</p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{currentT.serv2f1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{currentT.serv2f2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{currentT.serv2f3}</span>
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="glass-panel rounded-2xl p-8 glass-panel-hover transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 text-2xl mb-6 group-hover:bg-pink-500 group-hover:text-black transition-all">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{currentT.serv3Title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{currentT.serv3Desc}</p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>{currentT.serv3f1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>{currentT.serv3f2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>{currentT.serv3f3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 relative z-10 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">{currentT.portSub}</h2>
              <p className="text-3xl sm:text-5xl font-black text-white">{currentT.portTitle}</p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeFilter === 'all' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'}`}
              >
                {currentT.filterAll}
              </button>
              <button
                onClick={() => setActiveFilter('ar')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeFilter === 'ar' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'}`}
              >
                {currentT.filterAr}
              </button>
              <button
                onClick={() => setActiveFilter('unity')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeFilter === 'unity' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'}`}
              >
                {currentT.filterUnity}
              </button>
              <button
                onClick={() => setActiveFilter('edu')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeFilter === 'edu' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'}`}
              >
                {currentT.filterEdu}
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const IconComp = project.icon;
              return (
                <div
                  key={project.id}
                  className="glass-panel rounded-2xl overflow-hidden group border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-52 bg-slate-900 overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent z-10" />
                      <IconComp className={`w-20 h-20 ${project.accent === 'cyan' ? 'text-cyan-500/30' : project.accent === 'purple' ? 'text-purple-500/30' : 'text-pink-500/30'} group-hover:scale-125 transition-transform duration-500`} />
                      <span className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 text-cyan-300 border border-slate-700 backdrop-blur-md">
                        {project.badge}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed mb-4">
                        {project.desc}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-cyan-400">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setSelectedProjectModal(project)}
                      className="w-full py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-300 hover:text-black hover:bg-cyan-400 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{currentT.viewProject}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal for project preview */}
        {selectedProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="glass-panel max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl relative">
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="absolute top-5 left-5 text-slate-400 hover:text-white p-2 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {selectedProjectModal.badge}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mb-3">{selectedProjectModal.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">{selectedProjectModal.desc}</p>

              <div className="border-t border-slate-800 pt-4 mb-6">
                <span className="text-xs font-bold text-slate-400 block mb-2">{lang === 'ar' ? 'التقنيات المستخدمة:' : 'Tech Stack:'}</span>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectModal.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-cyan-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setSelectedProjectModal(null);
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-sm text-center shadow-neon-cyan cursor-pointer"
                >
                  {lang === 'ar' ? 'طلب مشروع مماثل' : 'Request Similar Solution'}
                </button>
                <button
                  onClick={() => setSelectedProjectModal(null)}
                  className="px-5 py-3 rounded-xl border border-slate-700 text-white text-sm font-semibold hover:bg-slate-800 transition-all cursor-pointer"
                >
                  {currentT.close}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Live Interactive 3D Demo Engine */}
      <section id="ar-demo" className="py-24 relative z-10 border-t border-slate-800/80 bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">{currentT.demoSub}</h2>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-6">{currentT.demoTitle}</h3>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                {currentT.demoDesc}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">1</span>
                  <span className="text-slate-300 text-sm">{currentT.step1}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">2</span>
                  <span className="text-slate-300 text-sm">{currentT.step2}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-sm">3</span>
                  <span className="text-slate-300 text-sm">{currentT.step3}</span>
                </div>
              </div>

              {/* Geometry Selection */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setMeshType('cube')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${meshType === 'cube' ? 'bg-cyan-500 text-black' : 'glass-panel text-slate-300 hover:text-white'}`}
                >
                  {currentT.meshCube}
                </button>
                <button
                  onClick={() => setMeshType('octahedron')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${meshType === 'octahedron' ? 'bg-cyan-500 text-black' : 'glass-panel text-slate-300 hover:text-white'}`}
                >
                  {currentT.meshOcta}
                </button>
                <button
                  onClick={() => setMeshType('pyramid')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${meshType === 'pyramid' ? 'bg-cyan-500 text-black' : 'glass-panel text-slate-300 hover:text-white'}`}
                >
                  {currentT.meshPyramid}
                </button>
              </div>
            </div>

            {/* 3D Interactive Web Canvas Box */}
            <div className="lg:col-span-7 glass-panel p-4 rounded-3xl border border-slate-800 shadow-2xl relative">
              <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-slate-800 mb-4 gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  <span className="text-xs font-mono text-slate-400 mx-2">ZED_Spatial_Renderer.exe</span>
                </div>

                {/* Render Mode & Colors */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRenderMode('wireframe')}
                    className={`px-2.5 py-1 rounded text-xs transition-all cursor-pointer ${renderMode === 'wireframe' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
                  >
                    {currentT.modeWire}
                  </button>
                  <button
                    onClick={() => setRenderMode('solid')}
                    className={`px-2.5 py-1 rounded text-xs transition-all cursor-pointer ${renderMode === 'solid' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'}`}
                  >
                    {currentT.modeSolid}
                  </button>
                  <button
                    onClick={() => setRenderMode('points')}
                    className={`px-2.5 py-1 rounded text-xs transition-all cursor-pointer ${renderMode === 'points' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40' : 'text-slate-400 hover:text-white'}`}
                  >
                    {currentT.modePoints}
                  </button>
                </div>
              </div>

              {/* Canvas Container */}
              <div className="relative w-full h-[400px] bg-slate-950/90 rounded-2xl overflow-hidden flex items-center justify-center select-none touch-none">
                <canvas
                  ref={cubeCanvasRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                />

                {/* Top Controls Overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-all cursor-pointer"
                    title="Toggle Auto Spin"
                  >
                    {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => { rotAngleX.current = 0.3; rotAngleY.current = 0.4; }}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-all cursor-pointer"
                    title="Reset Orientation"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setZoomScale(z => Math.min(1.5, z + 0.15))}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-all cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setZoomScale(z => Math.max(0.6, z - 0.15))}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-all cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                </div>

                {/* Color Theme Selector in corner */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setThemeColor('#00F0FF')}
                    className={`w-4 h-4 rounded-full bg-cyan-400 transition-transform ${themeColor === '#00F0FF' ? 'scale-125 ring-2 ring-white' : 'opacity-70'}`}
                    title="Neon Cyan"
                  />
                  <button
                    onClick={() => setThemeColor('#A855F7')}
                    className={`w-4 h-4 rounded-full bg-purple-500 transition-transform ${themeColor === '#A855F7' ? 'scale-125 ring-2 ring-white' : 'opacity-70'}`}
                    title="Cyber Purple"
                  />
                  <button
                    onClick={() => setThemeColor('#EC4899')}
                    className={`w-4 h-4 rounded-full bg-pink-500 transition-transform ${themeColor === '#EC4899' ? 'scale-125 ring-2 ring-white' : 'opacity-70'}`}
                    title="Hyper Pink"
                  />
                  <button
                    onClick={() => setThemeColor('#10B981')}
                    className={`w-4 h-4 rounded-full bg-emerald-400 transition-transform ${themeColor === '#10B981' ? 'scale-125 ring-2 ring-white' : 'opacity-70'}`}
                    title="Matrix Emerald"
                  />
                </div>

                {/* Bottom Real-time Telemetry */}
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400">
                  FPS: <span className="text-cyan-400 font-bold">{liveFps}</span> | Mesh: <span className="text-slate-200 uppercase">{meshType}</span> | Zoom: {zoomScale.toFixed(2)}x
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Project Cost Estimator */}
      <section id="estimator" className="py-24 relative z-10 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">{currentT.calcSub}</h2>
            <p className="text-3xl sm:text-4xl font-black text-white mb-3">{currentT.calcTitle}</p>
            <p className="text-slate-400 text-sm">{currentT.calcDesc}</p>
          </div>

          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
            <div className="space-y-8">
              {/* Question 1: Project Type */}
              <div>
                <label className="block text-sm font-bold text-slate-200 mb-3">{currentT.calcTypeLabel}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div
                    onClick={() => { setProjectType(1500); setProjectTypeName('ar_mobile'); }}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${projectType === 1500 ? 'border-cyan-400 bg-cyan-950/20 shadow-neon-cyan/20' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'}`}
                  >
                    <span className="text-sm font-semibold text-white">{currentT.typeAr}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${projectType === 1500 ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'}`}>
                      {projectType === 1500 && <span className="w-1.5 h-1.5 rounded-full bg-black"></span>}
                    </div>
                  </div>

                  <div
                    onClick={() => { setProjectType(2200); setProjectTypeName('unity_custom'); }}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${projectType === 2200 ? 'border-cyan-400 bg-cyan-950/20 shadow-neon-cyan/20' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'}`}
                  >
                    <span className="text-sm font-semibold text-white">{currentT.typeUnity}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${projectType === 2200 ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'}`}>
                      {projectType === 2200 && <span className="w-1.5 h-1.5 rounded-full bg-black"></span>}
                    </div>
                  </div>

                  <div
                    onClick={() => { setProjectType(1800); setProjectTypeName('interactive_edu'); }}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${projectType === 1800 ? 'border-cyan-400 bg-cyan-950/20 shadow-neon-cyan/20' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'}`}
                  >
                    <span className="text-sm font-semibold text-white">{currentT.typeEdu}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${projectType === 1800 ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'}`}>
                      {projectType === 1800 && <span className="w-1.5 h-1.5 rounded-full bg-black"></span>}
                    </div>
                  </div>

                  <div
                    onClick={() => { setProjectType(1600); setProjectTypeName('webgl_3d'); }}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${projectType === 1600 ? 'border-cyan-400 bg-cyan-950/20 shadow-neon-cyan/20' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'}`}
                  >
                    <span className="text-sm font-semibold text-white">{currentT.typeWeb}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${projectType === 1600 ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'}`}>
                      {projectType === 1600 && <span className="w-1.5 h-1.5 rounded-full bg-black"></span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Question 2: Target Platforms */}
              <div>
                <label className="block text-sm font-bold text-slate-200 mb-3">{currentT.calcPlatLabel}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div
                    onClick={() => setPlatforms(p => ({ ...p, ios: !p.ios }))}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${platforms.ios ? 'border-cyan-400 bg-cyan-950/20' : 'border-slate-800 bg-slate-900/60'}`}
                  >
                    <span className="text-sm text-slate-300 font-semibold">{currentT.platIos}</span>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${platforms.ios ? 'bg-cyan-400 border-cyan-400 text-black' : 'border-slate-700'}`}>
                      {platforms.ios && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div
                    onClick={() => setPlatforms(p => ({ ...p, android: !p.android }))}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${platforms.android ? 'border-cyan-400 bg-cyan-950/20' : 'border-slate-800 bg-slate-900/60'}`}
                  >
                    <span className="text-sm text-slate-300 font-semibold">{currentT.platAndroid}</span>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${platforms.android ? 'bg-cyan-400 border-cyan-400 text-black' : 'border-slate-700'}`}>
                      {platforms.android && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div
                    onClick={() => setPlatforms(p => ({ ...p, webgl: !p.webgl }))}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${platforms.webgl ? 'border-cyan-400 bg-cyan-950/20' : 'border-slate-800 bg-slate-900/60'}`}
                  >
                    <span className="text-sm text-slate-300 font-semibold">{currentT.platWeb}</span>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${platforms.webgl ? 'bg-cyan-400 border-cyan-400 text-black' : 'border-slate-700'}`}>
                      {platforms.webgl && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div
                    onClick={() => setPlatforms(p => ({ ...p, vr: !p.vr }))}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${platforms.vr ? 'border-cyan-400 bg-cyan-950/20' : 'border-slate-800 bg-slate-900/60'}`}
                  >
                    <span className="text-sm text-slate-300 font-semibold">{currentT.platVr}</span>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${platforms.vr ? 'bg-cyan-400 border-cyan-400 text-black' : 'border-slate-700'}`}>
                      {platforms.vr && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Question 3: Additional Capabilities */}
              <div>
                <label className="block text-sm font-bold text-slate-200 mb-3">{currentT.calcFeatLabel}</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setFeatures(f => ({ ...f, backend: !f.backend }))}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${features.backend ? 'border-cyan-400 bg-cyan-950/20' : 'border-slate-800 bg-slate-900/60'}`}
                  >
                    <span className="text-sm text-slate-300 font-semibold">{currentT.featBackend}</span>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${features.backend ? 'bg-cyan-400 border-cyan-400 text-black' : 'border-slate-700'}`}>
                      {features.backend && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div
                    onClick={() => setFeatures(f => ({ ...f, modeling: !f.modeling }))}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${features.modeling ? 'border-cyan-400 bg-cyan-950/20' : 'border-slate-800 bg-slate-900/60'}`}
                  >
                    <span className="text-sm text-slate-300 font-semibold">{currentT.featModeling}</span>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${features.modeling ? 'bg-cyan-400 border-cyan-400 text-black' : 'border-slate-700'}`}>
                      {features.modeling && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div
                    onClick={() => setFeatures(f => ({ ...f, multiplayer: !f.multiplayer }))}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${features.multiplayer ? 'border-cyan-400 bg-cyan-950/20' : 'border-slate-800 bg-slate-900/60'}`}
                  >
                    <span className="text-sm text-slate-300 font-semibold">{currentT.featMultiplayer}</span>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${features.multiplayer ? 'bg-cyan-400 border-cyan-400 text-black' : 'border-slate-700'}`}>
                      {features.multiplayer && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimate Output Box */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                  <span className="text-xs text-cyan-400 font-bold block mb-1">{currentT.calcEstTitle}</span>
                  <div className="text-2xl sm:text-4xl font-black text-white mt-1">
                    {currentT.calcWeeksText(estimatedWeeksMin, estimatedWeeksMax)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={applyEstimateToForm}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-cyan-500 text-black font-black text-sm text-center shadow-neon-cyan hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{currentT.calcBookBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ZED */}
      <section id="why-zed" className="py-24 relative z-10 border-t border-slate-800/80 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">{currentT.whySub}</h2>
            <p className="text-3xl sm:text-5xl font-black text-white mb-4">{currentT.whyTitle}</p>
            <p className="text-slate-400 text-base">{currentT.whyDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xl mb-6 border border-cyan-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{currentT.why1Title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{currentT.why1Desc}</p>
            </div>

            <div className="glass-panel p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl mb-6 border border-purple-500/20">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{currentT.why2Title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{currentT.why2Desc}</p>
            </div>

            <div className="glass-panel p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center text-xl mb-6 border border-pink-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{currentT.why3Title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{currentT.why3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative z-10 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Info Column */}
            <div className="lg:col-span-5">
              <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">{currentT.contactSub}</h2>
              <h3 className="text-3xl sm:text-5xl font-black text-white mb-6">{currentT.contactTitle}</h3>
              <p className="text-slate-400 text-base leading-relaxed mb-8">{currentT.contactDesc}</p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">{currentT.contactEmailLabel}</span>
                    <a href="mailto:contact@zed.com" className="text-white font-bold hover:text-cyan-400 transition-colors">
                      contact@zed.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">{currentT.contactHoursLabel}</span>
                    <span className="text-white font-bold">{currentT.contactHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
                {formSubmitted && (
                  <div className="mb-6 p-4 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-sm font-semibold flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{currentT.formSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2">{currentT.formName}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={lang === 'ar' ? 'أحمد علي' : 'Alex Mercer'}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2">{currentT.formEmail}</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={lang === 'ar' ? 'ahmed@company.com' : 'alex@company.com'}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2">{currentT.formPhone}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966 50 000 0000"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2">{currentT.formService}</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        <option value="ar">{currentT.serv1Title}</option>
                        <option value="unity">{currentT.serv2Title}</option>
                        <option value="edu">{currentT.serv3Title}</option>
                        <option value="consultation">{lang === 'ar' ? 'استشارة تقنية ومراجعة كود' : 'Architecture & Code Review'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">{currentT.formNotes}</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={lang === 'ar' ? 'اكتب نبذة مختصرة عن أهداف مشروعك، والمنصات المطلوبة...' : 'Describe your project objectives, timeline, target devices...'}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-black font-extrabold text-base shadow-neon-cyan hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{currentT.formSubmit}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-12 relative z-10 text-sm text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="font-black text-xl text-white tracking-widest">
                ZED<span className="text-cyan-400">.COM</span>
              </span>
              <span className="text-xs text-slate-500 border-r border-slate-800 pr-3 mr-3">
                {currentT.footerCopy}
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#services" className="hover:text-cyan-400 transition-colors text-xs">{currentT.navServices}</a>
              <a href="#portfolio" className="hover:text-cyan-400 transition-colors text-xs">{currentT.navPortfolio}</a>
              <a href="#estimator" className="hover:text-cyan-400 transition-colors text-xs">{currentT.navEstimator}</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors text-xs">{currentT.navContact}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
