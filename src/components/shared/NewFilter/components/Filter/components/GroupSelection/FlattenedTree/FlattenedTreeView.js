import React, { Component } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
} from 'react-virtualized';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

let noResultsFoundLabel = '';
let noResultsSubtitle = '';

class FlattenedTreeView extends Component {
  cache = new CellMeasurerCache({
    fixedWidth: true,
  });

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    selectionMap: PropTypes.object.isRequired,
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        siblings: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
          }),
        ),
        predecessors: PropTypes.arrayOf(PropTypes.string),
      }),
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.object.isRequired,
  };

  calculateGroupHeight = ({ index }) => {
    const { groups } = this.props;
    // Os numeros abaixo representam a altura em pixels dos componentes dentro de cada agrupamento
    // e sao utilizados para calcular a altura total de cada agrupamento. Assim, o react-virtualized
    // consegue pre-renderizar as linhas.
    const [parentTitleHeight, siblingHeight, margin] = [35, 40, 20];
    const result =
      parentTitleHeight +
      groups[index].siblings.length * siblingHeight +
      margin;
    return result;
  };

  renderGroup = ({ siblings, predecessors }) => {
    const formattedTitle = predecessors.join(' \u00BB ') || '-';
    return (
      <section key={siblings[0].id} style={{ marginTop: 12, marginBottom: 8 }}>
        <p
          style={{
            fontSize: '14px',
            paddingLeft: '12px',
            marginBottom: '8px',
            marginTop: '8px',
          }}
        >
          {formattedTitle}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {siblings.map(this.renderGroupItem)}
        </div>
      </section>
    );
  };

  renderGroupItem = item => {
    const { selectionMap } = this.props;
    return (
      <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
        <ThemeProvider>
          <Checkbox
            style={{ paddingTop: '8px', paddingBottom: '8px' }}
            color="primary"
            checked={!!selectionMap[item.id]}
            onChange={() => this.handleCheckboxChange(item)}
            value={item}
          />
          <span>
            <ListItemText primary={item.name} />
          </span>
        </ThemeProvider>
      </div>
    );
  };

  renderVirtualizedListItem = ({ index, key, parent, style }) => {
    const { groups } = this.props;
    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <div key={key} style={style}>
          {this.renderGroup(groups[index])}
        </div>
      </CellMeasurer>
    );
  };

  handleCheckboxChange = item => {
    const { selectionMap, onChange } = this.props;
    const updatedSelectionMap = {
      ...selectionMap,
      [item.id]: !selectionMap[item.id],
    };
    const selectedItemsIds = Object.keys(updatedSelectionMap).filter(
      itemId => updatedSelectionMap[itemId],
    );
    onChange(selectedItemsIds);
  };

  render() {
    const { groups, selectionMap, intl } = this.props;
    translate(intl);

    return (
      <article style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {groups.length > 0 ? (
          <AutoSizer>
            {({ width, height }) => (
              <List
                selectionMap={selectionMap}
                groups={groups}
                rowRenderer={this.renderVirtualizedListItem}
                deferredMeasurementCache={this.cache}
                width={width}
                height={height}
                rowHeight={this.calculateGroupHeight}
                rowCount={groups.length}
              />
            )}
          </AutoSizer>
        ) : (
          <div style={{ alignSelf: 'center', textAlign: 'center' }}>
            <img
              style={{ marginBottom: '18px' }}
              src={require('../../../../../../../../assets/empty_state_noresults.svg')}
              alt={noResultsFoundLabel}
            />
            <p style={{ fontWeight: 600 }} aria-hidden>
              {noResultsFoundLabel}
            </p>
            <p>{noResultsSubtitle}</p>
          </div>
        )}
      </article>
    );
  }
}

function translate(intl) {
  noResultsFoundLabel = intl.formatMessage({
    id: 'flat_tree.noResultsFound',
    defaultMessage: 'Nenhum resultado encontrado.',
  });
  noResultsSubtitle = intl.formatMessage({
    id: 'flat_tree.noResultsFoundSubtitle',
    defaultMessage:
      'Tente ajustar sua busca ou filtro para encontrar o que você esta procurando',
  });

  defineMessages({
    noResultsFoundLabel: {
      id: 'flat_tree.noResultsFound',
      defaultMessage: 'Nenhum resultado encontrado.',
    },
    noResultsSubtitle: {
      id: 'flat_tree.noResultsFoundSubtitle',
      defaultMessage:
        'Tente ajustar sua busca ou filtro para encontrar o que você esta procurando',
    },
  });
}

export default injectIntl(FlattenedTreeView);
