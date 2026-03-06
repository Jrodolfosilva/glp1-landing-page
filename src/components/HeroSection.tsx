import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import professoresHero from '@/assets/professores-hero.png';
import alessandroAlarcao from '@/assets/doctors/alessandro-alarcao.jpg';
import alexandreFerreira from '@/assets/doctors/alexandre-ferreira.jpg';
import carlosRobertoAntonio from '@/assets/doctors/carlos-roberto-antonio.jpg';
import guilhermeMachado from '@/assets/doctors/guilherme-machado.jpg';
import julianaRomano from '@/assets/doctors/juliana-romano.jpg';
import lucianaCrivelin from '@/assets/doctors/luciana-crivelin.jpg';
import CRMPopupFlow from './CRMPopupFlow';

const doctorAvatars = [
  { name: 'Alessandro Alarcão', image: alessandroAlarcao },
  { name: 'Alexandre Ferreira', image: alexandreFerreira },
  { name: 'Carlos Roberto Antonio', image: carlosRobertoAntonio },
  { name: 'Guilherme Machado', image: guilhermeMachado },
  { name: 'Juliana Romano', image: julianaRomano },
  { name: 'Luciana Crivelin', image: lucianaCrivelin },
];

const HeroSection = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glp-vivid/20 rounded-full blur-3xl" />
      </div>

      {/* Decorative curved line around mockup */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] opacity-40 hidden lg:block">
        <svg viewBox="0 0 400 400" className="w-full h-full text-primary">
          <ellipse cx="200" cy="200" rx="180" ry="160" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Left Content - Desktop */}
          <div className="space-y-6 hidden lg:block">
            <div className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight animate-slide-up">
              Tudo o que você precisa saber sobre{' '}
              <h1 className="text-primary inline">GLP-1</h1> na Estética Médica em uma única plataforma
            </div>

            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-xl animate-slide-up delay-100">
              O mais completo programa de ensino exclusivamente médico- GLP-1 Effects é pioneiro em pesquisa e estudos dos efeitos e terapias com análogos dos medicamentos que estão transformando a sociedade.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
              <Button variant="hero" size="xl" onClick={() => setPopupOpen(true)}>
                Quero Fazer Parte
                <ArrowRight className="ml-2" />
              </Button>
            </div>

            {/* Trust Badge with Doctor Avatars */}
            <div className="flex items-center gap-4 pt-4 animate-fade-in delay-400">
              <div className="flex -space-x-3">
                {doctorAvatars.map((doctor, index) => (
                  <div 
                    key={doctor.name} 
                    className="w-10 h-10 rounded-full border-2 border-glp-dark overflow-hidden"
                    style={{ zIndex: doctorAvatars.length - index }}
                  >
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-primary-foreground/60 text-sm">
                Comunidade de 5.000 médicos de diversas especialidades.{' '}
                <span className="text-primary font-semibold">+500 médicos</span> em todo Brasil
              </p>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="space-y-6 lg:hidden text-justify">
            <div className="font-heading text-3xl sm:text-4xl font-bold text-primary-foreground leading-tight animate-slide-up text-center">
              Tudo o que você precisa saber sobre{' '}
              <h1 className="text-primary inline">GLP-1</h1> na Estética Médica em uma única plataforma
            </div>

            {/* Image for Mobile - Notebook Mockup */}
            <div className="animate-scale-in delay-200">
              <div className="relative">
                {/* Notebook Screen */}
                <div className="bg-gray-800 rounded-t-xl p-2 shadow-2xl">
                  <div className="bg-glp-dark rounded-lg overflow-hidden">
                    <img 
                      src={professoresHero} 
                      alt="Professores GLP-1 Effects - Especialistas em Estética Médica" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                {/* Notebook Base */}
                <div className="relative">
                  <div className="bg-gradient-to-b from-gray-700 to-gray-800 h-3 rounded-b-lg" />
                  <div className="bg-gradient-to-b from-gray-600 to-gray-700 h-1.5 mx-8 rounded-b-xl" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 animate-slide-up delay-300">
              <Button variant="hero" size="xl" onClick={() => setPopupOpen(true)}>
                Quero Fazer Parte
                <ArrowRight className="ml-2" />
              </Button>
            </div>

            <p className="text-base text-primary-foreground/80 leading-relaxed animate-slide-up delay-100">
              O mais completo programa de ensino exclusivamente médico- GLP-1 Effects é pioneiro em pesquisa e estudos dos efeitos e terapias com análogos dos medicamentos que estão transformando a sociedade.
            </p>
          </div>

          {/* Right Content - Desktop Notebook Mockup */}
          <div className="relative animate-scale-in delay-200 hidden lg:block">
            <div className="relative">
              {/* Notebook Screen */}
              <div className="bg-gray-800 rounded-t-xl p-2 shadow-2xl">
                <div className="bg-glp-dark rounded-lg overflow-hidden">
                  <img 
                    src={professoresHero} 
                    alt="Professores GLP-1 Effects - Especialistas em Estética Médica" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
              {/* Notebook Base */}
              <div className="relative">
                <div className="bg-gradient-to-b from-gray-700 to-gray-800 h-4 rounded-b-lg" />
                <div className="bg-gradient-to-b from-gray-600 to-gray-700 h-2 mx-12 rounded-b-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>

      <CRMPopupFlow open={popupOpen} onOpenChange={setPopupOpen} />
    </section>
  );
};

export default HeroSection;
