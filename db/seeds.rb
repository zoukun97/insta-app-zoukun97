# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

taka = User.create!(email: 'taka@example.com', password: 'password', account: 'taka')
robin = User.create!(email: 'robin@example.com', password: 'password', account: 'robin')

5.times do
  taka.articles.create!(
    image: 'default.png',
    content: Faker::Lorem.sentence(word_count: 100)
  )
end

5.times do
  robin.articles.create!(
    image: 'default.png',
    content: Faker::Lorem.sentence(word_count: 100)
  )
end