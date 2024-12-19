---
layout: single
title:  "Where Have You Been?"
subtitle: why there have been so few updates in 2024
date:   2024-12-10 17:30:06 +0100
categories: news
read_time: true
comments: true
share: false
related: false
toc: false
---
 
So what's the deal, you're asking. Why did the site suddenly stop getting updates early in 2024? Do you even update anymore? Did you loose interest?

Well, you see, I started this website with a vision. A vision of a complete guide to not just the recipes that make up Asturian cuisine, but the ingredients that are grown locally that go into those recipes, the people who maintain those gardens and farms and orchards, the people (mostly women) who cook that food in restaurants and sidrerías and cafeterias throughout the territory, the books they write aout their recipes and their lives, their forebears who emigrated to the Americas and (sometimes) came back with new recipes and techniques to incorporate into their gastronomy.

## To Renovate Your House, First Rent A Bulldozer
And it turns out that making that kind of website, one that does three things at once; that tells you how to cook the foods, and what kind of culture creates and supports those recipes, and where to find it when you are actually in the territory - making that kind of website is **hard**. Over the last several years of working on this website, I have learned that it is particularly hard to do so with other peoples tools. Unfortunately, I had to go through a couple rounds of using other peoples tools before I truly learned that lesson.

But early in 2024, after having built the site three time using other peoples software each time, after thinking that I could get this tool or that tool to do the things I wanted the site to do for me, I finally realized that if I wanted the site to do the things I wanted it to do - not just approximate them, but actually do them - then I was going to have to build the thing from scratch, or very close to it.

So that is what I have done. Over the last nine months or so, I have bulldozed the existing site to the ground and built a new one in its place. It has been a mammoth project, and one I am not eager to undertake again, but it has yielded exactly the results I was looking for.

## How I Work Now
I have jettisoned nearly all of the tools and software used to host, and assemble, and present this website, and I have replaced all of it with the shortest, simplest toolchain I can. There are no databases, no presentation layers, no theme engines, no load-balancing clusters, no CDNs, no layered caching systems. There is just this: plain html files and pictures in modern image formats served by a nice fast webserver. I write my pages in [Markdown](https://daringfireball.net/projects/markdown/) - the simplest, lightest, openest markup language for plain documents I could find. It didn't hurt that I was already maintaining a huge pile of notes on the rest of my life in it! I use [Sass](https://sass-lang.com/) to maintain some style sheets that describe how it should look to you the reader. I use a collection of simple open source scripts called [Jekyll](https://jekyllrb.com/) written in the [Ruby](https://www.ruby-lang.org/en/) programmig language to turn those Markdown and Sass files into [HTML](https://html.spec.whatwg.org/) and [CSS](https://www.w3.org/TR/css-2023/) files that are understood by all web browsers and require no scripting languages, databases, presentation layers, or web apps to read and enjoy.

I use a couple of editors to do the writing. I keep most of my notes in the [Obsidian.md](https://obsidian.md/) markdown editor, and quite a bit of the actual article writing for the site is done in that software. I also use [VSCodium](https://vscodium.com/) the free and open source version of Microsoft's VS Code editor for managing the templates and Jekyll scripts that build the markdown files into HTML. Both Obsidian and Jekyll are connected to my [Zotero](https://www.zotero.org/) database and allow me to insert citations, reference documents, and build bibliographies directly from the writing interface. The bibliography for this site is [available online](https://www.zotero.org/groups/2459245/eating_asturias/library) through Zotero as well. I publish all of the work I have done to make the website work on [GitHub](https://github.com/tillmanj/eatingasturias) for anyone who might be interested in seeing behind the scenes.

## Where Do I Go From Here?
Back to work is where I go. Back to writing about cider, and cheese, and sausage makers, and goat herders, and the army of female chefs all those efforts go towards keeping supplied in all their glorious temples to *la comida popular*, the people's food that makes Asturias worth talking about, visiting, living in, and celebrating.

I have ambitious plans for Eating Asturias in 2025, and now that I have a platform in place where I won't spend so much time working on the software, I can concentrate on working on what I love - the stories and photographs that preserve the way of living and eating that is unique to Asturias.