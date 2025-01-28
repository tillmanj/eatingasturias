---
layout: single
title: Structured Data
subtitle: Data wants to be free (from your bad design)
date: 2024-12-23 7:30:06 +0100
show_date: yes
categories: news
tags: []
read_time: true
comments: true
share: false
related: false
toc: true
---
One of my design goals for this iteration of the website was to have proper structured data everywhere that I could. This required a bit of work, due to the various types of content on this website (business locations, product reviews, recipes, ingredient plant profiles, etc…) but I am relatively happy with how it has turned out, and I hope for greater depth in structuring the data on this site in the future.

## What Is Structured Data?
Structured data is data that is organized or formatted in a way that allows it to be easily searchable, and discoverable. Most commonly structured data refers to data stored in databases, information management systems, and other data storage systems.

## Why Does It Matter?
I am broadly in favor of all technologies that allow data to be found and connected together in *webs of meaning* across domains. As Tim Berners-Lee put it, "The Semantic Web isn't just about putting data on the web. It is about making links, so that a person or machine can explore the web of data.  With linked data, when you have some of it, you can find other, related, data."[^1]

In addition, through the auspices of [Schema.org](Schema.org), the major search engines (Google, Microsoft, Yahoo and Yandex), have developed vocabularies for structured data that not only allows for better search results (an desperately needed thing in this age of poisonous astroturfing by thuggish opportunists) but along with Semantic Markup that promises to completely decouple content and presentation - gives a hint of a future of web content in which data and content are more important for publishers than flashy presentation.

Linked Open Data is the goal. Data that is:

- On the web
- machine-readable
- in non-proprietary formats
- according to open standards like RDF
- linked via URIs that are dereferenceable

## How Do I Use It?
I implement various *schemas* to structure the data on this site in various ways. While I won't bore you with a complete list of all of the schemas in use and where, the most important one, and one that bears a bit of discussion, is the recipe schema.

Every recipe on the site should be properly marked up according to the lexicon on [recipe.exchange](https://recipe.exchange/docs/technical) to allow proper sharing of the recipes on the site.

## Notes
[^1]: Berners-Lee, Tim *[Linked Data](https://www.w3.org/DesignIssues/LinkedData.html)*, Design Issues, World Wide Web Consortium, 2006-07-27