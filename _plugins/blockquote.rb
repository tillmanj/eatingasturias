## Liquid tag 'blockquote' used to add a blockquote to text that is visually distinct from epigraphs
## in the main text area of the layout (with optional marginalia)
## Usage {% blockquote 'unique-id-for-blockquote' 'text-body-of-quote' 'author-of-quote' 'citation-of-quote' 'marginalia' %}
#
module Jekyll
  class RenderBlockquoteTag < Liquid::Tag
    require "shellwords"
    require "stringio"
    require "kramdown"

    def initialize(tag_name, text, tokens)
      super
      @text = text.shellsplit
    end
    
    def render(context)
      # Gather settings
      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

      baseurl = context.registers[:site].config['baseurl']
      quote = Kramdown::Document.new(@text[1],{remove_span_html_tags:false}).to_html # render markdown in caption
      quote = converter.convert(quote).gsub(/<\/?p[^>]*>/, "").chomp # remove <p> tags from render output
      author = Kramdown::Document.new(@text[2],{remove_span_html_tags:true}).to_html # render markdown in source
      author = converter.convert(author).gsub(/<\/?p[^>]*>/, "").chomp # remove <p> tags from render output
      if author.length > 0
        author = author + ", "
      end
      source = Kramdown::Document.new(@text[3],{remove_span_html_tags:true}).to_html # render markdown in source
      source = converter.convert(source).gsub(/<\/?p[^>]*>/, "").chomp # remove <p> tags from render output
      marginalia = Kramdown::Document.new(@text[4],{remove_span_html_tags:true}).to_html # render markdown in source
      marginalia = converter.convert(marginalia).gsub(/<\/?p[^>]*>/, "").chomp # remove <p> tags from render output
        "<div class='blockquote'><blockquote id='#{@text[0]}'><span class='marginnote'>#{marginalia} </span><p>#{quote}</p>"+
        ""+
        "<footer>#{author}"+"<cite>#{source}</cite></footer></blockquote></div>"
    end
  end
end

Liquid::Template.register_tag('blockquote', Jekyll::RenderBlockquoteTag)
