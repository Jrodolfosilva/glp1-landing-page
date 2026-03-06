import { Users, Globe, BookOpen } from 'lucide-react';

const differentials = [
  {
    icon: Users,
    title: 'Comunidade Exclusiva',
    description: '5 mil médicos selecionados',
  },
  {
    icon: Globe,
    title: 'Ensino médico global',
    description: 'Cursos dublados com sincronização labial e textos traduzidos para diversos idiomas',
  },
  {
    icon: BookOpen,
    title: 'Guias práticos',
    description: 'Desde a teoria científico-clínica até a abordagem em gestão',
  },
];

const DifferentialsSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-card-foreground mb-4">
            Por que somos <span className="text-primary">diferentes</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {differentials.map((item) => (
            <div
              key={item.title}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="font-heading font-bold text-lg text-card-foreground mb-2">
                {item.title}
              </h3>
              
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
