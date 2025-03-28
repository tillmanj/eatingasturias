---
layout: single
title:  "Notes on Bibliographies"
subtitle: why is academic writing on the web so difficult?
date:   2024-12-19 17:30:06 +0100
show_date: yes
categories: news
tags: academia books
read_time: true
comments: true
share: false
related: false
toc: false
---

One of the things I was most looking forward to in moving the website from MediaWiki to Jekyll was the opportunity to really dig into how to best handle the (somewhat ridiculously) large [bibliography](resources/bibliography/) that Eating Asturias has developed over the years.

From the very beginning of this site, citations and explanatory footnotes (or more technically endnotes since I do not paginate my articles) have been something of a burden. Footnoting in WordPress is anemic at best, and the plugins available end up building a Frankenstein's monster of dependencies and brittleness (like all WP plugins, to be honest.)

[Mediawiki](https://www.mediawiki.org/wiki/MediaWiki), despite being designed around Wikipedia's citation-centric pattern, is not much better, at least for a work limited to a single domain. [SemanticMediaWiki](https://www.semantic-mediawiki.org/wiki/Semantic_MediaWiki) attempts to address this problem through the [SemanticCite](https://www.semantic-mediawiki.org/wiki/Extension:Semantic_Cite) extension, but unfortunately it too is a dependency hell, and development updates often lag the core SemanticMediaWiki extension by years, and in turn SemanticMediaWiki consistently lags actual MediaWiki versions by years as well. Neither do a very good job of keeping pace even with critical security releases, much less with major feature releases.

Over the years of struggling with these two systems, both inadequate for my needs, I developed a list of features I would like to see in a citation and endnoting system. Those requirements were:

- [BibTeX](https://www.ctan.org/pkg/bibtex) file parsing, which would allow me to do all bibliographic management work in [Zotero](https://www.zotero.org/), (or another citation manager of my choosing)
- Unified [bibliography page](/resources/bibliography/) containing all citations made throughout the website.
- Citations rendered as footnotes and conforming to [MLA9](https://owl.purdue.edu/owl/research_and_citation/mla_style/mla_formatting_and_style_guide/mla_changes_9th_edition.html) style (particularly for it's more robust annotation of bibliographies)[^1]
- [Detail pages](/resources/bibliography/ModernLanguageAssociationofAmerica2021MLAHandbook/) for each bibliography entry to allow for more complete information about it, and possibly a list of places in the website where it is cited. (This is not a trivial problem)

With the exception of the last part of the last item (citation backlinks), I built out a system that works for me in a morning using [jekyll-scholar](https://github.com/inukshuk/jekyll-scholar). Another user has taken an [initial stab](https://github.com/inukshuk/jekyll-scholar/issues/344) at solving the backlinks from work to individual citations, and I am digging into [their code](https://github.com/sneakers-the-rat/jekyll-scholar/commit/4a3bc1f9e2fff956ff585d2b8c14d2d825b5ca5b) to see if I can repurpose (or finish) their work and have what I want. Either way, after years of wrestling with other systems where I couldn't touch the code, a half day with something that let me just pull out the parts I wanted and build my own other pieces around it, and I have a working system I am happy with.

## Endnotes
[^1]: {% cite ModernLanguageAssociationofAmerica2021MLAHandbook --file EA_Language %}