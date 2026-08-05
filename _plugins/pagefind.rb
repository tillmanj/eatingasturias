# a Jekyll plugin to automatically run Pagefind search indexer after compile.
# will not run if jekyll.environment is set to "dev" or "development".
# adapted from https://www.bfoliver.com/2025/pagefind

module Jekyll
  class PostCompileCommand < Jekyll::Generator
    safe true
    priority :lowest

    def generate(site)
      # puts "ENVIRONMENT FOR PAGEFIND: #{site.config['environment']}"
      unless site.config['environment'].include?("dev")
        Jekyll::Hooks.register :site, :post_write do |_site|
          command = './_bin/pagefind --site _site'
          puts "Running: #{command}"
          system(command)
        end
      end
    end
  end
end