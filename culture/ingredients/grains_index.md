---
layout: page
title: Grains in Asturian Cuisine
subtitle: The gifts of Ceres
permalink: /culture/ingredients/grains/
ingredientCategory: Grains
toc: false
toc_sticky: true
toc_label: History
sidebar:
  nav: culture_full
---
Cereals are enormously important in daily life in Asturias, where not only is daily bread a requirement, but a variety of types. each with it's own mix of traditional and more recent grains.

{% assign pageCategory = page.ingredientCategory %}
{% assign ingredients = site.ingredients | where: "ingredientCategory", pageCategory %}
<ul class="col2">
  {% for entry in ingredients %}
    <li><a href="{{entry.permalink}}" title="{{entry.subtitle}}">{{entry.title}}</a></li>
  {% endfor %}
</ul>