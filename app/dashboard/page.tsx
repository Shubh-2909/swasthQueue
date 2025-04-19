"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, AlertTriangle, BarChart, Clock, Users } from "lucide-react"

// Mock data for the queue
const mockPatients = [
  {
    id: 1,
    name: "Ramesh Kumar",
    village: "Alwar",
    mobile: "9876543210",
    waitTime: 0,
    priority: false,
    reason: "Fever",
  },
  {
    id: 2,
    name: "Sunita Devi",
    village: "Jaipur",
    mobile: "9876543211",
    waitTime: 15,
    priority: true,
    reason: "Pregnancy checkup",
  },
  {
    id: 3,
    name: "Mohan Singh",
    village: "Sikar",
    mobile: "9876543212",
    waitTime: 30,
    priority: false,
    reason: "Cough",
  },
  {
    id: 4,
    name: "Priya Sharma",
    village: "Jodhpur",
    mobile: "9876543213",
    waitTime: 45,
    priority: false,
    reason: "Headache",
  },
  {
    id: 5,
    name: "Rajesh Meena",
    village: "Kota",
    mobile: "9876543214",
    waitTime: 60,
    priority: false,
    reason: "Back pain",
  },
  {
    id: 6,
    name: "Anita Kumari",
    village: "Bikaner",
    mobile: "9876543215",
    waitTime: 75,
    priority: false,
    reason: "Skin rash",
  },
]

export default function Dashboard() {
  const { t } = useLanguage()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [patients, setPatients] = useState(mockPatients)
  const [activeTab, setActiveTab] = useState("queue")
  const [completedCount, setCompletedCount] = useState(0)

  // Stats for the dashboard
  const stats = {
    waitingPatients: patients.length,
    averageWaitTime: patients.reduce((acc, patient) => acc + patient.waitTime, 0) / patients.length,
    priorityCases: patients.filter((patient) => patient.priority).length,
    completedToday: completedCount,
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    // Simple mock authentication
    if (username === "clinic" && password === "password") {
      setIsLoggedIn(true)
    } else {
      setLoginError("Invalid username or password")
    }
  }

  const handleComplete = (id: number) => {
    setPatients(patients.filter((patient) => patient.id !== id))
    setCompletedCount((prev) => prev + 1)
  }

  const handlePrioritize = (id: number) => {
    setPatients(patients.map((patient) => (patient.id === id ? { ...patient, priority: !patient.priority } : patient)))
  }

  if (!isLoggedIn) {
    return (
      <div className="container py-12 md:py-24 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t("dashboard.login.title")}</CardTitle>
            <CardDescription>Login to access the clinic dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">{t("dashboard.login.username")}</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("dashboard.login.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                {t("dashboard.login.submit")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">Demo credentials: username: clinic, password: password</p>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">{t("dashboard.title")}</h1>
          <p className="text-muted-foreground">Manage your clinic queue and patient flow</p>
        </div>
        <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
          Logout
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardContent className="flex flex-row items-center gap-4 pt-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Waiting Patients</p>
              <h3 className="text-2xl font-bold">{stats.waitingPatients}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center gap-4 pt-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Wait Time</p>
              <h3 className="text-2xl font-bold">{Math.round(stats.averageWaitTime)} min</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center gap-4 pt-6">
            <div className="rounded-full bg-primary/10 p-3">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Priority Cases</p>
              <h3 className="text-2xl font-bold">{stats.priorityCases}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center gap-4 pt-6">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed Today</p>
              <h3 className="text-2xl font-bold">{stats.completedToday}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="queue" value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="queue">Current Queue</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="queue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Queue</CardTitle>
              <CardDescription>Manage the current queue of patients waiting for consultation</CardDescription>
            </CardHeader>
            <CardContent>
              {patients.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground">{t("dashboard.queue.empty")}</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Queue #</TableHead>
                      <TableHead>{t("dashboard.queue.patient")}</TableHead>
                      <TableHead>{t("dashboard.queue.village")}</TableHead>
                      <TableHead>{t("dashboard.queue.waitTime")}</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>{t("dashboard.queue.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient, index) => (
                      <TableRow key={patient.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">
                          {patient.name}
                          <div className="text-xs text-muted-foreground">{patient.mobile}</div>
                        </TableCell>
                        <TableCell>{patient.village}</TableCell>
                        <TableCell>{patient.waitTime} min</TableCell>
                        <TableCell>
                          {patient.priority ? (
                            <Badge variant="destructive">Priority</Badge>
                          ) : (
                            <Badge variant="outline">Regular</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handlePrioritize(patient.id)}>
                              {patient.priority ? "Unprioritize" : t("dashboard.queue.prioritize")}
                            </Button>
                            <Button variant="default" size="sm" onClick={() => handleComplete(patient.id)}>
                              {t("dashboard.queue.complete")}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Queue Analytics
              </CardTitle>
              <CardDescription>View statistics and trends for your clinic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                Analytics Dashboard Placeholder
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Peak Hours</h3>
                  <p className="text-sm text-muted-foreground">Your clinic is busiest between 10:00 AM and 12:00 PM</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Average Consultation</h3>
                  <p className="text-sm text-muted-foreground">Each consultation takes approximately 12 minutes</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Common Reasons</h3>
                  <p className="text-sm text-muted-foreground">
                    Most patients visit for fever, cough, and routine checkups
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
