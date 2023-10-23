import React, { useState } from 'react';
import { MoreVert } from '@mui/icons-material';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from 'mui-styles';
import { CONTENTS_MODAL_TYPES } from '../../../../../helpers/consts';
import { light } from '../../../../../styles/palette';
import { captureEvent } from '../../../../../analytics';

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
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = event => {
    captureEvent('openContentMenu');
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = e => {
    setAnchorEl(null);
  };

  const actionsList = [
    {
      action: () => {
        setAnchorEl(null);
        triggerAction(CONTENTS_MODAL_TYPES.ACCESS.key);
        captureEvent('openContent');
      },
      key: 'access',
      label: 'utils.access',
    },
    {
      action: () => {
        setAnchorEl(null);
        triggerAction(CONTENTS_MODAL_TYPES.EDIT.key);
        captureEvent('openEditContents');
      },
      key: 'edit',
      label: 'utils.edit',
    },
    {
      action: () => {
        setAnchorEl(null);
        triggerAction(CONTENTS_MODAL_TYPES.DELETE.key);
        captureEvent('openDeleteContents');
      },
      key: 'delete',
      label: 'utils.delete',
    },
  ];

  const renderContentMenu = items => (
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
      {renderContentMenu(actionsList)}
    </>

  );
};

export default ActionMenu;
