import { useState } from 'react';
import { Mail, Lock, HelpCircle } from 'lucide-react';
import { Logo } from './Logo';
import { BackgroundGlow } from './BackgroundGlow';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="size-full flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#1B222B' }}>
      <BackgroundGlow />

      <div className="relative z-10 w-full max-w-md px-6 py-8">
        <div className="mb-12 text-center">
          <Logo />
          <p className="mt-3 text-sm opacity-60" style={{ color: '#FFFFFF' }}>
            Gestão Inteligente de Atestados
          </p>
        </div>

        <div className="rounded-2xl p-8 shadow-2xl" style={{ backgroundColor: '#262D36' }}>
          <h2 className="text-2xl mb-6 text-center" style={{ color: '#FFFFFF' }}>
            Bem-vindo de volta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Mail size={18} style={{ color: '#40D8C3', opacity: 0.6 }} />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="w-full pl-12 pr-4 rounded-lg border transition-all duration-200 outline-none"
                style={{
                  backgroundColor: '#1B222B',
                  borderColor: emailFocused ? '#40D8C3' : '#3A4350',
                  color: '#FFFFFF',
                  borderWidth: '1px',
                  fontSize: '15px',
                  lineHeight: '20px',
                  height: '60px',
                  paddingTop: emailFocused || email ? '28px' : '20px',
                  paddingBottom: emailFocused || email ? '12px' : '20px',
                }}
                required
              />
              <label
                htmlFor="email"
                className="absolute left-12 transition-all duration-200 pointer-events-none"
                style={{
                  color: emailFocused || email ? '#40D8C3' : '#8B95A5',
                  fontSize: emailFocused || email ? '12px' : '15px',
                  top: emailFocused || email ? '8px' : '50%',
                  transform: emailFocused || email ? 'translateY(0)' : 'translateY(-50%)',
                }}
              >
                E-mail
              </label>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Lock size={18} style={{ color: '#40D8C3', opacity: 0.6 }} />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full pl-12 pr-4 rounded-lg border transition-all duration-200 outline-none"
                style={{
                  backgroundColor: '#1B222B',
                  borderColor: passwordFocused ? '#40D8C3' : '#3A4350',
                  color: '#FFFFFF',
                  borderWidth: '1px',
                  fontSize: '15px',
                  lineHeight: '20px',
                  paddingTop: passwordFocused || password ? '26px' : '14px',
                  paddingBottom: passwordFocused || password ? '8px' : '14px',
                }}
                required
              />
              <label
                htmlFor="password"
                className="absolute left-12 transition-all duration-200 pointer-events-none"
                style={{
                  color: passwordFocused || password ? '#40D8C3' : '#8B95A5',
                  fontSize: passwordFocused || password ? '12px' : '15px',
                  top: passwordFocused || password ? '8px' : '50%',
                  transform: passwordFocused || password ? 'translateY(0)' : 'translateY(-50%)',
                }}
              >
                Senha
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 shadow-lg"
              style={{
                backgroundColor: '#40D8C3',
                color: '#000000',
                fontWeight: 700,
                letterSpacing: '0.5px',
              }}
            >
              ENTRAR
            </button>

            <div className="flex items-center justify-between pt-2">
              <a
                href="#"
                className="text-sm transition-opacity duration-200 hover:opacity-100 flex items-center gap-1.5"
                style={{ color: '#40D8C3', opacity: 0.6 }}
              >
                Esqueci minha senha
              </a>
              <a
                href="#"
                className="text-sm transition-opacity duration-200 hover:opacity-100 flex items-center gap-1.5"
                style={{ color: '#40D8C3', opacity: 0.6 }}
              >
                <HelpCircle size={16} />
                Suporte
              </a>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-xs" style={{ color: '#8B95A5' }}>
          © 2026 faCIDita. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
}
