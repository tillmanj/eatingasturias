---
layout: page
title: Eating Asturias Glossary
permalink: /resources/glossary/
toc: false
toc_sticky: true
---
{% for glossary in site.data.glossary %}
<dfn id="def-{{glossary.term}}">{{glossary.term}}</dfn>
: {{glossary.definition}} {% if glossary.url %}<a href="{{glossary.url}}">read more...</a>{% endif %}
{% endfor %}