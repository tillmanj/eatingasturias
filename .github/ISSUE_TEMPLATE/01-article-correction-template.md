---
name: Article correction template
about: For correcting a factual error in an article
title: "[CORRECTION]"
labels: correction
assignees: tillmanj

---

body:
- type: input
  id: url
  attributes:
    label: Article URL
    description: What article are you submitting a correction for?
  validations:
    required: true
- type: textarea
  id: repro
  attributes:
    label: Error to Correct
    description: "What is wrong in the article? Please provide an explanation of the error."
    value: |
      Mistake:
      Correction:
      Source: [Please provide at least one published source with your correction. Issues without sources may be rejected.]
    render: bash
  validations:
    required: true
