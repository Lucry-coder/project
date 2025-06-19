import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, Info, X } from 'lucide-react';
import { Movie } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ContentRowProps {
  title: string;
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onAddToList: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  isMyListRow?: boolean;
}

export const ContentRow: React.FC<ContentRowProps> = ({
  title,
  movies,
  onPlay,
  onAddToList,
  onMoreInfo,
  isMyListRow = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredMovie, setHoveredMovie] = useState<string | null>(null);
  const [myList] = useLocalStorage<string[]>('netflix-mylist', []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 400;
    const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <div className="px-4 md:px-8 mb-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      
      <div className="relative group">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-2 rounded-r-md opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-2 rounded-l-md opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex space-x-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => {
            const isInMyList = myList.includes(movie.id);
            
            return (
              <div
                key={movie.id}
                className="relative flex-shrink-0 w-48 md:w-64 cursor-pointer transition-all duration-300 ease-out hover:scale-125 hover:z-30"
                onMouseEnter={() => setHoveredMovie(movie.id)}
                onMouseLeave={() => setHoveredMovie(null)}
                onClick={() => onMoreInfo(movie)}
              >
                <div className="relative overflow-hidden rounded-md transition-all duration-300 hover:shadow-2xl hover:shadow-black/50">
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className="w-full h-36 md:h-48 object-cover transition-transform duration-300"
                  />
                  
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
                    hoveredMovie === movie.id ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  <div className={`absolute bottom-0 left-0 right-0 p-3 md:p-4 transition-all duration-300 ${
                    hoveredMovie === movie.id 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-4 opacity-0'
                  }`}>
                    <h3 className="text-white font-semibold text-xs md:text-sm mb-2 line-clamp-2">
                      {movie.title}
                    </h3>
                    
                    <div className="flex items-center space-x-1 md:space-x-2 mb-2 md:mb-3">
                      <span className="text-green-500 text-xs font-semibold bg-green-500/20 px-1 rounded">
                        {movie.rating}
                      </span>
                      <span className="text-white/70 text-xs">{movie.year}</span>
                      <span className="text-white/70 text-xs hidden md:inline">{movie.duration}</span>
                      {movie.likes && (
                        <div className="flex items-center space-x-1">
                          <span className="text-red-500 text-xs">❤</span>
                          <span className="text-white/70 text-xs">{movie.likes}</span>
                        </div>
                      )}
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
                        className={`p-2 rounded-full transition-colors ${
                          isMyListRow 
                            ? 'bg-red-600/80 text-white hover:bg-red-600 hover:scale-110' 
                            : isInMyList
                              ? 'bg-gray-700/80 text-white hover:bg-red-500 hover:scale-110'
                              : 'bg-gray-700/80 text-white hover:bg-green-500 hover:scale-110'
                        } transition-all duration-200 p-1.5 md:p-2`}
                      >
                        {isMyListRow ? (
                          <X size={14} className="md:w-4 md:h-4" />
                        ) : (
                          <Plus size={14} className="md:w-4 md:h-4" />
                        )}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};