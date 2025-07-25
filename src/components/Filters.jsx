import React from "react";
import { genres } from "../data/genres";

/**
 * Filters component for selecting podcast genre and sorting order.
 *
 * @component
 * @param {Object} props
 * @param {string} props.genre - Currently selected genre ID
 * @param {Function} props.setGenre - Function to update selected genre
 * @param {string} props.sort - Currently selected sort value
 * @param {Function} props.setSort - Function to update sort value
 */
export function Filters({ genre, setGenre, sort, setSort }) {
  return (
    <main className="filters">
      <p>Filter by:</p>
      <div className="filter-options">
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.title}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="filter-select"
        >
          <option value="recent">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
        </select>
      </div>
    </main>
  );
}
