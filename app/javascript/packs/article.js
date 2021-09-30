import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

const handleHeartDisplay = (hasLiked) => {
  if (hasLiked) {
    $('.active-heart').removeClass('hidden')
  } else {
    $('.inactive-heart').removeClass('hidden')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const dataset = $('#article-index').data()
  const articleId = dataset.articleId
  axios.get(`articles/${articleId}/likes`)
    .then((response)=> {
      const hasLiked = response.data.hasLiked
      handleHeartDisplay(hasLiked)
    })

  $('.inactive-heart').on('click', (e) => {
    e.preventDefault();
    const id = $(e.currentTarget).attr('id')
    axios.post(`articles/${id}/likes`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $(`#${id}.active-heart`).removeClass('hidden')
          $(`#${id}.inactive-heart`).addClass('hidden')          
        }
      })
      .catch((e) => {
        window.alert('error')
        console.log(e)
      })
  })
  $('.active-heart').on('click', (e) => {
    e.preventDefault();
    const id = $(e.currentTarget).attr('id')
    axios.delete(`articles/${id}/likes`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $(`#${id}.active-heart`).addClass('hidden')
          $(`#${id}.inactive-heart`).removeClass('hidden')          
        }
      })
      .catch((e) => {
        window.alert('error')
        console.log(e)
      })
  })
})