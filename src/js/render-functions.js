import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a');
const loadBtn = document.querySelector('.load-btn');

export const createGallery = images => {
    const imgMrkp = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<li class="gallery-item"><a href="${largeImageURL}">
        <div class="card">
                <img class="card-image" src="${webformatURL}" alt="${tags}" width="370" height="334"/>
            <div class="card-body">
            <span class="card-body-title">
                <p class="card-subtitle">likes: ${likes}</p>
                <p class="card-subtitle">views: ${views}</p>
                <p class="card-subtitle">comments: ${comments}</p>
                <p class="card-subtitle">downloads: ${downloads}</p>
            </span>
            </div>
        </div>
        </a>
        </li>`
    )
        .join('');

    gallery.insertAdjacentHTML('beforeend', imgMrkp);
    lightbox.refresh();
};

export const clearGallery = () => {
  gallery.innerHTML = '';
};

export const hideLoader = () => {
loader.classList.add('hidden');
};

export const showLoader = () => {
loader.classList.remove('hidden');
};

export const showLoadMoreButton = () => {
loadBtn.classList.remove('hidden')
};

export const hideLoadMoreButton = () => {
loadBtn.classList.add('hidden');
};