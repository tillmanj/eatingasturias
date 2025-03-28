---
layout: page
title: Beans in Asturian Cuisine
subtitle: A sturdy pillar of Asturian cooking
permalink: /culture/ingredients/beans/
ingredientCategory: Beans
toc: false
toc_sticky: true
toc_label: History
sidebar:
  nav: culture_full
---
Beans are one of the [four pillars of Asturian cuisine](/culture/four-pillars/). They form the bedrock of day to day home cooking in the region, and they star in the most-loved and widely known Asturian dishes.

{% assign pageCategory = page.ingredientCategory %}
{% assign ingredients = site.ingredients | where: "ingredientCategory", pageCategory %}
<ul class="col2">
  {% for entry in ingredients %}
    <li><a href="{{entry.permalink}}" title="{{entry.subtitle}}">{{entry.title}}</a></li>
  {% endfor %}
</ul>