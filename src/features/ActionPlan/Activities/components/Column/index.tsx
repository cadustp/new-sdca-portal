import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { injectIntl } from 'react-intl';
import ActionPlanCard from '../ActionPlanCard';
import { ListContainer, TaskItem, List } from './styles';
import { getActionPlanColor } from '../../../../../helpers/utils';
import { Intl } from '../../../../../helpers/types';

type Props = {
  col: {
    list: any[];
    id: number;
    title: string;
  };
  intl: Intl;
};

const Column = ({ col, intl }: Props): JSX.Element => {
  const { list, id, title } = col;
  const statusColor = getActionPlanColor(id);

  return (
    <ListContainer color={statusColor}>
      <header>
        <h2>{intl.formatMessage({ id: `action_plan.${title}` })}</h2>
      </header>
      <List>
        <Droppable droppableId={`${id}`}>
          {(provided, snapshot) => (
            <TaskItem
              isDraggingOver={snapshot.isDraggingOver}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {list.map((actionPlanData, index) => (
                <ActionPlanCard
                  actionPlanData={actionPlanData}
                  index={index}
                  statusColor={statusColor}
                />
              ))}
              {provided.placeholder}
            </TaskItem>
          )}
        </Droppable>
      </List>
    </ListContainer>
  );
};

export default injectIntl(Column);
