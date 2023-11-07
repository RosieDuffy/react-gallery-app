import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

// Main App components import section //

import apiKey from "./config";
import Nav from "./components/Nav";
import Search from "./components/Search";
import PhotoList from "./components/PhotoList";
import NotFound from "./components/NotFound";

function App() {
  const [pics, setPics] = useState([]);
  const [query, setQuery] = useState("cats");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // set loading state while data is being fetched
    setLoading(true);
    // activeFetch to track latest data fetch
    let activeFetch = true;
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        if (activeFetch) {
          setPics(response.data.photos.photo);
          // set loading state to false as the data has now been fetched
          setLoading(false);
        }
      })
      .catch((error) => {
        // handle error
        console.log("Error fetching and parsing data", error);
      });
    return () => {
      activeFetch = false;
    };
  }, [query]);

  // handleQueryChange function to set the query parameter
  const handleQueryChange = (searchText) => {
    setQuery(searchText);
  };

  return (
    <div className="container">
      <Search changeQuery={handleQueryChange} />
      <Nav />
      {/* Display loading message while data is being fetched, then activate the routes */}
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate replace to="/cats" />} />

          <Route
            path="search/:query"
            element={<PhotoList data={pics} changeQuery={handleQueryChange} />}
          />
          <Route
            path="/cats"
            element={
              <PhotoList
                data={pics}
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
                changeQuery={handleQueryChange}
                subject={"computers"}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
