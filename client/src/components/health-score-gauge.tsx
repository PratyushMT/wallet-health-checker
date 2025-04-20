"use client"

import { useEffect, useState } from "react"

interface HealthScoreGaugeProps {
  score: number
}

export default function HealthScoreGauge({ score }: HealthScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  // Calculate colors and dimensions based on score
  const getScoreColor = (value: number) => {
    if (value > 75) return "#14F195" // Success green
    if (value > 50) return "#F59E0B" // Warning amber
    return "#EF4444" // Error red
  }

  const scoreColor = getScoreColor(score)
  const circumference = 2 * Math.PI * 45 // 45 is the radius
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  useEffect(() => {
    // Animate the score from 0 to actual value
    const timer = setTimeout(() => {
      if (animatedScore < score) {
        setAnimatedScore((prev) => Math.min(prev + 1, score))
      }
    }, 20)

    return () => clearTimeout(timer)
  }, [animatedScore, score])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-64 h-64">
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={scoreColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={scoreColor} stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1A1A2E" strokeWidth="8" />
          {/* Score circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
            style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
            filter="url(#glow)"
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-semibold text-white">{animatedScore}</span>
          <span className="text-[#B4B4D9] text-sm">Health Score</span>
        </div>
      </div>
      <p className="mt-6 text-center text-[#B4B4D9] max-w-xs">
        {score > 75
          ? "Excellent wallet health! Your wallet shows good practices."
          : score > 50
            ? "Good wallet health with some room for improvement."
            : "Your wallet health needs attention. See recommendations below."}
      </p>
    </div>
  )
}
