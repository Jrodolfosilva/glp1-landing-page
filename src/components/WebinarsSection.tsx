import { Badge } from '@/components/ui/badge';
import { Calendar, Video } from 'lucide-react';

const webinars = [
  {
    id: 'I',
    date: '21 de fevereiro de 2026',
    title: 'Webinar Master I',
    topics: [
      'Introdução à Estética Avançada para o Paciente das Canetas Emagrecedoras',
      'Novidades do IMCAS Paris 2026',
      'A nova economia das canetas emagrecedoras: tendências, oportunidades e modelos de negócio na estética médica',
    ],
  },
  {
    id: 'II',
    date: '28 de março de 2026',
    title: 'Webinar Master II',
    topics: [
      'Áreas mais impactadas pelo paciente das canetas: face, corpo, capilar',
      'A prevenção como terapia fundamental no novo perfil de paciente',
      'Novidades do IMCAS Américas',
      'Precificação de protocolos e estratégias comerciais para a performance financeira da clínica',
    ],
  },
  {
    id: 'III',
    date: '25 de abril de 2026',
    title: 'Webinar Master III',
    topics: [
      'Tratamentos avançados e específicos para o paciente das canetas',
      'Novidades da Coreia do Sul e mercados emergentes em cosméticos, tecnologias e injetáveis',
      'Precificação de protocolos e estratégias comerciais para melhorar a performance da clínica',
    ],
  },
  {
    id: 'IV',
    date: '13 de junho de 2026',
    title: 'Webinar Master IV',
    topics: [
      'Protocolos e associações em drug delivery, tecnologias, rejuvenescimento, flacidez e medicina regenerativa',
      'Novidades do Congresso Brasileiro de Cirurgia Dermatológica e congressos internacionais',
      'Precificação correta de protocolos e estratégias comerciais para melhorar o resultado financeiro da clínica',
    ],
  },
];

const WebinarsSection = () => {
  return (
    <section id="webinars" className="py-24 gradient-dark text-secondary-foreground rounded-t-[50px] rounded-b-[50px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Eventos Exclusivos
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Webinars <span className="text-primary">Master</span>
          </h2>
          <p className="text-secondary-foreground/80 text-lg max-w-3xl mx-auto">
            Uma experiência completa unindo conteúdo científico de excelência, debates clínicos aplicados e reflexões estratégicas sobre o futuro da prática médica e estética, com foco em inovação, resultados e integração entre ciência e mercado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {webinars.map((webinar) => (
            <div
              key={webinar.id}
              className="bg-secondary/20 rounded-xl p-6 border border-secondary/30 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-semibold">{webinar.date}</span>
                </div>
              </div>
              
              <h3 className="font-heading font-bold text-lg text-secondary-foreground mb-3">
                {webinar.title}
              </h3>
              
              <p className="text-primary text-sm font-semibold mb-2">Temas Master:</p>
              <ul className="text-secondary-foreground/70 text-sm space-y-1">
                {webinar.topics.map((topic, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-primary text-sm font-semibold">
            Exclusivo para médicos verificados via CRM.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WebinarsSection;
