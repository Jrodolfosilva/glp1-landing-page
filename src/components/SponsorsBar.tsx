import contourline from '@/assets/sponsors/contourline.png';
import supremamed from '@/assets/sponsors/supremamed.png';
import toskani from '@/assets/sponsors/toskani.png';
import deka from '@/assets/sponsors/deka.png';
import skintec from '@/assets/sponsors/skintec.png';
import medbeauty from '@/assets/sponsors/medbeauty.png';
import medsystem from '@/assets/sponsors/medsystem.png';

const sponsors = [
  { name: 'Contourline', logo: contourline },
  { name: 'Suprema Med', logo: supremamed },
  { name: 'Toskani', logo: toskani },
  { name: 'Deka', logo: deka },
  { name: 'Skintec', logo: skintec },
  { name: 'Medbeauty', logo: medbeauty },
  { name: 'Medsystem', logo: medsystem },
];

const SponsorsBar = () => {
  // Duplicate sponsors for seamless loop
  const duplicatedSponsors = [...sponsors, ...sponsors];

  return (
    <section className="py-12 bg-gradient-to-r from-glp-dark via-glp-blue to-glp-dark overflow-hidden rounded-b-[50px]">
      <div className="container mx-auto px-4">
        <p className="text-center text-secondary-foreground/80 text-sm font-medium mb-8">
          Desenvolvimento de pesquisas e tecnologias apoiado por:
        </p>
        
        {/* Carousel container */}
        <div className="relative">
          <div className="flex animate-marquee gap-16 md:gap-24">
            {duplicatedSponsors.map((sponsor, index) => (
              <div
                key={`${sponsor.name}-${index}`}
                className="flex-shrink-0 h-12 md:h-16 lg:h-20 opacity-80 hover:opacity-100 transition-opacity"
              >
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsBar;
