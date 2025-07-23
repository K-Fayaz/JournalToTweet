import { Link } from 'react-router-dom';
import { 
    ArrowRight, 
    Code, 
    Coffee, 
    Zap, 
    Terminal,
    Github,
    Twitter,
    TrendingUp,
    Sparkles,
    MessageSquare,
    Hash,
    ChevronDown,
    Play,
    Clock,
    Mail,
    Bot,
    ArrowDown,
    Cpu,
    Send,
    PenTool,
    Calendar,
    Flame,
    Menu,
    X
  } from 'lucide-react';
import logo512 from '../assets/android-chrome-512x512.png';
import logoIcon from '../assets/icon.png';

type NavItem = {
  id: string;
  label: string;
  isLink?: boolean;
  path?: string;
};

type NavbarProps = {
  scrollToSection: (id: string) => void;
  navItems: NavItem[];
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  focusHeroInput: () => void;
};

const Navbar = ({ scrollToSection, navItems, activeSection, mobileMenuOpen, setMobileMenuOpen, focusHeroInput }: NavbarProps) => {
    return(
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrollY > 50 
              ? 'backdrop-blur-2xl bg-black/40 border-b border-white/20 shadow-2xl' 
              : 'backdrop-blur-md bg-black/10'
          }`}>
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div 
                  className="flex items-center space-x-2 cursor-pointer group"
                  onClick={() => scrollToSection('hero')}
                >
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <img
                      src={logoIcon}
                      alt="Logo"
                      className="absolute w-12 h-12 left-2 top-1/2 -translate-y-1/2 opacity-80 pointer-events-none"
                      style={{ zIndex: 0 }}
                    />
                  </div>
                  <span className="text-xl font-black font-mono py-1 rounded text-cyan-600 text-white relative z-10 shadow-md">
                    JournalToTweet
                  </span>
                </div>
    
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-2 bg-white/5 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10">
                  {navItems.map((item: NavItem) => (
                    item.isLink ? (
                      <Link
                        key={item.id}
                        to={item.path!}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 font-mono text-gray-300 hover:text-white hover:bg-white/10"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 font-mono ${
                          activeSection === item.id
                            ? 'bg-white/20 text-cyan-400 backdrop-blur-sm border border-cyan-400/30 shadow-lg'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {item.label}
                      </button>
                    )
                  ))}
                </div>
    
                {/* CTA Button */}
                <div className="hidden md:block">
                  <button
                    onClick={focusHeroInput}
                    className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20 font-mono"
                  >
                    Join Waitlist
                  </button>
                </div>
    
                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
    
              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className="md:hidden mt-4 p-4 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl">
                  <div className="space-y-2">
                    {navItems.map((item: NavItem) => (
                      item.isLink ? (
                        <Link
                          key={item.id}
                          to={item.path!}
                          className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 font-mono text-gray-300 hover:text-white hover:bg-white/10"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 font-mono ${
                            activeSection === item.id
                              ? 'bg-white/20 text-cyan-400 border border-cyan-400/30 backdrop-blur-sm'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {item.label}
                        </button>
                      )
                    ))}
                    <div className="pt-2 border-t border-white/10">
                      <button
                        onClick={() => { setMobileMenuOpen(false); focusHeroInput(); }}
                        className="block w-full px-4 py-3 bg-cyan-600 rounded hover:bg-cyan-500 text-white font-bold text-sm font-mono text-center"
                      >
                        Join Waitlist
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>
    )
};

export default Navbar;