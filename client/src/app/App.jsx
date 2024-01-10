import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LazyLoad from "./utils/LazyLoad.js";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./services/authSlice.js";
import ProtectedRoute from "./utils/ProtectedRoute";
import { getUser } from "./services/userSlice.js";

const Header = LazyLoad("../../pages/Header.jsx");
const Home = LazyLoad("../../pages/Home.jsx");
const Profile = LazyLoad("../../pages/Profile.jsx");
const Detail = LazyLoad("../../components/Details.jsx");
const Footer = LazyLoad("../../pages/Footer.jsx");
const PageNotFound = LazyLoad("../../pages/PageNotFound.jsx");
const Movies = LazyLoad("../../pages/Movies.jsx");
const Series = LazyLoad("../../pages/Series.jsx");
const Anime = LazyLoad("../../pages/Anime.jsx");
const AnimeDetails = LazyLoad("../../components/AnimeDetails.jsx");
const Auth = LazyLoad("../../pages/Auth.jsx");

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
        <Route path="/details/:id" element={<Detail />} />
        <Route path="/animeDetails/:id" element={<AnimeDetails />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
