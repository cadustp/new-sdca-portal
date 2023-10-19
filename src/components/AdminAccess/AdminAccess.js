import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { SettingsOutlined } from '@material-ui/icons';
import { captureNavigation } from '../../analytics';
import './AdminAccess.css';

const MenuItemStyle = withStyles({
  root: {
    color: '#6A6A6A',
    fontSize: 12,
    paddingTop: 8,
    paddingDown: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
})(MenuItem);

const menuItems = [
  {
    name: 'groups',
    label: 'user_settings.groups',
    path: '/admin/groups',
    disabled: false,
  },
  {
    name: 'users',
    label: 'user_settings.users',
    path: '/admin/users',
    disabled: false,
  },
  {
    name: 'evaluateds',
    label: 'user_settings.evaluateds',
    path: '/admin/evaluateds',
    disabled: false,
  },
  {
    name: 'schedule',
    label: 'user_settings.schedule',
    path: '/admin/schedule',
    disabled: false,
  },
  {
    name: 'contents',
    label: 'user_settings.contents',
    path: '/admin/contents',
    disabled: false,
  },
];

function AdminAccess({ intl }) {
  const [settingsAnchor, setSettingsAnchor] = useState(null);

  const handleClick = event => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setSettingsAnchor(null);
  };

  return (
    <div className="user-settings">
      <div className="icon">
        <SettingsOutlined
          fontSize="default"
          style={{ color: '#6A6A6A' }}
          onClick={handleClick}
        />
      </div>
      <Menu
        id="settings"
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {menuItems.map(item => (
          <MenuItemStyle
            key={item.name}
            disabled={item.disabled}
            component={Link}
            to={item.path}
            onClick={() => { captureNavigation(item.path); }}
          >
            {intl.messages[item.label]}
          </MenuItemStyle>
        ))}
      </Menu>
    </div>
  );
}

AdminAccess.propTypes = {
  intl: PropTypes.element.isRequired,
};

export default injectIntl(withRouter(AdminAccess));
