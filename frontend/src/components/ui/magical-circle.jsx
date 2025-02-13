"use client"

export function MagicalCircle({ className = "" }) {
  return (
    <svg 
      viewBox="0 0 500 500" 
      className={`w-full h-full ${className}`}
    >
      {/* Outer Circle */}
      <circle 
        cx="250" cy="250" r="240" 
        className="fill-none stroke-amber-400/20 stroke-2"
      />
      
      {/* Inner Circles */}
      <circle 
        cx="250" cy="250" r="200" 
        className="fill-none stroke-amber-400/20 stroke-2"
      />
      <circle 
        cx="250" cy="250" r="160" 
        className="fill-none stroke-amber-400/20 stroke-2"
      />
      
      {/* Magical Runes */}
      <g className="animate-spin-slow">
        {[...Array(12)].map((_, i) => (
          <g key={i} transform={`rotate(${i * 30} 250 250)`}>
            <path 
              d={`M 250 30 L 260 50 L 240 50 Z`} 
              className="fill-amber-400/20"
            />
          </g>
        ))}
      </g>
      
      {/* Skill Points */}
      <circle cx="250" cy="100" r="12" className="fill-amber-400 animate-pulse" />
      <circle cx="400" cy="250" r="12" className="fill-blue-400 animate-pulse" />
      <circle cx="250" cy="400" r="12" className="fill-purple-400 animate-pulse" />
    </svg>
  )
}