---
layout: page
title: Asturian Breweries
subtitle: Craft Beer in Asturias
permalink: /visit/breweries/
toc: false
toc_sticky: true
toc_label: Artisan Beers
sidebar:
  nav: visit_full
date created: Friday, May 16th 2025, 11:23:59 am
date modified: Monday, May 19th 2025, 10:08:03 am
---
Craft brewing is a relatively new, and still very niche, thing in Spain in general, and Asturias specifically. Spain in 2020 with regards to craft beer is analogous to the late 1990s in the United States. In 1990, a US state getting its first craft brewery was news.[^1] By 1996, there were just over 1000 breweries in the entire US. That is roughly where I would put the craft beer scene in Spain today. There is a craft-focused bar or brewpub within an hour’s drive of pretty much anywhere in the country.

While the first craft brewery opened in Spain in 1989,[^2] the early decades were ones of stagnation, not growth. Catalonia, now the center of the craft beer scene in Spain, did not have a single craft brewery until almost a decade after Madrid.[^3]

Asturias joined the craft movement officially in 2007 with the founding of Cervezas La Xana del Molín del Nora.[^4] Not long after that, breweries were found in Gijón, Oviedo, Langreo, and Avilés. Now, less than 15 years later, Asturias has more than two dozen operating craft breweries, and multiple excellent annual beer festivals. 
<style>
  #indexMap{
    height: 500px;
    width: 100%;
  }
</style>
{% leaflet_map { "center" : [43.363129, -5.951843],
                "zoom" : 8,
                "providerBasemap" : "OpenStreetMap.Mapnik",
                "divId" : "indexMap" } %}

  {%- for brewery in site.breweries -%}
    {% if brewery.location.geojson %}
      {% leaflet_geojson {{brewery.location.geojson}} %}
    {% elsif brewery.location.latitude and brewery.location.longitude %}
      {% leaflet_marker { "latitude" : {{brewery.location.latitude}},
                          "longitude" : {{brewery.location.longitude}},
                          "href" : "{{brewery.url}}",
                          "popupContent" : "{{brewery.title}}" } %}
      {% endif %}
  {% endfor %}
{% endleaflet_map %}

## Breweries
These are the breweries I know about in Asturias. Blue links are breweries I have visited and written an in-depth guide to. As I get to visit more of them, I will add them here. 

- Asgaya
- [Asturias Brewing Company](/visit/breweries/asturias-brewing-company.html)
- Barriá
- Bayura 
- [Berrea ](/visit/breweries/berrea-cerveza-artesanal.html)
- Cantábrico Craft Beer
- Caleya
- Cascayu
- Cotoya
- DAI
- Deva
- D'Equi
- Nurse
- Pagana
- Pepinum
- Sacavera
- Crazy Dodo Brewery
- Curuxera Brewery
- Grisú
- La Estrella de Gijón
- La Fragua
- Naviega Cerveza Artesanal
- Nuclear Pigs
- Ordum
- Scone Brewery
- Tolibiers
- Vor Bier & Bar
- Zángana
{:.col2}

## Beer Festivals
There are several excellent beer festivals in Asturias each year.

- Festival Internacional de Cerveza Artesano de Llangréu
- Tolivia Fest
- Seronda Fest
- Somiedo Beer Festival
- Hidromiel Fest
- Mafia Fest

## Notes

[^1]: [https://www.craftbeer.com/beer/beer-history](https://www.craftbeer.com/beer/beer-history)
[^2]: _Naturbier_ in Madrid. Now out of business.
[^3]: _Barcelona Brewing Company_ – started by Steve Huxley
[^4]: [https://birrapedia.com/cervecerias/la-xana-del-molin-del-nora](https://birrapedia.com/cervecerias/la-xana-del-molin-del-nora)