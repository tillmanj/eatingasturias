---
layout: page
title: Other Artisanal Products in Asturias
subtitle: null
permalink: /culture/products/other/
toc: false
toc_sticky: true
toc_label: Asturian Artisanal Products
sidebar:
  nav: culture_full
date created: Thursday, June 5th 2025, 5:02:27 pm
date modified: Thursday, June 5th 2025, 6:53:01 pm
lastmod: 2026-07-29T18:41:04.942Z
---

{% newthought 'In addition to cider,'%} beer, wine, cheese, and sausage, there are a variety of Asturian products that define the gastronomy of the region. Those are what I highlight here. Some are ancient and venerable, like TITLE, some are the result of the [Columbian Exchange](/culture/history/early-modern/columbian-exchange.html) like [Harina de Maíz](/culture/products/harina-de-maíz.html), and some are contemporary, like Nocilla. Each, however, tells a part of the story of Asturian cuisine, through the raw materials transformed into pantry staples, delicacies, and stories of times (and meals) gone by.

## Asturian Artisanal Products
<ul>
{% assign sorted_products = site.products | sort: 'title' %}
{% for product in sorted_products %}
    <li><a href="{{product.url}}" title="{{product.subtitle}}">{{product.title}}</a></li>
{% endfor %}
</ul>