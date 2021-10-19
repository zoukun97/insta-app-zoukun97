class CommentMailer < ApplicationMailer
  def new_comment(user, commenter)
    @user = user
    @commenter = commenter
    mail to: user.email, subject: '【お知らせ】コメントされました'
  end
end