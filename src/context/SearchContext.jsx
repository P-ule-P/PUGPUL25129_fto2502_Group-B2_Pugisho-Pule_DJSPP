import React, { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllPodcasts } from "../utils/api";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [podcasts, setPodcasts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [searchPodcasts, setSearchPodcasts] = useState(
    searchParams.get("search") || ""
  );
  const [genre, setGenre] = useState(searchParams.get("genre") || "all");
  const [sort, setSort] = useState(searchParams.get("sort") || "recent");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync state to URL
  useEffect(() => {
    setSearchParams({
      search: searchPodcasts,
      genre,
      sort,
      page: currentPage,
    });
  }, [searchPodcasts, genre, sort, currentPage, setSearchParams]);

  // Fetch all podcasts
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchAllPodcasts();
        setPodcasts(data);
        setFiltered(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...podcasts];

    if (searchPodcasts.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchPodcasts.toLowerCase())
      );
    }

    if (genre !== "all") {
      result = result.filter((p) => p.genres.includes(Number(genre)));
    }

    if (sort === "title-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "title-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === "recent") {
      result.sort((a, b) => b.updated - a.updated);
    } else if (sort === "oldest") {
      result.sort((a, b) => a.updated - b.updated);
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [searchPodcasts, genre, sort, podcasts]);

  const resetFilters = () => {
    searchPodcasts("");
    setGenre("all");
    setSort("recent");
    setCurrentPage(1);
  };

  return (
    <SearchContext.Provider
      value={{
        searchPodcasts,
        setSearchPodcasts,
        genre,
        setGenre,
        sort,
        setSort,
        currentPage,
        setCurrentPage,
        podcasts,
        filtered,
        loading,
        error,
        resetFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
