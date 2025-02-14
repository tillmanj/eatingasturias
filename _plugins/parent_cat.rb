# Liquid tag 'parentCat' used to provide the same functionality as the built-in page.dir filter does for posts
# fast Ruby version of this Liquid gist: https://gist.github.com/tillmanj/a07765da659d830285f42bee008b2336
# {% assign url = {{page.url}} | split: "/" | reverse | join: "/" | replace_first: "/", "|" | split: "|" | last | split: "/" | reverse | join: "/" | prepend: "/" | append: "/" %}

module Jekyll
    module parentCat
        {% assign url = {{page.url}} | split: "/" | reverse | join: "/" | replace_first: "/", "|" | split: "|" | last | split: "/" | reverse | join: "/" | prepend: "/" | append: "/" %}
    end
end

Liquid::Template.register_filter(Jekyll::parentCat)