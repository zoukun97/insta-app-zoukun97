import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

const handleFollowDisplay = (hasFollowed) => {
  if (hasFollowed) {
    $('.unfollow').removeClass('hidden')
  } else {
    $('.follow').removeClass('hidden')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const dataset = $('#accounts-show').data()
  const accountId = dataset.id
  axios.get(`/accounts/${accountId}.json`)
    .then((response) => {
      const hasFollowed = response.data.hasFollowed
      handleFollowDisplay(hasFollowed)
    })
})