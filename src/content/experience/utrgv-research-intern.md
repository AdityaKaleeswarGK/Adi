---
role: "ML Research Intern"
org: "UTRGV — AIM Lab × VIT Vellore"
location: "Remote / Vellore"
start: "Jan 2026"
end: "Aug 2026"
summary: "Physics-informed & uncertainty-aware ML for structural materials — bendable concrete and crack assessment."
order: 1
links:
  - { label: "ECC (preprint)", url: "https://drive.google.com/file/d/1jpN7zt1OlDj67Bmgxg9pDozC3m-_o7JR/view?usp=sharing" }
  - { label: "ECC-pipeline (repo)", url: "https://github.com/AdityaKaleeswarGK/ECC-pipeline" }
  - { label: "PINN (preprint)", url: "https://drive.google.com/file/d/1K7HPsfxgtqfvncoJHM7ELMVPqK_sShk_/view?usp=drive_link" }
  - { label: "Crack CV + PINN (repo)", url: "https://github.com/AdityaKaleeswarGK/PiNNBased_SHM" }
---
- Built an end-to-end pipeline predicting the tensile properties of Engineered Cementitious Composites ("bendable concrete") — strength **and** ductility — from mix design, with calibrated 80% prediction intervals via **CatBoost + Mondrian Conformal Quantile Regression**.
- Developed a visual crack-inspection pipeline: **YOLO-seg** extracts per-crack geometry, then a **physics-informed neural network** solves for the Mode-I stress-intensity factor (K₁) and returns a severity verdict against fracture toughness.
- Treated the PINN as an offline *solver* (trained once per a/W ratio via LEFM similarity), so every detected crack is evaluated in microseconds at inference time.
