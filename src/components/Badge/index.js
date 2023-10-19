import React from 'react';
import PropTypes from 'prop-types';

import { StyledBadge } from './styles';

const Badge = ({
  children, size, badgeColor, spacing,
}) => (
  <StyledBadge
    size={size}
    badgeColor={badgeColor}
    spacing={spacing}
    color="primary"
    variant="dot"
  >
    {children}
  </StyledBadge>
);

Badge.propTypes = {
  badgeColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
  spacing: PropTypes.number,
};

Badge.defaultProps = {
  badgeColor: '#ECC15F',
  size: 8,
  spacing: 0,
};

export default Badge;
