import { Star } from 'lucide-react';

// Import doctor images
import shirleiBorelli from '@/assets/doctors/shirlei-borelli.jpg';
import julianaRomano from '@/assets/doctors/juliana-romano.jpg';
import lucianaLourenco from '@/assets/doctors/luciana-lourenco.jpg';
import alexandreFerreira from '@/assets/doctors/alexandre-ferreira.jpg';

const testimonials = [
  {
    quote: 'Estamos trazendo clareza para a questão estética. É muito importante poder abordar de maneira tão abrangente um tema tão atual e que ainda vai evoluir tanto.',
    author: 'Dra. Shirlei Borelli',
    role: 'Dermatologista',
    image: shirleiBorelli,
  },
  {
    quote: 'Algo inovador e disruptivo, que agrega tanto para os médicos quanto para os pacientes. É um mercado que só vai crescer, e quando combinamos estética avançada e o paciente das canetas, temos a perfeição do tratamento.',
    author: 'Dra. Juliana Romano',
    role: 'Medicina Estética',
    image: julianaRomano,
  },
  {
    quote: 'Essa ideia é fantástica. Vocês terão todo o meu apoio pessoal e científico, o que for preciso.',
    author: 'Dra. Luciana Lourenço',
    role: 'Medicina Estética',
    image: lucianaLourenco,
  },
  {
    quote: 'Ter uma plataforma para embasar profissionais envolvidos no tratamento, com a abordagem completa do novo paciente, é de extrema importância para que os médicos evoluam tão rápido quanto a transformação do mercado.',
    author: 'Dr. Alexandre Ferreira',
    role: 'Medicina Estética',
    image: alexandreFerreira,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Indicado por <span className="text-primary">profissionais</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-card rounded-2xl p-6 border border-primary/20 bg-gradient-to-br from-card to-muted/30"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-primary/40 text-4xl font-serif">
                "
              </div>
              
              {/* Author info with image */}
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <p className="font-heading font-bold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-primary text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                "{testimonial.quote}"
              </p>
              
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
