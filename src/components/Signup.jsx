import axios from "axios";
import { useState } from "react";

function Signup({ closeModal, setUser, openLoginModal }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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
        closeModal();
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
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <label>
            Pseudo:
            <input
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              placeholder="Nom d'utilisateur"
              type="text"
            />
          </label>
          <label>
            Email:
            <input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage("");
              }}
              placeholder="Adresse email"
              type="email"
            />
          </label>
          <label>
            Mot de passe:
            <input
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Mot de passe"
              type="password"
            />
          </label>
          <span>{errorMessage}</span>
          <button type="submit">S'inscrire</button>
        </form>
        <button onClick={openLoginModal}>
          Tu as déjà un compte ? Connecte-toi !
        </button>
      </div>
    </div>
  );
}

export default Signup;
