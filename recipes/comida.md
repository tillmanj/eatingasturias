---
layout: page
permalink: /recipes/courses/comida/
title: La Comida Recipes
subtitle: A proper Spanish lunch
type: course
category:
    - First
    - Second
toc: false
sidebar:
  nav: recipe_full
---
{% newthought 'The Spanish lunch'%} is the main event. Whether eaten at home or in a restaurant, lunch is the main meal of the day in Asturias, and in Spain generally. Home meals (at least where I have been) tend to follow the 2+1 pattern with a couple of courses followed by an optional dessert and/or coffee.

## Primeros
Both at home and in restaurants, the first course is usually  a salad, a soup, a rice dish, or a pasta dish.
{% assign recipes = site.recipes | where: "recipeCourse", 'First' %}
<ul class="col2">
{% for entry in recipes %}
    <li><a href="{{entry.permalink}}">{{entry.title}}</a></li>
{% endfor %}
</ul>

## Segundos
Second courses are almost always meat courses, unless a traditional holiday meal requires it to be vegetarian -- not uncommon for religious holidays.
{% assign recipes = site.recipes | where: "recipeCourse", "Second" %}
<ul class="col2">
{% for entry in recipes %}
    <li><a href="{{entry.permalink}}">{{entry.title}}</a></li>
{% endfor %}
</ul>

## Postres
For desserts, the options are endless. From the humble pice of fruit peeled at the table to elaborate confections and cakes, everything is possible here, so have a look at the [Dessert](/recipes/desserts/) section for a full run down.