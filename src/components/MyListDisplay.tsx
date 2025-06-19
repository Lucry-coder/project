import React from 'react';
import { Play, Info } from 'lucide-react';
import { Movie } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MovieImage } from './MovieImage';
import { AddToListButton } from './AddToListButton';

interface MyListDisplayProps {
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
}

export const MyListDisplay: React.FC<MyListDisplayProps> = ({
  onPlay,
  onMoreInfo,
}) => {
  const [myList] = useLocalStorage<string[]>('netflix-mylist', []);
  
  // Importa i film dal data
  const { movies } = await import('../data/movies');
  
  // Filtra i film che sono nella mia lista
  const myListMovies = movies.filter(movie => myList.includes(movie.id));

  if (myListMovies.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-20 px-4 md:px-8">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-8">
          My List
        </h1>
        <div className="text-center py-20">
          <p className="text-white/60 text-lg mb-4">Your list is empty</p>
          <p className="text-white/40">Add movies and shows to see them here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 px-4 md:px-8">
      <h1 className="text-white text-2xl md:text-3xl font-bold mb-8">
        My List ({myListMovies.length})
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20">
        {myListMovies.map(movie => (
          <div
            key={movie.id}
            className="group cursor-pointer"
            onClick={() => onMoreInfo(movie)}
          >
            <div className="relative overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
              {/* ✅ Usa MovieImage con fallback automatico */}
              <MovieImage
                src={movie.thumbnail || movie.backdrop}
                alt={movie.title}
                className="w-full h-48 md:h-64 object-cover"
                fallbackSrc="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                  {movie.title}
                </h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-green-500 text-xs font-semibold">
                    {movie.rating}
                  </span>
                  <span className="text-white/70 text-xs">{movie.year}</span>
                  <span className="text-white/70 text-xs">{movie.duration}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlay(movie);
                    }}
                    className="bg-white text-black p-2 rounded-full hover:bg-white/90 transition-colors"
                  >
                    <Play size={16} fill="currentColor" />
                  </button>
                  
                  <AddToListButton
                    movieId={movie.id}
                    size="sm"
                  />
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoreInfo(movie);
                    }}
                    className="bg-gray-700/80 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <Info size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-2 px-1">
              <h3 className="text-white text-sm font-medium line-clamp-2">
                {movie.title}
              </h3>
              <p className="text-white/60 text-xs mt-1">
                {movie.year} • {movie.genre.slice(0, 2).join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};