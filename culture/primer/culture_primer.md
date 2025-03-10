---
layout: page
title: Asturian Food Culture Primer
subtitle: The Basics of Asturian Food Culture
permalink: /culture/primer/
toc: true
toc_sticky: true
toc_label: Culture
sidebar:
  nav: culture_full
---
{% epigraph 'People who love to eat are always the best people.' 'Julia Child' 'The French Chef, WGBH' %}


## Portion Sizes

## Pinchos

## Topics
<ul class="col2">
{% for entry in site.primer %}
    <li><a href="{{entry.permalink}}" title="{{entry.subtitle}}">{{entry.title}}</a></li>
{% endfor %}
</ul>