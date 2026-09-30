import { useState, useEffect } from 'react';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  Handshake,
  Calendar,
  FileText,
  Rocket,
  Smartphone,
  ChevronRight,
  ChevronDown,
  Mail,
  Phone,
  Globe,
  Menu,
  X,
  Eye,
  Target,
  Utensils,
  Wifi,
  Trees,
  BedDouble,
  Coffee,
  Coins,
  Settings,
  Scale,
  TrendingUp,
  Monitor,
  Cpu,
  Link2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [homeVersion, setHomeVersion] = useState<'home1' | 'home2'>('home1');
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
          <div className="flex items-center gap-3">
            <button className="bg-[#1a7d0d] hover:bg-[#135d09] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all transform active:scale-95 cursor-pointer border border-emerald-400/30">
              <span>Invest Now</span>
              <span className="w-5 h-5 bg-white text-[#1a7d0d] rounded-full flex items-center justify-center text-xs">
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg focus:outline-none transition-colors ${homeVersion === 'home2' && !isScrolled ? 'text-white hover:bg-white/20' : 'text-gray-800 hover:bg-gray-100'
                }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white text-gray-800 border-b border-emerald-100 px-4 pt-2 pb-4 space-y-2 shadow-2xl">
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
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      {homeVersion === 'home1' ? (

        /* HOME 1: HERO DESIGN WITH hero 1.png BACKGROUND */
        <div className="relative w-full overflow-hidden bg-white">
          <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex flex-col justify-center pt-24 pb-12 px-4 sm:px-8 lg:px-12">

            {/* Background Image: hero 1.png */}
            <div className="absolute inset-0 z-0">
              <img
                src="/hero 1.png"
                alt="EVOLTEK Highway Charging Station Plaza"
                className="w-full h-full object-cover object-right-top"
              />
            </div>

            {/* Left Content Column over the clean white fog space */}
            <div className="relative z-10 max-w-2xl space-y-5 sm:space-y-6 pt-6 sm:pt-12">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight bg-gradient-to-r from-[#1a7d0d] via-[#24a116] to-[#135d09] bg-clip-text text-transparent">
                HIGHWAY CHARGING.<br />
                HIGHWAY EXPERIENCE.
              </h1>

              <p className="text-gray-700 text-base sm:text-xl font-semibold leading-relaxed">
                Charge your EV while you relax,<br className="hidden sm:inline" />
                refresh and explore.
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <button className="bg-[#1a7d0d] hover:bg-[#135d09] text-white font-bold text-sm sm:text-base px-7 sm:px-9 py-3 sm:py-3.5 rounded-full flex items-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer">
                  <span>Explore Stations</span>
                  <span className="w-5 h-5 bg-white text-[#1a7d0d] rounded-full flex items-center justify-center">
                    <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </button>

                <button className="bg-white hover:bg-emerald-50 text-[#1a7d0d] border-2 border-[#1a7d0d] font-bold text-sm sm:text-base px-7 sm:px-9 py-3 sm:py-3.5 rounded-full flex items-center gap-2 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer">
                  <span>Become an Investor</span>
                  <span className="w-5 h-5 bg-[#1a7d0d] text-white rounded-full flex items-center justify-center">
                    <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
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
        <section className="bg-white rounded-3xl border border-emerald-100/90 p-6 sm:p-8 shadow-lg">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 divide-y sm:divide-y-0 divide-emerald-100 sm:divide-x sm:divide-emerald-200/80">

            {/* 1. Fast Charging */}
            <div className="flex flex-col items-center justify-center text-center p-3 hover:scale-105 transition-transform">
              <Zap className="w-9 h-9 sm:w-11 sm:h-11 text-[#1a7d0d] stroke-[2.2] mb-2" />
              <span className="text-xs sm:text-base font-extrabold text-[#1a7d0d]">Fast<br />Charging</span>
            </div>

            {/* 2. Restaurants */}
            <div className="flex flex-col items-center justify-center text-center p-3 hover:scale-105 transition-transform">
              <Utensils className="w-9 h-9 sm:w-11 sm:h-11 text-[#1a7d0d] stroke-[2.2] mb-2" />
              <span className="text-xs sm:text-base font-extrabold text-[#1a7d0d]">Restaurants</span>
            </div>

            {/* 3. Wi-Fi */}
            <div className="flex flex-col items-center justify-center text-center p-3 hover:scale-105 transition-transform">
              <Wifi className="w-9 h-9 sm:w-11 sm:h-11 text-[#1a7d0d] stroke-[2.2] mb-2" />
              <span className="text-xs sm:text-base font-extrabold text-[#1a7d0d]">Wi-Fi</span>
            </div>

            {/* 4. Parks & Relaxation */}
            <div className="flex flex-col items-center justify-center text-center p-3 hover:scale-105 transition-transform">
              <Trees className="w-9 h-9 sm:w-11 sm:h-11 text-[#1a7d0d] stroke-[2.2] mb-2" />
              <span className="text-xs sm:text-base font-extrabold text-[#1a7d0d]">Parks &<br />Relaxation</span>
            </div>

            {/* 5. Rooms / Rest Facilities */}
            <div className="flex flex-col items-center justify-center text-center p-3 hover:scale-105 transition-transform">
              <BedDouble className="w-9 h-9 sm:w-11 sm:h-11 text-[#1a7d0d] stroke-[2.2] mb-2" />
              <span className="text-xs sm:text-base font-extrabold text-[#1a7d0d]">Rooms / Rest<br />Facilities</span>
            </div>

            {/* 6. Lounges */}
            <div className="flex flex-col items-center justify-center text-center p-3 hover:scale-105 transition-transform">
              <Coffee className="w-9 h-9 sm:w-11 sm:h-11 text-[#1a7d0d] stroke-[2.2] mb-2" />
              <span className="text-xs sm:text-base font-extrabold text-[#1a7d0d]">Lounges</span>
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
                      className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500 shadow-sm"
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
        <section className="bg-gradient-to-b from-[#f2faf2] via-white to-[#f4fbf4] rounded-3xl border border-emerald-200/80 p-6 sm:p-10 shadow-sm relative overflow-hidden space-y-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto my-4 relative z-10">

            {/* Left Circle: EVOLTEK Charging Station Plaza */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              {/* Decorative background leaf/glow circles */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-200/40 rounded-full blur-2xl -z-10" />
              
              <div className="relative p-2 rounded-full border-4 border-[#1a7d0d] bg-white shadow-xl max-w-[280px] sm:max-w-[320px] w-full aspect-square group">
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
            <div className="lg:col-span-2 flex flex-col items-center justify-center text-center space-y-3 py-4 lg:py-0">
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
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#1a7d0d] bg-white flex items-center justify-center shadow-md shrink-0">
                  <Handshake className="w-7 h-7 sm:w-8 sm:h-8 text-[#1a7d0d] stroke-[2]" />
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
              {/* Decorative background leaf/glow circles */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-200/40 rounded-full blur-2xl -z-10" />

              <div className="relative p-2 rounded-full border-4 border-[#1a7d0d] bg-white shadow-xl max-w-[280px] sm:max-w-[320px] w-full aspect-square group">
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

          {/* Bottom 5 Feature Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-6 border-t border-emerald-200/60 max-w-6xl mx-auto divide-y sm:divide-y-0 sm:divide-x divide-emerald-200/60 relative z-10 text-center">

            <div className="flex flex-col items-center p-3 space-y-2">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-100/80 border border-emerald-300/60 flex items-center justify-center text-[#1a7d0d] shadow-2xs">
                <Link2 className="w-6 h-6 stroke-[2]" />
              </div>
              <h4 className="text-sm font-black text-[#1a7d0d]">
                Shared<br />Investment
              </h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[180px]">
                You invest only half the cost, and Evoltek invests the other half.
              </p>
            </div>

            <div className="flex flex-col items-center p-3 space-y-2 pt-4 sm:pt-3">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-100/80 border border-emerald-300/60 flex items-center justify-center text-[#1a7d0d] shadow-2xs">
                <Settings className="w-6 h-6 stroke-[2]" />
              </div>
              <h4 className="text-sm font-black text-[#1a7d0d]">
                Hassle-free<br />Maintenance
              </h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[180px]">
                Evoltek takes care of setup, operations and station maintenance.
              </p>
            </div>

            <div className="flex flex-col items-center p-3 space-y-2 pt-4 sm:pt-3">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-100/80 border border-emerald-300/60 flex items-center justify-center text-[#1a7d0d] shadow-2xs">
                <Scale className="w-6 h-6 stroke-[2]" />
              </div>
              <h4 className="text-sm font-black text-[#1a7d0d]">
                Two Return<br />Options
              </h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[180px]">
                Choose between a percentage return or a fixed return.
              </p>
            </div>

            <div className="flex flex-col items-center p-3 space-y-2 pt-4 sm:pt-3">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-100/80 border border-emerald-300/60 flex items-center justify-center text-[#1a7d0d] shadow-2xs">
                <ShieldCheck className="w-6 h-6 stroke-[2]" />
              </div>
              <h4 className="text-sm font-black text-[#1a7d0d]">
                Secure<br />Agreements
              </h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[180px]">
                Long-term agreement of 5 or 10 years, renewable.
              </p>
            </div>

            <div className="flex flex-col items-center p-3 space-y-2 pt-4 sm:pt-3 col-span-1 sm:col-span-3 lg:col-span-1">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-100/80 border border-emerald-300/60 flex items-center justify-center text-[#1a7d0d] shadow-2xs">
                <TrendingUp className="w-6 h-6 stroke-[2]" />
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
                  <span className="px-3 py-1 bg-[#073d1c] text-white text-xs font-black rounded-lg tracking-wider uppercase">
                    360 kW DC
                  </span>
                  <div className="text-right">
                    <h3 className="text-xl font-black text-[#1a7d0d]">360 kW DC</h3>
                    <p className="text-xs font-bold text-gray-500">For Highways &amp; Heavy Usage</p>
                  </div>
                </div>

                {/* Center Image */}
                <div className="my-5 flex items-center justify-center h-56 sm:h-64">
                  <img
                    src="/charging station.png"
                    alt="360 kW DC Charger"
                    className="max-h-full h-full w-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  />
                </div>

                {/* Specs Box */}
                <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/80 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-[#1a7d0d] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-extrabold text-gray-900 block">Input Power</span>
                      <span className="text-xs text-gray-600 font-medium leading-snug block">
                        380-415 Vac; 50/60Hz; Three-phase (L1, L2, L3, N, PE)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Monitor className="w-4 h-4 text-[#1a7d0d] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-extrabold text-gray-900 block">Display</span>
                      <span className="text-xs text-gray-600 font-medium leading-snug block">
                        7" TFT LCD with Touch Control
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Cpu className="w-4 h-4 text-[#1a7d0d] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-extrabold text-gray-900 block">Charger &amp; CMS</span>
                      <span className="text-xs text-gray-600 font-medium leading-snug block">
                        Protocol: OCPP 1.6
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#1a7d0d] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-extrabold text-gray-900 block">Ingress Protection</span>
                      <span className="text-xs text-gray-600 font-medium leading-snug block">
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
                  <span className="px-3 py-1 bg-[#073d1c] text-white text-xs font-black rounded-lg tracking-wider uppercase">
                    120 kW DC
                  </span>
                  <div className="text-right">
                    <h3 className="text-xl font-black text-[#1a7d0d]">120 kW DC</h3>
                    <p className="text-xs font-bold text-gray-500">For Cities &amp; Commercial Spaces</p>
                  </div>
                </div>

                {/* Center Image */}
                <div className="my-5 flex items-center justify-center h-56 sm:h-64">
                  <img
                    src="/charging station.png"
                    alt="120 kW DC Charger"
                    className="max-h-full h-full w-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  />
                </div>

                {/* Specs Box */}
                <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/80 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-[#1a7d0d] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-extrabold text-gray-900 block">Input Power</span>
                      <span className="text-xs text-gray-600 font-medium leading-snug block">
                        230 Vac, Single phase, 16A or 32A maximum, 50/60 Hz
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Monitor className="w-4 h-4 text-[#1a7d0d] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-extrabold text-gray-900 block">Display</span>
                      <span className="text-xs text-gray-600 font-medium leading-snug block">
                        7" TFT LCD with Touch Control
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Cpu className="w-4 h-4 text-[#1a7d0d] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-extrabold text-gray-900 block">Charger &amp; CMS</span>
                      <span className="text-xs text-gray-600 font-medium leading-snug block">
                        Protocol: OCPP 1.6
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#1a7d0d] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-extrabold text-gray-900 block">Ingress Protection</span>
                      <span className="text-xs text-gray-600 font-medium leading-snug block">
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
                  <span className="px-3 py-1 bg-[#073d1c] text-white text-xs font-black rounded-lg tracking-wider uppercase">
                    240 kW DC
                  </span>
                  <div className="text-right">
                    <h3 className="text-xl font-black text-[#1a7d0d]">240 kW DC</h3>
                    <p className="text-xs font-bold text-gray-500">For Highways &amp; Fleets</p>
                  </div>
                </div>

                {/* Center Image */}
                <div className="my-5 flex items-center justify-center h-56 sm:h-64">
                  <img
                    src="/charging station.png"
                    alt="240 kW DC Charger"
                    className="max-h-full h-full w-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  />
                </div>

                {/* Specs Box */}
                <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/80 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-[#1a7d0d] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-extrabold text-gray-900 block">Input Power</span>
                      <span className="text-xs text-gray-600 font-medium leading-snug block">
                        360-440 Vac; 50 Hz; Three-phase (L1, L2, L3, N, PE)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Monitor className="w-4 h-4 text-[#1a7d0d] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-extrabold text-gray-900 block">Display</span>
                      <span className="text-xs text-gray-600 font-medium leading-snug block">
                        7" TFT LCD with Touch Control
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Cpu className="w-4 h-4 text-[#1a7d0d] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-extrabold text-gray-900 block">Charger &amp; CMS</span>
                      <span className="text-xs text-gray-600 font-medium leading-snug block">
                        Protocol: OCPP 1.6
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#1a7d0d] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-extrabold text-gray-900 block">Ingress Protection</span>
                      <span className="text-xs text-gray-600 font-medium leading-snug block">
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
        <section className="space-y-10 py-4">
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="h-[2px] w-12 sm:w-20 bg-[#1a7d0d]" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1a7d0d] tracking-wider uppercase text-center">
              HOW TO GET STARTED
            </h2>
            <div className="h-[2px] w-12 sm:w-20 bg-[#1a7d0d]" />
          </div>

          <div className="relative max-w-6xl mx-auto px-2">
            {/* Connecting Dashed Line on Larger screens */}
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-[#1a7d0d]/40 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">

              {/* Step 1 */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-white border-2 border-[#1a7d0d]/30 flex items-center justify-center shadow-xs">
                    <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-[#1a7d0d] stroke-[1.8]" />
                  </div>
                  <span className="absolute top-0 left-0 w-8 h-8 sm:w-9 sm:h-9 bg-[#1a7d0d] text-white text-sm sm:text-base font-black rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    1
                  </span>
                </div>
                <div className="space-y-1 max-w-[220px]">
                  <h3 className="font-extrabold text-[#1a7d0d] text-lg sm:text-xl">Book</h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                    Pay a ₹25,000 booking advance and receive a receipt.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-white border-2 border-[#1a7d0d]/30 flex items-center justify-center shadow-xs">
                    <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-[#1a7d0d] stroke-[1.8]" />
                  </div>
                  <span className="absolute top-0 left-0 w-8 h-8 sm:w-9 sm:h-9 bg-[#1a7d0d] text-white text-sm sm:text-base font-black rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    2
                  </span>
                </div>
                <div className="space-y-1 max-w-[220px]">
                  <h3 className="font-extrabold text-[#1a7d0d] text-lg sm:text-xl">Agree</h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                    Sign the agreement (5 or 10 years).
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-white border-2 border-[#1a7d0d]/30 flex items-center justify-center shadow-xs">
                    <Rocket className="w-10 h-10 sm:w-12 sm:h-12 text-[#1a7d0d] stroke-[1.8]" />
                  </div>
                  <span className="absolute top-0 left-0 w-8 h-8 sm:w-9 sm:h-9 bg-[#1a7d0d] text-white text-sm sm:text-base font-black rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    3
                  </span>
                </div>
                <div className="space-y-1 max-w-[220px]">
                  <h3 className="font-extrabold text-[#1a7d0d] text-lg sm:text-xl">Launch</h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                    Your station is set up in about 2 months.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-white border-2 border-[#1a7d0d]/30 flex items-center justify-center shadow-xs">
                    <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-[#1a7d0d] stroke-[1.8]" />
                  </div>
                  <span className="absolute top-0 left-0 w-8 h-8 sm:w-9 sm:h-9 bg-[#1a7d0d] text-white text-sm sm:text-base font-black rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    4
                  </span>
                </div>
                <div className="space-y-1 max-w-[220px]">
                  <h3 className="font-extrabold text-[#1a7d0d] text-lg sm:text-xl">Track</h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                    Monitor everything on the Evoltek mobile app.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. EVOLTEK MOBILE APP SECTION */}
        <section className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md my-6">
          <img
            src="/cta section type.png"
            alt="EVOLTEK Mobile App Banner"
            className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl"
          />
        </section>

      </main>

      {/* 8. FOOTER */}
      <footer className="bg-[#1a7d0d] text-white mt-12 border-t border-emerald-800">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            {/* Left Logo */}
            <div className="flex items-center">
              <div className="bg-white/95 px-4 py-2 rounded-xl shadow-xs">
                <img
                  src="/LOGO.png"
                  alt="EVOLTEK Logo"
                  className="h-14 sm:h-18 w-auto object-contain"
                />
              </div>
            </div>

            {/* Center Slogan */}
            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 text-center">
              <span className="text-xs sm:text-sm font-semibold text-emerald-100">
                Be a part of India's green mobility revolution.
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1">
                Powering Every Journey.
                <Zap className="w-4 h-4 text-emerald-300 fill-emerald-300" />
              </span>
            </div>

            {/* Right Contact Details */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-emerald-100">
              <a href="mailto:evoltekchargeindia@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>evoltekchargeindia@gmail.com</span>
              </a>

              <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>+91 98765 43210</span>
              </a>

              <a href="https://www.evoltekcharge.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Globe className="w-4 h-4 text-emerald-300" />
                <span>www.evoltekcharge.in</span>
              </a>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
