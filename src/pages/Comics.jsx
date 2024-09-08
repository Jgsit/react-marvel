import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import SearchPagination from "../components/SearchPagination";

export default function Comics({ token }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comicSearch, setComicSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comics`,
          {
            params: {
              skip: 100 * (page - 1),
              limit: 100,
              title: comicSearch,
            },
          }
        );
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
    <main>
      <div className="container">
        <div className="loading-screen">Loading ...</div>
      </div>
    </main>
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
          isBottom={false}
        />
        <div className="card-wrapper comics-card">
          {data.data.result.map((comic) => {
            return <Card key={comic._id} data={comic} token={token} />;
          })}
        </div>
        <SearchPagination
          setPage={setPage}
          page={page}
          totalPages={totalPages}
          isBottom={true}
        />
      </div>
    </main>
  );
}
