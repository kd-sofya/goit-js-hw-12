import axios from 'axios';

const API_KEY = '54229410-94c77c5f0b522302148c51193';
const BASE_URL = 'https://pixabay.com/api/';

export const getImagesByQuery = async (currentQuery, page = 1)  =>  {
  const response = await axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: currentQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 15,
            page,
            
        },
    });
    return response.data;
};