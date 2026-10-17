---
role: "Robotics Research Intern"
org: "Department of Robot and Smart System Engineering, Kyungpook National University"
location: "Remote / Vellore"
start: "Jul 2026"
end: "Sep 2026"
order: 1
links:
  - { label: "CRAFT / HazMap (preprint)", url: "https://drive.google.com/file/d/1Uc-9NHbLMkmE7zuQGEXiru03pHrtng9c/view?usp=drive_link" }
  - { label: "HazPatrol (repo)", url: "https://github.com/AdityaKaleeswarGK/hazpatrol" }
  - { label: "Gas-source localization (repo)", url: "https://github.com/AdityaKaleeswarGK/CGLS_gaden" }
---
- Worked with **Dr. Yuvaraj and Dr. Bubryur Kim** on autonomous exploration and hazard mapping for robotic inspection in unknown environments.
- Developed **HazMap / CRAFT**, combining C*-based coverage planning with CUSUM gas anomaly detection. Suspected gas hotspots trigger finer local sweeps to improve concentration mapping and source localization.
- Integrated visual hazard detection with depth measurements and robot pose, locating hazards on the map and updating navigation costs so the rover can avoid them.
- Evaluated gas-triggered refinement in four **GADEN** simulation environments. Comparisons in three environments showed approximately 10–59% lower mean localization error than coverage without adaptive refinement.
- Deployed the integrated ROS 2 system on an **NVIDIA Jetson Orin Nano** rover, running navigation, gas monitoring, and visual hazard mapping onboard, with visual processing at approximately 15 FPS during the indoor deployment.
