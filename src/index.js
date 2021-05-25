import './styles.css'
import './partials/photocard.hbs'
import { fetchPictures } from './js/apiService.js'
import galleryList from './partials/galleryList.hbs'
var debounce = require('lodash.debounce')

const refs = {
  searchInput: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery-list'),
  loadMoreBtn: document.querySelector('.loadMoreBtn'),
}

refs.searchInput.addEventListener('submit', onSearchInputChange)
refs.loadMoreBtn.addEventListener('click', loadMorePictures)

let pageNumber = 1
let searchQuery = ''

function clearContainer() {
  refs.galleryContainer.innerHTML = ''
  refs.loadMoreBtn.classList.add('hidden')
}

function onSearchInputChange(e) {
  e.preventDefault()
  searchQuery = e.currentTarget.elements.query.value
  if (searchQuery === '') {
    clearContainer()
    return
  }
  clearContainer()
  renderPictures()
  refs.loadMoreBtn.classList.remove('hidden')
  console.log(searchQuery)
}

function loadMorePictures() {
  renderPictures()
}

function renderPictures() {
  fetchPictures(searchQuery, pageNumber)
    .then((picture) => {
      pageNumber += 1
      const galleryMarkup = galleryList(picture)
      refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup)
      if (pageNumber >= 3) {
        refs.galleryContainer.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        })
      }
    })
    .catch((error) => console.log(error))
}
