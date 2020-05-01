import React from 'react';
import PropTypes from 'prop-types';

// Styles
import * as Styled from './bannerStyles';

const Banner = ({ imgUrl }) => (
  <Styled.Banner imgUrl={imgUrl} />
);

Banner.propTypes = {
  imgUrl: PropTypes.string,
};

Banner.defaultProps = {
  imgUrl: 'http://localhost:3000/img/default.jpg',
};

export default Banner;
