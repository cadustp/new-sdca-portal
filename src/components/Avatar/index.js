import React from 'react';
import PropTypes from 'prop-types';

import { light } from '../../styles/palette';
import { StyledAvatar } from './styles';

const Avatar = ({
  children, color, width, height, empty,
}) => (
  <StyledAvatar empty={empty ? empty : undefined} color={color} width={width} height={height}>
    {children}
  </StyledAvatar>
);

Avatar.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  empty: PropTypes.bool,
};

Avatar.defaultProps = {
  color: light.primary,
  width: 24,
  height: 24,
  empty: false,
};

export default Avatar;
