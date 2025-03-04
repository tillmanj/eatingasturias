---
layout: page
title: Test Scratch Pad
subtitle: you shouldn't be here
permalink: /test/
requires:
  - Empanada Dough
  - ChorizO A La Sidra
---
A place to mess with problems I am having in figuring out the syntax to make Liquid do what I want to do.

## Basic Output
requires length: {{page.requires.size}}

## r = \{\{r\}\}
<ul>
{% for r in page.requires %}
    <li>
        r = {{r}} / downcase: {{r | downcase}}
    </li>
{% endfor %}
</ul>

## loop counter test
{% assign i = 0 %}
i = {{0}}
<ul>
{% for r in page.requires %}
    {% assign i = i | plus: 1 %}
    <li>{{i}}</li>
{% endfor %}
</ul>

## nested loop
<ul>
{% for r in page.requires %}
    {% assign thisTitle = r | downcase %}
    {% for entry in site.recipes %}
        {% assign thatTitle = entry.title | downcase %}
        {% if thatTitle == thisTitle %}
            <li itemprop="recipeIngredient"><a href="{{entry.permalink}}" title="{{entry.subtitle}}">{{entry.title}}</a></li>
        {% endif %}
    {% endfor %}
{% endfor %}
</ul>