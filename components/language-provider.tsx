"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.howItWorks": "How It Works",
    "nav.joinQueue": "Join Queue",
    "nav.dashboard": "Clinic Dashboard",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.resources": "Resources",

    // Home page
    "home.hero.title": "Reducing Clinic Wait Time in Rural India",
    "home.hero.subtitle": "A digital queue management system designed for rural healthcare centers",
    "home.hero.cta.join": "Join Queue",
    "home.hero.cta.clinic": "For Clinics",
    "home.hero.cta.learn": "Learn More",
    "home.problem.title": "The Problem",
    "home.problem.description":
      "Long wait times at rural clinics lead to lost wages, overcrowding, and poor healthcare experiences.",
    "home.solution.title": "Our Solution",
    "home.solution.description":
      "SwasthQueue allows patients to join a virtual queue through SMS, missed calls, or IVR, reducing physical wait times at clinics.",

    // How it works
    "how.patients.title": "For Patients",
    "how.patients.step1": "Send an SMS or give a missed call to join the queue",
    "how.patients.step2": "Receive your queue number and estimated wait time",
    "how.patients.step3": "Get notifications as your turn approaches",
    "how.patients.step4": "Arrive at the clinic just before your turn",
    "how.staff.title": "For Clinic Staff",
    "how.staff.step1": "Log in to the dashboard to view the queue",
    "how.staff.step2": "Manage patient priority based on urgency",
    "how.staff.step3": "Mark consultations as complete",
    "how.staff.step4": "View daily statistics and improve efficiency",
    "how.faq.title": "Frequently Asked Questions",

    // Join Queue
    "join.title": "Join the Queue",
    "join.subtitle": "Enter your details to join the virtual queue",
    "join.form.name": "Full Name",
    "join.form.village": "Village",
    "join.form.mobile": "Mobile Number",
    "join.form.reason": "Reason for Visit (Optional)",
    "join.form.submit": "Join Queue",
    "join.alternative": "Alternatively, give a missed call to",
    "join.confirmation": "You will receive an SMS confirmation with your queue number",

    // Dashboard
    "dashboard.title": "Clinic Dashboard",
    "dashboard.login.title": "Staff Login",
    "dashboard.login.username": "Username",
    "dashboard.login.password": "Password",
    "dashboard.login.submit": "Login",
    "dashboard.queue.title": "Current Queue",
    "dashboard.queue.empty": "No patients in queue",
    "dashboard.queue.patient": "Patient",
    "dashboard.queue.village": "Village",
    "dashboard.queue.waitTime": "Wait Time",
    "dashboard.queue.actions": "Actions",
    "dashboard.queue.complete": "Complete",
    "dashboard.queue.prioritize": "Prioritize",

    // About
    "about.title": "Our Mission",
    "about.mission":
      "To reduce wait times and improve healthcare access in rural India through simple technology solutions.",
    "about.story":
      "SwasthQueue was born from field research in rural clinics where patients often wait 3-4 hours for a 10-minute consultation.",
    "about.impact":
      "Our pilot programs have reduced average wait times by 65% and improved patient satisfaction scores.",
    "about.team.title": "Our Team",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "We'd love to hear from you",
    "contact.form.name": "Your Name",
    "contact.form.contact": "Email or Mobile",
    "contact.form.message": "Your Message",
    "contact.form.type": "How can we help?",
    "contact.form.submit": "Send Message",
    "contact.thankyou": "Thank you for your message. We'll get back to you soon.",

    // Resources
    "resources.title": "Offline Resources",
    "resources.subtitle": "Download materials for low-connectivity areas",
    "resources.posters": "Clinic Posters",
    "resources.guides": "User Guides",
    "resources.audio": "IVR Audio Samples",
    "resources.download": "Download",

    // Footer
    "footer.rights": "All rights reserved",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Use",
  },
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.howItWorks": "यह कैसे काम करता है",
    "nav.joinQueue": "कतार में शामिल हों",
    "nav.dashboard": "क्लिनिक डैशबोर्ड",
    "nav.about": "हमारे बारे में",
    "nav.contact": "संपर्क करें",
    "nav.resources": "संसाधन",

    // Home page
    "home.hero.title": "ग्रामीण भारत में क्लिनिक प्रतीक्षा समय कम करना",
    "home.hero.subtitle": "ग्रामीण स्वास्थ्य केंद्रों के लिए डिज़ाइन की गई एक डिजिटल कतार प्रबंधन प्रणाली",
    "home.hero.cta.join": "कतार में शामिल हों",
    "home.hero.cta.clinic": "क्लिनिक के लिए",
    "home.hero.cta.learn": "अधिक जानें",
    "home.problem.title": "समस्या",
    "home.problem.description":
      "ग्रामीण क्लिनिकों में लंबे इंतजार के समय से मजदूरी का नुकसान, भीड़भाड़ और खराब स्वास्थ्य देखभाल अनुभव होता है।",
    "home.solution.title": "हमारा समाधान",
    "home.solution.description":
      "स्वस्थक्यू रोगियों को एसएमएस, मिस्ड कॉल या आईवीआर के माध्यम से एक आभासी कतार में शामिल होने की अनुमति देता है, जिससे क्लिनिकों में शारीरिक प्रतीक्षा समय कम हो जाता है।",

    // How it works
    "how.patients.title": "रोगियों के लिए",
    "how.patients.step1": "कतार में शामिल होने के लिए एसएमएस भेजें या मिस्ड कॉल दें",
    "how.patients.step2": "अपना कतार नंबर और अनुमानित प्रतीक्षा समय प्राप्त करें",
    "how.patients.step3": "जैसे ही आपकी बारी आती है, सूचनाएं प्राप्त करें",
    "how.patients.step4": "अपनी बारी से ठीक पहले क्लिनिक पहुंचें",
    "how.staff.title": "क्लिनिक स्टाफ के लिए",
    "how.staff.step1": "कतार देखने के लिए डैशबोर्ड में लॉग इन करें",
    "how.staff.step2": "तत्कालता के आधार पर रोगी प्राथमिकता का प्रबंधन करें",
    "how.staff.step3": "परामर्श को पूर्ण के रूप में चिह्नित करें",
    "how.staff.step4": "दैनिक आंकड़े देखें और दक्षता में सुधार करें",
    "how.faq.title": "अक्सर पूछे जाने वाले प्रश्न",

    // Join Queue
    "join.title": "कतार में शामिल हों",
    "join.subtitle": "आभासी कतार में शामिल होने के लिए अपना विवरण दर्ज करें",
    "join.form.name": "पूरा नाम",
    "join.form.village": "गांव",
    "join.form.mobile": "मोबाइल नंबर",
    "join.form.reason": "आने का कारण (वैकल्पिक)",
    "join.form.submit": "कतार में शामिल हों",
    "join.alternative": "वैकल्पिक रूप से, इस नंबर पर मिस्ड कॉल दें",
    "join.confirmation": "आपको अपने कतार नंबर के साथ एक एसएमएस पुष्टिकरण प्राप्त होगा",

    // Dashboard
    "dashboard.title": "क्लिनिक डैशबोर्ड",
    "dashboard.login.title": "स्टाफ लॉगिन",
    "dashboard.login.username": "उपयोगकर्ता नाम",
    "dashboard.login.password": "पासवर्ड",
    "dashboard.login.submit": "लॉगिन",
    "dashboard.queue.title": "वर्तमान कतार",
    "dashboard.queue.empty": "कतार में कोई रोगी नहीं",
    "dashboard.queue.patient": "रोगी",
    "dashboard.queue.village": "गांव",
    "dashboard.queue.waitTime": "प्रतीक्षा समय",
    "dashboard.queue.actions": "कार्रवाई",
    "dashboard.queue.complete": "पूर्ण",
    "dashboard.queue.prioritize": "प्राथमिकता दें",

    // About
    "about.title": "हमारा मिशन",
    "about.mission":
      "सरल प्रौद्योगिकी समाधानों के माध्यम से ग्रामीण भारत में प्रतीक्षा समय को कम करना और स्वास्थ्य देखभाल पहुंच में सुधार करना।",
    "about.story":
      "स्वस्थक्यू ग्रामीण क्लिनिकों में क्षेत्र अनुसंधान से उत्पन्न हुआ था जहां रोगी अक्सर 10 मिनट के परामर्श के लिए 3-4 घंटे इंतजार करते हैं।",
    "about.impact": "हमारे पायलट कार्यक्रमों ने औसत प्रतीक्षा समय को 65% कम कर दिया है और रोगी संतुष्टि स्कोर में सुधार किया है।",
    "about.team.title": "हमारी टीम",

    // Contact
    "contact.title": "संपर्क करें",
    "contact.subtitle": "हम आपसे सुनना पसंद करेंगे",
    "contact.form.name": "आपका नाम",
    "contact.form.contact": "ईमेल या मोबाइल",
    "contact.form.message": "आपका संदेश",
    "contact.form.type": "हम कैसे मदद कर सकते हैं?",
    "contact.form.submit": "संदेश भेजें",
    "contact.thankyou": "आपके संदेश के लिए धन्यवाद। हम जल्द ही आपसे संपर्क करेंगे।",

    // Resources
    "resources.title": "ऑफलाइन संसाधन",
    "resources.subtitle": "कम कनेक्टिविटी वाले क्षेत्रों के लिए सामग्री डाउनलोड करें",
    "resources.posters": "क्लिनिक पोस्टर",
    "resources.guides": "उपयोगकर्ता गाइड",
    "resources.audio": "आईवीआर ऑडियो नमूने",
    "resources.download": "डाउनलोड",

    // Footer
    "footer.rights": "सर्वाधिकार सुरक्षित",
    "footer.privacy": "गोपनीयता नीति",
    "footer.terms": "उपयोग की शर्तें",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "hi")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}
