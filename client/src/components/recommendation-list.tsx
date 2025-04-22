import { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Info } from "lucide-react";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  details: string;
}

interface RecommendationListProps {
  recommendations: Recommendation[];
}

export default function RecommendationList({ recommendations }: RecommendationListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Toggle expanded state
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Get impact icon and color
  const getImpactDetails = (impact: string) => {
    switch (impact) {
      case "high":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-status-error" />,
          badge: "bg-status-error/10 text-status-error",
          label: "High Impact"
        };
      case "medium":
        return {
          icon: <Info className="h-5 w-5 text-status-warning" />,
          badge: "bg-status-warning/10 text-status-warning",
          label: "Medium Impact"
        };
      case "low":
        return {
          icon: <CheckCircle className="h-5 w-5 text-status-success" />,
          badge: "bg-status-success/10 text-status-success",
          label: "Low Impact"
        };
      default:
        return {
          icon: <Info className="h-5 w-5 text-solana-blue" />,
          badge: "bg-solana-blue/10 text-solana-blue",
          label: "Info"
        };
    }
  };

  // Sort recommendations by impact (high to low)
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const impactOrder = { high: 3, medium: 2, low: 1 };
    return impactOrder[b.impact] - impactOrder[a.impact];
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold text-white glow-text">Recommendations</h2>
        <span className="text-dark-text-secondary text-sm">
          {recommendations.length} {recommendations.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="space-y-4">
        {sortedRecommendations.map((recommendation) => {
          const isExpanded = expandedId === recommendation.id;
          const { icon, badge, label } = getImpactDetails(recommendation.impact);
          
          return (
            <div 
              key={recommendation.id}
              onClick={() => toggleExpand(recommendation.id)}
              className={`rounded-xl border border-[#2A2A4A] bg-[#1A1A2E]/50 shadow-sm 
                hover:border-[#9945FF]/30 transition-all duration-300 cursor-pointer
                ${isExpanded ? "shadow-[0_0_15px_rgba(153,69,255,0.3)]" : ""}`}
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {icon}
                      <h3 className="font-medium text-white text-sm sm:text-base line-clamp-2">{recommendation.title}</h3>
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded ? <ChevronUp className="h-5 w-5 text-[#B4B4D9]" /> : <ChevronDown className="h-5 w-5 text-[#B4B4D9]" />}
                    </div>
                  </div>
                  
                  <div>
                    <span className={`text-xs py-1 px-2 rounded-full ${badge} inline-block`}>{label}</span>
                  </div>
                  
                  <p className="text-sm text-[#B4B4D9]">{recommendation.description}</p>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#2A2A4A]">
                      <p className="text-[#B4B4D9] text-sm">{recommendation.details}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
