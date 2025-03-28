---
layout: page
title: Fruit & Nuts in Asturian Cuisine
subtitle: 
permalink: /culture/ingredients/fuits-nuts/
ingredientCategory: Fruits-Nuts
toc: false
toc_sticky: true
toc_label: History
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