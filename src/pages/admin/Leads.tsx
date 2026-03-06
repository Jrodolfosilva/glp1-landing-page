import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Download, Search, RefreshCw, X, Loader2, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Lead {
  id: string;
  nome: string;
  telefone: string;
  especialidade: string;
  estado: string;
  crm: string;
  created_at: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
}

const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const specialties = [
  'Dermatologia',
  'Endocrinologia',
  'Nutrologia',
  'Medicina Estética',
  'Cirurgia Plástica',
  'Clínica Geral',
  'Geriatria',
  'Medicina do Esporte',
  'Outra'
];

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  const [especialidadeFilter, setEspecialidadeFilter] = useState('');
  const [utmSourceFilter, setUtmSourceFilter] = useState('');
  const [utmCampaignFilter, setUtmCampaignFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Unique values for filters
  const [estados, setEstados] = useState<string[]>([]);
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [utmSources, setUtmSources] = useState<string[]>([]);
  const [utmCampaigns, setUtmCampaigns] = useState<string[]>([]);

  // Edit/Delete state
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [editForm, setEditForm] = useState({
    nome: '',
    telefone: '',
    especialidade: '',
    estado: '',
    crm: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLeads();
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const { data } = await supabase
        .from('leads')
        .select('estado, especialidade, utm_source, utm_campaign');
      
      if (data) {
        const uniqueEstados = [...new Set(data.map(l => l.estado))].filter(Boolean).sort();
        const uniqueEspecialidades = [...new Set(data.map(l => l.especialidade))].filter(Boolean).sort();
        const uniqueUtmSources = [...new Set(data.map(l => l.utm_source))].filter(Boolean).sort() as string[];
        const uniqueUtmCampaigns = [...new Set(data.map(l => l.utm_campaign))].filter(Boolean).sort() as string[];
        setEstados(uniqueEstados);
        setEspecialidades(uniqueEspecialidades);
        setUtmSources(uniqueUtmSources);
        setUtmCampaigns(uniqueUtmCampaigns);
      }
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`nome.ilike.%${searchTerm}%,telefone.ilike.%${searchTerm}%,crm.ilike.%${searchTerm}%,id.ilike.%${searchTerm}%`);
      }

      if (estadoFilter && estadoFilter !== 'all') {
        query = query.eq('estado', estadoFilter);
      }

      if (especialidadeFilter && especialidadeFilter !== 'all') {
        query = query.eq('especialidade', especialidadeFilter);
      }

      if (utmSourceFilter && utmSourceFilter !== 'all') {
        query = query.eq('utm_source', utmSourceFilter);
      }

      if (utmCampaignFilter && utmCampaignFilter !== 'all') {
        query = query.eq('utm_campaign', utmCampaignFilter);
      }

      if (dateFrom) {
        query = query.gte('created_at', dateFrom);
      }

      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setDate(toDate.getDate() + 1);
        query = query.lt('created_at', toDate.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Erro ao carregar leads');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setEstadoFilter('');
    setEspecialidadeFilter('');
    setUtmSourceFilter('');
    setUtmCampaignFilter('');
    setDateFrom('');
    setDateTo('');
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchLeads();
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, estadoFilter, especialidadeFilter, utmSourceFilter, utmCampaignFilter, dateFrom, dateTo]);


  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setEditForm({
      nome: lead.nome,
      telefone: lead.telefone,
      especialidade: lead.especialidade,
      estado: lead.estado,
      crm: lead.crm,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingLead) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('leads')
        .update({
          nome: editForm.nome,
          telefone: editForm.telefone,
          especialidade: editForm.especialidade,
          estado: editForm.estado,
          crm: editForm.crm,
        })
        .eq('id', editingLead.id);

      if (error) throw error;
      
      toast.success('Lead atualizado com sucesso!');
      setEditingLead(null);
      fetchLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Erro ao atualizar lead');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingLead) return;
    
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', deletingLead.id);

      if (error) throw error;
      
      toast.success('Lead removido com sucesso!');
      setDeletingLead(null);
      fetchLeads();
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error('Erro ao remover lead');
    }
  };

  const exportToCSV = async () => {
    setExporting(true);
    try {
      let query = supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`nome.ilike.%${searchTerm}%,telefone.ilike.%${searchTerm}%,crm.ilike.%${searchTerm}%`);
      }

      if (estadoFilter && estadoFilter !== 'all') {
        query = query.eq('estado', estadoFilter);
      }

      if (especialidadeFilter && especialidadeFilter !== 'all') {
        query = query.eq('especialidade', especialidadeFilter);
      }

      if (dateFrom) {
        query = query.gte('created_at', dateFrom);
      }

      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setDate(toDate.getDate() + 1);
        query = query.lt('created_at', toDate.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      if (!data || data.length === 0) {
        toast.error('Nenhum lead para exportar');
        return;
      }

      const headers = ['ID', 'Nome', 'Telefone', 'CRM', 'Especialidade', 'Estado', 'Data', 'Origem', 'Campanha', 'Conteúdo'];
      const rows = data.map(lead => [
        lead.id,
        lead.nome,
        lead.telefone,
        lead.crm,
        lead.especialidade,
        lead.estado,
        format(new Date(lead.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR }),
        lead.utm_source || '',
        lead.utm_campaign || '',
        lead.utm_content || '',
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `leads_glp1_${format(new Date(), 'yyyy-MM-dd')}.csv`;
      link.click();

      toast.success(`${data.length} leads exportados com sucesso!`);
    } catch (error) {
      console.error('Error exporting:', error);
      toast.error('Erro ao exportar leads');
    } finally {
      setExporting(false);
    }
  };

  return (
    <AdminLayout 
      title="Leads / CRM" 
      description="Gerencie e exporte os leads cadastrados"
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            <div className="space-y-2">
              <Label>Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nome, telefone, CRM ou ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Estado</Label>
              <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {estados.map(estado => (
                    <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Especialidade</Label>
              <Select value={especialidadeFilter} onValueChange={setEspecialidadeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {especialidades.map(esp => (
                    <SelectItem key={esp} value={esp}>{esp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Origem (UTM)</Label>
              <Select value={utmSourceFilter} onValueChange={setUtmSourceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {utmSources.map(source => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Campanha (UTM)</Label>
              <Select value={utmCampaignFilter} onValueChange={setUtmCampaignFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {utmCampaigns.map(campaign => (
                    <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Data Início</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Data Fim</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Limpar Filtros
            </Button>
            <Button variant="outline" size="sm" onClick={fetchLeads}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Atualizar
            </Button>
            <Button size="sm" onClick={exportToCSV} disabled={exporting}>
              {exporting ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-1" />
              )}
              Exportar CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Lista de Leads</span>
            <span className="text-sm font-normal text-muted-foreground">
              {leads.length} lead{leads.length !== 1 ? 's' : ''} encontrado{leads.length !== 1 ? 's' : ''}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum lead encontrado com os filtros selecionados.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>CRM</TableHead>
                    <TableHead>Especialidade</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Campanha</TableHead>
                    <TableHead>Conteúdo</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {lead.id.slice(0, 8)}...
                      </TableCell>
                      <TableCell className="font-medium">{lead.nome}</TableCell>
                      <TableCell>{lead.telefone}</TableCell>
                      <TableCell>{lead.crm}</TableCell>
                      <TableCell>{lead.especialidade}</TableCell>
                      <TableCell>{lead.estado}</TableCell>
                      <TableCell>
                        {format(new Date(lead.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        {lead.utm_source ? (
                          <span className="text-xs bg-muted px-2 py-1 rounded">
                            {lead.utm_source}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">Direto</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {lead.utm_campaign ? (
                          <span className="text-xs bg-muted px-2 py-1 rounded">
                            {lead.utm_campaign}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {lead.utm_content ? (
                          <span className="text-xs bg-muted px-2 py-1 rounded">
                            {lead.utm_content}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(lead)}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeletingLead(lead)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingLead} onOpenChange={(open) => !open && setEditingLead(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={editForm.nome}
                onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input
                value={editForm.telefone}
                onChange={(e) => setEditForm({ ...editForm, telefone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>CRM</Label>
              <Input
                value={editForm.crm}
                onChange={(e) => setEditForm({ ...editForm, crm: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Especialidade</Label>
              <Select
                value={editForm.especialidade}
                onValueChange={(value) => setEditForm({ ...editForm, especialidade: value })}
              >
                <SelectTrigger>
                  <SelectValue />
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
              <Label>Estado</Label>
              <Select
                value={editForm.estado}
                onValueChange={(value) => setEditForm({ ...editForm, estado: value })}
              >
                <SelectTrigger>
                  <SelectValue />
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingLead(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingLead} onOpenChange={(open) => !open && setDeletingLead(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Lead</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover o lead <strong>{deletingLead?.nome}</strong>? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
