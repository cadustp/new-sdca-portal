import React from 'react';
import PropTypes from 'prop-types';

import {
  OuterRowContainer,
  InnerRowContainer,
  OuterHeaderContainer,
} from './styles';

const TableCell = ({
  header, width, children, style, styleInner,
}) => (header ? (
  <OuterHeaderContainer width={width} style={style}>
    <InnerRowContainer style={styleInner}>{children}</InnerRowContainer>
  </OuterHeaderContainer>
) : (
  <OuterRowContainer style={style}>
    <InnerRowContainer style={styleInner} hover>{children}</InnerRowContainer>
  </OuterRowContainer>
));

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.bool,
  width: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.any),
  styleInner: PropTypes.objectOf(PropTypes.any),
};

TableCell.defaultProps = {
  header: false,
  width: null,
  style: {},
  styleInner: {},
};

export default TableCell;
