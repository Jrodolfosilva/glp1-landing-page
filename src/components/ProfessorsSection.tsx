import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Import all doctor images
import alessandroAlarcao from '@/assets/doctors/alessandro-alarcao.jpg';
import alexandreFerreira from '@/assets/doctors/alexandre-ferreira.jpg';
import andreBorba from '@/assets/doctors/andre-borba.jpg';
import angelaSuemiShimuta from '@/assets/doctors/angela-suemi-shimuta.jpg';
import carlosBautzer from '@/assets/doctors/carlos-bautzer.jpg';
import carlosRobertoAntonio from '@/assets/doctors/carlos-roberto-antonio.jpg';
import danielaAidar from '@/assets/doctors/daniela-aidar.jpg';
import guilhermeMachado from '@/assets/doctors/guilherme-machado.jpg';
import julianaRomano from '@/assets/doctors/juliana-romano.jpg';
import leandroCardoso from '@/assets/doctors/leandro-cardoso.jpg';
import lucianaCrivelin from '@/assets/doctors/luciana-crivelin.jpg';
import lucianaLourenco from '@/assets/doctors/luciana-lourenco.jpg';
import mauroAndre from '@/assets/doctors/mauro-andre.jpg';
import shirleiBorelli from '@/assets/doctors/shirlei-borelli.jpg';
import tadaakiYamada from '@/assets/doctors/tadaaki-yamada.jpg';

const professors = [
  { name: 'Dr. Alessandro Alarcão', specialty: 'Dermatologista', image: alessandroAlarcao },
  { name: 'Dr. Alexandre Ferreira', specialty: 'Medicina Estética', image: alexandreFerreira },
  { name: 'Dr. André Borba', specialty: 'Cirurgião Plástico', image: andreBorba },
  { name: 'Dra. Angela Suemi Shimuta', specialty: 'Dermatologista', image: angelaSuemiShimuta },
  { name: 'Dr. Carlos Bautzer', specialty: 'Cirurgião Plástico', image: carlosBautzer },
  { name: 'Dr. Carlos Roberto Antonio', specialty: 'Dermatologista', image: carlosRobertoAntonio },
  { name: 'Dra. Daniela Aidar', specialty: 'Medicina Estética', image: danielaAidar },
  { name: 'Dr. Guilherme Machado', specialty: 'Medicina Estética', image: guilhermeMachado },
  { name: 'Dra. Juliana Romano', specialty: 'Medicina Estética', image: julianaRomano },
  { name: 'Leandro Cardoso', specialty: 'Estrategista de Negócios', image: leandroCardoso },
  { name: 'Dra. Luciana Crivelin', specialty: 'Dermatologista', image: lucianaCrivelin },
  { name: 'Dra. Luciana Lourenço', specialty: 'Medicina Estética', image: lucianaLourenco },
  { name: 'Dr. Mauro André', specialty: 'Cirurgião Plástico', image: mauroAndre },
  { name: 'Dra. Shirlei Borelli', specialty: 'Dermatologista', image: shirleiBorelli },
  { name: 'Dr. Tadaaki Yamada', specialty: 'Medicina Estética', image: tadaakiYamada },
];

const ProfessorsSection = () => {
  return (
    <section id="professores" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Aprenda com quem <span className="text-primary">lidera</span>
          </h2>
          <p className="text-primary font-heading text-xl font-semibold">
            +{professors.length} especialistas confirmados
          </p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {professors.map((professor) => (
                <CarouselItem key={professor.name} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <div className="group relative">
                    <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4">
                      <img
                        src={professor.image}
                        alt={professor.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-glp-dark via-transparent to-transparent opacity-60" />
                    </div>
                    
                    <div className="text-center">
                      <p className="font-heading font-bold text-sm md:text-base text-foreground">
                        {professor.name}
                      </p>
                      <p className="text-primary text-xs md:text-sm">
                        {professor.specialty}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ProfessorsSection;
