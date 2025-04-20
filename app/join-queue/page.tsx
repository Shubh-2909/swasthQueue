"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Phone,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Mic,
  MicOff,
  Volume2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Import the Speech Recognition library
// Note: In a real implementation, you would install these packages:
// npm install react-speech-recognition regenerator-runtime
// @ts-ignore
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";

export default function JoinQueue() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    village: "",
    mobile: "",
    reason: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [queueNumber, setQueueNumber] = useState<number | null>(null);
  const [waitTime, setWaitTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Voice assistant states
  const [isListening, setIsListening] = useState(false);
  const [voiceStep, setVoiceStep] = useState(0);
  const [voicePrompt, setVoicePrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Speech synthesis ref
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Speech recognition hooks from react-speech-recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Initialize speech synthesis on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Handle voice prompts based on current step
  useEffect(() => {
    if (isListening) {
      const steps = [
        "Please tell me your full name.",
        "What is your village name?",
        "What is the reason for your visit today? This is optional.",
        "Thank you. I will now register you in the queue. Please confirm by saying 'yes' or cancel by saying 'no'.",
      ];

      setVoicePrompt(steps[voiceStep]);
      speak(steps[voiceStep]);
    }
  }, [voiceStep, isListening]);

  // Process transcript when it changes
  useEffect(() => {
    if (isListening && transcript && !isSpeaking && !isProcessing) {
      // Add a small delay to make sure we got the full transcript
      setIsProcessing(true);
      const timer = setTimeout(() => {
        processVoiceInput(transcript);
        resetTranscript();
        setIsProcessing(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [transcript, isSpeaking, isProcessing, isListening]);

  const startVoiceAssistant = () => {
    if (!browserSupportsSpeechRecognition) {
      setError(
        "Your browser doesn't support speech recognition. Please use a modern browser like Chrome."
      );
      return;
    }

    setIsListening(true);
    setVoiceStep(0);
    setFormData({
      name: "",
      village: "",
      mobile: "",
      reason: "",
    });
    resetTranscript();
  };

  const stopVoiceAssistant = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
    resetTranscript();
  };

  // Update the processVoiceInput function
  const processVoiceInput = (input: string) => {
    if (!input || isSpeaking) return;

    const cleanInput = input.trim();
    console.log(`Processing step ${voiceStep}: "${cleanInput}"`);

    // Add a small delay to ensure processing completes
    setIsProcessing(true);

    setTimeout(() => {
      switch (voiceStep) {
        case 0: // Name
          setFormData((prev) => ({ ...prev, name: cleanInput }));
          setVoiceStep(1);
          break;
        case 1: // Village
          setFormData((prev) => ({ ...prev, village: cleanInput }));
          setVoiceStep(2);
          break;
        case 2: // Reason (previously step 3)
          setFormData((prev) => ({ ...prev, reason: cleanInput }));
          setVoiceStep(3);
          break;
        case 3: // Confirmation (previously step 4)
          if (cleanInput.toLowerCase().includes("yes")) {
            handleVoiceSubmit();
          } else if (cleanInput.toLowerCase().includes("no")) {
            speak("Registration cancelled. You can start again when ready.");
            stopVoiceAssistant();
          } else {
            speak("Please say 'yes' to confirm or 'no' to cancel.");
          }
          break;
      }

      setIsProcessing(false);
    }, 500); // Add a small delay
  };

  // Update the useEffect for transcript processing
  useEffect(() => {
    if (isListening && transcript && !isSpeaking && !isProcessing) {
      processVoiceInput(transcript);
      resetTranscript();
    }
  }, [transcript, isSpeaking, isProcessing, isListening]);

  // Update the speak function to properly handle listening state
  const speak = (text: string) => {
    if (synthRef.current) {
      if (synthRef.current.speaking) {
        synthRef.current.cancel();
      }

      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.onend = () => {
        setIsSpeaking(false);
        if (isListening) {
          // Start listening with a small delay
          setTimeout(() => {
            SpeechRecognition.startListening({ continuous: false });
          }, 300);
        }
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      synthRef.current.speak(utterance);
    }
  };

  const handleVoiceSubmit = () => {
    // Generate a random mobile number for backend use
    // In a real app, this would likely be handled differently
    const randomMobile =
      "9" +
      Math.floor(Math.random() * 9000000000 + 1000000000)
        .toString()
        .substring(1);

    // Validate form one more time
    if (!formData.name || !formData.village) {
      speak("I'm missing some required information. Let's start over.");
      setVoiceStep(0);
      return;
    }

    // Set the generated mobile number
    setFormData((prev) => ({ ...prev, mobile: randomMobile }));

    // Simulate queue joining like in the original form
    const randomQueueNumber = Math.floor(Math.random() * 20) + 1;
    const randomWaitTime = randomQueueNumber * 15; // 15 minutes per patient

    setQueueNumber(randomQueueNumber);
    setWaitTime(randomWaitTime);
    setSubmitted(true);

    // Announce the queue number and wait time
    const hours = Math.floor(randomWaitTime / 60);
    const minutes = randomWaitTime % 60;
    const timeString =
      hours > 0
        ? `${hours} hour${hours > 1 ? "s" : ""} and ${minutes} minute${
            minutes !== 1 ? "s" : ""
          }`
        : `${minutes} minute${minutes !== 1 ? "s" : ""}`;

    speak(
      `Thank you. You've been added to the queue. Your queue number is ${randomQueueNumber}. The estimated wait time is ${timeString}. You will need to provide your mobile number at the reception desk.`
    );

    // Stop the voice assistant
    stopVoiceAssistant();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form
    if (!formData.name || !formData.village || !formData.mobile) {
      setError("Please fill in all required fields");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    // Simulate queue joining
    // In a real app, this would be an API call
    const randomQueueNumber = Math.floor(Math.random() * 20) + 1;
    const randomWaitTime = randomQueueNumber * 15; // 15 minutes per patient

    setQueueNumber(randomQueueNumber);
    setWaitTime(randomWaitTime);
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      village: "",
      mobile: "",
      reason: "",
    });
    setSubmitted(false);
    setQueueNumber(null);
    setWaitTime(null);
  };

  // Helper for speech recognition browser support warning
  const VoiceNotSupported = () => (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Voice Assistant Not Available</AlertTitle>
      <AlertDescription>
        Your browser doesn't support speech recognition. Please use a modern
        browser like Chrome or Edge.
      </AlertDescription>
    </Alert>
  );

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {t("join.title")}
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          {t("join.subtitle")}
        </p>
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
                <CardDescription>
                  You have been added to the queue at your local health center
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {queueNumber}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your Queue Number
                  </p>
                </div>

                <div className="rounded-lg bg-muted p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {Math.floor(waitTime! / 60)}:
                    {(waitTime! % 60).toString().padStart(2, "0")}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Estimated Wait Time (Hours:Minutes)
                  </p>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    You will receive an SMS notification when your turn is
                    approaching. Please arrive at the clinic 15 minutes before
                    your estimated time.
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
            <Tabs defaultValue="form">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="form">Manual Entry</TabsTrigger>
                <TabsTrigger value="voice">Voice Assistant</TabsTrigger>
              </TabsList>

              <TabsContent value="form">
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
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="village">
                          {t("join.form.village")}
                        </Label>
                        <Input
                          id="village"
                          name="village"
                          value={formData.village}
                          onChange={handleChange}
                          required
                        />
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
                        <Textarea
                          id="reason"
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          rows={3}
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        {t("join.form.submit")}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="voice">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mic className="h-5 w-5" />
                      Voice Assistant
                    </CardTitle>
                    <CardDescription>
                      Use voice commands to join the queue without typing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {!browserSupportsSpeechRecognition ? (
                      <VoiceNotSupported />
                    ) : isListening ? (
                      <>
                        <Alert
                          className={`${
                            isSpeaking
                              ? "bg-blue-100 border-blue-500"
                              : "bg-primary/10 border-primary"
                          }`}
                        >
                          {isSpeaking ? (
                            <Volume2 className="h-4 w-4 text-blue-500 animate-pulse" />
                          ) : (
                            <Mic className="h-4 w-4 text-primary animate-pulse" />
                          )}
                          <AlertTitle>
                            {isSpeaking
                              ? "System Speaking"
                              : "Voice Assistant Active"}
                          </AlertTitle>
                          <AlertDescription>{voicePrompt}</AlertDescription>
                        </Alert>

                        <div className="space-y-4">
                          <Progress
                            value={(voiceStep / 3) * 100}
                            className="h-2"
                          />
                          <p className="text-sm text-center">
                            Step {voiceStep + 1} of 4
                          </p>
                        </div>

                        <div className="rounded-lg bg-muted p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Name:</span>
                              <span
                                className={`font-medium ${
                                  voiceStep > 0 ? "text-green-600" : ""
                                }`}
                              >
                                {formData.name || "Not provided yet"}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Village:</span>
                              <span
                                className={`font-medium ${
                                  voiceStep > 1 ? "text-green-600" : ""
                                }`}
                              >
                                {formData.village || "Not provided yet"}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Mobile:</span>
                              <span className="font-medium">
                                Will be collected at reception
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Reason:</span>
                              <span
                                className={`font-medium ${
                                  voiceStep > 2 ? "text-green-600" : ""
                                }`}
                              >
                                {formData.reason || "Not provided yet"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg bg-muted p-4">
                          <p className="text-sm font-medium mb-1">I heard:</p>
                          <p className="text-sm italic">
                            {transcript || "Waiting for your response..."}
                          </p>
                        </div>

                        <Button
                          variant="destructive"
                          onClick={stopVoiceAssistant}
                          className="w-full flex items-center gap-2"
                        >
                          <MicOff className="h-4 w-4" />
                          Stop Voice Assistant
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                            <Mic className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">
                              Join Queue Using Voice
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Our voice assistant will guide you through the
                              process step by step
                            </p>
                          </div>
                        </div>

                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>How it works</AlertTitle>
                          <AlertDescription>
                            <ol className="list-decimal pl-4 space-y-1 text-sm">
                              <li>Click the button below to start</li>
                              <li>
                                The assistant will ask for your information one
                                by one
                              </li>
                              <li>Speak clearly after each question</li>
                              <li>Review and confirm your information</li>
                              <li>
                                Your mobile number will be collected at
                                reception
                              </li>
                            </ol>
                          </AlertDescription>
                        </Alert>

                        {error && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        <Button
                          onClick={startVoiceAssistant}
                          className="w-full flex items-center gap-2"
                        >
                          <Mic className="h-4 w-4" />
                          Start Voice Assistant
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
                After giving a missed call, you will receive an SMS with your
                queue number and estimated wait time.
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
              <div className="rounded-lg bg-muted p-4 font-mono text-sm">
                JOIN [Your Name] [Village Name]
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Example: JOIN Ramesh Kumar Alwar
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Send to: 9876-543-210
              </p>
            </CardContent>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Need Help?</AlertTitle>
            <AlertDescription>
              If you need assistance joining the queue, please call our helpline
              at 1800-123-4567 (toll-free).
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
