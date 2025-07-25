import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import { Favourites } from "./pages/Favourites";
import { Header } from "./components/Header";
import { AudioPlayer } from "./components/AudioPlayer";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetail />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
      <AudioPlayer />
    </>
  );
}
