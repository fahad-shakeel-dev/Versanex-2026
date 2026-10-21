const indusOliveMockups = [
  ["main-img.png", "Indus & Olive restaurant website cover mockup"],
  ["iPhone-Mockup.png", "Indus & Olive restaurant website in an iPhone mockup"],
  ["pc-mockup.png", "Indus & Olive restaurant website in a PC mockup"],
].map(([name, alt]) => ({
  url: `/mockups/Indus&Olive/${name}`,
  alt,
  ...(name === "main-img.png" ? { width: 1835, height: 857 } : {}),
}))

const timeCenterMockups = [
  ["/mockups/time-center/time-center1st.png", "Time Center website cover mockup"],
  ["/mockups/time-center/monitor-mockup.png", "Time Center website in a monitor mockup"],
  ["/mockups/time-center/phone-tablet-mockup.png", "Time Center website in a phone and tablet mockup"],
  ["04-collections", "Time Center watch collections in a black laptop mockup"],
  ["/mockups/time-center/bottom-mobile-mockup.png", "Time Center mobile checkout mockup"],
  ["03-admin-dashboard", "Time Center admin dashboard in a desktop monitor mockup"],
  ["05-product-catalog", "Time Center product catalog in a black laptop mockup"],
  ["/mockups/time-center/three-mobile-mockup.png?v=271ea2fc22e1", "Time Center website across three mobile screens"],
  ["07-product-search", "Time Center product search in a black laptop mockup"],
  ["02-best-sellers", "Time Center best sellers in a desktop monitor mockup"],
].map(([name, alt]) => ({ url: name.startsWith("/") ? name : `/mockups/time-center/${name}.webp`, alt }))

const timeCenterProject = {
  _id: "68faa7ddb33432834f3679d2",
  slug: "time-center-modern-watch-retail-website",
  title: "Time Center - Modern Watch Retail Website",
  isStatic: true,
  homeImage: timeCenterMockups[1],
  description: "A refined Next.js storefront that brings Time Center’s premium watch collection online. Thoughtful product browsing, detailed watch listings and a smooth checkout make shopping effortless across every device. A dedicated admin dashboard gives the team simple control over products, orders and content.",
  focusDescription: "We built a refined online store that makes Time Center’s watch collection easy to explore on any device.\n\nA dedicated admin dashboard lets the team manage products, orders and content in one place.",
  category: "website-developing",
  subCategory: "E-commerce Development",
  status: "Completed",
  publishStatus: "published",
  projectType: "imageGallery",
  images: timeCenterMockups,
  skills: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "Framer Motion", "REST API"],
  features: ["Responsive watch storefront", "Product search and category filtering", "Shopping cart and checkout", "Product and order management", "Dedicated admin dashboard", "SEO-friendly pages"],
  liveLink: "https://www.timecenterfsd.com/",
  contactCta: "Let’s build yours",
  creatorName: "VersaNex",
  createdAt: "2025-10-23T22:10:37.992Z",
  updatedAt: "2026-09-11T08:59:40.690Z",
  deadline: "2025-10-23",
  results: "A responsive storefront with straightforward shopping and a central dashboard for managing the business.",
  reviews: [],
  relatedProjects: [
    {
      title: "Indus & Olive – Restaurant Ordering Website",
      slug: "food-delivery-web-app",
      category: "website-developing",
      images: [indusOliveMockups[0]],
    },
    {
      title: "MERN Stack Job Seeking Web Application",
      slug: "mern-stack-job-seeking-web-application",
      category: "website-developing",
      images: [{ url: "https://res.cloudinary.com/dbbbve4y4/image/upload/v1761260820/projects/w0yubvqwqiqqqqtjxpm4.png", alt: "Job seeking web application" }],
    },
    {
      title: "Real-Time Chat",
      slug: "real-time-chat",
      category: "website-developing",
      images: [{ url: "https://res.cloudinary.com/dbbbve4y4/image/upload/v1761266116/projects/ouefladv3lwgtfdxfdma.png", alt: "Real-time chat application" }],
    },
  ],
}

const indusOliveProject = {
  slug: "food-delivery-web-app",
  title: "Indus & Olive – Restaurant Ordering Website",
  isStatic: true,
  homeImage: { url: "/mockups/Indus&Olive/all-mockup.png", alt: "Indus & Olive website across phone, laptop, and tablet mockups" },
  description: "An online restaurant ordering website for Indus & Olive. Customers can explore the menu, browse food items, add their selections to a cart, and complete checkout. A detailed admin panel lets the restaurant manage orders, customers, menu listings, and food item availability in one place.",
  focusDescription: "We brought Indus & Olive's restaurant menu online, making it easy for customers to explore food items, add dishes to their cart, and complete checkout.\n\nA detailed admin panel gives the restaurant control over incoming orders, customer accounts, menu categories, food listings, pricing, and availability.",
  challenge: "Bring Indus & Olive's menu and ordering experience online while giving the restaurant a central place to manage its orders, customers, and food listings.",
  solution: "We built a restaurant ordering website with an online menu, food item browsing, a shopping cart, and checkout. A detailed admin panel brings order management, customer accounts, menu categories, food listings, pricing, and availability together so the restaurant can manage its daily operations.",
  results: "Customers can browse the menu and order food through a complete cart and checkout flow. The restaurant can manage orders, customers, and menu listings from a dedicated admin panel.",
  category: "website-developing",
  subCategory: "Restaurant Ordering & Management",
  status: "Completed",
  publishStatus: "published",
  projectType: "imageGallery",
  logo: { url: "/clients-logo/Indus&olive.png", alt: "Indus & Olive restaurant logo" },
  images: indusOliveMockups,
  features: [
    "Online menu and food item browsing",
    "Shopping cart and customer checkout",
    "Detailed admin panel for orders, customers, and menu listings",
    "Order management and status updates",
    "Customer account management",
    "Menu categories and food item listings",
    "Food item pricing and availability management",
  ],
  liveLink: "https://indusolive.versanex.site",
  creatorName: "VersaNex",
  reviews: [],
  relatedProjects: [
    { title: timeCenterProject.title, slug: timeCenterProject.slug, category: timeCenterProject.category, images: [timeCenterMockups[0]] },
    ...timeCenterProject.relatedProjects.filter(project => project.slug !== "food-delivery-web-app"),
  ],
}

const apexIeltsProject = {
  _id: "apex-ielts-writing",
  slug: "apex-ielts-writing",
  title: "Apex IELTS Writing – AI Writing Practice Platform",
  isStatic: true,
  homeImage: { url: "/mockups/apex-ielts-writing/Apex-IELTS-Device-Mockup.png", alt: "Apex IELTS Writing website in device mockups" },
  logo: { url: "/mockups/apex-ielts-writing/logo.png", alt: "Apex IELTS Writing logo" },
  focusImage: { url: "/mockups/apex-ielts-writing/mobile-mockup.png", alt: "Apex IELTS Writing mobile website mockup" },
  description: "An AI-powered IELTS writing platform with essay evaluation, band score feedback, and tools for improving grammar and coherence. A responsive learning experience brings writing practice and plan selection together across desktop and mobile.",
  focusDescription: "Apex IELTS Writing helps candidates turn writing practice into focused improvement through clear feedback and approachable tools.\n\nThe platform combines essay evaluation, academic writing and letter practice, grammar checks, and coherence analysis in a responsive interface.",
  challenge: "Make a broad set of writing tools easy to discover and help learners understand how to move from an essay submission to useful feedback.",
  solution: "A clear landing page introduces the evaluation tools, explains the learning process, and connects visitors to pricing and account access. Device-friendly layouts make the platform approachable wherever candidates practice.",
  results: "A connected learning experience with clear tool discovery, writing feedback, and straightforward navigation between practice, plans, and account access.",
  category: "website-developing",
  subCategory: "AI Learning Platform",
  status: "Completed",
  publishStatus: "published",
  projectType: "imageGallery",
  features: [
    "AI essay evaluation and band score feedback",
    "Academic writing and General Training letter tools",
    "Grammar checks and coherence analysis",
    "Essay enhancement suggestions",
    "Pricing plans and account access",
    "Responsive desktop and mobile experience",
  ],
  images: [
    ["apex-ielts-main.png", "Apex IELTS Writing website main mockup"],
    ["Apex-IELTS-Device-Mockup.png", "Apex IELTS Writing website in device mockups"],
    ["03-monitor.webp", "Apex IELTS Writing homepage in a desktop monitor mockup"],
    ["04-tools.webp", "Apex IELTS Writing evaluation tools in a monitor mockup"],
    ["05-laptop.webp", "Apex IELTS Writing toolkit in a laptop mockup"],
    ["06-methodology.webp", "Apex IELTS Writing learning process in a monitor mockup"],
    ["07-pricing.webp", "Apex IELTS Writing pricing plans in a laptop mockup"],
    ["apexieltswriting-last.png", "Apex IELTS Writing closing website mockup"],
  ].map(([name, alt]) => ({ url: `/mockups/apex-ielts-writing/${name}`, alt })),
  liveLink: "https://apexieltswriting.com/",
  creatorName: "VersaNex",
  reviews: [],
  relatedProjects: [
    { title: timeCenterProject.title, slug: timeCenterProject.slug, category: timeCenterProject.category, images: [timeCenterMockups[0]] },
    { title: indusOliveProject.title, slug: indusOliveProject.slug, category: indusOliveProject.category, images: [indusOliveMockups[0]] },
    timeCenterProject.relatedProjects[2],
  ],
}

const maxCoatProject = {
  _id: "maxcoat",
  slug: "maxcoat",
  title: "MaxCoat – Car Care Online Store",
  isStatic: true,
  homeImage: { url: "/mockups/maxcoat/08-all-devices.webp", alt: "MaxCoat storefront across laptop, phone, and tablet mockups" },
  logo: { url: "/mockups/maxcoat/logo.png", alt: "MaxCoat car care logo" },
  description: "A car-care e-commerce website for MaxCoat Pakistan, bringing interior detailers, polishing products, kits, and accessories into a clear shopping experience. Customers can explore collections, compare product details, add items to their cart, access their orders, and follow delivery tracking across desktop and mobile.",
  focusDescription: "MaxCoat brings its car-care range online with bold product photography, a focused catalog, and a responsive shopping experience.\n\nCollection filters, price sorting, detailed product pages, cart controls, customer accounts, and order tracking connect product discovery with the purchase journey.",
  challenge: "Present a specialist car-care range clearly, help shoppers choose the right detailing products, and keep product discovery and ordering straightforward on every screen.",
  solution: "A responsive storefront pairs MaxCoat's orange, black, and white identity with prominent product photography. Category filters and price sorting organize the catalog, while product pages bring pricing, bundle contents, reviews, cart actions, and shipping information together. Customer account and order links keep the next steps easy to find.",
  results: "A cohesive storefront that connects car-care product discovery, detailed purchase information, cart actions, and customer order access across desktop and mobile.",
  category: "website-developing",
  subCategory: "Car Care E-commerce",
  status: "Completed",
  publishStatus: "published",
  projectType: "imageGallery",
  features: [
    "Product collections, category filters, and price sorting",
    "Detailed product pages with bundle contents and reviews",
    "Shopping cart and direct purchase controls",
    "Customer accounts and order access",
    "Delivery tracking and shipping information",
    "Responsive desktop and mobile storefront",
  ],
  images: [
    ["max-coat-main", "MaxCoat main project showcase"],
    ["02-phone", "MaxCoat product catalog displayed on a graphite smartphone"],
    ["03-monitor", "MaxCoat homepage displayed on a desktop monitor"],
    ["04-product-laptop", "MaxCoat Interior Kit product page displayed on a laptop"],
    ["05-catalog-monitor", "MaxCoat collections and category filters displayed on a monitor"],
    ["06-product-phone", "MaxCoat Interior Kit product page displayed on a smartphone"],
    ["07-about-laptop", "MaxCoat brand story displayed on a laptop"],
    ["08-all-devices", "MaxCoat storefront displayed across laptop, phone, and tablet"],
  ].map(([name, alt]) => name === "max-coat-main"
    ? { url: `/mockups/maxcoat/${name}.png`, alt, width: 1964, height: 801 }
    : { url: `/mockups/maxcoat/${name}.webp`, alt, width: 1536, height: 1024 }),
  liveLink: "https://maxcoat.pk/",
  creatorName: "VersaNex",
  reviews: [],
  relatedProjects: [
    { title: timeCenterProject.title, slug: timeCenterProject.slug, category: timeCenterProject.category, images: [timeCenterMockups[0]] },
    { title: indusOliveProject.title, slug: indusOliveProject.slug, category: indusOliveProject.category, images: [indusOliveMockups[0]] },
    { title: apexIeltsProject.title, slug: apexIeltsProject.slug, category: apexIeltsProject.category, images: [apexIeltsProject.images[0]] },
  ],
}

const mahalForetHayatProject = {
  _id: "mahal-foret-hayat",
  slug: "mahal-foret-hayat",
  title: "Mahal Foret Hayat – Construction Materials Website",
  isStatic: true,
  homeImage: { url: "/mockups/mahal-foret-hayat/08-all-devices.webp", alt: "Mahal Foret Hayat website showcased on a laptop, smartphone, and tablet" },
  logo: { url: "/clients-logo/mahalforethayat.png", alt: "Mahal Foret Hayat trading company logo" },
  focusImage: { url: "/mockups/mahal-foret-hayat/02-phone.webp", alt: "Mahal Foret Hayat mobile homepage displayed on a graphite smartphone" },
  description: "A polished corporate website for a Saudi Arabian construction-materials supplier. A distinctive visual identity, English and Arabic navigation, a structured materials catalog, and direct inquiry options bring product discovery and customer support together across desktop and mobile.",
  focusDescription: "Mahal Foret Hayat connects construction teams with materials, technical information, and dependable transport support. Its website brings the company's experience, product range, and supplier brands into one clear digital presence.\n\nWarm gold accents, industrial photography, and spacious layouts establish a confident identity. Responsive pages guide visitors from material discovery to project inquiries, with phone, email, and WhatsApp options close at hand.",
  challenge: "Turn a broad construction-materials and transport offering into a clear online experience. Help visitors understand the company, find relevant products and brands, and reach the right team for pricing, specifications, or site delivery support.",
  solution: "We organized the website around the customer's next step: explore materials, review brands, learn about the company, or discuss a project. A charcoal, ivory, and gold identity pairs industrial imagery with readable content. English and Arabic navigation, responsive layouts, product discovery, and dedicated inquiry paths make the experience approachable across devices.",
  results: "A cohesive corporate presence that gives construction customers a clear route from exploring materials and supplier brands to requesting technical information, pricing, and transport support. The same identity carries through desktop, tablet, and mobile.",
  category: "website-developing",
  subCategory: "Construction & Corporate Website",
  status: "Completed",
  publishStatus: "published",
  projectType: "imageGallery",
  features: [
    "Structured construction-materials catalog and brand discovery",
    "English and Arabic navigation with responsive layouts",
    "Project inquiries through contact forms, phone, and WhatsApp",
    "Company profile, leadership, and transport services",
    "Product search and technical-document inquiry options",
  ],
  images: [
    ["mahal-foret-main", "Mahal Foret Hayat main project showcase"],
    ["02-phone", "Mahal Foret Hayat responsive homepage displayed on a graphite smartphone"],
    ["03-monitor", "Mahal Foret Hayat homepage displayed on an aluminum desktop monitor"],
    ["04-products-laptop", "Mahal Foret Hayat construction-materials catalog displayed on a laptop"],
    ["05-brands-monitor", "Mahal Foret Hayat supplier brands displayed on a desktop monitor"],
    ["06-contact-phone", "Mahal Foret Hayat customer inquiry page displayed on a smartphone"],
    ["07-about-laptop", "Mahal Foret Hayat company profile displayed on a silver laptop"],
    ["08-all-devices", "Mahal Foret Hayat website displayed across laptop, smartphone, and tablet"],
  ].map(([name, alt]) => name === "mahal-foret-main"
    ? { url: `/mockups/mahal-foret-hayat/${name}.png`, alt, width: 1964, height: 801 }
    : { url: `/mockups/mahal-foret-hayat/${name}.webp`, alt, width: 1536, height: 1024 }),
  liveLink: "https://www.mahalforethayat.com/",
  creatorName: "VersaNex",
  reviews: [],
  relatedProjects: [
    { title: maxCoatProject.title, slug: maxCoatProject.slug, category: maxCoatProject.category, images: [maxCoatProject.homeImage] },
    { title: timeCenterProject.title, slug: timeCenterProject.slug, category: timeCenterProject.category, images: [timeCenterMockups[0]] },
    { title: indusOliveProject.title, slug: indusOliveProject.slug, category: indusOliveProject.category, images: [indusOliveMockups[0]] },
  ],
}

const fixitProject = {
  _id: "6a8c157858f1c9e5b2f410ad",
  slug: "fixit-your-ai-powered-home-services-companion",
  title: "Fixit – AI Home Services & Booking App",
  isStatic: true,
  homeImage: { url: "/mockups/fixit/08-app-showcase.webp", alt: "Fixit home dashboard, AI problem finder, and booking flow displayed on three smartphones" },
  logo: { url: "/clients-logo/fixit.jpeg", alt: "Fixit home services app logo" },
  focusImage: { url: "/mockups/fixit/02-providers.webp", alt: "Fixit service offers and provider cards displayed on a realistic smartphone" },
  description: "A mobile home-services app that connects service discovery, professional profiles, and appointment booking. Its photo-based AI problem finder helps users identify a relevant service, while clear packages, scheduling, messages, and booking history keep the next steps close at hand.",
  focusDescription: "Fixit helps people move from a household problem to a service booking through one approachable mobile experience. Users can browse categories and providers, compare service packages, and choose a location, date, and time.\n\nThe AI problem finder starts with a photo and suggests a service category. A consistent navy, teal, and white interface connects discovery with booking requests, conversations, and account management.",
  challenge: "Help users find the right home service when they may not know which professional they need, then make service selection and scheduling easy to follow on a phone.",
  solution: "We brought service categories, provider cards, package selection, and booking configuration into a connected mobile flow. A photo-based AI problem finder provides a starting point for service discovery, while clear booking confirmations, messages, and account history support the steps that follow.",
  results: "A cohesive mobile experience that connects photo-based service discovery with package selection, appointment requests, and ongoing communication. The showcase follows the app's actual screens from the home dashboard through AI recommendations and booking confirmation.",
  category: "mobile-app-development",
  subCategory: "AI Home Services App",
  status: "Completed",
  publishStatus: "published",
  projectType: "imageGallery",
  skills: ["Flutter", "Dart", "Firebase", "AI Implementation", "UI/UX Design", "Figma"],
  features: [
    "Photo-based AI problem finder and service recommendations",
    "Service categories, provider profiles, and package selection",
    "Location, date, and time selection for booking requests",
    "Active and completed booking history",
    "Provider conversations and user account management",
  ],
  images: [
    ["01-home", "Fixit home dashboard displayed on a graphite smartphone"],
    ["02-providers", "Fixit service offers and provider cards displayed on a smartphone"],
    ["03-services", "Fixit service categories and package selection displayed on two smartphones"],
    ["04-ai-finder", "Fixit photo upload and AI service recommendation displayed on two smartphones"],
    ["05-booking", "Fixit appointment configuration and booking confirmation displayed on two smartphones"],
    ["06-messages", "Fixit provider messages displayed on a graphite smartphone"],
    ["07-profile", "Fixit profile and account options displayed on a smartphone"],
    ["08-app-showcase", "Fixit home dashboard, AI recommendation, and scheduling displayed on three smartphones"],
  ].map(([name, alt]) => ({ url: `/mockups/fixit/${name}.webp`, alt, width: 1536, height: 1024 })),
  creatorName: "VersaNex",
  createdAt: "2026-08-24T09:57:12.016Z",
  updatedAt: "2026-10-12T00:00:00.000Z",
  reviews: [],
  relatedProjects: [
    { title: apexIeltsProject.title, slug: apexIeltsProject.slug, category: apexIeltsProject.category, images: [apexIeltsProject.homeImage] },
    { title: indusOliveProject.title, slug: indusOliveProject.slug, category: indusOliveProject.category, images: [indusOliveProject.homeImage] },
    timeCenterProject.relatedProjects[2],
  ],
}

const financeFlowProject = {
  _id: "finance-flow-finance-management-system",
  slug: "finance-flow-finance-management-system",
  title: "Finance Flow – Finance Management System",
  isStatic: true,
  homeImage: { url: "/mockups/finance-flow/08-device-showcase.webp", alt: "Finance Flow website displayed on a silver laptop, graphite phone, and tablet" },
  focusImage: { url: "/mockups/finance-flow/03-home-monitor.webp", alt: "Finance Flow Smart Budgeting homepage on a realistic desktop monitor" },
  description: "A responsive finance-management website that introduces budgeting, expense analysis, and savings goals through a clear black-and-amber interface. Financial feature discovery, an expense-trend visualization, and account registration connect the public website with the next step in the user journey.",
  focusDescription: "Finance Flow brings budgeting, expense tracking, and financial goals into a focused digital presence. Its public website introduces the available tools through financial imagery, clear feature sections, and an approachable expense-trend chart.\n\nA consistent black, white, and amber identity carries from the homepage to account registration and login. Responsive layouts make the same content accessible across desktop, tablet, and phone.",
  challenge: "Introduce a broad finance-management offering without overwhelming visitors, and give them a clear path from exploring budgeting and expense tools to creating an account.",
  solution: "We organized the experience around financial feature discovery, expense visualization, and account access. A bold homepage, scannable feature cards, an amber expense chart, and coordinated registration and login screens connect the public pages into one responsive experience.",
  results: "A cohesive finance website with a recognizable visual identity, clear feature discovery, and straightforward account entry points. The device showcase follows the live public interface across desktop, tablet, and mobile.",
  category: "website-developing",
  subCategory: "Finance Management System",
  status: "Completed",
  publishStatus: "published",
  projectType: "imageGallery",
  features: [
    "Budgeting, expense analysis, and savings-goal feature discovery",
    "Expense-trend chart and financial insights presentation",
    "Account registration and login interfaces",
    "Responsive desktop, tablet, and mobile layouts",
    "Consistent black, white, and amber visual identity",
  ],
  images: [
    ["01-home-laptop", "Finance Flow homepage displayed on a realistic silver laptop"],
    ["02-home-phone", "Finance Flow mobile homepage on a graphite smartphone in a warm studio setting"],
    ["03-home-monitor", "Finance Flow Smart Budgeting homepage on a silver desktop monitor"],
    ["04-register-laptop", "Finance Flow account registration screen displayed on a silver laptop"],
    ["05-features-monitor", "Finance Flow budgeting and expense-management features on a desktop monitor"],
    ["06-features-phone", "Finance Flow financial feature cards displayed on a realistic graphite smartphone"],
    ["07-expenses-monitor", "Finance Flow expense-trend visualization displayed on a desktop monitor"],
    ["08-device-showcase", "Finance Flow responsive website displayed across laptop, phone, and tablet mockups"],
  ].map(([name, alt]) => ({ url: `/mockups/finance-flow/${name}.webp`, alt, width: 1536, height: 1024 })),
  liveLink: "https://financeflow.versanex.site/",
  creatorName: "VersaNex",
  reviews: [],
  relatedProjects: [
    { title: apexIeltsProject.title, slug: apexIeltsProject.slug, category: apexIeltsProject.category, images: [apexIeltsProject.homeImage] },
    { title: timeCenterProject.title, slug: timeCenterProject.slug, category: timeCenterProject.category, images: [timeCenterProject.homeImage] },
    { title: maxCoatProject.title, slug: maxCoatProject.slug, category: maxCoatProject.category, images: [maxCoatProject.homeImage] },
  ],
}

const callMindProject = {
  _id: "callmind-ai-voice-calling-platform",
  slug: "callmind-ai-voice-calling-platform",
  title: "CallMind AI - AI Voice Calling Platform",
  isStatic: true,
  logo: { url: "/mockups/callmind-ai/logo.png", alt: "CallMind AI logo", width: 2171, height: 724 },
  homeImage: { url: "/mockups/callmind-ai/08-device-showcase.webp", alt: "CallMind AI's live website displayed on a laptop and smartphone", width: 1536, height: 1024 },
  focusImage: { url: "/mockups/callmind-ai/call-mind-tablet-1.png", alt: "CallMind AI dashboard displayed on a tablet", width: 1448, height: 1086 },
  description: "A responsive website for an AI voice outreach platform. A crisp blue-and-white identity, an example campaign overview, and a clear three-step workflow introduce lead qualification, follow-ups, and meeting booking across desktop and mobile.",
  focusDescription: "CallMind AI introduces a focused approach to voice outreach: brief an agent, launch a campaign, and review the next steps. The homepage pairs a bold message with an illustrative campaign panel showing calls, connections, meetings, and recent activity.\n\nBlue accents, generous spacing, and straightforward platform sections make the offering easy to explore. Clear registration and login entry points connect the public website to account access, while responsive layouts carry the same identity onto smaller screens.",
  challenge: "Explain an AI calling platform in a way that makes its purpose and workflow immediately understandable, with a clear path from exploring the product to creating an account.",
  solution: "We presented the offering through a focused homepage, an example campaign panel, three platform capabilities, and a step-by-step campaign workflow. A consistent blue-and-white interface and direct account entry points keep the public experience clear across desktop and phone.",
  results: "A cohesive public website that makes CallMind AI's outreach offering easy to understand. The showcase uses screenshots of the live homepage, platform sections, workflow, and login interface in coordinated desktop and mobile mockups.",
  category: "website-developing",
  subCategory: "AI Voice Calling Platform",
  status: "Completed",
  publishStatus: "published",
  projectType: "imageGallery",
  features: [
    "Example campaign overview with call metrics and recent activity",
    "AI outreach, lead qualification, and follow-up feature presentation",
    "Three-step agent briefing and campaign workflow",
    "Registration and login entry points",
    "Responsive blue-and-white desktop and mobile interface",
  ],
  images: [
    ["01-home-laptop.webp", "CallMind AI homepage in a graphite laptop mockup", 1536, 1024],
    ["callmind-mobile-mockup.png?v=4bd0149ff240", "CallMind AI dashboard in the supplied mobile mockup", 1531, 1027],
    ["call-mind-pc.png", "CallMind AI call logs in the supplied PC mockup", 1448, 1086],
    ["04-platform-laptop.webp", "CallMind AI platform features and campaign workflow in a laptop mockup", 1536, 1024],
    ["05-workflow-monitor.webp", "CallMind AI campaign workflow displayed on a desktop monitor", 1536, 1024],
    ["06-platform-phone.webp", "CallMind AI mobile platform interface displayed on a smartphone", 1536, 1024],
    ["07-login-laptop.webp", "CallMind AI public login interface displayed on a laptop", 1536, 1024],
    ["08-device-showcase.webp", "CallMind AI website displayed across laptop and smartphone mockups", 1536, 1024],
  ].map(([name, alt, width, height]) => ({ url: `/mockups/callmind-ai/${name}`, alt, width, height })),
  galleryImages: [
    ["call-mind-pc.png", "CallMind AI call logs in the supplied PC mockup", 1448, 1086],
    ["callmind-mobile-mockup.png?v=4bd0149ff240", "CallMind AI dashboard in the supplied mobile mockup", 1531, 1027],
  ].map(([name, alt, width, height]) => ({ url: `/mockups/callmind-ai/${name}`, alt, width, height })),
  liveLink: "https://callmindai.versanex.site",
  creatorName: "VersaNex",
  createdAt: "2026-10-13T00:00:00.000Z",
  updatedAt: "2026-10-13T00:00:00.000Z",
  reviews: [],
  relatedProjects: [
    { title: financeFlowProject.title, slug: financeFlowProject.slug, category: financeFlowProject.category, images: [financeFlowProject.homeImage] },
    { title: apexIeltsProject.title, slug: apexIeltsProject.slug, category: apexIeltsProject.category, images: [apexIeltsProject.homeImage] },
    { title: timeCenterProject.title, slug: timeCenterProject.slug, category: timeCenterProject.category, images: [timeCenterProject.homeImage] },
  ],
}

const luxuryStayProject = {
  _id: "luxurystay",
  slug: "luxurystay",
  title: "LuxuryStay – Hotel & Hospitality Website",
  isStatic: true,
  homeImage: { url: "/mockups/luxurystay/08-device-showcase.webp", alt: "LuxuryStay hotel website displayed on a silver laptop and graphite smartphone", width: 1536, height: 1024 },
  logo: { url: "/clients-logo/LuxuryStay.png", alt: "LuxuryStay hotel logo" },
  focusImage: { url: "/mockups/luxurystay/02-mobile.webp", alt: "LuxuryStay mobile hotel website displayed on a graphite smartphone", width: 1536, height: 1024 },
  description: "A refined hospitality website that brings LuxuryStay's rooms, services, and guest experience online. Atmospheric hotel photography, warm amber accents, and clear navigation guide visitors from exploring the property to planning their stay across desktop and mobile.",
  focusDescription: "LuxuryStay welcomes guests through immersive hotel photography, a restrained black-and-amber identity, and clear calls to explore rooms and plan a stay.\n\nRoom discovery, hospitality services, property information, and contact options form a connected experience. Responsive layouts carry the same welcoming feel from a large desktop display to a phone.",
  challenge: "Translate the atmosphere of a luxury hotel into a welcoming digital experience, while making rooms, amenities, and the next step in planning a stay easy to find on every screen.",
  solution: "We organized the website around an immersive homepage, room discovery, service information, and clear guest account entry points. Warm amber accents, generous spacing, and consistent navigation connect the property's story with room exploration and direct contact options.",
  results: "A cohesive hospitality website that makes LuxuryStay's rooms and services easy to explore. Coordinated desktop and mobile layouts connect the hotel's visual identity with straightforward navigation and clear paths to planning a stay.",
  category: "website-developing",
  subCategory: "Hotel & Hospitality Website",
  status: "Completed",
  publishStatus: "published",
  projectType: "imageGallery",
  features: [
    "Immersive hotel photography and room discovery",
    "Hospitality services and property information",
    "Clear room exploration and stay-planning entry points",
    "Guest registration and login navigation",
    "Contact and WhatsApp inquiry options",
    "Responsive desktop and mobile layouts",
  ],
  images: [
    ["01-home-laptop", "LuxuryStay hotel homepage displayed on a realistic silver laptop"],
    ["02-mobile", "LuxuryStay responsive homepage displayed on a graphite smartphone"],
    ["03-rooms", "LuxuryStay room discovery page displayed on a silver laptop"],
    ["08-device-showcase", "LuxuryStay website displayed across a silver laptop and graphite smartphone"],
    ["04-services", "LuxuryStay hospitality services displayed on a desktop monitor"],
  ].map(([name, alt]) => ({ url: `/mockups/luxurystay/${name}.webp`, alt, width: 1536, height: 1024 })),
  galleryImages: [
    ["03-rooms", "LuxuryStay room discovery in a laptop mockup"],
    ["02-mobile", "LuxuryStay mobile guest experience in a smartphone mockup"],
    ["04-services", "LuxuryStay hospitality services in a desktop monitor mockup"],
  ].map(([name, alt]) => ({ url: `/mockups/luxurystay/${name}.webp`, alt, width: 1536, height: 1024 })),
  liveLink: "https://luxurystay.versanex.site/",
  creatorName: "VersaNex",
  reviews: [],
  relatedProjects: [
    { title: indusOliveProject.title, slug: indusOliveProject.slug, category: indusOliveProject.category, images: [indusOliveProject.homeImage] },
    { title: mahalForetHayatProject.title, slug: mahalForetHayatProject.slug, category: mahalForetHayatProject.category, images: [mahalForetHayatProject.homeImage] },
    { title: timeCenterProject.title, slug: timeCenterProject.slug, category: timeCenterProject.category, images: [timeCenterProject.homeImage] },
  ],
}

export function getStaticProject(slug) {
  const project = [timeCenterProject, indusOliveProject, apexIeltsProject, maxCoatProject, mahalForetHayatProject, fixitProject, financeFlowProject, callMindProject, luxuryStayProject].find(project => project.slug === slug)
  if (!project) return null
  return { ...project, images: project.images.map(image => ({ ...image })) }
}

// Read-only inventory for crawlers, including projects linked from case studies.
export function getStaticProjects() {
  return [timeCenterProject, indusOliveProject, apexIeltsProject, maxCoatProject, mahalForetHayatProject, fixitProject, financeFlowProject, callMindProject, luxuryStayProject]
    .map(project => getStaticProject(project.slug))
}

// Public project content; the editable database record keeps its originals.
export function withProjectMedia(project) {
  if (project?.slug === indusOliveProject.slug) {
    return {
      ...project,
      ...getStaticProject(project.slug),
    }
  }
  return getStaticProject(project?.slug) || project
}

// Include source-managed projects in public listings without changing admin records.
const hiddenProjectSlugs = new Set([
  "versanex-your-digital-innovation-partner",
  "aj-collection-e-commerce-fashion-lifestyle-store",
  "mern-stack-job-seeking-web-application",
])

export function isPublicProject(project) {
  return !hiddenProjectSlugs.has(project?.slug)
}

export function withPublicProjects(projects) {
  const additions = [luxuryStayProject, callMindProject, mahalForetHayatProject, maxCoatProject, apexIeltsProject, financeFlowProject]
  const addedSlugs = new Set(additions.map(project => project.slug))
  return [...additions.map(project => getStaticProject(project.slug)), ...projects.filter(project => isPublicProject(project) && !addedSlugs.has(project.slug)).map(withProjectMedia)]
}
