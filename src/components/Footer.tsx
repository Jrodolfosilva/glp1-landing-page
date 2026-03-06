import { Instagram, Phone, Mail } from 'lucide-react';
import logoWhite from '@/assets/logo-white.png';

const Footer = () => {
  return (
    <footer className="bg-glp-dark text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={logoWhite} alt="GLP-1 Effects" className="h-12 mb-4" />
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Links Úteis</h4>
            <ul className="space-y-3">
              {['Programação Completa', 'Corpo Docente', 'Webinars Master', 'Patrocinadores'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="font-heading font-bold text-lg mb-4">Contato</h4>
            <div className="space-y-4">
              <a
                href="mailto:contato@effectscursos.com.br"
                className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                contato@effectscursos.com.br
              </a>
              
              <a
                href="tel:+5511969200646"
                className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                11 96920 0646
              </a>
              
              <a
                href="https://instagram.com/glp1effects"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
                @glp1effects
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-secondary/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-foreground/50 text-sm">
            © 2024 GLP-1 Effects. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-secondary-foreground/50 hover:text-primary transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-secondary-foreground/50 hover:text-primary transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
