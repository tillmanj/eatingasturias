---
term:
  connotation: null
  definition: null
  domain: sidra
  subdomain: null
  topic: null
layout: page
title: Test Scratch Pad
subtitle: you shouldn't be here
permalink: /test/
style: Ordinary Bitter
lastmod: 2026-02-17T15:11:06.239Z
---
## styleSlug
{% assign styleSlug = page.style | slugify "ascii" %}

styleSlug == {{styleSlug}}

## thisStyle
### assign
{% assign thisStyle = site.data.beer_styles | find: "slug", {{styleSlug}}  %}
{{thisStyle | inspect}}
### enumerate
- {{thisStyle.slug}}
- {{thisStyle.style}}
- {{thisStyle.og}}

## beer_styles.yml loop
{% for test in site.data.beer_styles %}
  - {{test.[0]}}
{% endfor %}