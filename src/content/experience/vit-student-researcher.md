---
role: "Undergraduate Student Researcher"
org: "Vellore Institute of Technology · PIs Prof. Yuvaraj Natarajan, Prof. Sree Preethaa"
location: "Vellore"
start: "Jun 2025"
end: "Jan 2026"
order: 2
links:
  - { label: "CRAFT preprint", url: "https://drive.google.com/file/d/1Uc-9NHbLMkmE7zuQGEXiru03pHrtng9c/view" }
  - { label: "HazPatrol repo", url: "https://github.com/AdityaKaleeswarGK/hazpatrol" }
  - { label: "Gas-source localization repo", url: "https://github.com/AdityaKaleeswarGK/CGLS_gaden" }
---
- Developed CRAFT, a framework that lets a mobile robot map hazards and gas leaks while exploring an unknown environment, in collaboration with Kyungpook National University and funded by KAIA and NRF Korea. Deployed it on a Jetson Orin Nano robot at about 15 FPS; in multi-source gas simulations it localized sources with 0.54 m mean error, 49% lower than coverage-only exploration.
- Adapted C* coverage path planning for hazard inspection by weighting waypoints by travel distance, obstacle proximity and hazard evidence, balancing area coverage with focused inspection.
- Used CUSUM change detection on gas readings to trigger dense sampling around hotspots, and fused gas evidence with YOLOv8 detections into a single chemo-visual hazard map that updates Nav2 avoidance costs.
