class TimelinesController < ApplicationController
  before_action :authenticate_user!

  def show
    user_ids = current_user.followings.pluck(:id)
    from = Time.now - 24.hours
    to = Time.now
    @articles = Article.where(user_id: [*user_ids, current_user.id], created_at: from..to).left_joins(:likes).group(:id).order('COUNT(likes.id) DESC',created_at: :desc).limit(5)
    # created_at: 24.hours.ago..Time.now
    # @articles = Article.joins(:likes).where(user_id: [*user_ids, current_user.id], created_at: from..to, likes: {article_id: 31}).order(created_at: :desc)
    # @articles = Article.joins(:likes).where(created_at: 12.hours.ago..).order(created_at: :desc)
    # @articles = Article.joins(:likes).where(created_at:from..to).where(Like.group(:article_id).order('count(article_id) desc').limit(5).pluck(:article_id))
    # @articles = Article.where(created_at: from..to)
    # @articles = Article.find(Like.group(:article_id).order('count(article_id) desc').limit(5).pluck(:article_id)) && Article.where(created_at: from..to)
  end
end