import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, Database, TrendingUp, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    todayLeads: 0,
    weekLeads: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get total leads
      const { count: totalLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

      // Get today's leads
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: todayLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      // Get this week's leads
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const { count: weekLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekAgo.toISOString());

      // Get total users with roles
      const { count: totalUsers } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalLeads: totalLeads || 0,
        todayLeads: todayLeads || 0,
        weekLeads: weekLeads || 0,
        totalUsers: totalUsers || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total de Leads',
      value: stats.totalLeads,
      description: 'Leads cadastrados',
      icon: Database,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Leads Hoje',
      value: stats.todayLeads,
      description: 'Novos leads hoje',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Leads Esta Semana',
      value: stats.weekLeads,
      description: 'Últimos 7 dias',
      icon: Calendar,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Usuários',
      value: stats.totalUsers,
      description: 'Com acesso ao admin',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <AdminLayout 
      title="Dashboard" 
      description="Visão geral do sistema"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`h-8 w-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stat.value.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo à Central de Administração</CardTitle>
            <CardDescription>
              Gerencie leads, usuários e integrações do GLP-1 Effects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                <h3 className="font-semibold mb-1">Leads / CRM</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize, filtre e exporte os leads cadastrados na plataforma.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                <h3 className="font-semibold mb-1">Usuários</h3>
                <p className="text-sm text-muted-foreground">
                  Gerencie permissões e libere acesso para novos usuários.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                <h3 className="font-semibold mb-1">API & Integrações</h3>
                <p className="text-sm text-muted-foreground">
                  Configure integrações e acesse funcionalidades com IA.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
