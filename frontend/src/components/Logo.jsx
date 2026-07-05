export default function Logo({ size = 34, animated = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="iv-sweep" x1="50" y1="50" x2="50" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" stopOpacity="0" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="iv-glow" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#38bdf8" stopOpacity="0.25" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="46" fill="#0a0f1e" stroke="#1e293b" strokeWidth="2" />
      <circle cx="50" cy="50" r="46" fill="url(#iv-glow)" />

      <circle cx="50" cy="50" r="32" stroke="#1e3a52" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="18" stroke="#1e3a52" strokeWidth="1.5" />
      <line x1="50" y1="6" x2="50" y2="94" stroke="#15293d" strokeWidth="1" />
      <line x1="6" y1="50" x2="94" y2="50" stroke="#15293d" strokeWidth="1" />

      <g>
        <path d="M50 50 L50 6 A44 44 0 0 1 88 30 Z" fill="url(#iv-sweep)" opacity="0.55">
          {animated && (
            <animateTransform attributeName="transform" type="rotate"
              from="0 50 50" to="360 50 50" dur="4s" repeatCount="indefinite" />
          )}
        </path>
      </g>

      <line x1="50" y1="50" x2="50" y2="6" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round">
        {animated && (
          <animateTransform attributeName="transform" type="rotate"
            from="0 50 50" to="360 50 50" dur="4s" repeatCount="indefinite" />
        )}
      </line>

      <circle cx="68" cy="34" r="3.5" fill="#4ade80">
        {animated && (
          <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="50" cy="50" r="3" fill="#38bdf8" />
    </svg>
  );
}
