---
term: 
  connotation: 
  definition: 
  domain: sidra
  subdomain: 
  topic: 

layout: page
title: Test Scratch Pad
subtitle: you shouldn't be here
permalink: /test/
recipeIngredients:
  - step one
  - title: step two
    steps:
    - 1 whole chicken, cleaned
    - 2 bay leaf
    - 2 whole onion
    - 3 cloves garlic
    - 2 ribs celery
    - 1 tbsp pimentón
    - 1 tbsp cumin
    - 10 whole peppercorns
  - title: step three
    steps:
    - Meat from one chicken
    - 320g short grain rice
    - 150g baby carrot, frozen
    - 150g corn, frozen
    - 150g green beans or peas, frozen
  - step four
recipeInstructions:
  - Combine all the broth ingredients in your slow cooker, and fill with water to just cover the chicken (about 2 quarts).
  - Set the slow cooker to low and let cook overnight.
  - In the morning, turn off the slow cooker and remove the chicken to a strainer set over a bowl. Let cool.
  - Once chicken is cool enough to handle;  remove meat from bones.
  - Discard bones and skin; save meat for the stew.
  - Strain broth, discarding vegetables and seasonings.
  - Refrigerate for 8 hours or overnight.
  - Skim fat from surface.
---

{% if page.recipeIngredients %}
  <h2>Ingredients</h2>
  <ul class="ingredients">
  {% for ingredient in page.recipeIngredients %}
    <li>
      {% if ingredient.title %}
        {{ingredient.title}}
          <ul>
          {% for step in ingredient.steps %}
            <li>{{step}}</li>
          {% endfor%}
          </ul>
      {% else %}
        {{ingredient}}
      {% endif %}
    </li>
  {% endfor %}
  </ul>
{% endif  %}