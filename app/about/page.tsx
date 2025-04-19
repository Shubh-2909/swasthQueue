"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function About() {
  const { t } = useLanguage();

  const teamMembers = [
    {
      name: "Dr. Priya Sharma",
      role: "Founder & Medical Director",
      bio: "Dr. Priya has 15 years of experience in rural healthcare and founded SwasthQueue after witnessing the challenges faced by patients in remote areas.",
      image: "/02.jpg",
    },
    {
      name: "Rahul Verma",
      role: "Technology Lead",
      bio: "Rahul brings expertise in developing simple technology solutions that work in low-connectivity environments.",
      image: "/male-doctor-portrait_1013690-541.avif",
    },
    {
      name: "Anita Desai",
      role: "Community Outreach",
      bio: "Anita works directly with village health workers to ensure SwasthQueue meets the needs of rural communities.",
      image:
        "/indian-female-doctor-portrait-indian-female-doctor_890100-1237.avif",
    },
    {
      name: "Dr. Vikram Singh",
      role: "Healthcare Advisor",
      bio: "Dr. Vikram provides guidance on healthcare workflows and patient management best practices.",
      image: "/portrait-doctor-12599712.webp",
    },
  ];

  const timeline = [
    {
      year: "2019",
      title: "Problem Identification",
      description:
        "Field research in 12 rural clinics across Rajasthan revealed average wait times of 3-4 hours.",
    },
    {
      year: "2020",
      title: "Concept Development",
      description:
        "Developed the initial concept for a queue management system that works with basic mobile phones.",
    },
    {
      year: "2021",
      title: "Pilot Program",
      description:
        "Launched pilot programs in 3 rural health centers, reducing wait times by 65%.",
    },
    {
      year: "2022",
      title: "Technology Refinement",
      description:
        "Enhanced the system based on feedback, adding IVR support and clinic analytics.",
    },
    {
      year: "2023",
      title: "Expansion",
      description:
        "Expanded to 25 clinics across multiple states, serving over 50,000 patients.",
    },
  ];

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {t("about.title")}
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          {t("about.mission")}
        </p>
      </div>

      <div className="grid gap-12 md:gap-16">
        <section>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Our Story</h2>
              <p className="text-muted-foreground">{t("about.story")}</p>
              <p className="text-muted-foreground">
                Our team spent months in rural health centers, observing the
                challenges faced by both patients and healthcare providers. We
                found that the traditional first-come, first-served system was
                causing significant hardship, especially for those traveling
                from distant villages.
              </p>
              <p className="text-muted-foreground">
                SwasthQueue was designed with simplicity and accessibility in
                mind, ensuring it works even in areas with limited connectivity
                and for users with basic mobile phones.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/istockphoto-1216929615-612x612.jpg"
                width={500}
                height={400}
                alt="Rural healthcare clinic"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-border" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "justify-end" : "justify-start"
                  } md:justify-center`}
                >
                  <Card
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="text-xl font-bold">{item.title}</div>
                          <div className="text-sm text-muted-foreground md:hidden">
                            {item.year}
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">
            {t("about.team.title")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 overflow-hidden rounded-full">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="aspect-square object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">
            Impact
          </h2>
          <Tabs defaultValue="patients">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="patients">For Patients</TabsTrigger>
                <TabsTrigger value="clinics">For Clinics</TabsTrigger>
                <TabsTrigger value="community">For Communities</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="patients">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-center mb-2">65%</h3>
                    <p className="text-center text-muted-foreground">
                      Reduction in wait time at clinics
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-center mb-2">
                      ₹500+
                    </h3>
                    <p className="text-center text-muted-foreground">
                      Average savings in lost wages per visit
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-center mb-2">92%</h3>
                    <p className="text-center text-muted-foreground">
                      Patient satisfaction rate
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="clinics">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-center mb-2">40%</h3>
                    <p className="text-center text-muted-foreground">
                      Increase in patients served per day
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-center mb-2">75%</h3>
                    <p className="text-center text-muted-foreground">
                      Reduction in overcrowding
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-center mb-2">85%</h3>
                    <p className="text-center text-muted-foreground">
                      Staff satisfaction with the system
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="community">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-center mb-2">
                      50K+
                    </h3>
                    <p className="text-center text-muted-foreground">
                      Patients served across rural India
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-center mb-2">25</h3>
                    <p className="text-center text-muted-foreground">
                      Rural health centers using SwasthQueue
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-center mb-2">5</h3>
                    <p className="text-center text-muted-foreground">
                      States with SwasthQueue implementation
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center lg:order-last">
              <Image
                src="/istockphoto-827581056-612x612.jpg"
                width={500}
                height={400}
                alt="Future vision"
                className="rounded-lg object-cover"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">
                Looking Forward
              </h2>
              <p className="text-muted-foreground">
                Our vision is to expand SwasthQueue to 1,000 rural health
                centers across India by 2025, serving over 5 million patients
                annually.
              </p>
              <p className="text-muted-foreground">
                We're developing additional features to support preventive
                healthcare reminders, telemedicine integration, and health
                record management—all designed to work in low-resource settings.
              </p>
              <p className="text-muted-foreground">
                Through partnerships with state governments and NGOs, we aim to
                make efficient healthcare access a reality for every rural
                community in India.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
