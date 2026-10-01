import { useState, useEffect } from 'react';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Mail,
  Phone,
  Globe,
  Menu,
  X,
  Eye,
  Target,
  Monitor,
  Cpu,
  ArrowRight,
  BarChart3,
  Coins,
  Clock
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [homeVersion, setHomeVersion] = useState<'home1' | 'home2'>('home1');
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ROI Calculator Draft Inputs
  const [locationType, setLocationType] = useState<string>('Highway');
  const [investmentAmount, setInvestmentAmount] = useState<number | string>(5000000);
  const [powerCapacity, setPowerCapacity] = useState<string>('240 kW');

  // Displayed ROI Results (ONLY updated when user clicks "Calculate ROI")
  const [displayRevenue, setDisplayRevenue] = useState<number>(1856000);
  const [displayProfit, setDisplayProfit] = useState<number>(519680);
  const [displayRoiPercent, setDisplayRoiPercent] = useState<number>(28);
  const [displayPaybackMin, setDisplayPaybackMin] = useState<number>(3);
  const [displayPaybackMax, setDisplayPaybackMax] = useState<number>(4);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Explicit calculation handler triggered ONLY on Calculate ROI button click
  const handleCalculateRoi = () => {
    setIsCalculating(true);
    const numInvestment = typeof investmentAmount === 'number'
      ? investmentAmount
      : parseFloat(String(investmentAmount).replace(/[^0-9.]/g, '')) || 5000000;
    const numPowerKw = parseFloat(String(powerCapacity).replace(/[^0-9.]/g, '')) || 240;

    const locMultiplier = locationType === 'Highway' ? 1.0 : locationType === 'City' ? 0.9 : 1.1;
    const powerMultiplier = Math.max(0.6, numPowerKw / 240);

    const rev = Math.round(numInvestment * 0.3712 * locMultiplier * (0.85 + 0.15 * powerMultiplier));
    const profit = Math.round(rev * 0.28);
    const roi = Math.min(99, Math.max(5, Math.round((profit / Math.max(100000, numInvestment)) * 100 * 2.7)));
    const pMin = Math.max(1, Math.round(numInvestment / Math.max(1, profit * 3.3)));
    const pMax = pMin + 1;

    setTimeout(() => {
      setDisplayRevenue(rev);
      setDisplayProfit(profit);
      setDisplayRoiPercent(roi);
      setDisplayPaybackMin(pMin);
      setDisplayPaybackMax(pMax);
      setIsCalculating(false);

      const el = document.getElementById('results-panel');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.classList.add('ring-4', 'ring-[#008726]/40');
        setTimeout(() => el.classList.remove('ring-4', 'ring-[#008726]/40'), 1200);
      }
    }, 150);
  };

  // Track window scroll position to switch header background from transparent to sticky white
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f8f4] text-gray-800 font-sans selection:bg-emerald-200">

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-emerald-100 text-gray-800 py-0'
          : homeVersion === 'home2'
            ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white py-2'
            : 'bg-transparent text-gray-800 py-2'
          }`}
      >
        <div className={`w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16 sm:h-18' : 'h-24 sm:h-28'
          }`}>

          {/* Logo Container */}
          <div className="flex items-center">
            <img
              src="/LOGO.png"
              alt="EVOLTEK - Charge Smart. Drive Green."
              className={`w-auto object-contain cursor-pointer transition-all duration-300 hover:scale-105 ${isScrolled ? 'h-11 sm:h-13 lg:h-15' : 'h-18 sm:h-24 lg:h-28'
                }`}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-10 font-medium text-sm sm:text-base">

            {/* Home Link with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHomeDropdownOpen(true)}
              onMouseLeave={() => setHomeDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  setActiveTab('Home');
                  setHomeDropdownOpen(!homeDropdownOpen);
                }}
                className={`relative py-2 flex items-center gap-1.5 transition-colors cursor-pointer ${homeVersion === 'home2' && !isScrolled
                  ? activeTab === 'Home' ? 'text-emerald-400 font-bold' : 'text-white/90 hover:text-white'
                  : activeTab === 'Home' ? 'text-[#1a7d0d] font-bold' : 'text-gray-700 hover:text-[#1a7d0d]'
                  }`}
              >
                <span>Home</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${homeDropdownOpen ? 'rotate-180' : ''}`} />
                {activeTab === 'Home' && (
                  <span className={`absolute bottom-0 left-0 w-full h-[3px] rounded-full ${homeVersion === 'home2' && !isScrolled ? 'bg-emerald-400' : 'bg-[#1a7d0d]'
                    }`} />
                )}
              </button>

              {/* Home Dropdown Menu */}
              {homeDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-emerald-100 py-2 z-50 text-gray-800 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => {
                      setHomeVersion('home1');
                      setActiveTab('Home');
                      setHomeDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-semibold flex items-center justify-between hover:bg-emerald-50 hover:text-[#1a7d0d] transition-colors ${homeVersion === 'home1' ? 'text-[#1a7d0d] bg-emerald-50/70 font-bold' : 'text-gray-700'
                      }`}
                  >
                    <span>Home 1 (Image Version)</span>
                    {homeVersion === 'home1' && <span className="w-2.5 h-2.5 rounded-full bg-[#1a7d0d]" />}
                  </button>

                  <button
                    onClick={() => {
                      setHomeVersion('home2');
                      setActiveTab('Home');
                      setHomeDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-semibold flex items-center justify-between hover:bg-emerald-50 hover:text-[#1a7d0d] transition-colors ${homeVersion === 'home2' ? 'text-[#1a7d0d] bg-emerald-50/70 font-bold' : 'text-gray-700'
                      }`}
                  >
                    <span>Home 2 (Video Version)</span>
                    {homeVersion === 'home2' && <span className="w-2.5 h-2.5 rounded-full bg-[#1a7d0d]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Other Navigation Links */}
            {['About', 'Stations', 'Investment', 'App', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                }}
                className={`relative py-2 transition-colors cursor-pointer ${homeVersion === 'home2' && !isScrolled
                  ? activeTab === item ? 'text-emerald-400 font-bold' : 'text-white/90 hover:text-white'
                  : activeTab === item ? 'text-[#1a7d0d] font-bold' : 'text-gray-700 hover:text-[#1a7d0d]'
                  }`}
              >
                {item}
                {activeTab === item && (
                  <span className={`absolute bottom-0 left-0 w-full h-[3px] rounded-full ${homeVersion === 'home2' && !isScrolled ? 'bg-emerald-400' : 'bg-[#1a7d0d]'
                    }`} />
                )}
              </button>
            ))}
          </nav>

          {/* Top Right Action Button & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('roi-calculator') || document.getElementById('investment');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden md:flex bg-[#1a7d0d] hover:bg-[#135d09] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-extrabold text-xs sm:text-sm items-center gap-2 shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer border border-emerald-400/30 shrink-0"
            >
              <span>Invest Now</span>
              <span className="w-5 h-5 bg-white text-[#1a7d0d] rounded-full flex items-center justify-center shrink-0">
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-1.5 sm:p-2 rounded-lg focus:outline-none transition-colors shrink-0 ${homeVersion === 'home2' && !isScrolled ? 'text-white hover:bg-white/20' : 'text-gray-800 hover:bg-gray-100'
                }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white text-gray-800 border-b border-emerald-100 px-4 pt-2 pb-5 space-y-2 shadow-2xl">
            {/* Mobile Home Options */}
            <div className="bg-emerald-50/60 p-2 rounded-xl space-y-1">
              <span className="text-xs font-bold text-[#1a7d0d] uppercase tracking-wider px-2">Home Versions</span>
              <button
                onClick={() => {
                  setHomeVersion('home1');
                  setActiveTab('Home');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-between ${homeVersion === 'home1' ? 'bg-[#1a7d0d] text-white' : 'text-gray-700 hover:bg-emerald-100'
                  }`}
              >
                <span>Home 1 (Image Version)</span>
                {homeVersion === 'home1' && <CheckCircle2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  setHomeVersion('home2');
                  setActiveTab('Home');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-between ${homeVersion === 'home2' ? 'bg-[#1a7d0d] text-white' : 'text-gray-700 hover:bg-emerald-100'
                  }`}
              >
                <span>Home 2 (Video Version)</span>
                {homeVersion === 'home2' && <CheckCircle2 className="w-4 h-4" />}
              </button>
            </div>

            {['About', 'Stations', 'Investment', 'App', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${activeTab === item
                  ? 'bg-emerald-50 text-[#1a7d0d] font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {item}
              </button>
            ))}

            {/* Mobile Invest Now CTA Button inside Hamburger Drawer */}
            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById('roi-calculator') || document.getElementById('investment');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-[#1a7d0d] hover:bg-[#135d09] text-white py-3 rounded-full font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer border border-emerald-400/30"
              >
                <span>Invest Now</span>
                <span className="w-5 h-5 bg-white text-[#1a7d0d] rounded-full flex items-center justify-center shrink-0">
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              </button>
            </div>

          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      {homeVersion === 'home1' ? (

        /* HOME 1: HERO DESIGN WITH hero 1.png BACKGROUND */
        <div className="relative w-full overflow-hidden bg-white">
          <section className="relative w-full aspect-[1059/1485] md:aspect-none md:h-screen md:min-h-[650px] lg:min-h-[720px] flex flex-col justify-start md:justify-center pt-20 xs:pt-24 md:pt-28 lg:pt-32 pb-4 md:pb-8 px-4 md:px-8 lg:px-12">

            {/* Background Image: Explicit Mobile (mobile version hero section.png) & Desktop (hero 1.png) */}
            <div className="absolute inset-0 z-0">
              {/* Mobile Only Background Image (< 768px) */}
              <img
                src="/mobile version hero section.png"
                alt="EVOLTEK Mobile Hero Section"
                className="block md:hidden w-full h-full object-contain object-top"
              />

              {/* Desktop & Tablet Background Image (>= 768px) */}
              <img
                src="/hero 1.png"
                alt="EVOLTEK Desktop Hero Section"
                className="hidden md:block w-full h-full object-cover object-right-top"
              />
            </div>

            {/* Left Content Column over the clean blue sky area */}
            <div className="relative z-10 max-w-2xl space-y-2 xs:space-y-3 md:space-y-6 pt-1 md:pt-6">
              <h1 className="mobile-hero-title font-black tracking-tight text-[#0a7a0e] drop-shadow-2xs md:text-5xl lg:text-6xl md:leading-tight md:mt-0">
                HIGHWAY CHARGING.<br />
                HIGHWAY EXPERIENCE.
              </h1>

              <p className="text-gray-800 text-[11px] xs:text-xs md:text-xl font-bold leading-snug md:leading-relaxed max-w-md">
                Charge your EV while you relax,refresh and explore.
              </p>

              {/* Action Buttons in ONE ROW on Mobile */}
              <div className="flex flex-row items-center gap-2 md:gap-4 pt-1 xs:pt-2 md:pt-4 overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => {
                    const el = document.getElementById('roi-calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#0a8020] hover:bg-[#076819] text-white font-extrabold text-[11px] xs:text-xs md:text-base px-3.5 xs:px-4 md:px-8 py-2 xs:py-2.5 md:py-3.5 rounded-full flex items-center gap-1.5 xs:gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <span>Explore Stations</span>
                  <span className="w-4 h-4 xs:w-5 xs:h-5 bg-white text-[#0a8020] rounded-full flex items-center justify-center shrink-0">
                    <ChevronRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 stroke-[3]" />
                  </span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('roi-calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white hover:bg-emerald-50 text-[#0a8020] border-2 border-[#0a8020] font-extrabold text-[11px] xs:text-xs md:text-base px-3.5 xs:px-4 md:px-8 py-2 xs:py-2.5 md:py-3.5 rounded-full flex items-center gap-1.5 xs:gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <span>Become an Investor</span>
                  <span className="w-4 h-4 xs:w-5 xs:h-5 bg-[#0a8020] text-white rounded-full flex items-center justify-center shrink-0">
                    <ChevronRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 stroke-[3]" />
                  </span>
                </button>
              </div>
            </div>

          </section>
        </div>

      ) : (

        /* HOME 2: 100VH VIDEO HERO DESIGN */
        <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-between overflow-hidden bg-black text-white">
          {/* Video Background Layer */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105"
            >
              <source src="/video/gemini_generated_video_6e6e4eca.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Bottom Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />

          {/* Bottom Animated Scroll Indicator */}
          <div
            onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
            className="relative z-10 pb-8 flex flex-col items-center justify-center text-white/80 hover:text-emerald-300 transition-colors cursor-pointer group mt-auto"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-1">
              Scroll to Explore
            </span>
            <div className="w-8 h-8 rounded-full border border-emerald-400/40 bg-black/40 backdrop-blur-xs flex items-center justify-center group-hover:border-emerald-400 transition-colors animate-bounce">
              <ChevronDown className="w-5 h-5 text-emerald-300" />
            </div>
          </div>
        </section>

      )}



      {/* MAIN CONTENT BELOW HERO */}
      <main className="w-full px-4 sm:px-8 lg:px-12 py-10 space-y-12 sm:space-y-16">

        {/* 2.5 WHAT IS EVOLTEK, VISION & MISSION SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left Card: 1. What is Evoltek? WITH section 2.png BACKGROUND ONLY */}
          <div className="lg:col-span-6 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-emerald-950/5 border border-emerald-200/80 p-7 sm:p-9 lg:p-10 min-h-[270px] sm:min-h-[300px] shadow-sm hover:shadow-md transition-all flex flex-col justify-center">

            {/* Background Image: section 2.png ONLY for What is Evoltek card */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/section 2.png"
                alt="Evoltek Eco Background"
                className="w-full h-full object-cover object-center opacity-85 hover:scale-105 transition-transform duration-700"
              />
              {/* Soft overlay gradient to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/50" />
            </div>

            <div className="relative z-10 space-y-4 max-w-xl">
              <h2 className="text-xl sm:text-2xl font-black text-[#1a7d0d] tracking-tight">
                1. What is Evoltek?
              </h2>

              <div className="space-y-3 text-sm sm:text-base text-gray-800 leading-relaxed font-semibold">
                <p>
                  Evoltek is a new-generation EV charging station concept designed to build a convenient, reliable, and scalable charging network across cities and highways.
                </p>
                <p>
                  With the vision of <span className="font-bold text-[#1a7d0d]">"Powering Every Journey,"</span> Evoltek aims to make electric vehicle charging easily accessible for daily city commuters as well as long-distance highway travellers.
                </p>
              </div>
            </div>
          </div>

          {/* Right Card: Evoltek Vision & Mission */}
          <div className="lg:col-span-6 bg-white border border-emerald-100 rounded-2xl sm:rounded-3xl p-7 sm:p-9 lg:p-10 min-h-[270px] sm:min-h-[300px] shadow-sm hover:shadow-md transition-all flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-emerald-200/80 items-start">

              {/* Vision Column */}
              <div className="space-y-3 pt-2 sm:pt-0 sm:pr-4">
                <div className="flex items-center gap-3">
                  <Eye className="w-11 h-11 sm:w-13 sm:h-13 text-[#1a7d0d] shrink-0 stroke-[2.5]" />
                  <h3 className="text-lg sm:text-xl font-black text-[#1a7d0d]">
                    Evoltek Vision
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-semibold">
                  To build a smart and accessible EV charging network connecting cities, highways and destinations, enabling electric mobility without range anxiety.
                </p>
              </div>

              {/* Mission Column */}
              <div className="space-y-3 pt-4 sm:pt-0 sm:pl-4">
                <div className="flex items-center gap-3">
                  <Target className="w-11 h-11 sm:w-13 sm:h-13 text-[#1a7d0d] shrink-0 stroke-[2.5]" />
                  <h3 className="text-lg sm:text-xl font-black text-[#1a7d0d]">
                    Evoltek Mission
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-semibold">
                  To establish strategically located EV charging stations with reliable technology, fast charging, simple digital payments, high uptime and a customer-friendly charging experience.
                </p>
              </div>

            </div>
          </div>

        </section>

        {/* 3. AMENITIES FEATURE STRIP (AFTER WHAT IS EVOLTEK) */}
        <section className="w-full bg-white rounded-3xl border border-emerald-100/90 p-6 sm:p-8 lg:p-10 shadow-lg">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 divide-y sm:divide-y-0 divide-emerald-100 sm:divide-x sm:divide-emerald-200/80">

            {/* 1. Fast Charging */}
            <div className="flex flex-col items-center justify-center text-center p-3 group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mb-3 flex items-center justify-center">
                <img
                  src="/amenity_fast_charging.jpg"
                  alt="Fast Charging"
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-xs sm:text-base font-extrabold text-gray-900">Fast<br />Charging</span>
            </div>

            {/* 2. Restaurants */}
            <div className="flex flex-col items-center justify-center text-center p-3 group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mb-3 flex items-center justify-center">
                <img
                  src="/amenity_restaurants.jpg"
                  alt="Restaurants"
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-xs sm:text-base font-extrabold text-gray-900">Restaurants</span>
            </div>

            {/* 3. Wi-Fi */}
            <div className="flex flex-col items-center justify-center text-center p-3 group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mb-3 flex items-center justify-center">
                <img
                  src="/amenity_wifi.jpg"
                  alt="Wi-Fi"
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-xs sm:text-base font-extrabold text-gray-900">Wi-Fi</span>
            </div>

            {/* 4. Parks & Relaxation */}
            <div className="flex flex-col items-center justify-center text-center p-3 group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mb-3 flex items-center justify-center">
                <img
                  src="/amenity_parks.jpg"
                  alt="Parks & Relaxation"
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-xs sm:text-base font-extrabold text-gray-900">Parks &<br />Relaxation</span>
            </div>

            {/* 5. Rooms / Rest Facilities */}
            <div className="flex flex-col items-center justify-center text-center p-3 group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mb-3 flex items-center justify-center">
                <svg className="w-full h-full group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="24" width="48" height="28" rx="6" fill="#1a7d0d" />
                  <rect x="12" y="18" width="40" height="12" rx="4" fill="#4ade80" />
                  <path d="M12 40H52V46C52 48.2091 50.2091 50 48 50H16C13.7909 50 12 48.2091 12 46V40Z" fill="#15803d" />
                  <rect x="16" y="28" width="14" height="8" rx="2" fill="#ffffff" />
                  <rect x="34" y="28" width="14" height="8" rx="2" fill="#ffffff" />
                </svg>
              </div>
              <span className="text-xs sm:text-base font-extrabold text-gray-900">Rooms / Rest<br />Facilities</span>
            </div>

            {/* 6. Lounges */}
            <div className="flex flex-col items-center justify-center text-center p-3 group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mb-3 flex items-center justify-center">
                <svg className="w-full h-full group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="14" y="20" width="32" height="32" rx="8" fill="#1a7d0d" />
                  <path d="M46 26H52C54.7614 26 57 28.2386 57 31V37C57 39.7614 54.7614 42 52 42H46V26Z" fill="#15803d" />
                  <ellipse cx="30" cy="20" rx="14" ry="4" fill="#4ade80" />
                  <path d="M22 14C22 12 24 10 24 8" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M30 14C30 12 32 10 32 8" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M38 14C38 12 40 10 40 8" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-xs sm:text-base font-extrabold text-gray-900">Lounges</span>
            </div>

          </div>
        </section>



        {/* 4. OUR CHARGING STATIONS */}
        <section className="space-y-8 py-2">
          {/* Section Heading with lines */}
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="h-[2px] w-12 sm:w-20 bg-[#1a7d0d]" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1a7d0d] tracking-wider uppercase text-center">
              OUR CHARGING STATIONS
            </h2>
            <div className="h-[2px] w-12 sm:w-20 bg-[#1a7d0d]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

            {/* Card 1: Highway Station */}
            <div className="bg-white rounded-3xl border border-emerald-200/80 p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#1a7d0d]">
                  HIGHWAY STATION
                </h3>
                <div className="w-10 h-[3px] bg-[#1a7d0d] mt-1.5 mb-4 rounded-full" />

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <ul className="sm:col-span-6 space-y-3">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-[#1a7d0d] shrink-0 stroke-[2.5]" />
                      <span className="text-sm font-bold text-gray-800">Min. 1 Acre Space</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-[#1a7d0d] shrink-0 stroke-[2.5]" />
                      <span className="text-sm font-bold text-gray-800">60 – 480 kW Power</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-[#1a7d0d] shrink-0 stroke-[2.5]" />
                      <span className="text-sm font-bold text-gray-800">DC Fast Charging</span>
                    </li>
                  </ul>

                  <div className="sm:col-span-6 overflow-hidden h-44 sm:h-52 lg:h-56 flex items-center justify-center">
                    <img
                      src="/highway_hero_station.jpg"
                      alt="Highway Charging Station Plaza"
                      className="max-h-full h-full w-auto object-contain rounded-2xl hover:scale-105 transition-transform duration-500 drop-shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: City Station */}
            <div className="bg-white rounded-3xl border border-emerald-200/80 p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#1a7d0d]">
                  CITY STATION
                </h3>
                <div className="w-10 h-[3px] bg-[#1a7d0d] mt-1.5 mb-4 rounded-full" />

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <ul className="sm:col-span-6 space-y-3">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-[#1a7d0d] shrink-0 stroke-[2.5]" />
                      <span className="text-sm font-bold text-gray-800">Min. 2000 sq ft Space</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-[#1a7d0d] shrink-0 stroke-[2.5]" />
                      <span className="text-sm font-bold text-gray-800">60 – 480 kW Power</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-[#1a7d0d] shrink-0 stroke-[2.5]" />
                      <span className="text-sm font-bold text-gray-800">DC Fast Charging</span>
                    </li>
                  </ul>

                  <div className="sm:col-span-6 flex items-center justify-center h-48 sm:h-56 lg:h-64 w-full p-1">
                    <img
                      src="/charging station.png"
                      alt="City Charger Kiosk"
                      className="max-h-full h-full w-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5. INVESTMENT MODEL: COLLABORATION */}
        <section className="relative space-y-8 py-6 overflow-hidden">

          {/* Header */}
          <div className="text-center space-y-1 relative z-10">
            <div className="flex items-center justify-center gap-4 py-1">
              <div className="h-[2px] w-12 sm:w-20 bg-[#1a7d0d]" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1a7d0d] tracking-wider uppercase text-center">
                INVESTMENT MODEL: COLLABORATION
              </h2>
              <div className="h-[2px] w-12 sm:w-20 bg-[#1a7d0d]" />
            </div>
            <p className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-gray-600">
              EVOLTEK &amp; INVESTOR – GROWING TOGETHER
            </p>
          </div>

          {/* 3 Column Graphic: Left Circle (Evoltek Plaza) | Center 50%/50% Handshake | Right Circle (Investment Coins) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full my-4 relative z-10">

            {/* Left Circle: EVOLTEK Charging Station Plaza */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div className="relative p-2 rounded-full border-4 border-[#1a7d0d] bg-white shadow-xl max-w-[280px] sm:max-w-[320px] w-full aspect-square group z-10">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-inner">
                  <img
                    src="/evoltek_charging_plaza_circle.jpg"
                    alt="Evoltek Charging Station Plaza"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Center: 50% EVOLTEK | Handshake | 50% INVESTOR */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center text-center space-y-3 py-4 lg:py-0 relative z-20">
              <div>
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a7d0d] tracking-tight leading-none block">
                  50%
                </span>
                <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#1a7d0d] uppercase block mt-1">
                  EVOLTEK
                </span>
              </div>

              {/* Handshake Badge flanked by lines */}
              <div className="flex items-center justify-center gap-3 my-2 w-full">
                <div className="h-[2px] w-8 sm:w-12 bg-[#1a7d0d]" />
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#1a7d0d] bg-white overflow-hidden shadow-xl shrink-0 p-2 group hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden border border-emerald-100 flex items-center justify-center bg-white p-1">
                    <img
                      src="/handshake.png"
                      alt="Handshake Partnership"
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="h-[2px] w-8 sm:w-12 bg-[#1a7d0d]" />
              </div>

              <div>
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a7d0d] tracking-tight leading-none block">
                  50%
                </span>
                <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#1a7d0d] uppercase block mt-1">
                  INVESTOR
                </span>
              </div>
            </div>

            {/* Right Circle: Investment Coins Growth */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div className="relative p-2 rounded-full border-4 border-[#1a7d0d] bg-white shadow-xl max-w-[280px] sm:max-w-[320px] w-full aspect-square group z-10">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-inner">
                  <img
                    src="/investment_growth_coins_circle.jpg"
                    alt="Investment Growth Coins"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom 5 Feature Columns - 2 per row on Mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 pt-6 border-t border-emerald-200/60 w-full relative z-10 text-center">

            <div className="flex flex-col items-center p-3 space-y-2 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-1 flex items-center justify-center">
                <svg className="w-full h-full group-hover:scale-110 transition-transform duration-300 drop-shadow-md" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="sharedGrad1" x1="8" y1="12" x2="56" y2="52" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#22c55e" />
                      <stop offset="1" stopColor="#15803d" />
                    </linearGradient>
                    <linearGradient id="sharedGrad2" x1="16" y1="8" x2="48" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fbbf24" />
                      <stop offset="1" stopColor="#d97706" />
                    </linearGradient>
                  </defs>

                  {/* 3D Base Platform */}
                  <circle cx="32" cy="35" r="25" fill="#14532d" />
                  <circle cx="32" cy="31" r="25" fill="url(#sharedGrad1)" />

                  {/* Left 3D Coin (Evoltek 50%) */}
                  <ellipse cx="23" cy="32" rx="12" ry="12" fill="#b45309" />
                  <circle cx="23" cy="29" r="12" fill="url(#sharedGrad2)" />
                  <circle cx="23" cy="29" r="9.5" stroke="#fef08a" strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
                  <text x="23" y="33" textAnchor="middle" fill="#78350f" fontSize="8.5" fontWeight="900" fontFamily="sans-serif">50%</text>

                  {/* Right 3D Coin (Investor 50%) */}
                  <ellipse cx="41" cy="38" rx="12" ry="12" fill="#064e3b" />
                  <circle cx="41" cy="35" r="12" fill="#4ade80" />
                  <circle cx="41" cy="35" r="9.5" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
                  <text x="41" y="39" textAnchor="middle" fill="#064e3b" fontSize="8.5" fontWeight="900" fontFamily="sans-serif">50%</text>

                  {/* Center 3D Growth Sparkle Star */}
                  <path d="M32 15L34.5 21.5L41 24L34.5 26.5L32 33L29.5 26.5L23 24L29.5 21.5L32 15Z" fill="#fef08a" />
                </svg>
              </div>
              <h4 className="text-sm font-black text-[#1a7d0d]">
                Shared<br />Investment
              </h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[180px]">
                You invest only half the cost, and Evoltek invests the other half.
              </p>
            </div>

            <div className="flex flex-col items-center p-3 space-y-2 pt-4 sm:pt-3 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-1 flex items-center justify-center">
                <img
                  src="/feat_maintenance.jpg"
                  alt="Hassle-free Maintenance"
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h4 className="text-sm font-black text-[#1a7d0d]">
                Hassle-free<br />Maintenance
              </h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[180px]">
                Evoltek takes care of setup, operations and station maintenance.
              </p>
            </div>

            <div className="flex flex-col items-center p-3 space-y-2 pt-4 sm:pt-3 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-1 flex items-center justify-center">
                <img
                  src="/feat_return_options.jpg"
                  alt="Two Return Options"
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h4 className="text-sm font-black text-[#1a7d0d]">
                Two Return<br />Options
              </h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[180px]">
                Choose between a percentage return or a fixed return.
              </p>
            </div>

            <div className="flex flex-col items-center p-3 space-y-2 pt-4 sm:pt-3 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-1 flex items-center justify-center">
                <img
                  src="/feat_agreements.jpg"
                  alt="Secure Agreements"
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h4 className="text-sm font-black text-[#1a7d0d]">
                Secure<br />Agreements
              </h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[180px]">
                Long-term agreement of 5 or 10 years, renewable.
              </p>
            </div>

            <div className="flex flex-col items-center p-3 space-y-2 pt-4 sm:pt-3 col-span-1 sm:col-span-3 lg:col-span-1 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-1 flex items-center justify-center">
                <img
                  src="/feat_app_transparency.jpg"
                  alt="Transparency with App"
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h4 className="text-sm font-black text-[#1a7d0d]">
                Transparency<br />with App
              </h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[180px]">
                Track your station's performance through the Evoltek mobile app.
              </p>
            </div>

          </div>
        </section>

        {/* 5.5 OUR CHARGER MODELS */}
        <section className="space-y-8 py-4">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-4 py-1">
              <div className="h-[2px] w-12 sm:w-20 bg-[#1a7d0d]" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1a7d0d] tracking-wider uppercase text-center">
                OUR CHARGER MODELS
              </h2>
              <div className="h-[2px] w-12 sm:w-20 bg-[#1a7d0d]" />
            </div>
            <p className="text-xs sm:text-sm font-extrabold tracking-wide text-gray-600">
              High-performance DC fast chargers designed for every need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

            {/* Model 1: 360 kW DC */}
            <div className="bg-white rounded-3xl border border-emerald-200/80 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                  <span className="px-3.5 py-1.5 bg-[#073d1c] text-white text-xs sm:text-sm font-black rounded-lg tracking-wider uppercase shadow-2xs">
                    360 kW DC
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-gray-600 text-right">
                    For Highways &amp; Heavy Usage
                  </p>
                </div>

                {/* Center Image */}
                <div className="my-5 flex items-center justify-center h-64 sm:h-72 lg:h-80">
                  <img
                    src="/charging station.png"
                    alt="360 kW DC Charger"
                    className="max-h-full h-full w-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  />
                </div>

                {/* Specs Box */}
                <div className="bg-emerald-50/60 rounded-2xl p-4.5 sm:p-5 border border-emerald-100/90 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5.5 h-5.5 text-[#1a7d0d] shrink-0 mt-0.5 stroke-[2.2]" />
                    <div>
                      <span className="text-sm font-extrabold text-gray-900 block">Input Power</span>
                      <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug block">
                        380-415 Vac; 50/60Hz; Three-phase (L1, L2, L3, N, PE)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Monitor className="w-5.5 h-5.5 text-[#1a7d0d] shrink-0 mt-0.5 stroke-[2.2]" />
                    <div>
                      <span className="text-sm font-extrabold text-gray-900 block">Display</span>
                      <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug block">
                        7" TFT LCD with Touch Control
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Cpu className="w-5.5 h-5.5 text-[#1a7d0d] shrink-0 mt-0.5 stroke-[2.2]" />
                    <div>
                      <span className="text-sm font-extrabold text-gray-900 block">Charger &amp; CMS</span>
                      <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug block">
                        Protocol: OCPP 1.6
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5.5 h-5.5 text-[#1a7d0d] shrink-0 mt-0.5 stroke-[2.2]" />
                    <div>
                      <span className="text-sm font-extrabold text-gray-900 block">Ingress Protection</span>
                      <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug block">
                        IP55
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Model 2: 120 kW DC */}
            <div className="bg-white rounded-3xl border border-emerald-200/80 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                  <span className="px-3.5 py-1.5 bg-[#073d1c] text-white text-xs sm:text-sm font-black rounded-lg tracking-wider uppercase shadow-2xs">
                    120 kW DC
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-gray-600 text-right">
                    For Cities &amp; Commercial Spaces
                  </p>
                </div>

                {/* Center Image */}
                <div className="my-5 flex items-center justify-center h-64 sm:h-72 lg:h-80">
                  <img
                    src="/charging station.png"
                    alt="120 kW DC Charger"
                    className="max-h-full h-full w-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  />
                </div>

                {/* Specs Box */}
                <div className="bg-emerald-50/60 rounded-2xl p-4.5 sm:p-5 border border-emerald-100/90 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5.5 h-5.5 text-[#1a7d0d] shrink-0 mt-0.5 stroke-[2.2]" />
                    <div>
                      <span className="text-sm font-extrabold text-gray-900 block">Input Power</span>
                      <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug block">
                        230 Vac, Single phase, 16A or 32A maximum, 50/60 Hz
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Monitor className="w-5.5 h-5.5 text-[#1a7d0d] shrink-0 mt-0.5 stroke-[2.2]" />
                    <div>
                      <span className="text-sm font-extrabold text-gray-900 block">Display</span>
                      <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug block">
                        7" TFT LCD with Touch Control
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Cpu className="w-5.5 h-5.5 text-[#1a7d0d] shrink-0 mt-0.5 stroke-[2.2]" />
                    <div>
                      <span className="text-sm font-extrabold text-gray-900 block">Charger &amp; CMS</span>
                      <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug block">
                        Protocol: OCPP 1.6
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5.5 h-5.5 text-[#1a7d0d] shrink-0 mt-0.5 stroke-[2.2]" />
                    <div>
                      <span className="text-sm font-extrabold text-gray-900 block">Ingress Protection</span>
                      <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug block">
                        IP55
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Model 3: 240 kW DC */}
            <div className="bg-white rounded-3xl border border-emerald-200/80 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                  <span className="px-3.5 py-1.5 bg-[#073d1c] text-white text-xs sm:text-sm font-black rounded-lg tracking-wider uppercase shadow-2xs">
                    240 kW DC
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-gray-600 text-right">
                    For Highways &amp; Fleets
                  </p>
                </div>

                {/* Center Image */}
                <div className="my-5 flex items-center justify-center h-64 sm:h-72 lg:h-80">
                  <img
                    src="/charging station.png"
                    alt="240 kW DC Charger"
                    className="max-h-full h-full w-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  />
                </div>

                {/* Specs Box */}
                <div className="bg-emerald-50/60 rounded-2xl p-4.5 sm:p-5 border border-emerald-100/90 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5.5 h-5.5 text-[#1a7d0d] shrink-0 mt-0.5 stroke-[2.2]" />
                    <div>
                      <span className="text-sm font-extrabold text-gray-900 block">Input Power</span>
                      <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug block">
                        360-440 Vac; 50 Hz; Three-phase (L1, L2, L3, N, PE)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Monitor className="w-5.5 h-5.5 text-[#1a7d0d] shrink-0 mt-0.5 stroke-[2.2]" />
                    <div>
                      <span className="text-sm font-extrabold text-gray-900 block">Display</span>
                      <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug block">
                        7" TFT LCD with Touch Control
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Cpu className="w-5.5 h-5.5 text-[#1a7d0d] shrink-0 mt-0.5 stroke-[2.2]" />
                    <div>
                      <span className="text-sm font-extrabold text-gray-900 block">Charger &amp; CMS</span>
                      <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug block">
                        Protocol: OCPP 1.6
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5.5 h-5.5 text-[#1a7d0d] shrink-0 mt-0.5 stroke-[2.2]" />
                    <div>
                      <span className="text-sm font-extrabold text-gray-900 block">Ingress Protection</span>
                      <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug block">
                        IP55
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. HOW TO GET STARTED */}
        <section className="space-y-12 py-8 w-full">
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="h-[2px] w-16 sm:w-28 bg-[#1a7d0d]" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1a7d0d] tracking-wider uppercase text-center">
              HOW TO GET STARTED
            </h2>
            <div className="h-[2px] w-16 sm:w-28 bg-[#1a7d0d]" />
          </div>

          <div className="relative w-full max-w-full px-4 sm:px-8 lg:px-12 mx-auto">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 relative z-10">

              {/* Step 1 */}
              <div className="flex flex-col items-center text-center space-y-4 group relative">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full bg-white border-2 border-emerald-300 flex items-center justify-center p-3 sm:p-5 shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
                    <img
                      src="/step_book.jpg"
                      alt="Step 1: Book"
                      className="w-full h-full object-contain hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="absolute top-0 left-0 w-7 h-7 sm:w-10 sm:h-10 bg-[#1a7d0d] text-white text-xs sm:text-base font-black rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    1
                  </span>

                  {/* Connector Arrow (1 -> 2) */}
                  <div className="absolute left-[98%] right-[-65%] sm:right-[-70%] lg:right-[-65%] top-1/2 -translate-y-1/2 flex items-center text-[#1a7d0d] z-20 pointer-events-none">
                    <div className="flex-1 h-[2px] border-t-2 border-dashed border-[#1a7d0d]" />
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3.5] -ml-1.5 shrink-0" />
                  </div>
                </div>

                <div className="space-y-1.5 max-w-[260px]">
                  <h3 className="font-extrabold text-[#1a7d0d] text-xl sm:text-2xl">Book</h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed">
                    Pay a ₹25,000 booking advance and receive a receipt.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center space-y-4 group relative">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full bg-white border-2 border-emerald-300 flex items-center justify-center p-3 sm:p-5 shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
                    <img
                      src="/step_agree.jpg"
                      alt="Step 2: Agree"
                      className="w-full h-full object-contain hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="absolute top-0 left-0 w-7 h-7 sm:w-10 sm:h-10 bg-[#1a7d0d] text-white text-xs sm:text-base font-black rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    2
                  </span>

                  {/* Desktop Connector Arrow (2 -> 3) */}
                  <div className="hidden lg:flex absolute left-[98%] right-[-65%] top-1/2 -translate-y-1/2 items-center text-[#1a7d0d] z-20 pointer-events-none">
                    <div className="flex-1 h-[2px] border-t-2 border-dashed border-[#1a7d0d]" />
                    <ChevronRight className="w-5 h-5 stroke-[3.5] -ml-1.5 shrink-0" />
                  </div>
                </div>

                <div className="space-y-1.5 max-w-[260px]">
                  <h3 className="font-extrabold text-[#1a7d0d] text-xl sm:text-2xl">Agree</h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed">
                    Sign the agreement (5 or 10 years).
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center space-y-4 group relative">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full bg-white border-2 border-emerald-300 flex items-center justify-center p-3 sm:p-5 shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
                    <img
                      src="/step_launch.jpg"
                      alt="Step 3: Launch"
                      className="w-full h-full object-contain hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="absolute top-0 left-0 w-7 h-7 sm:w-10 sm:h-10 bg-[#1a7d0d] text-white text-xs sm:text-base font-black rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    3
                  </span>

                  {/* Connector Arrow (3 -> 4) */}
                  <div className="absolute left-[98%] right-[-65%] sm:right-[-70%] lg:right-[-65%] top-1/2 -translate-y-1/2 flex items-center text-[#1a7d0d] z-20 pointer-events-none">
                    <div className="flex-1 h-[2px] border-t-2 border-dashed border-[#1a7d0d]" />
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3.5] -ml-1.5 shrink-0" />
                  </div>
                </div>

                <div className="space-y-1.5 max-w-[260px]">
                  <h3 className="font-extrabold text-[#1a7d0d] text-xl sm:text-2xl">Launch</h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed">
                    Your station is set up in about 2 months.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center space-y-4 group relative">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full bg-white border-2 border-emerald-300 flex items-center justify-center p-3 sm:p-5 shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
                    <img
                      src="/step_track.jpg"
                      alt="Step 4: Track"
                      className="w-full h-full object-contain hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="absolute top-0 left-0 w-7 h-7 sm:w-10 sm:h-10 bg-[#1a7d0d] text-white text-xs sm:text-base font-black rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    4
                  </span>
                </div>

                <div className="space-y-1.5 max-w-[260px]">
                  <h3 className="font-extrabold text-[#1a7d0d] text-xl sm:text-2xl">Track</h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed">
                    Monitor everything on the Evoltek mobile app.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ROI CALCULATOR SECTION - PLACED AFTER HOW TO GET STARTED */}
        <section id="roi-calculator" className="py-8 sm:py-12 w-full">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 md:p-10 border border-emerald-100 shadow-xl max-w-6xl mx-auto relative overflow-hidden">
            
            {/* Header */}
            <div className="space-y-2 mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight flex items-center">
                <span className="text-gray-900">ROI</span>
                <span className="text-[#008726] ml-2.5">Calculator</span>
              </h2>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-1 bg-[#008726] rounded-full" />
                <p className="text-sm sm:text-base font-semibold text-gray-600">
                  Simple inputs. Clear results.
                </p>
              </div>
            </div>

            {/* Content Grid: Left Inputs | Right Results Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

              {/* Left Inputs Panel (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">

                  {/* Input 1: Location Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-gray-600 block">Location Type</label>
                    <div className="relative">
                      <select
                        value={locationType}
                        onChange={(e) => setLocationType(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-200 focus:border-[#008726] rounded-2xl px-4 py-3 text-base font-extrabold text-gray-900 focus:outline-none cursor-pointer pr-10 shadow-xs transition-colors"
                      >
                        <option value="Highway">Highway</option>
                        <option value="City">City Station</option>
                        <option value="Commercial">Commercial Hub</option>
                      </select>
                      <ChevronDown className="w-5 h-5 text-[#008726] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-[3]" />
                    </div>
                  </div>

                  {/* Input 2: Investment Amount (₹) - Manual Input + Preset Pills */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs sm:text-sm font-bold text-gray-600 block">Investment Amount (₹)</label>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Type or Select</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400 text-base">₹</span>
                      <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder="e.g. 5000000"
                        className="w-full bg-white border border-gray-200 focus:border-[#008726] rounded-2xl pl-8 pr-4 py-3 text-base font-extrabold text-gray-900 focus:outline-none shadow-xs transition-colors"
                      />
                    </div>
                    {/* Quick Preset Pills */}
                    <div className="flex items-center gap-1.5 pt-1">
                      {[
                        { label: '₹25L', value: 2500000 },
                        { label: '₹50L', value: 5000000 },
                        { label: '₹75L', value: 7500000 },
                        { label: '₹1Cr', value: 10000000 }
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setInvestmentAmount(preset.value)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            Number(investmentAmount) === preset.value
                              ? 'bg-[#008726] text-white border-[#008726] shadow-xs'
                              : 'bg-emerald-50/60 text-gray-700 border-emerald-100 hover:bg-emerald-100/70'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input 3: Power Capacity - Select Dropdown Only */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-gray-600 block">Power Capacity</label>
                    <div className="relative">
                      <select
                        value={powerCapacity}
                        onChange={(e) => setPowerCapacity(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-200 focus:border-[#008726] rounded-2xl px-4 py-3 text-base font-extrabold text-gray-900 focus:outline-none cursor-pointer pr-10 shadow-xs transition-colors"
                      >
                        <option value="60 kW">60 kW</option>
                        <option value="120 kW">120 kW</option>
                        <option value="240 kW">240 kW</option>
                        <option value="360 kW">360 kW</option>
                      </select>
                      <ChevronDown className="w-5 h-5 text-[#008726] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-[3]" />
                    </div>
                  </div>

                </div>

                {/* Calculate ROI Button */}
                <button
                  onClick={handleCalculateRoi}
                  disabled={isCalculating}
                  className="w-full bg-[#008726] hover:bg-[#007020] text-white font-extrabold text-base py-3.5 rounded-2xl flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-98 cursor-pointer mt-3 disabled:opacity-75"
                >
                  <span>{isCalculating ? 'Calculating...' : 'Calculate ROI'}</span>
                  <ArrowRight className={`w-5 h-5 stroke-[3] ${isCalculating ? 'animate-pulse' : ''}`} />
                </button>

              </div>

              {/* Right Results Panel (7 Cols) */}
              <div id="results-panel" className="lg:col-span-7 bg-[#eef7f0]/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center text-center space-y-6 relative overflow-hidden border border-emerald-100/80 transition-all duration-300">
                
                {/* Circular Donut Progress Ring */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center pt-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#d1f0d8"
                      strokeWidth="11"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#008726"
                      strokeWidth="11"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 * (1 - displayRoiPercent / 100)}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl sm:text-5xl font-black text-gray-900 leading-none tracking-tight">
                      {displayRoiPercent}%
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-700 mt-1">
                      Estimated ROI
                    </span>
                  </div>
                </div>

                {/* 3 Metrics Cards Grid with Prominent Enriched Icons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full pt-2">
                  
                  {/* Revenue Card */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-100/90 flex flex-col items-center justify-center text-center hover:shadow-md transition-all group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#e4f8e9] to-[#cbf0d3] border border-emerald-200/90 text-[#008726] flex items-center justify-center mb-3 shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <BarChart3 className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.8]" />
                    </div>
                    <span className="text-base sm:text-lg font-black text-gray-900 block leading-tight">
                      ₹{displayRevenue.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-gray-500 block mt-1">
                      Revenue (Est.)
                    </span>
                  </div>

                  {/* Profit Card */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-100/90 flex flex-col items-center justify-center text-center hover:shadow-md transition-all group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#e4f8e9] to-[#cbf0d3] border border-emerald-200/90 text-[#008726] flex items-center justify-center mb-3 shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <Coins className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.8]" />
                    </div>
                    <span className="text-base sm:text-lg font-black text-gray-900 block leading-tight">
                      ₹{displayProfit.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-gray-500 block mt-1">
                      Profit (Est.)
                    </span>
                  </div>

                  {/* Payback Period Card */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-100/90 flex flex-col items-center justify-center text-center hover:shadow-md transition-all group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#e4f8e9] to-[#cbf0d3] border border-emerald-200/90 text-[#008726] flex items-center justify-center mb-3 shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <Clock className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.8]" />
                    </div>
                    <span className="text-base sm:text-lg font-black text-gray-900 block leading-tight">
                      {displayPaybackMin} – {displayPaybackMax} Years
                    </span>
                    <span className="text-xs font-bold text-gray-500 block mt-1">
                      Payback Period
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* 7. EVOLTEK MOBILE APP SECTION - ATTACHED / OVERLAPPING FOOTER */}
        <section className="relative z-20 w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mt-6 -mb-16 sm:-mb-24 lg:-mb-28 bg-white border border-emerald-100/80">
          {/* Background Image Banner */}
          <img
            src="/cta section type.png"
            alt="EVOLTEK Mobile App Banner"
            className="w-full h-auto object-cover sm:object-contain rounded-2xl sm:rounded-3xl block min-h-[340px] sm:min-h-[400px]"
          />

          {/* Middle Overlay Content */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-12">
            <div className="max-w-xs sm:max-w-md lg:max-w-xl space-y-3 sm:space-y-4 bg-white/70 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none p-3 sm:p-0 rounded-2xl">

              {/* Main Project Headline */}
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                Control & Track Your Stations <span className="text-[#008726] block sm:inline">On The Go</span>
              </h2>

              {/* Project Description */}
              <p className="text-xs sm:text-base text-gray-700 font-semibold leading-relaxed hidden xs:block max-w-md mx-auto">
                Monitor live charging sessions, daily revenues, session counts, and monthly analytics anytime, anywhere.
              </p>

              {/* Feature Tags in Balanced Row */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <span className="bg-white/95 border border-emerald-200 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-2xs flex items-center gap-1.5">
                  <span className="text-amber-500">⚡</span> Live Session Analytics
                </span>
                <span className="bg-white/95 border border-emerald-200 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-2xs flex items-center gap-1.5">
                  <span className="text-emerald-600">💰</span> Instant Payouts
                </span>
                <span className="bg-white/95 border border-emerald-200 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-2xs flex items-center gap-1.5">
                  <span className="text-blue-500">🔔</span> 24/7 Monitoring
                </span>
              </div>

              {/* Pure Crisp SVG Vector Store Buttons */}
              <div className="flex flex-row items-center justify-center gap-3 pt-2">
                {/* Google Play Button */}
                <a
                  href="#download-google-play"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('roi-calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-black hover:bg-gray-900 text-white rounded-xl px-4 sm:px-5 py-2.5 flex items-center gap-3 shadow-lg border border-gray-800 transition-all transform hover:-translate-y-0.5 hover:scale-105 cursor-pointer shrink-0"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" viewBox="0 0 512 512">
                    <path fill="#41A5EE" d="M325.8 256L88.5 18.8C81.8 12.1 73.1 8 63.4 8 43.9 8 28 23.9 28 43.4v425.2c0 19.5 15.9 35.4 35.4 35.4 9.7 0 18.4-4.1 25.1-10.8L325.8 256z"/>
                    <path fill="#FFD400" d="M410.6 171.2l-84.8 84.8 84.8 84.8c12.2-7 20.4-20 20.4-34.8V206c0-14.8-8.2-27.8-20.4-34.8z"/>
                    <path fill="#FF3333" d="M88.5 493.2L325.8 256 410.6 340.8l-272 157.1c-14.6 8.4-32.8 7.3-46.1-4.7z"/>
                    <path fill="#4CAF50" d="M410.6 171.2L325.8 256 88.5 18.8c13.3-12 31.5-13.1 46.1-4.7l276 157.1z"/>
                  </svg>
                  <div className="text-left leading-none">
                    <span className="block text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">GET IT ON</span>
                    <span className="block text-sm sm:text-base font-black text-white tracking-tight">Google Play</span>
                  </div>
                </a>

                {/* Apple App Store Button */}
                <a
                  href="#download-app-store"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('roi-calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-black hover:bg-gray-900 text-white rounded-xl px-4 sm:px-5 py-2.5 flex items-center gap-3 shadow-lg border border-gray-800 transition-all transform hover:-translate-y-0.5 hover:scale-105 cursor-pointer shrink-0"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-white shrink-0" viewBox="0 0 384 512">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-14.7 69.5-34.3z"/>
                  </svg>
                  <div className="text-left leading-none">
                    <span className="block text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">Download on the</span>
                    <span className="block text-sm sm:text-base font-black text-white tracking-tight">App Store</span>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 8. PREMIUM MULTI-COLUMN FOOTER */}
      <footer className="relative bg-gradient-to-b from-[#0e4807] via-[#093504] to-[#041c02] text-white pt-20 sm:pt-28 lg:pt-32 pb-8 border-t-4 border-[#1a7d0d] overflow-hidden">

        {/* Subtle Background Glow Accent */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full px-6 sm:px-10 lg:px-16 relative z-10 space-y-6">

          {/* Main Footer Grid Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pt-0">

            {/* Column 1: Brand Info & Socials (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="inline-block">
                <img
                  src="/white logo.png"
                  alt="EVOLTEK Logo"
                  className="h-16 sm:h-20 lg:h-22 w-auto object-contain"
                />
              </div>

              <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed max-w-sm">
                EVOLTEK is India's premier EV charging network provider, delivering ultra-fast DC charging plazas along highways and commercial hubs.
              </p>

              {/* Authentic 3D Brand Social Media Links */}
              <div className="flex items-center gap-2.5 pt-2">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg bg-[#1877F2] text-white border border-white/20 flex items-center justify-center shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#fccc63] via-[#fbaac3] to-[#833ab4] text-white border border-white/20 flex items-center justify-center shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-8 h-8 rounded-lg bg-black text-white border border-white/20 flex items-center justify-center shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-110"
                >
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-[#0A66C2] text-white border border-white/20 flex items-center justify-center shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.262-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-lg bg-[#FF0000] text-white border border-white/20 flex items-center justify-center shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links (lg:col-span-2) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-wider border-b border-emerald-500/30 pb-2 inline-block">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-emerald-100/90">
                {['Home', 'About Us', 'Charging Stations', 'Investment Model', 'ROI Calculator', 'Mobile App'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => setActiveTab(item === 'Home' ? 'Home' : item.split(' ')[0])}
                      className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 group cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0" />
                      <span>{item}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Solutions & Charger Models (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-wider border-b border-emerald-500/30 pb-2 inline-block">
                Our Solutions
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-emerald-100/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Highway Charging Plazas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>City Fast Charging Hubs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>50% Shared Investment Model</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>360 kW &amp; 240 kW Ultra-Fast DC</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fleet &amp; Commercial Solutions</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & HQ (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-wider border-b border-emerald-500/30 pb-2 inline-block">
                Get In Touch
              </h4>

              <ul className="space-y-3 text-xs sm:text-sm font-semibold text-emerald-100/90">
                <li>
                  <a
                    href="mailto:evoltekchargeindia@gmail.com"
                    className="flex items-center gap-2.5 hover:text-emerald-300 transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>evoltekchargeindia@gmail.com</span>
                  </a>
                </li>

                <li>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-2.5 hover:text-emerald-300 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>+91 98765 43210</span>
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.evoltekcharge.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-emerald-300 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>www.evoltekcharge.in</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-emerald-200/80">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span>© 2026 EVOLTEK Mobility Pvt. Ltd. All rights reserved.</span>
              <span className="hidden sm:inline text-emerald-500/60">•</span>
              <span>
                Designed by{' '}
                <a
                  href="https://sunseaz.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-extrabold hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400 transition-colors"
                >
                  Sunseaz
                </a>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#cookies" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
