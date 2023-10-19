import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import Tooltip from '@mui/material/Tooltip';
import { MoreVert } from '@mui/icons-material';
import { Menu, Checkbox } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { makeStyles } from '@mui/material/styles';
import TableGenericRow from '../../../../components/TableGenericRow';
import Avatar from '../../../../components/Avatar';
import { light } from '../../../../styles/palette';
import { filterParams, User } from '../../../../redux/users/types';
import '../styles.css';
import { captureEvent } from '../../../../analytics';

type Props = {
  intl: {
    messages: [],
    locale: string,
  }
};

type StateProps = {
  rowData: User,
  style: any,
  filterParams: filterParams,
  selectedUsersIds: Array<number>,
  action: string,
};

type DispatchProps = {
  handleSelectOneUser: Function;
  openModal: Function,
  setSelectedUsersIds: Function,
  setSelectedUserName: Function,
  handleEditUser: Function;
};

const setColor = type => {
  switch (type) {
    case 'sub_admin':
      return '#E36262';
    case 'master':
      return '#59A1D0';
    case 'app_user':
      return '#52AD8C';
    default:
      return 'grey';
  }
};

const renderAvatar = (type, translate) => (
  <Tooltip
    title={translate}
  >
    <div className="avatar-container">
      <Avatar
        color={setColor(type.name)}
        width={30}
        height={30}
        empty={false}
      >
        <p className="avatar-text">
          {translate[0].toUpperCase()}
        </p>
      </Avatar>
    </div>
  </Tooltip>
);

const MenuItemStyle = makeStyles({
  root: {
    color: '#6A6A6A',
    fontSize: 12,
  },
})(MenuItem);

const TableRow: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  rowData,
  style,
  filterParams,
  selectedUsersIds,
  handleSelectOneUser,
  openModal,
  setSelectedUsersIds,
  setSelectedUserName,
  action,
  handleEditUser,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = event => {
    captureEvent('openUserMenu');
    setAnchorEl(event.currentTarget);
  };

  const handleActiveInactiveUser = user => {
    handleCloseMenu();
    openModal(true);
    setSelectedUsersIds([user.id]);
    setSelectedUserName(user.name);
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
        (item.key === 'edit' && !user.active) ? null
          : (
            <MenuItemStyle
              key={item.label}
              onClick={
            item.key === 'edit' ? () => {
              handleEditUser(user);
              captureEvent('openEditUsers');
            } : () => {
              handleActiveInactiveUser(user);
              captureEvent('openActivateUsersTable', { action: user?.active ? 'inactivate' : 'activate' });
            }
          }
              style={{ color: light.gray.dark }}
            >
              {intl.messages[item.label] || item.label}
            </MenuItemStyle>
          )
      ))}
    </Menu>
  );

  const userMenuItems = [
    {
      label: 'users.edit',
      key: 'edit',
    },
    {
      label: action,
      key: 'activeInactive',
    },
  ];

  return (
    <TableGenericRow
      style={style}
      styleInner={{ cursor: 'auto' }}
    >
      <div className="user-checkbox-container">
        <Checkbox
          color="primary"
          onChange={e => {
            handleSelectOneUser(e, rowData.id);
            captureEvent('selectUser', { checked: e.target.checked });
          }}
          checked={selectedUsersIds?.includes(rowData.id)}
        />
      </div>
      <div className="user-row-container">
        <p>{rowData.register}</p>
      </div>
      <div className="user-row-container">
        <p>{rowData.name}</p>
      </div>
      <div className="user-row-container">
        <p>{rowData.email}</p>
      </div>
      <div className="user-row-container">
        <p>{rowData.group.name}</p>
      </div>
      <div className="user-row-container centered">
        {
          rowData.types
            .filter(type => type.active === filterParams.active && type.name !== 'company_employee')
            .map(type => renderAvatar(type, intl.messages[type.name]))
        }
      </div>

      <div className="user-row-container centered">
        <MoreVert
          cursor="pointer"
          onClick={handleOpenMenu}
        />
      </div>
      {renderUserMenu(rowData, userMenuItems)}
    </TableGenericRow>
  );
};

export default injectIntl(TableRow);
