export const work = [
  {
    slug: "alpha-stack", title: "Alpha Stack", field: "Language models / developer tools", number: "01", art: "alpha",
    subtitle: "From a prompt to a tested codebase.",
    description: "A terminal-native coding-agent harness that plans, generates, builds, and repairs multi-file software projects.",
    contribution: "I built the harness and its planning pipeline, connected generation to dependency-graph context, and designed a 40-task evaluation benchmark.",
    fact: "40 tasks", factLabel: "end-to-end project benchmark", context: "Undergraduate capstone · VIT Vellore",
    links: [{label:"Code", url:"https://github.com/HyperKuvid-Labs/alpha-stack"}],
    sections: [
      {title:"The question", text:"How can a coding agent turn a natural-language request into a complete project, with enough execution evidence to assess whether it actually works?"},
      {title:"What I built", text:"A Go/Bubble Tea terminal interface fronts a requirements-to-blueprint-to-file-contract pipeline. Generation uses dependency-graph context, while a planner/corrector loop runs builds and tests, diagnoses failures, and revises the affected files. The output includes a trace of planning, tool use, and repairs."},
      {title:"How I evaluated it", text:"I designed a reproducible 40-task benchmark covering end-to-end projects in CUDA, Go, Rust, and TypeScript. Evaluation tracks build and test results, cost, failure telemetry, external acceptance checks, and an independent LLM-as-judge examiner verdict."}
    ]
  },
  {
    slug: "craft", title: "CRAFT", field: "Robotics / autonomous systems", number: "02", art: "craft",
    subtitle: "Explore the unknown. Map the hazards.",
    description: "Autonomous chemo-visual hazard mapping: coverage planning, gas-source localization, and visual detection in unknown GPS-denied spaces.",
    contribution: "I built the rover framework connecting frontier coverage, CUSUM-triggered fine sweeps, and fused gas and visual risk mapping.",
    fact: "0.54 m", factLabel: "mean source-localization error · multi-source setting", context: "Robotics research · ROS 2 / GADEN / Jetson",
    links: [{label:"HazPatrol", url:"https://github.com/AdityaKaleeswarGK/hazpatrol"},{label:"Gas localization", url:"https://github.com/AdityaKaleeswarGK/CGLS_gaden"},{label:"Preprint",url:"https://drive.google.com/file/d/1Uc-9NHbLMkmE7zuQGEXiru03pHrtng9c/view"}],
    sections: [
      {title:"The question", text:"How can a rover cover an unfamiliar space while finding gas leaks and visual hazards, and use those discoveries to guide its subsequent coverage?"},
      {title:"What I built", text:"CRAFT brings together the coverage and gas-localization work represented by HazPatrol and CGLS_gaden. A rapidly covering graph samples the discovered frontier. CUSUM gas anomalies trigger local fine sweeps, and fused gas and visual detections build a risk map of hazard type and location."},
      {title:"Evaluation", text:"The framework was evaluated in GADEN, which provides known gas-source locations, and on a Jetson rover. Reported mean source-localization error was 0.54 m in a multi-source setting and 0.53 m in a maze. High-concentration hazards were detected within the first 2% of mission time. Visual inference ran at 24.3 ms per frame with 0.845 mAP@0.5."}
    ]
  },
  {
    slug: "ecc", title: "ECC", field: "Machine learning / uncertainty", number: "03", art: "ecc",
    subtitle: "Predicting materials, with uncertainty.",
    description: "Replicate-aware prediction of tensile strength and strain in engineered cementitious composites, with calibrated intervals and constrained inverse design.",
    contribution: "I grouped repeated tests to prevent composition leakage, trained target-specific quantile models, and connected them to support-constrained inverse design.",
    fact: "276 mixes", factLabel: "grouped from 620 tensile tests", context: "Research internship · UTRGV AIM Lab",
    links: [{label:"Code",url:"https://github.com/AdityaKaleeswarGK/ECC-pipeline"},{label:"Preprint",url:"https://drive.google.com/file/d/1jpN7zt1OlDj67Bmgxg9pDozC3m-_o7JR/view"}],
    sections: [
      {title:"The question", text:"Can we predict both strength and ductility of bendable concrete while representing uncertainty and avoiding leakage between repeated tests of the same composition?"},
      {title:"What I built", text:"I grouped 620 tensile tests into 276 unique mixes, then trained target-specific CatBoost quantile models for tensile stress and strain. Conformal adjustment calibrates the prediction intervals. A support-constrained NSGA-II inverse-design stage rejects requested high-strength and high-ductility combinations outside the observed mix domain."},
      {title:"Evaluation", text:"At the nominal 80% interval level, observed coverage was 80.4% for stress and 82.6% for strain. Group-level R² was 0.749 and 0.605, respectively. These are reported evaluation results for this dataset; coverage on new material populations requires further validation."}
    ]
  },
  {
    slug: "pinn", title: "PINN", field: "Physics-informed ML / computer vision", number: "04", art: "pinn",
    subtitle: "From a crack image to fracture mechanics.",
    description: "A visual crack-inspection pipeline connected to a mesh-free physics-informed model for Mode I stress-intensity estimation.",
    contribution: "I developed crack-geometry extraction and designed a PINN with an embedded Williams crack-tip field, a learnable amplitude, and near-tip constraints.",
    fact: "~6.5%", factLabel: "error against an independent finite-element reference", context: "Research internship · UTRGV AIM Lab",
    links: [{label:"Code",url:"https://github.com/AdityaKaleeswarGK/PiNNBased_SHM"},{label:"Preprint",url:"https://drive.google.com/file/d/1K7HPsfxgtqfvncoJHM7ELMVPqK_sShk_/view"}],
    sections: [
      {title:"The question", text:"How can visual crack geometry inform a mechanics-based assessment, rather than stopping at detecting a crack in an image?"},
      {title:"What I built", text:"The image pipeline segments individual concrete cracks, extracts skeleton arc length and width, and calibrates image geometry to supply boundary conditions. The mesh-free PINN embeds the Williams crack-tip field and learns a stress-intensity amplitude, constrained by positivity and a near-tip cage loss."},
      {title:"Evaluation", text:"The model recovered Mode I stress intensity within approximately 6.5% of an independent finite-element reference across five seeds, and tracked analytical geometry factors for a/W = 0.10–0.30."}
    ]
  }
] as const;
