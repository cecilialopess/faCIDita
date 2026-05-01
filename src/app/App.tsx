import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { RoleSelectionScreen } from './components/RoleSelectionScreen';
import { EmployeeHomeScreen } from './components/EmployeeHomeScreen';
import { ScanScreen } from './components/ScanScreen';
import { ScanResultScreen } from './components/ScanResultScreen';
import { HRDashboardScreen } from './components/HRDashboardScreen';
import { ManagerPortalScreen } from './components/ManagerPortalScreen';
import { AuditScreen } from './components/AuditScreen';

type Screen = 'login' | 'role' | 'home' | 'scan' | 'result' | 'hr' | 'manager' | 'audit';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const goto = (s: Screen) => setScreen(s);

  switch (screen) {
    case 'login':
      return <LoginScreen onLogin={() => goto('role')} />;
    case 'role':
      return (
        <RoleSelectionScreen
          onSelect={(role) =>
            goto(role === 'rh' ? 'hr' : role === 'gestor' ? 'manager' : 'home')
          }
          onBack={() => goto('login')}
        />
      );
    case 'scan':
      return <ScanScreen onCapture={() => goto('result')} onCancel={() => goto('home')} />;
    case 'result':
      return (
        <ScanResultScreen onConfirm={() => goto('home')} onCancel={() => goto('scan')} />
      );
    case 'hr':
      return (
        <HRDashboardScreen
          onLogout={() => goto('login')}
          onAudit={() => goto('audit')}
          onBack={() => goto('role')}
        />
      );
    case 'manager':
      return <ManagerPortalScreen onLogout={() => goto('login')} onBack={() => goto('role')} />;
    case 'audit':
      return <AuditScreen onBack={() => goto('hr')} />;
    default:
      return (
        <EmployeeHomeScreen onScan={() => goto('scan')} onLogout={() => goto('login')} />
      );
  }
}
