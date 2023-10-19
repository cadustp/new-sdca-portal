import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { InfiniteLoader } from 'react-virtualized';
import WithFailure from '../../../hocs/withFailure';

import Table from '../../../components/Table';
import TableHeader from '../Table/TableHeader/index';
import TableRow from '../Table/TableRow/index';

import MembersModal from '../../../components/MembersModal';
import Button from '../../../components/Button';
import EmptyState from '../../Reports/EmptyState';
import NoSearchIcon from '../../../components/shared/Icons/NoSearchIcon';
import '../styles.css';
import { Groups } from '../../../redux/groups/types';
import { captureEvent } from '../../../analytics';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  groups: {
    data: Array<Groups>,
    pagination: {
      total: number,
      links: [],
    }
  }
  isLoading: boolean,
  failure: boolean,
  inputSearchValue: string,
};

type DispatchProps = {
  handleSearchRequest: (params, inputText, page) => void;
  handleEditGroup: Function,
  handleDeleteGroup: Function,
};

const TableWithLoadingAndFailure = WithFailure(Table);

const Section: React.FC<Props & StateProps & DispatchProps> = ({
  groups,
  intl,
  isLoading,
  failure,
  handleSearchRequest,
  inputSearchValue,
  handleEditGroup,
  handleDeleteGroup,
}) => {
  const [membersModal, setMembersModal] = useState({
    isOpen: false,
    modalData: {
      list: [],
    },
  });

  const handleOpenModal = modalData => {
    captureEvent('openMembersGroups');
    setMembersModal({ isOpen: true, modalData });
  };
  const handleCloseModal = () => {
    setMembersModal({ ...membersModal, isOpen: false });
  };

  const callNextPage = () => {
    const { pagination } = groups;
    if (pagination.links["'next'"]) {
      const { page } = pagination.links["'next'"];
      // eslint-disable-next-line object-shorthand
      captureEvent('loadMoreRowsGroups', { page: page });
      return handleSearchRequest({}, inputSearchValue, page);
    }
    return false;
  };

  const createNewGroup = () => {
  };

  return (
    <>
      <InfiniteLoader
        isRowLoaded={({ index }) => !!groups.data[index]}
        loadMoreRows={callNextPage}
        rowCount={Number(groups.pagination?.total)}
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
            rowCount={groups.data.length}
            rowGetter={({ index }) => groups.data[index]}
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
                rowData={rowData}
                style={style}
                handleOpenModal={handleOpenModal}
                handleEditGroup={handleEditGroup}
                handleDeleteGroup={handleDeleteGroup}
              />
            )}
            noRowsRenderer={() => !isLoading && (
              <div className="empty-state">
                <EmptyState
                  icon={<NoSearchIcon />}
                  descriptionText={
                  intl.messages['groups.createGroupToStart']
                }
                  mainText={intl.messages['groups.noGroupsYet']}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    createNewGroup();
                    captureEvent('openCreate');
                  }}
                >
                  {intl.messages['groups.create']}
                </Button>
              </div>
            )}
          />
        )}
      </InfiniteLoader>
      <MembersModal
        title={intl.messages['groups.members']}
        open={membersModal.isOpen}
        onClose={handleCloseModal}
        members={membersModal.modalData.list}
      />
    </>
  );
};

export default injectIntl(Section);
