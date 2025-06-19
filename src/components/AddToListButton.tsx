import React, { useState, useEffect } from 'react';
import { Plus, X, Heart } from 'lucide-react';
import { useMyList } from '../hooks/useMyList';
import { useAuth } from '../hooks/useAuth';

interface AddToListButtonProps {
  movieId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'default' | 'hero';
}

export const AddToListButton: React.FC<AddToListButtonProps> = ({
  movieId,
  className = '',
  size = 'md',
  showText = false,
  variant = 'default',
}) => {
  const { user } = useAuth();
  const { isInList, toggleInList } = useMyList();
  const [isToggling, setIsToggling] = useState(false);
  const [localState, setLocalState] = useState(false);

  // Initialize local state
  useEffect(() => {
    setLocalState(isInList(movieId));
  }, [movieId, isInList]);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      // Handle unauthenticated user - could show auth modal
      return;
    }

    if (isToggling) return;

    setIsToggling(true);
    
    // Immediate UI feedback
    setLocalState(prev => !prev);
    
    try {
      await toggleInList(movieId);
    } catch (error) {
      // Revert on error
      setLocalState(prev => !prev);
      console.error('Error toggling list:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const getSizeClasses = () => {
    if (variant === 'hero') {
      return 'px-8 py-3';
    }
    
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
    if (variant === 'hero') return 24;
    
    switch (size) {
      case 'sm':
        return 14;
      case 'lg':
        return 20;
      default:
        return 16;
    }
  };

  const getButtonClasses = () => {
    if (variant === 'hero') {
      return `
        flex items-center justify-center space-x-3 
        font-semibold backdrop-blur-sm transition-all duration-300
        ${localState 
          ? 'bg-red-600/80 text-white hover:bg-red-600 hover:scale-105' 
          : 'bg-gray-500/70 text-white hover:bg-green-500/90 hover:scale-105'
        }
      `;
    }

    return `
      rounded-full transition-all duration-300 transform hover:scale-110
      ${localState 
        ? 'bg-red-600 text-white hover:bg-red-700' 
        : 'bg-gray-700/80 text-white hover:bg-green-500'
      }
    `;
  };

  const getIcon = () => {
    if (variant === 'hero') {
      return localState ? <Heart size={getIconSize()} fill="currentColor" /> : <Plus size={getIconSize()} />;
    }
    return localState ? <X size={getIconSize()} /> : <Plus size={getIconSize()} />;
  };

  const getText = () => {
    if (variant === 'hero') {
      return localState ? 'My List' : 'My List';
    }
    return localState ? 'Remove' : 'Add';
  };

  return (
    <button
      onClick={handleClick}
      disabled={isToggling || !user}
      className={`
        ${getSizeClasses()}
        ${getButtonClasses()}
        ${variant === 'hero' ? 'rounded-md' : ''}
        ${!user ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      title={
        !user 
          ? 'Sign in to add to your list'
          : localState 
            ? 'Remove from My List' 
            : 'Add to My List'
      }
    >
      <div className={`flex items-center ${showText || variant === 'hero' ? 'space-x-2' : ''}`}>
        {getIcon()}
        {(showText || variant === 'hero') && (
          <span className="text-sm font-medium">
            {getText()}
          </span>
        )}
      </div>
    </button>
  );
};