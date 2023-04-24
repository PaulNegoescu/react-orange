import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, number, array, date } from 'yup';
import { configureApi } from '~/helpers/apiHelper';
import { Autocomplete } from '~/components';

import styles from './Films.module.css';

const { create } = configureApi('films');
const { retrieve: getCharacters } = configureApi('characters');
const { retrieve: getPlanets } = configureApi('planets');

const schema = object({
  title: string()
    .required('Please provide a valid film title')
    .min(2, 'The title must be at least 2 characters long'),
  episode_id: number().required().min(0),
  opening_crawl: string().required().min(10),
  director: string().required().min(2),
  poster: string().required().url(),
  producer: string().required().min(2),
  release_date: date().required().max(new Date()),
  characters: array().required().of(number().positive()),
  planets: array()
    .required()
    .of(
      object({
        id: string(),
        value: number().positive().integer(),
        label: string(),
      })
    ),
});

export function AddFilm() {
  const [characters, setCharacters] = useState(null);
  const [planets, setPlanets] = useState(null);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  console.log(errors);

  useEffect(() => {
    getCharacters().then(setCharacters);
    getPlanets().then(setPlanets);
  }, []);

  async function handleAddFilm(data) {
    const newFilm = structuredClone(data);
    newFilm.planets = newFilm.planets.map((p) => Number(p.value));
    newFilm.release_date = new Intl.DateTimeFormat().format(
      newFilm.release_date
    );
    // console.log(newFilm);
    // e.preventDefault();
    // const values = new FormData(e.target);
    // const shouldBeArrays = ['characters', 'planets'];

    // const newFilm = {};
    // for (const [name, value] of values) {
    //   if (shouldBeArrays.includes(name)) {
    //     if (!newFilm[name]) {
    //       newFilm[name] = [];
    //     }
    //     newFilm[name].push(Number(value));
    //   } else {
    //     newFilm[name] = value;
    //   }
    // }

    try {
      await toast.promise(create(newFilm), {
        pending: 'Saving the film',
        success: 'Film was added successfully',
        error: 'Oh oh, please try again later',
      });
      navigate(-1);
    } catch (e) {
      console.warn(e);
      return;
    }
  }

  return (
    <>
      <h1>Add a new film</h1>
      <form className={styles.addForm} onSubmit={handleSubmit(handleAddFilm)}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className={clsx({ [styles.invalid]: errors.title })}
        />
        {errors?.title && (
          <p className={styles.fieldError}>{errors.title.message}</p>
        )}

        <label htmlFor="episode_id">Episode</label>
        <input
          type="number"
          id="episode_id"
          min="0"
          {...register('episode_id')}
        />

        <label htmlFor="opening_crawl">Opening Crawl</label>
        <textarea id="opening_crawl" {...register('opening_crawl')}></textarea>

        <label htmlFor="director">Director</label>
        <input type="text" id="director" {...register('director')} />

        <label htmlFor="poster">Poster</label>
        <input type="url" id="poster" {...register('poster')} />

        <label htmlFor="producer">Producer</label>
        <input type="text" id="producer" {...register('producer')} />

        <label htmlFor="release_date">Release Date</label>
        <input type="date" id="release_date" {...register('release_date')} />

        <span>Characters</span>
        <div className={styles.group}>
          {characters?.map((ch) => (
            <label key={ch.id}>
              <input
                {...register('characters')}
                type="checkbox"
                value={ch.id}
              />
              {ch.name}
            </label>
          ))}
        </div>

        <label htmlFor="planets">Planets</label>
        <Autocomplete
          register={register}
          control={control}
          name="planets"
          options={planets?.map((planet) => ({
            value: planet.id,
            label: planet.name,
          }))}
        />

        <button className={clsx(styles.submitBtn, 'btn btn-accent')}>
          Add Film
        </button>
      </form>
    </>
  );
}
