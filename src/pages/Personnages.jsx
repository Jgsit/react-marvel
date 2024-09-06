import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import SearchPagination from "../components/SearchPagination";

export default function Personnages({ token, openLoginModal }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [characterSearch, setCharacterSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/characters`, {
          params: {
            skip: 100 * (page - 1),
            limit: 100,
            name: characterSearch,
          },
        });
        setData(response);
        setTotalPages(Math.ceil(response.data.count / 100));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page, characterSearch]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main>
      <div className="container">
        <h1>Personnages</h1>
        <SearchPagination
          setPage={setPage}
          page={page}
          totalPages={totalPages}
          setSearch={setCharacterSearch}
          search={characterSearch}
        />
        <div className="card-wrapper characters-card">
          {data.data.result.map((character) => {
            return (
              <Link key={character._id} to={`/personnage/${character._id}`}>
                <Card
                  data={character}
                  token={token}
                  openLoginModal={openLoginModal}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
