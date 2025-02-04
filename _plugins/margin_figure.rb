## Liquid tag 'marginfigure' used to add image data that fits 
## in the right margin column area of the layout
## Usage {% marginfigure 'margin-id-whatever' 'path/to/image' 'This is the caption' %}
#
module Jekyll
    class RenderMarginFigureTag < Liquid::Tag
  
        require "shellwords"
  
      def initialize(tag_name, text, tokens)
        super
        @text = text.shellsplit
      end
  
      def render(context)
        # Gather settings
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
        
        baseurl = context.registers[:site].config['baseurl']
        pageTitle = context.registers[:page]['title']
        label = Kramdown::Document.new(@text[2],{remove_span_html_tags:false}).to_html # render markdown in caption
        label = converter.convert(label).gsub(/<\/?p[^>]*>/, "").chomp # remove <p> tags from render output
        
        if @text[1].start_with?('http://', 'https://', '//')
          "<label for='#{@text[0]}' class='margin-toggle'>&#8853;</label>"+
          "<input type='checkbox' id='#{@text[0]}' class='margin-toggle'/>"+
          "<span class='marginnote'><a href='#{@text[1]}' data-lightbox='#{pageTitle}' data-alt='#{label}' data-title='#{label}' title='#{label}'><img class='fullwidth' src='#{label}'/></a><br>#{@text[2]}</span>"
        else
          "<label for='#{@text[0]}' class='margin-toggle'>&#8853;</label>"+
          "<input type='checkbox' id='#{@text[0]}' class='margin-toggle'/>"+
          "<span class='marginnote'><a href='#{baseurl}/#{@text[1]}' data-lightbox='#{pageTitle}' data-alt='#{label}' data-title='#{label}' title='#{label}'><img class='fullwidth' src='#{baseurl}/#{@text[1]}'/></a><br>#{label}</span>"
        end
      end
    end
  end
  
  Liquid::Template.register_tag('marginfigure', Jekyll::RenderMarginFigureTag)