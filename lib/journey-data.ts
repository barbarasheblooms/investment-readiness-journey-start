import { Stage, Milestone, Area } from "./types";

export const AREAS: Area[] = [
  { id: "market", label: "Market", color: "#0f6e56" },
  { id: "product", label: "Product", color: "#185fa5" },
  { id: "traction", label: "Traction", color: "#993556" },
  { id: "bizmodel", label: "Business Model", color: "#854f0b" },
  { id: "team", label: "Team", color: "#534ab7" },
];

export const MILESTONES: Milestone[] = [
  { id: "exploring", label: "Exploring", minScore: 0, bgColor: "#F1F1F6", color: "#888" },
  { id: "preseed", label: "Pre-seed", minScore: 20, bgColor: "#faeeda", color: "#ba7517" },
  { id: "seed-ready", label: "Seed-ready", minScore: 50, bgColor: "#eef0ff", color: "#657dfe" },
  { id: "seed-plus", label: "Seed+", minScore: 75, bgColor: "#eef0ff", color: "#657dfe" },
  { id: "series-a", label: "Series A", minScore: 100, bgColor: "#eeedfe", color: "#3d1a6b" },
];

export const MAX_POINTS = 100;
export const RAISE_GATE = 75;

export const STAGES: Stage[] = [
  {
    id: 1,
    name: "Problem Validation Fit",
    subtitle: "0 → 20 pts · 3–6 months",
    color: "#657dfe",
    bgColor: "#eef0ff",
    maxPts: 20,
    northStarMetric: {
      title: "Pain Severity: 70%+ score 4-5 out of 5",
      description: "If 70%+ of real strangers rate the pain at 4-5, the problem is worth solving. Below this threshold, no product will generate consistent demand.",
    },
    gate: "Score ≥20 · Pain severity 70%+ · 3 inorganic demand signals",
    groups: [
      {
        id: "foundation",
        name: "Foundation",
        tasks: [
          {
            id: "task-1",
            title: "Problem Statement",
            points: 2,
            area: "market",
            badges: [],
            detail: {
              why: "Describes the problem from the customer's POV in 1 sentence, without mentioning the solution. This is the compass for everything that follows.",
              how: "Use format: 'People who [context] struggle with [problem] because [reason].' The sentence is correct if any external person can identify whether they have the problem without the founder's help.",
              evidence: "The sentence exists in writing.",
            },
          },
          {
            id: "task-2",
            title: "Stakeholder Mapping",
            points: 3,
            area: "market",
            badges: [],
            detail: {
              why: "Identifies who has the problem, who feels it most intensely, who has decision-making power, and who influences that decision.",
              how: "Create a diagram with at least 3 stakeholder types. For each: relation to the problem, whether they pay or use, and how intense the pain is.",
              evidence: "Diagram with 3+ stakeholder types, problem relation, and payer vs. user separation.",
            },
          },
        ],
      },
      {
        id: "research-evidence",
        name: "Research & Evidence",
        tasks: [
          {
            id: "task-3",
            title: "Pain Interviews — 20+ real people",
            points: 4,
            area: "market",
            badges: [],
            detail: {
              why: "Conduct 20+ interviews with people who live the problem — not friends, family, or colleagues. The goal is to listen, not convince.",
              how: "Each interview must last at least 30 minutes without presenting the solution. Use Rob Fitzpatrick's Mom Test: ask about the interviewee's life, not the idea.",
              evidence: "Record with name, date and 3+ direct quotes per interview.",
            },
          },
          {
            id: "task-4",
            title: "Find the Pattern",
            points: 4,
            area: "market",
            badges: [],
            detail: {
              why: "Synthesize what was learned in interviews and identify patterns: which problems repeat, which phrases appear consistently, what surprises.",
              how: "Use a thematic analysis matrix: group quotes by recurring theme. Identify the 3–5 truths that appear in 60%+ of conversations.",
              evidence: "Doc with identified patterns, key insights, and supporting quotes.",
            },
          },
          {
            id: "task-5",
            title: "Alternative Mapping",
            points: 3,
            area: "market",
            badges: [],
            detail: {
              why: "Document what people use today to solve the problem: competitors, spreadsheets, WhatsApp, hiring someone, doing nothing.",
              how: "For each alternative: what works, what fails, cost in time and money. Analysis must be based exclusively on interview data.",
              evidence: "Table with 5+ current alternatives and gap analysis based on interview data.",
            },
          },
          {
            id: "task-6",
            title: "Pain Severity — 70%+ score 4-5",
            points: 4,
            area: "market",
            badges: ["gate", "north-star"],
            detail: {
              why: "70%+ of interviewees must rate severity at 4 or 5 on a 1-5 scale. Below that threshold, the problem is not painful enough to generate a purchase.",
              how: "At the end of each interview, ask the interviewee to rate problem intensity on a 1-5 scale. If average falls below 4, revise the segment or problem framing.",
              evidence: "Score distribution from 15+ interviewees with 70%+ at 4 or 5.",
            },
          },
        ],
      },
      {
        id: "icp-market",
        name: "ICP & Market Size",
        tasks: [
          {
            id: "task-7",
            title: "ICP Definition",
            points: 2,
            area: "market",
            badges: [],
            detail: {
              why: "Define a specific archetype of the primary customer. A generic ICP does not guide product or marketing decisions. A specific ICP does.",
              how: "Based on interview patterns, identify the subgroup that feels the pain most intensely. Give a fictional name, describe the life context, and cite a real interview quote.",
              evidence: "1-page archetype doc with fictional name, context, and a real interviewee quote.",
            },
          },
          {
            id: "task-8",
            title: "TAM Estimate",
            points: 2,
            area: "market",
            badges: [],
            detail: {
              why: "Estimate how many people have the problem. Needs to have a defensible logic. Investors always ask about market size.",
              how: "Use a bottom-up approach: ICP count × % experiencing the problem × annual revenue per customer.",
              evidence: "TAM/SAM/SOM estimate with cited methodology. Bottom-up preferred.",
            },
          },
          {
            id: "task-9",
            title: "Inorganic Demand Signals (3+)",
            points: 0,
            area: "market",
            badges: ["gate"],
            detail: {
              why: "Identify at least 3 demand signals from people the founder did not previously know. Signals from friends do not count.",
              how: "Valid signals: someone who spontaneously asked if a solution exists, signed up to a waitlist, or shared the problem on social media.",
              evidence: "3+ demand signals with verifiable origin from previously unknown people.",
            },
          },
        ],
      },
      {
        id: "solution-exploration",
        name: "Solution Exploration",
        tasks: [
          {
            id: "task-10",
            title: "Sketch 3 Possible Solutions",
            points: 0,
            area: "product",
            badges: [],
            detail: {
              why: "The first idea is rarely the best. Forcing 3 different options breaks confirmation bias and creates space for more creative thinking.",
              how: "For each solution: main mechanism, who pays, how it delivers value, and implementation effort. The 3 options must be genuinely different.",
              evidence: "Doc with 3 distinct solutions and their value logic.",
            },
          },
          {
            id: "task-11",
            title: "Test 3 Concepts with 3+ People",
            points: 0,
            area: "product",
            badges: [],
            detail: {
              why: "The market decides which solution resonates, not the founder. Testing before building saves months of work in the wrong direction.",
              how: "Present the 3 concepts (no code) to at least 3 ICP people. Ask: Which seems most useful? Why? What would you change?",
              evidence: "Notes from 3+ tests with feedback on each concept and preference comparison.",
            },
          },
          {
            id: "task-12",
            title: "Choose Winning Solution + Value Prop",
            points: 0,
            area: "product",
            badges: [],
            detail: {
              why: "Commit to one direction based on evidence, not personal preference. A clear value proposition is the foundation of all future communication.",
              how: "Use format: For [ICP], [product] is the only [category] that [benefit], unlike [alternative] which [limitation].",
              evidence: "Written value proposition justified with reference to test feedback.",
            },
          },
          {
            id: "task-13",
            title: "Sketch Basic Business Model",
            points: 0,
            area: "bizmodel",
            badges: [],
            detail: {
              why: "Define how the business makes money before starting to build. Without this clarity, the product may be built incompatibly with the monetization model.",
              how: "Answer: who pays? How much? How often? Use simplified Business Model Canvas.",
              evidence: "Simple doc: who pays, how much, how often, and the revenue logic.",
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Product Market Fit",
    subtitle: "21 → 50 pts · 3–6 months",
    color: "#185fa5",
    bgColor: "#e6f1fb",
    maxPts: 29,
    northStarMetric: {
      title: "Sean Ellis Test: 40%+ answer 'very disappointed'",
      description: "When 40%+ of active users say they would be very disappointed if the product disappeared, it has crossed from useful to essential.",
    },
    gate: "Score ≥50 · Week 2 retention >30% · Sean Ellis >40% · Month 2 cohort ≥20%",
    groups: [
      {
        id: "nocode-mvp",
        name: "No-Code MVP",
        tasks: [
          {
            id: "task-14",
            title: "Build First No-Code MVP",
            points: 2,
            area: "product",
            badges: [],
            detail: {
              why: "Create the simplest possible version of the solution, without writing code. The goal is to test a hypothesis, not to build a product.",
              how: "Use no-code tools: Typeform, Notion, Canva, WhatsApp. Criterion: can a stranger use it without the founder's help?",
              evidence: "Functional shareable link usable by a stranger without assistance.",
            },
          },
          {
            id: "task-15",
            title: "Get 10 People to Use the MVP",
            points: 2,
            area: "product",
            badges: [],
            detail: {
              why: "Observe how real people interact with the product without guidance.",
              how: "Organize observation sessions: do not explain how it works, just observe.",
              evidence: "Notes from 10 observation sessions with observed behaviors and identified patterns.",
            },
          },
          {
            id: "task-16",
            title: "Test Willingness to Pay",
            points: 2,
            area: "bizmodel",
            badges: [],
            detail: {
              why: "I would use this and I would pay for this are completely different questions.",
              how: "Present a real price proposal, not hypothetical. Ask: This costs X per month. Would you buy?",
              evidence: "Record of 10+ price conversations with responses and willingness-to-pay patterns.",
            },
          },
          {
            id: "task-17",
            title: "Decide: Pivot, Persevere or Stop",
            points: 2,
            area: "product",
            badges: [],
            detail: {
              why: "Make a data-based decision, not driven by fear or stubbornness.",
              how: "Based on results from tasks 14-16: do the data justify continuing? If pivoting, on what specifically?",
              evidence: "Doc with decision (pivot/persevere/stop) and data-based justification.",
            },
          },
        ],
      },
      {
        id: "launch-users",
        name: "Launch & First Users",
        tasks: [
          {
            id: "task-18",
            title: "Improve MVP and First Launch",
            points: 3,
            area: "product",
            badges: [],
            detail: {
              why: "Launch an improved version based on feedback received.",
              how: "Incorporate the 3 biggest problems from observation sessions. Publish in at least 1 channel.",
              evidence: "Public working link + evidence of sharing on at least 1 external channel.",
            },
          },
          {
            id: "task-19",
            title: "Register the Company",
            points: 0,
            area: "team",
            badges: [],
            detail: {
              why: "Existing legally as a company is a prerequisite for any conversation with investors.",
              how: "Research which legal structure makes sense for the business model and operating country.",
              evidence: "Company registration certificate + business bank account open.",
            },
          },
          {
            id: "task-20",
            title: "Write the Founder Story",
            points: 4,
            area: "team",
            badges: [],
            detail: {
              why: "The story of why the founder is building this is the most important slide in any early pitch.",
              how: "Answer in 1 paragraph: what made you notice this problem? What was the moment you decided to act?",
              evidence: "Founder story paragraph written, tested with 3 people who do not know the business.",
            },
          },
          {
            id: "task-21",
            title: "First 25 Committed Users",
            points: 4,
            area: "traction",
            badges: [],
            detail: {
              why: "25 is the minimum for statistically significant behavioral patterns.",
              how: "Define committed user: someone who used the product at least once independently.",
              evidence: "List of 25+ users with first-use date and acquisition channel.",
            },
          },
        ],
      },
      {
        id: "measurement-retention",
        name: "Measurement & Retention",
        tasks: [
          {
            id: "task-22",
            title: "Define PMF Signal — 3 Metrics",
            points: 0,
            area: "product",
            badges: [],
            detail: {
              why: "Knowing in advance what constitutes PMF forces objective criteria.",
              how: "Define 3 metrics that, if achieved, will prove PMF for the defined ICP.",
              evidence: "Doc with 3 PMF metrics, target values, and measurement method for each.",
            },
          },
          {
            id: "task-23",
            title: "Usage Tracking — 4 Weeks",
            points: 4,
            area: "product",
            badges: [],
            detail: {
              why: "Without usage data, retention is an assumption.",
              how: "Set up a minimal tracking system: Google Analytics, Mixpanel free tier, or a spreadsheet.",
              evidence: "Dashboard or spreadsheet with 30-day usage data for first 25 users.",
            },
          },
          {
            id: "task-24",
            title: "Week 2 Retention >30%",
            points: 5,
            area: "product",
            badges: ["gate", "north-star"],
            detail: {
              why: ">30% of week 1 users returned in week 2 without being contacted by the founder.",
              how: "Create a simple cohort table: week 1 users vs. who returned in week 2.",
              evidence: "Week 1 vs. week 2 retention table for first 25 users.",
            },
          },
          {
            id: "task-25",
            title: "Sean Ellis Test >40%",
            points: 5,
            area: "product",
            badges: ["gate", "north-star"],
            detail: {
              why: ">40% of active users would be very disappointed if the product ceased to exist.",
              how: "Send a survey to 40+ active users: How would you feel if you could no longer use this product?",
              evidence: "Response distribution from 40+ users with >40% in the very disappointed category.",
            },
          },
          {
            id: "task-26",
            title: "Verbatim Evidence — 5+ Quotes",
            points: 3,
            area: "traction",
            badges: [],
            detail: {
              why: "5+ specific user quotes explaining value in their own words.",
              how: "Collect verbatim quotes from users (with permission). At least 3 of 5 must mention a quantifiable benefit.",
              evidence: "Quote bank with name, context, and exact text. 3+ mention quantifiable benefit.",
            },
          },
          {
            id: "task-27",
            title: "Redefine ICP Based on Data",
            points: 3,
            area: "market",
            badges: [],
            detail: {
              why: "The initial ICP was built with hypotheses. Now there is real data.",
              how: "Compare the profile of users with highest retention and satisfaction with the original ICP.",
              evidence: "Updated ICP with justification based on retention and satisfaction data.",
            },
          },
          {
            id: "task-28",
            title: "Iteration Evidence — 3+ Cycles",
            points: 3,
            area: "product",
            badges: [],
            detail: {
              why: "Having changed the product 3+ times based on real feedback proves the founder learns and acts.",
              how: "For each iteration: the feedback that motivated it, the change made, and the measured impact.",
              evidence: "Iteration log with date, source feedback, change made, and before/after metric.",
            },
          },
          {
            id: "task-29",
            title: "Month 2 Cohort Retention ≥20%",
            points: 3,
            area: "product",
            badges: ["gate"],
            detail: {
              why: "Month 2 retention ≥20% for 2+ consecutive cohorts. Week 2 proves short-term; month 2 proves over time.",
              how: "Build a monthly cohort table: users who started in month X, how many returned in month X+1 and X+2.",
              evidence: "Cohort table with months 1 and 2 for 2+ cohorts started in different months.",
            },
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Business Model Validation",
    subtitle: "51 → 75 pts · 3–6 months",
    color: "#854f0b",
    bgColor: "#faeeda",
    maxPts: 25,
    northStarMetric: {
      title: "LTV/CAC ≥3:1 + 3 unprompted renewals",
      description: "An LTV 3x higher than the cost to acquire proves the business can grow profitably. Three spontaneous renewals confirm customers see ongoing value.",
    },
    gate: "Score ≥75 · Recurring revenue ≥3 customers · LTV/CAC ≥3:1 · 3-year financial model",
    groups: [
      {
        id: "first-revenue",
        name: "First Revenue",
        tasks: [
          {
            id: "task-30",
            title: "First Paid Transaction",
            points: 5,
            area: "traction",
            badges: [],
            detail: {
              why: "1 customer paid real money. The most honest signal of real willingness to pay.",
              how: "The transaction must have been initiated by the customer after using the product.",
              evidence: "Proof of transaction (receipt, Stripe, transfer) with date and customer origin.",
            },
          },
          {
            id: "task-31",
            title: "Price Testing — 2+ Price Points",
            points: 4,
            area: "bizmodel",
            badges: [],
            detail: {
              why: "Test 2+ different price points with real customers, not in intent surveys.",
              how: "Create 2 versions of the price proposal and present to different groups.",
              evidence: "Record of 2+ tests with conversion results and justified current price.",
            },
          },
          {
            id: "task-32",
            title: "Reach 10 Paying Customers",
            points: 0,
            area: "traction",
            badges: [],
            detail: {
              why: "10 paying customers is the minimum for statistically significant buying behavior patterns.",
              how: "Equivalent for pre-monetization = 100 active users with a clear path to monetization.",
              evidence: "List of 10+ customers with first purchase date, value, and acquisition channel.",
            },
          },
        ],
      },
      {
        id: "unit-economics",
        name: "Unit Economics & Structure",
        tasks: [
          {
            id: "task-33",
            title: "Unit Economics with Real Data",
            points: 4,
            area: "bizmodel",
            badges: ["north-star"],
            detail: {
              why: "Know CAC, LTV, and payback period with real data. LTV/CAC ≥3:1 for a healthy business.",
              how: "CAC = total spent on acquisition / customers acquired. LTV = avg revenue per customer × avg customer lifetime.",
              evidence: "Spreadsheet with CAC, LTV, and payback with real data and declared sources.",
            },
          },
          {
            id: "task-34",
            title: "Define and Measure Churn",
            points: 0,
            area: "bizmodel",
            badges: [],
            detail: {
              why: "Churn is the metric that tells if people really want to stay.",
              how: "Define churn: monthly cancellations / customers at start of month. Measure last 90 days.",
              evidence: "Churn rate calculated for last 90 days + top 3 cancellation reasons.",
            },
          },
          {
            id: "task-35",
            title: "Recurring Revenue — 3+ Renewals",
            points: 5,
            area: "traction",
            badges: ["gate", "north-star"],
            detail: {
              why: "3+ customers paid twice without being contacted. Transforms 'we have customers' into 'we have a recurring business'.",
              how: "Monitor active customers and identify who renewed spontaneously.",
              evidence: "List of 3+ customers with proof of 2 transactions and dates.",
            },
          },
        ],
      },
      {
        id: "gtm-growth",
        name: "Go-to-Market & Growth",
        tasks: [
          {
            id: "task-36",
            title: "Acquisition Channel Map",
            points: 0,
            area: "traction",
            badges: [],
            detail: {
              why: "Know where customers come from and which channel has the best conversion rate.",
              how: "For each active channel: number of leads, conversion rate, channel-specific CAC.",
              evidence: "Channel table with volume, conversion rate, and CAC per channel.",
            },
          },
          {
            id: "task-37",
            title: "Document 3 Product Iterations",
            points: 0,
            area: "product",
            badges: [],
            detail: {
              why: "Prove the product evolved in response to real paying customer data.",
              how: "For each iteration: the feedback that motivated it, the implemented change, and the measured impact.",
              evidence: "Log of 3 iterations with source feedback, change made, and measured impact.",
            },
          },
          {
            id: "task-38",
            title: "Define GTM Strategy",
            points: 0,
            area: "traction",
            badges: [],
            detail: {
              why: "Articulate in 1 page: which customer, which channel, which message, and which price.",
              how: "Use Geoffrey Moore's framework: target segment, main need, positioning vs. alternatives.",
              evidence: "1-page doc with: ICP, main channel, positioning message, and price.",
            },
          },
          {
            id: "task-39",
            title: "Set and Hit 90-Day Revenue Goal",
            points: 0,
            area: "traction",
            badges: [],
            detail: {
              why: "Commit to a specific revenue goal and hit it.",
              how: "Define a revenue goal for the next 90 days. Share the goal with an accountability group.",
              evidence: "Revenue goal defined + result documented at end of 90 days.",
            },
          },
        ],
      },
      {
        id: "financial-model",
        name: "Financial Model",
        tasks: [
          {
            id: "task-40",
            title: "Revenue Model Defined and Proven",
            points: 4,
            area: "bizmodel",
            badges: [],
            detail: {
              why: "The revenue model is tested and the founder knows exactly how it scales.",
              how: "Create a 1-page doc with: model type, growth drivers, cost structure, and current gross margin.",
              evidence: "Doc with revenue model, drivers, cost structure, and current gross margin.",
            },
          },
          {
            id: "task-41",
            title: "3-Year Financial Model",
            points: 3,
            area: "bizmodel",
            badges: ["gate"],
            detail: {
              why: "3-year model built with real assumptions. The founder knows the breakeven, the runway, and what needs to happen.",
              how: "Use a financial model with P&L + cash flow. Each line must have a justified assumption.",
              evidence: "P&L projection + cash flow + list of justified assumptions. 3 scenarios included.",
            },
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Growth",
    subtitle: "76 → 100 pts · Raise program",
    color: "#3d1a6b",
    bgColor: "#eeedfe",
    maxPts: 25,
    northStarMetric: {
      title: "MoM growth 15%+ for 3 consecutive months",
      description: "Consistent month-over-month growth of 15%+ proves the business has repeatable traction, not a lucky month.",
    },
    gate: "Score ≥76 · SheBlooms application approved · First investor meeting scheduled",
    groups: [
      {
        id: "acquisition-growth",
        name: "Acquisition & Growth",
        tasks: [
          {
            id: "task-42",
            title: "Repeatable Acquisition — 2+ Channels",
            points: 4,
            area: "traction",
            badges: [],
            detail: {
              why: "2+ acquisition channels with known, consistent CAC.",
              how: "For each channel: exact acquisition process, marginal cost of scaling, the acquired customer profile.",
              evidence: "Channel analysis with CAC per channel, monthly volume for last 3 months.",
            },
          },
          {
            id: "task-43",
            title: "MoM Growth ≥15% — 3 Consecutive Months",
            points: 5,
            area: "traction",
            badges: ["gate", "north-star"],
            detail: {
              why: "15%+ month-over-month growth for 3+ consecutive months.",
              how: "Create a MoM chart for the last 6 months. The 3 most recent must show 15%+ each.",
              evidence: "MoM chart for last 6 months with the 3 most recent showing 15%+.",
            },
          },
        ],
      },
      {
        id: "team-ops",
        name: "Team & Operations",
        tasks: [
          {
            id: "task-44",
            title: "Team Beyond Founders — 3+ Full-Time",
            points: 4,
            area: "team",
            badges: ["gate"],
            detail: {
              why: "Team with 3+ full-time people covering product/technology, growth/marketing, and operations.",
              how: "Map the 3 critical functions and confirm there is a responsible person in each.",
              evidence: "Org chart with roles and responsibilities + documented answer to the 2-week-without-CEO test.",
            },
          },
        ],
      },
      {
        id: "investor-readiness",
        name: "Investor Readiness",
        tasks: [
          {
            id: "task-45",
            title: "Complete Data Room — 25 Documents",
            points: 5,
            area: "team",
            badges: [],
            detail: {
              why: "Investor-grade data room with 25 documents across 5 categories.",
              how: "Organize in an indexed folder with 25 documents confirmed by SheBlooms advisor.",
              evidence: "Indexed folder with 25 documents confirmed by SheBlooms advisor.",
            },
          },
          {
            id: "task-46",
            title: "Investor Narrative — Final Pitch",
            points: 4,
            area: "team",
            badges: [],
            detail: {
              why: "Complete and rehearsed pitch: thesis (why now, market, team), ask (how much, at what valuation), use of funds.",
              how: "Use Andy Raskin's narrative pitch framework. Rehearse at least 10 times.",
              evidence: "Final deck (15 slides max) + 1-pager + complete investor FAQ (20 questions).",
            },
          },
          {
            id: "task-47",
            title: "Raise Gate — Round is Open",
            points: 3,
            area: "team",
            badges: ["gate"],
            detail: {
              why: "Score 76+ + approved application + first investor meeting scheduled.",
              how: "Complete the Raise program application with data room and investor narrative.",
              evidence: "SheBlooms approval confirmation + confirmed presence at first investor event.",
            },
          },
        ],
      },
    ],
  },
];
