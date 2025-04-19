"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Phone, MessageSquare, AlertCircle, CheckCircle2 } from "lucide-react"

export default function JoinQueue() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    village: "",
    mobile: "",
    reason: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [queueNumber, setQueueNumber] = useState<number | null>(null)
  const [waitTime, setWaitTime] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!formData.name || !formData.village || !formData.mobile) {
      setError("Please fill in all required fields")
      return
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number")
      return
    }

    // Simulate queue joining
    // In a real app, this would be an API call
    const randomQueueNumber = Math.floor(Math.random() * 20) + 1
    const randomWaitTime = randomQueueNumber * 15 // 15 minutes per patient

    setQueueNumber(randomQueueNumber)
    setWaitTime(randomWaitTime)
    setSubmitted(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      village: "",
      mobile: "",
      reason: "",
    })
    setSubmitted(false)
    setQueueNumber(null)
    setWaitTime(null)
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("join.title")}</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">{t("join.subtitle")}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div>
          {submitted ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Queue Joined Successfully
                </CardTitle>
                <CardDescription>You have been added to the queue at your local health center</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{queueNumber}</div>
                  <p className="text-sm text-muted-foreground">Your Queue Number</p>
                </div>

                <div className="rounded-lg bg-muted p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {Math.floor(waitTime! / 60)}:{(waitTime! % 60).toString().padStart(2, "0")}
                  </div>
                  <p className="text-sm text-muted-foreground">Estimated Wait Time (Hours:Minutes)</p>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    You will receive an SMS notification when your turn is approaching. Please arrive at the clinic 15
                    minutes before your estimated time.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button onClick={resetForm} className="w-full">
                  Join Another Queue
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{t("join.title")}</CardTitle>
                <CardDescription>{t("join.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name">{t("join.form.name")}</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="village">{t("join.form.village")}</Label>
                    <Input id="village" name="village" value={formData.village} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">{t("join.form.mobile")}</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      pattern="[0-9]{10}"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">{t("join.form.reason")}</Label>
                    <Textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} rows={3} />
                  </div>

                  <Button type="submit" className="w-full">
                    {t("join.form.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Join by Missed Call
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{t("join.alternative")}:</p>
              <div className="rounded-lg bg-muted p-6 text-center">
                <div className="text-2xl font-bold">080-1234-5678</div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                After giving a missed call, you will receive an SMS with your queue number and estimated wait time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Join by SMS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Send an SMS with the following format:</p>
              <div className="rounded-lg bg-muted p-4 font-mono text-sm">JOIN [Your Name] [Village Name]</div>
              <p className="mt-4 text-sm text-muted-foreground">Example: JOIN Ramesh Kumar Alwar</p>
              <p className="mt-2 text-sm text-muted-foreground">Send to: 9876-543-210</p>
            </CardContent>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Need Help?</AlertTitle>
            <AlertDescription>
              If you need assistance joining the queue, please call our helpline at 1800-123-4567 (toll-free).
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
