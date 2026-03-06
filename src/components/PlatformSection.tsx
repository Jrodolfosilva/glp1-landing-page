import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import platformCourses from '@/assets/platform-courses-dark.png';
import platformMobile from '@/assets/platform-mobile.png';
import CRMPopupFlow from './CRMPopupFlow';

const PlatformSection = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <section id="plataforma" className="py-24 gradient-dark text-secondary-foreground rounded-t-[50px] rounded-b-[50px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Conheça nosso <span className="text-primary">Programa Oficial</span>
          </h2>
          <p className="text-secondary-foreground/70 text-lg max-w-2xl mx-auto">
            Uma plataforma completa com tudo que você precisa para dominar os protocolos de GLP-1
          </p>
        </div>

        {/* Platform Mockups - Laptop + Mobile */}
        <div className="relative max-w-6xl mx-auto mb-12">
          <div className="relative flex items-end justify-center">
            {/* Laptop Mockup */}
            <div className="relative w-full max-w-4xl">
              {/* Laptop Screen Frame */}
              <div className="bg-gray-900 rounded-t-2xl p-1.5 md:p-2 border border-gray-700">
                {/* Screen Bezel */}
                <div className="bg-glp-dark rounded-lg overflow-hidden">
                  <img
                    src={platformCourses}
                    alt="Plataforma GLP-1 Effects - Cursos e Webinars"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Laptop Hinge */}
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 h-3 md:h-4 rounded-b" />
              {/* Laptop Base/Keyboard */}
              <div className="bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 h-2 md:h-3 mx-8 md:mx-16 rounded-b-xl flex justify-center">
                <div className="w-16 md:w-24 h-1 bg-gray-600 rounded-full mt-0.5" />
              </div>
            </div>

            {/* Phone Mockup - Overlapping on the right */}
            <div className="absolute -right-2 md:right-8 lg:right-16 bottom-4 md:bottom-8 w-24 md:w-36 lg:w-44 z-10">
              <img
                src={platformMobile}
                alt="Plataforma GLP-1 Effects no celular"
                className="w-full h-auto drop-shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* Floating annotations */}
          <div className="absolute top-1/3 -left-4 md:left-0 bg-card rounded-xl p-3 md:p-4 shadow-card max-w-[180px] hidden lg:block border border-primary/20">
            <p className="text-card-foreground text-sm font-medium">Aulas organizadas por módulos</p>
          </div>

          <div className="absolute top-1/3 -right-4 md:right-0 bg-card rounded-xl p-3 md:p-4 shadow-card max-w-[180px] hidden lg:block border border-primary/20">
            <p className="text-card-foreground text-sm font-medium">Materiais técnicos para download</p>
          </div>
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" onClick={() => setPopupOpen(true)}>
            Quero Fazer Parte
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      <CRMPopupFlow open={popupOpen} onOpenChange={setPopupOpen} />
    </section>
  );
};

export default PlatformSection;

