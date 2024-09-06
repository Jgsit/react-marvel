import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import SearchPagination from "../components/SearchPagination";

export default function Comics({ token, openLoginModal }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comicSearch, setComicSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comics`, {
          params: {
            skip: 100 * (page - 1),
            limit: 100,
            title: comicSearch,
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
  }, [page, comicSearch]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main>
      <div className="container">
        <h1>Comics</h1>
        <SearchPagination
          setPage={setPage}
          page={page}
          totalPages={totalPages}
          setSearch={setComicSearch}
          search={comicSearch}
        />
        <div className="card-wrapper comics-card">
          {data.data.result.map((comic) => {
            return (
              <Card
                key={comic._id}
                data={comic}
                token={token}
                openLoginModal={openLoginModal}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
