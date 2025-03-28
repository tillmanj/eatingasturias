---
layout: page
title: Meats in Asturian Cuisine
subtitle: A sturdy pillar of Asturian cooking
permalink: /culture/ingredients/meat/
ingredientCategory: Meat
toc: false
toc_sticky: true
toc_label: Meats
sidebar:
  nav: culture_full
---


{% assign pageCategory = page.ingredientCategory %}
{% assign ingredients = site.ingredients | where: "ingredientCategory", pageCategory %}
<ul class="col2">
  {% for entry in ingredients %}
    <li><a href="{{entry.permalink}}" title="{{entry.subtitle}}">{{entry.title}}</a></li>
  {% endfor %}
</ul>