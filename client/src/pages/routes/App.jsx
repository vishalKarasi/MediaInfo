import React, { lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "@app/services/authSlice.js";
import { getUser } from "@app/services/userSlice.js";

const PrivateRoute = lazy(() => import("./PrivateRoute.jsx"));

const Header = lazy(() => import("../Header.jsx"));
const Home = lazy(() => import("../Home.jsx"));
const Profile = lazy(() => import("../Profile.jsx"));
const PageNotFound = lazy(() => import("../PageNotFound.jsx"));
const Movies = lazy(() => import("../Movies.jsx"));
const Series = lazy(() => import("../Series.jsx"));
const Anime = lazy(() => import("../Anime.jsx"));
const Auth = lazy(() => import("../Auth.jsx"));
const Footer = lazy(() => import("../Footer.jsx"));

const Details = lazy(() => import("@components/Details.jsx"));
const AnimeDetails = lazy(() => import("@components/AnimeDetails.jsx"));

function App() {
  const dispatch = useDispatch();
  const { accessToken, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) dispatch(getUser(userId));
  }, [userId]);

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
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
