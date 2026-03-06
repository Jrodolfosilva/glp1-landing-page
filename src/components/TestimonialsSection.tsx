import { Star } from 'lucide-react';

// Import doctor images
import shirleiBorelli from '@/assets/doctors/shirlei-borelli.jpg';
import julianaRomano from '@/assets/doctors/juliana-romano.jpg';
import lucianaLourenco from '@/assets/doctors/luciana-lourenco.jpg';
import alexandreFerreira from '@/assets/doctors/alexandre-ferreira.jpg';

const testimonials = [
  {
    quote: 'Estamos fazendo aqui juntos é trazendo clareza, na questão estética. Então é muito importante, que a gente possa trazer de uma maneira tão abrangente um tema tão atual e que ainda vai evoluir tanto!',
    author: 'Dra. Shirley Borelli',
    role: 'Médica',
    image: shirleiBorelli,
  },
  {
    quote: 'Algo inovador, disruptivo e que vai agregar muito mais tanto para os médicos quanto para os pacientes que a gente vai atender, é um mercado que só vai crescer, sendo o segundo no mundo e o GLP-1 é o maior mercado de emagrecimento, quando temos esses dois combinados tem a perfeição do tratamento dos pacientes.',
    author: 'Dra. Juliana Romano',
    role: 'Médica',
    image: julianaRomano,
  },
  {
    quote: 'Essa ideia é fantástica, vocês terão todo o meu apoio pessoal, científico, o que for preciso!',
    author: 'Dra. Luciana Lourenço',
    role: 'Médica',
    image: lucianaLourenco,
  },
  {
    quote: 'Ter uma plataforma para embasar profissionais, que estão envolvidos no tratamento, que aborda a relação de obesidade e doenças de comorbidade associada, é de importância muito grande, para que os profissionais tenham capacidade de evoluir tão rápido quanto a mudança desse mercado dentro da medicina.',
    author: 'Dr. Alexandre Ferreira',
    role: 'Médico',
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
