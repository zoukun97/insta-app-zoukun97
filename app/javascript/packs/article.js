import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

document.addEventListener('DOMContentLoaded', () => {
  $('.inactive-heart').each(function (index, element) {
    // テンプレートで記述したカスタムデータを取得
    const dataset = $(element).data()
    // カスタムデータからチームIDを取得
    const articleId = dataset.articleId
    // カスタムデータを入れてGETリクエストを送る
    axios.get(`articles/${articleId}/likes`)
      // リクエストを送ったらレスポンスが返ってくる
      .then((response) => {
        // responseでrenderされたlikeの状態を取得(true or false)
        const hasLiked = response.data.hasLiked
        // falseであればいいねされていない => 白い星を表示するために、'hidden'を取り外す
        if ( hasLiked === false ) {
          $(element).removeClass('hidden')
        } 
      })
  })

  $('.active-heart').each(function (index, element) {
    const dataset = $(element).data()
    const articleId = dataset.articleId
    axios.get(`articles/${articleId}/likes`)
      .then((response) => {
        const hasLiked = response.data.hasLiked
        if ( hasLiked === true ) {
          $(element).removeClass('hidden')
        } 
      })
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