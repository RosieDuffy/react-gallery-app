import { PropTypes } from "prop-types";

const Photo = ({ url, title }) => {
  return <img src={url} alt={title} />;
};

Photo.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};

export default Photo;
