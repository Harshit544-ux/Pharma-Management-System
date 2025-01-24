import { Activity, Calendar, Phone, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PatientDetailsProps {
  patient: any
  onClose: () => void
}

export function PatientDetails({ patient, onClose }: PatientDetailsProps) {
  if (!patient) return null

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Patient Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-6 p-4">
          <div className="flex items-start gap-4">
            <Image
              src={patient.avatar || "/placeholder.svg"}
              alt={patient.name}
              className="rounded-lg"
              width={60}
              height={60}
            />
            <div className="space-y-1">
              <h3 className="font-medium">{patient.name}</h3>
              <div className="text-sm text-muted-foreground">
                {patient.age} y, {patient.gender}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{patient.phone}</span>
                </div>
                <div className="text-sm text-blue-600">{patient.email}</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium">Visit Info</h4>
              <div className="flex items-start gap-4 rounded-lg border p-4">
                <Calendar className="mt-1 h-4 w-4 text-gray-500" />
                <div>
                  <div className="font-medium">Scheduled Time & Date</div>
                  <div className="text-sm text-muted-foreground">
                    {patient.schedule.date}, {patient.schedule.time}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Reason</h4>
              <div className="rounded-lg border p-4">
                <div className="font-medium">{patient.reason}</div>
                {patient.status && <div className="mt-1 text-sm text-orange-600">{patient.status}</div>}
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Emergency Contact</h4>
              <div className="rounded-lg border p-4">
                <div className="font-medium">{patient.emergencyContact?.name}</div>
                <div className="text-sm text-muted-foreground">({patient.emergencyContact?.relation})</div>
                <div className="mt-1 text-sm">{patient.emergencyContact?.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <Tabs defaultValue="vitals">
          <TabsList className="grid w-full grid-cols-5 px-10">
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="medical-records">MedicalRecords</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
            <TabsTrigger value="appointment-history">History</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[200px] mt-2">
            <TabsContent value="vitals" className="p-2">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(patient.vitals || {}).map(([key, value]) => (
                  <div key={key} className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                    <div className="font-medium">{value as string}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="medical-records" className="p-2">
              {patient.medicalRecords?.map((record: any, index: number) => (
                <div key={index} className="mb-2 rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">{record.date}</div>
                  <div className="font-medium">{record.diagnosis}</div>
                  <div className="text-sm">{record.treatment}</div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="medications" className="p-2">
              {patient.medications?.map((medication: any, index: number) => (
                <div key={index} className="mb-2 rounded-lg border p-3">
                  <div className="font-medium">{medication.name}</div>
                  <div className="text-sm">
                    {medication.dosage} - {medication.frequency}
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="lab-results" className="p-2">
              {patient.labResults?.map((result: any, index: number) => (
                <div key={index} className="mb-2 rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">{result.date}</div>
                  <div className="font-medium">{result.test}</div>
                  <div className="text-sm">{result.result}</div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="appointment-history" className="p-2">
              {patient.appointmentHistory?.map((appointment: any, index: number) => (
                <div key={index} className="mb-2 rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">{appointment.date}</div>
                  <div className="font-medium">{appointment.doctor}</div>
                  <div className="text-sm">{appointment.reason}</div>
                </div>
              ))}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  )
}

