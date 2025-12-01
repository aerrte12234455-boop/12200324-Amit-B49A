import React from 'react';
import { releasesStyles } from '../../assets/dummyStyles';
import movies from './dummydata'; // <- import the data

const ReleasesPage = () => {
  return (
    <div className={releasesStyles.pageContainer}>
      {/* Header with cinematic font */}
      <div className={releasesStyles.headerContainer}>
        <h1 className={releasesStyles.headerTitle}>
           RELEASES SOON
        </h1>
        <p className={releasesStyles.headerSubtitle}>Latest Movies • Now Showing</p>
      </div>

      {/* Movie Grid */}
      <div className={releasesStyles.movieGrid}>
        {movies.map(movie => (
          <div 
            key={movie.id} 
            className={releasesStyles.movieCard}
          >
            {/* Movie Image with Hover Effect */}
            <div className={releasesStyles.imageContainer}>
              <img 
                src={movie.image} 
                alt={movie.title}
                className={releasesStyles.movieImage}
              />
            </div>

            {/* Movie Info */}
            <div className={releasesStyles.movieInfo}>
              <h3 className={releasesStyles.movieTitle}>{movie.title}</h3>
              <p className={releasesStyles.movieCategory}>{movie.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReleasesPage;
