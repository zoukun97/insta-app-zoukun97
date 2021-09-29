class CommentsController < ApplicationController
  def new
    article = Article.find(params[:article_id])
    @comment = article.comments.build
  end

  def create
    article = Article.find(params[:article_id])
    @comment = article.comments.build(comment_params)
    if @comment.save
      redirect_to article_comments_path(article), notice: 'コメントしました'
    else
      flash.now[:error] = 'コメントできませんでした'
      render :new
    end
  end

  def index
    id = params[:article_id]
    @comments = Comment.where(article_id: id)
  end

  private
  def comment_params
      params.require(:comment).permit(:content, :article_id, :user_id).merge(user_id: current_user.id, article_id: params[:article_id])
  end
end