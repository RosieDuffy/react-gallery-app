const Photo = ({ server, id, secret, title }) => {
  return (
    <img
      src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`}
      alt={title}
    />
  );
};

export default Photo;
