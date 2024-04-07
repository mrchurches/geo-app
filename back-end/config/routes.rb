Rails.application.routes.draw do
  resources :features, only: %i[index show new create edit update destroy]
  resources :comments, only: %i[index show new create edit update destroy]

  root "features#index"
  get "features/:id" => "features#show"
  post "features/:id/comments" => "comments#create"

end
