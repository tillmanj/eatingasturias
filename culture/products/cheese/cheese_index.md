---
layout: page
title: Asturian Cheeses
subtitle: 7 Types, 100+ Varieties
permalink: /culture/products/cheese/
toc: true
toc_sticky: true
toc_label: Cheeses
---
The number of cheeses made in Asturias is a somewhat contentious topic, and perhaps subject to a bit of inflation as time goes by. Depending on how you count them, there are between 40 and 200.

This embarrassment of riches leads to a problem. How should we talk about these cheeses? Spain has multiple, conflicting, ways of describing cheeses, and so does pretty much every other European country. Fortunately, the world’s coolest cheese-monger, [Juliet Harbutt](https://www.thecheeseweb.com/world-cheese-lady), has tackled exactly this issue.

Her [7 Different Types of Cheese](https://www.thecheeseweb.com/7-types-of-cheese) provides a wonderful structure to talk about cheeses without having to delve into either coagulation temperatures or particular national obsessions with one sensory detail or another. She has graciously allowed me to use that structure here, to make sense of the plethora of Asturian cheeses. Let’s get to it!

# Fresh Cheese

_Quesos frescos_ in all their varieties. From _Ricotta_ relative _Requexón_ to the atypical aged paste _Urbiés_, these cheeses are widely eaten in Asturias. They are favorite cheeses for spreading on bread, eating with a dollop of honey for dessert, or using in sauce making.

{% assign fc = site.cheeses | where: "cheese_style", "fc" %}
{% if fc.size > 0 %}
<ul class="col2">
    {% for cheese in fc %}
        <li><a href="{{cheese.url}}" title="{{cheese.subtitle}}">{{cheese.title}}</a></li>
    {% endfor %}
</ul>
{% endif %}

# Aged Fresh Cheese

_Wrinkled white to grey-blue rind - 19-24% Fat_{:.subtitle}

These are the slightly aged goat cheeses famous all over Spain as _rulo de cabra_ and similar. The rind is almost non-existent, looking more like dust or tiny crystals.

{% assign afc = site.cheeses | where: "cheese_style", "afc" %}
{% if afc.size > 0 %}
<ul class="col2">
    {% for cheese in afc %}
        <li><a href="{{cheese.url}}" title="{{cheese.subtitle}}">{{cheese.title}}</a></li>
    {% endfor %}
</ul>
{% endif %}

# Soft White Rind Cheese

_White Fuzzy Rind - 24-26% Fat_{:.subtitle}

These grow a fine white crusty rind of _penicillin candidum_ mold, which helps ripen the cheese and prevents the soft, voluptuous interior from drying out. Mild, sweet and buttery, the rind sometimes deepening to a rust color as in the singular Rey Silo.

{% assign swc = site.cheeses | where: "cheese_style", "swc" %}
{% if swc.size > 0 %}
<ul class="col2">
    {% for cheese in swc %}
        <li><a href="{{cheese.url}}" title="{{cheese.subtitle}}">{{cheese.title}}</a></li>
    {% endfor %}
</ul>
{% endif %}

# Semi-Soft Cheese

_Fine to thick grey-brown rind or orange & sticky - 26-28% Fat_{:.subtitle}

Asturias (and Spain in general) loves semi-soft cheeses. The curd is lightly pressed to remove whey and create a rubbery, elastic texture. Some like _Abredo_ have a barely formed rind and are generally mild, buttery and sweet. Those with a thicker, mold-encrusted rind such as _El Castañéu_ are denser and taste stronger, more earthy. Some, like _Vidiago_, are repeatedly ‘washed’ in brine which encourages the orange, sticky, bacteria to develop. The result is a feisty, pungent flavor and aroma.

{% assign ssc = site.cheeses | where: "cheese_style", "ssc" %}
{% if ssc.size > 0 %}
<ul class="col2">
    {% for cheese in ssc %}
        <li><a href="{{cheese.url}}" title="{{cheese.subtitle}}">{{cheese.title}}</a></li>
    {% endfor %}
</ul>
{% endif %}

# Hard Cheese

_crusty, grey often polished, waxed or oiled - 28-34% Fat_{:.subtitle}

Hard cheeses are pressed for anywhere from a few hours to even weeks in order remove the whey and compact the curd. While not the most famous of the Asturian cheeses, they are some of the most interesting. Usually enjoyed by themselves, as part of a _tabla_ of cheese, these are rarely used in Asturian cooking.

{% assign hc = site.cheeses | where: "cheese_style", "hc" %}
{% if hc.size > 0 %}
<ul class="col2">
    {% for cheese in hc %}
        <li><a href="{{cheese.url}}" title="{{cheese.subtitle}}">{{cheese.title}}</a></li>
    {% endfor %}
</ul>
{% endif %}

# Blue Cheese

_Gritty, rough, sometimes sticky rind - 28-34% Fat_{:.subtitle}

The pride of Asturias is its blue cheeses. From the world-famous DOP Cabrales to the understated Picu Urriellu, _Penicillium Roqueforti_ is no stranger to the Asturian mountain caves where these cheeses are ripened. These are especially prized for eating alongside cider and are widely used in sauce making.

{% assign bc = site.cheeses | where: "cheese_style", "bc" %}
{% if bc.size > 0 %}
<ul class="col2">
    {% for cheese in bc %}
        <li><a href="{{cheese.url}}" title="{{cheese.subtitle}}">{{cheese.title}}</a></li>
    {% endfor %}
</ul>
{% endif %}

# Flavor-Added Cheese

_Cheeses with various flavorings - 28-34% Fat_{:.subtitle}

Cheeses to which any outside flavoring (excepting smoking) has been added. Commonly in Asturias this takes the form of soft goats cheese with fruit of some sort mixed in, but can also be harder cheeses mixed with herbs or _pimentón_.

{% assign fac = site.cheeses | where: "cheese_style", "fac" %}
{% if fac.size > 0 %}
<ul class="col2">
    {% for cheese in fac %}
        <li><a href="{{cheese.url}}" title="{{cheese.subtitle}}">{{cheese.title}}</a></li>
    {% endfor %}
</ul>
{% endif %}