import React, { useState, useEffect, useReducer } from 'react';
import { injectIntl } from 'react-intl';
import { InfiniteLoader } from 'react-virtualized';
import WithFailure from '../../../hocs/withFailure';
import Table from '../../../components/Table';
import TableHeader from './Table/TableHeader/index';
import TableRow from './Table/TableRow/index';
import Button from '../../../components/Button';
import EmptyState from '../../Reports/EmptyState';
import NoSearchIcon from '../../../components/shared/Icons/NoSearchIcon';
import { MAX_TABLE_ROWS } from '../../../helpers/consts';
import MembersModal from '../../../components/MembersModal';
import { Contents } from '../../../redux/digitalContents/types';

import '../styles.css';
import { captureEvent } from '../../../analytics';

type Props = {
  intl: {
    messages: [];
  };
  sortType: string,
};

type StateProps = {
  contents: Array<Contents>,
  isLoading: boolean,
  failure: boolean,
};

type DispatchProps = {
  handleDeleteContent: Function,
  handleEditContent: Function,
};

const TableWithLoadingAndFailure = WithFailure(Table);

const Section: React.FC<Props & StateProps & DispatchProps> = ({
  contents,
  handleDeleteContent,
  handleEditContent,
  intl,
  isLoading,
  failure,
  sortType,
}) => {
  // Necessário para renderizar o componente novamente após alterar ordenação da lista
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    forceUpdate();
  }, [sortType]);

  const [membersModal, setMembersModal] = useState({
    isOpen: false,
    modalData: {
      list: [],
    },
  });

  return (
    <>
      <InfiniteLoader
        isRowLoaded={({ index }) => !!contents[index]}
        loadMoreRows={() => {}}
        rowCount={Number(contents ? MAX_TABLE_ROWS : 1)}
        minimumBatchSize={200}
        threshold={200}
      >
        {({ onRowsRendered, registerChild }) => (
          <TableWithLoadingAndFailure
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            isLoading={isLoading}
            failure={failure}
            rowHeight={88}
            rowCount={contents ? contents?.length : 1}
            rowGetter={({ index }) => (contents ? contents[index] : 1)}
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
                style={style}
                rowData={rowData}
                openUsersModal={modalData => setMembersModal({ isOpen: true, modalData })}
                handleDeleteContent={handleDeleteContent}
                handleEditContent={handleEditContent}
              />
            )}
            noRowsRenderer={() => !isLoading && (
              <div className="empty-state">
                <EmptyState
                  icon={<NoSearchIcon />}
                  descriptionText={
                  intl.messages['contents.clickToCreate']
                }
                  mainText={intl.messages['contents.noContentYet']}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    handleEditContent();
                    captureEvent('openCreate');
                  }}
                >
                  {intl.messages['contents.create']}
                </Button>
              </div>
            )}
          />
        )}
      </InfiniteLoader>
      <MembersModal
        title={intl.messages['contents.users']}
        open={membersModal.isOpen}
        onClose={() => setMembersModal({ ...membersModal, isOpen: false })}
        members={membersModal.modalData.list}
      />
    </>
  );
};

export default injectIntl(Section);
