import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import ScrollToTop from './components/ScrollToTop'
import MovieDetail from './features/movies/MovieCard';
import Watchlist from './features/watchlist/Watchlist'

function App() {
    return (
     <div className='app'>
      <Router>
        {/* The following ScrollToTop custom component is needed to scroll the page to top on each history location change. 
        This ensures that the lazy load logic doesn't get stuck and update pages indefinitely on page change */}
      <ScrollToTop /> 
        <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/movie/:imdbID" exact component={MovieDetail} />
              <Route path="/watchlist" exact component={Watchlist} />
              <Route component={PageNotFound} />
            </Switch>
          <Footer />
      </Router>
     </div>
    );
}

export default App;
