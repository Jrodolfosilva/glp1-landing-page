import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Home } from "lucide-react";

function setPageTitle(title: string) {
  document.title = title;
}

export default function Agradecimento() {
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle("Agradecimento | Comunidade GLP-1 Effects");
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="gradient-hero">
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto w-full max-w-2xl">
            <Card className="bg-card/95 backdrop-blur">
              <CardHeader className="text-center">
                <CardTitle className="font-heading text-3xl">
                  <h1>Agradecemos seu interesse em participar!</h1>
                </CardTitle>
                <CardDescription className="text-base">
                  Mas a comunidade é exclusiva para médicos com o CRM validado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" size="lg" className="flex-1" onClick={() => navigate("/")}> 
                    <Home className="w-4 h-4 mr-2" />
                    Voltar para Home
                  </Button>
                  <Button
                    variant="cta"
                    size="lg"
                    className="flex-1"
                    onClick={() => window.open("https://www.instagram.com/glp1effects/", "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Acessar Instagram
                  </Button>
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
