---
aliases: []
tags: []
layout: cheese
title: Requexón
subtitle: the best of cottage cheese
permalink: /culture/products/cheese/Requexón.html
toc: false
toc_sticky: true
toc_label: Cheeses
image_splash: null
image_logo: Requexón_label.png
image_logo_caption: The Asturian version of ricotta is an omnipresent and economical part of the standard Asturian diet.
image_detail: Requexón_main.png
image_detail_caption: null
cheese_producer: null
cheese_style: fc
cheese_milk: Cow
cheese_treatment: Pasteurized
cheese_shape: loose curds
cheese_weight: 500g, 1kg
cheese_rind: none
cheese_paste: individual small curds suspended in whey
cheese_aroma: Sweet, creamy, buttery
cheese_flavor: A smooth milky flavor that lingers
cheese_dop: false
cheese_dop_logo: null
cheese_dop_link: null
date created: Tuesday, August 4th 2026, 7:26:22 pm
date modified: Tuesday, August 4th 2026, 7:30:42 pm
conceyu: Cudillero
location:
    latitude: 43.55080711338088
    longitude: -6.225717766064432
lastmod: 2026-08-04T17:32:50.335Z
---
Requexón is a cottage cheese, in that it is a cheese that was, until very recently, made only at home - every home it seems. However, it is not technically the same as North American cottage cheese proper. It is much more closely related to Ricotta from Italy. more importantly, in Asturias it comes in several varieties. There is cow, sheep, goat, and mixed milk requexóns. I am particularly fond of the all-goat variety. 

## Where Is It From?
As mentioned above, requexón is produced throughout Asturias, in farmhouse kitchens and in industrial cheese factories, and everywhere in-between.  My favorite comes from a small producer in the conceyo of Cudillero.
<style>
  #indexMap{
    height: 500px;
    width: 100%;
  }
</style>
{% leaflet_map { "center" : [43.363129, -5.951843],
                "zoom" : 9,
                "providerBasemap" : "OpenStreetMap.Mapnik",
                "divId" : "indexMap" } %} 
    {% if page.location.geojson %}
      {% leaflet_geojson {{page.location.geojson}} %}
    {% elsif page.location.latitude and page.location.longitude %}
      {% leaflet_marker { "latitude" : {{page.location.latitude}},
                          "longitude" : {{page.location.longitude}},
                          "href" : "{{page.url}}",
                          "popupContent" : "{{page.title}}" } %}
      {% endif %}
{% endleaflet_map %}

## How Requexón Is Made
Requexón is made by first warming milk just to the boil and then being acidified (usually through lemon juice or vinegar). Once the curds and whey have separated, the cheese is slowly drained and then lightly salted before being cooled and packaged. 

## History
As I mentioned in the introduction, requexón is closely related to (if not exactly the same thing as) Italian ricotta. That should not be surprising, as pretty much the exact technique used to make ricotta, requexón, urda, anari, and a host of other cheeses have existed in Italy since the late Bronze Age.[^1]

## Uses For Requexón

**Common Uses**: The most traditional use of requexón in Asturias is as a dessert. Requexón con miel is a staple homey dessert. It also makes an appearance in a cheesecake variation; pastel de requexón. 

**How I Use It**: At my house, we use it much as an American might use ricotta: we stir it through warm pasta as the basis for a cacio y pepe variation or add it to tomato sauce for a hearty pink pasta sauce. It makes an appearance in lasagna, and as an essential part of a white pie pizza when I miss New York pizza. I jam it into pancakes and cornbread, and I use it as a base for herbed spreads to make crostinis. 

## Where To Find It
There is no need to go hunting specifically for Spanish requexón in the States. Almost every recipe using it can be made using a creamy American cottage cheese. If you'd like to find a variety that is closer to the Spanish kind, check your local Mexican store for some. It is very popular in Mexican cuisine and easy to find.

[^1]: Kindstedt, Paul (2012). Cheese and Culture: A History of Cheese and its Place in Western Civilization. Chelsea Green Publishing. ISBN 978-1-60358-412-8.