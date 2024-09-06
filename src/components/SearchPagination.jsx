export default function SearchPagination({
  setPage,
  page,
  totalPages,
  setSearch,
  search,
}) {
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  const handleFirstPage = () => {
    if (page > 1) {
      setPage(1);
    }
  };
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleLastPage = () => {
    if (page < totalPages) {
      setPage(totalPages);
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="Entrer votre recherche"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
      {totalPages !== 1 && totalPages !== 0 && (
        <nav>
          <button onClick={handleFirstPage} disabled={page === 1}>
            &lt;&lt;
          </button>
          <button onClick={handlePrevPage} disabled={page === 1}>
            &lt;
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages || totalPages === 0}
          >
            &gt;
          </button>
          <button
            onClick={handleLastPage}
            disabled={page === totalPages || totalPages === 0}
          >
            &gt;&gt;
          </button>
        </nav>
      )}
    </>
  );
}
