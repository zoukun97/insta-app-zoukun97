import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

window.addEventListener('load', () => {
  const uploader = document.querySelector('.uploader');
  if (!uploader){ return false;}
  uploader.addEventListener('change', (e) => {
    const file = uploader.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = reader.result;
      document.querySelector('.avatar').setAttribute('src', image);
    }
  });
});