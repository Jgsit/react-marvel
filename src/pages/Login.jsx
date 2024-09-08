import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function Login({ isFromFavoris, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      console.log(`${import.meta.env.VITE_API_URL}/user/login`);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        { email: email, password: password }
      );
      if (response.data.token) {
        setUser(response.data.token);
        setIsLoading(false);
        if (isFromFavoris) {
          navigate("/favoris");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      if (error.status === 401 || error.status === 400) {
        setErrorMessage("Mauvais email et/ou mot de passe");
        setIsLoading(false);
      }
      console.log(error.message);
    }
  };

  return (
    <main>
      <div className="container connection-page">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="email">
            <label>Email:</label>
            <input
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage("");
              }}
              value={email}
              name="email"
              placeholder="Adresse email"
              required
            />
            <FaCheckCircle size={22} />
          </div>
          <div className="password">
            <label>Mot de passe:</label>
            <input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
              name="password"
              placeholder="Mot de passe"
              minLength="6"
              required
            />
            <FaCheckCircle size={22} />
            <p>Le mot de passe doit faire au moins 6 symboles de long</p>
          </div>
          <span>{errorMessage}</span>
          <button type="submit" disabled={isLoading ? true : false}>
            Se connecter
          </button>
        </form>
        <button
          type="button"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Pas encore de compte ? Inscrit-toi !
        </button>
      </div>
    </main>
  );
}

export default Login;
