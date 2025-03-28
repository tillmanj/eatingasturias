---
layout: single
title: Semantic Markup
subtitle: decoupling content and presentation
date: 2024-12-21 7:30:06 +0100
show_date: yes
categories: news
tags: []
read_time: true
comments: true
share: false
related: false
toc: true
---
One of the most important aspects of the new design is the use of semantic markup.[^1] This is a way of marking up the content of the website so that it is clear what each part of the content is. This is important for a number of reasons:

  - It makes the content more accessible to people who use screen readers, translation tools, or other assistive technologies
  - It makes the content more accessible to search engines, which can use the markup to understand the content of the page
  - It makes the content more maintainable, as the markup can be used to define the structure of the content, rather than relying on the presentation to do so
  - It makes the content more portable, as the markup can be used to define the structure of the content, rather than relying on the presentation to do so

## Core Concept
The core concept of Semantic Markup is to completely sever the ties between the content layer (the HTML) and the presentation layer (the CSS). This is a powerful concept, as it allows for the content to be presented in a variety of ways, depending on the needs of the user. Most importantly, it does not require the publisher (me in this instance) to anticipate what users might view my site, or what technologies they might need or want in order to best make use of the content.

## Assistive Technology
Assistive technology (AT) such as screen readers use headings and landmarks as signposts to navigate content. HTML documents are very difficult for AT users to use without headings. This is why using heading correctly, and not as decorative elements, is essential for good design. The addition of [Accessible Rich Internet Applications (ARIA)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) roles and properties can also help AT users navigate a page, and are a core concept in Semantic Markup.

## Search Engines
Good document structure makes all machine-parsing of a document easier, and this is vital for search engines. The better a search engine can understand the content of a page, the better it can serve that content to users. I hesitate to say that this is the most important reason for using semantic markup, but it is certainly the most obvious. Technical SEO; marking up the relative structure of a website so that it is obvious to web crawlers where the menus, main content, navigation lists, footers, legal notices, and other parts of the website are, is a vital part of modern web design.

## Maintenance & Portability
From the point of view of an amateur developer and designer, the impact of using semantic elements over non-semantic ones is profound. The readability and maintenance of the code is vastly improved, and it is much easier to design a publishing system (like mine) where each major semantic portion of the site is a separate file, and can be included in other pages as needed. This is a huge advantage when it comes to maintaining a large website, as it allows for the easy reuse of code, and the easy updating of code.

## Notes
[^1]: for an excellent primer on what exactly Semantic Markup is, see Jon Penland’s *[What On Earth Is Semantic Markup?](https://html.com/semantic-markup/)* at html.com