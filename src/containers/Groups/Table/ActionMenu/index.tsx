import React, { useState } from 'react';
import { MoreVert } from '@mui/icons-material';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from 'mui-styles';
import { GROUP_MODAL_TYPES } from '../../../../helpers/consts';
import { light } from '../../../../styles/palette';
import { captureEvent } from '../../../../analytics';

const MenuItemStyle = (props: any) => {
  const classes = makeStyles((theme) => ({
    root: {
      color: '#6A6A6A',
      fontSize: 12,
    }
  }));

  return <MenuItem classes={{ ...classes }} {...props} />
}

type Props = {
  intl: {
    messages: [],
    locale: string,
  }
};

const ActionMenu = ({
  intl,
  triggerAction,
  rowData,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = event => {
    captureEvent('openGroupMenu');
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = e => {
    setAnchorEl(null);
  };

  const actionsList = [
    {
      action: () => {
        triggerAction(GROUP_MODAL_TYPES.EDIT.key);
        captureEvent('openEditGroups');
      },
      key: 'edit',
      label: 'utils.edit',
    },
    {
      action: () => {
        triggerAction(GROUP_MODAL_TYPES.DELETE.key);
        captureEvent('openDeleteGroups');
      },
      key: 'delete',
      label: 'utils.delete',
    },
  ];

  const renderGroupMenu = items => (
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
          onClick={
              item.action
            }
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
      {renderGroupMenu(actionsList)}
    </>

  );
};

export default ActionMenu;
