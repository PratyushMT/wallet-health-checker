interface MetricCardProps {
  icon: React.ReactNode;
  name: string;
  score: number;
  description: string;
  details: string;
  className?: string;
}

export default function MetricCard({ 
  icon, 
  name, 
  score, 
  description, 
  details,
  className = ""
}: MetricCardProps) {
  // Calculate score color
  const getScoreColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 65) return "bg-[#14F195]";
    if (value >= 50) return "bg-yellow-500";
    if (value >= 30) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div 
      className={`rounded-xl border border-[#2A2A4A] bg-[#1A1A2E]/50 shadow-sm 
        hover:border-[#9945FF]/30 transition-all duration-300 ${className}`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-white leading-none tracking-tight">{name}</h3>
          </div>
          
          <div>
            <span className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold text-white ${getScoreColor(score)}`}>
              {score}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-[#B4B4D9] mb-4">{description}</p>
        
        <div className="pt-4 border-t border-[#2A2A4A]">
          <p className="text-[#B4B4D9] text-sm">{details}</p>
        </div>
      </div>
    </div>
  );
}
