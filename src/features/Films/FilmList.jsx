import { useEffect, useState } from 'react';
import { Loading } from '~/components';
import { configureApi } from '~/helpers/apiHelper';
import { FilmItem } from './FilmItem';

import styles from './Films.module.css';
import { Link } from 'react-router-dom';

const { retrieve } = configureApi('films');

export function FilmList() {
  const [films, setFilms] = useState(null);

  useEffect(() => {
    retrieve().then((data) => setFilms(data));
  }, []);

  return (
    <>
      <h1>Film List</h1>
      <Link to="add" className="btn">
        Add a new film
      </Link>
      {!films && <Loading />}
      {films && (
        <ul className={styles.filmList}>
          {films.map((film) => (
            <FilmItem key={film.id} film={film} />
          ))}
        </ul>
      )}
    </>
  );
}
