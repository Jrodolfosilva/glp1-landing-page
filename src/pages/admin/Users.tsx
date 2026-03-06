import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { UserPlus, Trash2, Loader2, Shield, ShieldCheck, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface UserWithRole {
  id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'viewer';
  created_at: string;
  email?: string;
  full_name?: string;
}

export default function AdminUsers() {
  const { isAdmin, user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [profiles, setProfiles] = useState<Record<string, { email: string; full_name: string | null }>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // New user form
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'moderator' | 'viewer'>('viewer');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (rolesError) throw rolesError;

      // Fetch profiles for these users
      if (rolesData && rolesData.length > 0) {
        const userIds = rolesData.map(r => r.user_id);
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, email, full_name')
          .in('id', userIds);

        const profilesMap: Record<string, { email: string; full_name: string | null }> = {};
        profilesData?.forEach(p => {
          profilesMap[p.id] = { email: p.email, full_name: p.full_name };
        });
        setProfiles(profilesMap);
      }

      setUsers(rolesData || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const addUserRole = async () => {
    if (!newEmail.trim()) {
      toast.error('Digite um email válido');
      return;
    }

    setSaving(true);
    try {
      // Find user by email in profiles
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', newEmail.trim().toLowerCase())
        .single();

      if (profileError || !profile) {
        toast.error('Usuário não encontrado. O usuário precisa criar uma conta primeiro.');
        return;
      }

      // Check if user already has a role
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', profile.id)
        .single();

      if (existingRole) {
        toast.error('Este usuário já possui uma permissão');
        return;
      }

      // Add role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: profile.id,
          role: newRole,
        });

      if (insertError) throw insertError;

      toast.success('Permissão adicionada com sucesso!');
      setDialogOpen(false);
      setNewEmail('');
      setNewRole('viewer');
      fetchUsers();
    } catch (error) {
      console.error('Error adding role:', error);
      toast.error('Erro ao adicionar permissão');
    } finally {
      setSaving(false);
    }
  };

  const updateRole = async (userId: string, newRole: 'admin' | 'moderator' | 'viewer') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast.success('Permissão atualizada!');
      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Erro ao atualizar permissão');
    }
  };

  const removeRole = async (userId: string) => {
    if (userId === currentUser?.id) {
      toast.error('Você não pode remover sua própria permissão');
      return;
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      toast.success('Permissão removida!');
      fetchUsers();
    } catch (error) {
      console.error('Error removing role:', error);
      toast.error('Erro ao remover permissão');
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <ShieldCheck className="h-4 w-4 text-primary" />;
      case 'moderator':
        return <Shield className="h-4 w-4 text-blue-500" />;
      default:
        return <Eye className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'moderator':
        return 'Moderador';
      default:
        return 'Visualizador';
    }
  };

  if (!isAdmin) {
    return (
      <AdminLayout title="Usuários" description="Gerenciar acessos">
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Apenas administradores podem gerenciar usuários.
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Usuários" 
      description="Gerencie permissões e acessos ao sistema"
    >
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gerenciar Acessos</CardTitle>
            <CardDescription>
              Adicione ou remova usuários com acesso ao painel administrativo
            </CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Adicionar Usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Acesso</DialogTitle>
                <DialogDescription>
                  O usuário precisa ter criado uma conta antes de receber permissões.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email do Usuário</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="usuario@email.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Nível de Acesso</Label>
                  <Select value={newRole} onValueChange={(v) => setNewRole(v as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Visualizador - Apenas leitura
                        </div>
                      </SelectItem>
                      <SelectItem value="moderator">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Moderador - Leitura de leads
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4" />
                          Administrador - Acesso total
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={addUserRole} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Adicionar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum usuário com permissões cadastrado.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Permissão</TableHead>
                  <TableHead>Adicionado em</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((userRole) => {
                  const profile = profiles[userRole.user_id];
                  const isCurrentUser = userRole.user_id === currentUser?.id;
                  
                  return (
                    <TableRow key={userRole.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {profile?.full_name || 'Nome não informado'}
                            {isCurrentUser && (
                              <span className="ml-2 text-xs text-primary">(você)</span>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {profile?.email || 'Email não encontrado'}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={userRole.role} 
                          onValueChange={(v) => updateRole(userRole.user_id, v as any)}
                          disabled={isCurrentUser}
                        >
                          <SelectTrigger className="w-[180px]">
                            <div className="flex items-center gap-2">
                              {getRoleIcon(userRole.role)}
                              <SelectValue />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="viewer">Visualizador</SelectItem>
                            <SelectItem value="moderator">Moderador</SelectItem>
                            <SelectItem value="admin">Administrador</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {format(new Date(userRole.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeRole(userRole.user_id)}
                          disabled={isCurrentUser}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Níveis de Permissão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold">Visualizador</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Acesso somente leitura ao dashboard. Não pode ver leads ou gerenciar usuários.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Moderador</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Pode visualizar e exportar leads. Não pode gerenciar usuários ou excluir dados.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Administrador</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Acesso total ao sistema. Pode gerenciar leads, usuários e todas as configurações.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
