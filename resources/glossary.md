---
layout: single
title: Eating Asturias Glossary
permalink: /resources/glossary/
sidebar:
  - nav: docs
toc: true
toc_sticky: true
---
{% for glossary in site.data.glossary %}
{{glossary.term}}
: {{glossary.definition}} {% if glossary.url %}<a href="{{glossary.url}}">read more...</a>{% endif %}
{% endfor %}