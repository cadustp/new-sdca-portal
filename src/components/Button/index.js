import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './styles';

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

const defaultProps = {
  onClick: () => {},
};

const Button = ({ children, onClick, ...props }) => (
  <StyledButton {...props} onClick={onClick}>
    {children}
  </StyledButton>
);

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

export default Button;
