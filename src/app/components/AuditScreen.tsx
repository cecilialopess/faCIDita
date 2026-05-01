import { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Camera,
} from 'lucide-react';
import { Logo } from './Logo';

interface AuditScreenProps {
  onBack: () => void;
}

interface FieldRow {
  id: string;
  label: string;
  value: string;
  confidence: number;
}

const initialFields: FieldRow[] = [
  { id: 'name', label: 'Nome do colaborador', value: 'Marina Costa Pereira', confidence: 98 },
  { id: 'doctor', label: 'Médico responsável', value: 'Dr. Henrique Mota', confidence: 96 },
  { id: 'crm', label: 'CRM', value: '84221-SP', confidence: 98 },
  { id: 'cid', label: 'CID', value: 'M54.5', confidence: 65 },
  { id: 'days', label: 'Dias de afastamento', value: '3', confidence: 94 },
  { id: 'date', label: 'Data de emissão', value: '29/04/2026', confidence: 99 },
];

function ConfidencePill({ value }: { value: number }) {
  const high = value >= 90;
  const mid = value >= 75 && value < 90;
  const low = value < 75;
  const color = high ? '#40D8C3' : mid ? '#9DD68A' : '#E9C46A';
  const bg = high
    ? 'rgba(64, 216, 195, 0.15)'
    : mid
      ? 'rgba(157, 214, 138, 0.15)'
      : 'rgba(233, 196, 106, 0.15)';
  const label = low ? 'Confiança da IA' : 'Confiança';
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs whitespace-nowrap"
      style={{ backgroundColor: bg, color, fontWeight: 600 }}
    >
      <Sparkles size={10} />
      {label}: {value}%
    </span>
  );
}

export function AuditScreen({ onBack }: AuditScreenProps) {
  const [fields, setFields] = useState(initialFields);
  const [zoom, setZoom] = useState(1);

  const updateField = (id: string, value: string) => {
    setFields((f) => f.map((x) => (x.id === id ? { ...x, value } : x)));
  };

  return (
    <div className="size-full flex flex-col overflow-hidden" style={{ backgroundColor: '#1B222B' }}>
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-8 py-4 border-b shrink-0"
        style={{ borderColor: '#2A323E' }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="rounded-lg p-2 transition-colors"
            style={{ backgroundColor: '#262D36', color: '#FFFFFF' }}
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <p className="text-xs opacity-60" style={{ color: '#FFFFFF' }}>
              Validação · Atestado #2104
            </p>
            <h1 className="text-lg" style={{ color: '#FFFFFF', fontWeight: 700 }}>
              Auditoria de Documento
            </h1>
          </div>
        </div>
        <Logo size="sm" />
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left: viewer */}
        <section
          className="relative overflow-hidden flex items-center justify-center border-r"
          style={{
            backgroundColor: '#13181F',
            borderColor: '#2A323E',
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        >
          {/* Document */}
          <div
            className="rounded-md shadow-2xl transition-transform duration-200"
            style={{
              width: 360,
              height: 480,
              transform: `scale(${zoom})`,
              background: 'linear-gradient(180deg, #f5f1e6 0%, #ece6d3 100%)',
              color: '#1B222B',
              padding: '28px',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ borderBottom: '2px solid #1B222B', paddingBottom: 8, marginBottom: 12 }}>
              <p style={{ fontWeight: 700, fontSize: '11px', letterSpacing: '1px' }}>
                CLÍNICA MEDLIFE
              </p>
              <p style={{ fontSize: '9px', opacity: 0.7 }}>Av. Paulista, 1234 · São Paulo · SP</p>
            </div>
            <p
              style={{
                fontWeight: 700,
                fontSize: '14px',
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              ATESTADO MÉDICO
            </p>
            <div style={{ fontSize: '10px', lineHeight: 1.7 }}>
              <p>
                Atesto, para os devidos fins, que a paciente{' '}
                <strong>Marina Costa Pereira</strong> esteve sob meus cuidados profissionais nesta
                data, necessitando de afastamento de suas atividades laborais por
                <strong> 3 (três) dias</strong>, a contar de 29/04/2026.
              </p>
              <p style={{ marginTop: 12 }}>
                Diagnóstico: <strong>CID M54.5</strong>
              </p>
              <p style={{ marginTop: 16 }}>São Paulo, 29 de abril de 2026.</p>
              <div style={{ marginTop: 32, borderTop: '1px solid #1B222B', paddingTop: 6 }}>
                <p style={{ fontSize: '9px' }}>Dr. Henrique Mota</p>
                <p style={{ fontSize: '9px', opacity: 0.7 }}>CRM 84221-SP</p>
              </div>
            </div>
          </div>

          {/* OCR overlay highlight on CID */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: 'calc(50% + 30px)',
              left: '50%',
              transform: `translateX(-50%) scale(${zoom})`,
              width: 110,
              height: 18,
              border: '1.5px dashed #E9C46A',
              borderRadius: 4,
              backgroundColor: 'rgba(233, 196, 106, 0.12)',
            }}
          />

          {/* Viewer controls */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full px-2 py-1.5"
            style={{ backgroundColor: 'rgba(38, 45, 54, 0.9)', backdropFilter: 'blur(8px)' }}
          >
            <button
              onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(2)))}
              className="rounded-full p-2"
              style={{ color: '#FFFFFF' }}
            >
              <ZoomOut size={14} />
            </button>
            <span className="text-xs px-2" style={{ color: '#FFFFFF' }}>
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)))}
              className="rounded-full p-2"
              style={{ color: '#FFFFFF' }}
            >
              <ZoomIn size={14} />
            </button>
            <div className="w-px h-4 mx-1" style={{ backgroundColor: '#3A4350' }} />
            <button className="rounded-full p-2" style={{ color: '#FFFFFF' }}>
              <RotateCw size={14} />
            </button>
            <button className="rounded-full p-2" style={{ color: '#FFFFFF' }}>
              <Maximize2 size={14} />
            </button>
          </div>

          <div
            className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
            style={{ backgroundColor: 'rgba(38, 45, 54, 0.9)', color: '#40D8C3', fontWeight: 600 }}
          >
            <Sparkles size={12} />
            OCR processado
          </div>
        </section>

        {/* Right: form */}
        <section className="flex flex-col overflow-hidden" style={{ backgroundColor: '#262D36' }}>
          <div className="flex-1 overflow-auto px-8 py-6">
            <div className="mb-6">
              <h2 className="text-xl" style={{ color: '#FFFFFF', fontWeight: 700 }}>
                Dados extraídos
              </h2>
              <p className="text-xs mt-1 opacity-60" style={{ color: '#FFFFFF' }}>
                Revise as informações detectadas pela IA antes de validar.
              </p>
            </div>

            <div className="space-y-5">
              {fields.map((f) => (
                <div key={f.id}>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      className="text-xs uppercase tracking-wider"
                      style={{ color: '#8B95A5', fontWeight: 600 }}
                    >
                      {f.label}
                    </label>
                    <ConfidencePill value={f.confidence} />
                  </div>
                  <input
                    value={f.value}
                    onChange={(e) => updateField(f.id, e.target.value)}
                    className="w-full px-4 py-3 rounded-lg outline-none transition-colors"
                    style={{
                      backgroundColor: '#1B222B',
                      border: `1px solid ${f.confidence < 75 ? 'rgba(233, 196, 106, 0.5)' : '#2A323E'}`,
                      color: '#FFFFFF',
                    }}
                  />
                  {f.confidence < 75 && (
                    <p
                      className="text-xs mt-1.5 flex items-center gap-1.5"
                      style={{ color: '#E9C46A' }}
                    >
                      <Sparkles size={10} />
                      Confiança baixa — recomendamos revisar manualmente.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer actions */}
          <div
            className="flex items-center justify-end gap-3 px-8 py-5 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
          >
            <button
              className="flex items-center gap-2 px-4 py-3 rounded-xl transition-colors"
              style={{
                border: '1px solid #40D8C3',
                color: '#40D8C3',
                backgroundColor: 'transparent',
                fontWeight: 600,
              }}
            >
              <Camera size={16} />
              Solicitar Nova Foto
            </button>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-3 rounded-xl transition-opacity hover:opacity-90"
              style={{
                backgroundColor: '#40D8C3',
                color: '#000000',
                fontWeight: 700,
                letterSpacing: '0.3px',
              }}
            >
              <CheckCircle2 size={16} />
              Validar e Salvar
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
