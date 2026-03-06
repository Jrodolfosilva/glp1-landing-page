import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logoWhite from '@/assets/logo-white.png';
import CRMPopupFlow from './CRMPopupFlow';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Plataforma', href: '#plataforma' },
    { label: 'Professores', href: '#professores' },
    { label: 'Webinars', href: '#webinars' },
    { label: 'Comunidade', href: '#comunidade' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-glp-dark/95 backdrop-blur-lg shadow-lg py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <img src={logoWhite} alt="GLP-1 Effects" className="h-10" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-primary-foreground/80 hover:text-primary transition-colors font-medium text-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button variant="hero" size="default" onClick={() => setPopupOpen(true)}>
                Entrar na Comunidade
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-primary-foreground p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-slide-down">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-primary-foreground/80 hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <Button variant="hero" size="default" className="mt-2" onClick={() => { setPopupOpen(true); setIsMobileMenuOpen(false); }}>
                  Entrar na Comunidade
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <CRMPopupFlow open={popupOpen} onOpenChange={setPopupOpen} />
    </>
  );
};

export default Header;
