import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import communityMockup from '@/assets/community-mockup.png';
import CRMPopupFlow from './CRMPopupFlow';

const stats = [
  { value: '6', label: 'Discussões ao vivo' },
  { value: '+90', label: 'Aulas disponíveis' },
  { value: '20+', label: 'Especialistas' },
];

const CommunitySection = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <section id="comunidade" className="py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Mockups */}
          <div className="relative flex items-center justify-center">
            <img 
              src={communityMockup} 
              alt="Webinar e Comunidade GLP-1 Effects" 
              className="w-full h-auto max-w-[600px]"
            />
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-card-foreground mb-4">
              Além do conteúdo <span className="text-primary">gravado</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Discussões ao Vivo e Comunidade Exclusiva
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Benefits list */}
            <div className="bg-muted/50 border border-border rounded-xl p-4 mb-8">
              <ul className="text-muted-foreground text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Acesso à comunidade exclusiva de profissionais
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Networking com especialistas renomados
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Atualizações em tempo real sobre GLP-1
                </li>
              </ul>
            </div>

            <Button variant="cta" size="lg" onClick={() => setPopupOpen(true)}>
              Quero Fazer Parte
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <CRMPopupFlow open={popupOpen} onOpenChange={setPopupOpen} />
    </section>
  );
};

export default CommunitySection;
