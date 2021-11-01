class FollowersController < ApplicationController
  before_action :authenticate_user!

  def index
    user = User.find(params[:account_id])
    @users = user.followers
  end
end