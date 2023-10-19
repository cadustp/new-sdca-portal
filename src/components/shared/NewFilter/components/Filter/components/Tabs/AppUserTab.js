import React from 'react';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import {
  Checkbox, ListItem, ListItemText, IconButton, TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { Container, HeaderWrapper } from './styles';
import SelectAll, { actions } from '../SelectAll/SelectAll';
import { captureEvent } from '../../../../../../../analytics';

const mapStateToProps = state => ({
  users: state.appUsersReducer.appUsers,
});
class AppUserTab extends React.Component {
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
    const { selectedAppUsers } = this.props;
    const isChecked = selectedAppUsers && !!selectedAppUsers[user.id];
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
    const { updateParentState, selectedAppUsers } = this.props;
    const { value } = event.target;
    const updatedSelectedAppUsers = {
      ...selectedAppUsers,
      [value]: !selectedAppUsers[value],
    };
    updateParentState(updatedSelectedAppUsers);
    captureEvent('selectEvaluator', { selected: event.target.checked });
  };

  renderAppUsersList = () => {
    const { usersBeingDisplayed } = this.state;
    return usersBeingDisplayed.map(user => this.buildOneItem(user));
  };

  filterUsersByName = searchText => {
    const { users } = this.props;
    const isFilterDisabled = !searchText;
    if (isFilterDisabled) return users;

    const searchTextRegexp = new RegExp(searchText.trim(), 'i');
    return users.filter(form => searchTextRegexp.test(form.name));
  };

  onSelectAllClick = action => {
    const { searchText } = this.state;
    const { updateParentState } = this.props;
    const isOnFilterMode = searchText;
    const newSelectionMap = isOnFilterMode
      ? this.handleFilteredSelectAll(action)
      : this.handleUnfilteredSelectAll(action);
    this.setState({
      selected_users: newSelectionMap,
    });
    updateParentState(newSelectionMap);
    captureEvent('selectAllEvaluatorsDash', { select: action, amount: newSelectionMap ? Object.keys(newSelectionMap).length : 0 });
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
    const { selected_users: oldSelectionMap } = this.state;
    const { usersBeingDisplayed } = this.state;
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
        captureEvent('searchEvaluatorDash');
      }, 3000);
      this.setState({ eventSent: true });
    }
    if (!searchText.length) {
      this.setState({ eventSent: false });
    }
  };

  renderFilterFields = () => {
    const { searchText } = this.state;
    const { intl } = this.props;
    return (
      <HeaderWrapper>
        <TextField
          value={searchText}
          placeholder={intl.messages['app_user_tab.app_user_name']}
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
    const { selectedAppUsers, users } = this.props;
    const {
      filterStringName: name,
      filterStringGroups: group,
    } = this.state;
    return (
      <Container name="tab-content">
        {this.renderFilterFields(name, group)}
        <SelectAll
          selected_items={selectedAppUsers}
          total={users.length}
          onCheckboxClick={this.onSelectAllClick}
        />
        {this.renderAppUsersList()}
      </Container>
    );
  };
}

export default injectIntl(
  connect(mapStateToProps)(AppUserTab)
);
