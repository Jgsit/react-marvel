import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/MarvelLogo.png";

export default function Header({ setIsFromFavoris, token, setToken }) {
  const navigate = useNavigate();

  const handleRedirectFavoris = () => {
    token ? navigate("/favoris") : (setIsFromFavoris(true), navigate("/login"));
  };

  const handleDeconnect = () => {
    Cookies.remove("token");
    setToken(null);
  };

  return (
    <header>
      <div className="container">
        <div className="wrapper">
          <nav>
            <Link to="/">Personnages</Link>
            <Link to="/comics">Comics</Link>
          </nav>
          <Link to="/">
            <img src={logo} alt="Le logo marvel" />
          </Link>
          <nav>
            <button className="favoris" onClick={handleRedirectFavoris}>
              Favoris
            </button>
            <div className="connection">
              {token ? (
                <button onClick={handleDeconnect}>Se deconnecter</button>
              ) : (
                <>
                  <Link to="/login">Se connecter</Link>
                  <Link to="/signup">S'inscrire</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
