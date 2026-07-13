// ── Aditya Kaleeswar — Résumé ────────────────────────────────────────────
// Compile:  typst compile resume/resume.typ resume/Aditya_Kaleeswar_Resume.pdf
// Style: modeled on the classic LaTeX "Jake's Resume" layout.

#let accent = rgb("#26428b")

#let ecc-preprint = "https://drive.google.com/file/d/1jpN7zt1OlDj67Bmgxg9pDozC3m-_o7JR/view?usp=sharing"
#let hazmap-preprint = "https://drive.google.com/file/d/1Uc-9NHbLMkmE7zuQGEXiru03pHrtng9c/view?usp=drive_link"
#let pinn-preprint = "https://drive.google.com/file/d/1K7HPsfxgtqfvncoJHM7ELMVPqK_sShk_/view?usp=drive_link"
// Temporary: points to the docs site until the real paper link is ready
#let alphastack-preprint = "https://alpha-stack.vercel.app/docs"

#set document(title: "Aditya Kaleeswar — Résumé", author: "Aditya Kaleeswar")
#set page(paper: "us-letter", margin: (x: 0.45in, y: 0.3in))
#set text(font: "New Computer Modern", size: 9.8pt)
#set par(justify: true, leading: 0.45em)
#show link: set text(fill: accent)

// Section heading with rule, like \section + \titlerule
#let section(title) = {
  v(10pt)
  block(spacing: 0pt)[
    #text(size: 11.5pt, weight: "bold")[#smallcaps(title)]
    #v(-7pt)
    #line(length: 100%, stroke: 0.7pt)
  ]
  v(5pt)
}

// Entry header: bold title (with optional inline chips via right2) / right1 (dates); italic subtitle on second row
#let entry(title, right1, sub: none, right2: none) = {
  block(above: 4pt, below: 2.5pt)[
    #grid(columns: (1fr, auto), column-gutter: 12pt, row-gutter: 2.5pt,
      [#text(weight: "bold")[#title]#if right2 != none [ #h(6pt) #text(size: 8.8pt)[#right2]]],
      align(right)[#right1],
      ..if sub != none { (emph(sub), []) } else { () },
    )
  ]
}

// One-line education entry: bold school + italic detail, dates right
#let eduline(school, detail, dates) = {
  block(above: 5pt, below: 2pt)[
    #grid(columns: (1fr, auto), column-gutter: 12pt,
      [#text(weight: "bold")[#school] #h(4pt) #emph[#detail]], align(right)[#dates],
    )
  ]
}

// Compact bullet list
#set list(marker: [•], indent: 6pt, body-indent: 5pt, spacing: 0.46em)

// Inline link chips: label · label
#let chips(..items) = items.pos().join([ #h(2pt) · #h(2pt) ])

// ── Header ───────────────────────────────────────────────────────────────
#align(center)[
  #text(size: 20pt, weight: "bold")[Aditya Kaleeswar]
  #v(-6pt)
  #link("mailto:adityakaleeswargk04@gmail.com")[adityakaleeswargk04\@gmail.com]
  #h(4pt) | #h(4pt)
  #link("https://www.linkedin.com/in/aditya-kaleeswar")[LinkedIn]
  #h(4pt) | #h(4pt)
  #link("https://github.com/AdityaKaleeswarGK")[GitHub]
  #h(4pt) | #h(4pt)
  #link("https://adi-kaleez.vercel.app")[Portfolio]
]
#v(-2pt)

// ── Education ────────────────────────────────────────────────────────────
#section("Education")

#eduline("Vellore Institute of Technology (VIT), Vellore",
  "B.Tech in Computer Science — CGPA: 8.41", "Sep 2022 – Jul 2026")
#eduline("Maharishi Vidya Mandir, Chennai",
  "Senior Secondary, CBSE — Class XII: 96%, Class X: 94%", "Apr 2018 – Jul 2022")

// ── Experience ───────────────────────────────────────────────────────────
#section("Experience")

#entry("Research Intern", "Jan 2026 – Jul 2026",
  sub: "University of Texas Rio Grande Valley (AIM Lab) — Remote",
  right2: chips(
    [ECC: #link(ecc-preprint)[Preprint] / #link("https://github.com/AdityaKaleeswarGK/ECC-pipeline")[Code]],
    [PINN: #link(pinn-preprint)[Preprint] / #link("https://github.com/AdityaKaleeswarGK/PiNNBased_SHM")[Code]],
  ))
- Built a CatBoost model predicting the strength and ductility of ECC, a bendable concrete, from its mix design.
- Added conformal prediction for calibrated uncertainty ranges — \~88% observed coverage on 80% intervals.
- Benchmarked against ExtraTrees + Gradient Boosting ensembles, NGBoost, LightGBM, TabPFN, and Mixture-of-Experts variants.
- Built an inverse-design pipeline: screens 100k candidate mixes for the cheapest one meeting a target strength, with out-of-distribution checks so recommendations stay within data the model trusts.
- Built a single image-to-verdict crack pipeline: a vision front end measures each crack's geometry, and a physics-informed neural network converts it to a structural severity verdict — within 6.5% of a finite-element reference.
- Made the vision front end pluggable: any YOLO segmentation model swaps in without touching the physics backend.

#entry("PRISM Research Intern", "Oct 2024 – Jun 2025",
  sub: "Samsung Research, Bangalore — Remote",
  right2: chips(link("https://github.com/AdityaKaleeswarGK/Natural_Language_to_data_visualization")[Code]))
- Built BQ2Viz, a multi-agent GenAI framework that turns natural-language questions into data visualizations.
- Chained three agents: a profiling agent summarizes the data, a reasoning planner infers which files and charts the query needs, and a code-generation agent writes and runs the plotting code.
- Achieved 84.57% accuracy on the VisEval benchmark's complex multi-table queries, ahead of the NVAGENT baseline.
- Cut error rate to 11.5% with a self-correcting loop that diagnoses and repairs failed chart code.

#entry("Software Engineer — Autonomous Systems", "Apr 2024 – Sep 2025",
  sub: "Team Vyadh (Mars Rover Team), VIT — Vellore",
  right2: chips(
    link("https://github.com/TeamVyadhVIT/strawberry_cheesecake")[Code: Rover stack],
    link("https://github.com/AdityaKaleeswarGK/obstacle_pit_avoidance_using-pointcloud-process")[Code: Obstacle avoidance],
  ))
- Built the rover's autonomous navigation stack on ROS 2 and Nav2, using frontier exploration to map unknown terrain within dynamic GPS geofences.
- Implemented real-time obstacle and pit avoidance from RealSense depth point clouds, with wheel-drift recovery.
- Cut state-estimation noise by fusing IMU and wheel odometry in an Extended Kalman Filter.
- Team placed 13th at IRC 2025 and 4th at IRDC 2025.

// ── Projects ─────────────────────────────────────────────────────────────
#section("Projects")

#entry("HazMap — Risk-Aware Exploration on an Autonomous Rover", [],
  sub: "ROS 2, Nav2, SLAM Toolbox, YOLOv8, NVIDIA Jetson Orin Nano, Python",
  right2: chips(
    link(hazmap-preprint)[Preprint],
    link("https://github.com/AdityaKaleeswarGK/hazpatrol")[Code: Planner],
    link("https://github.com/AdityaKaleeswarGK/CGLS_gaden")[Code: Sim benchmark],
  ))
- Designed HazMap, an exploration algorithm coupling gas sensing and vision: gas anomalies trigger close-up sweeps of suspected leaks, while visual hazard detections steer the rover away from danger.
- Built a coverage planner that inspects cluttered regions densely and skims open floor, cutting waypoints by \~60%.
- Localized gas sources to within 0.25 m and flagged the first hazards within 2% of the mission — validated in the GADEN gas-dispersion simulator, then deployed on an NVIDIA Jetson rover running perception at \~15 FPS.

#entry("Alpha Stack — Natural Language to Production Codebases", [],
  sub: "Python, C++, Multi-Agent Orchestration, Tree-sitter, Docker, TUI",
  right2: chips(
    if alphastack-preprint != "" { link(alphastack-preprint)[Preprint] } else { text(fill: rgb("#999"))[Preprint (TODO)] },
    link("https://github.com/HyperKuvid-Labs/alpha-stack")[Code],
  ))
- Built a terminal-based engine where an orchestrator agent turns a prompt into a software blueprint and parallel worker agents generate each file with inherited context, keeping the whole codebase mutually consistent.
- Wrote DGAT, a C++ dependency engine that parses imports across 12+ languages using Tree-sitter and re-analyzes only changed files — keeping the project's dependency graph valid and cycle-free during generation.
- Added self-healing validation: diagnosis and repair agents fix sandboxed build and test failures until convergence.
- Created AlphaBench, a 40-task benchmark across CUDA, Go, Rust, and TypeScript, graded by real build-and-test runs.
- Benchmarked frontier models — GPT-5.2, Gemini 3 Pro, Claude Opus, DeepSeek V3 — showing the self-correction loop lifts project success from ≤45% to 75%.

// ── Patent ───────────────────────────────────────────────────────────────
#section("Patent")

#entry("Force Sensor-Based Train Presence & State Detection", "Indian Patent App. No. 202641007500")
#block(above: 0pt)[
Under-track force-sensor arrays and distributed ESP32 nodes running a finite-state machine passively classify a train's state — approaching, stopped, pass-through, departing — and its direction of entry, with no train-side equipment.
]

// ── Technical Skills ─────────────────────────────────────────────────────
#section("Technical Skills")

#block(above: 2.5pt)[
#set par(leading: 0.46em)
*Languages*: Python, C/C++, JavaScript (ES6+), SQL \
*GenAI & ML*: PyTorch, LangGraph, LangChain, RAG, ChromaDB, CatBoost, Conformal Prediction, PINNs \
*Robotics & Vision*: ROS 2 (Nav2, SLAM Toolbox), OpenCV, PCL, YOLOv8, SAM, NVIDIA Jetson, ESP32 \
*Web & Data*: React, Node.js, Express, MongoDB, REST APIs, pandas, NumPy, NetworkX, DuckDB \
*DevOps & Cloud*: GCP, Docker, Git, Linux
]
