import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { InfiniteLoader } from 'react-virtualized';
import { Link } from 'react-router-dom';
import WithFailure from '../../../hocs/withFailure';
import { EvaluatedsState } from '../../../redux/evaluateds/types';
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

type StateProps = EvaluatedsState & {
  inputSearchValue: string,
  selectedEvaluatedsIds: Array<number>,
  action: string,
};

type DispatchProps = {
  handleSearchRequest: Function;
  openModal: Function;
  setSelectedEvaluatedsIds: Function,
  handleSelectAllEvaluateds: Function,
  handleSelectOneEvaluated: Function,
  handleEditEvaluated: Function;
};

const TableWithLoadingAndFailure = WithFailure(Table);

const Section: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  evaluateds,
  isLoading,
  failure,
  handleSearchRequest,
  inputSearchValue,
  filterParams,
  selectedEvaluatedsIds,
  openModal,
  handleSelectAllEvaluateds,
  handleSelectOneEvaluated,
  setSelectedEvaluatedsIds,
  action,
  handleEditEvaluated,
}) => {
  const [hasActiveEvaluteds] = useState(evaluateds.data.length > 0);

  const callNextPage = () => {
    const { pagination } = evaluateds;

    if (pagination.links["'next'"]) {
      const { page } = pagination.links["'next'"];
      // eslint-disable-next-line object-shorthand
      captureEvent('loadMoreRowsEvaluateds', { page: page });
      return handleSearchRequest(filterParams, inputSearchValue, page);
    }
    return false;
  };

  return (
    <>
      <InfiniteLoader
        isRowLoaded={({ index }) => !!evaluateds.data[index]}
        loadMoreRows={callNextPage}
        rowCount={Number(evaluateds?.pagination.total ?? 0)}
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
            rowCount={evaluateds?.data.length ?? 0}
            rowGetter={({ index }) => evaluateds.data[index]}
            onRowClick={() => {}}
            headerRowRenderer={(props, width) => (
              <TableHeader
                width={width}
                handleSelectAllEvaluateds={handleSelectAllEvaluateds}
                {...props}
              />
            )}
            rowRenderer={({ rowData, style, key }) => (
              <TableRow
                key={key}
                rowData={rowData}
                style={style}
                filterParams={filterParams}
                handleSelectOneEvaluated={handleSelectOneEvaluated}
                openModal={openModal}
                setSelectedEvaluatedsIds={setSelectedEvaluatedsIds}
                selectedEvaluatedsIds={selectedEvaluatedsIds}
                action={action}
                handleEditEvaluated={handleEditEvaluated}
              />
            )}
            noRowsRenderer={() => !isLoading && (
              <div className="empty-state">
                <EmptyState
                  icon={<NoSearchIcon />}
                  descriptionText=""
                  mainText={
                    intl.messages[`${hasActiveEvaluteds || !filterParams.active ? 'evaluateds.filters.noEvaluatedsFound' : 'evaluateds.noEvaluatedsYet'}`]
                  }
                />
                { !hasActiveEvaluteds
                  && (
                  <Button
                    component={Link}
                    to="/admin/evaluateds/new"
                    variant="contained"
                    onClick={() => captureNavigation('/admin/evaluateds/new')}
                  >
                    {intl.messages['evaluateds.createEvaluatedsToStart']}
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
