// import React from 'react';

// const CustomButton = ({ label, onClick, className }) => {
//   return (
//     <div
//       className="relative rounded-full p-[2px] bg-[linear-gradient(90deg,rgba(1,132,58,0.73)_0%,rgba(0,255,132,0.6)_100%)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,132,0.5)]"
//     >
//       <div className="bg-black rounded-full w-full h-full">
//         <button
//           onClick={onClick}
//           className={`rounded-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold w-full text-white backdrop-blur-md bg-white/5 hover:bg-white/10 ${className || ''}`}
//         >
//           {label}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CustomButton;





import React, { useState } from 'react';

const CustomButton = ({ label, onClick, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <div
      className={`relative rounded-2xl p-[2px] bg-[linear-gradient(90deg,rgb(12,33,75,0.9)_0%,rgba(47,118,50,0.6)_70%)] transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 ${isPressed ? 'scale-95' : isHovered ? 'scale-105' : ''} transform transition-transform duration-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <div className="bg-gray-900 rounded-2xl w-full h-full overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className={`absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_70%)] transform ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} transition-all duration-700 ease-out`} style={{
          transformOrigin: isHovered ? 'var(--mouse-x, 50%) var(--mouse-y, 50%)' : 'center center'
        }}></div>
        
        <button
          onClick={(e) => {
            // Ripple effect
            const button = e.currentTarget;
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;
            
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
            circle.classList.add('ripple');
            
            const ripple = button.getElementsByClassName('ripple')[0];
            if (ripple) {
              ripple.remove();
            }
            
            button.appendChild(circle);
            
            // Execute the onClick handler
            if (onClick) onClick(e);
          }}
          onMouseMove={(e) => {
            // Update custom properties for the glow effect position
            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;
            e.currentTarget.parentElement.style.setProperty('--mouse-x', `${x}px`);
            e.currentTarget.parentElement.style.setProperty('--mouse-y', `${y}px`);
          }}
          className={`relative rounded-2xl px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium w-full text-white backdrop-blur-md bg-black/20 hover:bg-black/30 transition-all duration-300 overflow-hidden ${className || ''}`}
        >
          <span className="relative z-10 flex items-center justify-center">
            <span className={`transition-all duration-300 ${isHovered ? 'tracking-wider' : ''}`}>{label}</span>
            <span className={`ml-2 opacity-0 ${isHovered ? 'opacity-100 translate-x-0' : '-translate-x-2'} transition-all duration-300`}>→</span>
          </span>
        </button>
        
        <style jsx>{`
          .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.2);
            transform: scale(0);
            animation: ripple 0.75s linear;
            pointer-events: none;
          }
          
          @keyframes ripple {
            to {
              transform: scale(2);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default CustomButton;








// import React from "react";

// /**
//  * A responsive custom button with gradient border effect
//  * @param {Object} props - Component props
//  * @param {string} props.title - Button text content
//  * @param {string} [props.className] - Additional classes to apply
//  * @param {string} [props.size] - Button size: "sm", "md", "lg" (default: "md")
//  * @param {React.ReactNode} [props.icon] - Optional icon to display before text
//  * @param {Function} [props.onClick] - Click handler function
//  * @param {string} [props.type] - Button type attribute (default: "button")
//  */
// const CustomButton = ({
//   title,
//   className = "",
//   size = "md",
//   icon,
//   onClick,
//   type = "button",
//   ...restProps
// }) => {
//   // Dynamic sizing classes based on the size prop
//   const sizeClasses = {
//     sm: "px-3 py-1.5 text-xs",
//     md: "px-4 py-2 text-sm md:px-6 md:py-2.5 md:text-base",
//     lg: "px-5 py-2.5 text-base md:px-8 md:py-3 md:text-lg"
//   };

//   // Get the appropriate size classes
//   const buttonSizeClasses = sizeClasses[size] || sizeClasses.md;

//   return (
//     <div 
//       className={`relative rounded-full p-[2px] bg-[linear-gradient(90deg,rgba(1,132,58,0.73)_0%,rgba(0,255,132,0.6)_100%)] 
//       transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,132,0.5)]
//       w-full max-w-xs md:max-w-sm ${className}`}
//     >
//       <div className="bg-black rounded-full w-full h-full">
//         <button
//           type={type}
//           onClick={onClick}
//           className={`rounded-full ${buttonSizeClasses} font-semibold w-full text-white 
//           backdrop-blur-md bg-white/5 hover:bg-white/10 transition-colors
//           flex items-center justify-center gap-2`}
//           {...restProps}
//         >
//           {icon && <span className="inline-flex items-center">{icon}</span>}
//           {title}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CustomButton;



// EXAMPLE USAGE: -->
//  <div className="relative rounded-full p-[2px]">
//    <div className=" rounded-full w-full h-full">
//      <CustomButton
//        title="Explore Platform"

//        // <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//        //   <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//        // </svg>
//      />
//    </div>
//  </div>;