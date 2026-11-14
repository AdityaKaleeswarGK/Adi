---
role: "Machine Learning Research Intern"
org: "University of Texas Rio Grande Valley, AIM Lab · PIs Prof. Jinwoo An, Prof. Yuvaraj Natarajan"
location: "Remote (Vellore)"
start: "Jan 2026"
end: "Jul 2026"
order: 2
links:
  - { label: "ECC overview", url: "https://adi-kaleez.vercel.app/projects/ecc" }
  - { label: "PINN research blog", url: "https://adi-kaleez.vercel.app/blog/pinn" }
---
- Developed an uncertainty-aware framework that predicts the tensile strength and ductility of engineered cementitious composites from their mix design, using CatBoost quantile regression with regime-aware conformal calibration — stress-interval coverage rose from 34.8% to 80.4%, and reached 82.6% for strain, against a nominal 80% target.
- Extended it into an NSGA-II inverse-design tool that recommends low-cost, low-carbon mixes for target stress and strain, restricted to the region supported by tested mixes, and ranks Pareto solutions by target error and uncertainty to prioritize lab testing.
- Led the vision pipeline that judges how critical a concrete crack is from a camera image, extracting crack length, orientation and member width through a modular design that accepts any pretrained crack detector or depth source, and deployed it as a live-camera prototype.
- Co-developed the Williams-enriched PINN that computes the Mode I stress intensity factor by energy minimization, within 0.68% of finite-element references across nine crack geometries at about 6 ms per query on a T4 GPU.
