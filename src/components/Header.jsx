import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
          <Link to="/">
            <img alt="Le logo marvel" />
          </Link>
          <nav>
            <Link to="/">Personnages</Link>
            <Link to="/comics">Comics</Link>
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
