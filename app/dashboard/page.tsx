"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { PatientList } from "@/components/PatientList"


export default function Dashboard() {
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex h-screen flex-col">
      <Header onSearch={setSearchQuery} />
      <div className="flex flex-1">
        <div className="w-full">
          <PatientList
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
            searchQuery={searchQuery}
          />
        </div>
      </div>
     
    </div>
  )
} 