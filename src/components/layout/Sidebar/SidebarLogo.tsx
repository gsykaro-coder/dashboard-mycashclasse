interface SidebarLogoProps {
  isExpanded: boolean
}

export default function SidebarLogo({ isExpanded }: SidebarLogoProps) {

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* Logo Icon - Magnifying Glass with Chart (conforme Figma) */}
      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          viewBox="0 0 40 40"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Magnifying Glass Circle (outline) */}
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="var(--color-primary)"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Chart Bars Inside (ascending trend - 3 bars) */}
          <g transform="translate(10, 12)">
            {/* Bar 1 - Shortest (left) */}
            <rect
              x="0"
              y="8"
              width="4"
              height="4"
              fill="var(--color-primary)"
            />
            
            {/* Bar 2 - Medium (middle) */}
            <rect
              x="5"
              y="5"
              width="4"
              height="7"
              fill="var(--color-primary)"
            />
            
            {/* Bar 3 - Tallest (right) */}
            <rect
              x="10"
              y="2"
              width="4"
              height="10"
              fill="var(--color-primary)"
            />
            
            {/* Ascending zigzag line on top */}
            <path
              d="M2 12 L5 9 L7.5 10.5 L12.5 6"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
          
          {/* Magnifying Glass Handle */}
          <path
            d="M26 26L32 32"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {isExpanded && (
        <div className="flex items-center gap-1 md:gap-2">
          <span className="text-base md:text-lg lg:text-xl font-bold text-[var(--color-primary)]">
            Money
          </span>
          <span className="text-base md:text-lg lg:text-xl font-bold text-[var(--orange-700)]">
            up
          </span>
        </div>
      )}
    </div>
  )
}
