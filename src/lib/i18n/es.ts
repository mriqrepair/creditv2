import type { SiteContent } from "./types";

export const es: SiteContent = {
  company: {
    name: "MR. IQ",
    tagline: "Inteligencia Crediticia Inteligente",
    founder: "Jorge Lopez",
    email: "jlnolimitinfo@gmail.com",
    whatsapp: "+13479255033",
    whatsappDisplay: "(347) 925-5033",
    instagram: "https://www.instagram.com/jl.nolimit/",
    serviceArea: "A nivel nacional — Estados Unidos",
    yearsExperience: "10+",
    successRate: "95%",
  },
  navLinks: [
    { label: "Cómo Funciona", href: "/how-it-works" },
    { label: "Servicios", href: "/services" },
    { label: "Precios", href: "/pricing" },
    { label: "Garantía", href: "/guarantee" },
    { label: "Nosotros", href: "/about" },
    { label: "Preguntas", href: "/faq" },
    { label: "Contacto", href: "/contact" },
  ],
  pricingPlans: [
    {
      name: "Esencial",
      price: 79,
      couplesPrice: 119,
      popular: false,
      updateCycle: "Actualizaciones cada 60 días",
      features: [
        "Informes y puntajes de las tres agencias",
        "Disputas con agencias de crédito",
        "Consultas personalizadas",
        "Seguimiento de puntaje",
        "Acceso 24/7 al portal del cliente",
      ],
    },
    {
      name: "Profesional",
      price: 99,
      couplesPrice: 149,
      popular: false,
      updateCycle: "Actualizaciones cada 45 días",
      features: [
        "Informes y puntajes de las tres agencias",
        "Disputas con agencias de crédito",
        "Consultas personalizadas",
        "Seguimiento de puntaje",
        "Acceso 24/7 al portal del cliente",
        "Intervenciones con acreedores",
        "Herramienta para construir crédito",
      ],
    },
    {
      name: "Premium",
      price: 119,
      couplesPrice: 179,
      popular: true,
      updateCycle: "Actualizaciones cada 45 días",
      features: [
        "Informes y puntajes de las tres agencias",
        "Disputas con agencias de crédito",
        "Consultas personalizadas",
        "Seguimiento de puntaje",
        "Acceso 24/7 al portal del cliente",
        "Intervenciones con acreedores",
        "Disputas mensuales de consultas",
        "Cartas de validación de deuda",
        "Cartas de cese y desistimiento",
        "Cartas de corrección de información personal",
        "Herramienta para construir crédito",
      ],
    },
  ],
  services: [
    {
      title: "Análisis de Informe de Crédito",
      description:
        "Revisión integral de sus informes de crédito de las tres agencias. Identificamos errores, inexactitudes y oportunidades de mejora para crear un plan de acción personalizado.",
      features: [
        "Revisión detallada del informe de crédito",
        "Identificación de errores",
        "Estrategia de mejora",
        "Informe de evaluación por escrito",
      ],
    },
    {
      title: "Servicios de Disputa",
      description:
        "Cartas de disputa profesionales y seguimiento con las agencias de crédito para eliminar información inexacta, desactualizada o no verificable de sus informes.",
      features: [
        "Cartas de disputa profesionales",
        "Correspondencia con agencias",
        "Seguimiento del progreso",
        "Servicios de seguimiento",
      ],
    },
    {
      title: "Consulta de Crédito",
      description:
        "Sesiones de consulta personalizadas para analizar su situación crediticia, metas y las mejores estrategias para mejorar su puntaje y salud financiera.",
      features: [
        "Consulta personal",
        "Establecimiento de metas",
        "Desarrollo de estrategia",
        "Apoyo continuo",
      ],
    },
    {
      title: "Asesoría Financiera",
      description:
        "Asesoramiento experto para administrar sus finanzas, construir historial crediticio positivo y mantener buenas prácticas a largo plazo.",
      features: [
        "Planificación financiera",
        "Estrategias para construir crédito",
        "Asesoría en manejo de deudas",
        "Mantenimiento a largo plazo",
      ],
    },
    {
      title: "Protección de Identidad",
      description:
        "Servicios integrales de monitoreo y protección de identidad para resguardar su información personal y prevenir el robo de identidad.",
      features: [
        "Monitoreo de identidad",
        "Alertas de fraude",
        "Escaneo en la dark web",
        "Asistencia de recuperación",
      ],
    },
    {
      title: "Crédito Empresarial",
      description:
        "Servicios especializados para construir y mejorar perfiles de crédito empresarial, ayudándole a obtener mejores opciones de financiamiento.",
      features: [
        "Construcción de crédito empresarial",
        "Establecimiento de líneas comerciales",
        "Monitoreo de crédito empresarial",
        "Orientación de financiamiento",
      ],
    },
  ],
  differentiators: [
    {
      title: "Disputas Más Inteligentes",
      description:
        "Identificamos incluso las disputas más sutiles para aprovechar todas las oportunidades de limpiar sus informes y subir sus puntajes.",
    },
    {
      title: "Ritmo Más Rápido",
      description:
        "Empezamos rápido y mantenemos el ritmo. Nuestro ciclo de disputa de 45 días es uno de los más rápidos de la industria.",
    },
    {
      title: "Mejor Valor",
      description:
        "Obtiene todo lo que necesita con un solo pago mensual bajo. Sin niveles ni actualizaciones. Dígale adiós al estrés.",
    },
  ],
  memberBenefits: [
    { title: "Disputas Más Rápidas", detail: "Ciclo de disputa de 45 días" },
    { title: "Disputas Personalizadas", detail: "Adaptadas a su situación" },
    { title: "Asistencia de Puntaje", detail: "Optimización estratégica" },
    { title: "Reconstrucción de Crédito", detail: "Ayuda para abrir cuentas" },
    { title: "Validación de Deuda", detail: "Desafiar y verificar deudas" },
    { title: "Cartas de Buena Voluntad", detail: "Apelación directa al acreedor" },
    { title: "Coaches Disponibles", detail: "Sesiones bajo demanda" },
  ],
  testimonials: [
    {
      quote:
        "Pagó un cargo razonable, se sentó y muy rápidamente quedé como nuevo.",
      author: "Raymond R.",
      source: "Google",
    },
    {
      quote: "Esta fue la mejor decisión. ¡Un gran éxito!",
      author: "Emma L.",
      source: "Google",
    },
    {
      quote:
        "Jorge me ayudó a entender mi crédito y me dio un camino claro. Mi puntaje mejoró en los primeros 45 días.",
      author: "Maria S.",
      source: "Cliente",
    },
  ],
  faqs: [
    {
      question: "¿Cuánto tiempo toma la reparación de crédito?",
      answer:
        "Los tiempos varían según su situación. La mayoría de los clientes ven resultados iniciales en 30-45 días, con mejoras significativas en 3-6 meses. Los casos complejos pueden tomar más tiempo, pero le daremos expectativas realistas durante su consulta.",
    },
    {
      question: "¿Pueden garantizar resultados específicos?",
      answer:
        "No podemos garantizar aumentos específicos de puntaje (sería ilegal), pero tenemos una tasa de éxito del 95% ayudando a clientes a mejorar su crédito. Usamos estrategias comprobadas y trabajamos diligentemente por los mejores resultados.",
    },
    {
      question: "¿Cuánto cuesta la reparación de crédito?",
      answer:
        "Nuestros planes comienzan en $79/mes con precios transparentes y sin cargos ocultos. Ofrecemos un período de prueba de 6 días y precios flexibles para parejas. Contáctenos para una consulta gratuita.",
    },
    {
      question: "¿Es legal la reparación de crédito?",
      answer:
        "Sí, la reparación de crédito es completamente legal. La Ley de Informes de Crédito Justos (FCRA) le da derecho a disputar información inexacta, desactualizada o no verificable. Nosotros le ayudamos a ejercer esos derechos de manera más efectiva.",
    },
    {
      question: "¿Cuál es la diferencia entre reparación de crédito y asesoría crediticia?",
      answer:
        "La reparación de crédito se enfoca en eliminar elementos negativos de su informe, mientras que la asesoría crediticia involucra manejo de deudas y educación financiera. Ofrecemos ambos servicios.",
    },
    {
      question: "¿Puedo reparar mi crédito yo mismo?",
      answer:
        "Sí, puede disputar elementos usted mismo. Sin embargo, los servicios profesionales tienen experiencia con estrategias efectivas, saben comunicarse con agencias y acreedores, y pueden ahorrarle tiempo mientras logran mejores resultados.",
    },
  ],
  howItWorksSteps: [
    {
      step: 1,
      title: "Regístrese y Obtenga Sus Informes",
      description:
        "Inscríbase en su plan elegido y obtendremos sus informes y puntajes de las tres agencias para establecer su línea base.",
    },
    {
      step: 2,
      title: "Análisis Personalizado",
      description:
        "Nuestros especialistas revisan cada línea de sus informes, identificando errores, elementos desactualizados y oportunidades de disputa.",
    },
    {
      step: 3,
      title: "Disputamos en Su Nombre",
      description:
        "Redactamos y enviamos cartas de disputa profesionales a agencias y acreedores, y hacemos seguimiento agresivo en su nombre.",
    },
    {
      step: 4,
      title: "Siga Su Progreso",
      description:
        "Monitoree las mejoras de su puntaje en tiempo real a través de su portal de cliente 24/7 con actualizaciones regulares.",
    },
  ],
  educationArticles: [
    {
      title: "Recuperarse de Tiempos Difíciles",
      description:
        "Es difícil enfrentar su crédito después de dificultades financieras, pero no hay nada más importante. Siga estos pasos y verá que el progreso puede ser rápido y muy satisfactorio.",
    },
    {
      title: "Cómo Tratar con un Cobrador",
      description:
        "La industria de cobranza está lejos de ser perfecta. Las cuentas de cobro se compran y venden. Los errores proliferan. Los vendedores deberían dejar de reportar, pero rara vez lo hacen.",
    },
    {
      title: "Administrar los Saldos de Sus Cuentas",
      description:
        "Los puntajes de crédito dan mucho peso a la relación entre los saldos de sus tarjetas y sus límites. Si quiere ver mejoras, comience a reducir sus saldos revolving.",
    },
  ],
  ui: {
    common: {
      login: "Iniciar Sesión",
      getStarted: "Comenzar",
      start: "Iniciar",
      howItWorks: "Cómo Funciona",
      aboutUs: "Nosotros",
      joinToday: "Únase Hoy",
      startNow: "Comenzar Ahora",
      from: "Desde",
      perMonth: "/ mes",
      couples: "Parejas",
      month: "mes",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      language: "Idioma",
      admin: "Admin",
    },
    footer: {
      description:
        "La opción inteligente para reparación de crédito. Servicios profesionales de disputa para ayudarle a alcanzar sus metas financieras.",
      theProgram: "El Programa",
      learn: "Aprender",
      getStarted: "Comenzar",
      faq: "Preguntas",
      aboutUs: "Nosotros",
      contact: "Contacto",
      instagram: "Instagram",
      privacyPolicy: "Política de Privacidad",
      termsOfService: "Términos de Servicio",
      rightsReserved: "Todos los derechos reservados.",
    },
    auth: {
      welcomeBack: "Bienvenido de nuevo",
      createProfile: "Cree su perfil",
      loginSubtitle: "Inicie sesión para acceder a su panel de reparación de crédito.",
      signupSubtitle: "Cree una cuenta para comenzar su camino de reparación de crédito.",
      continueGoogle: "Continuar con Google",
      continueApple: "Continuar con Apple",
      orEmail: "o correo electrónico",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo electrónico",
      password: "Contraseña",
      pleaseWait: "Por favor espere...",
      signIn: "Iniciar Sesión",
      createProfileBtn: "Crear Perfil",
      noAccount: "¿No tiene una cuenta?",
      hasAccount: "¿Ya tiene una cuenta?",
      createProfileLink: "Crear un perfil",
      signInLink: "Iniciar sesión",
      checkEmail: "Revise su correo para confirmar su cuenta y luego inicie sesión.",
    },
    pricing: {
      mostPopular: "Popular",
      whatsIncluded: "Qué incluye:",
      couplesLabel: "Parejas:",
      showMore: "Mostrar {count} características más",
      showLess: "Mostrar menos",
      trialNote: "Prueba de 6 días · Garantía de 90 días · Sin contratos",
    },
    checkout: {
      back: "Volver",
      perMonth: "/mes",
      billedMonthly: "Facturación mensual. Cancele cuando quiera.",
      subscription: "Suscripción mensual",
      trial: "Prueba gratis de 6 días",
      trialFree: "Gratis",
      dueToday: "Total hoy",
      trialChargeNote: "No se le cobrará hasta que termine la prueba.",
      secureNote: "Checkout cifrado SSL de 256 bits",
      payWithCard: "Pagar con tarjeta",
      simulatorBadge: "Demo",
      email: "Correo electrónico",
      couplesPlan: "Plan para parejas",
      cardInfo: "Información de la tarjeta",
      nameOnCard: "Nombre en la tarjeta",
      subscribe: "Suscribirse — {amount}/mes",
      processing: "Procesando…",
      termsNote:
        "Al suscribirse, autoriza a MR. IQ a cargar su tarjeta mensualmente después del período de prueba.",
      poweredBy: "Con tecnología de",
      simulatorNote: "Este es un checkout simulado — no se procesa ningún pago real.",
      successTitle: "Suscripción confirmada",
      successDescription:
        "Su membresía {plan} está configurada. Complete el registro para acceder a su portal.",
      continueOnboarding: "Continuar al registro",
      close: "Cerrar",
    },
    services: {
      included: "Incluido en la membresía",
      whatYouGet: "Lo que obtiene",
      tabLabels: [
        "Análisis",
        "Disputas",
        "Consulta",
        "Asesoría",
        "Identidad",
        "Empresa",
      ],
      identityIqTitle: "Monitoreo de Crédito con IdentityIQ",
      identityIqDescription:
        "Recomendamos IdentityIQ para monitoreo continuo de crédito y protección de identidad — monitoreo en tiempo real de las tres agencias, protección contra robo de identidad, seguimiento de puntaje y monitoreo de la dark web.",
      identityIqButton: "Más Información sobre IdentityIQ",
      viewPricing: "Ver Planes de Precios",
    },
    stats: {
      yearsExperience: "Años de Experiencia",
      successRate: "Tasa de Éxito",
      bureauCoverage: "Cobertura de Agencias",
      disputeCycle: "Ciclo de Disputa",
      yearsDetail: "Experiencia financiera de confianza",
      successDetail: "Clientes ven mejoras reales",
      bureauDetail: "Equifax, Experian, TransUnion",
      disputeDetail: "Uno de los más rápidos de la industria",
      bureaus: " Agencias",
      days: " Días",
    },
    memberBenefits: {
      panelTitle: "Todo incluido — sin actualizaciones",
      panelSubtitle: "Los {count} beneficios en cada plan",
      seeAllServices: "Ver Todos los Servicios",
    },
    home: {
      heroTitle: "La Opción Inteligente para",
      heroTitleAccent: "Reparar su Crédito",
      heroDescription:
        "La solución más poderosa para disputar problemas en sus informes de crédito y mejorar sus puntajes — respaldada por {years} años de experiencia.",
      differenceEyebrow: "Descubra la Diferencia MR. IQ",
      differenceTitle: "Más Inteligente. Más Rápido. Mejor Valor.",
      differenceDescription:
        "Liderado por Jorge Lopez, su especialista de confianza en reparación de crédito con un historial comprobado de transformar vidas financieras.",
      ctaTitle: "Regístrese y déjenos el trabajo pesado.",
      ctaDescription:
        "Con una tasa de éxito del {rate} y estrategias personalizadas, hacemos la reparación de crédito simple y sin estrés.",
      pricingEyebrow: "Precios",
      pricingTitle: "Una Membresía. Todo Incluido.",
      pricingDescription:
        "Sin actualizaciones necesarias. Elija el plan que se adapte a sus necesidades y comience con una prueba de 6 días.",
      benefitsEyebrow: "Nuestros Miembros Obtienen Más",
      benefitsTitle: "Sin Actualizaciones Necesarias",
      aboutEyebrow: "Está en Buenas Manos",
      aboutTitle: "Conozca a {founder}",
      aboutDescription:
        "Con más de 10 años de experiencia en la industria financiera, Jorge ha ayudado a cientos de clientes a mejorar sus puntajes y alcanzar sus sueños financieros.",
      membershipTitle: "Una Membresía para Amar",
      membershipDescription:
        "Si necesita un descanso, puede pausar, reanudar e incluso seleccionar su fecha de facturación con un clic. Membresía flexible diseñada para su vida.",
      educationEyebrow: "Aprenda Sobre el Crédito",
      educationTitle: "Tutoriales, Consejos y Guías",
      guaranteeTitle: "Una Garantía Clara",
      guaranteeDescription:
        "Comience con confianza. Nuestro servicio está respaldado por una política de reembolso de 90 días sin condiciones.",
      getStartedNow: "Comenzar Ahora",
    },
    pages: {
      services: {
        title: "Nuestros Servicios",
        description:
          "Soluciones integrales de reparación de crédito adaptadas a su situación. Todo incluido en su membresía.",
      },
      pricing: {
        title: "Precios Simples y Transparentes",
        description:
          "Un solo pago mensual bajo. Todo lo que necesita. Sin actualizaciones sorpresa. Comience con una prueba de 6 días — sin cargo.",
      },
      faq: {
        title: "Preguntas Frecuentes",
        description:
          "Obtenga respuestas a preguntas comunes sobre reparación de crédito y nuestros servicios.",
        stillHaveQuestions: "¿Aún Tiene Preguntas?",
        stillHaveQuestionsDesc:
          "Contáctenos para una consulta gratuita donde podemos analizar su situación específica.",
        freeConsultation: "Consulta Gratuita",
        whatsappUs: "Escríbanos por WhatsApp",
      },
      howItWorks: {
        title: "Cómo Funciona",
        description:
          "Un proceso simple y comprobado para disputar errores y mejorar sus puntajes de crédito.",
      },
      guarantee: {
        title: "Nuestra Garantía de 90 Días",
        description: "Comience con confianza. Sin ataduras. Sin estrés.",
      },
      contact: {
        title: "Contáctenos",
        description: "Estamos aquí para ayudar. Comuníquese en cualquier momento.",
      },
      about: {
        title: "Acerca de MR. IQ",
        description: "Conozca al equipo detrás de su éxito crediticio.",
        heroEyebrow: "Acerca de MR. IQ",
        heroTitle: "Su Especialista de Confianza en Reparación de Crédito",
        heroDescription:
          "Inteligencia Crediticia Inteligente — empoderando a personas y familias para alcanzar la libertad financiera.",
        statsTitle: "MR. IQ en Resumen",
        founderTitle: "Acerca de Jorge Lopez",
        founderRole: "Fundador y Especialista",
        founderBio1:
          "Con más de 10 años de experiencia en la industria financiera, Jorge Lopez ha ayudado a cientos de clientes a mejorar sus puntajes de crédito y alcanzar sus sueños financieros. Su pasión por ayudar a las personas a superar desafíos financieros impulsa todo lo que hace MR. IQ.",
        founderBio2:
          "Jorge entiende que los problemas de crédito pueden ser abrumadores y estresantes. Por eso ofrece un servicio personalizado y compasivo para guiarle en cada paso del proceso de reparación de crédito.",
        founderQuote:
          "Todos merecen un camino claro hacia un mejor crédito — y las oportunidades financieras que vienen con él.",
        missionTitle: "Nuestra Misión",
        missionText:
          "Empoderar a individuos y familias para alcanzar la libertad financiera mediante reparación de crédito efectiva, educación y apoyo continuo. Creemos que todos merecen una segunda oportunidad con un buen crédito.",
        visionTitle: "Nuestra Visión",
        visionText:
          "Ser el nombre más confiable en reparación de crédito, ayudando a miles de personas a transformar sus vidas financieras y asegurar mejores oportunidades para ellos y sus familias.",
        valuesTitle: "¿Por Qué Elegir MR. IQ?",
        values: [
          {
            title: "Profesional Certificado",
            description:
              "Especialista licenciado y certificado en reparación de crédito con profundo conocimiento del sector.",
          },
          {
            title: "Historial Comprobado",
            description:
              "95% de tasa de éxito mejorando puntajes de crédito durante más de 10 años.",
          },
          {
            title: "Proceso Transparente",
            description:
              "Comunicación clara y actualizaciones regulares de progreso durante todo su camino.",
          },
          {
            title: "Enfoque Personalizado",
            description:
              "Estrategias personalizadas para la situación crediticia y metas únicas de cada cliente.",
          },
        ],
        ctaTitle: "¿Listo para Transformar Su Crédito?",
        ctaDescription:
          "Programe una consulta gratuita y descubra cómo MR. IQ puede ayudarle a alcanzar sus metas financieras.",
        freeConsultation: "Consulta Gratuita",
        getStarted: "Comenzar",
      },
    },
  },
};
