import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Doctor images
import alessandroAlarcao from '@/assets/doctors/alessandro-alarcao.jpg';
import alexandreFerreira from '@/assets/doctors/alexandre-ferreira.jpg';
import carlosRobertoAntonio from '@/assets/doctors/carlos-roberto-antonio.jpg';
import guilhermeMachado from '@/assets/doctors/guilherme-machado.jpg';
import julianaRomano from '@/assets/doctors/juliana-romano.jpg';
import leandroCardoso from '@/assets/doctors/leandro-cardoso.jpg';
import lucianaLourenco from '@/assets/doctors/luciana-lourenco.jpg';
import shirleiBorelli from '@/assets/doctors/shirlei-borelli.jpg';

const doctorImages: Record<string, string> = {
  'Dr. Alexandre Ferreira': alexandreFerreira,
  'Dr. Alessandro Alarcão': alessandroAlarcao,
  'Dr. Carlos Roberto Antonio': carlosRobertoAntonio,
  'Dr. Guilherme Machado': guilhermeMachado,
  'Dra. Juliana Romano': julianaRomano,
  'Leandro Cardoso': leandroCardoso,
  'Dra. Luciana Lourenço': lucianaLourenco,
  'Dra. Shirlei Borelli': shirleiBorelli,
};

const scheduleItems = [
  { date: '18/11', title: 'Conceitos e Perspectivas sobre o Uso dos Análogos de GLP-1', speaker: 'Dr. Alexandre Ferreira' },
  { date: '27/11', title: 'GLP-1, Os Fármacos do Momento pt. 1', speaker: 'Dr. Alexandre Ferreira' },
  { date: '04/12', title: 'GLP-1, Os Fármacos do Momento pt. 2', speaker: 'Dr. Alexandre Ferreira' },
  { date: '11/12', title: 'Além dos efeitos do GLP-1: A Evolução da Dermatologia pt.1', speaker: 'Dra. Shirlei Borelli' },
  { date: '18/12', title: 'Além dos efeitos do GLP-1: Novos efeitos e terapias para Lipedema pt.2', speaker: 'Dra. Luciana Lourenço' },
  { date: '08/01', title: 'A Dermatologia está em constante mudança. A importância dos efeitos dos análogos do GLP-1 no presente e futuro da dermatologia.', speaker: 'Dr. Alessandro Alarcão' },
  { date: '15/01', title: 'Novas oportunidades clínicas e empresariais que surgem com essa revolução terapêutica.', speaker: 'Leandro Cardoso' },
  { date: '22/01', title: 'Cenário e tendências para Estética Médica Global em 2026 - IMCAS Paris', speaker: 'Dr. Alessandro Alarcão' },
  { date: '31/01', title: 'Visão Geral do IMCAS', speaker: 'Dr. Carlos Roberto Antonio' },
  { date: '05/02', title: 'Avanços no tratamento e manejo do Lipedema usando análogos do GLP-1 e tecnologias.', speaker: 'Dra. Juliana Romano' },
  { date: '12/02', title: 'Avanços em terapia regenerativa com exossomos autólogos.', speaker: 'Dra. Luciana Lourenço' },
  { date: '19/02', title: 'Tecnologias que fazem a diferença no manejo da flacidez', speaker: 'Dr. Alessandro Alarcão, Dra. Luciana Lourenço, Dr. Guilherme Machado' },
];

const INITIAL_ITEMS = 5;

const ScheduleSection = () => {
  const [showAll, setShowAll] = useState(false);
  
  const displayedItems = showAll ? scheduleItems : scheduleItems.slice(0, INITIAL_ITEMS);

  const getSpeakerImage = (speaker: string): string | null => {
    for (const [name, image] of Object.entries(doctorImages)) {
      if (speaker.includes(name)) {
        return image;
      }
    }
    return null;
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cronograma de <span className="text-primary">Aulas</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-[28px] md:left-[36px] top-0 bottom-0 w-0.5 bg-primary/30" />

            {displayedItems.map((item, index) => {
              const speakerImage = getSpeakerImage(item.speaker);
              
              return (
                <div key={index} className="relative flex items-start gap-3 md:gap-4 mb-6 last:mb-0">
                  <div className="relative z-10 flex-shrink-0">
                    {speakerImage ? (
                      <img 
                        src={speakerImage} 
                        alt={item.speaker}
                        className="w-14 h-14 md:w-18 md:h-18 rounded-full object-cover border-2 border-primary/50"
                      />
                    ) : (
                      <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center">
                        <span className="text-primary text-xs font-bold">
                          {item.speaker.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 bg-card rounded-xl p-4 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading font-bold text-primary text-sm">{item.date}</span>
                    </div>
                    <p className="font-heading font-semibold text-foreground text-sm md:text-base mb-1">
                      {item.title}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {item.speaker}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {scheduleItems.length > INITIAL_ITEMS && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                className="gap-2"
              >
                {showAll ? (
                  <>
                    Ver menos
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Ver cronograma completo
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
