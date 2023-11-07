import React from "react";

const Photo = ({ server, id, secret}) => {
  return (
    <img
      src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`}
      alt=""
      key={id}
    />
  );
};

export default Photo;
