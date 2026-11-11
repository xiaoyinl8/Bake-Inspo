// Small flat icons in the same warm style as the corner art. Each fits a 64 x 64 box.
const ART = {
  cookie: (
    <>
      <circle cx="32" cy="32" r="27" fill="#c9762c" />
      <circle cx="32" cy="32" r="24" fill="#e8a45a" />
      <circle cx="23" cy="24" r="4.2" fill="#5a3321" />
      <circle cx="40" cy="21" r="3.6" fill="#5a3321" />
      <circle cx="43" cy="35" r="4.4" fill="#5a3321" />
      <circle cx="27" cy="40" r="4" fill="#5a3321" />
      <circle cx="34" cy="31" r="3" fill="#5a3321" />
      <circle cx="38" cy="46" r="2.8" fill="#5a3321" />
    </>
  ),
  brownie: (
    <>
      <rect x="8" y="10" width="48" height="44" rx="8" fill="#5a3321" />
      <path d="M16 22 L30 20 L40 26 M34 38 L48 34 M20 44 L30 40" stroke="#8a5a3b" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="46" cy="20" r="4" fill="#e8a45a" />
      <circle cx="20" cy="32" r="3.5" fill="#e8a45a" />
    </>
  ),
  cake: (
    <>
      <path d="M6 36 Q10 12 36 8 Q58 6 60 26 V50 Q60 54 56 54 H10 Q6 54 6 50 Z" fill="#f6c98d" />
      <path d="M6 36 Q10 12 36 8 Q58 6 60 26 Q34 22 6 36 Z" fill="#f0a24a" />
      <rect x="11" y="34" width="44" height="7" rx="3.5" fill="#4a2a1c" />
      <rect x="11" y="45" width="44" height="6" rx="3" fill="#4a2a1c" />
      <circle cx="22" cy="19" r="2.3" fill="#4a2a1c" />
      <circle cx="34" cy="15" r="2.3" fill="#4a2a1c" />
      <circle cx="46" cy="17" r="2.3" fill="#4a2a1c" />
      <circle cx="53" cy="25" r="2.3" fill="#4a2a1c" />
    </>
  ),
  cupcake: (
    <>
      <path d="M16 34 H48 L44 56 Q44 58 42 58 H22 Q20 58 20 56 Z" fill="#d9546e" />
      <path d="M26 36 L27 56 M32 36 V56 M38 36 L37 56" stroke="#f08aa0" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M13 35 Q8 25 19 23 Q19 11 32 11 Q45 11 45 23 Q56 25 51 35 Z" fill="#fbe3b6" />
      <circle cx="32" cy="9" r="4" fill="#c2410c" />
    </>
  ),
  loaf: (
    <>
      <path d="M8 32 Q8 12 32 12 Q56 12 56 32 V50 Q56 54 52 54 H12 Q8 54 8 50 Z" fill="#e8a45a" />
      <path d="M8 46 H56 V50 Q56 54 52 54 H12 Q8 54 8 50 Z" fill="#c9762c" />
      <path d="M20 22 L26 36 M31 20 L37 35 M42 22 L47 35" stroke="#fbe3b6" strokeWidth="3.2" strokeLinecap="round" />
    </>
  ),
  roll: (
    <>
      <circle cx="32" cy="32" r="27" fill="#e8a45a" />
      <path
        d="M35.0 32.0 L35.1 33.0 L34.9 34.1 L34.3 35.2 L33.3 36.0 L32.0 36.5 L30.5 36.6 L29.0 36.1 L27.6 35.2 L26.6 33.8 L26.0 32.0 L26.0 30.1 L26.7 28.1 L27.9 26.4 L29.8 25.2 L32.0 24.5 L34.4 24.6 L36.8 25.4 L38.8 27.1 L40.3 29.3 L41.0 32.0 L40.8 34.9 L39.8 37.6 L37.8 40.0 L35.2 41.7 L32.0 42.5 L28.7 42.3 L25.5 41.0 L22.8 38.7 L20.9 35.6 L20.0 32.0 L20.3 28.2 L21.8 24.6 L24.4 21.6 L27.9 19.4 L32.0 18.5 L36.3 18.9 L40.3 20.6 L43.6 23.5 L46.0 27.5 L47.0 32.0 L46.6 36.7 L44.6 41.2 L41.3 44.9 L37.0 47.4 L32.0 48.5 L26.8 48.0 L21.9 45.8 L17.9 42.2 L15.2 37.5 L14.0 32.0 L14.6 26.3 L17.0 21.1 L20.9 16.7 L26.1 13.7 L32.0 12.5 L38.1 13.2 L43.8 15.7 L48.5 20.0 L51.7 25.6 L53.0 32.0"
        fill="none" stroke="#8a4b22" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"
      />
    </>
  ),
  pie: (
    <>
      <defs>
        <clipPath id="icon-pie-clip"><circle cx="32" cy="32" r="20" /></clipPath>
      </defs>
      <circle cx="32" cy="32" r="27" fill="#e0954a" />
      <circle cx="32" cy="32" r="27" fill="none" stroke="#c9762c" strokeWidth="3" strokeDasharray="3.5 3" />
      <circle cx="32" cy="32" r="20" fill="#b83a52" />
      <g clipPath="url(#icon-pie-clip)" stroke="#f0b869" strokeWidth="4.5">
        <path d="M6 20 H58 M6 32 H58 M6 44 H58 M20 6 V58 M32 6 V58 M44 6 V58" />
      </g>
    </>
  ),
  tart: (
    <>
      <circle cx="32" cy="32" r="27" fill="#e0954a" />
      <circle cx="32" cy="32" r="27" fill="none" stroke="#c9762c" strokeWidth="3" strokeDasharray="3.5 3" />
      <circle cx="32" cy="32" r="21" fill="#fbe3b6" />
      <circle cx="24" cy="26" r="5" fill="#d9546e" />
      <circle cx="40" cy="26" r="5" fill="#4a5aa8" />
      <circle cx="32" cy="37" r="5" fill="#d9546e" />
      <circle cx="22" cy="38" r="4" fill="#4a5aa8" />
      <circle cx="43" cy="38" r="4" fill="#d9546e" />
    </>
  ),
  croissant: (
    <>
      <g fill="#e8a45a" stroke="#b8651f" strokeWidth="2">
        <ellipse cx="13.2" cy="39.2" rx="6" ry="8" transform="rotate(-160 13.2 39.2)" />
        <ellipse cx="20.5" cy="29.6" rx="7.5" ry="10" transform="rotate(-125 20.5 29.6)" />
        <ellipse cx="50.8" cy="39.2" rx="6" ry="8" transform="rotate(-20 50.8 39.2)" />
        <ellipse cx="43.5" cy="29.6" rx="7.5" ry="10" transform="rotate(-55 43.5 29.6)" />
        <ellipse cx="32.0" cy="26.0" rx="9" ry="13" transform="rotate(-90 32.0 26.0)" />
      </g>
    </>
  ),
  dessert: (
    <>
      <path d="M8 50 V30 Q8 24 14 24 H50 Q56 24 56 30 V50 Z" fill="#fbe3b6" />
      <rect x="8" y="46" width="48" height="8" rx="3" fill="#c9762c" />
      <path d="M8 30 Q8 24 14 24 H50 Q56 24 56 30 V32 Q50 38 44 32 Q38 40 32 32 Q26 38 20 32 Q14 38 8 32 Z" fill="#d9546e" />
      <circle cx="32" cy="20" r="5" fill="#b8213f" />
      <path d="M32 15 Q35 9 40 10" stroke="#6b8f3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  ),
  cheese: (
    <>
      <polygon points="6,40 58,34 58,52 6,52" fill="#f0c24b" />
      <polygon points="6,40 40,14 58,34" fill="#f8e08e" />
      <ellipse cx="18" cy="46" rx="4" ry="3" fill="#d9a62b" />
      <ellipse cx="36" cy="45" rx="3" ry="2.6" fill="#d9a62b" />
      <circle cx="48" cy="42" r="2.5" fill="#d9a62b" />
      <circle cx="34" cy="28" r="2.5" fill="#e0bd5a" />
    </>
  ),
  pretzel: (
    <>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g stroke="#b8651f" strokeWidth="9">
          <ellipse cx="32" cy="27" rx="19" ry="15" />
          <path d="M14 54 C20 44 40 46 50 32 M50 54 C44 44 24 46 14 32" />
        </g>
        <g stroke="#e8a45a" strokeWidth="5.5">
          <ellipse cx="32" cy="27" rx="19" ry="15" />
          <path d="M14 54 C20 44 40 46 50 32 M50 54 C44 44 24 46 14 32" />
        </g>
      </g>
      <circle cx="20" cy="16" r="1.3" fill="#fff" />
      <circle cx="44" cy="16" r="1.3" fill="#fff" />
      <circle cx="32" cy="12" r="1.3" fill="#fff" />
      <circle cx="30" cy="46" r="1.3" fill="#fff" />
    </>
  ),
  sparkle: (
    <path
      d="M32 4 C34 22 42 30 60 32 C42 34 34 42 32 60 C30 42 22 34 4 32 C22 30 30 22 32 4Z"
      fill="#f0c24b"
    />
  ),
};

export function Icon({ name, className = "" }) {
  return (
    <svg className={`icon ${className}`} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {ART[name] ?? ART.sparkle}
    </svg>
  );
}
