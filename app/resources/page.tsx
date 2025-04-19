"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Printer, Volume2, Smartphone } from "lucide-react";

export default function Resources() {
  const { t } = useLanguage();

  const posters = [
    {
      title: "Clinic Queue Instructions",
      description: "Step-by-step guide for patients on how to join the queue",
      image: "/placeholder.svg?height=300&width=400",
      downloadUrl: "#",
    },
    {
      title: "SMS and Missed Call Guide",
      description: "Visual guide showing how to use SMS and missed calls",
      image: "/placeholder.svg?height=300&width=400",
      downloadUrl: "#",
    },
    {
      title: "Clinic Waiting Area Poster",
      description: "Information poster for clinic waiting areas",
      image: "/placeholder.svg?height=300&width=400",
      downloadUrl: "#",
    },
  ];

  const guides = [
    {
      title: "Patient User Guide",
      description: "Comprehensive guide for patients on using SwasthQueue",
      icon: FileText,
      downloadUrl: "#",
    },
    {
      title: "Staff Training Manual",
      description: "Training materials for clinic staff",
      icon: FileText,
      downloadUrl: "#",
    },
    {
      title: "Community Health Worker Guide",
      description: "Guide for ASHA workers and community health volunteers",
      icon: FileText,
      downloadUrl: "#",
    },
  ];

  const audioSamples = [
    {
      title: "Queue Joining Instructions",
      description: "Audio instructions for joining the queue via missed call",
      duration: "1:30",
      downloadUrl: "#",
    },
    {
      title: "IVR Menu Navigation",
      description: "Sample of the IVR menu options and navigation",
      duration: "2:15",
      downloadUrl: "#",
    },
    {
      title: "Queue Status Updates",
      description: "Sample of automated queue status update calls",
      duration: "1:45",
      downloadUrl: "#",
    },
  ];

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {t("resources.title")}
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          {t("resources.subtitle")}
        </p>
      </div>

      <Tabs defaultValue="posters" className="space-y-8">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="posters" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              {t("resources.posters")}
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {t("resources.guides")}
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              {t("resources.audio")}
            </TabsTrigger>
            <TabsTrigger value="apps" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Offline Apps
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="posters" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posters.map((poster, index) => (
              <Card key={index} className="overflow-hidden">
                {/* <div className="aspect-[4/3] relative">
                  <Image src={poster.image || "/placeholder.svg"} alt={poster.title} fill className="object-cover" />
                </div> */}
                <CardHeader>
                  <CardTitle>{poster.title}</CardTitle>
                  <CardDescription>{poster.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full gap-2">
                    <Link href={poster.downloadUrl}>
                      <Download className="h-4 w-4" />
                      {t("resources.download")} (PDF)
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Printing Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                For best results, print these posters on A3 or A4 paper. Place
                them in visible locations such as:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Clinic entrance</li>
                <li>Waiting area</li>
                <li>Village community centers</li>
                <li>Local shops and gathering places</li>
              </ul>
              <p className="text-muted-foreground">
                If you need assistance with printing, please contact our support
                team.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="mb-2 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center">
                    <guide.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>PDF, 2.4 MB</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full gap-2">
                    <Link href={guide.downloadUrl}>
                      <Download className="h-4 w-4" />
                      {t("resources.download")}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Multilingual Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                All guides are available in the following languages:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="w-full">
                  English
                </Button>
                <Button variant="outline" className="w-full">
                  हिंदी (Hindi)
                </Button>
                <Button variant="outline" className="w-full">
                  मराठी (Marathi)
                </Button>
                <Button variant="outline" className="w-full">
                  தமிழ் (Tamil)
                </Button>
                <Button variant="outline" className="w-full">
                  తెలుగు (Telugu)
                </Button>
                <Button variant="outline" className="w-full">
                  ಕನ್ನಡ (Kannada)
                </Button>
                <Button variant="outline" className="w-full">
                  বাংলা (Bengali)
                </Button>
                <Button variant="outline" className="w-full">
                  ગુજરાતી (Gujarati)
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {audioSamples.map((sample, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{sample.title}</CardTitle>
                  <CardDescription>{sample.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5" />
                      <span>{sample.duration}</span>
                    </div>
                    <audio controls className="w-full max-w-xs">
                      <source src="#" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full gap-2">
                    <Link href={sample.downloadUrl}>
                      <Download className="h-4 w-4" />
                      {t("resources.download")} (MP3)
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Using Audio Samples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                These audio samples can be used for:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Training community health workers</li>
                <li>Playing at village information sessions</li>
                <li>Broadcasting on local radio</li>
                <li>Sharing via WhatsApp and other messaging platforms</li>
              </ul>
              <p className="text-muted-foreground">
                All audio files are available in multiple languages. Contact us
                if you need additional languages.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apps" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Offline Patient App</CardTitle>
                <CardDescription>
                  A lightweight app that works without continuous internet
                  connection
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  App Screenshot Placeholder
                </div> */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>APK, 8.2 MB</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Works on Android 5.0+ devices with minimal storage
                    requirements
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full gap-2">
                  <Link href="#">
                    <Download className="h-4 w-4" />
                    Download APK
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Offline Clinic Dashboard</CardTitle>
                <CardDescription>
                  For clinic staff to manage queues in low-connectivity areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  Dashboard Screenshot Placeholder
                </div> */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Windows/Mac/Linux, 15.6 MB</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Syncs data when internet is available, works offline when
                    needed
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button asChild className="w-full gap-2">
                  <Link href="#">
                    <Download className="h-4 w-4" />
                    Download for Windows
                  </Link>
                </Button>
                <div className="flex gap-2 w-full">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#">Mac</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#">Linux</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Installation Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-medium">Android App Installation</h3>
              <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                <li>Download the APK file to your device</li>
                <li>
                  Enable "Install from Unknown Sources" in your security
                  settings
                </li>
                <li>Open the APK file and follow the installation prompts</li>
                <li>Launch the app and follow the setup instructions</li>
              </ol>

              <h3 className="font-medium mt-4">
                Desktop Application Installation
              </h3>
              <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                <li>
                  Download the appropriate version for your operating system
                </li>
                <li>Run the installer and follow the prompts</li>
                <li>
                  Launch the application and enter your clinic credentials
                </li>
                <li>
                  Configure offline sync settings based on your connectivity
                </li>
              </ol>

              <p className="mt-4 text-muted-foreground">
                For detailed installation guides or troubleshooting, please
                contact our technical support team.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
