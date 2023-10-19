import React, { useEffect, useState } from 'react';
import {
  filterParams,
} from '../../redux/schedule/types';
import Loading from '../../components/Loading';
import {
  MAX_DAYS, REMINDER_MODAL_TYPES, RESPONSE_STATUS, ORDER_TYPES,
} from '../../helpers/consts';
import Header from './Header';
import SearchBar from './SearchBar';
import Section from './Section';
import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';

import { STATUSES } from '../../assets/constants';
import './styles.css';
import { User } from '../../redux/users/types';
import { IForm } from '../../redux/RemindersSideFilters/types';
import { captureEvent } from '../../analytics';

type Props = {
  features: Array<{
    id: number,
    title: string,
    preview?: boolean,
    translation_key: string,
    routes: {
      current: string,
      preview: string
    },
    active: boolean,
    created_at: string,
    updated_at: string
  }>,
  history: { push: (route: string) => void };
  intl: {
    messages: [],
  };
};

type DispatchProps = {
  cancelReminderRequest: Function,
  changeFilterModalStatus: Function;
  clearCreateStepper: Function;
  clearImportStatus: Function,
  clearExportStatus: Function,
  exportReminders: Function;
  closeSnackbar: Function,
  importRemindersRequest: Function;
  exportRemindersRequest: Function;
  setEditReminder: Function;
  searchRemindersRequest: Function;
  selectReminders: Function,
  triggerSnackBarError: Function;
  updateFilterParams: Function;
  listsDataRequest: Function;
  setSelectedReminderId: Function;
};

type StateProps = {
  failure: boolean,
  filterModalIsOpen: boolean,
  filterParams: filterParams,
  hasError: boolean,
  importRowErrors: Array<string>,
  exportStatus: string,
  importStatus: string,
  isLoading: boolean,
  exportObject: Blob,
  loadingLists: boolean,
  message: string,
  reminders:{
    data: [],
    page: number,
  },
  saveStatus: string,
  selectedReminders: Array<number>,
  showSnackbar: boolean,
  evaluatedsList: Array<User>,
  evaluatorsList: Array<User>,
  formsList: Array<IForm>,
};

const ScheduleScreen: React.FC<Props & DispatchProps & StateProps> = ({
  cancelReminderRequest,
  changeFilterModalStatus,
  clearCreateStepper,
  clearImportStatus,
  clearExportStatus,
  closeSnackbar,
  evaluatedsList,
  evaluatorsList,
  failure,
  features,
  filterModalIsOpen,
  filterParams,
  formsList,
  exportReminders,
  exportObject,
  hasError,
  history,
  importRemindersRequest,
  exportRemindersRequest,
  exportStatus,
  importRowErrors,
  importStatus,
  intl,
  isLoading,
  loadingLists,
  message,
  reminders,
  saveStatus,
  searchRemindersRequest,
  selectReminders,
  selectedReminders,
  setEditReminder,
  showSnackbar,
  triggerSnackBarError,
  updateFilterParams,
  listsDataRequest,
  setSelectedReminderId,
}) => {
  let date = new Date();
  const startDate = new Date(date.setDate(date.getDate() - MAX_DAYS));
  date = new Date();
  const endDate = new Date(date.setDate(date.getDate() + MAX_DAYS));

  const [modalOpen, setModalOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState(REMINDER_MODAL_TYPES.CANCEL.key);
  const [filter, setFilter] = useState({
    inputSearchValue: filterParams.inputSearchValue,
    form: filterParams.form,
    appUser: filterParams.appUser,
    evaluatedUser: filterParams.evaluatedUser,
    startDate,
    endDate,
    status: filterParams.status,
    sort: filterParams.sort ?? ORDER_TYPES.START_DATE_ASCENDING,
  });

  useEffect(() => {
    searchRemindersRequest({
      params: filterParams,
      page: 0,
    });
  }, [searchRemindersRequest]);

  const handleSearchRequest = (params = {}, page = 0) => {
    searchRemindersRequest({
      params: {
        ...params,
      },
      page,
    });
  };

  const handleCancelReminder = (reminder, comment, userApps) => {
    cancelReminderRequest({
      reminder,
      comment,
      userApps,
      reminders,
    });
  };

  const handleEditReminder = reminder => {
    const reminderAcomplished = reminder.app_users.some(
      m => (m.status === STATUSES.ACCOMPLISHED.id || m.status === STATUSES.CANCELED.id),
    );
    if (reminderAcomplished) {
      triggerSnackBarError(intl.messages['schedule.edit.error']);
    } else {
      setSelectedReminderId({ id: reminder.id });
      history.push('/admin/schedule/edit');
    }
  };

  const handleOpenModal = (modalOpen, type) => {
    setModalOpen(modalOpen);
    setCurrentModalType(type);
  };

  const handleLoadFilter = () => {
    const hasData = formsList.length
      && evaluatorsList.length
      && evaluatedsList.length;
    if (!hasData) {
      const requestParams = {
        forms: true,
        evaluators: true,
        evaluateds: true,
      };
      listsDataRequest(requestParams);
    }
    changeFilterModalStatus(true);
    captureEvent('openFilter');
  };

  const handleExport = () => {
    exportRemindersRequest(filterParams);
  };

  const handleCreateSchedule = () => {
    const currentLocation = window.location.href;
    const token = localStorage.getItem('token');

    const currentFeature = features.find(featureItem => currentLocation === featureItem?.routes?.current);

    if (currentFeature?.preview) {
      window.open(`${currentFeature?.routes?.preview}#/stepper?token=${token}`, '_blank');
    } else {
      history.push('/admin/schedule/new');
    }
  };

  const LoadingState = () => (isLoading || loadingLists
    ? (
      <Loading
        size="small"
        title={isLoading ? intl.messages['loading.schedule.title'] : ''}
        message={isLoading ? intl.messages['loading.schedule.message'] : ''}
        secondMessage={isLoading ? intl.messages['loading.schedule.secondMessage'] : ''}
      />
    )
    : <></>);

  return (
    <>
      <LoadingState />
      <div className="sc-screen">
        <Header
          startDate={filterParams.startDate}
          endDate={filterParams.endDate}
          onNewSchedule={handleCreateSchedule}
        />
        <SearchBar
          handleLoadFilter={handleLoadFilter}
          changeFilterModalStatus={changeFilterModalStatus}
          clearImportStatus={clearImportStatus}
          deleteReminders={() => handleOpenModal(true, REMINDER_MODAL_TYPES.DELETE.key)}
          evaluatedsList={evaluatedsList}
          evaluatorsList={evaluatorsList}
          filterModalIsOpen={filterModalIsOpen}
          filterParams={filterParams}
          formsList={formsList}
          importRemindersRequest={importRemindersRequest}
          importRowErrors={importRowErrors}
          importStatus={importStatus}
          handleSearchRequest={handleSearchRequest}
          updateFilterParams={updateFilterParams}
          filter={filter}
          setFilter={setFilter}
          handleExport={handleExport}
          exportStatus={exportStatus}
          exportObject={exportObject}
          clearExportStatus={clearExportStatus}
        />
        <Section
          cancelReminderRequest={handleCancelReminder}
          currentModalType={currentModalType}
          failure={failure}
          filterParams={filterParams}
          handleEditReminder={handleEditReminder}
          handleOpenModal={handleOpenModal}
          handleSearchRequest={handleSearchRequest}
          isLoading={isLoading}
          modalOpen={modalOpen}
          reminders={reminders}
          selectReminders={selectReminders}
          selectedReminders={selectedReminders}
        />
        <CustomSnackbar
          data={{
            message,
            type: hasError ? 'error' : 'success',
            open: showSnackbar,
          }}
          handleClose={closeSnackbar}
        />
      </div>
      <CustomSnackbar
        data={{
          message: intl.messages['users.edit.success'],
          type: 'success',
          open: saveStatus === RESPONSE_STATUS.SUCCESS,
        }}
        handleClose={clearCreateStepper}
      />
      <CustomSnackbar
        data={{
          message,
          type: 'error',
          open: exportStatus === RESPONSE_STATUS.FAILURE,
        }}
        handleClose={clearExportStatus}
      />
    </>
  );
};

export default ScheduleScreen;
