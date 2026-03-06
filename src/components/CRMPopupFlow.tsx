/*
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useUtmParams } from "@/hooks/useUtmParams";
import { toast } from "@/hooks/use-toast";

type Step = "crm-question" | "form";

interface CRMPopupFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Função de máscara de telefone
const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

const brazilianStates = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const specialties = [
  "Dermatologia",
  "Endocrinologia",
  "Nutrologia",
  "Medicina Estética",
  "Cirurgia Plástica",
  "Clínica Geral",
  "Geriatria",
  "Medicina do Esporte",
  "Outra",
];

const CRMPopupFlow = ({ open, onOpenChange }: CRMPopupFlowProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("crm-question");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    especialidade: "",
    estado: "",
    crm: "",
  });
  const utmParams = useUtmParams();

  const handleClose = () => {
    onOpenChange(false);
    // Reset to initial state after dialog closes
    setTimeout(() => setStep("crm-question"), 300);
  };

  const handleCrmResponse = (hasCrm: boolean) => {
    if (hasCrm) {
      setStep("form");
      return;
    }

    // Não possui CRM → redireciona para página (sem popup)
    onOpenChange(false);
    setTimeout(() => setStep("crm-question"), 300);
    navigate("/agradecimento", { replace: false });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.telefone || !formData.especialidade || !formData.estado || !formData.crm) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const nome = formData.nome.trim();
      const telefone = formData.telefone.trim();
      const crm = formData.crm.trim();

      const { error } = await supabase.from("leads").insert({
        nome,
        telefone,
        especialidade: formData.especialidade,
        estado: formData.estado,
        crm,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_term: utmParams.utm_term,
        utm_content: utmParams.utm_content,
      });

      if (error) throw error;

      // Mantém o webhook existente (notificação) sem bloquear o redirecionamento
      async function notificarWebhook() {
        try {
          const telefoneLimpo = telefone.replace(/\D/g, "");

          let telefoneTratado = telefoneLimpo;
          if (telefoneLimpo.length === 11) {
            const ddd = parseInt(telefoneLimpo.substring(0, 2));

            if (ddd > 31) {
              telefoneTratado = telefoneLimpo.substring(0, 2) + telefoneLimpo.substring(3);
            }
          }
          const telefoneFinal = `55${telefoneTratado}`;

         const messageCaption =
    `👋 *Bem-vindo(a) ao GLP-1 Effects, Dr. ${nome}!*\n\n` +
    `Você agora faz parte de uma comunidade médica exclusiva, focada no uso estratégico dos análogos de GLP-1 aliado à estética médica.\n\n` +
    `Aqui você vai aprender a utilizar o GLP-1 com segurança, além de prevenir e tratar os efeitos estéticos nos pacientes, integrando protocolos faciais, corporais e regenerativos à sua prática clínica — com impacto direto nos resultados e no faturamento da sua clínica.\n\n` +
    `🔑 *Seu acesso já está liberado*\n` +
    `Acesse o link abaixo, crie sua conta e finalize sua inscrição pelo e-mail de confirmação.\n\n` +
    `👉  https://app.neoidea.com.br/effects-cursos \n\n` +
    `*Conhecimento prático. Atualização contínua. Diferenciação real.*`;

          await fetch("https://admin-h.k9xg8k.easypanel.host/webhook-leads", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome,
              telefone: telefoneFinal,
              especialidade: formData.especialidade,
              estado: formData.estado,
              crm,
              caption: messageCaption,
            }),
          });
        } catch {
          // silencioso
        }
      }

      // Fire-and-forget
      void notificarWebhook();

      // Fecha o popup e redireciona para a página de obrigado (sem popup)
      onOpenChange(false);
      setTimeout(() => setStep("crm-question"), 300);
      navigate(`/obrigado?nome=${encodeURIComponent(nome)}`);
    } catch {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar seus dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-card border-border">
        {step === "crm-question" && (
          <>
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-heading text-card-foreground">Você possui CRM?</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
              <Button onClick={() => handleCrmResponse(true)} variant="cta" size="lg" className="flex-1">
                Sim
              </Button>
              <Button
                onClick={() => handleCrmResponse(false)}
                variant="outline"
                size="lg"
                className="flex-1 bg-muted text-muted-foreground border-border hover:bg-muted/80"
              >
                Não
              </Button>
            </div>
          </>
        )}

        {step === "form" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-heading text-card-foreground">
                Preencha as informações para liberação do seu acesso a comunidade:
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => {
                    const maskedValue = maskPhone(e.target.value);
                    handleInputChange("telefone", maskedValue);
                  }}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="especialidade">Especialidade</Label>
                <Select value={formData.especialidade} onValueChange={(value) => handleInputChange("especialidade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select value={formData.estado} onValueChange={(value) => handleInputChange("estado", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {brazilianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crm">CRM</Label>
                <Input
                  id="crm"
                  value={formData.crm}
                  onChange={(e) => handleInputChange("crm", e.target.value)}
                  placeholder="Seu número de CRM"
                  required
                />
              </div>

              <Button type="submit" variant="cta" size="lg" className="w-full mt-6" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Receber acesso a comunidade"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CRMPopupFlow;
*/


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useUtmParams } from "@/hooks/useUtmParams";
import { toast } from "@/hooks/use-toast";

type Step = "crm-question" | "form";

interface CRMPopupFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Função de máscara de telefone
const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

const brazilianStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

const specialties = [
  "Dermatologia", "Endocrinologia", "Nutrologia", "Medicina Estética", "Cirurgia Plástica", "Clínica Geral", "Geriatria", "Medicina do Esporte", "Outra",
];

const CRMPopupFlow = ({ open, onOpenChange }: CRMPopupFlowProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("crm-question");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    especialidade: "",
    estado: "",
    crm: "",
  });

  const utmParams = useUtmParams();

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setStep("crm-question"), 300);
  };

  const handleCrmResponse = (hasCrm: boolean) => {
    if (hasCrm) {
      setStep("form");
      return;
    }
    onOpenChange(false);
    setTimeout(() => setStep("crm-question"), 300);
    navigate("/agradecimento", { replace: false });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.telefone || !formData.especialidade || !formData.estado || !formData.crm) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const nome = formData.nome.trim();
      const telefone = formData.telefone.trim();
      const crm = formData.crm.trim();

      // 1. Salvar no Supabase (Banco de Dados)
      const { error } = await supabase.from("leads").insert({
        nome,
        telefone,
        especialidade: formData.especialidade,
        estado: formData.estado,
        crm,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_term: utmParams.utm_term,
        utm_content: utmParams.utm_content,
      });

      if (error) throw error;

      // 2. POST para Google Sheets (Mapeado com o seu Script)
      async function enviarGoogleSheets() {
        try {
          // Os nomes das chaves aqui devem bater com o seu script: p.nome, p.utm_source, etc.
          await fetch("https://script.google.com/macros/s/AKfycbw8EvTqIY5jQo5SmOywpFx3DM56D6Gw4Q_y3eMteoAuFo_VD7X5ok6gmN70GpQ0W81nyw/exec?destino=comunidade", {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: nome,
              telefone: telefone,
              crm: crm,
              especialidade: formData.especialidade,
              estado: formData.estado,
              utm_source: utmParams.utm_source || "direto",
              utm_campaign: utmParams.utm_campaign || "nenhuma",
              utm_content: utmParams.utm_content || "nenhum"
            }),
          });
        } catch (err) {
          console.error("Erro ao enviar para Google Sheets:", err);
        }
      }

      // 3. Notificação Webhook
      async function notificarWebhook() {
        try {
          const telefoneLimpo = telefone.replace(/\D/g, "");
          let telefoneTratado = telefoneLimpo;
          if (telefoneLimpo.length === 11) {
            const ddd = parseInt(telefoneLimpo.substring(0, 2));
            if (ddd > 31) {
              telefoneTratado = telefoneLimpo.substring(0, 2) + telefoneLimpo.substring(3);
            }
          }
          const telefoneFinal = `55${telefoneTratado}`;
          const messageCaption = `👋 *Bem-vindo(a) ao GLP-1 Effects, Dr. ${nome}!*

Você agora faz parte de uma comunidade médica exclusiva, focada no uso estratégico dos análogos de GLP-1 aliado à estética médica.

Aqui você vai aprender a utilizar o GLP-1 com segurança, além de prevenir e tratar os efeitos estéticos nos pacientes, integrando protocolos faciais, corporais e regenerativos à sua prática clínica — com impacto direto nos resultados e no faturamento da sua clínica.

🔑 *Seu acesso já está liberado*
Acesse o link abaixo, crie sua conta e finalize sua inscrição pelo e-mail de confirmação.

👉 https://app.neoidea.com.br/effects-cursos

Conhecimento prático. Atualização contínua. Diferenciação real.`;

          await fetch("https://admin-h.k9xg8k.easypanel.host/webhook-leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nome,
              telefone: telefoneFinal,
              especialidade: formData.especialidade,
              estado: formData.estado,
              crm,
              caption: messageCaption,
            }),
          });
        } catch { /* silencioso */ }
      }

      // Dispara os envios externos
      void enviarGoogleSheets();
      void notificarWebhook();

      // Fecha o popup e redireciona
      onOpenChange(false);
      setTimeout(() => setStep("crm-question"), 300);
      navigate(`/obrigado?nome=${encodeURIComponent(nome)}`);

    } catch (err) {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar seus dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-card border-border">
        {step === "crm-question" && (
          <>
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-heading text-card-foreground">Você possui CRM?</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
              <Button onClick={() => handleCrmResponse(true)} variant="cta" size="lg" className="flex-1"> Sim </Button>
              <Button onClick={() => handleCrmResponse(false)} variant="outline" size="lg" className="flex-1 bg-muted text-muted-foreground border-border hover:bg-muted/80"> Não </Button>
            </div>
          </>
        )}

        {step === "form" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-heading text-card-foreground">
                Preencha as informações para liberação do seu acesso a comunidade:
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" value={formData.nome} onChange={(e) => handleInputChange("nome", e.target.value)} placeholder="Seu nome completo" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange("telefone", maskPhone(e.target.value))}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="especialidade">Especialidade</Label>
                <Select value={formData.especialidade} onValueChange={(value) => handleInputChange("especialidade", value)}>
                  <SelectTrigger><SelectValue placeholder="Selecione sua especialidade" /></SelectTrigger>
                  <SelectContent>
                    {specialties.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select value={formData.estado} onValueChange={(value) => handleInputChange("estado", value)}>
                  <SelectTrigger><SelectValue placeholder="Selecione seu estado" /></SelectTrigger>
                  <SelectContent>
                    {brazilianStates.map((st) => (
                      <SelectItem key={st} value={st}>{st}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="crm">CRM</Label>
                <Input id="crm" value={formData.crm} onChange={(e) => handleInputChange("crm", e.target.value)} placeholder="Seu número de CRM" required />
              </div>
              <Button type="submit" variant="cta" size="lg" className="w-full mt-6" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Receber acesso a comunidade"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CRMPopupFlow;