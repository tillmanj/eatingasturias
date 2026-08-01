---
layout: page
title: Meats in Asturian Cuisine
subtitle: Welcome to beef country
permalink: /culture/ingredients/meat/
ingredientCategory: Meat
toc: false
toc_sticky: true
toc_label: Meats
sidebar:
  nav: culture_full
lastmod: 2026-08-01T15:54:58.725Z
---
{% newthought 'Asturias eats a lot of meat.'%} From the ever-present chicken to the emblematic *ternera* (veal), Ít is rare to find a meal in Asturias without meat of some sort.

{% assign pageCategory = page.ingredientCategory %}
{% assign ingredients = site.ingredients | where: "ingredientCategory", pageCategory %}
<ul class="col2">
  {% for entry in ingredients %}
    <li><a href="{{entry.permalink}}" title="{{entry.subtitle}}">{{entry.title}}{% if entry.plant_name_eng %} ({{entry.plant_name_eng}}){% endif %}</a></li>
  {% endfor %}
</ul>