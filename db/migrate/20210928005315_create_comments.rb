class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.references :article, null: false
      t.references :user, null: false
      t.text :content
      t.timestamps
    end
  end
end
