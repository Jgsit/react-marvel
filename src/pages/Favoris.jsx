import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Card from "../components/Card";
import SearchPagination from "../components/SearchPagination";

function Favoris({ setIsFromFavoris, token }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModified, setIsModified] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/favoris?token=${token}`
        );
        setData(response);
        setTotalPages(Math.ceil(response.data.count / 100));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setIsFromFavoris(false);
    setIsModified(false);
  }, [isModified]);

  return token ? (
    <main>
      <div className="container">
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <>
            <h1>Favoris</h1>
            <SearchPagination
              setPage={setPage}
              page={page}
              totalPages={totalPages}
              setSearch={setSearch}
              search={search}
            />
            <div className="card-wrapper">
              {data.data.favoris.map((favori) => {
                let isCharacter = false;
                if (favori.name) {
                  isCharacter = true;
                }
                return (
                  <Card
                    key={favori._id}
                    token={token}
                    data={
                      isCharacter
                        ? {
                            name: favori.name,
                            description: favori.description,
                            picture: favori.picture,
                            _id: favori._id,
                          }
                        : {
                            title: favori.title,
                            description: favori.description,
                            picture: favori.picture,
                            _id: favori._id,
                          }
                    }
                    setIsModified={setIsModified}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  ) : (
    <Navigate to="/" state={{ fromFavoris: true }} />
  );
}

export default Favoris;
