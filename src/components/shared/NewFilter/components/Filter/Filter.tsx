import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Dialog, Tabs, Tab, DialogContent,
} from '@mui/material';
import IconButton from '@mui/material/Icon';
import CloseIcon from '../../../Icons/CloseIcon';
import {
  SelectedItensSpan,
  StyledFooter,
} from '../../FilterDialog/FilterDialogStyle';
import Button from '../../../../Button';
import CustomSnackbar from '../../../CustomSnackbar/CustomSnackbar';
import { FilterTabs, SNACKBAR_VARIANTS } from '../../../../../helpers/consts';
import GroupTab from './components/Tabs/GroupTab';
import { SetSelectedFilter } from '../../../../../redux/app/filters/duck';
import FormTab from './components/Tabs/FormTab';
import FormTabRadioButton from './components/Tabs/FormTabRadioButton';
import RoleTab from './components/Tabs/RoleTab';
import WorkerTab from './components/Tabs/WorkerTab';
import AppUserTab from './components/Tabs/AppUserTab';
import { getItemIds } from '../../../../../helpers/utils';
import { FilterProps } from './index';
import { captureEvent } from '../../../../../analytics';

function Filter({
  selectedGroups,
  forms,
  enabledTabs,
  isOpen,
  onClose,
  intl,
  setSelectedFilter,
  callBack,
  selectedForms,
  isFormRadioButton = false,
  selectedEmployees,
  selectedAppUsers,
  setFilterDirty,
  isFilterDirty,
}: FilterProps) {
  const [activeTab, setActiveTab] = useState<FilterTabs>(enabledTabs[0]);
  const [isErrorMessageActive, setErrorMessageVisibility] = useState<boolean>(
    false,
  );
  const [errorMessage, setErrorMessage] = useState<string>('');
  const selectAll = ({ data, filter }) => {
    const selectedIds = Object.values(data).reduce(
      (idsObject: Record<string, boolean>, item: any) => {
        const idsCopy = { ...idsObject };
        idsCopy[item.id] = true;
        return idsCopy;
      },
      {},
    );
    filterContent({ filter, content: selectedIds });
  };

  useEffect(() => {
    if (!isFilterDirty) {
      if (!isFormRadioButton) {
        selectAll({ data: forms, filter: 'forms' });
      }
    }
  }, []);

  const handleTabChange = (event, value) => {
    captureEvent('changeFilterTab', { tab: value });
    setActiveTab(value);
  };

  const filterContent = ({ filter, content }: SetSelectedFilter) => {
    setSelectedFilter({ filter, content });
  };

  const isDataSelected = ({ filteredGroups, filteredForms }) => {
    let message = intl.formatMessage({
      id: 'filter_dialog.start_error_none_selected',
    });
    const isGroupTabEnabled = isTabEnabled(FilterTabs.GROUP);
    const isFormsTabEnabled = isTabEnabled(FilterTabs.FORM);
    const isGroupsSelected = Boolean(filteredGroups.length);
    const isFormsSelected = Boolean(filteredForms.length);
    const isFormsInvalid = !isFormsSelected && isFormsTabEnabled;
    const isGroupsInvalid = !isGroupsSelected && isGroupTabEnabled;
    if (isGroupsInvalid) {
      message = `${message} ${intl.formatMessage({
        id: 'filter_dialog.group',
      })}`;
    }
    if (isFormsInvalid) {
      message = `${message} ${intl.formatMessage({
        id: 'filter_dialog.form',
      })}`;
    }
    if (isFormsInvalid && isGroupsInvalid) {
      message = `${intl.formatMessage({
        id: 'filter_dialog.start_error_none_selected',
      })} ${intl.formatMessage({
        id: 'filter_dialog.group',
      })} ${intl.formatMessage({
        id: 'filter_dialog.and_form',
      })} ${intl.formatMessage({
        id: 'filter_dialog.end_error_none_selected',
      })}`;
    }
    if (isFormsInvalid || isGroupsInvalid) {
      setErrorMessage(message);
      setErrorMessageVisibility(true);
      return false;
    }
    return true;
  };

  const handleFilter = () => {
    const filteredGroups = getItemIds({ selection: selectedGroups });
    const filteredForms = getItemIds({ selection: selectedForms });
    const filteredEmployees = getItemIds({ selection: selectedEmployees });
    const filteredAppUsers = getItemIds({ selection: selectedAppUsers });
    const isFilterValid = isDataSelected({
      filteredGroups,
      filteredForms,
    });
    if (isFilterValid) {
      const selectedValues = {
        groups: filteredGroups,
        forms: filteredForms,
        employees: filteredEmployees,
        appUsers: filteredAppUsers,
      };
      setFilterDirty();
      callBack(selectedValues);
      onClose();
    }
    captureEvent('setFilterDash', { groups: filteredGroups.length, forms: filteredForms.length, employees: filteredEmployees.length, users: filteredAppUsers.length });
  };

  const renderSelectedItemsNumber = useMemo(() => {
    const dataByFilterType = {
      [FilterTabs.GROUP]: selectedGroups,
      [FilterTabs.FORM]: selectedForms,
      [FilterTabs.WORKER]: selectedEmployees,
      [FilterTabs.APP_USER]: selectedAppUsers,
    };
    const selectedData = dataByFilterType[activeTab];
    const numberOfSelectedItems = Object.keys(selectedData).filter(
      item => selectedData[item],
    ).length;
    return `${numberOfSelectedItems} ${intl.formatMessage({
      id: 'filter_dialog.selected_items',
    })}`;
  }, [activeTab, selectedEmployees, selectedForms, selectedGroups, selectedAppUsers]);

  const renderContent = useMemo(
    () => ({
      [FilterTabs.GROUP]: () => (
        <GroupTab
          selectedGroups={selectedGroups}
          updateParentState={content => filterContent({ filter: 'groups', content })}
        />
      ),
      [FilterTabs.FORM]: () => {
        if (isFormRadioButton) {
          return (
            <FormTabRadioButton
              selectedForms={selectedForms}
              updateParentState={content => filterContent({ filter: 'forms', content })}
            />
          );
        }
        return (
          <FormTab
            selectedForms={selectedForms}
            updateParentState={content => filterContent({ filter: 'forms', content })}
          />
        );
      },
      [FilterTabs.ROLE]: () => <RoleTab />,
      [FilterTabs.WORKER]: () => (
        <WorkerTab
          selectedEmployees={selectedEmployees}
          updateParentState={content => filterContent({ filter: 'employees', content })}
        />
      ),
      [FilterTabs.APP_USER]: () => (
        <AppUserTab
          selectedAppUsers={selectedAppUsers}
          updateParentState={content =>
            filterContent({ filter: 'appUsers', content })
          }
        />
      ),
    }),
    [activeTab, selectedGroups, selectedForms, selectedEmployees, selectedAppUsers],
  );

  const isTabEnabled = useCallback(
    tab => (enabledTabs ? enabledTabs.includes(tab) : false),
    [enabledTabs],
  );

  return (
    <Dialog open={isOpen} onClose={onClose} keepMounted fullWidth maxWidth="sm">
      <div className="filterTitle">
        {intl.formatMessage({ id: 'filter_dialog.title' })}
        <IconButton
          className="filterIconButton"
          onClick={() => {
            onClose();
            captureEvent('closeFilterAdherence');
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <Tabs
        centered
        indicatorColor="primary"
        value={activeTab}
        onChange={handleTabChange}
      >
        {isTabEnabled(FilterTabs.GROUP) ? (
          <Tab
            label={intl.formatMessage({ id: 'filter_dialog.groups' })}
            value={FilterTabs.GROUP}
            disabled={!enabledTabs.includes(FilterTabs.GROUP)}
          />
        ) : null}

        {isTabEnabled(FilterTabs.FORM) ? (
          <Tab
            label={intl.formatMessage({ id: 'filter_dialog.forms' })}
            value={FilterTabs.FORM}
            disabled={!enabledTabs.includes(FilterTabs.FORM)}
          />
        ) : null}

        {isTabEnabled(FilterTabs.ROLE) ? (
          <Tab
            label={intl.formatMessage({ id: 'filter_dialog.roles' })}
            value={FilterTabs.ROLE}
            disabled={!enabledTabs.includes(FilterTabs.ROLE)}
          />
        ) : null}

        {isTabEnabled(FilterTabs.WORKER) ? (
          <Tab
            label={intl.formatMessage({
              id: 'filter_dialog.multiple_valuated',
            })}
            value={FilterTabs.WORKER}
            disabled={!enabledTabs.includes(FilterTabs.WORKER)}
          />
        ) : null}

        {isTabEnabled(FilterTabs.APP_USER) ? (
          <Tab
            label={intl.formatMessage({
              id: 'filter_dialog.app_users',
            })}
            value={FilterTabs.APP_USER}
            disabled={!enabledTabs.includes(FilterTabs.APP_USER)}
          />
        ) : null}
      </Tabs>
      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        {renderContent[activeTab]()}
      </DialogContent>
      <StyledFooter>
        <SelectedItensSpan>{renderSelectedItemsNumber}</SelectedItensSpan>
        <Button variant="contained" onClick={handleFilter}>
          {intl.formatMessage({ id: 'filter_dialog.title' })}
        </Button>
      </StyledFooter>

      <CustomSnackbar
        data={{
          message: errorMessage.length
            ? intl.formatMessage({ id: errorMessage })
            : '',
          type: SNACKBAR_VARIANTS.INFO,
          open: isErrorMessageActive,
        }}
        handleClose={() => setErrorMessageVisibility(false)}
      />
    </Dialog>
  );
}

export default React.memo(Filter);
