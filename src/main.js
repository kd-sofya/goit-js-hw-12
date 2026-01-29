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




form.addEventListener('submit', e => {
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

    getImagesByQuery(currentQuery, page, perPage)
        .then(result => {
            console.log(result);
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

                if (img.length === perPage) {
                    showLoadMoreButton();
                } else {
                    hideLoadMoreButton();
                }
                }, 1000);
                // createGallery(img);
                // console.log(result.data);
                // console.log(result.data.hits);
              }


        })
        .catch(error => {
                iziToast.error({
                position: 'topRight',
                message: 'Sorry💔',
            });
            console.error(error);
            })

        .finally(() => {
            hideLoader();
            });
});



    function scrollLoad() {
    const galleryItem = document.querySelector('.gallery li');
    if (galleryItem) {
        const { height } = galleryItem.getBoundingClientRect();
        
        requestAnimationFrame(() => {
            window.scrollBy({ top: height * 2, behavior: 'smooth' });
        });
      }
    }



loadBtn.addEventListener('click', () => {
  hideLoadMoreButton();
  showLoader();
  page += 1;    

  getImagesByQuery(currentQuery, page, perPage)
    .then(result => {
      const img = result.hits;

        createGallery(img);
        scrollLoad();

      if (img.length < perPage) {
        iziToast.info({
          position: 'topRight',
          message: "We're sorry, but you've reached the end of search results.💔",
        });
        hideLoadMoreButton();
      } else {
        showLoadMoreButton();
      }
    })
    .catch(error => console.error(error))
    .finally(() => {
      hideLoader();
    });
});