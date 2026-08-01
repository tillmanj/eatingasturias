---
layout: page
title: Fruit & Nuts in Asturian Cuisine
subtitle: null
permalink: /culture/ingredients/fuits-nuts/
ingredientCategory: Fruits-Nuts
toc: false
toc_sticky: true
toc_label: History
sidebar:
  nav: culture_full
lastmod: 2026-08-01T15:54:52.211Z
---


{% assign pageCategory = page.ingredientCategory %}
{% assign ingredients = site.ingredients | where: "ingredientCategory", pageCategory %}
<ul class="col2">
  {% for entry in ingredients %}
    <li><a href="{{entry.permalink}}" title="{{entry.subtitle}}">{{entry.title}}{% if entry.plant_name_eng %} ({{entry.plant_name_eng}}){% endif %}</a></li>
  {% endfor %}
</ul>