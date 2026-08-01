---
layout: page
title: Seafood
subtitle: Everything that swims, scurries, and slithers through the deep
permalink: /culture/ingredients/seafood/
ingredientCategory: Seafood
toc: false
toc_sticky: true
toc_label: Seafood
sidebar:
  nav: culture_full
date created: Thursday, May 15th 2025, 4:49:09 pm
date modified: Thursday, May 15th 2025, 5:53:55 pm
lastmod: 2026-08-01T17:15:42.035Z
---
While the hearty mountain fare and the cheese gets most of the attention in Asturias, the real treasures of Asturias are found in the sea. The cold waters of the Bay of Biscay (*mar Cantabrico* or Cantabrian Sea) provide Asturians with a year-round bounty of seafood.

For a complete guide to Asturian seafood, see my [Asturian Seafood](/culture/primer/seafood/) article

{% assign pageCategory = page.ingredientCategory %}
{% assign ingredients = site.ingredients | where: "ingredientCategory", pageCategory %}
<ul class="col2">
  {% for entry in ingredients %}
    <li><a href="{{entry.permalink}}" title="{{entry.subtitle}}">{{entry.title}}{% if entry.plant_name_eng %} ({{entry.plant_name_eng}}){% endif %}</a></li>
  {% endfor %}
</ul>