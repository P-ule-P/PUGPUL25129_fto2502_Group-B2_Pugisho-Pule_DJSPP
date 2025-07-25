import React from "react";
import { useSearch } from "../context/SearchContext";
import { PodcastCard } from "../components/PodcastCard";
import Pagination from "../components/Pagination";
import { Filters } from "../components/Filters";
import { Carousel } from "../components/Carousel";

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const {
    genre,
    sort,
    setGenre,
    setSort,
    currentPage,
    setCurrentPage,
    filtered,
    loading,
    error,
  } = useSearch();

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <main className="main-content">
      <Carousel />

      <Filters
        genre={genre}
        setGenre={setGenre}
        sort={sort}
        setSort={setSort}
      />

      {loading && <p className="status">Loading podcasts...</p>}
      {error && <p className="status error">Error: {error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p className="status">No podcasts found.</p>
      )}

      <section className="podcast-grid">
        {currentItems.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}
