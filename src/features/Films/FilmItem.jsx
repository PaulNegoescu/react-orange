import { Link } from 'react-router-dom';

export function FilmItem({ film }) {
  return (
    <li>
      <Link to={film.id.toString()}>
        <img src={film.poster} alt={`Poster for ${film.title}`} />
        <h3>{film.title}</h3>
      </Link>
    </li>
  );
}
