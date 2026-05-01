import { useMemo, useState } from 'react';
import {
  Search,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  TrendingDown,
  Users,
  FileCheck2,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  ChevronDown,
  ArrowLeft,
  Activity,
  PieChart as PieIcon,
  BarChart3,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { Logo } from './Logo';

interface HRDashboardScreenProps {
  onLogout: () => void;
  onAudit?: () => void;
  onBack?: () => void;
}

type Department = {
  id: string;
  name: string;
  total: number;
  trend: number;
  cases: { cid: string; label: string; count: number }[];
};

const departments: Department[] = [
  {
    id: 'tech',
    name: 'Tecnologia',
    total: 47,
    trend: -8,
    cases: [
      { cid: 'M54.5', label: 'Lombalgia', count: 12 },
      { cid: 'F41.1', label: 'Ansiedade generalizada', count: 9 },
      { cid: 'H53.1', label: 'Distúrbios visuais', count: 7 },
      { cid: 'G43.9', label: 'Enxaqueca', count: 6 },
      { cid: 'M65.4', label: 'Tenossinovite', count: 5 },
      { cid: 'J00', label: 'Resfriado comum', count: 4 },
      { cid: 'F32.0', label: 'Episódio depressivo leve', count: 4 },
    ],
  },
  {
    id: 'commercial',
    name: 'Comercial',
    total: 39,
    trend: 4,
    cases: [
      { cid: 'J06.9', label: 'Infecção respiratória', count: 11 },
      { cid: 'F41.1', label: 'Ansiedade generalizada', count: 8 },
      { cid: 'M54.5', label: 'Lombalgia', count: 6 },
      { cid: 'A09', label: 'Gastroenterite', count: 5 },
      { cid: 'G43.9', label: 'Enxaqueca', count: 5 },
      { cid: 'R51', label: 'Cefaleia', count: 4 },
    ],
  },
  {
    id: 'operations',
    name: 'Operações',
    total: 62,
    trend: 12,
    cases: [
      { cid: 'M54.5', label: 'Lombalgia', count: 18 },
      { cid: 'M75.1', label: 'Síndrome do manguito', count: 11 },
      { cid: 'S93.4', label: 'Entorse de tornozelo', count: 9 },
      { cid: 'M65.4', label: 'Tenossinovite', count: 8 },
      { cid: 'J06.9', label: 'Infecção respiratória', count: 7 },
      { cid: 'A09', label: 'Gastroenterite', count: 5 },
      { cid: 'R10.4', label: 'Dor abdominal', count: 4 },
    ],
  },
  {
    id: 'admin',
    name: 'Administrativo',
    total: 24,
    trend: -3,
    cases: [
      { cid: 'F41.1', label: 'Ansiedade generalizada', count: 7 },
      { cid: 'J00', label: 'Resfriado comum', count: 5 },
      { cid: 'M54.5', label: 'Lombalgia', count: 4 },
      { cid: 'H53.1', label: 'Distúrbios visuais', count: 4 },
      { cid: 'R51', label: 'Cefaleia', count: 4 },
    ],
  },
];

const trendData = [
  { mes: 'Nov', atestados: 128, retornos: 102 },
  { mes: 'Dez', atestados: 142, retornos: 118 },
  { mes: 'Jan', atestados: 156, retornos: 124 },
  { mes: 'Fev', atestados: 138, retornos: 130 },
  { mes: 'Mar', atestados: 165, retornos: 140 },
  { mes: 'Abr', atestados: 172, retornos: 151 },
];

const categoryData = [
  { name: 'Musculoesquelético', value: 64, fill: '#40D8C3' },
  { name: 'Saúde mental', value: 38, fill: '#7BE5D4' },
  { name: 'Respiratório', value: 31, fill: '#9DD68A' },
  { name: 'Gastrointestinal', value: 18, fill: '#E9C46A' },
  { name: 'Outros', value: 21, fill: '#5B6472' },
];

const heatmapDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
const heatmap = [
  [3, 5, 4, 7, 9],
  [4, 6, 5, 8, 12],
  [2, 4, 3, 6, 7],
  [5, 7, 6, 9, 11],
];

const periods = ['7 dias', '30 dias', '90 dias', 'Ano'];

export function HRDashboardScreen({ onLogout, onAudit, onBack }: HRDashboardScreenProps) {
  const [period, setPeriod] = useState('30 dias');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return departments;
    const q = query.toLowerCase();
    return departments.map((d) => ({
      ...d,
      cases: d.cases.filter(
        (c) => c.cid.toLowerCase().includes(q) || c.label.toLowerCase().includes(q),
      ),
    }));
  }, [query]);

  const totals = useMemo(() => {
    const total = departments.reduce((acc, d) => acc + d.total, 0);
    const top = departments.reduce((a, b) => (b.total > a.total ? b : a));
    return { total, topDept: top.name, topCount: top.total };
  }, []);

  const deptBars = departments.map((d) => ({ name: d.name, casos: d.total }));

  const topCids = useMemo(() => {
    const map = new Map<string, { cid: string; label: string; count: number }>();
    departments.forEach((d) =>
      d.cases.forEach((c) => {
        const cur = map.get(c.cid);
        map.set(c.cid, {
          cid: c.cid,
          label: c.label,
          count: (cur?.count ?? 0) + c.count,
        });
      }),
    );
    return [...map.values()].sort((a, b) => b.count - a.count).slice(0, 6);
  }, []);

  const absenteeismRate = 7.4;

  return (
    <div className="size-full flex overflow-hidden" style={{ backgroundColor: '#1B222B' }}>
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-60 shrink-0 border-r"
        style={{ backgroundColor: '#1A2028', borderColor: '#2A323E' }}
      >
        <div className="px-6 py-6 border-b" style={{ borderColor: '#2A323E' }}>
          <Logo size="sm" />
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {[
            { label: 'Diagnóstico', active: true },
            { label: 'Atestados' },
            { label: 'Colaboradores' },
            { label: 'Departamentos' },
            { label: 'Relatórios' },
            { label: 'Integrações' },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors"
              style={{
                backgroundColor: item.active ? 'rgba(64, 216, 195, 0.1)' : 'transparent',
                color: item.active ? '#40D8C3' : '#8B95A5',
                fontWeight: item.active ? 600 : 500,
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t" style={{ borderColor: '#2A323E' }}>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors"
            style={{ color: '#8B95A5' }}
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="flex items-center justify-between px-8 py-5 border-b shrink-0"
          style={{ borderColor: '#2A323E', backgroundColor: '#1B222B' }}
        >
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-colors"
                style={{
                  backgroundColor: '#262D36',
                  color: '#40D8C3',
                  fontWeight: 600,
                }}
                aria-label="Trocar perfil"
              >
                <ArrowLeft size={14} />
                Trocar perfil
              </button>
            )}
            <div>
              <p className="text-xs opacity-60" style={{ color: '#FFFFFF' }}>
                Visão geral · Empresa Demo
              </p>
              <h1 className="text-2xl mt-0.5" style={{ color: '#FFFFFF', fontWeight: 700 }}>
                Diagnóstico da Empresa
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg border"
              style={{ backgroundColor: '#262D36', borderColor: '#2A323E', borderWidth: '1px' }}
            >
              <Search size={16} style={{ color: '#8B95A5' }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar CID ou diagnóstico..."
                className="bg-transparent outline-none text-sm w-64"
                style={{ color: '#FFFFFF' }}
              />
            </div>

            <button
              className="rounded-lg p-2.5"
              style={{ backgroundColor: '#262D36', color: '#40D8C3' }}
            >
              <Bell size={18} />
            </button>
            <button
              className="rounded-lg p-2.5"
              style={{ backgroundColor: '#262D36', color: '#40D8C3' }}
            >
              <Settings size={18} />
            </button>
            <div
              className="flex items-center gap-2.5 pl-3 pr-3 py-1.5 rounded-full"
              style={{ backgroundColor: '#262D36' }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#40D8C3', color: '#000', fontWeight: 700 }}
              >
                AR
              </div>
              <div className="hidden sm:block">
                <p className="text-xs" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                  Ana Ribeiro
                </p>
                <p className="text-xs opacity-60" style={{ color: '#FFFFFF' }}>
                  Gerente de RH
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <div
          className="flex items-center justify-between px-8 py-4 border-b shrink-0 flex-wrap gap-3"
          style={{ borderColor: '#2A323E' }}
        >
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1 p-1 rounded-lg"
              style={{ backgroundColor: '#262D36' }}
            >
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className="px-3 py-1.5 rounded-md text-xs transition-colors"
                  style={{
                    backgroundColor: period === p ? '#40D8C3' : 'transparent',
                    color: period === p ? '#000' : '#8B95A5',
                    fontWeight: period === p ? 700 : 500,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
              style={{ backgroundColor: '#262D36', color: '#FFFFFF' }}
            >
              <Calendar size={14} style={{ color: '#40D8C3' }} />
              Abr 2026
              <ChevronDown size={14} />
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
              style={{ backgroundColor: '#262D36', color: '#FFFFFF' }}
            >
              <Filter size={14} style={{ color: '#40D8C3' }} />
              Filtros
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onAudit}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-opacity hover:opacity-90"
              style={{
                border: '1px solid rgba(64, 216, 195, 0.4)',
                color: '#40D8C3',
                fontWeight: 600,
              }}
            >
              Auditar documento
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'rgba(64, 216, 195, 0.15)', color: '#40D8C3', fontWeight: 600 }}
            >
              <Download size={14} />
              Exportar relatório
            </button>
          </div>
        </div>

        {/* Content scroll */}
        <div className="flex-1 overflow-auto px-8 py-6">
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KpiCard
              label="Total de atestados"
              value={String(totals.total)}
              delta="+6%"
              up
              Icon={FileCheck2}
              spark={trendData.map((t) => t.atestados)}
            />
            <KpiCard
              label="Colaboradores afastados"
              value="118"
              delta="+12"
              up
              Icon={Users}
              spark={[80, 92, 100, 95, 110, 118]}
            />
            <KpiCard
              label="Departamento crítico"
              value={totals.topDept}
              delta={`${totals.topCount} casos`}
              Icon={AlertTriangle}
              accent
            />
            <KpiCard
              label="Tempo médio de afastamento"
              value="3.2 dias"
              delta="-0.4"
              down
              Icon={TrendingDown}
              spark={[4.1, 3.9, 3.8, 3.6, 3.4, 3.2]}
            />
          </div>

          {/* Charts row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            {/* Trend area chart */}
            <div
              className="rounded-2xl p-5 lg:col-span-2"
              style={{ backgroundColor: '#262D36' }}
            >
              <ChartHeader
                Icon={Activity}
                title="Evolução de atestados"
                subtitle="Atestados emitidos vs. retornos confirmados"
                badge="+11% no mês"
              />
              <div className="h-64 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradAt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#40D8C3" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#40D8C3" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradRt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9DD68A" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#9DD68A" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="mes" stroke="#8B95A5" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#8B95A5" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1B222B',
                        border: '1px solid #2A323E',
                        borderRadius: 8,
                        color: '#FFFFFF',
                        fontSize: 12,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11, color: '#8B95A5' }} />
                    <Area
                      type="monotone"
                      dataKey="atestados"
                      name="Atestados"
                      stroke="#40D8C3"
                      strokeWidth={2}
                      fill="url(#gradAt)"
                    />
                    <Area
                      type="monotone"
                      dataKey="retornos"
                      name="Retornos"
                      stroke="#9DD68A"
                      strokeWidth={2}
                      fill="url(#gradRt)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Absenteeism gauge */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#262D36' }}>
              <ChartHeader
                Icon={PieIcon}
                title="Taxa de absenteísmo"
                subtitle="Meta da empresa: < 5%"
              />
              <div className="h-48 relative mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="65%"
                    outerRadius="100%"
                    data={[{ name: 'Taxa', value: absenteeismRate, fill: '#40D8C3' }]}
                    startAngle={210}
                    endAngle={-30}
                  >
                    <RadialBar background={{ fill: '#1B222B' }} dataKey="value" cornerRadius={20} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span style={{ color: '#40D8C3', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>
                    {absenteeismRate}%
                  </span>
                  <span className="text-xs mt-1 opacity-60" style={{ color: '#FFFFFF' }}>
                    abr/2026
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs">
                <span style={{ color: '#8B95A5' }}>Meta</span>
                <span style={{ color: '#FF7A7A', fontWeight: 600 }}>
                  +2,4 p.p. acima
                </span>
              </div>
            </div>
          </div>

          {/* Charts row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            {/* Department bars */}
            <div className="rounded-2xl p-5 lg:col-span-2" style={{ backgroundColor: '#262D36' }}>
              <ChartHeader
                Icon={BarChart3}
                title="Atestados por departamento"
                subtitle="Distribuição no período selecionado"
              />
              <div className="h-60 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptBars} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="name" stroke="#8B95A5" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#8B95A5" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      cursor={{ fill: 'rgba(64,216,195,0.06)' }}
                      contentStyle={{
                        backgroundColor: '#1B222B',
                        border: '1px solid #2A323E',
                        borderRadius: 8,
                        color: '#FFFFFF',
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="casos" name="Casos" radius={[8, 8, 0, 0]}>
                      {deptBars.map((_, i) => (
                        <Cell
                          key={i}
                          fill={i === 2 ? '#40D8C3' : 'rgba(64, 216, 195, 0.45)'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donut categories */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#262D36' }}>
              <ChartHeader
                Icon={PieIcon}
                title="Categorias clínicas"
                subtitle="Agrupamento por tipo de CID"
              />
              <div className="h-44 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      innerRadius="60%"
                      outerRadius="90%"
                      paddingAngle={2}
                      stroke="none"
                    >
                      {categoryData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1B222B',
                        border: '1px solid #2A323E',
                        borderRadius: 8,
                        color: '#FFFFFF',
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 mt-2">
                {categoryData.map((c) => (
                  <div key={c.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: c.fill }}
                      />
                      <span style={{ color: '#FFFFFF' }}>{c.name}</span>
                    </div>
                    <span style={{ color: '#8B95A5', fontWeight: 600 }}>{c.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
            {/* Top CIDs ranking */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#262D36' }}>
              <ChartHeader
                Icon={BarChart3}
                title="Top 6 CIDs"
                subtitle="Maior incidência no período"
              />
              <div className="space-y-3 mt-4">
                {topCids.map((c, i) => {
                  const max = topCids[0].count;
                  const pct = (c.count / max) * 100;
                  return (
                    <div key={c.cid}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="text-xs px-1.5 py-0.5 rounded shrink-0"
                            style={{
                              backgroundColor: 'rgba(64, 216, 195, 0.15)',
                              color: '#40D8C3',
                              fontWeight: 700,
                            }}
                          >
                            #{i + 1}
                          </span>
                          <span className="text-sm truncate" style={{ color: '#FFFFFF' }}>
                            {c.label}
                          </span>
                        </div>
                        <span className="text-xs shrink-0 ml-2" style={{ color: '#40D8C3', fontWeight: 700 }}>
                          {c.count}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#1B222B' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background: 'linear-gradient(90deg, #40D8C3, #7BE5D4)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Heatmap */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#262D36' }}>
              <ChartHeader
                Icon={Calendar}
                title="Mapa de calor semanal"
                subtitle="Concentração de atestados por dia"
              />
              <div className="mt-4 space-y-1.5">
                {heatmap.map((row, ri) => (
                  <div key={ri} className="flex items-center gap-2">
                    <span className="text-xs w-10" style={{ color: '#8B95A5' }}>
                      Sem {ri + 1}
                    </span>
                    <div className="flex-1 grid grid-cols-5 gap-1.5">
                      {row.map((v, ci) => {
                        const intensity = Math.min(1, v / 12);
                        return (
                          <div
                            key={ci}
                            className="aspect-square rounded-md flex items-center justify-center text-xs"
                            style={{
                              backgroundColor: `rgba(64, 216, 195, ${0.1 + intensity * 0.7})`,
                              color: intensity > 0.5 ? '#000' : '#FFFFFF',
                              fontWeight: 600,
                            }}
                          >
                            {v}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-end gap-2 mt-3 pl-12">
                  {heatmapDays.map((d) => (
                    <span key={d} className="flex-1 text-center text-xs" style={{ color: '#8B95A5' }}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sparkline / mini line */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#262D36' }}>
              <ChartHeader
                Icon={Activity}
                title="Tendência diária"
                subtitle="Últimos 14 dias"
                badge="↗ tendência alta"
              />
              <div className="h-44 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={Array.from({ length: 14 }, (_, i) => ({
                      d: i + 1,
                      v: 4 + Math.round(Math.sin(i / 2) * 3 + i * 0.4),
                    }))}
                  >
                    <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="d" stroke="#8B95A5" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1B222B',
                        border: '1px solid #2A323E',
                        borderRadius: 8,
                        color: '#FFFFFF',
                        fontSize: 12,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke="#40D8C3"
                      strokeWidth={2.5}
                      dot={{ fill: '#40D8C3', r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Mini label="Média" value="6,2" />
                <Mini label="Pico" value="11" accent />
                <Mini label="Mín" value="2" />
              </div>
            </div>
          </div>

          {/* Kanban */}
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg" style={{ color: '#FFFFFF', fontWeight: 700 }}>
                Diagnósticos por departamento
              </h2>
              <p className="text-xs mt-0.5 opacity-60" style={{ color: '#FFFFFF' }}>
                Lista detalhada de CIDs em cada setor
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {filtered.map((dept) => (
              <DepartmentColumn key={dept.id} dept={dept} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function ChartHeader({
  Icon,
  title,
  subtitle,
  badge,
}: {
  Icon: typeof Activity;
  title: string;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-start gap-3">
        <div
          className="rounded-lg p-2"
          style={{ backgroundColor: 'rgba(64, 216, 195, 0.12)' }}
        >
          <Icon size={16} style={{ color: '#40D8C3' }} />
        </div>
        <div>
          <h3 className="text-sm" style={{ color: '#FFFFFF', fontWeight: 700 }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs opacity-60 mt-0.5" style={{ color: '#FFFFFF' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {badge && (
        <span
          className="text-xs px-2 py-1 rounded-full"
          style={{
            backgroundColor: 'rgba(64, 216, 195, 0.15)',
            color: '#40D8C3',
            fontWeight: 600,
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

function Mini({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg p-2 text-center" style={{ backgroundColor: '#1B222B' }}>
      <p className="text-xs opacity-60" style={{ color: '#FFFFFF' }}>
        {label}
      </p>
      <p
        className="text-sm mt-0.5"
        style={{ color: accent ? '#40D8C3' : '#FFFFFF', fontWeight: 700 }}
      >
        {value}
      </p>
    </div>
  );
}

function KpiCard({
  label,
  value,
  delta,
  up,
  down,
  Icon,
  accent,
  spark,
}: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
  down?: boolean;
  Icon: typeof Users;
  accent?: boolean;
  spark?: number[];
}) {
  const trendColor = up ? '#40D8C3' : down ? '#FF7A7A' : '#8B95A5';
  return (
    <div
      className="rounded-2xl p-5 border relative overflow-hidden"
      style={{
        backgroundColor: '#262D36',
        borderColor: accent ? 'rgba(64, 216, 195, 0.4)' : '#2A323E',
        borderWidth: '1px',
        boxShadow: accent ? '0 0 24px rgba(64, 216, 195, 0.12)' : 'none',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs opacity-60" style={{ color: '#FFFFFF' }}>
          {label}
        </span>
        <div
          className="rounded-lg p-1.5"
          style={{ backgroundColor: 'rgba(64, 216, 195, 0.12)' }}
        >
          <Icon size={14} style={{ color: '#40D8C3' }} />
        </div>
      </div>
      <p className="text-2xl" style={{ color: '#FFFFFF', fontWeight: 700 }}>
        {value}
      </p>
      <div className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: trendColor }}>
        {up && <TrendingUp size={12} />}
        {down && <TrendingDown size={12} />}
        <span style={{ fontWeight: 600 }}>{delta}</span>
        <span className="opacity-60" style={{ color: '#FFFFFF' }}>
          vs. período anterior
        </span>
      </div>

      {spark && (
        <div className="absolute right-3 bottom-2 h-10 w-24 opacity-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spark.map((v, i) => ({ i, v }))}>
              <Line
                type="monotone"
                dataKey="v"
                stroke="#40D8C3"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function DepartmentColumn({ dept }: { dept: Department }) {
  const trendUp = dept.trend > 0;
  return (
    <div
      className="rounded-2xl p-4 flex flex-col"
      style={{ backgroundColor: '#1A2028', minHeight: 0 }}
    >
      <div className="px-2 mb-4">
        <div className="flex items-baseline justify-between">
          <h3
            className="pb-2 inline-block"
            style={{
              color: '#FFFFFF',
              fontWeight: 700,
              borderBottom: '2px solid #40D8C3',
            }}
          >
            {dept.name}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className="text-xs flex items-center gap-1"
              style={{ color: trendUp ? '#FF7A7A' : '#40D8C3', fontWeight: 600 }}
            >
              {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {Math.abs(dept.trend)}%
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs opacity-60" style={{ color: '#FFFFFF' }}>
            {dept.cases.length} CIDs distintos
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: '#262D36', color: '#FFFFFF', fontWeight: 600 }}
          >
            {dept.total} total
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        {dept.cases.length === 0 && (
          <div
            className="text-center text-xs py-6 rounded-lg opacity-60"
            style={{ color: '#FFFFFF', backgroundColor: '#262D36' }}
          >
            Nenhum resultado
          </div>
        )}
        {dept.cases.map((c) => (
          <DiseaseCard key={c.cid} cid={c.cid} label={c.label} count={c.count} total={dept.total} />
        ))}
      </div>
    </div>
  );
}

function DiseaseCard({
  cid,
  label,
  count,
  total,
}: {
  cid: string;
  label: string;
  count: number;
  total: number;
}) {
  const pct = Math.round((count / total) * 100);
  return (
    <div
      className="rounded-xl p-3 transition-colors hover:opacity-95 cursor-pointer border"
      style={{
        backgroundColor: '#262D36',
        borderColor: '#2A323E',
        borderWidth: '1px',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm truncate" style={{ color: '#FFFFFF', fontWeight: 500 }}>
            {label}
          </p>
          <p className="text-xs opacity-60 mt-0.5" style={{ color: '#FFFFFF' }}>
            CID {cid}
          </p>
        </div>
        <div
          className="px-2.5 py-1 rounded-full shrink-0"
          style={{ backgroundColor: '#40D8C3', color: '#000', fontWeight: 700, fontSize: '11px' }}
        >
          {count} casos
        </div>
      </div>
      <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#1B222B' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #40D8C3, #7BE5D4)',
          }}
        />
      </div>
    </div>
  );
}
