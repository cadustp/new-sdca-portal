import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { InfiniteLoader } from 'react-virtualized';
import WithFailure from '../../../hocs/withFailure';
import Table from '../../../components/Table';
import TableHeader from '../../Reports/TableHeader';
import TableRow from '../../Reports/TableRow';
import EmptyState from '../../Reports/EmptyState';
import NoSearchIcon from '../../../components/shared/Icons/NoSearchIcon';
import CustomModal from '../../../components/CustomModal';
import AvatarList from '../../Reports/AvatarList';
import { AppUserReminders } from '../../../redux/appUserReminders/types';

import { AvatarListContainer } from '../../Reports/styles';
import { captureEvent } from '../../../analytics';

type Props = {
  sideFilterParams: {},
  searchLoading: Function;
  failure: boolean,
  reminders: {
    data: Array<AppUserReminders>;
    pagination: {
      total: number;
      links: [];
    };
  };
  intl: {
    messages:[]
  };
  valueInputSearch: string;
  handleSearch: Function;
};

const TableWithLoadingAndFailure = WithFailure(Table);

const Section: React.FC<Props> = ({
  reminders,
  searchLoading,
  failure,
  valueInputSearch,
  handleSearch,
  sideFilterParams,
  intl,
}) => {
  const [openModal, setOpenModal] = useState({
    listModalOpened: false,
    listModalData: {
      list: [],
      reminderEndDate: null,
      reminderId: null,
    },
  });

  const localUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userType = localUser?.majority_type;

  const callNextPage = () => {
    const { pagination } = reminders;

    if (pagination.links["'next'"]) {
      const { page } = pagination.links["'next'"];
      // eslint-disable-next-line object-shorthand
      captureEvent('loadMoreRowsReminders', { page: page });
      return handleSearch(sideFilterParams, valueInputSearch, page);
    }
    return false;
  };

  return (
    <>
      <InfiniteLoader
        isRowLoaded={({ index }) => !!reminders.data[index]}
        loadMoreRows={callNextPage}
        rowCount={Number(reminders.pagination?.total)}
        minimumBatchSize={50}
        threshold={25}
      >
        {({ onRowsRendered, registerChild }) => (
          <TableWithLoadingAndFailure
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            isLoading={searchLoading}
            failure={failure}
            rowHeight={88}
            rowCount={reminders.data.length}
            rowGetter={({ index }) => reminders.data[index]}
            onRowClick={() => {}}
            headerRowRenderer={(props, width) => (
              <TableHeader
                isAppUserReminderScreen
                isAppUser={userType === 'app_user'}
                {...props}
                width={width}
              />
            )}
            rowRenderer={({ rowData, style,key }) => (
              <TableRow
                key={key}
                style={style}
                rowData={rowData}
                handleOpenListModal={listModalData => setOpenModal({ listModalOpened: true, listModalData })}
                isAppUserReminderScreen
              />
            )}
            noRowsRenderer={() => !searchLoading && (
            <EmptyState
              icon={<NoSearchIcon />}
              descriptionText={
                    intl.messages['reports.empty_state.description_text']
                  }
              mainText={intl.messages['reports.empty_state.main_title']}
            />
            )}
          />
        )}
      </InfiniteLoader>
      <CustomModal
        title={intl.messages['reports.evaluated_label']}
        open={openModal.listModalOpened}
        onClose={() => setOpenModal({ ...openModal, listModalOpened: false })}
      >
        <AvatarListContainer>
          <AvatarList
            data={openModal.listModalData.list}
            reminderEndDate={openModal.listModalData.reminderEndDate}
            reminderId={openModal.listModalData.reminderId}
          />
        </AvatarListContainer>
      </CustomModal>
    </>
  );
};

export default injectIntl(Section);
