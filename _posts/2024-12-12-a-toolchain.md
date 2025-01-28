---
layout: single
title: A Toolchain
subtitle: How I work now
date: 2024-12-12 7:30:06 +0100
show_date: yes
categories: news
tags: []
read_time: true
comments: true
share: false
related: false
toc: true
---
Previously I wrote a bit about how I have jettisoned nearly all of the tools and software used to host, and assemble, and present this website, and I have replaced all of it with the shortest, simplest toolchain I can. I thought it might be interesting to go into a bit more detail about what that toolchain looks like.

First things first; I have some baseline requirements for the tools I use to build this site. They are:

- **Linux Native** - *(with bonus points for having a Windows version)* I am working hard to have only Linux (and BSD) systems in my life by the end of 2025, so making sure every piece of software I use is Linux-native is non-negotiable at this point.
- **Open Source** - Proprietary software is a business model. Open source software is decidedly **not** a business model. Proprietary software is a tool that you rent. Open source software is a tool that you own. I prefer to own my tools.
- **Not Software as a Service (SaaS)** - Software as a Service takes the business model of proprietary rental software and turns it into a subscription service. I am not interested in renting my tools, I want to own them. Also, I trust myslf to keep my data private more than I trust some random company.[^1]
- **Privacy-focused** - One of the major problems with SaaS is the privacy implications. A single computer, sitting on the end of a residential fiber connection, is a much more secure place to keep my data than a server farm in the cloud. I am not a target for hackers, but I am a target for data miners. By concentrating user data in one location, SaaS companies make it more appealing target.

## File Formats
The most important thing, in my opinion, is to make sure that I am never beholden to some particular software company or web service to keep my work. I want to be able to take my work with me wherever I go, and I want to be able to use it in any software I choose. To that end, I have chosen to use the most open, most widely supported file formats I can find.

### Markdown
I write my pages in [Markdown](https://daringfireball.net/projects/markdown/) - the simplest, lightest, most open markup language for plain documents I could find. It didn't hurt that I was already maintaining a huge pile of notes on the rest of my life in it! 

### HTML
I use [HTML](https://html.spec.whatwg.org/), and only HTML, to describe the structure of the pages that you see here. I am a proud member of noJS.club. There is too much focus on presentation, and not enough on quality content and fast loading times on the web today. 

### CSS/Sass
I use [Sass](https://sass-lang.com/) to maintain some CSS style sheets that describe how it should look to you the reader. I really like Sass because it provides features that don’t exist in CSS yet like nesting, mixins, inheritance, and other nifty goodies that help you write robust, maintainable CSS.

### BibTeX
BibTeX allows the user to store their citation data in generic form, while printing citations in a document in the form specified by a BibTeX style, to be specified in the document itself. BibTeX formatted text files are how information is communicated between Zotero and both Obsidian and Jekyll.

## Zotero
I use [Zotero](https://www.zotero.org/) as my reference manager, eBook repository, and note-taking app. Not only is it free and Open-Source, and part of the [Joint Roadmap for Open Science Tools](https://jrost.org/), it has a healthy plugin ecosystem and is **not** web-based. In this era of SaaS rug pulls and mafia shakedown pricing, having control over your own tools is as important as having control over your own data. 

The bibliography for this site is [available online](https://www.zotero.org/groups/2459245/eating_asturias/library) through Zotero as well. I publish all of the work I have done to make the website work on [GitHub](https://github.com/tillmanj/eatingasturias) for anyone who might be interested in seeing behind the scenes.

## Logseq
[Logseq](https://logseq.com/) is a markdown powered outliner tool, and the one that I use to maintain **The Outline**; the master document that I use to structure the notes and ideas that eventually become the articles on this website. 

Prior to Logseq I used the excellent [TreeLine](https://treeline.bellz.org/) by Doug Bell.

## Obsidian
I use a couple of editors to do the writing. I keep most of my notes in the [Obsidian.md](https://obsidian.md/) markdown editor, and quite a bit of the actual article writing for the site is done in that software.  Both Obsidian and Jekyll are connected to my [Zotero](https://www.zotero.org/) database and allow me to insert citations, reference documents, and build bibliographies directly from the writing interface.

MY only real concern with Obsidian is that it is not Open-Source. I would prefer to use Open-Source tools wherever possible, and I have been spending some time with Logseq as a possible replacement. My goal is to have found or built the plugins for it that I need to replace Obsidian by the end of the year.

## VSCodium
I also use [VSCodium](https://vscodium.com/) the free and open source version of Microsoft's VS Code editor for managing the templates and Jekyll scripts that build the markdown files into HTML.

## Jekyll
I use the static site generator [Jekyll](https://jekyllrb.com/) written in the [Ruby](https://www.ruby-lang.org/en/) programming language to turn those Markdown and Sass files into [HTML](https://html.spec.whatwg.org/) and [CSS](https://www.w3.org/TR/css-2023/) files that are understood by all web browsers and require no scripting languages, databases, presentation layers, or web apps to read and enjoy.

## Notes 
[^1]: Richard Stallman was pointing out the dangers to SaaS back in 2010, long before most people were even interacting with it on a regular basis. See his article [What Does That Server Really Serve?](https://www.bostonreview.net/articles/what-does-that-server-really-serve/) published on March 18, 2010 in [Boston Review](https://www.bostonreview.net/)