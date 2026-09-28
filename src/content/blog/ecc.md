---
title: "ECC: prediction without composition leakage"
description: "A research and engineering write-up in preparation."
date: 2026-11-06
tags: [machine-learning]
project: ecc
draft: true
---

Predicting the tensile properties of engineered cementitious composites involves both strength and ductility. In this project, I built a replicate-aware framework and connected calibrated predictions to constrained inverse design.

## The unit of evaluation matters

The dataset contained 620 tensile tests representing 276 unique mixes. I grouped repeated tests by composition to prevent composition leakage and trained target-specific CatBoost quantile models for stress and strain.

## Reporting uncertainty

Conformal adjustment calibrated nominal 80% prediction intervals. Observed coverage was 80.4% for stress and 82.6% for strain, with group-level R² of 0.749 and 0.605. These values describe the evaluated dataset and split; they do not establish coverage for every new material population.

## From prediction to design

I connected the models to support-constrained NSGA-II inverse design. The support constraint rejects high-strength/high-ductility targets outside the observed mix domain. The write-up will explain how that domain is defined and how candidate designs are assessed.

## Before publication

Add the precise grouping and split protocol, calibration figures, a supported inverse-design example, and an account of limitations and collaborators.

[Code](https://github.com/AdityaKaleeswarGK/ECC-pipeline)
