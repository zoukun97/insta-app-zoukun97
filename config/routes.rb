Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?

  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'profiles#show'
  resource :profile, only: [:show, :edit, :update]
  resources :articles do
    resources :comments, only: [:index, :new, :create]
    resource :likes, only: [:create, :destroy, :show]
  end
end
