import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ closeModal, isFromFavoris, setUser, openSignupModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        { email: email, password: password }
      );
      if (response.data.token) {
        setUser(response.data.token);
        setIsLoading(false);
        if (isFromFavoris) {
          navigate("/favoris");
        }
        closeModal();
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
    <div
      className="modal-root"
      onClick={() => {
        closeModal();
      }}
    >
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage("");
              }}
              placeholder="Adresse email"
            />
          </label>
          <label>
            Mot de passe:
            <input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Mot de passe"
            />
          </label>
          <span>{errorMessage}</span>
          <button type="submit" disabled={isLoading ? true : false}>
            Se connecter
          </button>
        </form>
        <button type="button" onClick={openSignupModal}>
          Pas encore de compte ? Inscrit-toi !
        </button>
      </div>
    </div>
  );
}

export default Login;
