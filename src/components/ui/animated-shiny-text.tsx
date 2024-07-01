import { CSSProperties, FC, ReactNode } from "react";
import { cn } from "../../utils";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
  shimmerColor?: string; // New prop for dynamic color
}

// Étendre CSSProperties pour inclure les propriétés personnalisées
interface CustomCSSProperties extends CSSProperties {
  "--shimmer-width"?: string;
}

const tailwindColors: Record<string, string> = {
  "red-600": "#dc2626",
  // Ajoutez d'autres couleurs si nécessaire
};

const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  shimmerColor = "black", // Default to black
}) => {
  const color = tailwindColors[shimmerColor] || shimmerColor; // Get the hex value or use the provided color

  const shimmerStyle: CustomCSSProperties = {
    "--shimmer-width": `${shimmerWidth}px`,
    backgroundImage: `linear-gradient(90deg, transparent, ${color} 50%, transparent)`, // Use the dynamic color
  };

  return (
    <p
      style={shimmerStyle}
      className={cn(
        "mx-auto max-w-md text-blue-800/80 ",

        // Shimmer effect
        "animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",

        className
      )}
    >
      {children}
    </p>
  );
};

export default AnimatedShinyText;
