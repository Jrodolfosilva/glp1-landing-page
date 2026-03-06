import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const faqs = [
  {
    question: 'Para quem é a GLP-1 Effects?',
    answer: 'A plataforma é exclusiva para médicos de todas as especialidades. Todos seremos afetados pela Revolução do GLP-1 - aqui, desvendamos as tendências que vão transformar a sua prática amanhã.',
  },
  {
    question: 'Preciso ter CRM para acessar?',
    answer: 'O acesso à comunidade e plataforma é restrito a profissionais médicos com CRM ativo. Acreditamos que conteúdo de qualidade merece estar nas mãos de quem tem formação e responsabilidade ética para aplicá-lo.',
  },
  {
    question: 'Onde terei acesso ao Programa Oficial da GLP-1 Effects?',
    answer: 'Todo o conteúdo fica disponível em nossa plataforma online, acessível por login e senha que você receberá ao finalizar a compra.',
  },
  {
    question: 'Existe suporte em caso de dúvidas?',
    answer: 'Sim, nossa equipe de suporte estará disponível por e-mail, Whatsapp e chat para ajudá-lo com qualquer dúvida técnica ou sobre o conteúdo.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer: 'Aceitamos pagamento via cartão de crédito e Pix.',
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer: 'Sim. A assinatura é mensal e pode ser cancelada quando desejar, sem multas ou taxas de cancelamento.',
  },
  {
    question: 'Vocês emitem certificado?',
    answer: 'Sim. Certificados de participação são emitidos para os módulos completos e Webinars Master com carga horária especificada.',
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Perguntas Frequentes
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Dúvidas? <span className="text-primary">Respondemos</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="font-heading font-semibold text-left text-card-foreground hover:text-primary transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;