"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface MetricCardProps {
  icon: React.ReactNode
  name: string
  score: number
  description: string
  details: string
}

export default function MetricCard({ icon, name, score, description, details }: MetricCardProps) {
  const [expanded, setExpanded] = useState(false)

  // Calculate color based on score
  const getScoreColor = (value: number) => {
    if (value > 75) return "#14F195" // Success green
    if (value > 50) return "#F59E0B" // Warning amber
    return "#EF4444" // Error red
  }

  const scoreColor = getScoreColor(score)

  return (
    <Card className="overflow-hidden transition-all duration-300 glass-card border-[#2A2A4A] hover:border-[#9945FF]/30">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="bg-[#1A1A2E] rounded-md flex items-center justify-center p-3">{icon}</div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-white">{name}</h3>
                <span className="font-semibold" style={{ color: scoreColor }}>
                  {score}/100
                </span>
              </div>
              <p className="text-sm text-[#B4B4D9]">{description}</p>
            </div>
          </div>

          <div className="mt-4 w-full h-2 bg-[#1A1A2E] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${score}%`,
                backgroundColor: scoreColor,
                boxShadow: `0 0 10px ${scoreColor}`,
                transition: "width 1s ease-out",
              }}
            ></div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-sm text-[#9945FF] mt-4 hover:underline"
          >
            {expanded ? (
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

        {expanded && <div className="p-5 bg-[#1A1A2E] border-t border-[#2A2A4A] text-sm text-[#B4B4D9]">{details}</div>}
      </CardContent>
    </Card>
  )
}
