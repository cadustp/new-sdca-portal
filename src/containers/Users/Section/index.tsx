import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { InfiniteLoader } from 'react-virtualized';
import { Link } from 'react-router-dom';
import WithFailure from '../../../hocs/withFailure';
import { filterParams, UsersState } from '../../../redux/users/types';
import Table from '../../../components/Table';
import TableHeader from '../Table/TableHeader/index';
import TableRow from '../Table/TableRow/index';
import Button from '../../../components/Button';
import EmptyState from '../../Reports/EmptyState';
import NoSearchIcon from '../../../components/shared/Icons/NoSearchIcon';

import './styles.css';
import { captureEvent, captureNavigation } from '../../../analytics';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = UsersState & {
  inputSearchValue: string,
  filterParams: filterParams,
  selectedUsersIds: Array<number>,
  action: string,
};

type DispatchProps = {
  handleSearchRequest: (params, inputText, page) => void;
  handleEditUser: Function;
  openModal: Function;
  setSelectedUsersIds: Function,
  setSelectedUserName: Function,
  handleSelectAllUsers: Function,
  handleSelectOneUser: Function,
};

const TableWithLoadingAndFailure = WithFailure(Table);

const Section: React.FC<Props & StateProps & DispatchProps> = ({
  users,
  isLoading,
  failure,
  intl,
  handleSearchRequest,
  inputSearchValue,
  filterParams,
  handleEditUser,
  selectedUsersIds,
  openModal,
  handleSelectAllUsers,
  handleSelectOneUser,
  setSelectedUsersIds,
  setSelectedUserName,
  action,
}) => {
  const [hasActiveUsers] = useState(users.data.length > 0);

  const callNextPage = () => {
    const { pagination } = users;

    if (pagination.links["'next'"]) {
      const { page } = pagination.links["'next'"];
      // eslint-disable-next-line object-shorthand
      captureEvent('loadMoreRowsUsers', { page: page });
      return handleSearchRequest(filterParams, inputSearchValue, page);
    }
    return false;
  };

  return (
    <>
      <InfiniteLoader
        isRowLoaded={({ index }) => !!users.data[index]}
        loadMoreRows={callNextPage}
        rowCount={Number(users?.pagination.total ?? 0)}
        minimumBatchSize={50}
        threshold={25}
      >
        {({ onRowsRendered, registerChild }) => (
          <TableWithLoadingAndFailure
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            isLoading={isLoading}
            failure={failure}
            rowHeight={88}
            rowCount={users?.data.length ?? 0}
            rowGetter={({ index }) => users.data[index]}
            onRowClick={() => {}}
            headerRowRenderer={(props, width) => (
              <TableHeader
                width={width}
                handleSelectAllUsers={handleSelectAllUsers}
                {...props}
              />
            )}
            rowRenderer={({ rowData, style, key }) => (
              <TableRow
                key={key}
                rowData={rowData}
                style={style}
                filterParams={filterParams}
                handleSelectOneUser={handleSelectOneUser}
                openModal={openModal}
                setSelectedUsersIds={setSelectedUsersIds}
                setSelectedUserName={setSelectedUserName}
                selectedUsersIds={selectedUsersIds}
                action={action}
                handleEditUser={handleEditUser}
              />
            )}
            noRowsRenderer={() => !isLoading && (
              <div className="empty-state">
                <EmptyState
                  icon={<NoSearchIcon />}
                  descriptionText=""
                  mainText={
                    intl.messages[`${hasActiveUsers || !filterParams.active ? 'users.filters.noUsersFound' : 'users.noUsersYet'}`]
                  }
                />
                { !hasActiveUsers && filterParams.active
                  && (
                  <Button
                    component={Link}
                    to="/admin/users/new"
                    variant="contained"
                    onClick={() => captureNavigation('/admin/users/new')}
                  >
                    {intl.messages['users.createUserToStart']}
                  </Button>
                  )}
              </div>
            )}
          />
        )}
      </InfiniteLoader>
    </>
  );
};

export default injectIntl(Section);
