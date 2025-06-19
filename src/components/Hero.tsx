import React from 'react';
import { Play, Info } from 'lucide-react';
import { Movie } from '../types';
import { AddToListButton } from './AddToListButton';

interface HeroProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
}

export const Hero: React.FC<HeroProps> = ({ movie, onPlay, onMoreInfo }) => {
  return (
    <div className="relative h-screen flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {movie.title}
        </h1>
        
        <div className="flex items-center space-x-4 text-white/90 mb-6">
          <span className="px-2 py-1 bg-red-600 text-xs font-semibold rounded">
            {movie.rating}
          </span>
          <span>{movie.year}</span>
          <span>{movie.duration}</span>
          <div className="flex space-x-2">
            {movie.genre.slice(0, 3).map((g) => (
              <span key={g} className="text-sm">{g}</span>
            ))}
          </div>
        </div>

        <p className="text-white/90 text-lg mb-8 leading-relaxed line-clamp-3">
          {movie.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onPlay(movie)}
            className="flex items-center justify-center space-x-3 bg-white text-black px-8 py-3 rounded-md hover:bg-white/90 transition-colors font-semibold text-lg"
          >
            <Play size={24} fill="currentColor" />
            <span>Play</span>
          </button>

          <AddToListButton
            movieId={movie.id}
            variant="hero"
            className="rounded-md"
          />

          <button
            onClick={() => onMoreInfo(movie)}
            className="flex items-center justify-center space-x-3 bg-gray-500/20 text-white px-6 py-3 rounded-md hover:bg-gray-500/40 transition-colors backdrop-blur-sm border border-white/20"
          >
            <Info size={20} />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};