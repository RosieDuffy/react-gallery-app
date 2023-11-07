import { useEffect } from "react";
import Photo from "./Photo";
import { useParams } from "react-router-dom";

const PhotoList = ({ data, subject, changeQuery }) => {
  let { query } = useParams();

  useEffect(() => {
    if (subject) {
      changeQuery(subject);
    } else {
      changeQuery(query);
    }
  });

  const photos = data.map((result) => (
    <Photo
      url={`https://live.staticflickr.com/${result.server}/${result.id}_${result.secret}_w.jpg`}
      title={result.title}
      key={result.id}
    />
  ));
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

export default PhotoList;
