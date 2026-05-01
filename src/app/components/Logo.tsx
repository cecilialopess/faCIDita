interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ size = 'lg' }: LogoProps) {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  return (
    <h1 className={`${sizes[size]} relative inline-block tracking-tight`}>
      <span style={{ color: '#FFFFFF', fontWeight: 500 }}>fa</span>
      <span className="relative inline-block" style={{ color: '#40D8C3', fontWeight: 700, padding: '0 8px' }}>
        <svg
          className="absolute"
          viewBox="0 0 100 60"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '140%',
            pointerEvents: 'none',
          }}
        >
          <circle cx="50" cy="30" r="28" fill="none" stroke="#40D8C3" strokeWidth="0.5" opacity="0.3" />
          <path d="M 18 10 L 18 18 M 18 10 L 26 10" stroke="#40D8C3" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M 82 10 L 82 18 M 82 10 L 74 10" stroke="#40D8C3" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M 18 50 L 18 42 M 18 50 L 26 50" stroke="#40D8C3" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M 82 50 L 82 42 M 82 50 L 74 50" stroke="#40D8C3" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
        CID
      </span>
      <span style={{ color: '#FFFFFF', fontWeight: 500 }}>ita</span>
    </h1>
  );
}
