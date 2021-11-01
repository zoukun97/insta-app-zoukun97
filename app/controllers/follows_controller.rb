class FollowsController < ApplicationController
  before_action :authenticate_user!

  def create
    current_user.follow!(params[:account_id])
    user = User.find(params[:account_id])
    follower = user.follower_count
    
    render json: { status: 'ok', follower: follower }
  end
end