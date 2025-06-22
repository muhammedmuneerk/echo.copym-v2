import React from "react";

const Stack3dIcon = ({ style }) => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <g opacity="0.9">
        {/* Bottom layer */}
        <path
          d="M12 40L32 52L52 40L32 28L12 40Z"
          fill="url(#paint0_linear)"
          fillOpacity="0.6"
        />
        {/* Middle layer */}
        <path
          d="M12 32L32 44L52 32L32 20L12 32Z"
          fill="url(#paint1_linear)"
          fillOpacity="0.8"
        />
        {/* Top layer */}
        <path d="M12 24L32 36L52 24L32 12L12 24Z" fill="url(#paint2_linear)" />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="12"
          y1="40"
          x2="52"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8A2BE2" />
          <stop offset="1" stopColor="#FF00FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="12"
          y1="32"
          x2="52"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8A2BE2" />
          <stop offset="1" stopColor="#FF00FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="12"
          y1="24"
          x2="52"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8A2BE2" />
          <stop offset="1" stopColor="#FF00FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Stack3dIcon;
