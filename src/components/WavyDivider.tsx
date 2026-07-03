export function WavyDivider({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 12" className="my-5 w-full" aria-hidden>
      <path
        d="M0 6 Q40 0 80 6 T160 6 T240 6 T320 6"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
