import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter, Link } from 'react-router-dom';
import { ExitToApp, FindInPageOutlined } from '@material-ui/icons';
import { light } from '../../styles/palette';
import UserIcon from '../shared/Icons/UserIcon';
import { captureNavigation } from '../../analytics';
import './LoginInfo.css';
import { ReactComponent as SmallBusinessSVG } from '../../assets/icons/small-business.svg';

const MenuItemStyle = withStyles({
  root: {
    color: '#333333',
    fontSize: 12,
    paddingTop: 8,
    paddingDown: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
})(MenuItem);

function LoginInfo({
  intl, logout, name, isMasterAdmin, openPreviewMenu,
}) {
  const [anchor, setAnchor] = useState(null);

  const handleClick = event => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <div className="login-info">
      <div className="icon" onClick={handleClick}>
        <UserIcon size={18} color={light.primary} />
      </div>
      {name ? (
        <div className="name">
          {intl.messages['login_info.hello']}
          ,
          {' '}
          {name}
        </div>
      ) : null}
      <Menu
        id="menu"
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        getContentAnchorEl={null}
        MenuListProps={{
          style: {
            padding: 0,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <>
          <MenuItemStyle onClick={openPreviewMenu}>
            <FindInPageOutlined
              fontSize="default"
              style={{ color: light.primary, marginRight: '15px' }}
            />
            {intl.messages['login_info.feature_preview']}
          </MenuItemStyle>
          <div style={{ padding: '5px', paddingLeft: '16px', paddingRight: '16px' }}>
            <div style={{ width: '100%', backgroundColor: '#E8E8E8', height: '2px' }} />
          </div>
        </>
        {isMasterAdmin
          ? (
            <MenuItemStyle
              component={Link}
              to="/admin/company/edit"
              onClick={() => { captureNavigation('/admin/company/edit'); }}
            >
              <SmallBusinessSVG
                fill={light.primary}
                style={{ marginRight: '15px' }}
              />
              {intl.messages['login_info.company.data']}
            </MenuItemStyle>
          )
          : null }
        <MenuItemStyle onClick={logout}>
          <ExitToApp
            fontSize="default"
            style={{ color: light.primary, marginRight: '15px' }}
          />
          {intl.messages['login_info.logout']}
        </MenuItemStyle>
      </Menu>
    </div>
  );
}

LoginInfo.propTypes = {
  intl: PropTypes.element.isRequired,
  name: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

LoginInfo.defaultProps = {
  name: '',
};

export default injectIntl(withRouter(LoginInfo));
