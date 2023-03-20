
import * as actions from './ActionsTypes'


const initialState = {
	movies: [],
	foundMovies: [],
	watchlist: window.localStorage.getItem('watchlist') ? JSON.parse(window.localStorage.getItem('watchlist')) : [],
};

export const moviesReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.FETCH_MOVIES:
			console.log("FETCH_MOVIES action.payload" ,action.payload)
			return {
				...state,
				movies: action.payload,
			};
        case actions.FETCH_MORE_MOVIES:
			console.log("FETCH_MORE_MOVIES action.payload" ,action.payload)
            const loadedMovies = state.movies;
            const newBatchMovies = [...loadedMovies, ...action.payload]
            return {
                ...state,
                movies: newBatchMovies,
            };
		case actions.SEARCH_MOVIES:
			console.log("SEARCH_MOVIES action.payload" ,action.payload)
			const searchedMovies = state.foundMovies;
			// console.log("searchedMovies", searchedMovies)
            const newFoundMovies = [...searchedMovies, ...action.payload]
			// console.log("newFoundMovies", newFoundMovies)
			return {
				...state,
				foundMovies: newFoundMovies,
			};
		case actions.ADD_TO_WATCHLIST:
			const newMovies = [action.payload, ...state.watchlist];
			window.localStorage.setItem('watchlist', JSON.stringify(newMovies));
			return {
				...state,
				watchlist: newMovies,
			};
		case actions.REMOVE_FROM_WATCHLIST:
			const originalWatch = state.watchlist;
			const filtredWatch = originalWatch.filter((f) => f.id !== action.payload);
			window.localStorage.setItem('watchlist', JSON.stringify(filtredWatch));
			return {
				...state,
				watchlist: filtredWatch,
			};
		default:
			return state;
	}
};