import React from "react"
import "./globals.css"
import Navbar from "../../components/Navbar"

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default AppLayout
