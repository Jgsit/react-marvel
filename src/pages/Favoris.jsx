import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Card from "../components/Card";

function Favoris({ setIsFromFavoris, token }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isModified, setIsModified] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/user/favoris?token=${token}&name=${search}`
        );
        setData(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setIsFromFavoris(false);
    setIsModified(false);
  }, [isModified, search]);

  return token ? (
    <main>
      <div className="container">
        {isLoading ? (
          <main>
            <div className="container">
              <div className="loading-screen">Loading ...</div>
            </div>
          </main>
        ) : (
          <div className="favoris-page">
            <h1>Favoris</h1>
            {data.data.count === 0 ? (
              <div className="no-favoris">
                <p>
                  Il semblerai que tu n'es pas encore de favoris.
                  <br />
                  Tu peux en ajouter sur les pages <span>
                    Personnages
                  </span> et <span>Comics</span>.
                </p>
                <div className="redirect-card">
                  <Link to={"/"} className="personnages">
                    <article className="personnages"></article>
                  </Link>
                  <Link to={"/comics"} className="comics">
                    <article className="comics"></article>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Entrer votre recherche"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <div className="card-wrapper">
                  {data.data.favoris.map((favori) => {
                    let isCharacter = false;
                    if (favori.name) {
                      isCharacter = true;
                    }
                    return isCharacter ? (
                      <Link
                        className="background-gradient"
                        key={favori._id}
                        to={`/personnage/${favori._id}`}
                      >
                        {
                          <Card
                            token={token}
                            data={{
                              name: favori.name,
                              description: favori.description,
                              picture: favori.picture,
                              _id: favori._id,
                            }}
                            setIsModified={setIsModified}
                          />
                        }
                      </Link>
                    ) : (
                      <div
                        className="background-gradient comics"
                        key={favori._id}
                      >
                        {
                          <Card
                            token={token}
                            data={{
                              title: favori.title,
                              description: favori.description,
                              picture: favori.picture,
                              _id: favori._id,
                            }}
                            setIsModified={setIsModified}
                          />
                        }
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  ) : (
    <Navigate to="/login" state={{ fromFavoris: true }} />
  );
}

export default Favoris;
