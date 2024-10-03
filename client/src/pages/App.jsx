import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const Header = lazy(() => import("./Header.jsx"));
const Home = lazy(() => import("./Home.jsx"));
const Profile = lazy(() => import("./Profile.jsx"));
const PageNotFound = lazy(() => import("./PageNotFound.jsx"));
const Movies = lazy(() => import("./Movies.jsx"));
const Series = lazy(() => import("./Series.jsx"));
const Anime = lazy(() => import("./Anime.jsx"));
const Auth = lazy(() => import("./Auth.jsx"));
const Footer = lazy(() => import("./Footer.jsx"));

const Details = lazy(() => import("@components/Details.jsx"));
const AnimeDetails = lazy(() => import("@components/AnimeDetails.jsx"));

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/animeDetails/:id" element={<AnimeDetails />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
