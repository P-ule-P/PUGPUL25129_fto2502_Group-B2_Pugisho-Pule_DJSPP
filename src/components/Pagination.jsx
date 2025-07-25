import React from "react";

/**
 * Pagination component
 * @param {number} currentPage - Active page number
 * @param {number} totalPages - Total number of pages
 * @param {Function} onPageChange - Callback for page number click
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      {[...Array(totalPages).keys()].map((num) => (
        <button
          key={num}
          className={`page-btn ${num + 1 === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(num + 1)}
        >
          {num + 1}
        </button>
      ))}
    </div>
  );
}
