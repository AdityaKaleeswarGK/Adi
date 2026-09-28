---
title: "CRAFT: exploring while mapping hazards"
description: "A research and engineering write-up in preparation."
date: 2026-10-23
tags: [robotics]
project: craft
draft: true
---

CRAFT connects autonomous coverage with chemo-visual hazard mapping in unfamiliar GPS-denied spaces. The project brings together the work represented by HazPatrol and CGLS_gaden.

## Coverage that responds to observations

I built a rover framework in which a rapidly covering graph samples the discovered frontier. CUSUM gas anomalies trigger local fine sweeps. Gas and visual detections feed a risk map recording hazard type and location, which guides subsequent coverage.

## Evaluating localization

Evaluation used GADEN, a ROS-compatible gas-dispersion simulator with known source locations, and a Jetson rover. The reported mean source-localization errors were 0.54 m in a multi-source setting and 0.53 m in a maze. High-concentration hazards were detected within the first 2% of mission time.

## Connecting sensing and computation

Visual inference ran at 24.3 ms per frame with 0.845 mAP@0.5. A full account needs to distinguish the visual evaluation protocol from gas-localization scenarios and physical-rover demonstrations.

## Before publication

Add scenario diagrams and sample trajectories, document sensing and evaluation conditions, explain failure modes, and confirm the CRAFT/HazMap naming and collaborator credits.

[Coverage code](https://github.com/AdityaKaleeswarGK/hazpatrol) · [Gas localization](https://github.com/AdityaKaleeswarGK/CGLS_gaden)
