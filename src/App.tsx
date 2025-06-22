import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ContentRow } from './components/ContentRow';
import { VideoPlayer } from './components/VideoPlayer';
import { MovieModal } from './components/MovieModal';
import { SearchResults } from './components/SearchResults';
import { ProfileDropdown } from './components/ProfileDropdown';
import { NotificationDropdown } from './components/NotificationDropdown';
import { LoginScreen } from './components/LoginScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { HelpCenter } from './components/HelpCenter';
import { featuredMovie, contentRows, movies, getMostLikedMovies } from './data/movies';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAuth } from './hooks/useAuth';
import { Movie } from './types';

function App() {
  const { user, isAuthenticated, login, logout, switchUser, updateUser } = useAuth();
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [showSettingsScreen, setShowSettingsScreen] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
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

  // Se non autenticato, mostra la schermata di login
  if (!isAuthenticated || showLoginScreen) {
    return (
      <LoginScreen
        onLogin={(email, password) => {
          login(email, password);
          setShowLoginScreen(false);
        }}
        onClose={() => setShowLoginScreen(false)}
      />
    );
  }

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
    logout();
  };

  const handleSwitchUser = () => {
    setShowProfileDropdown(false);
    setShowLoginScreen(true);
  };

  const handleOpenSettings = () => {
    setShowProfileDropdown(false);
    setShowSettingsScreen(true);
  };

  const handleOpenHelp = () => {
    setShowProfileDropdown(false);
    setShowHelpCenter(true);
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
        user={user}
      />

      <ProfileDropdown
        isOpen={showProfileDropdown}
        onClose={() => setShowProfileDropdown(false)}
        onSignOut={handleSignOut}
        onSwitchUser={handleSwitchUser}
        onOpenSettings={handleOpenSettings}
        onOpenHelp={handleOpenHelp}
        user={user}
      />

      <NotificationDropdown
        isOpen={showNotificationDropdown}
        onClose={() => setShowNotificationDropdown(false)}
      />

      <SettingsScreen
        isOpen={showSettingsScreen}
        onClose={() => setShowSettingsScreen(false)}
        user={user}
        onUpdateUser={updateUser}
      />

      <HelpCenter
        isOpen={showHelpCenter}
        onClose={() => setShowHelpCenter(false)}
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
                id={row.id === 'mylist' ? 'mylist-section' : `${row.id}-section`}
                className={row.id === 'mylist' ? 'pt-16' : ''}
              >
                {/* Titolo della sezione con anchor per la navigazione */}
                <div className="px-4 md:px-8 pt-8 pb-4">
                  <h2 className="text-white text-3xl md:text-4xl font-bold mb-2 flex items-center">
                    <span className="w-1 h-8 bg-red-600 mr-4 rounded-full"></span>
                    {row.title}
                  </h2>
                  <div className="w-20 h-1 bg-red-600 rounded-full ml-6"></div>
                </div>
                
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