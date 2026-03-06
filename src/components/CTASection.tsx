import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import CRMPopupFlow from './CRMPopupFlow';

const benefits = [
  'Acesso ilimitado a 90+ aulas científicas',
  'Protocolos clínicos prontos para aplicação',
  '4 Webinars Master anuais',
  'Atualizações dos principais congressos internacionais',
  'Discussões ao vivo semanais com especialistas',
  'Materiais técnicos exclusivos (dossiês, KPIs, scripts)',
  'Comunidade exclusiva de médicos',
  'Certificados de participação',
];

const CTASection = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <section className="py-24 gradient-hero relative overflow-hidden rounded-t-[50px]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-glp-vivid/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Faça parte da <span className="text-primary">revolução do GLP-1</span><br />
              na medicina brasileira
            </h2>
            
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Junte-se a centenas de médicos que já estão dominando os análogos de GLP-1
              e transformando resultados clínicos em crescimento sustentável.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-primary-foreground/90 text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button variant="hero" size="xl" className="px-12" onClick={() => setPopupOpen(true)}>
              Entrar na Comunidade Agora
              <ArrowRight className="ml-2" />
            </Button>
            
            <p className="text-primary/80 text-sm mt-6 italic">
              Primeiros 200 membros ganham acesso vitalício ao preço de lançamento
            </p>
          </div>
        </div>
      </div>

      <CRMPopupFlow open={popupOpen} onOpenChange={setPopupOpen} />
    </section>
  );
};

export default CTASection;