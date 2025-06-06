---
layout: page
title: Queserías
subtitle: Asturian Cheese Makers
permalink: /visit/queserías/
toc: false
toc_sticky: true
toc_label: Cheese Makers
sidebar:
  nav: visit_full
date created: Friday, May 16th 2025, 11:23:59 am
date modified: Thursday, June 5th 2025, 10:45:38 am
---
Asturias produces a lot of cheese. And the vast majority of it is produced by small independent craftspeople. Depending on who you ask there are 42, 50, or over 100 individual types of cheese in Asturias. I personally fall into the high count camp, since outside of the main DOPs, each cheese has a pretty unique character. I am compiling tasting notes on all the cheeses [elsewhere](/culture/products/cheese/), and here I am collecting profiles of all of the cheese makers I can. Individual pages for each cheese maker will provide details on what cheeses they offer, if they are open for visits, and how you can get your hands on some of their production.

{% assign cheesemakers = site.producers | where: "type", "quesería" %}
## The Cheese Makers
<ul class="col2">
{% for entry in cheesemakers %}
    <li><a href="{{entry.permalink}}" title="{{entry.subtitle}}">{{entry.title}}</a></li>
{% endfor %}
</ul>