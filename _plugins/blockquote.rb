## Liquid tag 'blockquote' used to add a blockquote to text that is visually distinct from epigraphs
## in the main text area of the layout
## Usage {% blockquote 'text-body-of-quote' 'author-of-quote' 'citation-of-quote' %}
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
        quote = Kramdown::Document.new(@text[0],{remove_span_html_tags:true}).to_html # render markdown in caption
        quote = converter.convert(quote).gsub(/<\/?p[^>]*>/, "").chomp # remove <p> tags from render output
        source = Kramdown::Document.new(@text[2],{remove_span_html_tags:true}).to_html # render markdown in source
        source = converter.convert(source).gsub(/<\/?p[^>]*>/, "").chomp # remove <p> tags from render output
          "<div class='blockquote'><blockquote><p>#{quote}</p>"+
          "<footer>#{@text[1]}, "+"<cite>#{source}</cite></footer></blockquote></div>"
      end
    end
  end
  
  Liquid::Template.register_tag('blockquote', Jekyll::RenderBlockquoteTag)
  