import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Zap, Send, Loader2, Bot, Sparkles, MessageSquare, Webhook, Save, TestTube } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function AdminApiIntegrations() {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // n8n Webhook state
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookPayload, setWebhookPayload] = useState('{\n  "event": "test",\n  "data": {}\n}');
  const [isWebhookLoading, setIsWebhookLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load saved webhook URL from localStorage
  useEffect(() => {
    const savedUrl = localStorage.getItem('n8n_webhook_url');
    if (savedUrl) {
      setWebhookUrl(savedUrl);
    }
  }, []);

  const saveWebhookUrl = () => {
    setIsSaving(true);
    localStorage.setItem('n8n_webhook_url', webhookUrl);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('URL do webhook salva!');
    }, 500);
  };

  const testWebhook = async () => {
    if (!webhookUrl.trim()) {
      toast.error('Digite a URL do webhook n8n');
      return;
    }

    setIsWebhookLoading(true);

    try {
      let payload = {};
      try {
        payload = JSON.parse(webhookPayload);
      } catch {
        toast.error('JSON inválido no payload');
        setIsWebhookLoading(false);
        return;
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          ...payload,
          timestamp: new Date().toISOString(),
          source: 'glp1-effects-admin',
        }),
      });

      toast.success('Webhook enviado! Verifique no n8n se foi recebido.');
    } catch (error) {
      console.error('Webhook Error:', error);
      toast.error('Erro ao enviar webhook: ' + (error as Error).message);
    } finally {
      setIsWebhookLoading(false);
    }
  };

  const triggerLeadWebhook = async (leadData: object) => {
    if (!webhookUrl.trim()) {
      console.log('Webhook URL não configurada');
      return;
    }

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          event: 'new_lead',
          data: leadData,
          timestamp: new Date().toISOString(),
          source: 'glp1-effects-admin',
        }),
      });
    } catch (error) {
      console.error('Webhook Error:', error);
    }
  };

  const testAI = async () => {
    if (!aiPrompt.trim()) {
      toast.error('Digite uma mensagem para testar');
      return;
    }

    setIsLoading(true);
    setAiResponse('');

    try {
      const response = await supabase.functions.invoke('chat-ai', {
        body: { 
          messages: [
            { role: 'user', content: aiPrompt }
          ]
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data) {
        if (typeof response.data === 'object' && response.data.content) {
          setAiResponse(response.data.content);
        } else if (typeof response.data === 'string') {
          setAiResponse(response.data);
        } else {
          setAiResponse(JSON.stringify(response.data, null, 2));
        }
      }

      toast.success('Resposta recebida!');
    } catch (error) {
      console.error('AI Error:', error);
      toast.error('Erro ao chamar IA: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout 
      title="API & Integrações" 
      description="Configure e teste integrações com IA, webhooks e APIs externas"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* n8n Webhook Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Webhook className="h-5 w-5 text-orange-500" />
              Webhook n8n
            </CardTitle>
            <CardDescription>
              Configure o webhook para integrar com automações do n8n. 
              O webhook será acionado quando novos leads forem cadastrados.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">URL do Webhook</Label>
              <div className="flex gap-2">
                <Input
                  id="webhook-url"
                  placeholder="https://seu-n8n.com/webhook/..."
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
                <Button variant="outline" onClick={saveWebhookUrl} disabled={isSaving}>
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Cole aqui a URL do webhook do seu workflow n8n
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook-payload">Payload de Teste (JSON)</Label>
              <Textarea
                id="webhook-payload"
                placeholder='{"event": "test", "data": {}}'
                value={webhookPayload}
                onChange={(e) => setWebhookPayload(e.target.value)}
                rows={4}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={testWebhook} disabled={isWebhookLoading} className="w-full">
              {isWebhookLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <TestTube className="h-4 w-4 mr-2" />
              )}
              Testar Webhook
            </Button>

            <div className="p-3 bg-muted/50 rounded-lg text-xs space-y-1">
              <p className="font-semibold">Eventos disponíveis:</p>
              <ul className="list-disc list-inside text-muted-foreground">
                <li><code>new_lead</code> - Novo lead cadastrado</li>
                <li><code>test</code> - Teste de conexão</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Lovable AI Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Lovable AI
            </CardTitle>
            <CardDescription>
              Teste o Lovable AI integrado ao projeto. Use para gerar conteúdo, 
              responder dúvidas ou automatizar tarefas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ai-prompt">Mensagem</Label>
              <Textarea
                id="ai-prompt"
                placeholder="Ex: Explique os benefícios do GLP-1 para médicos..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={4}
              />
            </div>
            <Button onClick={testAI} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Enviar para IA
            </Button>

            {aiResponse && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <Label className="text-sm text-muted-foreground mb-2 block">Resposta:</Label>
                <p className="text-sm whitespace-pre-wrap">{aiResponse}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Integrations Status */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Status das Integrações
          </CardTitle>
          <CardDescription>
            APIs e serviços conectados ao sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border border-border/50 flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Lovable AI</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  IA integrada para chat e análises.
                </p>
                <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded">
                  Ativo
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border/50 flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Webhook className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Webhook n8n</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Automações via webhook.
                </p>
                <span className={`text-xs px-2 py-1 rounded ${webhookUrl ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'}`}>
                  {webhookUrl ? 'Configurado' : 'Não configurado'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border/50 flex items-start gap-4 opacity-60">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">WhatsApp API</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Notificações automáticas.
                </p>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                  Em breve
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Documentation */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Documentação da API</CardTitle>
          <CardDescription>
            Endpoints disponíveis para integração com sistemas externos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-orange-500 text-white text-xs font-mono rounded">WEBHOOK</span>
                <code className="text-sm">POST para sua URL n8n</code>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Payload enviado quando um novo lead é cadastrado:
              </p>
              <div className="bg-background p-3 rounded border text-xs font-mono overflow-x-auto">
                <pre>{`{
  "event": "new_lead",
  "data": {
    "nome": "Nome do Lead",
    "telefone": "(11) 99999-9999",
    "crm": "123456",
    "especialidade": "Dermatologia",
    "estado": "SP"
  },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "glp1-effects-admin"
}`}</pre>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-green-500 text-white text-xs font-mono rounded">POST</span>
                <code className="text-sm">/functions/v1/chat-ai</code>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Endpoint para interação com a IA.
              </p>
              <div className="bg-background p-3 rounded border text-xs font-mono overflow-x-auto">
                <pre>{`{
  "messages": [
    { "role": "user", "content": "Sua mensagem aqui" }
  ]
}`}</pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
