import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { InfiniteLoader } from 'react-virtualized';
import { Link } from 'react-router-dom';
import WithFailure from '../../../hocs/withFailure';
import Table from '../../../components/Table';
import TableHeader from '../Table/TableHeader/index';
import TableRow from '../Table/TableRow/index';
import Button from '../../../components/Button';
import EmptyState from '../../Reports/EmptyState';
import NoSearchIcon from '../../../components/shared/Icons/NoSearchIcon';
import { Reminders, filterParams } from '../../../redux/schedule/types';
import { REMINDER_MODAL_TYPES, MAX_TABLE_ROWS } from '../../../helpers/consts';
import BaseModal from '../Modals/BaseModal';
import MembersModal from '../../../components/MembersModal';

import '../styles.css';
import { captureNavigation } from '../../../analytics';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  currentModalType: string,
  failure: boolean,
  filterParams: filterParams,
  isLoading: boolean,
  modalOpen: boolean,
  reminders: {
    data: Array<Reminders>,
    page: number,
  },
  selectedReminders: Array<any>,
};

type DispatchProps = {
  cancelReminderRequest: (params, comment, userApps) => void;
  handleEditReminder: Function,
  handleOpenModal: Function,
  handleSearchRequest: Function;
  selectReminders: Function,
};

const TableWithLoadingAndFailure = WithFailure(Table);

const Section: React.FC<Props & StateProps & DispatchProps> = ({
  cancelReminderRequest,
  currentModalType,
  failure,
  filterParams,
  handleEditReminder,
  handleOpenModal,
  handleSearchRequest,
  intl,
  isLoading,
  modalOpen,
  reminders,
  selectReminders,
  selectedReminders,
}) => {
  const firstReminder = selectedReminders[0] !== undefined && selectedReminders[0];

  const [membersModal, setMembersModal] = useState({
    modalType: '',
    isOpen: false,
    modalData: {
      list: [],
    },
  });

  const handleTriggerAction = (comment, users) => {
    cancelReminderRequest(selectedReminders[0], comment, users);
  };

  const callNextPage = () => {
    const newPage = reminders.page + 1;
    handleSearchRequest(filterParams, newPage);
  };

  return (
    <>
      <BaseModal
        action={firstReminder.name || ''}
        intl={intl}
        isOpen={modalOpen}
        modalType={currentModalType}
        onClose={() => handleOpenModal(false, currentModalType)}
        onConfirm={handleTriggerAction}
        title={REMINDER_MODAL_TYPES[currentModalType].title}
        type={currentModalType}
        users={firstReminder.app_users || []}
      />
      <InfiniteLoader
        isRowLoaded={({ index }) => !!reminders.data[index]}
        loadMoreRows={callNextPage}
        rowCount={Number(reminders ? MAX_TABLE_ROWS : 1)}
        minimumBatchSize={50}
        threshold={40}
      >
        {({ onRowsRendered, registerChild }) => (
          <TableWithLoadingAndFailure
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            isLoading={isLoading}
            failure={failure}
            rowHeight={88}
            rowCount={reminders.data ? reminders.data.length : 1}
            rowGetter={({ index }) => (reminders.data ? reminders.data[index] : 1)}
            onRowClick={() => {}}
            headerRowRenderer={(props, width) => (
              <TableHeader
                width={width}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
              />
            )}
            rowRenderer={({ rowData, style, key }) => (
              <TableRow
                key={key}
                handleEditReminder={handleEditReminder}
                handleOpenModal={type => handleOpenModal(true, type)}
                handleSelectReminder={reminder => selectReminders([reminder])}
                setMembersModal={setMembersModal}
                selectReminders={selectReminders}
                selectedReminders={selectedReminders}
                style={style}
                rowData={rowData}
              />
            )}
            noRowsRenderer={() => !isLoading && (
              <div className="empty-state">
                <EmptyState
                  icon={<NoSearchIcon />}
                  descriptionText={
                  intl.messages['schedule.creatoToStart']
                }
                  mainText={intl.messages['schedule.noReminderYet']}
                />
                <Button
                  component={Link}
                  to="/admin/schedule/new"
                  variant="contained"
                  onClick={() => captureNavigation('/admin/schedule/new')}
                >
                  {intl.messages['schedule.create']}
                </Button>
              </div>
            )}
          />
        )}
      </InfiniteLoader>
      <MembersModal
        title={intl.messages[`schedule.${membersModal.modalType}`]}
        open={membersModal.isOpen}
        onClose={() => setMembersModal({ ...membersModal, isOpen: false })}
        members={membersModal.modalData.list}
      />
    </>
  );
};

export default injectIntl(Section);
