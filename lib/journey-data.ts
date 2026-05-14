import { Stage, Milestone, Area } from "./types";

export const AREAS: Area[] = [
  { id: "market", label: "Market", color: "#657dfe" },
  { id: "product", label: "Product", color: "#8a9ffe" },
  { id: "traction", label: "Traction", color: "#00b894" },
  { id: "bizmodel", label: "Business Model", color: "#e17055" },
  { id: "team", label: "Team", color: "#a29bfe" },
];

export const MILESTONES: Milestone[] = [
  { id: "start", label: "Starting", minScore: 0, bgColor: "#F1F1F6", color: "#888" },
  { id: "exploring", label: "Exploring", minScore: 5, bgColor: "#e6f1fb", color: "#185fa5" },
  { id: "validating", label: "Validating", minScore: 10, bgColor: "#eeedfe", color: "#534ab7" },
  { id: "almost", label: "Almost there", minScore: 15, bgColor: "#fffaeb", color: "#92610a" },
  { id: "grow-ready", label: "Pre-seed Ready", minScore: 20, bgColor: "#e1f5ee", color: "#0f6e56" },
];

export const MAX_POINTS = 20;

export const STAGES: Stage[] = [
  {
    id: 1,
    name: "Problem Validation Fit",
    subtitle: "0–20 pts",
    color: "#657dfe",
    bgColor: "#eef0ff",
    northStarMetric: {
      title: "Customer Problem Validation Score",
      description: "Measure how well you understand and have validated the problem you're solving. Target: 8+ validated customer interviews with clear pain points.",
    },
    groups: [
      {
        id: "identify-problem",
        name: "Identify Problem Worth Solving",
        tasks: [
          {
            id: "task-1-1",
            title: "Define the specific problem you are solving",
            points: 2,
            area: "market",
            badges: ["gate"],
            detail: {
              why: "Clarity on the problem is the foundation of everything. Investors want to see that you deeply understand the pain point you're addressing.",
              how: "Interview at least 10 potential customers. Document their exact words about the problem. Look for patterns and emotional language.",
              evidence: "Written problem statement with supporting customer quotes and data.",
            },
            gateMessage: "This is a foundational task. Complete it before moving forward.",
            notesPrompt: "What specific problem are you solving? Who experiences this problem?",
            resources: [
              { type: "article", title: "The Mom Test", author: "Rob Fitzpatrick", url: "https://www.momtestbook.com/", description: "How to talk to customers and learn if your business is a good idea." },
              { type: "video", title: "How to Talk to Users", author: "Y Combinator", url: "https://www.youtube.com/watch?v=MT4Ig2uqjTc", description: "Eric Migicovsky on user interviews." },
            ],
          },
          {
            id: "task-1-2",
            title: "Identify your target customer segment",
            points: 2,
            area: "market",
            badges: ["gate"],
            detail: {
              why: "You can't serve everyone. Knowing exactly who you're building for helps focus your efforts and resources.",
              how: "Create detailed customer personas. Include demographics, behaviors, and pain points. Prioritize one primary segment.",
              evidence: "Customer persona documents with clear segmentation criteria.",
            },
            gateMessage: "Define your beachhead market before expanding.",
            notesPrompt: "Who is your ideal customer? Be specific about demographics and behaviors.",
            resources: [
              { type: "article", title: "Customer Segmentation Guide", author: "HubSpot", url: "https://www.hubspot.com/make-my-persona" },
              { type: "tool", title: "Persona Builder", author: "Xtensio", url: "https://xtensio.com/user-persona-template/" },
            ],
          },
          {
            id: "task-1-3",
            title: "Validate problem exists with customer interviews",
            points: 2,
            area: "traction",
            badges: ["north-star"],
            detail: {
              why: "Assumptions are dangerous. Direct conversations reveal if the problem is real and painful enough for people to pay for a solution.",
              how: "Conduct at least 20 problem discovery interviews. Use open-ended questions. Record and analyze responses.",
              evidence: "Interview recordings/notes, synthesis document with key insights.",
            },
            notesPrompt: "How many interviews have you conducted? What patterns emerged?",
            resources: [
              { type: "book", title: "Talking to Humans", author: "Giff Constable", url: "https://www.talkingtohumans.com/", description: "A practical guide to customer development." },
              { type: "podcast", title: "Customer Discovery Tactics", author: "Startup School", url: "https://www.youtube.com/watch?v=2pJBqGcQe9Y" },
            ],
          },
        ],
      },
      {
        id: "market-opportunity",
        name: "Understand Market Opportunity",
        tasks: [
          {
            id: "task-2-1",
            title: "Research market size (TAM, SAM, SOM)",
            points: 1,
            area: "market",
            badges: [],
            detail: {
              why: "Investors need to see the opportunity is large enough to generate significant returns.",
              how: "Use top-down and bottom-up approaches. Find industry reports. Calculate realistic serviceable market.",
              evidence: "Market sizing document with sources and methodology.",
            },
            notesPrompt: "What is your TAM, SAM, and SOM? What sources did you use?",
            resources: [
              { type: "article", title: "How to Calculate Market Size", author: "HubSpot", url: "https://www.hubspot.com/tam-sam-som" },
              { type: "tool", title: "Market Research Sources", author: "Statista", url: "https://www.statista.com/" },
            ],
          },
          {
            id: "task-2-2",
            title: "Identify key competitors and alternatives",
            points: 1,
            area: "market",
            badges: [],
            detail: {
              why: "Understanding competition shows market awareness and helps define your positioning.",
              how: "Map direct competitors, indirect alternatives, and the 'do nothing' option. Analyze strengths and weaknesses.",
              evidence: "Competitive analysis matrix with key differentiators.",
            },
            notesPrompt: "Who are your competitors? What are their strengths and weaknesses?",
            resources: [
              { type: "article", title: "Competitive Analysis Framework", author: "Crayon", url: "https://www.crayon.co/competitive-intelligence" },
              { type: "video", title: "How to Analyze Competition", author: "Slidebean", url: "https://www.youtube.com/watch?v=7MXzL6r5Pps" },
            ],
          },
          {
            id: "task-2-3",
            title: "Define your unique value proposition",
            points: 2,
            area: "product",
            badges: ["gate"],
            detail: {
              why: "Your UVP is why customers will choose you over alternatives. It's central to your pitch.",
              how: "Articulate what makes you different AND better. Test messaging with potential customers.",
              evidence: "Clear UVP statement validated by customer feedback.",
            },
            gateMessage: "Your UVP is critical for investor conversations.",
            notesPrompt: "What makes your solution unique? Why will customers choose you?",
            resources: [
              { type: "article", title: "Value Proposition Canvas", author: "Strategyzer", url: "https://www.strategyzer.com/canvas/value-proposition-canvas" },
              { type: "book", title: "Crossing the Chasm", author: "Geoffrey Moore", url: "https://www.amazon.com/Crossing-Chasm-Marketing-High-Tech-Mainstream/dp/0060517123" },
            ],
          },
        ],
      },
      {
        id: "solution-hypothesis",
        name: "Form Solution Hypothesis",
        tasks: [
          {
            id: "task-3-1",
            title: "Define your minimum viable solution concept",
            points: 2,
            area: "product",
            badges: ["north-star"],
            detail: {
              why: "Starting with a focused MVP lets you test assumptions quickly without over-investing.",
              how: "List must-have features only. Define what success looks like. Plan the simplest test.",
              evidence: "MVP specification document with prioritized features.",
            },
            notesPrompt: "What is the simplest version of your product that delivers value?",
            resources: [
              { type: "video", title: "How to Build an MVP", author: "Y Combinator", url: "https://www.youtube.com/watch?v=1hHMwLxN6EM" },
              { type: "article", title: "MVP Guide", author: "ProductPlan", url: "https://www.productplan.com/glossary/minimum-viable-product/" },
            ],
          },
          {
            id: "task-3-2",
            title: "Outline key assumptions to test",
            points: 1,
            area: "product",
            badges: [],
            detail: {
              why: "Every startup is built on assumptions. Identifying them lets you systematically de-risk the business.",
              how: "List all assumptions about problem, solution, market, and model. Rank by risk and importance.",
              evidence: "Assumptions log with testing priorities.",
            },
            notesPrompt: "What are your riskiest assumptions? How will you test them?",
            resources: [
              { type: "article", title: "Lean Startup Methodology", author: "Eric Ries", url: "https://theleanstartup.com/" },
              { type: "tool", title: "Assumption Mapping", author: "Strategyzer", url: "https://www.strategyzer.com/library/how-to-test-your-riskiest-assumptions-first" },
            ],
          },
          {
            id: "task-3-3",
            title: "Create initial business model canvas",
            points: 2,
            area: "bizmodel",
            badges: ["gate"],
            detail: {
              why: "The canvas provides a holistic view of your business and helps identify gaps in your thinking.",
              how: "Fill out all 9 sections. Focus on customer segments, value props, and revenue streams first.",
              evidence: "Completed Business Model Canvas with explanations.",
            },
            gateMessage: "A complete canvas shows investors you've thought holistically.",
            notesPrompt: "Have you completed all 9 sections of the Business Model Canvas?",
            resources: [
              { type: "tool", title: "Business Model Canvas", author: "Strategyzer", url: "https://www.strategyzer.com/canvas/business-model-canvas" },
              { type: "video", title: "BMC Explained", author: "Strategyzer", url: "https://www.youtube.com/watch?v=QoAOzMTLP5s" },
            ],
          },
        ],
      },
      {
        id: "team-foundation",
        name: "Build Team Foundation",
        tasks: [
          {
            id: "task-4-1",
            title: "Define founder roles and responsibilities",
            points: 1,
            area: "team",
            badges: [],
            detail: {
              why: "Clear roles prevent conflict and ensure all critical functions are covered.",
              how: "Map skills to needs. Assign ownership areas. Document decision-making authority.",
              evidence: "Roles and responsibilities document signed by all founders.",
            },
            notesPrompt: "What are each founder's responsibilities? How do you make decisions?",
            resources: [
              { type: "article", title: "Co-founder Agreements", author: "Y Combinator", url: "https://www.ycombinator.com/library/5b-cofounder-equity-split" },
              { type: "podcast", title: "Founder Dynamics", author: "First Round", url: "https://www.youtube.com/watch?v=WMPDq3_Fa7w" },
            ],
          },
          {
            id: "task-4-2",
            title: "Identify skill gaps in the team",
            points: 1,
            area: "team",
            badges: [],
            detail: {
              why: "Knowing gaps early helps you hire strategically or find advisors to fill them.",
              how: "List all skills needed to execute. Rate current team capability. Prioritize critical gaps.",
              evidence: "Team skills matrix with gap analysis.",
            },
            notesPrompt: "What skills does your team lack? How will you address these gaps?",
            resources: [
              { type: "article", title: "Building Startup Teams", author: "First Round", url: "https://review.firstround.com/the-anatomy-of-a-great-startup-team/" },
              { type: "video", title: "Hiring Your First Team", author: "Y Combinator", url: "https://www.youtube.com/watch?v=1iqGJcxMqFE" },
            ],
          },
          {
            id: "task-4-3",
            title: "Establish basic operating rhythms",
            points: 1,
            area: "team",
            badges: [],
            detail: {
              why: "Consistent rhythms build habits that scale. They keep the team aligned and accountable.",
              how: "Set weekly meetings, goal reviews, and communication norms. Start simple.",
              evidence: "Team operating manual with meeting cadences.",
            },
            notesPrompt: "What are your weekly rituals? How do you stay aligned?",
            resources: [
              { type: "article", title: "Startup Operating Rhythms", author: "Notion", url: "https://www.notion.so/help/guides/organize-your-startup-with-ops-docs" },
              { type: "tool", title: "Team Collaboration", author: "Notion", url: "https://www.notion.so/" },
            ],
          },
          {
            id: "task-4-4",
            title: "Set up basic legal structure",
            points: 2,
            area: "bizmodel",
            badges: ["gate"],
            detail: {
              why: "Proper legal foundation protects founders and prepares you for investment.",
              how: "Choose entity type. Draft founder agreements. Set up equity structure.",
              evidence: "Incorporation documents, founder agreements, cap table.",
            },
            gateMessage: "Legal structure is required before taking investment.",
            notesPrompt: "What entity type did you choose? Is your cap table set up?",
            resources: [
              { type: "tool", title: "Stripe Atlas", author: "Stripe", url: "https://stripe.com/atlas", description: "Start your company in days, not weeks." },
              { type: "article", title: "Startup Legal Basics", author: "Y Combinator", url: "https://www.ycombinator.com/library/4A-a-guide-to-seed-fundraising" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Product Market Fit",
    subtitle: "21–40 pts",
    color: "#00b894",
    bgColor: "#e1f5ee",
    groups: [],
  },
  {
    id: 3,
    name: "Business Model Validation",
    subtitle: "41–60 pts",
    color: "#e17055",
    bgColor: "#ffeee9",
    groups: [],
  },
  {
    id: 4,
    name: "Growth Readiness",
    subtitle: "61–80 pts",
    color: "#a29bfe",
    bgColor: "#eeedfe",
    groups: [],
  },
];
