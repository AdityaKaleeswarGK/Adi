---
title: "PINN: from crack geometry to fracture mechanics"
description: "A research and engineering write-up in preparation."
date: 2026-11-20
tags: [physics-informed-ml]
project: pinn
draft: true
---

A detected crack provides a location and shape. My research connects that visual information to mechanics-based assessment through an image-processing pipeline and a physics-informed neural network.

## Extracting geometry

I developed a rover-image-to-fracture pipeline that segments individual concrete cracks and extracts skeleton arc length and width. Calibrated image geometry supplies boundary conditions for the mechanics stage.

## Representing the crack tip

The mesh-free PINN embeds a Williams crack-tip field and learns a stress-intensity amplitude. Positivity and a near-tip cage loss constrain the model. The longer article will explain the formulation and the role of each constraint.

## Comparing with a reference

The model recovered Mode I stress intensity within approximately 6.5% of an independent finite-element reference across five seeds. It also tracked analytical geometry factors for a/W = 0.10–0.30. These results apply to the studied geometries and are not structural safety certification.

## Before publication

Add geometry and boundary-condition diagrams, independent reference-solver details, seed-level results, an example image, and an explicit discussion of the validated domain.

[Code](https://github.com/AdityaKaleeswarGK/PiNNBased_SHM)
