import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



import { getImagesByQuery } from './js/pixabay-api.js';
import {createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('#input');
const loadBtn = document.querySelector('.load-btn');

let page = 1;
let currentQuery = '';
const perPage = 15;



form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: 'Sorry, there are no images matching your search query. Please try again!💔',
    });
    return;
  }

  currentQuery = query;
  page = 1;
        
  hideLoadMoreButton();
  showLoader();
  clearGallery();
  

  try {
    const result = await getImagesByQuery(currentQuery, page, perPage);
    const img = result.hits;
    if (img.length === 0) {
      setTimeout(() => {
        iziToast.error({
          position: 'topRight',
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please try again!💔',
        });
      }, 1000);
      input.value = '';
      hideLoadMoreButton();
    } else {
      setTimeout(() => {
        createGallery(img);
        input.value = '';
        availableImages(img, perPage);

        if (img.length === perPage) {
          showLoadMoreButton();
        } else {
          hideLoadMoreButton();
        }
      }, 1000);
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Sorry💔',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
})

  function availableImages(imeges, perPage) {
    if (imeges.length < perPage) {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.💔",
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  }

loadBtn.addEventListener('click', async () => { 
  hideLoadMoreButton();
  showLoader();
  page += 1;

  try {
    const result = getImagesByQuery(currentQuery, page, perPage);
    const img = result.hits;
    createGallery(img);
    scrollLoad();
    availableImages(img, perPage);
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Sorry💔',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
})
  
  function scrollLoad() {
    const galleryItem = document.querySelector('.gallery li');
    if (galleryItem) {
      const { height } = galleryItem.getBoundingClientRect();
        
      requestAnimationFrame(() => {
        window.scrollBy({ top: height * 2, behavior: 'smooth' });
      });
    }
  }
