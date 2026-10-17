---
role: "Machine Learning Research Intern"
org: "University of Texas Rio Grande Valley, AIM Lab"
location: "Remote"
start: "Jan 2026"
end: "Jul 2026"
order: 2
links:
  - { label: "ECC overview", url: "https://adi-kaleez.vercel.app/projects/ecc" }
  - { label: "PINN research blog", url: "https://adi-kaleez.vercel.app/blog/pinn" }
---
- Worked under **Prof. Jinwoo An**, collaborating with civil and chemical engineering researchers on materials prediction and crack assessment.
- **ECC prediction:** developed CatBoost models to predict the tensile strength and ductility of engineered cementitious composites from their mix design. Grouped 620 tests into 276 unique mixes to prevent leakage between repeated tests of the same composition.
- **Uncertainty and inverse design:** calibrated prediction intervals and connected the models to NSGA-II optimization for cost-efficient mix design, with constraints to keep recommendations within the supported data domain. Nominal 80% intervals achieved 80.4% stress and 82.6% strain coverage.
- **Crack measurement:** built a replaceable vision front end that segments cracks, measures their paths, and uses MobileSAM to estimate member boundaries. Calibrated image measurements provide geometry for the physics backend, alongside supplied load and material properties.
- **Physics-informed fracture modeling:** developed a mesh-free PINN with an embedded Williams crack-tip field to estimate Mode I stress intensity. Evaluated the mechanics solver separately from the vision pipeline, obtaining approximately 6.5% error against an independent finite-element reference in the five-seed reference experiment.
