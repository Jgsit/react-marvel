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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favoris from "./pages/Favoris";

function App() {
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

  return (
    <Router>
      <Header
        setIsFromFavoris={setIsFromFavoris}
        token={token}
        setToken={setToken}
      />
      <Routes>
        <Route path="/" element={<Personnages token={token} />} />
        <Route path="/comics" element={<Comics token={token} />} />
        <Route path="/personnage/:id" element={<Personnage />} />
        <Route
          path="/favoris"
          element={
            <Favoris setIsFromFavoris={setIsFromFavoris} token={token} />
          }
        />
        <Route
          path="/login"
          element={<Login isFromFavoris={isFromFavoris} setUser={setUser} />}
        />
        <Route
          path="/signup"
          element={<Signup setUser={setUser} isFromFavoris={isFromFavoris} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
