---
aliases: []
tags: []
layout: cheese
title: Los Beyos de Vaca
subtitle: null
permalink: /culture/products/cheese/CHEESE NAME.html
toc: false
toc_sticky: true
toc_label: Cheeses
image_splash: null
image_logo: 1280px-Los_Beyos_de_Vaca_label.png
image_logo_caption: A rare salted hard cheese from the land of soft blue cheeses
image_detail: Los_Beyos_de_Vaca_main.png
image_detail_caption: null
cheese_producer: Queseriá Artesanal La Collada
cheese_style: hc
cheese_milk: Cow
cheese_treatment: Pasteurized
cheese_shape: Cylinder
cheese_weight: 500g
cheese_rind: Thin, rather rough, mottled off-white
cheese_paste: Dense, hard paste, crumbly when cut. Varying firmness dependent on age
cheese_aroma: Mild barnyard smells, very milky and lactic
cheese_flavor: Creamy and pleasant, with a tangy lactic aftertaste that lingers.
cheese_dop: true
cheese_dop_logo: IGP_Los_Beyos.png
cheese_dop_link: https://www.tierradesabor.es/figuras-de-calidad/igp-queso-los-beyos
date created: null
date modified: null
conceyu: Amieva
location:
  latitude: 43.26729086769064
  longitude: -5.168003084500406
lastmod: 2026-08-04T14:46:46.998Z
---
On one of my first visits to Asturias, I bought some cheese in this area from a roadside house that had a hand-written sign outside "hay quesos". While almost certainly not part of the IGP, that particular cheese was such a perfect expression of the type (a salted hard cheese aged liked mountain blues) that it still haunts my dreams. 

## Where Is It From?
The Los Beyos gorge (Desfiladero de los Beyos) is an impressive cut in the mountains of the extreme east of Asturias. The river Sella cuts a channel that serves as the border with Castilla y León. The production area includes the municipalities of Ponga and Amieva in Asturias and Oseja de Sajambre in León. As of the middle of 2023, there are three cheese dairies registered in the PGI Queso Los Beyos, all three in the Asturian municipality of Amieva.
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

## How Los Beyos de Vaca Is Made
Unlike many cheeses from the Picos de Europa area, the milk used in making Los Beyos is never mixed. Instead the cheese comes in three separate expressions, Cow, Sheep, and Goat.

Notably, this cheese is salted several times during the 36-48 hour moulding process. Every couple of hours the cheese is pressed, turned, and salted - until the desired firmness is achieved. 

## History
Traditionally produced in various mountain villages in the area, one in which communication was extremely difficult. Travelers were obliged to negotiate the rugged landscape by climbing steep mountain sides and dangerous passes.

The cheese can be made from either raw or pasteurized milk, and is always aged. A minimum of 20 days aging is required for cheese made with pasteurized milk, and a minimum of 60 days for those made with raw milk. 

## Uses For Los Beyos de Vaca

**Common Uses**: This is a cheese made for snacking. It is often served paired with salty smoked ham or other strong flavored cold cuts. 
**How I Use It**: There is no need to do anything to this cheese. Just slice it and eat it. 

## Where To Find It
Unfortunately, I do not know of an American source of this cheese. Fortunately, it is relatively easy to find within Asturias. 