import { PortfolioData } from "@/types/portfolio";

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "ABHIJITH SUNIL",
    role: "Trade Settlement & Operations",
    subtitles: ["Client Service Specialist", "Financial Operations Professional"],
    collaborations: ["Infosys BPM", "State Street Corporation", "Boston Institute of Analytics"],
    university: "BBA · CMR University, Bengaluru",
    location: "Bengaluru, India",
    email: "abhijithps280401@gmail.com",
    phone: "+91 8105945591",
    resumeUrl: "/Abhijith_Sunil_Resume.pdf",
    headline: "Precision in every settlement.",
    aboutText:
      "Financial operations professional specializing in trade settlement, custody operations and client service, with hands-on experience supporting institutional clients across US and non-US markets. Expertise spans Repo, DVP, FICC, FX and SGA futures settlements, trade reconciliation, failed-trade investigation, exception management and operational risk mitigation. Achieved 98% straight-through processing and contributed to reducing unmatched trades by more than 50%.",
    socials: {
      linkedin: "https://linkedin.com/in/abhijith-sunil",
      github: "",
      behance: "",
    },
    heroImage: "/images/abhi/abhi-04.jpeg",
    portraitImage: "/images/abhi/abhi-04.jpeg",
  },
  projects: [
    {
      id: "01",
      title: "Service Excellence Award",
      client: "State Street Corporation",
      category: "Recognition",
      year: "2024",
      image: "/images/abhi/abhi-03.jpeg",
      description:
        "Recognized by the Managing Director for outstanding service and professional contribution.",
      metrics: "Service Excellence Award",
      deliverables: ["Client Service", "Operations"],
      url: "",
    },
    {
      id: "02",
      title: "Employee of the Month",
      client: "State Street Corporation",
      category: "Recognition",
      year: "2023",
      image: "/images/abhi/abhi-16.jpeg",
      description:
        "Awarded for strong performance and consistent delivery across settlement operations.",
      metrics: "Employee of the Month",
      deliverables: ["Performance", "Consistency"],
      url: "",
    },
  ],
  tools: [
    {
      id: "t1",
      name: "Trade Settlement Platforms",
      category: "Engineering & Workflow",
      proficiency: "Expert",
      desc: "EMDB, settlement and reconciliation systems, trade processing and matching applications",
    },
    {
      id: "t2",
      name: "Custody Management Systems",
      category: "Engineering & Workflow",
      proficiency: "Expert",
      desc: "Custody accounting systems, securities position management, cash operations",
    },
    {
      id: "t3",
      name: "Microsoft Excel",
      category: "Engineering & Workflow",
      proficiency: "Expert",
      desc: "Advanced financial modeling, reconciliation templates, MIS reporting and data analysis",
    },
    {
      id: "t4",
      name: "Risk Management",
      category: "Engineering & Workflow",
      proficiency: "Advanced",
      desc: "Settlement risk mitigation, exception management, operational risk controls, compliance monitoring",
    },
    {
      id: "t5",
      name: "Fixed Income & Equities",
      category: "Design & Prototyping",
      proficiency: "Advanced",
      desc: "Repo trade operations, DVP settlements, FICC, FX transactions, NAV operations",
    },
    {
      id: "t6",
      name: "Reconciliation & Breaks",
      category: "Design & Prototyping",
      proficiency: "Expert",
      desc: "Securities position reconciliation, cash balance reconciliation, settlement break resolution",
    },
    {
      id: "t7",
      name: "Client Service",
      category: "Design & Prototyping",
      proficiency: "Expert",
      desc: "Institutional client inquiry management, SLA compliance, relationship management, escalation handling",
    },
    {
      id: "t8",
      name: "Process Improvement",
      category: "Design & Prototyping",
      proficiency: "Advanced",
      desc: "Workflow standardization, knowledge sharing, team mentoring, operational controls",
    },
  ],
  designs: [
    {
      id: "d1",
      src: "",
      alt: "",
      title: "",
    },
  ],
  achievements: [
    {
      id: "a1",
      metric: "250+",
      title: "Daily Settlements",
      organization: "Infosys BPM",
      description:
        "Processed Repo 1, DVP Repo and FICC Repo settlements daily, ensuring accurate and timely cash and collateral movements.",
      tag: "Volume",
    },
    {
      id: "a2",
      metric: "98%",
      title: "STP Achievement",
      organization: "Infosys BPM & State Street",
      description:
        "Maintained straight-through processing through effective trade handling, reconciliation, and proactive exception management.",
      tag: "Accuracy",
    },
    {
      id: "a3",
      metric: "50%+",
      title: "Reduction in Unmatched Trades",
      organization: "State Street Corporation",
      description:
        "Contributed to reducing unmatched trade volumes through targeted investigation, structured escalation, and improved operational coordination.",
      tag: "Impact",
    },
    {
      id: "a4",
      metric: "$2B+",
      title: "Client Portfolios",
      organization: "State Street Corporation",
      description:
        "Daily securities position and cash balance reconciliation for institutional client portfolios exceeding $2 billion.",
      tag: "Scale",
    },
    {
      id: "a5",
      metric: "200+",
      title: "Daily Trade Affirmations",
      organization: "Infosys BPM",
      description:
        "Handled US and non-US market trade affirmations daily to minimize settlement risk across multiple markets.",
      tag: "Operations",
    },
    {
      id: "a6",
      metric: "150+",
      title: "Daily Reconciliations",
      organization: "Infosys BPM",
      description:
        "Reconciled EMDB and No-SSI trades daily, identifying and resolving discrepancies with high accuracy.",
      tag: "Precision",
    },
  ],
  services: [
    {
      id: "s1",
      number: "01",
      name: "Trade Settlement & Post-Trade Operations",
      description:
        "DVP and FICC Repo settlements, US and non-US market trade affirmations, cash and collateral movements, EMDB and No-SSI trade instruction processing, FX and SGA futures settlement.",
    },
    {
      id: "s2",
      number: "02",
      name: "Reconciliation & Risk Management",
      description:
        "Securities position reconciliation, cash balance reconciliation, settlement break resolution, exception and discrepancy management, settlement risk mitigation, corporate action processing.",
    },
    {
      id: "s3",
      number: "03",
      name: "Client Service & Stakeholder Management",
      description:
        "Institutional client inquiry management, broker and custodian coordination, cross-functional collaboration, escalation management, issue resolution, SLA compliance, relationship management.",
    },
    {
      id: "s4",
      number: "04",
      name: "Financial Instruments & Markets",
      description:
        "Fixed-income securities, equities settlement, money market instruments, Repo trade operations, foreign exchange transactions, NAV operations, corporate actions, valuation methodologies: DCF, comparables, precedent transactions.",
    },
    {
      id: "s5",
      number: "05",
      name: "Systems & Technical Proficiency",
      description:
        "Trade processing platforms, EMDB, settlement and reconciliation systems, custody accounting systems, advanced Microsoft Excel, reporting and MIS tools, exception tracking systems, workflow automation.",
    },
  ],
  journey: [
    {
      id: "j1",
      period: "June 2025 – Present",
      role: "Process Specialist",
      company: "Infosys BPM",
      summary:
        "Managing high-volume and time-sensitive trade settlement activities across multiple markets, ensuring operational accuracy, timely execution and effective risk management.",
      highlights: [
        "Processed 250+ daily Repo 1, DVP Repo and FICC Repo settlements",
        "Reconciled 150+ EMDB and No-SSI trades daily with high STP rates",
        "Affirmed 200+ US and non-US market trades daily to reduce settlement risk",
        "Led standardization of trade affirmation checklists improving workflow consistency",
        "Executed FX instructions and SGA futures settlements for 50+ daily transactions",
        "Mentored two colleagues on reconciliation workflows and operational best practices",
      ],
    },
    {
      id: "j2",
      period: "August 2022 – November 2024",
      role: "Associate – Custody Management Services",
      company: "State Street Corporation",
      summary:
        "Managed end-to-end custody operations for institutional clients, supporting trade settlement, cash operations, Repo trades, FX, NAV, securities reconciliation and corporate actions across multiple markets.",
      highlights: [
        "Served as key point of contact for 100+ daily client inquiries",
        "Reduced outstanding settlement exceptions from 240 to 110 within four months",
        "Led task force to strengthen escalation and exception-management processes",
        "Performed daily reconciliation for institutional client portfolios exceeding $2 billion",
        "Received Service Excellence Award from Managing Director",
        "Awarded Employee of the Month for strong performance and consistent delivery",
      ],
    },
    {
      id: "j3",
      period: "August 2021 – September 2021",
      role: "Sales & Marketing Intern",
      company: "Fortis Worldwide",
      summary:
        "Supported marketing initiatives, competitor research and data-driven business analysis.",
      highlights: [
        "Launched 3 social media campaigns increasing customer engagement by 25%",
        "Compiled and analyzed competitor data from 50 sources",
        "Delivered insights that improved pricing strategy accuracy by 15%",
      ],
    },
  ],
};
