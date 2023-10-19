/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';

import TableGenericRow from '../TableGenericRow';

import { StyledTable, InnerRowContainer } from './styles';

const RenderDefaultHeader = width => (
  <TableGenericRow header width={width}>
    <InnerRowContainer />
  </TableGenericRow>
);

const RenderDefaultRow = () => (
  <TableGenericRow>
    <InnerRowContainer />
  </TableGenericRow>
);

const Table = ({
  headerRowRenderer,
  rowRenderer,
  noRowsRenderer,
  ...tableProps
}) => (
  <AutoSizer>
    {({ height, width }) => (
      <StyledTable
        height={height}
        width={width}
        {...tableProps}
        headerRowRenderer={props => headerRowRenderer(props, width)}
        rowRenderer={rowRenderer}
        noRowsRenderer={noRowsRenderer}
      />
    )}
  </AutoSizer>
);

Table.propTypes = {
  headerRowRenderer: PropTypes.func,
  rowHeight: PropTypes.number,
  rowRenderer: PropTypes.func,
  noRowsRenderer: PropTypes.func,
};

Table.defaultProps = {
  headerRowRenderer: RenderDefaultHeader,
  rowHeight: 80,
  rowRenderer: RenderDefaultRow,
  noRowsRenderer: null,
};

export default Table;
