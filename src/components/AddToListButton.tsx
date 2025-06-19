import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AddToListButtonProps {
  movieId: string;
  onAddToList?: (movieId: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const AddToListButton: React.FC<AddToListButtonProps> = ({
  movieId,
  onAddToList,
  className = '',
  size = 'md',
  showText = false,
}) => {
  const [myList, setMyList] = useLocalStorage<string[]>('netflix-mylist', []);
  const [isInList, setIsInList] = useState(myList.includes(movieId));

  // Sincronizza lo stato locale quando myList cambia
  useEffect(() => {
    setIsInList(myList.includes(movieId));
  }, [myList, movieId]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // ✅ Usa la versione funzionale per aggiornamento immediato
    setIsInList(prev => {
      const newState = !prev;
      
      // Aggiorna il localStorage basandosi sul nuovo stato
      if (newState) {
        setMyList(prevList => [...prevList, movieId]);
      } else {
        setMyList(prevList => prevList.filter(id => id !== movieId));
      }
      
      // Chiama callback opzionale
      onAddToList?.(movieId);
      
      return newState;
    });
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'p-1.5';
      case 'lg':
        return 'p-3';
      default:
        return 'p-2';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 14;
      case 'lg':
        return 20;
      default:
        return 16;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'lg':
        return 'text-base';
      default:
        return 'text-sm';
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${getSizeClasses()}
        rounded-full 
        transition-all 
        duration-300 
        transform 
        hover:scale-110
        flex items-center justify-center
        ${isInList 
          ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-500/25' 
          : 'bg-green-600 text-white hover:bg-green-700 shadow-green-500/25'
        }
        shadow-lg hover:shadow-xl
        ${className}
      `}
      title={isInList ? 'Remove from My List' : 'Add to My List'}
      aria-label={isInList ? 'Remove from My List' : 'Add to My List'}
    >
      <div className={`flex items-center ${showText ? 'space-x-2' : ''}`}>
        {isInList ? (
          <X size={getIconSize()} />
        ) : (
          <Plus size={getIconSize()} />
        )}
        {showText && (
          <span className={`font-medium ${getTextSize()}`}>
            {isInList ? 'My List' : 'My List'}
          </span>
        )}
      </div>
    </button>
  );
};