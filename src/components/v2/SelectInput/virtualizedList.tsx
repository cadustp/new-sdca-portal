import { 
  CellMeasurer,
  CellMeasurerCache,
  List,
  AutoSizer,
 } from 'react-virtualized';
 import { ScrollableDiv, SizerWrapper } from './styles';

import React from 'react';

type Props = {
  children: any,
  selectProps: any,
}

const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 30,
});

const virtualizedList: React.FC<Props> = ({
  children,
  selectProps: { lineHeight },
}) => {

  const rows = children instanceof Array ? children : [children];

  cache.clearAll();

  const rowRenderer = ({ index, key, parent, style }) => {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
       <div key={key} style={style}>
        { rows[index] }
        </div>
      </CellMeasurer>
    )
  }

  const scrollableDivHeight = rows.length > 4 ? 4 * lineHeight : rows.length * lineHeight;

  return (
    <>
      <ScrollableDiv height={scrollableDivHeight}>
        <SizerWrapper height={rows.length * lineHeight}>
          <AutoSizer>
            {({ width, height }) => (
              <List
                height={height}
                width={width}
                overscanRowCount={5}
                rowHeight={lineHeight}
                rowCount={rows.length}
                rowRenderer={rowRenderer}
                deferredMeasurementCache={cache}
              />
            )}
          </AutoSizer>
        </SizerWrapper>
      </ScrollableDiv>
    </>
  );
};

export default virtualizedList;