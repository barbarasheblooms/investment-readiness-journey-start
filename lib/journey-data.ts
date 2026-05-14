import { Stage, Milestone } from "./types";

export const MILESTONES: Milestone[] = [
  { id: "start", label: "Start", points: 0 },
  { id: "exploring", label: "Exploring", points: 5 },
  { id: "validating", label: "Validating", points: 10 },
  { id: "almost", label: "Almost", points: 15 },
  { id: "grow-ready", label: "Grow Ready", points: 20 },
];

export const MAX_POINTS = 20;

export const STAGES: Stage[] = [
  {
    id: 1,
    title: "Stage 1",
    subtitle: "Problem Validation Fit",
    pointsRange: [0, 20],
    locked: false,
    groups: [
      {
        id: "identify-problem",
        title: "Identify Problem Worth Solving",
        tasks: [
          {
            id: "task-1-1",
            label: "Define the specific problem you are solving",
            points: 2,
            badges: ["gate"],
            why: "Clarity on the problem is the foundation of everything. Investors want to see that you deeply understand the pain point you're addressing.",
            how: "Interview at least 10 potential customers. Document their exact words about the problem. Look for patterns and emotional language.",
            evidence: "Written problem statement with supporting customer quotes and data.",
            resources: [
              { type: "article", title: "The Mom Test", url: "https://www.momtestbook.com/" },
              { type: "video", title: "How to Talk to Users", url: "https://www.youtube.com/watch?v=MT4Ig2uqjTc" },
            ],
          },
          {
            id: "task-1-2",
            label: "Identify your target customer segment",
            points: 2,
            badges: ["gate"],
            why: "You can't serve everyone. Knowing exactly who you're building for helps focus your efforts and resources.",
            how: "Create detailed customer personas. Include demographics, behaviors, and pain points. Prioritize one primary segment.",
            evidence: "Customer persona documents with clear segmentation criteria.",
            resources: [
              { type: "article", title: "Customer Segmentation Guide", url: "https://www.hubspot.com/make-my-persona" },
              { type: "tool", title: "Persona Builder", url: "https://xtensio.com/user-persona-template/" },
            ],
          },
          {
            id: "task-1-3",
            label: "Validate problem exists with customer interviews",
            points: 2,
            badges: ["northstar"],
            why: "Assumptions are dangerous. Direct conversations reveal if the problem is real and painful enough for people to pay for a solution.",
            how: "Conduct at least 20 problem discovery interviews. Use open-ended questions. Record and analyze responses.",
            evidence: "Interview recordings/notes, synthesis document with key insights.",
            resources: [
              { type: "book", title: "Talking to Humans", url: "https://www.talkingtohumans.com/" },
              { type: "podcast", title: "Customer Discovery Tactics", url: "https://www.youtube.com/watch?v=2pJBqGcQe9Y" },
            ],
          },
        ],
      },
      {
        id: "market-opportunity",
        title: "Understand Market Opportunity",
        tasks: [
          {
            id: "task-2-1",
            label: "Research market size (TAM, SAM, SOM)",
            points: 1,
            badges: [],
            why: "Investors need to see the opportunity is large enough to generate significant returns.",
            how: "Use top-down and bottom-up approaches. Find industry reports. Calculate realistic serviceable market.",
            evidence: "Market sizing document with sources and methodology.",
            resources: [
              { type: "article", title: "How to Calculate Market Size", url: "https://www.hubspot.com/tam-sam-som" },
              { type: "tool", title: "Market Research Sources", url: "https://www.statista.com/" },
            ],
          },
          {
            id: "task-2-2",
            label: "Identify key competitors and alternatives",
            points: 1,
            badges: [],
            why: "Understanding competition shows market awareness and helps define your positioning.",
            how: "Map direct competitors, indirect alternatives, and the 'do nothing' option. Analyze strengths and weaknesses.",
            evidence: "Competitive analysis matrix with key differentiators.",
            resources: [
              { type: "article", title: "Competitive Analysis Framework", url: "https://www.crayon.co/competitive-intelligence" },
              { type: "video", title: "How to Analyze Competition", url: "https://www.youtube.com/watch?v=7MXzL6r5Pps" },
            ],
          },
          {
            id: "task-2-3",
            label: "Define your unique value proposition",
            points: 2,
            badges: ["gate"],
            why: "Your UVP is why customers will choose you over alternatives. It's central to your pitch.",
            how: "Articulate what makes you different AND better. Test messaging with potential customers.",
            evidence: "Clear UVP statement validated by customer feedback.",
            resources: [
              { type: "article", title: "Value Proposition Canvas", url: "https://www.strategyzer.com/canvas/value-proposition-canvas" },
              { type: "book", title: "Crossing the Chasm", url: "https://www.amazon.com/Crossing-Chasm-Marketing-High-Tech-Mainstream/dp/0060517123" },
            ],
          },
        ],
      },
      {
        id: "solution-hypothesis",
        title: "Form Solution Hypothesis",
        tasks: [
          {
            id: "task-3-1",
            label: "Define your minimum viable solution concept",
            points: 2,
            badges: ["northstar"],
            why: "Starting with a focused MVP lets you test assumptions quickly without over-investing.",
            how: "List must-have features only. Define what success looks like. Plan the simplest test.",
            evidence: "MVP specification document with prioritized features.",
            resources: [
              { type: "video", title: "How to Build an MVP", url: "https://www.youtube.com/watch?v=1hHMwLxN6EM" },
              { type: "article", title: "MVP Guide", url: "https://www.productplan.com/glossary/minimum-viable-product/" },
            ],
          },
          {
            id: "task-3-2",
            label: "Outline key assumptions to test",
            points: 1,
            badges: [],
            why: "Every startup is built on assumptions. Identifying them lets you systematically de-risk the business.",
            how: "List all assumptions about problem, solution, market, and model. Rank by risk and importance.",
            evidence: "Assumptions log with testing priorities.",
            resources: [
              { type: "article", title: "Lean Startup Methodology", url: "https://theleanstartup.com/" },
              { type: "tool", title: "Assumption Mapping", url: "https://www.strategyzer.com/library/how-to-test-your-riskiest-assumptions-first" },
            ],
          },
          {
            id: "task-3-3",
            label: "Create initial business model canvas",
            points: 2,
            badges: ["gate"],
            why: "The canvas provides a holistic view of your business and helps identify gaps in your thinking.",
            how: "Fill out all 9 sections. Focus on customer segments, value props, and revenue streams first.",
            evidence: "Completed Business Model Canvas with explanations.",
            resources: [
              { type: "tool", title: "Business Model Canvas", url: "https://www.strategyzer.com/canvas/business-model-canvas" },
              { type: "video", title: "BMC Explained", url: "https://www.youtube.com/watch?v=QoAOzMTLP5s" },
            ],
          },
        ],
      },
      {
        id: "team-foundation",
        title: "Build Team Foundation",
        tasks: [
          {
            id: "task-4-1",
            label: "Define founder roles and responsibilities",
            points: 1,
            badges: [],
            why: "Clear roles prevent conflict and ensure all critical functions are covered.",
            how: "Map skills to needs. Assign ownership areas. Document decision-making authority.",
            evidence: "Roles and responsibilities document signed by all founders.",
            resources: [
              { type: "article", title: "Co-founder Agreements", url: "https://www.ycombinator.com/library/5b-cofounder-equity-split" },
              { type: "podcast", title: "Founder Dynamics", url: "https://www.youtube.com/watch?v=WMPDq3_Fa7w" },
            ],
          },
          {
            id: "task-4-2",
            label: "Identify skill gaps in the team",
            points: 1,
            badges: [],
            why: "Knowing gaps early helps you hire strategically or find advisors to fill them.",
            how: "List all skills needed to execute. Rate current team capability. Prioritize critical gaps.",
            evidence: "Team skills matrix with gap analysis.",
            resources: [
              { type: "article", title: "Building Startup Teams", url: "https://review.firstround.com/the-anatomy-of-a-great-startup-team/" },
              { type: "video", title: "Hiring Your First Team", url: "https://www.youtube.com/watch?v=1iqGJcxMqFE" },
            ],
          },
          {
            id: "task-4-3",
            label: "Establish basic operating rhythms",
            points: 1,
            badges: [],
            why: "Consistent rhythms build habits that scale. They keep the team aligned and accountable.",
            how: "Set weekly meetings, goal reviews, and communication norms. Start simple.",
            evidence: "Team operating manual with meeting cadences.",
            resources: [
              { type: "article", title: "Startup Operating Rhythms", url: "https://www.notion.so/help/guides/organize-your-startup-with-ops-docs" },
              { type: "tool", title: "Team Collaboration", url: "https://www.notion.so/" },
            ],
          },
          {
            id: "task-4-4",
            label: "Set up basic legal structure",
            points: 2,
            badges: ["gate"],
            why: "Proper legal foundation protects founders and prepares you for investment.",
            how: "Choose entity type. Draft founder agreements. Set up equity structure.",
            evidence: "Incorporation documents, founder agreements, cap table.",
            resources: [
              { type: "tool", title: "Stripe Atlas", url: "https://stripe.com/atlas" },
              { type: "article", title: "Startup Legal Basics", url: "https://www.ycombinator.com/library/4A-a-guide-to-seed-fundraising" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Stage 2",
    subtitle: "Product Market Fit",
    pointsRange: [21, 40],
    locked: true,
    groups: [],
  },
  {
    id: 3,
    title: "Stage 3",
    subtitle: "Business Model Validation",
    pointsRange: [41, 60],
    locked: true,
    groups: [],
  },
  {
    id: 4,
    title: "Stage 4",
    subtitle: "Growth Readiness",
    pointsRange: [61, 80],
    locked: true,
    groups: [],
  },
];
