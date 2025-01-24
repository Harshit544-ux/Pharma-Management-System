import { useEffect, useState } from "react"
import { Check, Search } from "lucide-react"
import Image from "next/image"
// import { patients as allPatients, patientCategories } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientDetails } from "@/components/PatientDetails"
import { set } from "date-fns"

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar: string;
  reason: string;
  schedule: {
    date: string;
    time: string;
  };
  status: string;
  priority: string;
  email: string;
  phone: string;
  assignedDoctor: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  vitals: {
    bloodPressure: string;
    temperature: string;
    heartRate: string;
    oxygenSaturation: string;
    height: string;
    weight: string;
  };
  medicalRecords: Array<{
    date: string;
    diagnosis: string;
    treatment: string;
  }>;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
  labResults: Array<{
    date: string;
    test: string;
    result: string;
  }>;
  appointmentHistory: Array<{
    date: string;
    doctor: string;
    reason: string;
  }>;
}

interface PatientListProps {
  onSelectPatient: (patient: any) => void
  selectedPatient: any
  searchQuery: string
}

export function PatientList({ onSelectPatient, selectedPatient, searchQuery }: PatientListProps) {
  const [activeTab, setActiveTab] = useState("all-patients")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const[patients, setPatients] = useState<any[]>([])
  const[patientCategories, setPatientCategories] = useState<any[]>([])


  useEffect(()=>{
     const fetchPatients = async()=>{
      try{
        const response=await fetch("http://localhost:3005/api/patients")
        const data=await response.json()
        console.log(data)
        setPatients(data)

        setPatientCategories([
          {name:"All Patients", count:data.length},
          {name:"Current Patients", count:data.filter((patient:any)=>patient.status==="Current").length},
          {name:"New Patients", count:data.filter((patient:any)=>patient.status==="New").length},
          {name:"Discharged Patients", count:data.filter((patient:any)=>patient.status==="Discharged").length},
          {name:"High Priority", count:data.filter((patient:any)=>patient.priority==="High").length},
        ])
      }catch(error){
        console.error("Error fetching patients:",error)
      }
     }
     fetchPatients()

  },[])


  const filteredPatients = patients.filter((patient: Patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === "all-patients" ||
      (activeTab === "current-patients" && patient.status === "Current") ||
      (activeTab === "new-patients" && patient.status === "New") ||
      (activeTab === "discharged-patients" && patient.status === "Discharged") ||
      (activeTab === "high-priority" && patient.priority === "High")
    return matchesSearch && matchesTab
  })

  const handlePatientClick = (patient: any) => {
    onSelectPatient(patient)
    setIsModalOpen(true)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Patient List</h2>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="flex w-full justify-start gap-2 rounded-none border-b bg-transparent p-0">
          {patientCategories.map((category) => (
            <TabsTrigger
              key={category.name}
              value={category.name.toLowerCase().replace(" ", "-")}
              className="relative rounded-none border-b-2 border-transparent px-4 pb-2 pt-2 text-sm font-medium text-muted-foreground hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              {category.name}
              <span className="ml-2 text-xs">{category.count}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="p-4">
          <div className="mt-4 grid grid-cols-[auto_1fr_1fr] items-center gap-4 px-4 py-2 text-sm font-medium text-muted-foreground">
            <Checkbox />
            <div>Patient Name</div>
            <div className="grid grid-cols-2 gap-4">
              <div>Reason</div>
              <div>Schedule Time & Date</div>
            </div>
          </div>
          <div className="space-y-2 h-[400px] overflow-y-auto">
            {filteredPatients.map((patient: Patient) => (
              <div
                key={patient.id}
                className="grid grid-cols-[auto_1fr_1fr] items-center gap-4 rounded-md p-4 transition-colors hover:bg-accent cursor-pointer"
                onClick={() => handlePatientClick(patient)}
              >
                <Checkbox />
                <div className="flex items-center gap-4">
                  <Image
                    src={patient.avatar || "/placeholder.svg"}
                    alt={patient.name}
                    className="rounded-full"
                    width={40}
                    height={40}
                  />
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {patient.age} y, {patient.gender}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm">{patient.reason}</div>
                  <div className="text-sm">
                    <div>{patient.schedule.date}</div>
                    <div className="text-muted-foreground">{patient.schedule.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Tabs>
      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div
            className={cn(
              "fixed right-0 top-0 z-50 h-screen w-[500px] transform bg-background shadow-lg transition-transform duration-300 ease-in-out",
              isModalOpen ? "translate-x-0" : "translate-x-full",
            )}
          >
            <PatientDetails patient={selectedPatient} onClose={() => setIsModalOpen(false)} />
          </div>
        </>
      )}
    </div>
  )
}

