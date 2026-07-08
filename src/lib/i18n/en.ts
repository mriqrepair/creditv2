import type { SiteContent } from "./types";

export const en: SiteContent = {
  company: {
    name: "MR. IQ",
    tagline: "Smart Credit Intelligence",
    founder: "Jorge Lopez",
    email: "jlnolimitinfo@gmail.com",
    whatsapp: "+13479255033",
    whatsappDisplay: "(347) 925-5033",
    instagram: "https://www.instagram.com/jl.nolimit/",
    serviceArea: "Nationwide — United States",
    yearsExperience: "10+",
    successRate: "95%",
  },
  navLinks: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Guarantee", href: "/guarantee" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  pricingPlans: [
    {
      name: "Essential",
      price: 79,
      couplesPrice: 119,
      popular: false,
      updateCycle: "60 Day Credit Updates",
      features: [
        "Three-bureau reports and scores",
        "Credit bureau disputes",
        "One-on-one consultations",
        "Score tracker",
        "24/7 access to client portal",
      ],
    },
    {
      name: "Professional",
      price: 99,
      couplesPrice: 149,
      popular: false,
      updateCycle: "45 Day Credit Updates",
      features: [
        "Three-bureau reports and scores",
        "Credit bureau disputes",
        "One-on-one consultations",
        "Score tracker",
        "24/7 access to client portal",
        "Creditor interventions",
        "Credit builder tool",
      ],
    },
    {
      name: "Premium",
      price: 119,
      couplesPrice: 179,
      popular: true,
      updateCycle: "45 Day Credit Updates",
      features: [
        "Three-bureau reports and scores",
        "Credit bureau disputes",
        "One-on-one consultations",
        "Score tracker",
        "24/7 access to client portal",
        "Creditor interventions",
        "Monthly inquiry disputes",
        "Debt validation letters",
        "Cease and desist letters",
        "Personal information correction letters",
        "Credit builder tool",
      ],
    },
  ],
  services: [
    {
      title: "Credit Report Analysis",
      description:
        "Comprehensive review of your credit reports from all three bureaus. We identify errors, inaccuracies, and opportunities for improvement to create a personalized action plan.",
      features: [
        "Detailed credit report review",
        "Error identification",
        "Improvement strategy",
        "Written assessment report",
      ],
    },
    {
      title: "Dispute Services",
      description:
        "Professional dispute letters and follow-up with credit bureaus to remove inaccurate, outdated, or unverifiable information from your credit reports.",
      features: [
        "Professional dispute letters",
        "Bureau correspondence",
        "Progress tracking",
        "Follow-up services",
      ],
    },
    {
      title: "Credit Consultation",
      description:
        "One-on-one consultation sessions to discuss your credit situation, goals, and the best strategies for improving your credit score and overall financial health.",
      features: [
        "Personal consultation",
        "Goal setting",
        "Strategy development",
        "Ongoing support",
      ],
    },
    {
      title: "Financial Advisory",
      description:
        "Expert advice on managing your finances, building positive credit history, and maintaining good credit practices for long-term financial success.",
      features: [
        "Financial planning",
        "Credit building strategies",
        "Debt management advice",
        "Long-term maintenance",
      ],
    },
    {
      title: "Identity Protection",
      description:
        "Comprehensive identity monitoring and protection services to safeguard your personal information and prevent identity theft that could damage your credit.",
      features: [
        "Identity monitoring",
        "Fraud alerts",
        "Dark web scanning",
        "Recovery assistance",
      ],
    },
    {
      title: "Business Credit",
      description:
        "Specialized services for building and improving business credit profiles, helping you secure better financing options for your business growth and expansion.",
      features: [
        "Business credit building",
        "Trade line establishment",
        "Business credit monitoring",
        "Financing guidance",
      ],
    },
  ],
  differentiators: [
    {
      title: "Smarter Disputes",
      description:
        "We identify even the most subtle disputes to leverage all opportunities to clean up your reports and raise your scores.",
    },
    {
      title: "Quicker Pace",
      description:
        "We start fast and keep up the pace. Our industry-leading 45-day dispute cycle is one of the fastest in the industry.",
    },
    {
      title: "Better Value",
      description:
        "You get everything you need for one low monthly payment. No levels or upgrades needed. Say hello to peace of mind.",
    },
  ],
  memberBenefits: [
    { title: "Faster Disputes", detail: "Rapid 45-day dispute cycle" },
    { title: "Custom Disputes", detail: "Tailored to your situation" },
    { title: "Score Assistance", detail: "Strategic score optimization" },
    { title: "Credit Rebuilding", detail: "New account opening help" },
    { title: "Debt Validation", detail: "Challenge and verify debt" },
    { title: "Goodwill Letters", detail: "Make appeal direct to creditor" },
    { title: "Coaches-on-Call", detail: "Sessions on demand" },
  ],
  testimonials: [
    {
      quote:
        "Paid a reasonable charge, sat back, and very quickly I was good as new.",
      author: "Raymond R.",
      source: "Google",
    },
    {
      quote: "This was the best decision ever. A great success!",
      author: "Emma L.",
      source: "Google",
    },
    {
      quote:
        "Jorge helped me understand my credit and gave me a clear path forward. My score improved within the first 45 days.",
      author: "Maria S.",
      source: "Client",
    },
  ],
  faqs: [
    {
      question: "How long does credit repair take?",
      answer:
        "Credit repair timelines vary depending on your specific situation. Most clients see initial results within 30-45 days, with significant improvements typically occurring within 3-6 months. Complex cases may take longer, but we'll provide you with realistic expectations during your consultation.",
    },
    {
      question: "Can you guarantee specific results?",
      answer:
        "While we cannot guarantee specific score increases (as this would be illegal), we have a 95% success rate in helping clients improve their credit. We use proven strategies and will work diligently to achieve the best possible results for your situation.",
    },
    {
      question: "How much does credit repair cost?",
      answer:
        "Our plans start at $79/month with transparent pricing and no hidden fees. We offer a 6-day trial period and flexible couples pricing. Contact us for a free consultation where we'll assess your situation and recommend the best plan.",
    },
    {
      question: "Is credit repair legal?",
      answer:
        "Yes, credit repair is completely legal. The Fair Credit Reporting Act (FCRA) gives you the right to dispute inaccurate, outdated, or unverifiable information on your credit reports. We simply help you exercise these rights more effectively.",
    },
    {
      question: "What's the difference between credit repair and credit counseling?",
      answer:
        "Credit repair focuses on removing negative items from your credit report, while credit counseling typically involves debt management and financial education. We offer both — we can help clean up your credit report AND provide guidance on maintaining good credit going forward.",
    },
    {
      question: "Can I repair my credit myself?",
      answer:
        "Yes, you can dispute items on your credit report yourself. However, professional credit repair services have experience with effective dispute strategies, know how to communicate with bureaus and creditors, and can save you significant time and effort while often achieving better results.",
    },
  ],
  howItWorksSteps: [
    {
      step: 1,
      title: "Sign Up & Get Your Reports",
      description:
        "Enroll in your chosen plan and we'll pull your three-bureau credit reports and scores to establish your baseline.",
    },
    {
      step: 2,
      title: "Personalized Analysis",
      description:
        "Our specialists review every line of your reports, identifying errors, outdated items, and dispute opportunities.",
    },
    {
      step: 3,
      title: "We Dispute on Your Behalf",
      description:
        "We draft and send professional dispute letters to bureaus and creditors, then follow up aggressively on your behalf.",
    },
    {
      step: 4,
      title: "Track Your Progress",
      description:
        "Monitor your score improvements in real time through your 24/7 client portal with regular updates from your specialist.",
    },
  ],
  educationArticles: [
    {
      title: "Recovering From Hard Times",
      description:
        "It is hard to face your credit after a period of financial difficulty, but there is nothing more important. Take these steps and you will find that progress can be quick and very satisfying.",
    },
    {
      title: "How to Deal With a Collector",
      description:
        "The collection industry is far from perfect. Collection accounts are bought and sold. Errors proliferate. Sellers should cease reporting, but rarely do, leaving a trail of duplicate accounts.",
    },
    {
      title: "Managing Your Account Balances",
      description:
        "Credit scores put a lot of weight on the ratio of your credit card balances to their limits. If you really want to see your scores improve you should start reducing your revolving balances.",
    },
  ],
  ui: {
    common: {
      login: "Login",
      getStarted: "Get Started",
      start: "Start",
      howItWorks: "How It Works",
      aboutUs: "About Us",
      joinToday: "Join Today",
      startNow: "Start Now",
      from: "From",
      perMonth: "/ month",
      couples: "Couples",
      month: "month",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Language",
      admin: "Admin",
    },
    footer: {
      description:
        "The smart choice for credit repair. Professional dispute services to help you achieve your financial goals.",
      theProgram: "The Program",
      learn: "Learn",
      getStarted: "Get Started",
      faq: "FAQ",
      aboutUs: "About Us",
      contact: "Contact",
      instagram: "Instagram",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      rightsReserved: "All rights reserved.",
    },
    auth: {
      welcomeBack: "Welcome back",
      createProfile: "Create your profile",
      loginSubtitle: "Sign in to access your credit repair dashboard.",
      signupSubtitle: "Create an account to start your credit repair journey.",
      continueGoogle: "Continue with Google",
      continueApple: "Continue with Apple",
      orEmail: "or email",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      password: "Password",
      pleaseWait: "Please wait...",
      signIn: "Sign In",
      createProfileBtn: "Create Profile",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      createProfileLink: "Create a profile",
      signInLink: "Sign in",
      checkEmail: "Check your email to confirm your account, then sign in.",
    },
    pricing: {
      mostPopular: "Most Popular",
      whatsIncluded: "What's included:",
      couplesLabel: "Couples:",
      showMore: "Show {count} more features",
      showLess: "Show less",
      trialNote: "6-day trial · 90-day guarantee · No contracts",
    },
    checkout: {
      back: "Back",
      perMonth: "/month",
      billedMonthly: "Billed monthly. Cancel anytime.",
      subscription: "Monthly subscription",
      trial: "6-day free trial",
      trialFree: "Free",
      dueToday: "Due today",
      trialChargeNote: "You won't be charged until your trial ends.",
      secureNote: "256-bit SSL encrypted checkout",
      payWithCard: "Pay with card",
      simulatorBadge: "Demo",
      email: "Email",
      couplesPlan: "Couples plan",
      cardInfo: "Card information",
      nameOnCard: "Name on card",
      subscribe: "Subscribe — {amount}/month",
      processing: "Processing…",
      termsNote:
        "By subscribing, you authorize MR. IQ to charge your card monthly after the trial period.",
      poweredBy: "Powered by",
      simulatorNote: "This is a simulated checkout — no real payment is processed.",
      successTitle: "Subscription confirmed",
      successDescription:
        "Your {plan} membership is set up. Complete onboarding to access your client portal.",
      continueOnboarding: "Continue to onboarding",
      close: "Close",
    },
    services: {
      included: "Included in membership",
      whatYouGet: "What you get",
      tabLabels: [
        "Analysis",
        "Disputes",
        "Consult",
        "Advisory",
        "Identity",
        "Business",
      ],
      identityIqTitle: "Credit Monitoring with IdentityIQ",
      identityIqDescription:
        "We recommend IdentityIQ for ongoing credit monitoring and identity protection — real-time monitoring from all three bureaus, identity theft protection, credit score tracking, and dark web monitoring.",
      identityIqButton: "Learn More About IdentityIQ",
      viewPricing: "View Pricing Plans",
    },
    stats: {
      yearsExperience: "Years Experience",
      successRate: "Success Rate",
      bureauCoverage: "Bureau Coverage",
      disputeCycle: "Dispute Cycle",
      yearsDetail: "Trusted financial expertise",
      successDetail: "Clients see real improvement",
      bureauDetail: "Equifax, Experian, TransUnion",
      disputeDetail: "One of the fastest in the industry",
      bureaus: " Bureaus",
      days: " Days",
    },
    memberBenefits: {
      panelTitle: "Everything included — no upgrades ever",
      panelSubtitle: "All {count} member benefits on every plan",
      seeAllServices: "See All Services",
    },
    home: {
      heroTitle: "The Smart Choice for",
      heroTitleAccent: "Fixing Credit",
      heroDescription:
        "The most powerful solution to dispute issues on your credit reports and improve your scores — backed by {years} years of expertise.",
      differenceEyebrow: "Discover the MR. IQ Difference",
      differenceTitle: "Smarter. Faster. Better Value.",
      differenceDescription:
        "Led by Jorge Lopez, your trusted credit repair specialist with a proven track record of helping clients transform their financial lives.",
      ctaTitle: "Sign up and leave the heavy lifting to us.",
      ctaDescription:
        "With a {rate} success rate and personalized strategies for every client, we make credit repair simple and stress-free.",
      pricingEyebrow: "Pricing",
      pricingTitle: "One Membership. Everything Included.",
      pricingDescription:
        "No upgrades needed. Choose the plan that fits your needs and get started with a 6-day trial.",
      benefitsEyebrow: "Our Members Get More",
      benefitsTitle: "No Upgrades Needed",
      aboutEyebrow: "You Are in Good Hands",
      aboutTitle: "Meet {founder}",
      aboutDescription:
        "With over 10 years of experience in the financial industry, Jorge has helped hundreds of clients improve their credit scores and achieve their financial dreams.",
      membershipTitle: "A Membership to Love",
      membershipDescription:
        "If you ever need a break, you may pause, resume, and even select your own billing date with a click. Flexible membership designed around your life.",
      educationEyebrow: "Learn About Credit",
      educationTitle: "Tutorials, Tips & How-To Guides",
      guaranteeTitle: "A Clear Guarantee",
      guaranteeDescription:
        "Get started with confidence. Our service is backed by a condition-free 90-day refund policy.",
      getStartedNow: "Get Started Now",
    },
    pages: {
      services: {
        title: "Our Services",
        description:
          "Comprehensive credit repair solutions tailored to your unique situation. Everything included in your membership.",
      },
      pricing: {
        title: "Simple, Transparent Pricing",
        description:
          "One low monthly payment. Everything you need. No surprise upgrades. Start with a 6-day trial — no charge.",
      },
      faq: {
        title: "Frequently Asked Questions",
        description:
          "Get answers to common questions about credit repair and our services.",
        stillHaveQuestions: "Still Have Questions?",
        stillHaveQuestionsDesc:
          "Contact us for a free consultation where we can discuss your specific situation.",
        freeConsultation: "Free Consultation",
        whatsappUs: "WhatsApp Us",
      },
      howItWorks: {
        title: "How It Works",
        description:
          "A simple, proven process to dispute errors and improve your credit scores.",
      },
      guarantee: {
        title: "Our 90-Day Guarantee",
        description: "Get started with confidence. No strings. No stress.",
      },
      contact: {
        title: "Contact Us",
        description: "We're here to help. Reach out anytime.",
      },
      about: {
        title: "About MR. IQ",
        description: "Meet the team behind your credit repair success.",
        heroEyebrow: "About MR. IQ",
        heroTitle: "Your Trusted Credit Repair Specialist",
        heroDescription:
          "Smart Credit Intelligence — empowering individuals and families to achieve financial freedom.",
        statsTitle: "MR. IQ at a Glance",
        founderTitle: "About Jorge Lopez",
        founderRole: "Founder & Specialist",
        founderBio1:
          "With over 10+ years of experience in the financial industry, Jorge Lopez has helped hundreds of clients improve their credit scores and achieve their financial dreams. His passion for helping people overcome financial challenges drives everything MR. IQ does.",
        founderBio2:
          "Jorge understands that credit issues can be overwhelming and stressful. That's why he provides personalized, compassionate service to guide you through every step of the credit repair process.",
        founderQuote:
          "Everyone deserves a clear path to better credit — and the financial opportunities that come with it.",
        missionTitle: "Our Mission",
        missionText:
          "To empower individuals and families to achieve financial freedom through effective credit repair, education, and ongoing support. We believe everyone deserves a second chance at good credit.",
        visionTitle: "Our Vision",
        visionText:
          "To be the most trusted name in credit repair, helping thousands of people transform their financial lives and secure better opportunities for themselves and their families.",
        valuesTitle: "Why Choose MR. IQ?",
        values: [
          {
            title: "Certified Professional",
            description:
              "Licensed and certified credit repair specialist with deep industry knowledge.",
          },
          {
            title: "Proven Track Record",
            description:
              "95% success rate in improving client credit scores over 10+ years.",
          },
          {
            title: "Transparent Process",
            description:
              "Clear communication and regular progress updates throughout your journey.",
          },
          {
            title: "Personalized Approach",
            description:
              "Customized strategies for each client's unique credit situation and goals.",
          },
        ],
        ctaTitle: "Ready to Transform Your Credit?",
        ctaDescription:
          "Schedule a free consultation and discover how MR. IQ can help you reach your financial goals.",
        freeConsultation: "Free Consultation",
        getStarted: "Get Started",
      },
    },
  },
};
