import apiService from './services/apiService';
import galleryListItemsTemplate from '../templates/gallery-list-items.hbs';

const debounce = require('lodash.debounce');

const refs = {
  searchInput: document.querySelector('input'),
  searchForm: document.querySelector('#search-form'),
  galleryItems: document.querySelector('#gallery'),
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};

refs.searchForm.addEventListener(
  'input',
  debounce(searchFormInputHeandler, 3000),
);

refs.searchInput.addEventListener('keypress', event => {
  if (event.code === 'Enter') {
    event.preventDefault();
    searchFormInputHeandler(event);
  }
});

refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function searchFormInputHeandler(event) {
  const inputValue = event.target.value;

  apiService.searchQuery = inputValue;
  apiService.resetPage();
  clearList();

  apiService.feachArticles().then(hits => {
    const murkup = buildListItemsMurkup(hits);

    insertGalerryItems(murkup);

    if (hits.length > 0) {
      refs.loadMoreBtn.classList.remove('js-btn');
    }
  });
}

export default function loadMoreBtnHandler() {
  apiService.feachArticles().then(hits => {
    const murkup = buildListItemsMurkup(hits);

    insertGalerryItems(murkup);

    window.scrollTo({
      bottom: 0,
      behavior: 'smooth',
    });
  });
}

function insertGalerryItems(items) {
  refs.galleryItems.insertAdjacentHTML('beforeend', items);
}

function buildListItemsMurkup(items) {
  return galleryListItemsTemplate(items);
}

function clearList() {
  refs.galleryItems.innerHTML = '';
}
