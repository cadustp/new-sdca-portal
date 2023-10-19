import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Menu, Tooltip } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import moment from '../../../../../timezones/moment';

import { getInitials } from '../../../../../helpers/utils';
import {
  EllipseVerticalIcon,
  TrashIcon,
} from '../../../../../components/shared/Icons';
import Avatar from '../../../../../components/Avatar';
import {
  Container,
  MenuButton,
  DataContainer,
  AvatarContainer,
  AvatarText,
  DataItem,
  CardTitle,
  MenuItemStyled,
} from './styles';
import { ActionPlanCardTypes } from './index';
import { captureEvent } from '../../../../../analytics';

const ActionPlanCard = ({
  actionPlanData,
  intl,
  index,
  openDeletionModal,
  statusColor,
  handleCreationModalVisibility,
}: ActionPlanCardTypes): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState(null);
  const minimumUsers = 1;

  const handleOpen = event => {
    captureEvent('openCardMenu');
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  const openDeleteModal = event => {
    event.stopPropagation();
    event.preventDefault();
    openDeletionModal({
      planId: actionPlanData.id,
      planName: actionPlanData.name,
    });
    captureEvent('deleteAction', { status: actionPlanData.status });
  };

  return (
    <Draggable
      key={`${actionPlanData.id}`}
      draggableId={`${actionPlanData.id}`}
      index={index}
    >
      {provided => (
        <Container
          onClick={() => {
            captureEvent('openEditActionPlan', { status: actionPlanData.status });
            handleCreationModalVisibility({
              isVisible: true,
              planId: actionPlanData.id,
            });
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <Tooltip title={actionPlanData.name} placement="top">
              <CardTitle>{actionPlanData.name}</CardTitle>
            </Tooltip>
            <div>
              <MenuButton
                aria-owns={
                  anchorEl
                    ? `contextual-menu-plans-${actionPlanData.id}`
                    : undefined
                }
                aria-haspopup
                onClick={handleOpen}
              >
                <EllipseVerticalIcon size={22} />
              </MenuButton>
              <Menu
                id={`contextual-menu-plans-${actionPlanData.id}`}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={e => handleClose(e)}
                PaperProps={{
                  style: {
                    padding: 0,
                    transform: 'translate(10%, 50%)',
                  },
                }}
                MenuListProps={{
                  style: {
                    padding: 0,
                  },
                }}
              >
                <MenuItemStyled onClick={openDeleteModal}>
                  <TrashIcon size={16} />
                  {intl.formatMessage({ id: 'action_plan.delete' })}
                </MenuItemStyled>
              </Menu>
            </div>
          </div>
          <div>
            <DataContainer>
              <DataItem>
                <p>
                  {intl.formatMessage({ id: 'action_plan.expected_start' })}
                </p>
                <span>
                  {moment(actionPlanData.start_date)
                    .locale(intl.locale)
                    .format('L')}
                </span>
              </DataItem>
              <DataItem>
                <p>{intl.formatMessage({ id: 'action_plan.expected_end' })}</p>
                <span>
                  {moment(actionPlanData.end_date)
                    .locale(intl.locale)
                    .format('L')}
                </span>
              </DataItem>
            </DataContainer>
          </div>
          <AvatarContainer>
            <Avatar color={statusColor} width={24} height={24}>
              <AvatarText isColored>
                {getInitials(actionPlanData.users[0].name)}
              </AvatarText>
            </Avatar>
            {actionPlanData.users.length > minimumUsers && (
              <div style={{ marginLeft: '4px' }}>
                <Avatar color={statusColor} empty width={24} height={24}>
                  <AvatarText color={statusColor}>
                    +
                    {actionPlanData.users.length - 1}
                  </AvatarText>
                </Avatar>
              </div>
            )}
          </AvatarContainer>
        </Container>
      )}
    </Draggable>
  );
};

export default injectIntl(ActionPlanCard);
