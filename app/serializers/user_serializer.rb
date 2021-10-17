class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,  :account, :avatar_comment_image

  def avatar_comment_image
    rails_blob_path(object.avatar_image) if object.avatar_image.attached?
  end
end