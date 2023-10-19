import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import './SelectAll.css';
import { defineMessages, injectIntl } from 'react-intl';

export const actions = {
  SELECT_ALL: 'select_all',
  UNSELECT_ALL: 'unselect_all',
};

export const checkStates = {
  SELECTED: 'selected',
  UNSELECTED: 'unselected',
  INDETERMINATE: 'indeterminate',
};

let selectAllLabel = '';

class SelectAll extends React.Component {
  static propTypes = {
    onCheckboxClick: PropTypes.func.isRequired,
    showDivider: PropTypes.bool,
    intl: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    selected_items: PropTypes.object.isRequired,
    labelId: PropTypes.string,
  };

  static defaultProps = {
    showDivider: true,
    labelId: 'select_all.select_items',
  };

  translate(intl, labelId = this.props.labelId) {
    selectAllLabel = intl.formatMessage({
      id: labelId,
      defaultMessage: 'Selecionar os itens em exibição',
    });

    defineMessages({
      selectAllLabel: {
        id: labelId,
        defaultMessage: 'Selecionar os itens em exibição',
      },
    });
  }

  handleChange = event => {
    const { onCheckboxClick } = this.props;
    if (event.target.value === checkStates.SELECTED) {
      onCheckboxClick(actions.UNSELECT_ALL);
    } else if (event.target.value === checkStates.UNSELECTED) {
      onCheckboxClick(actions.SELECT_ALL);
    } else if (event.target.value === checkStates.INDETERMINATE) {
      onCheckboxClick(actions.UNSELECT_ALL);
    }
  };

  checkSelected = () => {
    const { selected_items, total = 0 } = this.props;
    const selected = Object.values(selected_items).filter(id => id).length;

    if (selected >= total && total !== 0) {
      return (
        <Checkbox
          color="primary"
          checked="true"
          onClick={this.handleChange}
          value={checkStates.SELECTED}
        />
      );
    }
    if (selected === 0) {
      return (
        <Checkbox
          color="primary"
          onClick={this.handleChange}
          value={checkStates.UNSELECTED}
        />
      );
    } else {
      return (
        <Checkbox
          color="primary"
          checked="false"
          indeterminate
          onClick={this.handleChange}
          value={checkStates.INDETERMINATE}
        />
      );
    }
  };

  render = () => {
    const {
      intl,
      showDivider,
      selected_items: selectedItems,
      labelId,
    } = this.props;
    this.translate(intl, labelId);

    return (
      <div className="select-all-div">
        <div className="checkbox-div">
          <div>{this.checkSelected(selectedItems)}</div>
          <div className="select-all-label">
            <p>{selectAllLabel}</p>
          </div>
        </div>
        {showDivider && <Divider />}
      </div>
    );
  };
}

export default injectIntl(SelectAll);
