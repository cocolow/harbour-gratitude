import { BUBBLE_TEA_OMBRE } from '../design/tokens';
import { useReducedMotion } from '../theme/useReducedMotion';

interface BubbleTeaJarProps {
  level: number;
  target: number;
  outlineColor: string;
  jarEmpty: string;
  size?: number;
}

const OMBRE_GRADIENT = `linear-gradient(to bottom, ${BUBBLE_TEA_OMBRE.join(', ')})`;
const OMBRE_GRADIENT_REV = `linear-gradient(to bottom, ${[...BUBBLE_TEA_OMBRE].reverse().join(', ')})`;

export function BubbleTeaJar({
  level,
  target,
  outlineColor,
  jarEmpty,
  size = 112,
}: BubbleTeaJarProps) {
  const reducedMotion = useReducedMotion();
  const pct = Math.min(100, (level / target) * 100);
  const pearlCount = Math.min(level, 5);

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Straw — 2px chunky outline */}
      <div
        className="absolute left-1/2 z-20"
        style={{
          width: size * 0.06,
          height: size * 0.38,
          backgroundColor: jarEmpty,
          border: `2px solid ${outlineColor}`,
          borderRadius: size * 0.03,
          transform: `translateX(-30%) rotate(15deg)`,
          transformOrigin: 'bottom center',
          top: -size * 0.08,
        }}
      />

      {/* Lid band */}
      <div
        className="absolute left-1/2 z-10 -translate-x-1/2"
        style={{
          top: size * 0.06,
          width: size * 0.72,
          height: size * 0.06,
          backgroundColor: jarEmpty,
          borderRadius: size * 0.03,
        }}
      />

      {/* Domed lid — inset 2px outline */}
      <div
        className="absolute left-1/2 z-10 -translate-x-1/2"
        style={{
          top: size * 0.02,
          width: size * 0.76,
          height: size * 0.1,
          backgroundColor: jarEmpty,
          borderRadius: '50%',
          boxShadow: `inset 0 0 0 2px ${outlineColor}`,
        }}
      />

      {/* Cup body — inset 3px outline */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          width: size * 0.88,
          height: size * 0.78,
          clipPath: 'polygon(6% 0, 94% 0, 82% 100%, 18% 100%)',
          backgroundColor: jarEmpty,
          boxShadow: `inset 0 0 0 3px ${outlineColor}`,
        }}
      >
        {/* Fill — liquid rise */}
        <div
          className="absolute bottom-0 left-0 right-0 overflow-hidden"
          style={{
            height: `${pct}%`,
            transition: reducedMotion
              ? 'height 0.3s linear'
              : 'height 1s cubic-bezier(0.2, 0, 0, 1)',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: OMBRE_GRADIENT,
              backgroundSize: '100% 220%',
              animation: reducedMotion ? undefined : 'drift 6s ease-in-out infinite',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: OMBRE_GRADIENT_REV,
              backgroundSize: '100% 220%',
              mixBlendMode: 'soft-light',
              opacity: 0.55,
              animation: reducedMotion ? undefined : 'driftB 7.5s ease-in-out infinite',
            }}
          />
          {!reducedMotion && pct > 0 && (
            <div
              className="absolute left-[15%] right-[15%] top-[8%] h-[18%] rounded-full opacity-40"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
                animation: 'blink 2.6s ease-in-out infinite',
              }}
            />
          )}
        </div>

        {/* Pearls */}
        <div
          className="absolute bottom-[6%] left-0 right-0 flex items-end justify-center gap-[3px]"
          style={{ paddingLeft: size * 0.12, paddingRight: size * 0.12 }}
        >
          {Array.from({ length: pearlCount }).map((_, i) => (
            <div
              key={i}
              style={{
                width: size * 0.1,
                height: size * 0.1,
                borderRadius: '50%',
                backgroundColor: '#000',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                animation: reducedMotion ? undefined : `pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 50}ms both`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
