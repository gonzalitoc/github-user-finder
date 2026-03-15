import { useState, type ChangeEvent, type FormEvent } from "react";
import "../styles/search.css";
import useGithubUser from "../hooks/useGithubUser";

function Search() {
  const [value, setValue] = useState("");
  const [user, setUser] = useState("");

  const { data, loading, error } = useGithubUser(user);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser(value);
    setValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <section>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="text">Ingresa usuario de Github</label>
        <input
          className="input"
          onChange={handleChange}
          type="text"
          id="text"
          value={value}
        />
      </form>

      {loading && <p className="loading">Cargando....</p>}

      {!error ? (
        data && (
          <div className="card">
            <img className="avatar" src={data.avatar_url} alt={data.login} />

            <h2>{data.login}</h2>

            <p>{data.bio}</p>

            <div className="stats">
              <span>Followers: {data.followers}</span>
              <span>Repos: {data.public_repos}</span>
            </div>

            <a href={data.html_url} target="_blank">
              Ver perfil
            </a>
          </div>
        )
      ) : (
        <p className="error">Usuario no encontrado</p>
      )}
    </section>
  );
}

export default Search;
