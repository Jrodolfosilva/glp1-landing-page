import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const faqs = [
  {
    question: 'Para quem é a Effects?',
    answer: 'Para médicos que atuam (ou querem atuar) com estética avançada e atendem o novo perfil de paciente que emergiu com as canetas emagrecedoras. O paciente mudou, e os protocolos precisam acompanhar.',
  },
  {
    question: 'Preciso ter CRM para acessar?',
    answer: 'Sim. O acesso à comunidade e à plataforma é restrito a profissionais médicos com CRM ativo.',
  },
  {
    question: 'Onde acesso o Programa Oficial da Effects?',
    answer: 'Todo o conteúdo fica disponível na plataforma online, acessível por login e senha que você recebe ao finalizar a compra.',
  },
  {
    question: 'Existe suporte em caso de dúvidas?',
    answer: 'Sim. Nossa equipe está disponível por e-mail, WhatsApp e chat para qualquer dúvida técnica ou de conteúdo.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer: 'Aceitamos pagamento via cartão de crédito, em assinatura mensal.',
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer: 'Sim. A assinatura é mensal e pode ser cancelada quando desejar, sem multas ou taxas de cancelamento.',
  },
  {
    question: 'Vocês emitem certificado?',
    answer: 'Sim. Certificados de participação são emitidos para os módulos completos e Webinars Master, com carga horária especificada.',
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