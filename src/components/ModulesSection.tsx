import { Badge } from '@/components/ui/badge';
import { FlaskConical, User, Zap, Scissors, Sparkles, Building2, Plus } from 'lucide-react';

const modules = [
  {
    icon: FlaskConical,
    title: 'Bases Clínicas',
    description: 'Mecanismos de ação e impacto sistêmico das canetas emagrecedoras nos tecidos. Base para a decisão estética.'
  },
  {
    icon: User,
    title: 'Flacidez Facial',
    description: 'Protocolos avançados para flacidez palpebral, perda de volume e recomposição: bioestimuladores, fios, exossomos e tecnologias combinadas.'
  },
  {
    icon: Zap,
    title: 'Flacidez Corporal',
    description: 'Tecnologias híbridas, bioestimuladores corporais e radiofrequência invasiva para redefinição corporal pós-canetas.'
  },
  {
    icon: Scissors,
    title: 'Terapias Capilares',
    description: 'Prevenção e tratamento da rarefação capilar com eletroporação, lasers específicos e mesoterápicos.'
  },
  {
    icon: Sparkles,
    title: 'Medicina Regenerativa',
    description: 'Exossomos, PDRN, PRP e tecnologias de estímulo celular para o paciente das canetas emagrecedoras.'
  },
  {
    icon: Building2,
    title: 'Gestão de Clínicas',
    description: 'Estratégias de precificação inteligente, modelos de negócio e recorrência aplicados à estética avançada.'
  }
];

const ModulesSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 text-primary border-primary/30 bg-primary/5">
            Conteúdo Programático
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trilha Científico-Clínica e em Gestão
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Conteúdo organizado em módulos estratégicos que integram ciência, prática clínica avançada e resultados mensuráveis. Uma jornada completa de atualização e rentabilidade para o médico que atua com o novo paciente da estética.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border/50 rounded-2xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-lg mb-2">
                  {module.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {module.description}
                </p>
              </div>
            );
          })}

          {/* Coming Soon Block */}
         
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
