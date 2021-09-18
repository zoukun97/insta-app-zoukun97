class ArticlesController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]

  def index
    @articles = Article.all
  end

  def new
    @article = current_user.articles.build
  end

  def create
    @article = current_user.articles.build(article_params)
    if @article.save
      redirect_to articles_path(@article), notice: '投稿しました'
    else
      flash.now[:error] = '投稿に失敗しました'
      render :new
    end
  end

  private
  def article_params
    params.require(:article).permit(:content, images: [])
  end
end