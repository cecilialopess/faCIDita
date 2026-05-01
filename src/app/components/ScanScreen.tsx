import { useEffect, useState } from 'react';
import { X, Zap, Image as ImageIcon } from 'lucide-react';

interface ScanScreenProps {
  onCapture: () => void;
  onCancel: () => void;
}

export function ScanScreen({ onCapture, onCancel }: ScanScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(onCapture, 400);
          return 100;
        }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(id);
  }, [onCapture]);

  return (
    <div className="size-full relative overflow-hidden" style={{ backgroundColor: '#0A0E13' }}>
      {/* Simulated camera viewport */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, #1B222B 0%, #0A0E13 70%)',
          }}
        />
        {/* faux paper document */}
        <div
          className="absolute left-1/2 top-1/2 w-72 h-96 rounded-md"
          style={{
            transform: 'translate(-50%, -50%) rotate(-2deg)',
            background: 'linear-gradient(180deg, #2a3340 0%, #1a2028 100%)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <div className="p-5 space-y-2 opacity-60">
            <div className="h-2 w-3/4 rounded" style={{ backgroundColor: '#3A4350' }} />
            <div className="h-2 w-1/2 rounded" style={{ backgroundColor: '#3A4350' }} />
            <div className="h-2 w-2/3 rounded mt-4" style={{ backgroundColor: '#3A4350' }} />
            <div className="h-2 w-5/6 rounded" style={{ backgroundColor: '#3A4350' }} />
            <div className="h-2 w-1/3 rounded" style={{ backgroundColor: '#3A4350' }} />
            <div className="h-2 w-3/5 rounded mt-6" style={{ backgroundColor: '#3A4350' }} />
            <div className="h-2 w-2/5 rounded" style={{ backgroundColor: '#3A4350' }} />
          </div>
        </div>
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between p-5">
        <button
          onClick={onCancel}
          className="rounded-full p-2.5"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#FFFFFF' }}
        >
          <X size={20} />
        </button>
        <div
          className="px-3 py-1.5 rounded-full text-xs"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#40D8C3', fontWeight: 600 }}
        >
          ESCANEANDO...
        </div>
        <button
          className="rounded-full p-2.5"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#FFFFFF' }}
        >
          <Zap size={20} />
        </button>
      </div>

      {/* Capture frame */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-80 h-[28rem]">
          {/* Corners */}
          {[
            { pos: 'top-0 left-0', d: 'M 0 30 L 0 0 L 30 0' },
            { pos: 'top-0 right-0', d: 'M 30 0 L 60 0 L 60 30', flip: true },
            { pos: 'bottom-0 left-0', d: 'M 0 0 L 0 30 L 30 30' },
            { pos: 'bottom-0 right-0', d: 'M 30 30 L 60 30 L 60 0' },
          ].map((c, i) => (
            <svg
              key={i}
              className={`absolute ${c.pos}`}
              width="40"
              height="40"
              viewBox="0 0 60 60"
              style={{ transform: i === 1 ? 'scaleX(-1)' : i === 2 ? 'scaleY(-1)' : i === 3 ? 'scale(-1,-1)' : '' }}
            >
              <path
                d="M 0 30 L 0 0 L 30 0"
                stroke="#40D8C3"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 6px #40D8C3)' }}
              />
            </svg>
          ))}

          {/* Laser line */}
          <div
            className="absolute left-2 right-2"
            style={{
              top: `${progress}%`,
              height: '2px',
              backgroundColor: '#40D8C3',
              boxShadow: '0 0 16px #40D8C3, 0 0 32px #40D8C3',
              transition: 'top 60ms linear',
            }}
          >
            <div
              className="absolute inset-x-0"
              style={{
                top: '-40px',
                height: '40px',
                background: 'linear-gradient(180deg, transparent, rgba(64,216,195,0.25))',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 inset-x-0 z-10 p-6">
        <p className="text-center text-sm mb-6 opacity-80" style={{ color: '#FFFFFF' }}>
          Posicione o atestado dentro do quadro
        </p>
        <div className="flex items-center justify-around">
          <button className="rounded-full p-3" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
            <ImageIcon size={20} />
          </button>
          <button
            onClick={onCapture}
            className="w-18 h-18 rounded-full flex items-center justify-center"
            style={{
              width: 72,
              height: 72,
              backgroundColor: '#FFFFFF',
              border: '4px solid #40D8C3',
              boxShadow: '0 0 24px rgba(64, 216, 195, 0.5)',
            }}
          >
            <div className="w-14 h-14 rounded-full" style={{ backgroundColor: '#40D8C3' }} />
          </button>
          <div style={{ width: 44 }} />
        </div>
      </div>
    </div>
  );
}
