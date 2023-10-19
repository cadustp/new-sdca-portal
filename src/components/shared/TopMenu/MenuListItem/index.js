import React from 'react';
import PropTypes from 'prop-types';

import { TopMenuItem } from './styles';

const MenuListItem = ({ children, onClick, choosen }) => (
  <TopMenuItem onClick={onClick} choosen={choosen}>
    <p>{children}</p>
  </TopMenuItem>
);

MenuListItem.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  choosen: PropTypes.bool.isRequired,
};

export default MenuListItem;
