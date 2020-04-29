import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Hyperlink = ({
  url, name,
}) => (
  <Link to={url}>
    {name}
  </Link>
);

Hyperlink.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Hyperlink;
