import { Badge } from '@/components/ui/badge';
import { FlaskConical, User, Zap, Scissors, Sparkles, Building2, Plus } from 'lucide-react';

const modules = [
  {
    icon: FlaskConical,
    title: 'Bases Científicas',
    description: 'Fundamentos fisiológicos e mecanismos de ação dos análogos de GLP-1'
  },
  {
    icon: User,
    title: 'Flacidez Facial',
    description: 'Protocolos avançados para flacidez facial e perda de volume'
  },
  {
    icon: Zap,
    title: 'Flacidez Corporal',
    description: 'Tecnologias e bioestimuladores para redefinição corporal'
  },
  {
    icon: Scissors,
    title: 'Terapias Capilares',
    description: 'Prevenção e tratamento da rarefação capilar'
  },
  {
    icon: Sparkles,
    title: 'Medicina Regenerativa',
    description: 'Exossomos, PDRN, PRP e terapias avançadas'
  },
  {
    icon: Building2,
    title: 'Gestão de Clínicas',
    description: 'Estratégias de precificação e modelos de negócio'
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
            Conteúdo organizado em módulos estratégicos desenvolvidos para integrar ciência, prática clínica e resultados mensuráveis. Trilhas que oferecem uma jornada completa de atualização e rentabilidade para profissionais que atuam com terapias baseadas em GLP-1.
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
          <div className="bg-card border-2 border-dashed border-primary/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-foreground text-lg mb-1">
              Novos módulos
            </h3>
            <p className="text-primary font-medium">
              Em breve
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
