import React, { useState } from 'react';
import { MoreVert } from '@mui/icons-material';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/material/styles';
import { REMINDER_MODAL_TYPES } from '../../../../helpers/consts';
import { light } from '../../../../styles/palette';
import { STATUSES } from '../../../../assets/constants';
import { captureEvent } from '../../../../analytics';

const MenuItemStyle = makeStyles({
  root: {
    color: '#6A6A6A',
    fontSize: 12,
  },
})(MenuItem);

const ActionMenu = ({
  intl,
  handleOpenModal,
  rowData,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = event => {
    captureEvent('openReminderMenu');
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = e => {
    setAnchorEl(null);
  };

  const actionsList = [
    {
      action: () => {
        handleOpenModal(REMINDER_MODAL_TYPES.EDIT.key);
        captureEvent('openEditSchedule');
      },
      key: 'edit',
      label: 'utils.edit',
    },
    {
      action: () => {
        handleOpenModal(REMINDER_MODAL_TYPES.CANCEL.key);
        captureEvent('openCancel');
      },
      key: 'cancel',
      label: 'schedule.actions.cancel',
    },
    {
      action: () => {
        handleOpenModal(REMINDER_MODAL_TYPES.DELETE.key);
        captureEvent('openDeleteSchedule');
      },
      key: 'delete',
      label: 'utils.delete',
    },
    {
      action: () => {
        handleOpenModal(REMINDER_MODAL_TYPES.RESCHEDULE.key);
        captureEvent('openReschedule');
      },
      key: 'reschedule',
      label: 'utils.reschedule',
    },
  ];

  const handleActionsList = () => {
    const acomplished = rowData.app_users.some(
      m => (m.status === STATUSES.ACCOMPLISHED.id),
    );
    const canceled = rowData.app_users.some(
      m => (m.status === STATUSES.CANCELED.id),
    );

    let actions = actionsList;
    if (acomplished) actions = actionsList.filter(a => a.key === 'cancel');
    else if (canceled) actions = actionsList.filter(a => (a.key === 'cancel' || a.key === 'delete'));
    return actions;
  };

  const renderUserMenu = (user, items) => (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
      PaperProps={{
        style: {
          padding: 0,
          transform: 'translateY(+20%)',
        },
      }}
    >
      {items.map(item => (
        <MenuItemStyle
          key={item.label}
          onClick={e => {
            item.action();
            handleCloseMenu(e);
          }}
          style={{ color: light.gray.dark }}
        >
          {intl.messages[item.label] || item.label}
        </MenuItemStyle>
      ))}
    </Menu>
  );

  return (
    <>
      <MoreVert
        cursor="pointer"
        onClick={handleOpenMenu}
      />
      {renderUserMenu(1, handleActionsList())}
    </>

  );
};

export default ActionMenu;
