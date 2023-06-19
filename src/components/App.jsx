import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@pages/Header";
import Home from "@pages/Home";
import Detail from "@components/Details";
import Footer from "@pages/Footer";
import PageNotFound from "@pages/PageNotFound";
import Movies from "@pages/Movies";
import Series from "@pages/Series";
import Popular from "@pages/Anime";
import Anime from "@pages/Anime";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/series" element={<Series />}></Route>
        <Route path="/anime" element={<Anime />}></Route>
        <Route path="/details/:id" element={<Detail />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
