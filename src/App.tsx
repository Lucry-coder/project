import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ContentRow } from './components/ContentRow';
import { VideoPlayer } from './components/VideoPlayer';
import { MovieModal } from './components/MovieModal';
import { SearchResults } from './components/SearchResults';
import { ProfileDropdown } from './components/ProfileDropdown';
import { NotificationDropdown } from './components/NotificationDropdown';
import { featuredMovie, contentRows, movies, getMostLikedMovies } from './data/movies';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Movie } from './types';

function App() {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [myList, setMyList] = useLocalStorage<string[]>('netflix-mylist', []);
  const [searchSuggestions, setSearchSuggestions] = useState<Movie[]>([]);
  const [movieLikes, setMovieLikes] = useLocalStorage<Record<string, number>>('netflix-likes', {});
  const [userLikes, setUserLikes] = useLocalStorage<string[]>('netflix-user-likes', []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.description.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(results);
      setSearchSuggestions(results);
    } else {
      setSearchResults([]);
      setSearchSuggestions([]);
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handlePlay = (movie: Movie) => {
    setCurrentMovie(movie);
  };

  const handleAddToList = (movie: Movie) => {
    setMyList(prev => 
      prev.includes(movie.id) 
        ? prev.filter(id => id !== movie.id)
        : [...prev, movie.id]
    );
  };

  const handleMoreInfo = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleSignOut = () => {
    setShowProfileDropdown(false);
    // In a real app, this would clear auth tokens and redirect to login
    console.log('Signing out...');
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleNotificationClick = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    setShowProfileDropdown(false);
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowNotificationDropdown(false);
  };

  const handleLike = (movie: Movie) => {
    if (userLikes.includes(movie.id)) {
      // Remove like
      setUserLikes(prev => prev.filter(id => id !== movie.id));
      setMovieLikes(prev => ({
        ...prev,
        [movie.id]: Math.max(0, (prev[movie.id] || movie.likes || 0) - 1)
      }));
    } else {
      // Add like
      setUserLikes(prev => [...prev, movie.id]);
      setMovieLikes(prev => ({
        ...prev,
        [movie.id]: (prev[movie.id] || movie.likes || 0) + 1
      }));
    }
  };

  // Update movies with current like counts
  const moviesWithUpdatedLikes = movies.map(movie => ({
    ...movie,
    likes: movieLikes[movie.id] || movie.likes || 0
  }));

  // Update content rows with current like counts
  const updatedContentRows = contentRows.map(row => {
    if (row.id === 'most-liked') {
      const mostLiked = [...moviesWithUpdatedLikes]
        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
        .slice(0, 8);
      return { ...row, movies: mostLiked };
    }
    return {
      ...row,
      movies: row.movies.map(movie => 
        moviesWithUpdatedLikes.find(m => m.id === movie.id) || movie
      )
    };
  });

  const myListMovies = movies.filter(movie => myList.includes(movie.id));
  const finalContentRows = myListMovies.length > 0 
    ? [{ id: 'mylist', title: 'My List', movies: myListMovies }, ...updatedContentRows]
    : updatedContentRows;

  return (
    <div className="bg-black min-h-screen">
      <Header
        onSearch={handleSearch}
        onProfileClick={handleProfileClick}
        onNotificationClick={handleNotificationClick}
        onLogoClick={handleLogoClick}
        isScrolled={isScrolled}
        searchSuggestions={searchSuggestions}
        onMovieSelect={handleMovieSelect}
      />

      <ProfileDropdown
        isOpen={showProfileDropdown}
        onClose={() => setShowProfileDropdown(false)}
        onSignOut={handleSignOut}
      />

      <NotificationDropdown
        isOpen={showNotificationDropdown}
        onClose={() => setShowNotificationDropdown(false)}
      />

      {searchQuery ? (
        <SearchResults
          query={searchQuery}
          results={searchResults}
          onPlay={handlePlay}
          onAddToList={handleAddToList}
          onMoreInfo={handleMoreInfo}
        />
      ) : (
        <>
          <Hero
            movie={featuredMovie}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            onMoreInfo={handleMoreInfo}
          />

          <div className="relative -mt-16 z-10">
            {finalContentRows.map((row) => (
              <div
                key={row.id}
                id={row.id === 'mylist' ? 'mylist-section' : undefined}
                className={row.id === 'mylist' ? 'pt-16' : ''}
              >
                <ContentRow
                  title={row.title}
                  movies={row.movies}
                  onPlay={handlePlay}
                  onAddToList={handleAddToList}
                  onMoreInfo={handleMoreInfo}
                  isMyListRow={row.id === 'mylist'}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {currentMovie && (
        <VideoPlayer
          movie={currentMovie}
          onClose={() => setCurrentMovie(null)}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onPlay={handlePlay}
          onAddToList={handleAddToList}
          onLike={handleLike}
          currentLikes={movieLikes[selectedMovie.id] || selectedMovie.likes || 0}
          isLiked={userLikes.includes(selectedMovie.id)}
        />
      )}
    </div>
  );
}

export default App;