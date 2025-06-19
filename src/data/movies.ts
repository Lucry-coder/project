import { Movie, ContentRow } from '../types';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
    genre: ['Sci-Fi', 'Horror', 'Drama'],
    year: 2016,
    rating: 'TV-14',
    duration: '51min',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    isFeatured: true,
    likes: 1250,
  },
  {
    id: '2',
    title: 'The Crown',
    description: 'This drama follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
    genre: ['Drama', 'Biography', 'History'],
    year: 2016,
    rating: 'TV-MA',
    duration: '58min',
    thumbnail: 'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 980,
  },
  {
    id: '3',
    title: 'Money Heist',
    description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
    genre: ['Crime', 'Drama', 'Thriller'],
    year: 2017,
    rating: 'TV-MA',
    duration: '70min',
    thumbnail: 'https://images.pexels.com/photos/6896450/pexels-photo-6896450.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/6896450/pexels-photo-6896450.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    likes: 2100,
  },
  {
    id: '4',
    title: 'Dark',
    description: 'A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.',
    genre: ['Sci-Fi', 'Mystery', 'Drama'],
    year: 2017,
    rating: 'TV-14',
    duration: '60min',
    thumbnail: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    likes: 1800,
  },
  {
    id: '5',
    title: 'Ozark',
    description: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.',
    genre: ['Crime', 'Drama', 'Thriller'],
    year: 2017,
    rating: 'TV-MA',
    duration: '60min',
    thumbnail: 'https://images.pexels.com/photos/7991665/pexels-photo-7991665.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/7991665/pexels-photo-7991665.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    likes: 1650,
  },
  {
    id: '6',
    title: 'The Witcher',
    description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
    genre: ['Fantasy', 'Adventure', 'Drama'],
    year: 2019,
    rating: 'TV-MA',
    duration: '60min',
    thumbnail: 'https://images.pexels.com/photos/8111085/pexels-photo-8111085.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8111085/pexels-photo-8111085.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    likes: 1420,
  },
  {
    id: '7',
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    genre: ['Crime', 'Drama', 'Thriller'],
    year: 2008,
    rating: 'TV-MA',
    duration: '47min',
    thumbnail: 'https://images.pexels.com/photos/7991448/pexels-photo-7991448.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/7991448/pexels-photo-7991448.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    likes: 2850,
  },
  {
    id: '8',
    title: 'House of Cards',
    description: 'A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.',
    genre: ['Drama', 'Thriller', 'Political'],
    year: 2013,
    rating: 'TV-MA',
    duration: '51min',
    thumbnail: 'https://images.pexels.com/photos/8111262/pexels-photo-8111262.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8111262/pexels-photo-8111262.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 1320,
  },
  {
    id: '9',
    title: 'Narcos',
    description: 'A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country.',
    genre: ['Crime', 'Drama', 'Biography'],
    year: 2015,
    rating: 'TV-MA',
    duration: '49min',
    thumbnail: 'https://images.pexels.com/photos/6896264/pexels-photo-6896264.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/6896264/pexels-photo-6896264.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    likes: 1890,
  },
  {
    id: '10',
    title: 'The Office',
    description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
    genre: ['Comedy', 'Drama', 'Mockumentary'],
    year: 2005,
    rating: 'TV-14',
    duration: '22min',
    thumbnail: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    likes: 2200,
  },
  {
    id: '11',
    title: 'Friends',
    description: 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.',
    genre: ['Comedy', 'Romance', 'Drama'],
    year: 1994,
    rating: 'TV-14',
    duration: '22min',
    thumbnail: 'https://images.pexels.com/photos/7688465/pexels-photo-7688465.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/7688465/pexels-photo-7688465.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    likes: 3200,
  },
  {
    id: '12',
    title: 'Black Mirror',
    description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.',
    genre: ['Sci-Fi', 'Thriller', 'Drama'],
    year: 2011,
    rating: 'TV-MA',
    duration: '60min',
    thumbnail: 'https://images.pexels.com/photos/5699475/pexels-photo-5699475.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/5699475/pexels-photo-5699475.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    likes: 1750,
  },
  {
    id: '13',
    title: 'Sherlock',
    description: 'A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.',
    genre: ['Crime', 'Drama', 'Mystery'],
    year: 2010,
    rating: 'TV-14',
    duration: '88min',
    thumbnail: 'https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    likes: 1560,
  },
  {
    id: '14',
    title: 'The Mandalorian',
    description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
    genre: ['Sci-Fi', 'Adventure', 'Action'],
    year: 2019,
    rating: 'TV-14',
    duration: '40min',
    thumbnail: 'https://images.pexels.com/photos/8111320/pexels-photo-8111320.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8111320/pexels-photo-8111320.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 2450,
  },
  {
    id: '15',
    title: 'Game of Thrones',
    description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
    genre: ['Fantasy', 'Drama', 'Adventure'],
    year: 2011,
    rating: 'TV-MA',
    duration: '57min',
    thumbnail: 'https://images.pexels.com/photos/8111147/pexels-photo-8111147.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8111147/pexels-photo-8111147.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    likes: 2950,
  },
  {
    id: '16',
    title: 'Westworld',
    description: 'Set at the intersection of the near future and the reimagined past, explore a world in which every human appetite can be indulged without consequence.',
    genre: ['Sci-Fi', 'Western', 'Drama'],
    year: 2016,
    rating: 'TV-MA',
    duration: '62min',
    thumbnail: 'https://images.pexels.com/photos/7991512/pexels-photo-7991512.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/7991512/pexels-photo-7991512.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    likes: 1680,
  },
  {
    id: '17',
    title: 'The Boys',
    description: 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.',
    genre: ['Action', 'Comedy', 'Crime'],
    year: 2019,
    rating: 'TV-MA',
    duration: '60min',
    thumbnail: 'https://images.pexels.com/photos/6896378/pexels-photo-6896378.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/6896378/pexels-photo-6896378.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    likes: 2350,
  },
  {
    id: '18',
    title: 'Peaky Blinders',
    description: 'A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps.',
    genre: ['Crime', 'Drama', 'History'],
    year: 2013,
    rating: 'TV-MA',
    duration: '60min',
    thumbnail: 'https://images.pexels.com/photos/8721365/pexels-photo-8721365.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8721365/pexels-photo-8721365.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    likes: 1920,
  },
];

// Get most liked movies sorted by likes
export const getMostLikedMovies = (): Movie[] => {
  return [...movies].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 8);
};

export const contentRows: ContentRow[] = [
  {
    id: 'most-liked',
    title: 'Most Liked',
    movies: getMostLikedMovies(),
  },
  {
    id: 'trending',
    title: 'Trending Now',
    movies: movies.slice(0, 8),
  },
  {
    id: 'originals',
    title: 'Netflix Originals',
    movies: movies.slice(1, 9),
  },
  {
    id: 'drama',
    title: 'Expo',
    movies: (() => {
      const dramaMovies = movies.filter(movie => movie.genre.includes('Drama'));
      while (dramaMovies.length < 8) {
        dramaMovies.push(...dramaMovies.slice(0, 8 - dramaMovies.length));
      }
      return dramaMovies.slice(0, 8);
    })(),
  },
  {
    id: 'thriller',
    title: 'RevenueCat',
    movies: (() => {
      const thrillerMovies = movies.filter(movie => movie.genre.includes('Thriller'));
      while (thrillerMovies.length < 8) {
        thrillerMovies.push(...thrillerMovies.slice(0, 8 - thrillerMovies.length));
      }
      return thrillerMovies.slice(0, 8);
    })(),
  },
  {
    id: 'scifi',
    title: 'Tavus',
    movies: (() => {
      const scifiMovies = movies.filter(movie => movie.genre.includes('Sci-Fi') || movie.genre.includes('Fantasy')).slice(0, 8);
      
      // Update with custom images
      const customImages = [
        '/src/assets/1.jpg',  // Box 1
        '/src/assets/2.jpg',  // Box 2
        '/src/assets/3.jpg',  // Box 3
        '/src/assets/4.jpg',  // Box 4
        '/src/assets/5.jpg',  // Box 5
        '/src/assets/1.jpg',  // Box 6 (reuse image 1)
        '/src/assets/2.jpg',  // Box 7 (reuse image 2)
        '/src/assets/3.jpg',  // Box 8 (reuse image 3)
      ];
      
      return scifiMovies.map((movie, index) => ({
        ...movie,
        thumbnail: customImages[index] || movie.thumbnail,
        backdrop: customImages[index] || movie.backdrop,
      }));
    })(),
  },
  {
    id: 'comedy',
    title: 'Comedy Shows',
    movies: (() => {
      const comedyMovies = movies.filter(movie => movie.genre.includes('Comedy'));
      while (comedyMovies.length < 8) {
        comedyMovies.push(...comedyMovies.slice(0, 8 - comedyMovies.length));
      }
      return comedyMovies.slice(0, 8);
    })(),
  },
  {
    id: 'crime',
    title: 'Crime & Mystery',
    movies: (() => {
      const crimeMovies = movies.filter(movie => movie.genre.includes('Crime') || movie.genre.includes('Mystery'));
      while (crimeMovies.length < 8) {
        crimeMovies.push(...crimeMovies.slice(0, 8 - crimeMovies.length));
      }
      return crimeMovies.slice(0, 8);
    })(),
  },
  {
    id: 'action',
    title: 'Action & Adventure',
    movies: (() => {
      const actionMovies = movies.filter(movie => movie.genre.includes('Action') || movie.genre.includes('Adventure'));
      while (actionMovies.length < 8) {
        actionMovies.push(...actionMovies.slice(0, 8 - actionMovies.length));
      }
      return actionMovies.slice(0, 8);
    })(),
  },
];

export const featuredMovie = movies.find(movie => movie.isFeatured) || movies[0];