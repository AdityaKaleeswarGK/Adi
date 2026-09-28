---
role: "Research Intern"
org: "UTRGV — AIM Lab"
location: "Remote"
start: "Jan 2026"
end: "Jul 2026"
summary: "Replicate-aware learning for structural materials and physics-informed fracture assessment."
order: 1
links:
  - { label: "ECC overview", url: "https://adi-kaleez.vercel.app/projects/ecc" }
  - { label: "PINN overview", url: "https://adi-kaleez.vercel.app/projects/pinn" }
---
- Grouped **620 tensile tests into 276 unique mixes** to prevent composition leakage, then trained target-specific CatBoost quantile models for tensile stress and strain.
- Calibrated nominal **80% prediction intervals**, reaching **80.4% stress** and **82.6% strain** coverage; connected the models to support-constrained NSGA-II inverse design.
- Built a rover-image-to-fracture pipeline that segments cracks, extracts skeleton arc length and width, and calibrates image geometry for mechanics-based assessment.
- Designed a mesh-free PINN with an embedded Williams crack-tip field. Recovered Mode I stress intensity within **approximately 6.5%** of an independent finite-element reference across five seeds.
