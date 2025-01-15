module Jekyll
  class RenderSideNoteTag < Liquid::Tag

    require "shellwords"
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
      label = Kramdown::Document.new(@text[1],{remove_span_html_tags:false}).to_html # render markdown in caption
      label = converter.convert(label).gsub(/<\/?p[^>]*>/, "").chomp # remove <p> tags from render output
      
      "<label for='#{@text[0]}' class='margin-toggle sidenote-number'></label><input type='checkbox' id='#{@text[0]}' class='margin-toggle'/><span class='sidenote'>#{label} </span>"
    end
  end
end

Liquid::Template.register_tag('sidenote', Jekyll::RenderSideNoteTag)

