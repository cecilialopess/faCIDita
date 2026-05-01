import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileCheck2,
  Bell,
  Settings,
  LogOut,
  Search,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { Logo } from './Logo';

interface ManagerPortalScreenProps {
  onLogout: () => void;
  onBack?: () => void;
}

const returns = [
  { name: 'Marina Costa', role: 'Eng. Software', date: '02 Mai 2026', status: 'Confirmado', cid: 'M54.5' },
  { name: 'Rafael Souza', role: 'Eng. QA', date: '03 Mai 2026', status: 'Aguardando', cid: 'J06.9' },
  { name: 'Beatriz Almeida', role: 'Designer', date: '05 Mai 2026', status: 'Confirmado', cid: 'F41.1' },
  { name: 'Carlos Mendes', role: 'PM', date: '06 Mai 2026', status: 'Em risco', cid: 'M75.1' },
  { name: 'Helena Vieira', role: 'Eng. Software', date: '08 Mai 2026', status: 'Confirmado', cid: 'G43.9' },
  { name: 'Tiago Pereira', role: 'Eng. Backend', date: '10 Mai 2026', status: 'Aguardando', cid: 'A09' },
];

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { color: string; bg: string; Icon: typeof CheckCircle2 }> = {
    Confirmado: { color: '#40D8C3', bg: 'rgba(64, 216, 195, 0.15)', Icon: CheckCircle2 },
    Aguardando: { color: '#E9C46A', bg: 'rgba(233, 196, 106, 0.15)', Icon: Clock },
    'Em risco': { color: '#FF7A7A', bg: 'rgba(255, 122, 122, 0.15)', Icon: AlertCircle },
  };
  const cfg = map[status] ?? map.Confirmado;
  const { Icon } = cfg;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
      style={{ backgroundColor: cfg.bg, color: cfg.color, fontWeight: 600 }}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

export function ManagerPortalScreen({ onLogout, onBack }: ManagerPortalScreenProps) {
  return (
    <div className="size-full flex overflow-hidden" style={{ backgroundColor: '#1B222B' }}>
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-16 shrink-0 border-r items-center py-5 gap-2"
        style={{ backgroundColor: '#161B22', borderColor: '#2A323E' }}
      >
        <div className="mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'rgba(64, 216, 195, 0.12)' }}
          >
            <span style={{ color: '#40D8C3', fontWeight: 800 }}>fC</span>
          </div>
        </div>
        {[
          { Icon: LayoutDashboard, active: true },
          { Icon: Users },
          { Icon: CalendarDays },
          { Icon: FileCheck2 },
          { Icon: Bell },
          { Icon: Settings },
        ].map(({ Icon, active }, i) => (
          <button
            key={i}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            style={{
              backgroundColor: active ? 'rgba(64, 216, 195, 0.12)' : 'transparent',
              color: active ? '#40D8C3' : '#8B95A5',
            }}
          >
            <Icon size={18} />
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={onLogout}
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ color: '#8B95A5' }}
        >
          <LogOut size={18} />
        </button>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="flex items-center justify-between px-8 py-5 border-b shrink-0"
          style={{ borderColor: '#2A323E' }}
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
                Time · Engenharia de Produto
              </p>
              <h1 className="text-2xl mt-0.5" style={{ color: '#FFFFFF', fontWeight: 700 }}>
                Portal do Gestor
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ backgroundColor: '#262D36' }}
            >
              <Search size={16} style={{ color: '#8B95A5' }} />
              <input
                placeholder="Buscar colaborador..."
                className="bg-transparent outline-none text-sm w-56"
                style={{ color: '#FFFFFF' }}
              />
            </div>
            <Logo size="sm" />
          </div>
        </header>

        <div className="flex-1 overflow-auto px-8 py-6">
          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <MetricCard
              big="92%"
              label="Equipe Ativa"
              hint="22 de 24 colaboradores"
              trend="+2%"
              up
            />
            <MetricCard
              big="6"
              label="Atestados Ativos"
              hint="2 vencem esta semana"
              trend="-1"
              down
            />
            <MetricCard
              big="3.4"
              label="Dias médios de afastamento"
              hint="Últimos 30 dias"
              trend="-0.6"
              down
            />
          </div>

          {/* Returns table */}
          <section
            className="rounded-2xl"
            style={{ backgroundColor: '#262D36' }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <div>
                <h2 className="text-lg" style={{ color: '#FFFFFF', fontWeight: 700 }}>
                  Próximos Retornos
                </h2>
                <p className="text-xs mt-0.5 opacity-60" style={{ color: '#FFFFFF' }}>
                  Colaboradores com previsão de retorno nas próximas 2 semanas
                </p>
              </div>
              <button
                className="text-xs px-3 py-2 rounded-lg"
                style={{ color: '#40D8C3', backgroundColor: 'rgba(64, 216, 195, 0.1)', fontWeight: 600 }}
              >
                Ver agenda completa
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {['Colaborador', 'CID', 'Data', 'Status', ''].map((h) => (
                      <th
                        key={h}
                        className="text-left px-6 py-3 text-xs uppercase tracking-wider"
                        style={{
                          color: '#8B95A5',
                          fontWeight: 600,
                          borderTop: '1px solid rgba(255,255,255,0.04)',
                          borderBottom: '1px solid rgba(255,255,255,0.04)',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {returns.map((r, i) => (
                    <tr
                      key={r.name}
                      style={{
                        borderBottom:
                          i === returns.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.04)',
                      }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-xs"
                            style={{
                              backgroundColor: 'rgba(64, 216, 195, 0.15)',
                              color: '#40D8C3',
                              fontWeight: 700,
                            }}
                          >
                            {r.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                          </div>
                          <div>
                            <p style={{ color: '#FFFFFF', fontWeight: 500 }}>{r.name}</p>
                            <p className="text-xs opacity-60" style={{ color: '#FFFFFF' }}>
                              {r.role}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: 'rgba(64, 216, 195, 0.12)',
                            color: '#40D8C3',
                            fontWeight: 600,
                          }}
                        >
                          {r.cid}
                        </span>
                      </td>
                      <td className="px-6 py-4" style={{ color: '#FFFFFF' }}>
                        {r.date}
                      </td>
                      <td className="px-6 py-4">
                        <StatusPill status={r.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="text-xs px-3 py-1.5 rounded-lg"
                          style={{
                            border: '1px solid rgba(64, 216, 195, 0.4)',
                            color: '#40D8C3',
                            fontWeight: 600,
                          }}
                        >
                          Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function MetricCard({
  big,
  label,
  hint,
  trend,
  up,
  down,
}: {
  big: string;
  label: string;
  hint: string;
  trend: string;
  up?: boolean;
  down?: boolean;
}) {
  const trendColor = up ? '#40D8C3' : down ? '#FF7A7A' : '#8B95A5';
  return (
    <div className="rounded-2xl p-6" style={{ backgroundColor: '#262D36' }}>
      <div className="flex items-baseline justify-between">
        <span
          style={{
            color: '#40D8C3',
            fontSize: '2.75rem',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {big}
        </span>
        <span
          className="flex items-center gap-1 text-xs"
          style={{ color: trendColor, fontWeight: 600 }}
        >
          {up && <TrendingUp size={12} />}
          {down && <TrendingDown size={12} />}
          {trend}
        </span>
      </div>
      <p className="mt-4" style={{ color: '#FFFFFF', fontWeight: 600 }}>
        {label}
      </p>
      <p className="text-xs mt-1 opacity-60" style={{ color: '#FFFFFF' }}>
        {hint}
      </p>
    </div>
  );
}
