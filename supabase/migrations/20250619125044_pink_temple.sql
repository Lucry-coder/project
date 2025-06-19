/*
  # Create My List Table

  1. New Tables
    - `my_list`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `movie_id` (text, movie identifier)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `my_list` table
    - Add policy for authenticated users to manage their own list items
    - Users can only see and modify their own list items

  3. Indexes
    - Add composite index on (user_id, movie_id) for fast lookups
    - Add index on user_id for efficient user-specific queries
*/

-- Create my_list table
CREATE TABLE IF NOT EXISTS my_list (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  movie_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE my_list ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own list items"
  ON my_list
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own list items"
  ON my_list
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own list items"
  ON my_list
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own list items"
  ON my_list
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_my_list_user_id ON my_list(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_my_list_user_movie ON my_list(user_id, movie_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_my_list_updated_at
  BEFORE UPDATE ON my_list
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();