import axios from "axios";
import { useEffect, useState } from "react";

export default function Card({ data, token, openLoginModal, setIsModified }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCharacter, setIsCharacter] = useState(true);

  useEffect(() => {
    if (token) {
      if (data.title) {
        setIsCharacter(false);
      }
      const fetchData = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/favoris?token=${token}`
        );
        for (let i = 0; i < response.data.favoris.length; i++) {
          if (response.data.favoris[i]._id.includes(data._id)) {
            setIsFavorite(true);
          }
        }
      };
      fetchData();
    } else {
      setIsFavorite(false);
    }
  }, [isFavorite, token, data]);
  /*
  const handleFavorite = (e) => {
    e.preventDefault();

    const favoriteCharacters = Cookies.get("favorites")
      ? Cookies.get("favorites").split(" ")
      : [];

    let updatedFavorites = [];
    if (favoriteCharacters.includes(data._id)) {
      for (let i = 0; i < favoriteCharacters.length; i++) {
        if (favoriteCharacters[i] !== data._id) {
          updatedFavorites[i] = favoriteCharacters[i];
        }
      }
      setIsFavorite(false);
    } else {
      for (let i = 0; i < favoriteCharacters.length; i++) {
        updatedFavorites[i] = favoriteCharacters[i];
      }
      updatedFavorites.push(data._id);
      setIsFavorite(true);
    }
    Cookies.set("favorites", updatedFavorites, { expires: 7 }); // 7 jours d'expiration
    console.log(
      `${data.name} ${isFavorite ? "retiré des" : "ajouté aux"} favoris.`
    );
  };*/

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (token) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/user/favoris`,
          { token: token, id: data._id, isCharacter: isCharacter }
        );
        if (response.data.favoris.length === 0) {
          setIsFavorite(false);
        }
        for (let i = 0; i < response.data.favoris.length; i++) {
          if (response.data.favoris[i]._id.includes(data._id)) {
            setIsFavorite(true);
            break;
          } else {
            setIsFavorite(false);
          }
        }
        setIsModified(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      openLoginModal();
    }
  };

  return (
    <article>
      <h2>{data.name || data.title}</h2>
      <p>{data.description}</p>
      <img src={`${data.picture}`} alt={data.name || data.title} />
      <div className="favorite" onClick={handleFavorite}>
        {isFavorite ? "❤️" : "♡"}
      </div>
    </article>
  );
}
