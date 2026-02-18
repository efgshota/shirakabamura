import styles from "./PropertyImagePlaceholder.module.css";

type Props = {
  className?: string;
  label?: string;
};

export default function PropertyImagePlaceholder({
  className,
  label = "写真を準備中",
}: Props) {
  return (
    <div className={`${styles.wrap} ${className ?? ""}`}>
      <svg
        viewBox="0 0 480 340"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
        aria-label={label}
      >
        <defs>
          <linearGradient id="ph-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d8e4ec" />
            <stop offset="100%" stopColor="#e8ecdf" />
          </linearGradient>
          <linearGradient id="ph-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4cdb8" />
            <stop offset="100%" stopColor="#c8c0a8" />
          </linearGradient>
          <linearGradient id="ph-lake" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a8c4d0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#94b3ba" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="ph-mtn1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b0c4a8" />
            <stop offset="100%" stopColor="#98b090" />
          </linearGradient>
          <linearGradient id="ph-mtn2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4d4bc" />
            <stop offset="100%" stopColor="#b0c4a8" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="480" height="340" fill="url(#ph-sky)" />

        {/* Mountain back */}
        <polygon
          points="140,220 260,90 380,220"
          fill="url(#ph-mtn2)"
          opacity="0.55"
        />
        {/* Mountain front */}
        <polygon
          points="60,220 200,110 340,220"
          fill="url(#ph-mtn1)"
          opacity="0.65"
        />

        {/* Ground */}
        <rect y="220" width="480" height="120" fill="url(#ph-ground)" />

        {/* Lake */}
        <ellipse cx="240" cy="270" rx="150" ry="28" fill="url(#ph-lake)" />
        {/* Lake shimmer */}
        <ellipse cx="200" cy="268" rx="50" ry="6" fill="#fff" opacity="0.1" />
        <ellipse cx="280" cy="272" rx="30" ry="4" fill="#fff" opacity="0.08" />

        {/* Birch tree — left */}
        {/* Trunk */}
        <rect x="92" y="148" width="9" height="100" rx="3" fill="#d4c8b0" />
        {/* Trunk markings */}
        <rect x="92" y="165" width="9" height="3" rx="1" fill="#a09080" opacity="0.5" />
        <rect x="92" y="182" width="9" height="3" rx="1" fill="#a09080" opacity="0.5" />
        <rect x="92" y="200" width="9" height="3" rx="1" fill="#a09080" opacity="0.5" />
        {/* Foliage layers */}
        <ellipse cx="96" cy="122" rx="28" ry="36" fill="#4a7050" opacity="0.75" />
        <ellipse cx="96" cy="108" rx="22" ry="28" fill="#3e6044" opacity="0.8" />
        <ellipse cx="96" cy="98" rx="14" ry="18" fill="#325038" opacity="0.85" />

        {/* Birch tree — right */}
        <rect x="366" y="158" width="8" height="90" rx="3" fill="#d4c8b0" />
        <rect x="366" y="172" width="8" height="3" rx="1" fill="#a09080" opacity="0.5" />
        <rect x="366" y="190" width="8" height="3" rx="1" fill="#a09080" opacity="0.5" />
        <ellipse cx="370" cy="132" rx="24" ry="32" fill="#4a7050" opacity="0.7" />
        <ellipse cx="370" cy="120" rx="18" ry="22" fill="#3e6044" opacity="0.75" />
        <ellipse cx="370" cy="112" rx="12" ry="15" fill="#325038" opacity="0.8" />

        {/* Small trees in back */}
        <rect x="165" y="185" width="5" height="55" rx="2" fill="#c0b098" />
        <ellipse cx="168" cy="170" rx="14" ry="20" fill="#507050" opacity="0.5" />
        <rect x="295" y="190" width="4" height="50" rx="2" fill="#c0b098" />
        <ellipse cx="297" cy="177" rx="12" ry="17" fill="#507050" opacity="0.45" />

        {/* Foreground grass / reeds */}
        <path
          d="M0 248 Q40 238 80 245 Q120 252 160 246 Q200 240 240 248 Q280 256 320 248 Q360 240 400 246 Q440 252 480 248 L480 340 L0 340 Z"
          fill="#b8a888"
          opacity="0.5"
        />

        {/* Label badge */}
        <rect
          x="155"
          y="288"
          width="170"
          height="30"
          rx="15"
          fill="#253c30"
          opacity="0.55"
        />
        <text
          x="240"
          y="308"
          textAnchor="middle"
          fontFamily="'Hiragino Sans', 'Yu Gothic', sans-serif"
          fontSize="13"
          fill="#fff"
          letterSpacing="3"
          opacity="0.9"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
