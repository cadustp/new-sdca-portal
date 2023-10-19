import React from 'react';
import PropTypes from 'prop-types';
import StyledDrawer from './styles';

const SideBar = (props) => {
  const {
    active, leftToRight, content, onClose,
  } = props;
  return (
    <StyledDrawer
      anchor={leftToRight ? 'left' : 'right'}
      open={active}
      onClose={onClose}
    >
      {content}
    </StyledDrawer>
  );
};

SideBar.propTypes = {
  active: PropTypes.bool,
  leftToRight: PropTypes.bool,
  content: PropTypes.object,
  onClose: PropTypes.func,
};

SideBar.defaultProps = {
  leftToRight: false,
};

export default SideBar;
