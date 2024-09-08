import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useParams } from "react-router-dom";

export default function Personnage() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/character/${id}`
        );
        setData(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <main>
      <div className="container">
        <div className="loading-screen">Loading ...</div>
      </div>
    </main>
  ) : (
    <main>
      <div className="container">
        <h1>{data.data.character.name}</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: 30 }}>
          <img src={data.data.character.picture} alt="" />
          <span style={{ width: "20vw" }}>
            {data.data.character.description}
          </span>
        </div>
        <h2 className="find">
          Retrouve {data.data.character.name} dans les comics suivant :
        </h2>
        <div className="card-wrapper comics-card">
          {data.data.comics.map((comic) => {
            return <Card key={comic._id} data={comic} />;
          })}
        </div>
      </div>
    </main>
  );
}
