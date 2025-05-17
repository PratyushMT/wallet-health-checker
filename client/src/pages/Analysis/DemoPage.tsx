import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function DemoPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // redirect after some logic
    navigate("/analysis/demo", { replace: true })
  }, [navigate])

  return (
    <div className="text-white text-center mt-20">
      Redirecting to demo analysis...
    </div>
  )
}
