---
title: "Inside Alpha Stack’s build-and-repair loop"
description: "A research and engineering write-up in preparation."
date: 2026-10-09
tags: [language-models]
project: alpha-stack
draft: true
---

A natural-language request is only the start of a software project. Files have to agree with each other, dependencies have to resolve, and the result has to survive a build and a test run. Alpha Stack is my undergraduate capstone exploring that workflow through a terminal-native coding-agent harness.

## From requirements to file contracts

I built a requirements-to-blueprint-to-file-contract pipeline. A Go/Bubble Tea interface exposes the work in the terminal, and dependency-graph context supports parallel generation. The harness returns both the generated codebase and a trace of planning, tool use, and repairs.

## Closing the loop with execution

The planner/corrector loop runs builds and tests, diagnoses failures, and revises affected files. This gives the system a concrete feedback signal to work with after generation.

## Evaluating the whole project

I designed a 40-task benchmark spanning CUDA, Go, Rust, and TypeScript. It tracks build/test results, cost, failure telemetry, external acceptance checks, and an independent LLM-as-judge examiner verdict. These signals answer different questions and should be reported separately.

## Before publication

Add a real request-to-repair trace, explain the benchmark protocol, report measured results with their conditions, and discuss a representative failure. Confirm attribution for shared work.

[Code](https://github.com/HyperKuvid-Labs/alpha-stack)
