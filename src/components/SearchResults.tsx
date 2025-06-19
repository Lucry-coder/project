import React from 'react';
import { Play, Plus, Info } from 'lucide-react';
import { Movie } from '../types';

interface SearchResultsProps {
  query: string;
  results: Movie[];
  onPlay: (movie: Movie) => void;
  onAddToList: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  results,
  onPlay,
  onAddToList,
  onMoreInfo,
}) => {
  if (!query) return null;

  return (
    <div className="min-h-screen bg-black pt-20 px-4 md:px-8">
      <h1 className="text-white text-2xl md:text-3xl font-bold mb-8">
        Search results for "{query}"
      </h1>

      {results.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/60 text-lg mb-4">No results found</p>
          <p className="text-white/40">Try searching for something else</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="group cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:z-20"
             onClick={() => onMoreInfo(movie)}
            >
              <div className="relative overflow-hidden rounded-md transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-black/50">
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="w-full h-48 md:h-64 object-cover transition-transform duration-300"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                    {movie.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-green-500 text-xs font-semibold bg-green-500/20 px-1 rounded">
                      {movie.rating}
                    </span>
                    <span className="text-white/70 text-xs">{movie.year}</span>
                  </div>
                  
                  <div className="flex space-x-1 md:space-x-2">
                    <button
                     onClick={(e) => {
                       e.stopPropagation();
                       onPlay(movie);
                     }}
                      className="bg-white text-black p-1.5 md:p-2 rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-110"
                    >
                      <Play size={14} className="md:w-4 md:h-4" fill="currentColor" />
                    </button>
                    <button
                     onClick={(e) => {
                       e.stopPropagation();
                       onAddToList(movie);
                     }}
                      className="bg-gray-700/80 text-white p-1.5 md:p-2 rounded-full hover:bg-gray-700 transition-all duration-200 hover:scale-110"
                    >
                      <Plus size={14} className="md:w-4 md:h-4" />
                    </button>
                    <button
                     onClick={(e) => {
                       e.stopPropagation();
                       onMoreInfo(movie);
                     }}
                      className="bg-gray-700/80 text-white p-1.5 md:p-2 rounded-full hover:bg-gray-700 transition-all duration-200 hover:scale-110"
                    >
                      <Info size={14} className="md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-2 px-1">
                <h3 className="text-white text-sm font-medium line-clamp-2">
                  {movie.title}
                </h3>
                <p className="text-white/60 text-xs mt-1">
                  {movie.year} • {movie.genre.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};