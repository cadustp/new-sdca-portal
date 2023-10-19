/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';
import Badge from '@material-ui/core/Badge';

export const StyledBadge = styled(({ size, ...otherProps }) => (
  <Badge {...otherProps} classes={{ root: 'root' }} />
))`
  span {
    background-color: ${props => props.badgeColor};
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    top: ${props => props.spacing}px;
    right: ${props => props.spacing}px;
  }
`;
