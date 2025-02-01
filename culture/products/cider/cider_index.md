---
layout: page
title: Asturian Sidra Natural
subtitle: The drink that defines the region
permalink: /culture/products/cider/
toc: true
toc_sticky: true
toc_label: Cider
sidebar:
  nav: culture_full
---
{% epigraph 'la sidra es el amor,<br />la tragedia es el vino.' 'Alfonso Camín Meana' 'Crepúsculos de oro' %}

## What Is Sidra?
Let's start with a definition, for the benefit of my fellow Americans. *Sidra* means cider, and cider means fermented apple juice, or as it is more commonly known in those United States; **hard cider**. That is how I will use the term throughout the site. Here is a handy chart:

| American        |   Asturian        | Definition                                                   |
|-----------------|-------------------|--------------------------------------------------------------|
| Apple Juice     | *jugo de manzana* | the pasteurized, filtered, and clarified supermarket product |
| Apple Cider     | *sidra dulce*     | unfiltered, unsweetened juice pressed from apples            |
| Hard Cider      | *sidra natural*   | the fermented juice of apples                                |
| Sparkling Cider | *sidra espumosa*<br />*sidra brut*      | carbonated cider (either alcoholic or not)                   |

## Cider Culture
*Articles on specific aspects of Asturian cider culture*
{% include page-list %}

## Llagares
*Cider makers in Asturias*

{% assign pages = site.pages | sort: 'title' %}
<ul class="col2">
  {%- for item in pages %}
    {%- if item.category == "llagar" %}
      <li><a href="{{ item.url | relative_url }}">{{ item.title }}</a></li>
    {% endif -%}
  {% endfor -%}
</ul>