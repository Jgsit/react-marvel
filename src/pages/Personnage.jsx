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
          `http://localhost:3000/character/${id}`
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
    <p>Loading ...</p>
  ) : (
    <main>
      <div className="container">
        <h1>{data.data.character.name}</h1>
        <img src={data.data.character.picture} alt="" />
        <p>{data.data.character.description}</p>
        <div className="card-wrapper comics-card">
          {data.data.comics.map((comic) => {
            return <Card key={comic._id} data={comic} />;
          })}
        </div>
      </div>
    </main>
  );
}
