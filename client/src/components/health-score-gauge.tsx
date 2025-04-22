import { useEffect, useState } from "react";

interface HealthScoreGaugeProps {
  score: number;
  className?: string;
}

export default function HealthScoreGauge({ score, className = "" }: HealthScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Calculate color based on score
  const getScoreColor = (value: number) => {
    if (value >= 80) return "#10B981"; // Green for excellent
    if (value >= 65) return "#14F195"; // Light green for good
    if (value >= 50) return "#F59E0B"; // Amber for average
    if (value >= 30) return "#FB923C"; // Orange for concerning
    return "#EF4444"; // Red for poor
  };
  
  // Calculate score description
  const getScoreDescription = (value: number) => {
    if (value >= 80) return "Excellent wallet health! Your wallet shows good security practices.";
    if (value >= 65) return "Good wallet health. Some minor improvements possible.";
    if (value >= 50) return "Average wallet health. Consider implementing some recommendations.";
    if (value >= 30) return "Below average wallet health. Several issues need attention.";
    return "Poor wallet health. Immediate attention recommended.";
  };

  // Animate score on mount
  useEffect(() => {
    const duration = 1500; // Animation duration in ms
    const interval = 20; // Update interval in ms
    const steps = duration / interval;
    const increment = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        current = score;
        clearInterval(timer);
      }
      setAnimatedScore(Math.round(current));
    }, interval);
    
    return () => clearInterval(timer);
  }, [score]);

  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
  const scoreColor = getScoreColor(animatedScore);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-64 h-64">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(42, 42, 74, 0.5)"
            strokeWidth="12"
          />
          
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={scoreColor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 100 100)"
            className="transition-all duration-300"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-semibold text-white">{animatedScore}</span>
          <span className="text-dark-text-secondary text-lg mt-1">Health Score</span>
        </div>
      </div>
      
      <p className="mt-6 text-center text-dark-text-secondary max-w-md">
        {getScoreDescription(animatedScore)}
      </p>
    </div>
  );
}