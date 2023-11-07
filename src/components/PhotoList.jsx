import React, { useEffect } from "react";
import Photo from "./Photo";

const PhotoList = ({ data, subject, changeQuery }) => {
  useEffect(() => {
    if (subject) {
      changeQuery(subject);
    }
  });

  const photos = data.map((result) => (
    <Photo id={result.id} secret={result.secret} server={result.server} />
  ));

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        {photos.map((photo) => (
          <li>{photo}</li>
        ))}
      </ul>
    </div>
  );
};

export default PhotoList;
