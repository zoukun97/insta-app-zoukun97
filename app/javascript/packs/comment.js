import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

const appendComment = (comment) => {
  $('.comments-container').append(
    `<div class="comment">
      <div class="comment_user"><img src="${comment.user.avatar_comment_image}"></div>
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

  $('.comment-form').on('click', () => {
    $('.comment-form').addClass('hidden')
    $('.comment-text-area').removeClass('hidden')
  })

  $('.add-comment-btn').on('click', () => {
    const content = $('#comment_content').val()
    if (!content) {
      window.alert('コメントを入力してください')
    } else {
      axios.post(`/articles/${articleId}/comments`, {
        comment: {content: content}
      })
        .then((res) => {
          const comment = res.data
          appendComment(comment)
          $('#comment_content').val('')
        })
    }
  })
})
