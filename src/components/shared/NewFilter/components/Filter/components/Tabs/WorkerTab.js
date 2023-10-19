import React from 'react';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import {
  Checkbox, ListItem, ListItemText, IconButton, TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { Container, HeaderWrapper } from './styles';
import SelectAll, { actions } from '../SelectAll/SelectAll';
import { captureEvent } from '../../../../../../../analytics';

let valuatedNameLabel = '';
const MinLength = 2;

const mapStateToProps = state => ({
  users: state.valuatedUsersReducer.valuatedUsers,
});
class Workertab extends React.Component {
  static propTypes = {
    classes: PropTypes.string.isRequired,
    updateParentState: PropTypes.func.isRequired,
    selected_users: PropTypes.arrayOf(PropTypes.object).isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedItemNumber: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      filterStringName: '',
      filterStringGroups: '',
      selected_users: {},
      usersBeingDisplayed: [...props.users],
      eventSent: false,
    };
  }

  componentDidUpdate(prevProvs) {
    if(prevProvs.users != this.props.users && this.props.users?.length) {
      this.setState({
        usersBeingDisplayed: this.props.users,
      });
    }
  }

  buildOneItem = user => {
    const { selectedEmployees } = this.props;
    const isChecked = selectedEmployees && !!selectedEmployees[user.id];
    return (
      <ListItem key={user.id} style={{ wordWrap: 'break-word' }}>
        <Checkbox
          color="primary"
          checked={isChecked}
          onChange={this.selectCheckItem}
          value={user.id}
        />
        <div>
          <ListItemText primary={user.name} />
          <ListItemText primary={user.group} />
        </div>
      </ListItem>
    );
  };

  selectCheckItem = event => {
    const { updateParentState, selectedEmployees } = this.props;
    const { value } = event.target;
    const updatedSelectedEmployees = {
      ...selectedEmployees,
      [value]: !selectedEmployees[value],
    };
    updateParentState(updatedSelectedEmployees);
    captureEvent('selectEvaluatedDash', { selected: event.target.checked });
  };

  renderEmployeesList = () => {
    const { usersBeingDisplayed } = this.state;
    return usersBeingDisplayed.map(user => this.buildOneItem(user));
  };

  filterUsersByName = searchText => {
    const { users } = this.props;
    const isFilterDisabled = !searchText || searchText.trim().length <= MinLength;
    if (isFilterDisabled) return users;

    const searchTextRegexp = new RegExp(searchText.trim(), 'i');
    return users.filter(form => searchTextRegexp.test(form.name));
  };

  onSelectAllClick = action => {
    const { searchText } = this.state;
    const { updateParentState } = this.props;
    const isOnFilterMode = searchText && searchText.trim().length > MinLength;
    const newSelectionMap = isOnFilterMode
      ? this.handleFilteredSelectAll(action)
      : this.handleUnfilteredSelectAll(action);
    this.setState({
      selected_users: newSelectionMap,
    });
    updateParentState(newSelectionMap);
    captureEvent('selectAllEvaluateds', { select: action, amount: newSelectionMap ? Object.keys(newSelectionMap).length : 0 });
  };

  handleUnfilteredSelectAll = action => {
    const { usersBeingDisplayed } = this.state;
    const idsUsersBeingDisplayed = usersBeingDisplayed.map(user => user.id);
    const willChangeToSelected = action === actions.SELECT_ALL;
    return idsUsersBeingDisplayed.reduce(
      (currentMap, key) => ({ ...currentMap, [key]: willChangeToSelected }),
      {}
    );
  };

  handleFilteredSelectAll = action => {
    const { selected_users: oldSelectionMap, usersBeingDisplayed } = this.state;
    const idsUsersBeingDisplayed = usersBeingDisplayed.map(user => user.id);
    const noneSelected = idsUsersBeingDisplayed.every(
      key => !oldSelectionMap[key]
    );
    const willChangeToSelected = action === actions.SELECT_ALL || noneSelected;
    return idsUsersBeingDisplayed.reduce(
      (currentMap, key) => ({ ...currentMap, [key]: willChangeToSelected }),
      oldSelectionMap
    );
  };

  updateSearchText = searchText => {
    const { eventSent } = this.state;
    this.setState({
      searchText,
      usersBeingDisplayed: this.filterUsersByName(searchText),
    });
    if (!eventSent) {
      setTimeout(() => {
        captureEvent('searchEvaluated');
      }, 3000);
      this.setState({ eventSent: true });
    }
    if (!searchText.length) {
      this.setState({ eventSent: false });
    }
  };

  translate(intl) {
    valuatedNameLabel = intl.formatMessage({
      id: 'worker_tab.valuated_name',
      defaultMessage: 'Nome do avaliado',
    });

    defineMessages({
      valuatedNameLabel: {
        id: 'worker_tab.valuated_name',
        defaultMessage: 'Nome do avaliado',
      },
    });
  }

  renderFilterFields = () => {
    const { searchText } = this.state;
    return (
      <HeaderWrapper>
        <TextField
          value={searchText}
          placeholder={valuatedNameLabel}
          onChange={e => this.updateSearchText(e.currentTarget.value)}
          style={{ width: 350 }}
        />
        <IconButton
          size="small"
          onClick={() => {
            this.setState(
              { searchText: '' }, () => this.updateSearchText('')
            );
            captureEvent('clearSearchField');
          }}
        >
          <CloseIcon size="small" />
        </IconButton>
      </HeaderWrapper>
    );
  };

  render = () => {
    const { intl, selectedEmployees, users } = this.props;
    const {
      filterStringName: name,
      filterStringGroups: group,
    } = this.state;
    this.translate(intl);
    return (
      <Container name="tab-content">
        {this.renderFilterFields(name, group)}
        <SelectAll
          selected_items={selectedEmployees}
          total={users.length}
          onCheckboxClick={this.onSelectAllClick}
        />
        {this.renderEmployeesList()}
      </Container>
    );
  };
}

export default injectIntl(
  connect(mapStateToProps)(Workertab)
);
