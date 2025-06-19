import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useMyList = () => {
  const { user } = useAuth();
  const [myList, setMyList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's list from Supabase
  const fetchMyList = async () => {
    if (!user) {
      setMyList([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('my_list')
        .select('movie_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching my list:', error);
        return;
      }

      const movieIds = data?.map(item => item.movie_id) || [];
      setMyList(movieIds);
    } catch (error) {
      console.error('Error fetching my list:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add movie to list
  const addToList = async (movieId: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('my_list')
        .insert({
          user_id: user.id,
          movie_id: movieId,
        });

      if (error) {
        console.error('Error adding to list:', error);
        return { error };
      }

      // Update local state immediately
      setMyList(prev => [...prev, movieId]);
      return { error: null };
    } catch (error) {
      console.error('Error adding to list:', error);
      return { error };
    }
  };

  // Remove movie from list
  const removeFromList = async (movieId: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('my_list')
        .delete()
        .eq('user_id', user.id)
        .eq('movie_id', movieId);

      if (error) {
        console.error('Error removing from list:', error);
        return { error };
      }

      // Update local state immediately
      setMyList(prev => prev.filter(id => id !== movieId));
      return { error: null };
    } catch (error) {
      console.error('Error removing from list:', error);
      return { error };
    }
  };

  // Toggle movie in list
  const toggleInList = async (movieId: string) => {
    const isInList = myList.includes(movieId);
    
    if (isInList) {
      return await removeFromList(movieId);
    } else {
      return await addToList(movieId);
    }
  };

  // Check if movie is in list
  const isInList = (movieId: string) => {
    return myList.includes(movieId);
  };

  useEffect(() => {
    fetchMyList();
  }, [user]);

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('my_list_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'my_list',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          // Refetch the list when changes occur
          fetchMyList();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return {
    myList,
    loading,
    addToList,
    removeFromList,
    toggleInList,
    isInList,
    refetch: fetchMyList,
  };
};