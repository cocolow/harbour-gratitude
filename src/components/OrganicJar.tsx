interface OrganicJarProps {
  fill: string;
  empty: string;
  level: number;
  target: number;
}

export function OrganicJar({ fill, empty, level, target }: OrganicJarProps) {
  const pct = Math.min(100, (level / target) * 100);
  return (
    <svg width="52" height="60" viewBox="0 0 52 60" aria-hidden>
      <path
        d="M14 10 C14 8 18 6 26 6 C34 6 38 8 38 10 L36 48 C36 50 32 52 26 52 C20 52 16 50 16 48 Z"
        fill={empty}
        stroke={fill}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d={`M18 ${50 - (38 * pct) / 100} C20 ${48 - (38 * pct) / 100} 32 ${48 - (38 * pct) / 100} 34 ${50 - (38 * pct) / 100} L34 48 C34 50 30 52 26 52 C22 52 18 50 18 48 Z`}
        fill={fill}
        opacity="0.9"
      />
      <ellipse cx="26" cy="10" rx="13" ry="3.5" fill={empty} stroke={fill} strokeWidth="1.5" />
    </svg>
  );
}
