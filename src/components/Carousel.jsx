import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendedShows } from "../utils/api";
import { genres } from "../data/genres";
import "../styles/Carousel.css";

/**
 * Carousel component that displays horizontally scrollable recommended podcast shows.
 * Fetches shows on mount and displays them with navigation arrows.
 * Clicking a show navigates to its detail page.
 * @component
 */
export const Carousel = () => {
  const [shows, setShows] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getRecommendedShows().then(setShows);
  }, []);

  /**
   * Scrolls the carousel left or right. Loops when reaching the end/start.
   * @param {"left" | "right"} dir - Direction to scroll
   */
  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = 300;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (dir === "right") {
      if (el.scrollLeft + scrollAmount >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" }); // loop to start
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      if (el.scrollLeft - scrollAmount <= 10) {
        el.scrollTo({ left: maxScroll, behavior: "smooth" }); // loop to end
      } else {
        el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-header">
        <img
          src="/assets/logo-2.gif"
          alt="Podcast Logo"
          className="carousel-logo"
        />
        Recommended Shows
      </h2>
      <div className="carousel-controls">
        <button className="carousel-btn" onClick={() => scroll("left")}>
          ⬅
        </button>
        <button className="carousel-btn" onClick={() => scroll("right")}>
          ➡
        </button>
      </div>
      <div className="carousel" ref={scrollRef}>
        {shows.map((show) => (
          <div
            key={show.id}
            className="carousel-item"
            onClick={() => navigate(`/show/${show.id}`)}
          >
            <img src={show.image} alt={show.title} />
            <div className="carousel-info">
              <strong>{show.title}</strong>
              <p className="genres">
                {genres
                  .filter((genre) => genre.shows.includes(show.id.toString()))
                  .map((genre) => genre.title)
                  .join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
