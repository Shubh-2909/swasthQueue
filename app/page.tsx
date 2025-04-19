"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Phone, MessageSquare } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {t("home.hero.title")}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {t("home.hero.subtitle")}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/join-queue">
                  <Button size="lg" className="w-full min-[400px]:w-auto">
                    {t("home.hero.cta.join")}
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full min-[400px]:w-auto"
                  >
                    {t("home.hero.cta.clinic")}
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="w-full min-[400px]:w-auto"
                  >
                    {t("home.hero.cta.learn")}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/istockphoto-1614147304-612x612.jpg"
                width={500}
                height={400}
                alt="Rural healthcare clinic"
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="w-full py-12 md:py-24 lg:py-32" id="features">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {t("home.problem.title")}
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.problem.description")}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <Image
              src="/Health-Center-1-e1628768272989-649x420.jpg"
              width={500}
              height={400}
              alt="Crowded rural clinic"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">3-4 Hours</h3>
                    <p className="text-muted-foreground">
                      Average wait time at rural clinics, leading to lost wages
                      and productivity
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Overcrowding</h3>
                    <p className="text-muted-foreground">
                      Creates infection risks and uncomfortable waiting
                      conditions
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Unpredictability</h3>
                    <p className="text-muted-foreground">
                      Patients cannot plan their day around clinic visits
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 text-center mt-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {t("home.solution.title")}
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.solution.description")}
              </p>
            </div>
          </div>

          <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Missed Call</h3>
              <p className="text-center text-sm text-muted-foreground">
                Join the queue with a simple missed call - no internet required
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">SMS</h3>
              <p className="text-center text-sm text-muted-foreground">
                Send a text message with your details to secure your place
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Wait Remotely</h3>
              <p className="text-center text-sm text-muted-foreground">
                Receive updates about your position and estimated wait time
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Clinic Dashboard</h3>
              <p className="text-center text-sm text-muted-foreground">
                Staff can manage the queue efficiently with our simple interface
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/how-it-works">
              <Button size="lg" className="gap-2">
                {t("home.hero.cta.learn")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Impact Stories
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See how SwasthQueue is making a difference in rural healthcare
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-background p-6">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">
                  "I used to lose a full day's wages waiting at the clinic. Now
                  I can plan my visit and only spend 30 minutes at the center."
                </p>
                <p className="font-semibold">- Ramesh, Farmer from Rajasthan</p>
              </div>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">
                  "Our clinic now serves 40% more patients each day with the
                  same staff. The waiting room is no longer overcrowded."
                </p>
                <p className="font-semibold">- Dr. Priya, Medical Officer</p>
              </div>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">
                  "As a community health worker, I can now help elderly patients
                  join the queue remotely using just a phone call."
                </p>
                <p className="font-semibold">- Sunita, ASHA Worker</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to reduce wait times?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of patients and clinics already using SwasthQueue
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/join-queue">
                <Button size="lg" className="w-full min-[400px]:w-auto">
                  {t("home.hero.cta.join")}
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full min-[400px]:w-auto"
                >
                  {t("home.hero.cta.clinic")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
