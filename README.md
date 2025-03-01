# Eating Asturias
*Jekyll files for building the Eating Asturias public site*:

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/tillmanj/eatingasturias?authorFilter=tillmanj) ![GitHub top language](https://img.shields.io/github/languages/top/tillmanj/eatingasturias) ![GitHub License](https://img.shields.io/github/license/tillmanj/eatingasturias) ![Mozilla HTTP Observatory Grade](https://img.shields.io/mozilla-observatory/grade/eatingasturias.com) ![GitHub Sponsors](https://img.shields.io/github/sponsors/tillmanj) ![GitHub Issues or Pull Requests by label](https://img.shields.io/github/issues/tillmanj/eatingasturias/bug)

[Eating Asturias](https://eatingasturias.com) is a website about food and food culture in the Asturias region of Spain. It is generated from [Markdown](https://daringfireball.net/projects/markdown/) files by the [Jekyll](https://jekyllrb.com/) static site generator (SSG).
## Installation
To install the site:
1. Install Jekyll into a directory named *eatingasturias*
2. Install Nokogiri 1.13.10 using [standard system libraries](https://nokogiri.org/tutorials/installing_nokogiri.html#installing-using-standard-system-libraries)
```
ridk exec pacman -S mingw-w64-ucrt-x86_64-libxslt
gem install nokogiri --version 1.13.10 --platform=ruby -- --use-system-libraries
```
## Credits
### Jekyll Plugins & Extensions
The following Jekyll plugins are used on the site:
- [Jekyll Analytics](https://github.com/hendrikschneider/jekyll-analytics) - web analytics bridge to Matomo
- [Jekyll Feed](https://github.com/jekyll/jekyll-feed) has been replaced with my version [tillmanj/jekyll-feed](https://github.com/tillmanj/jekyll-feed).
- [Jekyll Glossary Tooltip](https://github.com/erikw/jekyll-glossary_tooltip) - provides a liquid tag that will show a tooltip of a term definition.
- [Jekyll Include Cache](https://github.com/benbalter/jekyll-include-cache) - _A Jekyll plugin to cache the rendering of Liquid includes_
- [Jekyll Last Modified At](https://github.com/gjtorikian/jekyll-last-modified-at)
- [Jekyll Link Attributes](https://github.com/twinsunllc/jekyll-link-attributes) - adds `rel` and `target` attributes to all external links in your Jekyll site.
- [Jekyll Loading Lazy](https://github.com/gildesmarais/jekyll-loading-lazy) - lazy load images without javascript
- [Ruby microformats](https://github.com/microformats/microformats-ruby) - extended support for microformats
- [Jekyll Scholar](https://github.com/inukshuk/jekyll-scholar) - bibliography and footnote management
- [Jekyll Sitemap](https://github.com/jekyll/jekyll-sitemap) - silently generate a sitemaps.org compliant sitemap for your Jekyll site
- [Jekyll Webmentions.io](https://github.com/aarongustafson/jekyll-webmention_io) - renders Webmentions via Webmention.io
- [Jekyll Wikirefs](https://github.com/wikibonsai/jekyll-wikirefs) - allows parsing wikiref style links into proper links

### UX & Interface
Eating Asturias uses a custom built Jekyll theme based on [Minimal Mistakes](https://mmistakes.github.io).
The following resources are used to assemble the site:
- [ET_Bembo](https://github.com/DavidBarts/ET_Bembo) font stack from David Barts.
## License
this project is licensed under the terms of the [GPL 3.0 License](https://www.gnu.org/licenses/gpl-3.0.en.html). See [LICENSE](https://github.com/tillmanj/eatingasturias/blob/main/LICENSE) for a complete copy of the license.