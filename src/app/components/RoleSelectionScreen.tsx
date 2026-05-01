import { useState } from 'react';
import { User, Briefcase, Building2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';
import { BackgroundGlow } from './BackgroundGlow';

type Role = 'colaborador' | 'gestor' | 'rh';

interface RoleSelectionScreenProps {
  onSelect: (role: Role) => void;
  onBack: () => void;
}

const roles = [
  {
    id: 'colaborador' as Role,
    title: 'Colaborador',
    description: 'Envie e acompanhe seus atestados de forma rápida.',
    Icon: User,
  },
  {
    id: 'gestor' as Role,
    title: 'Gestor',
    description: 'Aprove e monitore a equipe em tempo real.',
    Icon: Briefcase,
  },
  {
    id: 'rh' as Role,
    title: 'Portal RH',
    description: 'Gerencie a operação completa de atestados.',
    Icon: Building2,
  },
];

export function RoleSelectionScreen({ onSelect, onBack }: RoleSelectionScreenProps) {
  const [selected, setSelected] = useState<Role>('colaborador');

  return (
    <div className="size-full flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#1B222B' }}>
      <BackgroundGlow />

      <div className="relative z-10 w-full max-w-md px-6 py-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-sm transition-opacity hover:opacity-100"
          style={{ color: '#40D8C3', opacity: 0.6 }}
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        <div className="mb-8 text-center">
          <Logo size="md" />
          <h2 className="text-2xl mt-6" style={{ color: '#FFFFFF' }}>
            Selecione seu perfil
          </h2>
          <p className="mt-2 text-sm opacity-60" style={{ color: '#FFFFFF' }}>
            Escolha como você vai acessar a plataforma
          </p>
        </div>

        <div className="space-y-4">
          {roles.map(({ id, title, description, Icon }) => {
            const isActive = selected === id;
            return (
              <button
                key={id}
                onClick={() => setSelected(id)}
                className="w-full text-left rounded-2xl p-5 transition-all duration-200 border"
                style={{
                  backgroundColor: '#262D36',
                  borderColor: isActive ? '#40D8C3' : '#3A4350',
                  borderWidth: '1px',
                  boxShadow: isActive ? '0 0 24px rgba(64, 216, 195, 0.25)' : 'none',
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="rounded-xl p-3 flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: isActive ? 'rgba(64, 216, 195, 0.15)' : '#1B222B',
                    }}
                  >
                    <Icon size={22} style={{ color: '#40D8C3' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{title}</span>
                      {isActive && (
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: '#40D8C3', boxShadow: '0 0 8px #40D8C3' }}
                        />
                      )}
                    </div>
                    <p className="text-sm mt-1 opacity-60" style={{ color: '#FFFFFF' }}>
                      {description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onSelect(selected)}
          className="w-full mt-8 py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 shadow-lg flex items-center justify-center gap-2"
          style={{
            backgroundColor: '#40D8C3',
            color: '#000000',
            fontWeight: 700,
            letterSpacing: '0.5px',
          }}
        >
          CONTINUAR
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
