"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { Phone, MessageSquare, Bell, Clock, User, ListChecks, BarChart, AlertTriangle } from "lucide-react"

export default function HowItWorks() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("patients")

  const faqs = [
    {
      question: "Do I need a smartphone to use SwasthQueue?",
      answer: "No, SwasthQueue works with any basic phone. You can join the queue with a missed call or SMS.",
    },
    {
      question: "What if I don't receive the confirmation SMS?",
      answer:
        "You can call our helpline number or visit the clinic directly. The staff can check your status and add you to the queue.",
    },
    {
      question: "Can I join the queue for someone else?",
      answer: "Yes, you can join the queue on behalf of family members or others by providing their details.",
    },
    {
      question: "What happens if I miss my turn?",
      answer:
        "If you miss your turn, you will be moved to the end of the queue. You'll receive a notification with your new position.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we only collect essential information needed for queue management. Your data is securely stored and not shared with third parties.",
    },
    {
      question: "How does the clinic prioritize emergency cases?",
      answer: "Clinics can mark cases as urgent in the dashboard, which automatically prioritizes them in the queue.",
    },
  ]

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("nav.howItWorks")}</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          SwasthQueue makes healthcare more accessible by reducing wait times at rural clinics
        </p>
      </div>

      <Tabs defaultValue="patients" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="patients">{t("how.patients.title")}</TabsTrigger>
            <TabsTrigger value="staff">{t("how.staff.title")}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="patients" className="space-y-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex flex-col items-center pt-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">{t("how.patients.step1")}</h3>
                <p className="text-sm text-muted-foreground">
                  Give a missed call to our number or send an SMS with your name and village
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center pt-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">{t("how.patients.step2")}</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive an SMS with your queue number and estimated wait time
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center pt-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">{t("how.patients.step3")}</h3>
                <p className="text-sm text-muted-foreground">
                  We'll send you updates as your turn approaches so you know when to arrive
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center pt-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">{t("how.patients.step4")}</h3>
                <p className="text-sm text-muted-foreground">
                  Arrive at the clinic just before your turn to minimize waiting time
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tighter mb-6 text-center">{t("how.faq.title")}</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex flex-col items-center pt-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">{t("how.staff.step1")}</h3>
                <p className="text-sm text-muted-foreground">
                  Access the dashboard with your clinic credentials to view and manage the queue
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center pt-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">{t("how.staff.step2")}</h3>
                <p className="text-sm text-muted-foreground">
                  Prioritize urgent cases with a simple click to move them up in the queue
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center pt-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <ListChecks className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">{t("how.staff.step3")}</h3>
                <p className="text-sm text-muted-foreground">
                  Mark consultations as complete to automatically call the next patient
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center pt-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">{t("how.staff.step4")}</h3>
                <p className="text-sm text-muted-foreground">
                  Access analytics to understand patient flow and improve clinic efficiency
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tighter mb-6 text-center">Staff Training Resources</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-2">Dashboard Tutorial</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    A step-by-step guide to using the clinic dashboard
                  </p>
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    Video Tutorial Placeholder
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-2">Queue Management Guide</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Best practices for managing patient flow efficiently
                  </p>
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    Guide Placeholder
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
