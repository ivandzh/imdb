import axios from 'axios';

export const LoadMoviesApi = axios.create({ //discover api
    baseURL: 'https://api.themoviedb.org/3/discover/'
})

export const SearchMoviesApi = axios.create({ //search api
    baseURL: 'https://api.themoviedb.org/3/search/'
})