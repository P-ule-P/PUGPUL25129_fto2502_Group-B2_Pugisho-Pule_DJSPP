import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useSearch } from "../context/SearchContext";

export const Header = () => {
  const { searchPodcasts, setSearchPodcasts } = useSearch();

  return (
    <header className="header">
      <h1 className="header-title">
        <img
          src="/assets/logo-1.gif"
          alt="Podcast Logo"
          className="podcast-logo"
        />
        Binge Podcast
      </h1>
      <div className="header-links">
        <Link className="no-underline" to="/">
          Home
        </Link>
        <div className="logo-container">
          <img
            src="/assets/logo-1.gif"
            alt="Podcast Logo"
            className="podcast-logo-main"
          />
        </div>
        <Link className="no-underline" to="/favourites">
          Favourites
        </Link>
      </div>
      <div className="search-container">
        <Search value={searchPodcasts} onChange={setSearchPodcasts} />
        <img src="/assets/user.png" alt="User Icon" className="user-icon" />
      </div>

      <ThemeToggle />
    </header>
  );
};
