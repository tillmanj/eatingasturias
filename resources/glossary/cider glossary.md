---
layout: page
title: A Cider Glossary
subtitle: A Bilingual Guide to Terms and Attributes for the Organoleptic Evaluation of Asturian Cider
permalink: /resources/glossary/cider-glossary.html
toc: true
toc_sticky: true
---

While certainly not a complete lexicon of Asturian words and phrases concerning the drinking of cider, this is a fairly complete one for the purposes of standardized tasting. It is meant to accompany my Cider Evaluation Standard and A Cider Tasting Methodology. My sincere hope is that it will attract enough attention outside of Asturias to make this unique style of cider making more widely appreciated.

This lexicon is based on both the common English language vocabularies for describing the organoleptic qualities of beers and wines (where appropriate) and the traditional Asturian vocabulary for describing sidra natural. This is not meant to be a guide for all cider types. It is intended solely for describing Asturian (and by extension Basque) ciders. As such it is constrained to the vocabulary common to those types of traditional ciders.

When I have included words in Asturian, they are italicized and noted as to whether it is a (positive) or (negative) quality of the cider when its use is not purely descriptive. As is to be expected, this is a work in progress. All errors in translation are my own, and I hope that anyone who can offer correction or clarification on any point does so.

I have arranged the terms in categories that reflect my evaluation categories. I hope you find them informative and useful. 

## Appearance
Asturians put great stock in the proper appearance and presentation of the cider. Perhaps more so than anywhere else I’ve ever drunk cider. For that reason, there is a well-developed vocabulary in Asturias for describing the visual aspects of sidra natural. 

### Carbonation
For the most part we are talking about still (uncarbonated) cider, so we must ignore the standard nomenclature used for carbonated beverages, and instead defer to the traditional Asturian ways of describing the action of introducing bubbles into the cider before it is drunk. For more on this process, see Escanciar. 

{% assign carbonated = site.data.glossary | where: "topic", "carbonation" -%}
{% for glossary in carbonated %}
<dfn id="def-{{glossary.term}}">{{glossary.term}}</dfn>
: {{glossary.definition}} {% if glossary.url %}<a href="{{glossary.url}}">read more...</a>{% endif %}
{% endfor %}

### Legs

{% assign carbonated = site.data.glossary | where: "topic", "legs" -%}
{% for glossary in carbonated %}
<dfn id="def-{{glossary.term}}">{{glossary.term}}</dfn>
: {{glossary.definition}} {% if glossary.url %}<a href="{{glossary.url}}">read more...</a>{% endif %}
{% endfor %}

## Mouthfeel

### Body

{% assign carbonated = site.data.glossary | where: "topic", "body" -%}
{% for glossary in carbonated %}
<dfn id="def-{{glossary.term}}">{{glossary.term}}</dfn>
: {{glossary.definition}} {% if glossary.url %}<a href="{{glossary.url}}">read more...</a>{% endif %}
{% endfor %}

### Sensation

{% assign carbonated = site.data.glossary | where: "topic", "sensation" -%}
{% for glossary in carbonated %}
<dfn id="def-{{glossary.term}}">{{glossary.term}}</dfn>
: {{glossary.definition}} {% if glossary.url %}<a href="{{glossary.url}}">read more...</a>{% endif %}
{% endfor %}

## Base Flavors

### Alcohol

{% assign carbonated = site.data.glossary | where: "topic", "alcohol" -%}
{% for glossary in carbonated %}
<dfn id="def-{{glossary.term}}">{{glossary.term}}</dfn>
: {{glossary.definition}} {% if glossary.url %}<a href="{{glossary.url}}">read more...</a>{% endif %}
{% endfor %}

### Apple

{% assign carbonated = site.data.glossary | where: "topic", "apple" -%}
{% for glossary in carbonated %}
<dfn id="def-{{glossary.term}}">{{glossary.term}}</dfn>
: {{glossary.definition}} {% if glossary.url %}<a href="{{glossary.url}}">read more...</a>{% endif %}
{% endfor %}

### Acetic

{% assign carbonated = site.data.glossary | where: "topic", "acetic" -%}
{% for glossary in carbonated %}
<dfn id="def-{{glossary.term}}">{{glossary.term}}</dfn>
: {{glossary.definition}} {% if glossary.url %}<a href="{{glossary.url}}">read more...</a>{% endif %}
{% endfor %}

### Tannic

{% assign carbonated = site.data.glossary | where: "topic", "tannic" -%}
{% for glossary in carbonated %}
<dfn id="def-{{glossary.term}}">{{glossary.term}}</dfn>
: {{glossary.definition}} {% if glossary.url %}<a href="{{glossary.url}}">read more...</a>{% endif %}
{% endfor %}

## Aromas  & Other Flavors

{% assign carbonated = site.data.glossary | where: "topic", "aromas" -%}
{% for glossary in carbonated %}
<dfn id="def-{{glossary.term}}">{{glossary.term}}</dfn>
: {{glossary.definition}} {% if glossary.url %}<a href="{{glossary.url}}">read more...</a>{% endif %}
{% endfor %}

## Balance

{% assign carbonated = site.data.glossary | where: "topic", "balance" -%}
{% for glossary in carbonated %}
<dfn id="def-{{glossary.term}}">{{glossary.term}}</dfn>
: {{glossary.definition}} {% if glossary.url %}<a href="{{glossary.url}}">read more...</a>{% endif %}
{% endfor %}