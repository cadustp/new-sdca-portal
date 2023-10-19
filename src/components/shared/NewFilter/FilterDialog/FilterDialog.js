import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/Icon';
import { makeStyles } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { SNACKBAR_VARIANTS } from '../../../../helpers/consts';
import Button from '../../../Button';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import CloseIcon from '../../Icons/CloseIcon';
import FormTab from '../components/Filter/components/Tabs/FormTab';
import FormTabRadioButton from '../components/Filter/components/Tabs/FormTabRadioButton';
import GroupTab from '../components/Filter/components/Tabs/GroupTab';
import RoleTab from '../components/Filter/components/Tabs/RoleTab';
import WorkerTab from '../components/Filter/components/Tabs/WorkerTab';
import './FilterDialog.css';
import { SelectedItensSpan, StyledFooter, styles } from './FilterDialogStyle';

export const tabs = {
  GROUP: 'group',
  FORM: 'form',
  ROLE: 'role',
  WORKER: 'worker',
  APP_USER: 'app_user',
};

let titleLabel = '';
let groupLabel = '';
let groupsLabel = '';
let formLabel = '';
let formsLabel = '';
let andFormLabel = '';
let rolesLabel = '';
let singleValuatedLabel = '';
let multipleValuatedLabel = '';
let andValuatedLabel = '';
let selectedItemsLabel = '';
let startErrorNoneSelectedLabel = '';
let endErrorNoneSelectedLabel = '';

const mapStateToProps = state => ({
  groups: state.groupReducer.data.userGroups.groups,
  users: state.valuatedUsersReducer.valuatedUsers,
  userIds: state.valuatedUsersReducer.ids,
  forms: state.formReducer.includeTraining
    ? state.formReducer
    : state.formReducer.notTraining,
  loggedUser: state.login.information,
});
/* @deprecated */
class FilterDialog extends React.Component {
  constructor(props) {
    super(props);
    const selectedTab = this.props.selectedTab
      ? this.props.selectedTab
      : tabs.GROUP;

    const selected_forms = selectAllForms(
      (this.props.forms && this.props.forms.ids) || [],
    );

    this.state = {
      open: false,
      tabsValue: selectedTab,
      isFirstMounted: true,
      selected_groups: {},
      selected_users: {},
      selected_forms,
      groups: [],
      openSnackbar: false,
      snackbarMessage: '',
      itemSelectedNumber: 0,
    };

    this.updateLabels = labelProperty => newValue =>
      this.setState({ [labelProperty]: newValue }, () =>
        this.countSelectedLabel(this.state.tabsValue),
      );

    this.updateSelectedGroups = this.updateLabels('selected_groups');
    this.updateSelectedForms = this.updateLabels('selected_forms');
    this.updateSelectedUsers = this.updateLabels('selected_users');
  }

  componentDidUpdate = prevProps => {
    const haveFormsBeenFiltered =
      this.props.forms.includeTraining !== prevProps.forms.includeTraining;

    if (haveFormsBeenFiltered && !this.props.isFormTabRadioButton) {
      this.updateFormsSelection();
    }

    const groups = this.props.groups || [];
    const users = this.props.users || [];
    const { loggedUser } = this.props;

    if (this.props.forms.ids.length !== prevProps.forms.ids.length) {
      const selectionMap = selectAllForms(this.props.forms.ids);
      this.updateFormsSelection(selectionMap);
    }

    if (users.length !== prevProps.users.length) {
      this.updateUsersSelection();
    }

    if (this.state.isFirstMounted && groups.length > 0) {
      this.selectUserGroupAndImmediateChildren(
        groups,
        loggedUser.company_group_id,
      );
      this.setState(
        {
          isFirstMounted: false,
        },
        () => {
          this.countSelectedLabel(this.state.tabsValue);
        },
      );
    }
  };

  selectUserGroupAndImmediateChildren = (groups, loggedUserGroupId) => {
    const initialSelectedGroups = {};
    groups.map(group => {
      if (
        group.id === loggedUserGroupId ||
        group.parent_id === loggedUserGroupId
      ) {
        initialSelectedGroups[group.id] = true;
      }
      return true;
    });

    this.setState({
      selected_groups: initialSelectedGroups,
    });
  };

  selectAllGroups = groups => {
    const { selected_groups: selectedGroups } = this.state;
    /**
     * Este foreach impuro está editando objeto direto do state!!
     * Ideal seria realizar um reduce no objeto de groups, mas quebraria
     * caso o objeto de selectedGroups no state contivesse valores a mais
     * do que o argumento groups.
     * Preferi nao mexer durante a refatoracao.
     */
    groups.forEach(group => {
      selectedGroups[group.id] = true;
    });
    this.setState({ selected_groups: selectedGroups });
  };

  selectAllUsers = users => {
    const selectedUsers = {};
    users.forEach(user => {
      selectedUsers[user.id] = true;
    });
    return selectedUsers;
  };

  isGroupChecked = groupId => {
    const { selected_groups: selectedGroups } = this.state;
    return selectedGroups[groupId];
  };

  checkIsThereOneSelected = () => {
    const {
      activeTabs: { tabGroup: isGroupsTabActive, tabForm: isFormsTabActive },
    } = this.props;

    const {
      selected_groups: selectedGroups,
      selected_forms: selectedForms,
    } = this.state;

    const isThereOneGroup = checkAtLeastOneSelected(
      isGroupsTabActive,
      selectedGroups,
    );

    const isThereOneForm = checkAtLeastOneSelected(
      isFormsTabActive,
      selectedForms,
    );

    let errorMessage = `${startErrorNoneSelectedLabel} `;

    if (!isThereOneGroup && isGroupsTabActive) {
      errorMessage += groupLabel;
    }
    if (!isThereOneForm && isFormsTabActive) {
      if (!isThereOneGroup && isGroupsTabActive) {
        errorMessage = `${errorMessage} ${andFormLabel}`;
      } else {
        errorMessage += formLabel;
      }
    }
    errorMessage = `${errorMessage} ${endErrorNoneSelectedLabel}`;

    if (
      (!isThereOneGroup && isGroupsTabActive) ||
      (!isThereOneForm && isFormsTabActive)
    ) {
      this.setState({
        snackbarMessage: errorMessage,
        openSnackbar: true,
      });
      return false;
    }
    return true;
  };

  handleGroupFilter = () => {
    const { selected_groups: groupsSelectionMap } = this.state;
    const selectedGroupsIds = Object.keys(groupsSelectionMap).filter(
      groupId => groupsSelectionMap[groupId],
    );

    return selectedGroupsIds;
  };

  handleFormFilter = () => {
    const { selected_forms: formsSelectionMap } = this.state;
    const selectedFormsIds = Object.keys(formsSelectionMap || {}).filter(
      formId => formsSelectionMap[formId],
    );

    return selectedFormsIds;
  };

  handleUserFilter = () => {
    const { selected_users: usersSelectionMap } = this.state;
    const selectedUsersIds = Object.keys(usersSelectionMap).filter(
      userId => usersSelectionMap[userId],
    );

    return selectedUsersIds;
  };

  handleFilter = () => {
    if (!this.checkIsThereOneSelected()) return;

    const groups = this.handleGroupFilter();
    const forms = this.handleFormFilter();
    const users = this.handleUserFilter();
    const selectedValues = { groups, forms, users };

    const { callBack, onClose } = this.props;
    callBack(selectedValues);
    onClose();
  };

  countSelectedLabel = tab => {
    const {
      selected_groups: selectedGroups,
      selected_forms: selectedForms,
      selected_users: selectedUsers,
    } = this.state;
    let entitiesSelectionMap;
    switch (tab) {
      case 'group':
        entitiesSelectionMap = selectedGroups;
        break;
      case 'form':
        entitiesSelectionMap = selectedForms;
        break;
      case 'worker':
        entitiesSelectionMap = selectedUsers;
        break;
      default:
        entitiesSelectionMap = selectedGroups;
        break;
    }
    const count = Object.values(entitiesSelectionMap || {}).filter(Boolean)
      .length;

    this.setState({
      itemSelectedNumber: count,
    });
  };

  handleTabChange = (_event, value) => {
    this.countSelectedLabel(value);
    this.setState({
      tabsValue: value,
    });
  };

  renderDialogContent = () => {
    const {
      tabsValue,
      selected_groups: selectedGroups,
      selected_forms: selectedForms,
      selected_users: selectedUsers,
    } = this.state;
    const { isFormTabRadioButton } = this.props;
    switch (tabsValue) {
      case tabs.GROUP:
        return (
          <GroupTab
            selectedGroups={selectedGroups}
            updateParentState={this.updateSelectedGroups}
          />
        );

      case tabs.FORM:
        if (isFormTabRadioButton) {
          return (
            <FormTabRadioButton
              selected_forms={selectedForms}
              updateParentState={this.updateSelectedForms}
              selectedItemNumber={this.selectedItemNumber}
            />
          );
        }
        return (
          <FormTab
            selected_forms={selectedForms}
            updateParentState={this.updateSelectedForms}
            selectedItemNumber={this.selectedItemNumber}
          />
        );

      case tabs.ROLE:
        return <RoleTab />;

      case tabs.WORKER:
        return (
          <WorkerTab
            selected_users={selectedUsers}
            updateParentState={this.updateSelectedUsers}
            selectedItemNumber={this.selectedItemNumber}
          />
        );
      default:
        return <div>This state tabsValue returned an unkown tab name...</div>;
    }
  };

  selectedItemNumber = number => {
    this.setState({
      itemSelectedNumber: number,
    });
  };

  render = () => {
    const {
      classes,
      open,
      onClose,
      activeTabs,
      intl: { formatMessage },
    } = this.props;

    const {
      tabsValue,
      openSnackbar,
      snackbarMessage,
      itemSelectedNumber,
    } = this.state;
    translate(formatMessage);

    return (
      <Dialog keepMounted open={open} onClose={onClose} fullWidth maxWidth="sm">
        <div className="filterTitle">
          {titleLabel}
          <IconButton className="filterIconButton" onClick={onClose}>
            <CloseIcon color="primary" />
          </IconButton>
        </div>
        <Tabs
          fullWidth
          centered
          indicatorColor="primary"
          value={tabsValue}
          onChange={this.handleTabChange}
        >
          {activeTabs.tabGroup ? (
            <Tab
              label={groupsLabel}
              value={tabs.GROUP}
              disabled={!activeTabs.tabGroup}
            />
          ) : null}

          {activeTabs.tabForm ? (
            <Tab
              label={formsLabel}
              value={tabs.FORM}
              disabled={!activeTabs.tabForm}
            />
          ) : null}

          {activeTabs.tabRole ? (
            <Tab
              label={rolesLabel}
              value={tabs.ROLE}
              disabled={!activeTabs.tabRole}
            />
          ) : null}

          {activeTabs.tabWorker ? (
            <Tab
              label={multipleValuatedLabel}
              value={tabs.WORKER}
              disabled={!activeTabs.tabWorker}
            />
          ) : null}
        </Tabs>
        <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
          {this.renderDialogContent(tabsValue)}
        </DialogContent>
        <StyledFooter>
          <SelectedItensSpan>
            {`${itemSelectedNumber} ${selectedItemsLabel}`}
          </SelectedItensSpan>
          <Button
            variant="contained"
            classes={{ contained: classes.closeFilterButton }}
            onClick={this.handleFilter}
          >
            {titleLabel}
          </Button>
        </StyledFooter>
        <CustomSnackbar
          data={{
            message: snackbarMessage,
            type: SNACKBAR_VARIANTS.INFO,
            open: openSnackbar,
          }}
          handleClose={() => {
            this.setState({ openSnackbar: false });
          }}
        />
      </Dialog>
    );
  };

  updateFormsSelection() {
    const forms = this.props.forms || {};
    const selectedForms = selectAllForms(forms.ids);
    this.setState({ selected_forms: selectedForms });
  }

  updateUsersSelection() {
    const { userIds } = this.props;
    const selectedUsers = buildAllUsers(userIds);
    this.setState({ selected_users: selectedUsers });
  }
}

function buildAllUsers(selectedUsersIds) {
  const selectedUsers = {};
  selectedUsersIds.forEach(userId => {
    selectedUsers[userId] = false;
  });
  return selectedUsers;
}

function selectAllForms(selectedFormsIds) {
  const selectedForms = {};
  selectedFormsIds.forEach(formId => {
    selectedForms[formId] = true;
  });
  return selectedForms;
}

function selectionMapHasSelected(selectionMap) {
  return Object.values(selectionMap).some(Boolean);
}

function checkAtLeastOneSelected(tabIsActive, selectionMap) {
  return !tabIsActive || selectionMapHasSelected(selectionMap);
}

function translate(formatMessage) {
  titleLabel = formatMessage({
    id: 'filter_dialog.title',
    defaultMessage: 'Filtrar',
  });
  groupLabel = formatMessage({
    id: 'filter_dialog.group',
    defaultMessage: 'grupo',
  });
  groupsLabel = formatMessage({
    id: 'filter_dialog.groups',
    defaultMessage: 'Grupos',
  });
  formLabel = formatMessage({
    id: 'filter_dialog.form',
    defaultMessage: 'formulário',
  });
  formsLabel = formatMessage({
    id: 'filter_dialog.forms',
    defaultMessage: 'Formulários',
  });
  andFormLabel = formatMessage({
    id: 'filter_dialog.and_form',
    defaultMessage: 'e um formulário',
  });
  rolesLabel = formatMessage({
    id: 'filter_dialog.roles',
    defaultMessage: 'Cargos',
  });
  singleValuatedLabel = formatMessage({
    id: 'filter_dialog.single_valuated',
    defaultMessage: 'Avaliado',
  });
  multipleValuatedLabel = formatMessage({
    id: 'filter_dialog.multiple_valuated',
    defaultMessage: 'Avaliados',
  });
  andValuatedLabel = formatMessage({
    id: 'filter_dialog.and_valuated',
    defaultMessage: 'e um avaliado',
  });
  selectedItemsLabel = formatMessage({
    id: 'filter_dialog.selected_items',
    defaultMessage: 'itens selecionados',
  });
  startErrorNoneSelectedLabel = formatMessage({
    id: 'filter_dialog.start_error_none_selected',
    defaultMessage: 'Você deve selecionar pelo menos um',
  });
  endErrorNoneSelectedLabel = formatMessage({
    id: 'filter_dialog.end_error_none_selected',
    defaultMessage: 'para poder visualizar os resultados.',
  });

  defineMessages({
    titleLabel: { id: 'filter_dialog.title', defaultMessage: 'Filtrar' },
    groupLabel: { id: 'filter_dialog.group', defaultMessage: 'grupo' },
    groupsLabel: { id: 'filter_dialog.groups', defaultMessage: 'Grupos' },
    formLabel: { id: 'filter_dialog.form', defaultMessage: 'formulário' },
    formsLabel: { id: 'filter_dialog.forms', defaultMessage: 'Formulários' },
    andFormLabel: {
      id: 'filter_dialog.and_form',
      defaultMessage: 'e um formulário',
    },
    rolesLabel: { id: 'filter_dialog.roles', defaultMessage: 'Cargos' },
    singleValuatedLabel: {
      id: 'filter_dialog.single_valuated',
      defaultMessage: 'Avaliado',
    },
    multipleValuatedLabel: {
      id: 'filter_dialog.multiple_valuated',
      defaultMessage: 'Avaliados',
    },
    andValuatedLabel: {
      id: 'filter_dialog.and_valuated',
      defaultMessage: 'e um avaliado',
    },
    selectedItemsLabel: {
      id: 'filter_dialog.selected_items',
      defaultMessage: 'itens selecionados',
    },
    startErrorNoneSelectedLabel: {
      id: 'filter_dialog.start_error_none_selected',
      defaultMessage: 'Você deve selecionar pelo menos um',
    },
    endErrorNoneSelectedLabel: {
      id: 'filter_dialog.end_error_none_selected',
      defaultMessage: 'para poder visualizar os resultados.',
    },
  });
}

export default injectIntl(
  connect(mapStateToProps)(makeStyles(styles)(FilterDialog)),
);
