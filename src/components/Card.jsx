import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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
        {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
      </div>
    </article>
  );
}
