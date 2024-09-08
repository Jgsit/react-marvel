import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function Signup({ setUser, isFromFavoris }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        {
          email: email,
          password: password,
          username: username,
        }
      );
      if (response.data) {
        setUser(response.data.token);
        if (isFromFavoris) {
          navigate("/favoris");
        } else {
          navigate("/");
        }
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      if (error.status === 409) {
        setErrorMessage("Cet email a déjà un compte chez nous !");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir toute les infos");
      } else if (error.status === 400) {
        setErrorMessage(error.response.data.message);
      }
      console.log(error.message);
    }
  };

  return (
    <main>
      <div className="container connection-page">
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="pseudo">
            <label>Pseudo:</label>
            <input
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              placeholder="Nom d'utilisateur"
              type="text"
              required
            />
          </div>
          <div className="email">
            <label>Email:</label>
            <input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage("");
              }}
              placeholder="Adresse email"
              type="email"
              required
            />
          </div>
          <div className="password">
            <label>Mot de passe:</label>
            <input
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Mot de passe"
              type="password"
              minLength="6"
              required
            />
            <FaCheckCircle size={22} />
            <p>Le mot de passe doit faire au moins 6 symboles de long</p>
          </div>
          <span>{errorMessage}</span>
          <button type="submit">S'inscrire</button>
        </form>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Tu as déjà un compte ? Connecte-toi !
        </button>
      </div>
    </main>
  );
}

export default Signup;
