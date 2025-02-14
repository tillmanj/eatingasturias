---
layout: page
permalink: /mathtest/
myINT: 15
myFLOAT: 15.0
---
It seems that there is something broken in how Jekyll 4.4.1 handles YAML integers. Take for example the two frontmatter variables on this page: `myINT` and `myFLOAT`

## Basic Output
myINT: {{page.myINT}}

myFLOAT: {{page.myFLOAT}}

Let's step through each step of my chain of operations and see where it shits the bed. Ultimately, what I want to work is something like:
{% raw %}<pre>
{{page.myINT | divided_by: 65 | times: 100 | round}}
</pre>{% endraw %}

## Division

Attempting to divide each variable results in:

{% raw %}<pre>
{{page.myINT | divided_by: 65 }}
</pre>{% endraw %}

Expected Result: 0.2307

Actual Result: {{page.myINT | divided_by: 65 }}

{% raw %}<pre>
{{page.myFLOAT | divided_by: 65 }}
</pre>{% endraw %}

Expected Result: 0.2307

Actual Result: {{page.myFLOAT | divided_by: 65.0 }}