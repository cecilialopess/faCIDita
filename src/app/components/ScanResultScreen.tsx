import { useEffect, useState } from 'react';
import { CheckCircle2, ShieldCheck, Calendar, User, FileText, X } from 'lucide-react';

interface ScanResultScreenProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ScanResultScreen({ onConfirm, onCancel }: ScanResultScreenProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="size-full relative overflow-hidden flex items-end" style={{ backgroundColor: '#0A0E13' }}>
      {/* Faded captured doc background */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute left-1/2 top-1/3 w-72 h-96 rounded-md"
          style={{
            transform: 'translate(-50%, -50%) rotate(-2deg)',
            background: 'linear-gradient(180deg, #2a3340 0%, #1a2028 100%)',
          }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(10,14,19,0.6) 0%, rgba(10,14,19,0.95) 60%)' }}
      />

      {/* Top close */}
      <button
        onClick={onCancel}
        className="absolute top-5 right-5 z-20 rounded-full p-2.5"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#FFFFFF' }}
      >
        <X size={20} />
      </button>

      {/* Sliding result card */}
      <div
        className="relative z-10 w-full rounded-t-3xl p-6 transition-transform duration-500"
        style={{
          backgroundColor: '#262D36',
          transform: show ? 'translateY(0)' : 'translateY(100%)',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1 rounded-full" style={{ backgroundColor: '#3A4350' }} />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div
            className="rounded-full p-2 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(64, 216, 195, 0.15)' }}
          >
            <CheckCircle2 size={22} style={{ color: '#40D8C3' }} />
          </div>
          <div>
            <h2 className="text-xl" style={{ color: '#FFFFFF', fontWeight: 700 }}>
              Atestado lido com sucesso
            </h2>
            <p className="text-xs opacity-60" style={{ color: '#FFFFFF' }}>
              Confira os dados antes de confirmar
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-5 mb-4 border"
          style={{
            backgroundColor: '#1B222B',
            borderColor: 'rgba(64, 216, 195, 0.3)',
            borderWidth: '1px',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs opacity-60" style={{ color: '#FFFFFF' }}>
              CID Identificado
            </span>
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
              style={{ backgroundColor: 'rgba(64, 216, 195, 0.15)', color: '#40D8C3', fontWeight: 600 }}
            >
              <ShieldCheck size={12} />
              Autenticado
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span style={{ color: '#40D8C3', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>
              M54.5
            </span>
            <span className="opacity-80" style={{ color: '#FFFFFF' }}>
              Lombalgia
            </span>
          </div>

          <div className="mt-5 pt-5 border-t space-y-3" style={{ borderColor: '#3A4350' }}>
            <Row Icon={User} label="Profissional" value="Dr. Henrique Mota · CRM 84.221" />
            <Row Icon={Calendar} label="Período" value="29 Abr 2026 · 3 dias" />
            <Row Icon={FileText} label="Documento" value="Atestado médico (PDF)" />
          </div>
        </div>

        <button
          onClick={onConfirm}
          className="w-full py-3.5 rounded-xl transition-all hover:opacity-90 shadow-lg"
          style={{
            backgroundColor: '#40D8C3',
            color: '#000000',
            fontWeight: 700,
            letterSpacing: '0.5px',
          }}
        >
          CONFIRMAR ENVIO
        </button>

        <button
          onClick={onCancel}
          className="w-full py-3 mt-2 text-sm transition-opacity hover:opacity-100"
          style={{ color: '#40D8C3', opacity: 0.6 }}
        >
          Escanear novamente
        </button>
      </div>
    </div>
  );
}

function Row({ Icon, label, value }: { Icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} style={{ color: '#40D8C3', opacity: 0.7, marginTop: 2 }} />
      <div className="flex-1">
        <p className="text-xs opacity-60" style={{ color: '#FFFFFF' }}>
          {label}
        </p>
        <p className="text-sm" style={{ color: '#FFFFFF' }}>
          {value}
        </p>
      </div>
    </div>
  );
}
