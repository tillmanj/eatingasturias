---
layout: page
title: Craft Beer In Asturias
subtitle: 
permalink: /culture/products/beer/
toc: false
toc_sticky: true
toc_label: Asturian Craft Beer
sidebar:
  nav: culture_full
date created: Thursday, June 5th 2025, 5:02:27 pm
date modified: Thursday, June 5th 2025, 6:53:01 pm
---
{% marginfigure 'mf01' '/assets/images/beer/landgeist-spain-alcohol.jpg' 'Contrary to popular belief Spain is not part of wine drinking southern Europe, and instead joins central Europe in the beer-drinking camp. (thanks to Martijn from [Landgeist](https://landgeist.com/2021/06/03/beer-spirits-or-wine/))' %}

{% newthought 'While cider reigns supreme,'%} beer is the second most popular tipple in Asturias, and the most popular in the rest of Spain. And whle beer is generally popular throughout Spain, it is in the north that craft brewing is concentrated. Asturias has a nice, growing, selection of breweries, producing a wide variety of beers.

For a more detailed look at the state of craft brewing in Asturias in general, you can check out my [Overview of Craft Beer in Asturias](/culture/products/beer/overview.html).

## Asturian Beers by Brewery
<ul>
{% assign sorted_breweries = site.breweries | sort: 'title' %}
{% for brewery in sorted_breweries %}
    <li><a href="{{brewery.url}}" title="{{brewery.subtitle}}">{{brewery.title}}</a>
        {% assign beers = site.beers | where: "brewery", brewery.title %}
        <ul>
        {% for beer in beers %}
            <li><a href="{{beer.url}}" title="{{beer.subtitle}}">{{beer.title}}</a></li>
        {% endfor %}
        </ul>
    </li>
{% endfor %}
</ul>

