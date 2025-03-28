---
layout: page
title: Eating Asturias Glossary
permalink: /resources/glossary/
toc: false
toc_sticky: true
---
{% epigraph 'Dictionaries are always fun, but not always reassuring.' 'M.F.K. Fisher' 'The Art of Eating, 2014' %}

{% for glossary in site.data.glossary %}
<dfn id="def-{{glossary.term}}">{{glossary.term}}</dfn>
: {{glossary.definition}} {% if glossary.url %}<a href="{{glossary.url}}">read more...</a>{% endif %}
{% endfor %}