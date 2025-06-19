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
    
    // Aggiorna immediatamente lo stato locale per feedback visivo istantaneo
    const newState = !isInList;
    setIsInList(newState);
    
    // Aggiorna il localStorage
    if (newState) {
      setMyList(prev => [...prev, movieId]);
    } else {
      setMyList(prev => prev.filter(id => id !== movieId));
    }
    
    // Chiama callback opzionale
    onAddToList?.(movieId);
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
        ${isInList 
          ? 'bg-red-600 text-white hover:bg-red-700' 
          : 'bg-gray-700/80 text-white hover:bg-green-500'
        }
        ${className}
      `}
      title={isInList ? 'Remove from My List' : 'Add to My List'}
    >
      <div className="flex items-center space-x-2">
        {isInList ? (
          <X size={getIconSize()} />
        ) : (
          <Plus size={getIconSize()} />
        )}
        {showText && (
          <span className="text-sm font-medium">
            {isInList ? 'Remove' : 'Add'}
          </span>
        )}
      </div>
    </button>
  );
};