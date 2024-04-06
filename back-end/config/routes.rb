Rails.application.routes.draw do
  resources :features, only: %i[index show new create edit update destroy]
  resources :comments, only: %i[index show new create edit update destroy]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  # i need a route to show show all data of the features in json, beacause this is an api
  root "features#index"
  post "features/:id/comments" => "comments#create"
  # get "features" => "features#index", as: :features
  # get "features/:id" => "features#show", as: :feature
  # get "features/new" => "features#new", as: :new_feature
  # post "features" => "features#create"
  # get "features/:id/edit" => "features#edit", as: :edit_feature
  # patch "features/:id" => "features#update"
  # delete "features/:id" => "features#destroy"

end
