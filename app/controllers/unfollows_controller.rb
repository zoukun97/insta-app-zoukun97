class UnfollowsController < ApplicationController
  before_action :authenticate_user!

  def create
    current_user.unfollow!(params[:account_id])
    user = User.find(params[:account_id])
    follower = user.follower_count
    
    render json: { status: 'ok', follower: follower }
  end
end