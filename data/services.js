import { ACTIVE_SERVICE_SLUGS } from "@/data/service-slugs"

const serviceCatalog = [
  // 1. Custom Software Development
  {
    id: 1,
    slug: "custom-software-development",
    title: "Custom Software Development",
    subtitle: "Tailor-Made Software for Real Problems",
    description: "We engineer bespoke software solutions — from MVPs to enterprise-grade platforms — built to scale with your business.",
    icon: "FaCode",
    accentColor: "#F4A500",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    heroPoints: [
      "MVP Development",
      "Enterprise Systems",
      "API Development",
      "Automation Tools",
      "Cloud-Native Apps",
    ],
    aboutData: {
      tagline: "ABOUT CUSTOM SOFTWARE",
      aboutText: "Great software isn't just lines of code — it's the digital engine of your business, designed to solve complex problems and scale limitlessly.",
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
      ]
    },
    detailsData: {
      title: "Custom Software Development",
      subheading: "Off-the-shelf solutions often force you to change your processes. We build software that adapts to your unique workflows, driving efficiency and growth.",
      secondaryDescription: "From architecture to deployment, our engineering team ensures your application is secure, maintainable, and built on modern, future-proof technologies.",
      deliverablesTitle: "What we deliver",
      deliverables: [
        {
          title: "Enterprise Web Applications",
          description: "Scalable, secure, and robust web applications tailored for complex business logic and high user concurrency."
        },
        {
          title: "API Development & Integration",
          description: "RESTful and GraphQL APIs to connect your systems, automate workflows, and enable third-party integrations."
        },
        {
          title: "Legacy System Modernization",
          description: "Upgrading outdated software architectures to modern cloud-native stacks for improved performance and security."
        },
        {
          title: "Minimum Viable Products (MVPs)",
          description: "Rapid prototyping and development of core features to help startups validate their ideas in the market quickly."
        }
      ]
    },
    projectsData: [
      { id: 1, title: "Fintech Dashboard", year: "2025", tags: ["React", "Node.js"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" },
      { id: 2, title: "Logistics ERP", year: "2024", tags: ["Next.js", "PostgreSQL"], image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop" },
      { id: 3, title: "Healthcare Portal", year: "2024", tags: ["Vue", "Python"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
      { id: 4, title: "Analytics Tool", year: "2023", tags: ["Data", "AWS"], image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop" },
    ],
    processData: [
      { number: "01", title: "Discovery & Architecture", duration: "2 weeks", description: "Deep dive into your business logic to architect a scalable system and database schema." },
      { number: "02", title: "Agile Development", duration: "4-12 weeks", description: "Iterative development with regular sprint demos so you can see your software take shape." },
      { number: "03", title: "QA & Security Testing", duration: "2 weeks", description: "Rigorous automated and manual testing to ensure reliability, security, and performance." },
      { number: "04", title: "Deployment & Scaling", duration: "Ongoing", description: "Smooth rollout to production with continuous monitoring and scaling infrastructure." }
    ],
    details: {
      fullDescription:
        "Our custom software development services deliver precise, scalable, and robust solutions engineered to your exact requirements. We partner with startups and enterprises alike to build software that solves real problems and drives measurable results.",
      features: [
        "Requirements analysis & system design",
        "Full-stack development (frontend + backend)",
        "REST & GraphQL API development",
        "Third-party integrations & automation",
        "Cloud deployment & DevOps",
        "Ongoing maintenance & support",
      ],
      technologies: ["Next.js", "Node.js", "Python", "TypeScript", "PostgreSQL", "AWS"],
      process: ["Discovery", "Architecture", "Development", "QA & Testing", "Deployment", "Maintenance"],
      caseStudies: [
        { title: "Enterprise Workflow Platform", result: "70% reduction in manual tasks", metric: "Efficiency" },
        { title: "Fintech Dashboard", result: "99.99% uptime SLA", metric: "Reliability" },
        { title: "Internal CRM Tool", result: "3x faster operations", metric: "Productivity" },
      ],
      benefits: [
        {
          icon: "FaTrophy",
          title: "Built for Your Needs",
          description: "No off-the-shelf compromises — software shaped around your exact workflows.",
        },
        {
          icon: "FaUsers",
          title: "Scalable Architecture",
          description: "Systems designed to grow seamlessly from 100 to 1M+ users.",
        },
        {
          icon: "FaLightbulb",
          title: "Future-Proof Tech",
          description: "Built with modern stacks and cloud-native patterns for longevity.",
        },
      ],
      roi: [
        { metric: "Operational Efficiency", value: "+70%", description: "Through process automation" },
        { metric: "Time to Market", value: "2x Faster", description: "Agile delivery sprints" },
        { metric: "Cost Savings", value: "-40%", description: "Versus off-the-shelf solutions" },
      ],
      testimonials: [
        {
          name: "Ahmed Raza",
          role: "CTO, NovaTech",
          content: "The custom platform they built replaced three legacy tools and cut our overhead significantly.",
          rating: 5,
        },
        {
          name: "Priya Mehta",
          role: "Founder, DataPulse",
          content: "Exceptional engineering — clean code, solid architecture, delivered on time.",
          rating: 5,
        },
      ],
      techStackDetails: [
        { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
        { category: "Backend", items: ["Node.js", "Python", "FastAPI", "Express"] },
        { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis"] },
        { category: "DevOps & Cloud", items: ["AWS", "Docker", "CI/CD", "Vercel"] },
      ],
    },
  },

  // 2. Web Development
  {
    id: 2,
    slug: "web-development",
    title: "Web Development",
    subtitle: "High-Performance Digital Experiences",
    description: "We craft fast, responsive, and conversion-optimized websites and web applications built to impress.",
    icon: "FaGlobe",
    accentColor: "#F4A500",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1600&auto=format&fit=crop",
    heroPoints: [
      "Corporate Websites",
      "Landing Pages",
      "Next.js & React",
      "SEO Optimization",
      "Performance Tuning",
    ],
    aboutData: {
      tagline: "ABOUT WEB DEVELOPMENT",
      aboutText: "A great website is not just a page on the internet — it is your brand's first impression, your best salesperson, and your most scalable asset working around the clock.",
      images: [
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
      ]
    },
    detailsData: {
      title: "Web Development",
      subheading: "Your website is your most valuable digital asset. We build websites that are not just beautiful — they are engineered for speed, SEO, and conversion.",
      secondaryDescription: "Whether you need a simple landing page or a complex multi-language portal, we deliver pixel-perfect results using the latest web technologies.",
      deliverablesTitle: "What we deliver",
      deliverables: [
        {
          title: "Landing Pages & Marketing Sites",
          description: "High-converting landing pages optimized for performance, Core Web Vitals, and SEO — designed to turn visitors into customers."
        },
        {
          title: "Corporate & Business Websites",
          description: "Professional websites with CMS integration so your team can manage content independently without touching code."
        },
        {
          title: "Blogs & Content Portals",
          description: "Content-heavy sites built for scale — with tagging, search, pagination, and SSR/SSG strategies for fast load times."
        },
        {
          title: "Progressive Web Apps",
          description: "App-like web experiences with offline support, push notifications, and installability — no app store required."
        }
      ]
    },
    projectsData: [
      { id: 1, title: "TechCorp Site", year: "2025", tags: ["Next.js", "Tailwind"], image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop" },
      { id: 2, title: "Creative Agency", year: "2024", tags: ["GSAP", "React"], image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop" },
      { id: 3, title: "Real Estate Portal", year: "2024", tags: ["Web", "SEO"], image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop" },
      { id: 4, title: "Startup Landing", year: "2023", tags: ["Marketing", "Framer"], image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop" },
    ],
    processData: [
      { number: "01", title: "Discovery & Scoping", duration: "1 week", description: "We map out requirements, define technical scope, and align on timelines and goals." },
      { number: "02", title: "Design & Prototyping", duration: "2 weeks", description: "Interactive Figma prototypes for your approval before development begins." },
      { number: "03", title: "Development & CMS", duration: "3 weeks", description: "Building the front-end and integrating headless CMS for easy content management." },
      { number: "04", title: "Launch & SEO", duration: "1 week", description: "Final QA, performance tuning, on-page SEO optimization, and going live." }
    ],
    details: {
      fullDescription:
        "We build premium websites and web platforms using cutting-edge frameworks like Next.js and React. Every project is engineered for speed, accessibility, SEO, and flawless user experience across all devices.",
      features: [
        "Custom design & development",
        "Fully responsive on all devices",
        "SEO-first architecture",
        "CMS integration (Sanity, Contentful)",
        "Performance & Core Web Vitals optimization",
        "Analytics & conversion tracking setup",
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Sanity", "Vercel"],
      process: ["Discovery", "Wireframing", "Design", "Development", "QA", "Launch"],
      caseStudies: [
        { title: "SaaS Marketing Site", result: "95+ Lighthouse score", metric: "Performance" },
        { title: "Agency Portfolio", result: "+180% inbound leads", metric: "Conversions" },
        { title: "Corporate Website", result: "+220% organic traffic", metric: "SEO Growth" },
      ],
      benefits: [
        {
          icon: "FaTrophy",
          title: "Blazing Fast",
          description: "Sub-second load times with optimized Core Web Vitals scores.",
        },
        {
          icon: "FaUsers",
          title: "Conversion-Focused",
          description: "Designed with user journeys in mind to maximize leads and sales.",
        },
        {
          icon: "FaLightbulb",
          title: "SEO-Ready",
          description: "Built with structured data, meta tags, and semantic HTML from day one.",
        },
      ],
      roi: [
        { metric: "Load Speed", value: "<1s", description: "Optimized Lighthouse performance" },
        { metric: "Organic Traffic", value: "+220%", description: "Through SEO-first development" },
        { metric: "Conversion Rate", value: "+180%", description: "Improved user journeys" },
      ],
      testimonials: [
        {
          name: "Sara Khan",
          role: "CMO, BrightAgency",
          content: "The website they built is the best investment we've made. Traffic tripled within 3 months.",
          rating: 5,
        },
        {
          name: "James O'Brien",
          role: "Founder, LaunchPad",
          content: "Clean, fast, and pixel-perfect. They nailed our brand identity in every detail.",
          rating: 5,
        },
      ],
      techStackDetails: [
        { category: "Framework", items: ["Next.js", "React", "Astro", "Remix"] },
        { category: "Styling", items: ["Tailwind CSS", "Framer Motion", "CSS Modules"] },
        { category: "CMS", items: ["Sanity", "Contentful", "Strapi", "Payload"] },
        { category: "Deployment", items: ["Vercel", "Netlify", "AWS Amplify"] },
      ],
    },
  },

  // 3. SaaS Development
  {
    id: 3,
    slug: "saas-development",
    title: "SaaS Development",
    subtitle: "Scalable Software as a Service Platforms",
    description: "We design and build multi-tenant SaaS products with enterprise-grade architecture, billing, and analytics.",
    icon: "FaCloud",
    accentColor: "#F4A500",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    heroPoints: [
      "Multi-Tenant Architecture",
      "Subscription Billing",
      "User Auth & Roles",
      "Admin Dashboards",
      "Analytics & Reporting",
    ],
    aboutData: {
      tagline: "ABOUT SAAS DEVELOPMENT",
      aboutText: "Building a SaaS product requires more than just code — it demands robust architecture, seamless onboarding, and a relentless focus on user retention and recurring value.",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
      ]
    },
    detailsData: {
      title: "SaaS Development",
      subheading: "We turn your vision into a scalable, revenue-generating product with enterprise-level security and multi-tenancy.",
      secondaryDescription: "Our team handles everything from subscription billing integration to role-based access control, ensuring your SaaS is ready to scale from day one.",
      deliverablesTitle: "What we deliver",
      deliverables: [
        {
          title: "Multi-Tenant Architecture",
          description: "Secure, isolated data structures allowing thousands of organizations to use your platform simultaneously."
        },
        {
          title: "Subscription & Billing",
          description: "Integration with Stripe or Paddle for seamless recurring payments, tier management, and usage-based billing."
        },
        {
          title: "Dashboards & Analytics",
          description: "Beautiful data visualization and reporting tools to give your users actionable insights."
        },
        {
          title: "Admin Control Panels",
          description: "Comprehensive internal tools to manage users, monitor system health, and handle support requests."
        }
      ]
    },
    projectsData: [
      { id: 1, title: "HR Platform", year: "2025", tags: ["SaaS", "Next.js"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
      { id: 2, title: "Marketing Automation", year: "2024", tags: ["B2B", "React"], image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop" },
      { id: 3, title: "Project Manager", year: "2024", tags: ["Productivity", "SaaS"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" },
      { id: 4, title: "Finance Tracker", year: "2023", tags: ["Fintech", "Vue"], image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop" },
    ],
    processData: [
      { number: "01", title: "Product Strategy & Scoping", duration: "2 weeks", description: "Defining MVP features, user personas, and core technical architecture." },
      { number: "02", title: "UX/UI Design", duration: "3 weeks", description: "Designing intuitive workflows and user interfaces optimized for retention." },
      { number: "03", title: "Core Development", duration: "6-10 weeks", description: "Building multi-tenancy, billing, and the core application features." },
      { number: "04", title: "Beta & Launch", duration: "2 weeks", description: "Onboarding early users, monitoring performance, and rolling out globally." }
    ],
    details: {
      fullDescription:
        "We build robust, scalable SaaS platforms from the ground up — complete with multi-tenancy, subscription billing, user management, and real-time analytics. Whether you're launching your first product or scaling an existing one, we've got you covered.",
      features: [
        "Multi-tenant data architecture",
        "Subscription billing (Stripe, LemonSqueezy)",
        "Role-based access control (RBAC)",
        "Real-time analytics & dashboards",
        "Onboarding flows & user management",
        "API-first design for integrations",
      ],
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis", "AWS"],
      process: ["Product Scoping", "Architecture Design", "MVP Development", "Beta Testing", "Launch", "Iteration"],
      caseStudies: [
        { title: "HR Management SaaS", result: "500+ B2B clients onboarded", metric: "Adoption" },
        { title: "Analytics Platform", result: "$2M ARR in year one", metric: "Revenue" },
        { title: "Project Management Tool", result: "10K+ active users", metric: "Growth" },
      ],
      benefits: [
        {
          icon: "FaTrophy",
          title: "Enterprise-Grade",
          description: "Built with security, compliance, and scale at the core.",
        },
        {
          icon: "FaUsers",
          title: "Revenue-Ready",
          description: "Subscription billing and usage-based pricing built in from day one.",
        },
        {
          icon: "FaLightbulb",
          title: "Fast to Market",
          description: "Launch your MVP in weeks, not months, with our proven SaaS boilerplate.",
        },
      ],
      roi: [
        { metric: "Time to MVP", value: "6 Weeks", description: "Rapid SaaS delivery" },
        { metric: "ARR Growth", value: "$2M+", description: "Client success benchmark" },
        { metric: "Churn Reduction", value: "-35%", description: "Through strong UX & onboarding" },
      ],
      testimonials: [
        {
          name: "Michael Torres",
          role: "CEO, Taskify",
          content: "They built our entire SaaS platform in 8 weeks. The architecture is solid and scales beautifully.",
          rating: 5,
        },
        {
          name: "Aisha Nour",
          role: "Founder, InsightLoop",
          content: "Stripe billing, multi-tenancy, dashboards — all done perfectly. Exceeded every expectation.",
          rating: 5,
        },
      ],
      techStackDetails: [
        { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
        { category: "Backend", items: ["Node.js", "tRPC", "REST API", "WebSockets"] },
        { category: "Database", items: ["PostgreSQL", "Prisma ORM", "Redis"] },
        { category: "Payments & Auth", items: ["Stripe", "LemonSqueezy", "NextAuth", "Clerk"] },
      ],
    },
  },

  // 4. Mobile App Development
  {
    id: 4,
    slug: "mobile-app-development",
    title: "Mobile App Development",
    subtitle: "Native & Cross-Platform Mobile Solutions",
    description: "We build polished, high-performance mobile apps for iOS and Android using React Native and Flutter.",
    icon: "FaMobile",
    accentColor: "#F4A500",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&auto=format&fit=crop",
    heroPoints: [
      "iOS & Android Apps",
      "React Native",
      "Flutter",
      "Offline Support",
      "Push Notifications",
    ],
    aboutData: {
      tagline: "ABOUT MOBILE APPS",
      aboutText: "A great mobile app must be fast, intuitive, and seamlessly integrated into your users' daily lives, driving engagement and brand loyalty wherever they go.",
      images: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"
      ]
    },
    detailsData: {
      title: "Mobile App Development",
      subheading: "We bring your ideas to the App Store and Google Play with native performance and cross-platform efficiency.",
      secondaryDescription: "Using React Native and Flutter, we deliver smooth animations, offline capabilities, and native device integrations without doubling your budget.",
      deliverablesTitle: "What we deliver",
      deliverables: [
        {
          title: "Cross-Platform Apps",
          description: "One codebase for both iOS and Android, saving time and money while maintaining a native look and feel."
        },
        {
          title: "Native Device Integrations",
          description: "Seamless access to camera, GPS, push notifications, and biometric authentication (FaceID/TouchID)."
        },
        {
          title: "Offline-First Architecture",
          description: "Apps that continue to function and sync data even when the user loses internet connection."
        },
        {
          title: "App Store Deployment",
          description: "Full handling of the submission process, guidelines compliance, and app store optimization."
        }
      ]
    },
    projectsData: [
      { id: 1, title: "Fitness Tracker", year: "2025", tags: ["React Native", "Health"], image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop" },
      { id: 2, title: "Food Delivery", year: "2024", tags: ["Flutter", "Maps"], image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=800&auto=format&fit=crop" },
      { id: 3, title: "Social Connect", year: "2024", tags: ["iOS", "Android"], image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop" },
      { id: 4, title: "Crypto Wallet", year: "2023", tags: ["React Native", "Fintech"], image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=800&auto=format&fit=crop" },
    ],
    processData: [
      { number: "01", title: "App Strategy & UX", duration: "2 weeks", description: "Defining user flows and crafting a mobile-first user experience." },
      { number: "02", title: "UI Design & Prototyping", duration: "2 weeks", description: "Designing beautiful interfaces that follow iOS Human Interface and Android Material guidelines." },
      { number: "03", title: "Cross-Platform Build", duration: "4-8 weeks", description: "Developing the app using React Native or Flutter and integrating backend APIs." },
      { number: "04", title: "Store Submission", duration: "1 week", description: "Navigating the review process and launching your app to millions of users." }
    ],
    details: {
      fullDescription:
        "We develop cross-platform mobile applications with native-grade performance using React Native and Flutter. From consumer apps to enterprise tools, we deliver seamless, intuitive mobile experiences that users love.",
      features: [
        "Cross-platform iOS & Android development",
        "Native device integrations (camera, GPS, biometrics)",
        "Push notifications & real-time updates",
        "Offline-first architecture",
        "App Store & Play Store deployment",
        "Performance optimization & crash analytics",
      ],
      technologies: ["React Native", "Flutter", "Expo", "Firebase", "TypeScript", "Redux"],
      process: ["Discovery", "UI/UX Design", "Development", "Testing", "Submission", "Post-Launch"],
      caseStudies: [
        { title: "Delivery Tracking App", result: "100K+ downloads in 3 months", metric: "Adoption" },
        { title: "Fitness App", result: "4.8★ App Store rating", metric: "User Rating" },
        { title: "B2B Field App", result: "60% faster field operations", metric: "Efficiency" },
      ],
      benefits: [
        {
          icon: "FaTrophy",
          title: "One Codebase, Two Platforms",
          description: "Ship iOS and Android simultaneously without doubling your budget.",
        },
        {
          icon: "FaUsers",
          title: "Native Performance",
          description: "Smooth 60fps animations and native device integrations.",
        },
        {
          icon: "FaLightbulb",
          title: "App Store Ready",
          description: "We handle submission, screenshots, metadata, and review processes.",
        },
      ],
      roi: [
        { metric: "Time to Market", value: "40% Faster", description: "Cross-platform vs native" },
        { metric: "User Rating", value: "4.8★", description: "Average App Store rating" },
        { metric: "Retention", value: "+55%", description: "Improved onboarding & UX" },
      ],
      testimonials: [
        {
          name: "Carlos Rivera",
          role: "Founder, TrackNow",
          content: "The app they built hit 50K downloads in the first month. Smooth, beautiful, and reliable.",
          rating: 5,
        },
        {
          name: "Fatima Al-Rashid",
          role: "Product Manager, HealthStack",
          content: "From design to App Store approval, they handled everything. Outstanding quality.",
          rating: 5,
        },
      ],
      techStackDetails: [
        { category: "Frameworks", items: ["React Native", "Expo", "Flutter", "Dart"] },
        { category: "State Management", items: ["Redux Toolkit", "Zustand", "React Query"] },
        { category: "Backend & Auth", items: ["Firebase", "Supabase", "REST API", "GraphQL"] },
        { category: "Testing & CI", items: ["Jest", "Detox", "TestFlight", "Fastlane"] },
      ],
    },
  },

  // 5. UI/UX Design
  {
    id: 5,
    slug: "ui-ux-design",
    title: "UI/UX Design",
    subtitle: "Human-Centered Design That Converts",
    description: "We design intuitive, visually stunning interfaces that delight users and drive measurable business results.",
    icon: "FaPaintBrush",
    accentColor: "#F4A500",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600&auto=format&fit=crop",
    heroPoints: [
      "User Research",
      "Wireframing & Prototyping",
      "Design Systems",
      "Interaction Design",
      "Usability Testing",
    ],
    aboutData: {
      tagline: "ABOUT UI/UX DESIGN",
      aboutText: "Design is more than aesthetics — it's about solving problems, reducing friction, and creating delightful experiences that keep users coming back.",
      images: [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"
      ]
    },
    detailsData: {
      title: "UI/UX Design",
      subheading: "We craft digital experiences that look beautiful, feel intuitive, and are engineered to convert visitors into loyal customers.",
      secondaryDescription: "Our design process is rooted in user research and business goals, ensuring every pixel serves a purpose.",
      deliverablesTitle: "What we deliver",
      deliverables: [
        {
          title: "User Research & Journey Mapping",
          description: "Deep dive into your audience to understand their needs, pain points, and behaviors."
        },
        {
          title: "Wireframes & Interactive Prototypes",
          description: "Low and high-fidelity prototypes to test concepts and flows before development."
        },
        {
          title: "UI Design & Animation",
          description: "Pixel-perfect interfaces with engaging micro-interactions and smooth animations."
        },
        {
          title: "Scalable Design Systems",
          description: "Comprehensive component libraries and guidelines for consistent design across your products."
        }
      ]
    },
    projectsData: [
      { id: 1, title: "Fintech App Redesign", year: "2025", tags: ["UI/UX", "Figma"], image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop" },
      { id: 2, title: "Healthcare Portal UX", year: "2024", tags: ["Research", "Prototyping"], image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800&auto=format&fit=crop" },
      { id: 3, title: "E-Commerce Design System", year: "2024", tags: ["Design System", "UI"], image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop" },
      { id: 4, title: "SaaS Dashboard UI", year: "2023", tags: ["Dashboard", "Figma"], image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=800&auto=format&fit=crop" },
    ],
    processData: [
      { number: "01", title: "Research & Discovery", duration: "1-2 weeks", description: "Understanding users, market context, and business objectives." },
      { number: "02", title: "Wireframing & UX", duration: "2 weeks", description: "Structuring content, navigation, and user flows for maximum usability." },
      { number: "03", title: "Visual Design", duration: "2-3 weeks", description: "Applying brand identity, colors, typography, and creating high-fidelity mockups." },
      { number: "04", title: "Handoff & Support", duration: "1 week", description: "Delivering detailed design specs and assets for seamless developer implementation." }
    ],
    details: {
      fullDescription:
        "Our UI/UX design practice combines deep user research, data-driven decisions, and world-class visual craft to create products that users love. We design every interaction with purpose — from micro-animations to full design systems.",
      features: [
        "User research & persona development",
        "Information architecture & user flows",
        "Wireframing & interactive prototypes",
        "Visual design & component libraries",
        "Design system creation & documentation",
        "Usability testing & iteration",
      ],
      technologies: ["Figma", "Adobe XD", "Framer", "Lottie", "Principle", "Zeplin"],
      process: ["Research", "Ideation", "Wireframing", "Visual Design", "Prototyping", "Handoff"],
      caseStudies: [
        { title: "FinTech App Redesign", result: "+85% task completion rate", metric: "Usability" },
        { title: "SaaS Dashboard", result: "3x lower churn rate", metric: "Retention" },
        { title: "E-commerce UX Overhaul", result: "+120% checkout conversions", metric: "Revenue" },
      ],
      benefits: [
        {
          icon: "FaTrophy",
          title: "Research-Driven",
          description: "Every design decision backed by real user data and behavioral insights.",
        },
        {
          icon: "FaUsers",
          title: "Delightful Interactions",
          description: "Micro-animations and transitions that make interfaces feel alive.",
        },
        {
          icon: "FaLightbulb",
          title: "Dev-Ready Handoff",
          description: "Pixel-perfect Figma files with tokens, components, and specs.",
        },
      ],
      roi: [
        { metric: "Task Completion", value: "+85%", description: "Improved usability scores" },
        { metric: "Conversion Rate", value: "+120%", description: "Optimized user journeys" },
        { metric: "Churn Reduction", value: "-50%", description: "Better onboarding & UX" },
      ],
      testimonials: [
        {
          name: "Layla Hussain",
          role: "CPO, FinFlow",
          content: "The redesign transformed how users perceive our product. Engagement metrics jumped immediately.",
          rating: 5,
        },
        {
          name: "Tom Becker",
          role: "Founder, Dashify",
          content: "They built a design system that our dev team loves. Consistent, scalable, and beautiful.",
          rating: 5,
        },
      ],
      techStackDetails: [
        { category: "Design Tools", items: ["Figma", "Adobe XD", "Framer", "Sketch"] },
        { category: "Prototyping", items: ["Figma Prototypes", "Principle", "ProtoPie"] },
        { category: "Animation", items: ["Lottie", "After Effects", "Framer Motion"] },
        { category: "Research", items: ["Maze", "Hotjar", "UserTesting", "Miro"] },
      ],
    },
  },

  // 6. E-commerce Development
  {
    id: 6,
    slug: "ecommerce-development",
    title: "E-commerce Development",
    subtitle: "High-Converting Online Stores",
    description: "We build powerful, scalable e-commerce platforms and stores optimized to maximize sales and customer retention.",
    icon: "FaShoppingCart",
    accentColor: "#F4A500",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600&auto=format&fit=crop",
    heroPoints: [
      "Shopify & Shopify Plus",
      "Custom E-commerce",
      "Payment Gateways",
      "Inventory Management",
      "Conversion Optimization",
    ],
    aboutData: {
      tagline: "ABOUT E-COMMERCE",
      aboutText: "An e-commerce store needs to be more than just a catalog — it must be a frictionless, high-speed sales engine optimized for conversions and customer loyalty.",
      images: [
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop"
      ]
    },
    detailsData: {
      title: "E-commerce Development",
      subheading: "We create digital storefronts that captivate shoppers and turn browsers into buyers through seamless user journeys and robust backend integrations.",
      secondaryDescription: "Whether you need a bespoke headless architecture or a scalable Shopify Plus setup, we deliver platforms built for growth and high-volume traffic.",
      deliverablesTitle: "What we deliver",
      deliverables: [
        {
          title: "Custom Storefronts & Themes",
          description: "Unique, brand-aligned designs that stand out in crowded markets and engage customers."
        },
        {
          title: "Headless Commerce Solutions",
          description: "Decoupled architectures using Next.js for lightning-fast performance and ultimate flexibility."
        },
        {
          title: "Platform Migrations",
          description: "Seamlessly moving your store to Shopify or custom platforms without losing SEO rankings or data."
        },
        {
          title: "Custom Integrations",
          description: "Connecting ERPs, CRMs, inventory systems, and complex payment gateways."
        }
      ]
    },
    projectsData: [
      { id: 1, title: "Luxury Fashion Store", year: "2025", tags: ["Shopify Plus", "E-commerce"], image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop" },
      { id: 2, title: "Tech Gadgets Outlet", year: "2024", tags: ["Headless", "Next.js"], image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop" },
      { id: 3, title: "Artisan Coffee Brand", year: "2024", tags: ["WooCommerce", "Design"], image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop" },
      { id: 4, title: "Beauty Products Hub", year: "2023", tags: ["Shopify", "Custom Theme"], image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=800&auto=format&fit=crop" },
    ],
    processData: [
      { number: "01", title: "Strategy & Platform Selection", duration: "1 week", description: "Evaluating your needs to recommend the best e-commerce platform and architecture." },
      { number: "02", title: "Store Design & UX", duration: "2-3 weeks", description: "Crafting a frictionless shopping experience focused on conversions." },
      { number: "03", title: "Development & Integration", duration: "4-6 weeks", description: "Building the store, configuring products, and integrating third-party tools." },
      { number: "04", title: "Testing & Go-Live", duration: "1-2 weeks", description: "Load testing, payment gateway verification, and a smooth launch." }
    ],
    details: {
      fullDescription:
        "We develop end-to-end e-commerce solutions — from custom storefronts to fully headless commerce architectures. Whether you need a Shopify store, a WooCommerce site, or a fully custom platform, we engineer experiences that sell.",
      features: [
        "Custom storefront design & development",
        "Headless commerce (Shopify + Next.js)",
        "Multi-currency & multi-language support",
        "Payment gateway integration",
        "Inventory & order management systems",
        "Cart abandonment & conversion optimization",
      ],
      technologies: ["Shopify", "Next.js", "Hydrogen", "Stripe", "WooCommerce", "Medusa.js"],
      process: ["Strategy", "Design", "Development", "Integration", "Testing", "Launch"],
      caseStudies: [
        { title: "Fashion Brand Store", result: "+200% revenue in 6 months", metric: "Revenue" },
        { title: "Electronics Platform", result: "4x checkout conversion", metric: "Conversion" },
        { title: "Subscription Box Store", result: "10K+ subscribers", metric: "Retention" },
      ],
      benefits: [
        {
          icon: "FaTrophy",
          title: "Optimized to Sell",
          description: "Every element designed and tested to maximize cart value and conversions.",
        },
        {
          icon: "FaUsers",
          title: "Seamless Shopping",
          description: "Frictionless checkout flows that reduce abandonment and boost revenue.",
        },
        {
          icon: "FaLightbulb",
          title: "Scalable Infrastructure",
          description: "Handle Black Friday traffic spikes without breaking a sweat.",
        },
      ],
      roi: [
        { metric: "Revenue Growth", value: "+200%", description: "Post-launch average" },
        { metric: "Cart Abandonment", value: "-45%", description: "Optimized checkout UX" },
        { metric: "Customer LTV", value: "+130%", description: "Retention & upsell flows" },
      ],
      testimonials: [
        {
          name: "Zara Malik",
          role: "Founder, LuxeWear",
          content: "Revenue doubled within 6 months of launching the new store. Absolutely outstanding work.",
          rating: 5,
        },
        {
          name: "Noah Williams",
          role: "CEO, TechGadgets",
          content: "The headless Shopify setup they built handles our volume flawlessly. Best investment we made.",
          rating: 5,
        },
      ],
      techStackDetails: [
        { category: "Platforms", items: ["Shopify", "Shopify Plus", "WooCommerce", "Medusa.js"] },
        { category: "Frontend", items: ["Next.js", "Hydrogen", "Tailwind CSS", "Framer Motion"] },
        { category: "Payments", items: ["Stripe", "Shopify Payments", "PayPal", "Razorpay"] },
        { category: "Automation", items: ["Klaviyo", "Zapier", "Shopify Flow", "Omnisend"] },
      ],
    },
  },
];

export const services = serviceCatalog.filter((service) => ACTIVE_SERVICE_SLUGS.includes(service.slug))

export const getServiceBySlug = (slug) => serviceCatalog.find((s) => s.slug === slug)
