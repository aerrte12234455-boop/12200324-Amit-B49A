import React from "react";
import { Tickets } from "lucide-react";
import { Link } from "react-router-dom";
import movies from "./dummymoviedata";
import { moviesStyles } from "../../assets/dummyStyles";

export default function Movies() {
  // show only the first 6 movies
  const visibleMovies = movies.slice(0, 6);

  return (
    <section className={moviesStyles.container}>
      {/* import Google fonts used below */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Pacifico&display=swap');
      `}</style>

      <h2
        className={moviesStyles.title}
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        Featured Movies
      </h2>

      <div className={moviesStyles.grid}>
        {visibleMovies.map((m) => (
          <article
            key={m.id}
            className={moviesStyles.movieArticle}
            aria-labelledby={`movie-title-${m.id}`}
          >
            <Link
              to={`/movie/${m.id}`}
              className={moviesStyles.movieLink}
              aria-label={`Open ${m.title} details`}
            >
              <img
                src={m.img}
                alt={m.title}
                loading="lazy"
                className={moviesStyles.movieImage}
              />
            </Link>

            {/* title + category below */}
            <div className={moviesStyles.movieInfo}>
              <div className={moviesStyles.titleContainer}>
                <Tickets className={moviesStyles.ticketsIcon} aria-hidden="true" />
                <span
                  id={`movie-title-${m.id}`}
                  className={moviesStyles.movieTitle}
                  style={{ fontFamily: "'Pacifico', cursive" }}
                >
                  {m.title}
                </span>
              </div>

              {/* category shown below the title */}
              <div className={moviesStyles.categoryContainer}>
                <span className={moviesStyles.categoryText}>
                  {m.category}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
