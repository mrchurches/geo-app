require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module BackEnd
  class Application < Rails::Application
    config.load_defaults 7.1
    config.autoload_lib(ignore: %w(assets tasks))
    credentials = Rails.application.credentials
    secret_key_base = credentials.production[:secret_key_base]
    config.secret_key_base = secret_key_base
    config.api_only = true
  end
end
