---
layout: page
title: Common Ingredients
subtitle: The building blocks of Asturian cuisine
permalink: /culture/ingredients/
toc: true
toc_sticky: true
toc_label: Ingredients
sidebar:
  nav: culture_full
---

{% epigraph 'Tradition, most of the time, doesn’t respect ingredients' 'Massimo Bottura' 'Chef‘s Table - [S1E1](https://www.imdb.com/title/tt4383018/)' %}

{% newthought 'When the recipe follows' %} the available ingredients, then there is innovation and improvement. When the ingredients are chosen for flavor, grown with care, and cooked as soon as possible after harvest, then there is a real cuisine of place. When the ingredients are assembled from all of what is available in the world, the quality can be very high, but there is not a sense of place in the food.

Asturias has a more-or-less year-round growing season, and a mild enough climate to allow for a very wide variety of ingredients to be grown or otherwise produced within it's boundaries. I am just as interested in these as I am in the recipes cooked with them. This *materia prima* is what makes Asturian cuisine Asturian. It connects the food cooked in it's restaurants to the long tradition of what is cooked at home, and it grounds (quite literally) what is cooked at home to what can be grown in the *güertu* outside the kitchen door.

## Beans
<ul class="col2">
{% assign beans = site.ingredients | where: "ingredientCategory", "Beans" %}
{% for ingredient in beans %}
  <li><a href="{{ingredient.permalink}}" title="{{ingredient.subtitle}}">{{ingredient.title}}</a></li>
{% endfor %}
</ul>

## Meats
<ul class="col2">
{% assign Meats = site.ingredients | where: "ingredientCategory", "Meats" %}
{% for ingredient in Meats %}
  <li><a href="{{ingredient.permalink}}" title="{{ingredient.subtitle}}">{{ingredient.title}}</a></li>
{% endfor %}
</ul>

## Fruits & Nuts
<ul class="col2">
{% assign Fruits-Nuts = site.ingredients | where: "ingredientCategory", "Fruits-Nuts" %}
{% for ingredient in Fruits-Nuts %}
  <li><a href="{{ingredient.permalink}}" title="{{ingredient.subtitle}}">{{ingredient.title}}</a></li>
{% endfor %}
</ul>

## Grains
<ul class="col2">
{% assign grains = site.ingredients | where: "ingredientCategory", "Grains" %}
{% for ingredient in grains %}
  <li><a href="{{ingredient.permalink}}" title="{{ingredient.subtitle}}">{{ingredient.title}}</a></li>
{% endfor %}
</ul>

## Seafood
<ul class="col2">
{% assign seafood = site.ingredients | where: "ingredientCategory", "Seafood" %}
{% for ingredient in seafood %}
  <li><a href="{{ingredient.permalink}}" title="{{ingredient.subtitle}}">{{ingredient.title}}</a></li>
{% endfor %}
</ul>

## Vegetables
<ul class="col2">
{% assign vegetables = site.ingredients | where: "ingredientCategory", "Vegetables" %}
{% for ingredient in vegetables %}
  <li><a href="{{ingredient.permalink}}" title="{{ingredient.subtitle}}">{{ingredient.title}}</a></li>
{% endfor %}
</ul>