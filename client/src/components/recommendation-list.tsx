"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Info } from "lucide-react"

interface Recommendation {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  details: string
}

interface RecommendationListProps {
  recommendations: Recommendation[]
}

export default function RecommendationList({ recommendations }: RecommendationListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null)
    } else {
      setExpandedId(id)
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-[#EF4444]" />
      case "medium":
        return <Info className="h-5 w-5 text-[#F59E0B]" />
      case "low":
        return <CheckCircle className="h-5 w-5 text-[#14F195]" />
      default:
        return <Info className="h-5 w-5 text-[#00C2FF]" />
    }
  }

  const getImpactText = (impact: string) => {
    switch (impact) {
      case "high":
        return "High Impact"
      case "medium":
        return "Medium Impact"
      case "low":
        return "Low Impact"
      default:
        return "Informational"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-950/50 text-red-400 border-red-800/50"
      case "medium":
        return "bg-amber-950/50 text-amber-400 border-amber-800/50"
      case "low":
        return "bg-green-950/50 text-green-400 border-green-800/50"
      default:
        return "bg-blue-950/50 text-blue-400 border-blue-800/50"
    }
  }

  // Sort recommendations by impact (high to low)
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const impactOrder = { high: 0, medium: 1, low: 2 }
    return impactOrder[a.impact] - impactOrder[b.impact]
  })

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold text-white mb-6">Recommendations</h2>

      {sortedRecommendations.map((rec) => (
        <Card
          key={rec.id}
          className="overflow-hidden glass-card border-[#2A2A4A] hover:border-[#9945FF]/30 transition-all duration-300"
        >
          <CardContent className="p-0">
            <div
              className="p-5 cursor-pointer hover:bg-[#1A1A2E]/50 transition-colors duration-200"
              onClick={() => toggleExpand(rec.id)}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getImpactIcon(rec.impact)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <h3 className="font-medium text-white">{rec.title}</h3>
                    <div className={`px-3 py-1 text-xs rounded-full border ${getImpactColor(rec.impact)}`}>
                      {getImpactText(rec.impact)}
                    </div>
                  </div>
                  <p className="text-sm text-[#B4B4D9] mt-2">{rec.description}</p>

                  <button
                    className="flex items-center text-sm text-[#9945FF] mt-3 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleExpand(rec.id)
                    }}
                  >
                    {expandedId === rec.id ? (
                      <>
                        <span>Show less</span>
                        <ChevronUp className="h-4 w-4 ml-1" />
                      </>
                    ) : (
                      <>
                        <span>Learn more</span>
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {expandedId === rec.id && (
              <div className="p-5 bg-[#1A1A2E] border-t border-[#2A2A4A] text-sm text-[#B4B4D9]">{rec.details}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
