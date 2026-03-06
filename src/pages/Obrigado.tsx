import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MessageCircle } from "lucide-react";

function setPageTitle(title: string) {
  document.title = title;
}

export default function Obrigado() {
  const location = useLocation();

  const nome = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("nome") || "";
  }, [location.search]);

  useEffect(() => {
    setPageTitle("Obrigado | Comunidade GLP-1 Effects");
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="gradient-hero">
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto w-full max-w-3xl">
            <Card className="bg-card/95 backdrop-blur">
              <CardHeader className="text-center">
                <CardTitle className="font-heading text-3xl">
                  <h1>Obrigado por entrar na Comunidade GLP-1 Effects</h1>
                </CardTitle>
                <CardDescription className="text-base">
                  {nome ? (
                    <>
                      Dr(a). <span className="text-primary font-semibold">{nome}</span>, validamos seu CRM e seu acesso está liberado!
                    </>
                  ) : (
                    "Validamos seu CRM e seu acesso está liberado!"
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center mb-6">
                  Você é um dos médicos pioneiros desta comunidade. Vamos completar sua entrada em 3 passos rápidos:
                </p>

                <div className="space-y-4 text-left bg-muted/50 p-4 rounded-xl border border-border">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-card-foreground">PASSO 1 → Clique e Entre</p>
                      <p className="text-sm text-muted-foreground">Acesse a comunidade exclusiva no WhatsApp agora.</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => window.open("https://chat.whatsapp.com/FLeWyZHo1GdB3aJLE7GCnw", "_blank")}
                    variant="cta"
                    size="lg"
                    className="w-full"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    ENTRAR NA COMUNIDADE
                  </Button>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-card-foreground">PASSO 2 → Aguarde o Link</p>
                      <p className="text-sm text-muted-foreground">
                        Ao entrar no grupo, você receberá automaticamente um link personalizado para criar seu acesso à plataforma de ensino GLP-1 Effects.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-card-foreground">PASSO 3 → Valide e Explore</p>
                      <p className="text-sm text-muted-foreground">Confirme o e-mail que enviaremos e pronto! Você terá acesso imediato a:</p>
                    </div>
                  </div>

                  <ul className="space-y-1 text-sm text-muted-foreground ml-11">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Todos os webinars master
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      +90 aulas científicas sobre GLP-1
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Protocolos clínicos e dossiês científicos
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Discussões ao vivo toda quinta às 20h30
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
