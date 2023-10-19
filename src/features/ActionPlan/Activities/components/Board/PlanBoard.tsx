import React, { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Loading from '../../../../../components/shared/LoadingIcon';
import Column from '../Column';
import EmptyState from '../EmptyState';
import EmptyStateSearch from '../../../../../containers/Reports/EmptyState';
import { EmptyDataIcon } from '../../../../../components/shared/Icons';

import {
  BoardContainer,
  PageContainer
} from './styles';
import { captureEvent } from '../../../../../analytics';

export default function PlanBoard({
  boardData,
  intl,
  moveCard,
  reorderCard,
  loading,
  fetchPlansList,
}): JSX.Element {
  useEffect(() => {
    fetchPlansList();
  }, []);

  const onDragEnd = ({ source, destination }) => {
    captureEvent('dragActionCard', { fromStatus: source.droppableId, toStatus: destination.droppableId });
    const validDestination = destination !== undefined && destination != null;

    const validSource = source !== undefined && source != null;

    if (!validDestination || !validSource) return;

    const wasNotChanged = source.droppableId === destination.droppableId
      && destination.index === source.index;

    if (wasNotChanged) return;

    if (source.droppableId === destination.droppableId) {
      reorderCard({ boardColumns: boardData, source, destination });
    } else {
      moveCard({
        boardColumns: boardData,
        source,
        destination,
        errorMessage: intl.formatMessage({ id: 'action_plan.move_card_error' }),
      });
    }
  };

  const hasActionPlans = !!boardData;

  const list = Object.values(boardData);

  const filterList = list.filter((item: any) => item.list.length !== 0);

  const renderColumn = () => {
    if (filterList.length === 0) {
      return (
        <EmptyStateSearch
          icon={<EmptyDataIcon />}
          descriptionText={intl.formatMessage({
            id: 'action_plan.filter.empty_state.description_text',
          })}
          mainText={intl.formatMessage({
            id: 'action_plan.filter.empty_state.main_text',
          })}
        />
      );
    }
    if (hasActionPlans) {
      return (
        <DragDropContext onDragEnd={onDragEnd}>
          <BoardContainer>
            {Object.values(boardData).map((col: any) => (
              <Column col={col} key={col.id} />
            ))}
          </BoardContainer>
        </DragDropContext>
      );
    }

    return <EmptyState />;
  };

  return (
    <>
      {loading ? (
        <Loading size={56} />
      ) : (
        <PageContainer>
          {renderColumn()}
        </PageContainer>
      )}
    </>
  );
}
