import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/MarvelLogo.png";

export default function Header({
  openLoginModal,
  openSignupModal,
  setIsFromFavoris,
  token,
  setToken,
}) {
  const navigate = useNavigate();

  const handleRedirectFavoris = () => {
    token ? navigate("/favoris") : (setIsFromFavoris(true), openLoginModal());
  };

  const handleDeconnect = () => {
    Cookies.remove("token");
    setToken(null);
  };

  return (
    <header>
      <div className="container">
        <div className="wrapper">
          <nav className="pages">
            <Link to="/">Personnages</Link>
            <Link to="/comics">Comics</Link>
          </nav>
          <Link to="/">
            <img src={logo} alt="Le logo marvel" />
          </Link>
          <nav>
            <button onClick={handleRedirectFavoris}>Favoris</button>
            <div className="connection">
              {token ? (
                <button onClick={handleDeconnect}>Se deconnecter</button>
              ) : (
                <>
                  <button onClick={openLoginModal}>Login</button>
                  <button onClick={openSignupModal}>Signup</button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
