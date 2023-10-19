import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  CellMeasurer,
  CellMeasurerCache,
  List,
  AutoSizer,
} from 'react-virtualized';
import { ScrollableDiv, SizerWrapper } from './styles';

const cache = new CellMeasurerCache({
  fixedWidth: true,
});

class MenuList extends Component {
  rowRenderer = ({
    index, key, parent,
  }) => (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={key}
      parent={parent}
      rowIndex={index}
    >
      <div key={key}>
        {this.rows[index]}
      </div>
    </CellMeasurer>
  );

  render() {
    const {
      children,
      selectProps: { lineHeight },
    } = this.props;
    this.rows = children instanceof Array ? children : [children];
    cache.clearAll();
    const scrollableDivHeight = this.rows.length > 4 ? 128 : this.rows.length * lineHeight;
    return (
      <ScrollableDiv height={scrollableDivHeight}>
        {/* Nao pode ser removido. Garante scrolling */}
        <SizerWrapper height={this.rows.length * lineHeight}>
          {/* Tem que ser position absolute para garantir scrolling */}
          <AutoSizer>
            {({ width, height }) => (
              <List
                height={height}
                width={width}
                rowHeight={lineHeight}
                rowCount={this.rows.length}
                rowRenderer={this.rowRenderer}
                deferredMeasurementCache={cache}
              />
            )}
          </AutoSizer>
        </SizerWrapper>
      </ScrollableDiv>
    );
  }
}

MenuList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  lineHeight: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  // eslint-disable-next-line react/forbid-prop-types
  selectProps: PropTypes.object.isRequired,
};

MenuList.defaultProps = {
  lineHeight: 32.64,
};

export default MenuList;
