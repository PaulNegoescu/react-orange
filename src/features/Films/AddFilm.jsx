import clsx from 'clsx';
import styles from './Films.module.css';
import { configureApi } from '~/helpers/apiHelper';
import { useEffect, useState } from 'react';

const { retrieve: getCharacters } = configureApi('characters');
const { retrieve: getPlanets } = configureApi('planets');

export function AddFilm() {
  const [characters, setCharacters] = useState(null);
  const [planets, setPlanets] = useState(null);
  useEffect(() => {
    getCharacters().then(setCharacters);
    getPlanets().then(setPlanets);
  }, []);
  return (
    <>
      <h1>Add a new film</h1>
      <form className={styles.addForm}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />

        <label htmlFor="episode_id">Episode</label>
        <input type="number" id="episode_id" min="0" name="episode_id" />

        <label htmlFor="opening_crawl">Opening Crawl</label>
        <textarea id="opening_crawl" name="opening_crawl"></textarea>

        <label htmlFor="director">Director</label>
        <input type="text" id="director" name="director" />

        <label htmlFor="poster">Poster</label>
        <input type="url" id="poster" name="poster" />

        <label htmlFor="producer">Producer</label>
        <input type="text" id="producer" name="producer" />

        <label htmlFor="release_date">Release Date</label>
        <input type="date" id="release_date" name="release_date" />

        <span>Characters</span>
        <div className={styles.group}>
          {characters?.map((ch) => (
            <label key={ch.id}>
              <input name="characters" type="checkbox" />
              {ch.name}
            </label>
          ))}
        </div>

        <label htmlFor="planets">Planets</label>
        <input type="hidden" name="planets" />
        <input
          type="text"
          id="planets"
          name="planets_selector"
          list="planets_list"
        />
        <datalist id="planets_list">
          {planets?.map((pl) => (
            <option key={pl.id}>{pl.name}</option>
          ))}
        </datalist>

        <button className={clsx(styles.submitBtn, 'btn btn-accent')}>
          Add Film
        </button>
      </form>
    </>
  );
}
