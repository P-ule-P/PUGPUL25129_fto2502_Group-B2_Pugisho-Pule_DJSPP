import React from "react";
import { useSearch } from "../context/SearchContext";
import { PodcastCard } from "../components/PodcastCard";
import Pagination from "../components/Pagination";
import { Filters } from "../components/Filters";
import { Carousel } from "../components/Carousel";
/**
 * Home component that displays the main podcast browsing interface.
 *
 * @component
 * @example
 * return <Home />
 *
 * @description
 * This component serves as the main page for browsing podcasts. It includes:
 * - A carousel of featured podcasts
 * - Filter and sort controls
 * - Paginated grid of podcast cards
 * - Loading and error states
 *
 * @returns {React.ReactElement} The main podcast browsing interface
 *
 * @property {string} genre - Current selected genre filter
 * @property {string} sort - Current sort method
 * @property {number} currentPage - Current pagination page
 * @property {Array} filtered - Filtered and sorted list of podcasts
 * @property {boolean} loading - Loading state indicator
 * @property {string|null} error - Error message if any
 *
 * @uses useSearch - Custom hook for search/filter functionality
 * @uses Carousel - Component displaying featured podcasts
 * @uses Filters - Component for filtering and sorting controls
 * @uses PodcastCard - Component for individual podcast display
 * @uses Pagination - Component for pagination controls
 *
 * @constant {number} ITEMS_PER_PAGE - Number of items to display per page (12)
 */
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
