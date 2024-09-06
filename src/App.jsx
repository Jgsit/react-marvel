import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Cookies from "js-cookie";

// Pages
import Personnages from "./pages/Personnages";
import Comics from "./pages/Comics";

// Components
import Header from "./components/Header";
import Personnage from "./pages/Personnage";
import Footer from "./components/Footer";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Favoris from "./pages/Favoris";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isFromFavoris, setIsFromFavoris] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || null);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
    document.body.style.overflow = "hidden";
  };

  const openSignupModal = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
    document.body.style.overflow = "hidden";
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    document.body.style.overflow = "unset";
  };

  return (
    <Router>
      <Header
        openLoginModal={openLoginModal}
        openSignupModal={openSignupModal}
        setIsFromFavoris={setIsFromFavoris}
        token={token}
        setToken={setToken}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Personnages token={token} openLoginModal={openLoginModal} />
          }
        />
        <Route
          path="/comics"
          element={<Comics token={token} openLoginModal={openLoginModal} />}
        />
        <Route path="/personnage/:id" element={<Personnage />} />
        <Route
          path="/favoris"
          element={
            <Favoris setIsFromFavoris={setIsFromFavoris} token={token} />
          }
        />
      </Routes>
      <Footer />
      {showLoginModal && (
        <Login
          closeModal={closeModals}
          isFromFavoris={isFromFavoris}
          openSignupModal={openSignupModal}
          setUser={setUser}
        />
      )}
      {showSignupModal && (
        <Signup
          closeModal={closeModals}
          setUser={setUser}
          openLoginModal={openLoginModal}
        />
      )}
    </Router>
  );
}

export default App;
