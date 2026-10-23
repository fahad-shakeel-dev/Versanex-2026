const stories = {
  "time-center-modern-watch-retail-website": {
    challenge: "Create an online experience that reflects a premium watch retailer, makes its collection easy to explore, and gives the team control over products and content.",
    solution: "We built a responsive Next.js storefront with dynamic product listings, category filtering, and a dedicated admin panel. The interface balances a refined retail identity with straightforward browsing and content management.",
  },
  "food-delivery-web-app": {
    challenge: "Bring Indus & Olive's menu and ordering experience online while giving the restaurant a central place to manage its orders, customers, and food listings.",
    solution: "We built a restaurant website where customers can explore the online menu, browse food items, add dishes to their cart, and complete checkout. A detailed admin panel lets the restaurant manage orders, customer accounts, menu categories, food listings, pricing, and availability.",
  },
  "mern-stack-job-seeking-web-application": {
    challenge: "Connect job seekers and employers through a clear, secure workflow for finding opportunities, submitting resumes, and managing applications.",
    solution: "We developed a MERN job portal with verified accounts, Google sign-in, resume uploads, and application tracking. Employers can publish and manage listings through a responsive React interface.",
  },
  "real-time-chat": {
    challenge: "Make one-to-one messaging feel immediate while protecting account access, preserving conversations, and supporting more than just text.",
    solution: "We combined Next.js, Express, MongoDB, and Socket.io for live messaging and persistent chat history. Email verification, authenticated connections, typing indicators, and Cloudinary media storage support the communication experience.",
  },
  "seo-master-dashboard": {
    challenge: "Bring SEO research, site analysis, and performance reporting into a single dashboard with secure access and understandable insights.",
    solution: "We built a Flask dashboard that combines AI-powered content analysis with SEO integrations, keyword research, competitor analysis, and site audits. PostgreSQL supports account and report storage.",
  },
  "university-portal": {
    challenge: "Plan a shared digital platform for students, faculty, and administrators, covering academic workflows while keeping each role's access clearly defined.",
    solution: "The portal is being developed around course management, enrollment, assignments, grading, and announcements. Role-based access and an administrative dashboard form the foundation for a connected academic experience.",
  },
  "versanex-your-digital-innovation-partner": {
    challenge: "Present a broad range of digital services through a coherent online identity, with clear navigation and a direct way for prospective clients to get in touch.",
    solution: "We brought service information, project content, and contact flows together in a responsive website. Reusable components, content management, and GSAP and Framer Motion animations support the experience.",
  },
  "aj-collection-e-commerce-fashion-lifestyle-store": {
    challenge: "Create a fashion and lifestyle storefront that gives products room to stand out and makes the journey from discovery to checkout easy to follow.",
    solution: "The store combines a product listing grid, product details, variants, filtering, and a shopping cart with a responsive checkout flow. Image interactions and page transitions complement the retail interface.",
  },
  "salon-management-system": {
    challenge: "Keep appointment schedules, salon services, specialist availability, and client visits coordinated in one place.",
    solution: "The salon management experience brings together a daily operations overview, appointment scheduling, team availability, and service management. The portfolio mockups illustrate how these core workflows fit into one clear workspace.",
  },  "hrms-system": {
    challenge: "Bring employee administration, attendance, recruitment, and payroll into a connected workspace for HR teams.",
    solution: "PeopleFlow combines an HR overview with dedicated employee, attendance, and recruitment workflows, alongside leave, payroll, and reporting tools.",
  },  "petrol-management-system": {
    challenge: "Organize the many moving parts of petrol station operations, from fuel stock and sales to staff, shifts, and point-of-sale activity.",
    solution: "The PetroFlow dashboard brings daily sales, fuel stock, credit balances, and activity into one view. Dedicated screens extend that workflow to employees, tank inventory, and point of sale.",
  },
  "finance-flow-finance-management-system": {
    challenge: "Give users a clear view of their finances, bringing expenses, budgets, reports, and savings goals together in one place.",
    solution: "Finance Flow combines expense tracking, budget management, financial insights, and savings goals in a single interface. User profiles and reporting help organize the financial management experience.",
  },
  "hotel-management-system": {
    challenge: "Connect room discovery and customer reservations with the hotel's tools for managing availability, pricing, and bookings.",
    solution: "We built a responsive hotel application with room filtering, detailed room pages, authenticated booking flows, and an admin dashboard. Role-based access separates customer and administrative tasks.",
  },
  "fixit-your-ai-powered-home-services-companion": {
    challenge: "Help users identify the right home service and connect with a suitable professional through a straightforward mobile booking experience.",
    solution: "Fixit brings service discovery, professional profiles, packages, scheduling, and booking history into a mobile app. Its photo-based AI problem finder recommends a service from the issue a user captures.",
  },
}

export function getProjectStory(project) {
  const name = (project.title || "Project").split(/\s+[–—-]\s+/)[0]
  const features = [...new Set((project.features || []).filter(item => typeof item === "string" && item.trim().length > 16))].slice(0, 3)
  const story = stories[project.slug]
  const solution = project.solution || story?.solution || project.description || `Explore the design and implementation of ${name} through its project screenshots.`
  const challenge = project.challenge || story?.challenge || `Create a clear digital experience for ${name}, with its core requirements brought together in a consistent interface.`
  const completed = project.status?.toLowerCase() === "completed"
  const results = project.results || (features.length
    ? `${completed ? "The resulting experience" : "The project"} brings together ${features.map(item => item.charAt(0).toLowerCase() + item.slice(1)).join("; ")}.`
    : solution)
  return { name, challenge, solution, results, features }
}
