import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

import apiKey from "./config";
import Nav from "./components/Nav";
import Search from "./components/Search";
import PhotoList from "./components/PhotoList";

function App() {
  const [pics, setPics] = useState([]);
  const [query, setQuery] = useState("cats");
  let pageTitle;

  useEffect(() => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        setPics(response.data.photos.photo);
        pageTitle = response.data.photos.page;
      })
      .catch((error) => {
        // handle error
        console.log("Error fetching and parsing data", error);
      });
  }, [query]);

  const handleQueryChange = (searchText) => {
    setQuery(searchText);
  };

  return (
    <div className="container">
      <Search changeQuery={handleQueryChange} />
      <Nav />
      <Routes>
        <Route path="/">
          <Route index element={<Navigate replace to="cats" />} />
        </Route>
        <Route
          path="/cats"
          element={
            <PhotoList
              data={pics}
              pageTitle={pageTitle}
              changeQuery={handleQueryChange}
              subject={"cats"}
            />
          }
        />
        <Route
          path="/dogs"
          element={
            <PhotoList
              data={pics}
              pageTitle={pageTitle}
              changeQuery={handleQueryChange}
              subject={"dogs"}
            />
          }
        />
        <Route
          path="/computers"
          element={
            <PhotoList
              data={pics}
              pageTitle={pageTitle}
              changeQuery={handleQueryChange}
              subject={"computers"}
            />
          }
        />
        <Route
          path="/search/:query"
          element={<PhotoList data={pics} pageTitle={pageTitle} />}
        />
      </Routes>
    </div>
  );
}

export default App;
