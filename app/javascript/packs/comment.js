import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

const appendComment = (comment) => {
  $('.comments-container').append(
    `<div class="comment">
      <div class="comment_user"></div>
      <div class="comment_user_name"><p>${comment.user.account}</p></div>
    </div>
    <div class="comment_content"><p>${comment.content}</p></div>`
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const dataset = $('#comment-index').data()
  const articleId = dataset.articleId

  axios.get(`/articles/${articleId}`)
    .then((response) => {
      const comments = response.data
      comments.forEach((comment) => {
        appendComment(comment)
      })
    })
})
