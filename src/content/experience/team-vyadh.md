---
role: "Autonomous Systems Engineer"
org: "Team Vyadh (Mars Rover Team), VIT"
location: "Vellore"
start: "Apr 2024"
end: "Sep 2025"
summary: "Autonomous navigation, perception & state estimation for a Mars rover — 13th at IRC, 4th at IRDC 2025."
order: 4
links:
  - { label: "Obstacle & pit avoidance (repo)", url: "https://github.com/AdityaKaleeswarGK/obstacle_pit_avoidance_using-pointcloud-process" }
  - { label: "Rover stack (repo)", url: "https://github.com/TeamVyadhVIT/strawberry_cheesecake" }
milestones:
  - { date: "Apr 2024", label: "Joined the autonomous domain team" }
  - { date: "Jan 2025", label: "Promoted to Senior Autonomous Member", promotion: true }
---
- Engineered the autonomous navigation stack with **ROS 2 (Nav2)** and **SLAM**, implementing a **Frontier Exploration** algorithm to map unknown environments within dynamic GPS geofences.
- Built a real-time **obstacle & pit avoidance** perception pipeline using **Intel RealSense D455** + **PCL**, with odometry-based path recovery and a custom PID alignment to compensate for wheel drift on uneven terrain.
- Fused IMU + odometry with an **Extended Kalman Filter** to cut state-estimation noise, and built a telemetry GUI for Astro-Bio sensor streams (CO₂, IR, moisture).
- Part of the team that placed **13th at the International Rover Challenge (IRC)** and **4th at the IRDC 2025**.
