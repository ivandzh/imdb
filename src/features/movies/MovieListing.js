import React, { useEffect }  from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import MovieCard from './MovieCard';
import './MovieListing.scss'
import { fetchMoviesAction, loadMoreMoviesAction, searchMoviesAction } from '../../redux/Actions'
import { getMovies, searchMovies } from '../../services/MoviesApi'
import { useState } from "react"
import { TOTAL_PAGES, EMPTY_SEARCH, INITIAL_PAGE } from '../../common/constants'

const MovieListing = () => {

  const [searchValue, setSearchValue] = useState(EMPTY_SEARCH);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

  const { movies, foundMovies } = useSelector((state) => state.movies, shallowEqual);
	const dispatch = useDispatch();

  const loadMoreItems = () => {
     // just set the page, the effect will respond to it
     if (currentPage < TOTAL_PAGES) {
       setCurrentPage((page) => page + 1);
       console.log("currentPage in hasNext", currentPage)
     }
  };

  const onChangeSearch = (e) => {
    // reset page to 1 when changing search
    setSearchValue(e.target.value);
    setCurrentPage(INITIAL_PAGE);
  };

  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight - 1) {
      loadMoreItems();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // cleanup function
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const retrieveMovies = async () => {
    try {
			const data = await getMovies(currentPage);
      currentPage ===1 ? 
        dispatch(fetchMoviesAction(data)) : 
        dispatch(loadMoreMoviesAction(data))
		} catch (error) {
      console.log("Error retrieving movies", error)
		}
  }

  const searchForMovies = async () => {
		try {
			const data = await searchMovies(currentPage, searchValue);
			  dispatch(searchMoviesAction(data))
		} catch (error) {
		}
	};

	useEffect(() => {
    console.log("SEARCH VALUE USE EFFECT", searchValue)

    if (searchValue !== "") { 
      console.log("has value")
      const delayDebounceFn = setTimeout(() => {
        console.log("currentPage", currentPage)
        console.log("searchValue", searchValue)
        console.log("foundMovies", foundMovies)
        // foundMovies.length = 0 - this line breaks the load more search results logic
        searchForMovies(currentPage, searchValue)
      }, 500)

      return () => clearTimeout(delayDebounceFn)
       
    } else {
      foundMovies.length = 0;
      console.log("no value", currentPage)
      retrieveMovies()
      // currentPage ===1 ? fetchMovies(currentPage) : fetchNewMovies(currentPage)
    }
	}, [searchValue, currentPage]);


  return (
    <>
      <div className='movie-wrapper'>
          <div className='movie-list'>
            <div className='search-wrapper'>
              <form className="search">
                <input 
                className="search" 
                type="search" 
                placeholder="Search a movie"
                onChange={onChangeSearch} />
              </form>
            </div>
            <div className='movie-container'>
                { foundMovies && foundMovies.length ? 
                foundMovies.map(foundMovie => <MovieCard key={foundMovie.id} data={foundMovie} />)
                : movies && movies.length && movies.map(movie => <MovieCard key={movie.id} data={movie} />)
                }
            </div>
          </div>
      </div>
    </>
  )
}

export default MovieListing