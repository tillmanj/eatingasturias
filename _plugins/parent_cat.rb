# Liquid tag 'parentCat' used to provide the same functionality as the built-in page.dir filter does for posts
# fast Ruby version of this Liquid gist: https://gist.github.com/tillmanj/a07765da659d830285f42bee008b2336
# {% assign url = {{page.url}} | split: "/" | reverse | join: "/" | replace_first: "/", "|" | split: "|" | last | split: "/" | reverse | join: "/" | prepend: "/" | append: "/" %}

=begin
<internal:C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/core_ext/kernel_require.rb>:37:in `require': --> C:/Users/tillmanj/Documents/Obsidian/eatingasturias/_plugins/parent_cat.rb
Unmatched `|', missing `|' ?
  5  module Jekyll
> 6      module parentCat
> 7          {% assign url = {{page.url}} | split: "/" | reverse | join: "/" | replace_first: "/", "|" | split: "|" | last | split: "/" | reverse | join: "/" | prepend: "/" | append: "/" %}
> 8      end
  9  end

C:/Users/tillmanj/Documents/Obsidian/eatingasturias/_plugins/parent_cat.rb:6: class/module name must be CONSTANT (SyntaxError)
        {% assign url = {{page.url}} | split: "/"...
           ^~~~~~~~~
C:/Users/tillmanj/Documents/Obsidian/eatingasturias/_plugins/parent_cat.rb:7: syntax error, unexpected local variable or method, expecting =>
        {% assign url = {{page.url}} | split: "/" ...
                  ^~~
=end

module Jekyll
    module parentCat
        {% assign url = {{page.url}} | split: "/" | reverse | join: "/" | replace_first: "/", "|" | split: "|" | last | split: "/" | reverse | join: "/" | prepend: "/" | append: "/" %}
    end
end

Liquid::Template.register_filter(Jekyll::parentCat)