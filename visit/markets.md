---
aliases: []
tags: []
layout: page
title: Asturian Markets
subtitle: Shop like a local
permalink: /visit/markets/
toc: true
toc_sticky: true
toc_label: Markets
sidebar:
    nav: visit_full
date created: Tuesday, May 13th 2025, 2:16:40 pm
date modified: Tuesday, May 13th 2025, 5:59:02 pm
lastmod: 2026-02-17T16:29:43.006Z
---
Every day of the week in Asturias is market day somewhere. In addition to the large central markets in the main cities, Asturias has multiple markets every day of the week. Add in organic produce markets, seasonal markets, the ever-popular winter medieval markets, and a couple of Christmas events, and you have a very full market calendar. Indeed, it is so full that I have made both a Complete Guide to Asturian Market days and an interactive map for finding the closest markets to where you are in Asturias. 

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

  {%- for market in site.markets -%}
    {% if market.location.geojson %}
      {% leaflet_geojson {{market.location.geojson}} %}
    {% elsif market.location.latitude and market.location.longitude %}
      {% leaflet_marker { "latitude" : {{market.location.latitude}},
                          "longitude" : {{market.location.longitude}},
                          "href" : "{{market.url}}",
                          "popupContent" : "{{market.title}}" } %}
      {% endif %}
  {% endfor %}
{% endleaflet_map %}

## Daily Markets
{% assign daily_markets = site.markets | where: "market_freq", "daily" %}

<ul>
    {% for market in daily_markets %}
        <li><a href="{{market.url}}" title="{{market.subtitle}}">{{market.title}}</a></li>
    {% endfor %}
</ul>

## Weekly Markets
{% assign weekly_markets = site.markets | where: "market_freq", "weekly" %}
<div class="list-3-col">
<h4>Monday Markets</h4>
{% assign mon_markets = weekly_markets | where: "market_day", "Monday" %}
<ul>
    {% for market in mon_markets %}
        <li><a href="{{market.url}}" title="{{market.subtitle}}">{{market.shortTitle}}</a></li>
    {% endfor %}
</ul>

<h4>Tuesday Markets</h4>
{% assign tue_markets = weekly_markets | where: "market_day", "Tuesday" %}
<ul>
    {% for market in tue_markets %}
        <li><a href="{{market.url}}" title="{{market.subtitle}}">{{market.shortTitle}}</a></li>
    {% endfor %}
</ul>

<h4>Wednesday Markets</h4>
{% assign wed_markets = weekly_markets | where: "market_day", "Wednesday" %}
<ul>
    {% for market in wed_markets %}
        <li><a href="{{market.url}}" title="{{market.subtitle}}">{{market.shortTitle}}</a></li>
    {% endfor %}
</ul>

<h4>Thursday Markets</h4>
{% assign thu_markets = weekly_markets | where: "market_day", "Thursday" %}
<ul>
    {% for market in thu_markets %}
        <li><a href="{{market.url}}" title="{{market.subtitle}}">{{market.shortTitle}}</a></li>
    {% endfor %}
</ul>

<h4>Friday Markets</h4>
{% assign fri_markets = weekly_markets | where: "market_day", "Friday" %}
<ul>
    {% for market in fri_markets %}
        <li><a href="{{market.url}}" title="{{market.subtitle}}">{{market.shortTitle}}</a></li>
    {% endfor %}
</ul>

<h4>Saturday Markets</h4>
{% assign sat_markets = weekly_markets | where: "market_day", "Saturday" %}
<ul>
    {% for market in sat_markets %}
        <li><a href="{{market.url}}" title="{{market.subtitle}}">{{market.shortTitle}}</a></li>
    {% endfor %}
</ul>

<h4>Sunday Markets</h4>
{% assign sun_markets = weekly_markets | where: "market_day", "Sunday" %}
<ul>
    {% for market in sun_markets %}
        <li><a href="{{market.url}}" title="{{market.subtitle}}">{{market.shortTitle}}</a></li>
    {% endfor %}
</ul>
</div>

## Monthly Markets
{% assign monthly_markets = site.markets | where: "market_freq", "monthly" %}

<ul>
    {% for market in monthly_markets %}
        <li><a href="{{market.url}}" title="{{market.subtitle}}">{{market.title}}</a></li>
    {% endfor %}
</ul>

## Seasonal & Irregular Markets
{% assign seasonal_markets = site.markets | where: "market_freq", "seasonal" %}
{% assign irregular_markets = site.markets | where: "market_freq", "irregular" %}

<ul>
    {% for market in seasonal_markets %}
        <li><a href="{{market.url}}" title="{{market.subtitle}}">{{market.title}}</a></li>
    {% endfor %}
</ul>

<ul>
    {% for market in irregular_markets %}
        <li><a href="{{market.url}}" title="{{market.subtitle}}">{{market.title}}</a></li>
    {% endfor %}
</ul>