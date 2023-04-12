import { useEffect, useState } from 'react';

export function Weather() {
  const [data, setData] = useState(null);
  const [inputs, setInputs] = useState({
    city: '',
    country: 'US',
  });
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geo) => {
      setPosition({
        lat: geo.coords.latitude,
        lon: geo.coords.longitude,
      });
    }, console.warn);
  }, []);

  useEffect(() => {
    if (!position) {
      return;
    }

    const { lat, lon } = position;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=8feb7eed04a11a56e7ac15279797d21d`
    )
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setInputs({
          country: d.sys.country,
          city: d.name,
        });
      });
  }, [position]);

  function handleInputChange(e) {
    // const newInputs = { ...inputs };
    // newInputs[e.target.name] = e.target.value;
    // setInputs(newInputs);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputs.city},${inputs.country}&units=metric&appid=8feb7eed04a11a56e7ac15279797d21d`
    )
      .then((res) => res.json())
      .then((d) => setData(d));
  }

  return (
    <>
      <h1>Weather</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={inputs.city}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="country">Country</label>
          <select
            type="text"
            name="country"
            id="country"
            value={inputs.country}
            onChange={handleInputChange}
          >
            <option value="DE">Germany</option>
            <option value="RO">Romania</option>
            <option value="US">USA</option>
          </select>
        </p>
        <p>
          <button type="submit">Search</button>
        </p>
      </form>
      {!data && <h2>Loading ...</h2>}
      {data && (
        <>
          <p>
            The weather in {data.name} is {data.weather[0].description}.
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={`${data.weather[0].main} icon`}
            width="50"
          />
          <p>The current temperature is: {data.main.temp.toFixed(1)} &deg;C</p>
        </>
      )}
    </>
  );
}
