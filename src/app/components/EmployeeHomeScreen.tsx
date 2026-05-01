import { ScanLine, Bell, FileCheck2, Clock, ChevronRight, LogOut } from 'lucide-react';
import { Logo } from './Logo';
import { BackgroundGlow } from './BackgroundGlow';

interface EmployeeHomeScreenProps {
  onScan: () => void;
  onLogout: () => void;
}

const recent = [
  { id: 1, cid: 'J00', label: 'Resfriado comum', date: '28 Abr 2026', status: 'Aprovado' },
  { id: 2, cid: 'M54.5', label: 'Lombalgia', date: '12 Abr 2026', status: 'Aprovado' },
];

export function EmployeeHomeScreen({ onScan, onLogout }: EmployeeHomeScreenProps) {
  return (
    <div className="size-full relative overflow-auto" style={{ backgroundColor: '#1B222B' }}>
      <BackgroundGlow />

      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-8">
        <header className="flex items-center justify-between mb-8">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <button
              className="rounded-full p-2 transition-colors"
              style={{ backgroundColor: '#262D36', color: '#40D8C3' }}
            >
              <Bell size={18} />
            </button>
            <button
              onClick={onLogout}
              className="rounded-full p-2 transition-colors"
              style={{ backgroundColor: '#262D36', color: '#40D8C3' }}
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <div className="mb-8">
          <p className="text-sm opacity-60" style={{ color: '#FFFFFF' }}>
            Olá, Marina 👋
          </p>
          <h2 className="text-2xl mt-1" style={{ color: '#FFFFFF' }}>
            Pronta para escanear seu próximo atestado?
          </h2>
        </div>

        <button
          onClick={onScan}
          className="w-full rounded-2xl p-6 mb-8 transition-all hover:opacity-90 relative overflow-hidden"
          style={{
            backgroundColor: '#40D8C3',
            color: '#000000',
            boxShadow: '0 0 40px rgba(64, 216, 195, 0.35)',
          }}
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <path d="M 10 10 L 10 25 M 10 10 L 25 10" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              <path d="M 190 10 L 190 25 M 190 10 L 175 10" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              <path d="M 10 90 L 10 75 M 10 90 L 25 90" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              <path d="M 190 90 L 190 75 M 190 90 L 175 90" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="relative flex items-center justify-center gap-3">
            <ScanLine size={24} />
            <span style={{ fontWeight: 700, letterSpacing: '0.5px' }}>SCANEAR NOVO ATESTADO</span>
          </div>
        </button>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="rounded-2xl p-4" style={{ backgroundColor: '#262D36' }}>
            <FileCheck2 size={20} style={{ color: '#40D8C3' }} />
            <p className="text-2xl mt-3" style={{ color: '#FFFFFF', fontWeight: 700 }}>
              12
            </p>
            <p className="text-xs opacity-60" style={{ color: '#FFFFFF' }}>
              Atestados aprovados
            </p>
          </div>
          <div className="rounded-2xl p-4" style={{ backgroundColor: '#262D36' }}>
            <Clock size={20} style={{ color: '#40D8C3' }} />
            <p className="text-2xl mt-3" style={{ color: '#FFFFFF', fontWeight: 700 }}>
              1
            </p>
            <p className="text-xs opacity-60" style={{ color: '#FFFFFF' }}>
              Em análise
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ color: '#FFFFFF', fontWeight: 600 }}>Histórico recente</h3>
            <a href="#" className="text-sm" style={{ color: '#40D8C3', opacity: 0.6 }}>
              Ver tudo
            </a>
          </div>
          <div className="space-y-2">
            {recent.map((item) => (
              <div
                key={item.id}
                className="rounded-xl p-4 flex items-center justify-between"
                style={{ backgroundColor: '#262D36' }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ backgroundColor: 'rgba(64, 216, 195, 0.15)', color: '#40D8C3', fontWeight: 600 }}
                    >
                      CID {item.cid}
                    </span>
                    <span style={{ color: '#FFFFFF', fontWeight: 500 }}>{item.label}</span>
                  </div>
                  <p className="text-xs mt-1 opacity-60" style={{ color: '#FFFFFF' }}>
                    {item.date} · {item.status}
                  </p>
                </div>
                <ChevronRight size={18} style={{ color: '#8B95A5' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
