import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { configureApi } from '~/helpers/apiHelper';

const { retrieve: getFilm } = configureApi('films');
const { retrieve: getCharacters } = configureApi('characters');

export function FilmDetails() {
  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState(null);
  const { filmId } = useParams();

  useEffect(() => {
    async function getData() {
      const data = await getFilm(filmId);
      setFilm(data);
      const chPromises = [];
      for (const characterId of data.characters) {
        chPromises.push(getCharacters(characterId));
      }
      const chArr = await Promise.all(chPromises);
      setCharacters(chArr);
    }

    getData();
  }, [filmId]);

  return (
    <>
      <h1>{film?.title}</h1>
      <ul>
        {characters?.map((ch) => (
          <li key={ch.id}>{ch.name}</li>
        ))}
      </ul>
      <Link to={`/films/${filmId - 1}`}>Prev</Link>
      <Link to={`/films/${+filmId + 1}`}>Next</Link>
    </>
  );
}
