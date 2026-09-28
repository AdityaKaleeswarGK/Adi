# Writing release plan

Proposed editorial schedule, prepared 28 September 2026. These are target dates, not automatic publication commitments. All four articles are drafts and excluded from routes. The website shows the series as forthcoming without promising dates.

| Target | Article | Material to gather before release |
| --- | --- | --- |
| 9 October 2026 | Alpha Stack: from request to a tested codebase | One real execution trace; benchmark protocol; representative pass/fail cases; permission to share team artifacts |
| 23 October 2026 | CRAFT: exploring while mapping hazards | Coverage and local-sweep figures; scenario definitions; attribution; mapping between CRAFT and the existing HazMap preprint |
| 6 November 2026 | ECC: prediction without composition leakage | Group-split protocol; coverage figures; inverse-design example; manuscript status |
| 20 November 2026 | PINN: from crack geometry to mechanics | Geometry diagram; reference-solver setup; per-seed errors; boundaries of the validated domain |

## Release process

1. Expand the corresponding Markdown draft under src/content/blog using the linked code, research artifacts, and personal notes. Resume-sourced paragraphs are a starting point, not a substitute for a full account.
2. Confirm personal contribution, collaborator attribution, reproducibility details, and any publication constraints. Do not infer acceptance from submission.
3. Add real figures with captions and alt text. Concept illustrations on project pages are explicitly not experimental results.
4. Replace the date with the actual publication date, set draft to false, run npm run build, and review the page on desktop and mobile.
5. Deploy through GitHub. Future dates are filtered at build time; changing a date alone does not schedule a deployment. No publishing automation is enabled.
6. Keep the `project` frontmatter field: the writing index and project write-up callout automatically switch to the published article after rebuilding. The homepage displays recent published writing when available.

## Sources and editorial choices

The updated public/resume.pdf is the primary source for graduation, Alpha Stack, CRAFT, ECC, PINN, and corrected experience dates/results. Existing source content retains the KNU collaboration, preprint links, and dated historical log. Stress Stack is the current project per Aditya and its public README.

Keep older exploratory notes as historical entries. Use September 2026 as the explicit timestamp on /now, rather than presenting an old timeline event as current.
