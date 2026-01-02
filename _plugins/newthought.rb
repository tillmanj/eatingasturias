## Newthought tag will render anything in the tag with small caps
## Usage {% newthought Your text string here} will render a span
## YOUR TEXT STRING HERE (sort of, you know, small caps) if you are using the tufte.css file

module Jekyll
  class RenderNewThoughtTag < Liquid::Tag
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

      thought = Kramdown::Document.new(@text[0],{remove_span_html_tags:true}).to_html # render markdown in newthought 
      thought = converter.convert(thought).gsub(/<\/?p[^>]*>/, "").chomp # remove <p> tags from render output

      "<span class='newthought'>#{thought}</span>"
    end
  end
end
  
Liquid::Template.register_tag('newthought', Jekyll::RenderNewThoughtTag)