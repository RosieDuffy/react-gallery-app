import { useEffect } from "react";
import Photo from "./Photo";
import { useParams } from "react-router-dom";
import { PropTypes } from "prop-types";

const PhotoList = ({ data, subject, changeQuery }) => {
  let { query } = useParams();

  // if subject is provided in props, use subject to retrieve data, if not use the query in params
  useEffect(() => {
    if (subject) {
      changeQuery(subject);
    } else {
      changeQuery(query);
    }
  });

  // map over the data to return a Photo component for each result and store in photos array
  const photos = data.map((result) => (
    <Photo
      url={`https://live.staticflickr.com/${result.server}/${result.id}_${result.secret}_w.jpg`}
      title={result.title}
      key={result.id}
    />
  ));

  // if photos array is not empty, then map over array and return list items
  // if not, return a no results message
  if (photos.length > 0) {
    return (
      <div className="photo-container">
        <h2>
          {subject ? `Results for: "${subject}"` : `Results for "${query}"`}
        </h2>
        <ul>
          {photos.map((photo) => (
            <li key={photo.key}>{photo}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="photo-container">
        <h2>Results for: "{query}"</h2>
        <h3>Sorry, there were no results for your search. Please try again</h3>
      </div>
    );
  }
};

PhotoList.propTypes = {
  data: PropTypes.array.isRequired,
  subject: PropTypes.string,
  changeQuery: PropTypes.func,
};

export default PhotoList;
