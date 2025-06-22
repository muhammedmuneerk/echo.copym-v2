import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@emotion/react";

// Subtle neon sweep across the card surface
const neonSweep = keyframes`
  0%   { transform: translateX(-120%) translateY(-120%) rotate(45deg); opacity: 0; }
  50%  { opacity: .35; }
  100% { transform: translateX(120%) translateY(120%) rotate(45deg); opacity: 0; }
`;

// Pulsating glow for the border / box-shadow
const neonPulse = keyframes`
  0%,100% { box-shadow: 0 0 6px rgba(0,224,255,.35), 0 0 15px rgba(0,224,255,.25); }
  50%     { box-shadow: 0 0 12px rgba(0,224,255,.6), 0 0 30px rgba(0,224,255,.45); }
`;

// Re-define shimmer & glass reflection to match AnimatedCardWrapper
const shimmerAnimation = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const glassReflection = keyframes`
  0%   { transform: translate(-110%,110%) rotate(45deg); opacity:.05; }
  50%  { opacity:.25; }
  100% { transform: translate(110%,-110%) rotate(45deg); opacity:.05; }
`;

// Legacy border animations kept for compatibility with border-* helper divs
const borderAnimationRight = keyframes`0%{width:0;height:2px;top:0;right:100%;opacity:1;}25%{width:100%;height:2px;top:0;right:0;opacity:.7;}100%{width:100%;height:2px;top:0;right:0;opacity:0;}`;
const borderAnimationDown  = keyframes`0%{width:2px;height:0;top:0;right:0;opacity:1;}25%{width:2px;height:100%;top:0;right:0;opacity:.7;}100%{width:2px;height:100%;top:0;right:0;opacity:0;}`;
const borderAnimationLeft  = keyframes`0%{width:0;height:2px;bottom:0;right:0;opacity:1;}25%{width:100%;height:2px;bottom:0;right:0;opacity:.7;}100%{width:100%;height:2px;bottom:0;right:0;opacity:0;}`;
const borderAnimationUp    = keyframes`0%{width:2px;height:0;bottom:0;left:0;opacity:1;}25%{width:2px;height:100%;bottom:0;left:0;opacity:.7;}100%{width:2px;height:100%;bottom:0;left:0;opacity:0;}`;

// Styled component – updated futuristic visuals
const AnimatedCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '350px',
  height: '100%',
  padding: '1.5rem',
  borderRadius: '1.75rem',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, rgba(24,25,38,.78) 0%, rgba(14,16,24,.85) 40%, rgba(8,9,13,.92) 100%)',
  border: '1px solid rgba(0,224,255,.22)',
  backdropFilter: 'blur(28px)',
  transformStyle: 'preserve-3d',
  transition: 'transform .4s ease, box-shadow .4s ease, border .4s ease',
  boxShadow: '0 0 18px rgba(0,224,255,.04), 0 10px 28px rgba(0,0,0,.55)',

  /* Neon sweep overlay */
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '-3px',
    background: 'linear-gradient(130deg, rgba(0,224,255,0) 0%, rgba(0,224,255,.45) 50%, rgba(0,224,255,0) 100%)',
    filter: 'blur(14px)',
    animation: `${neonSweep} 6s linear infinite`,
    pointerEvents: 'none',
  },

  /* Grid overlay */
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'repeating-linear-gradient(0deg, rgba(255,255,255,.025) 0 1px, transparent 1px 20px), repeating-linear-gradient(90deg, rgba(255,255,255,.025) 0 1px, transparent 1px 20px)',
    mixBlendMode: 'overlay',
    pointerEvents: 'none',
  },

  '&:hover': {
    transform: 'rotateX(6deg) rotateY(-6deg) translateY(-6px)',
    boxShadow: '0 0 22px rgba(0,224,255,.15), 0 18px 38px rgba(0,0,0,.75)',
    borderColor: 'rgba(0,224,255,.38)',
    animation: `${neonPulse} 2.8s ease-in-out infinite`,
    '& .glass-reflection': {
      animation: `${glassReflection} 3s linear infinite`,
    },
    '& .card-content': {
      transform: 'translateZ(12px)',
    },
    '& .border-right': { animation: `${borderAnimationRight} 2.5s linear infinite` },
    '& .border-down':  { animation: `${borderAnimationDown} 2.5s linear infinite`, animationDelay: '1s' },
    '& .border-left':  { animation: `${borderAnimationLeft} 2.5s linear infinite`, animationDelay: '1.5s' },
    '& .border-up':    { animation: `${borderAnimationUp} 2.5s linear infinite`, animationDelay: '2s' },
  },

  /* Helper div styles */
  '& .border-right, & .border-down, & .border-left, & .border-up': {
    position: 'absolute',
    animation: 'none',
    zIndex: 2,
  },
  '& .border-right': { top: 0, right: '100%', height: 2, background: 'linear-gradient(to right, rgba(0,0,0,0), #00e0ff, rgba(0,0,0,0))' },
  '& .border-down':  { top: 0, right: 0, width: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0), #00e0ff, rgba(0,0,0,0))' },
  '& .border-left':  { bottom: 0, right: 0, height: 2, background: 'linear-gradient(to left, rgba(0,0,0,0), #00e0ff, rgba(0,0,0,0))' },
  '& .border-up':    { bottom: 0, left: 0, width: 2, background: 'linear-gradient(to top, rgba(0,0,0,0), #00e0ff, rgba(0,0,0,0))' },

  '& .glass-reflection': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '220%',
    height: '220%',
    background: 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.12) 50%, rgba(255,255,255,0) 100%)',
    transformOrigin: '0 0',
    pointerEvents: 'none',
    opacity: 0,
  },

  '& .card-content': {
    position: 'relative',
    zIndex: 2,
    transition: 'transform .3s ease-out',
  },

  [theme.breakpoints.between('md','lg')]: {
    padding: '1.25rem',
    maxWidth: '280px',
  },
}));

const Card = ({ children }) => {
  return (
    <AnimatedCard style={{ perspective: "1000px" }}>
      {/* Border animation elements */}
      <div className="border-right"></div>
      <div className="border-down"></div>
      <div className="border-left"></div>
      <div className="border-up"></div>
      
      {/* Glass reflection effect */}
      <div className="glass-reflection"></div>
      
      {/* Wrap content in a div for 3D effect */}
      <div className="card-content">
        {children}
      </div>
    </AnimatedCard>
  );
};

export default Card;