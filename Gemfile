source "https://rubygems.org"
# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#     bundle exec jekyll s --config _config.yml,_config_dev.yml --watch --unpublished --incremental --livereload
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "~> 4.4.1"

gem "minimal-mistakes-jekyll"

# Non-jekyll specific gems we need to manage
group :ruby_gems do
  gem 'activesupport'
  gem 'indieweb-endpoints'
  gem 'jsonpath'
  gem 'link-header-parser'
  gem 'microformats'
  gem 'octokit'
  gem 'openssl'
  gem 'terminal-table'
  gem 'unicode-display_width'
  gem 'webmention'
end

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-admin"
  gem "jekyll-analytics"
  gem "jekyll-archives"
  gem "jekyll-darkvisitors"
  gem "jekyll-environment-variables"
  gem "jekyll-feed"
  gem 'jekyll-glossary_tooltip'
  gem 'jekyll-image-size'
  gem "jekyll-include-cache"  
  gem "jekyll-last-modified-at"
  gem "jekyll-leaflet"
  gem 'jekyll-link-attributes'
  gem 'jekyll-loading-lazy'
  gem 'jekyll-redirect-from'
  gem 'jekyll-scholar'
  gem 'jekyll-sitemap'
  gem 'jekyll-webmention_io'
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
