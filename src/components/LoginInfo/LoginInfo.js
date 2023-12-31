import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from 'mui-styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { withRouter } from '../../helpers/withRouter';
import { ExitToApp, FindInPageOutlined } from '@mui/icons-material';
import { light } from '../../styles/palette';
import UserIcon from '../shared/Icons/UserIcon';
import { captureNavigation } from '../../analytics';
import './LoginInfo.css';
import { ReactComponent as SmallBusinessSVG } from '../../assets/icons/small-business.svg';
import { UserButton } from "@clerk/clerk-react"; 

const MenuItemStyle = (props) => {
  const classes = makeStyles((theme) => ({
    root: {
      color: '#333333',
      fontSize: 12,
      paddingTop: 8,
      paddingDown: 8,
      paddingLeft: 16,
      paddingRight: 16,
    }
  }));

  return (
    <MenuItem classes={{ ...classes }} {...props} />
  )
}

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
      <div className="icon">
        {/* <UserIcon size={18} color={light.primary} /> */}
        <UserButton afterSignOutUrl="/login" /> 
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
        // getContentAnchorEl={null}
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
  intl: PropTypes.shape({ messages: PropTypes.shape() }).isRequired,
  name: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

LoginInfo.defaultProps = {
  name: '',
};

export default injectIntl(withRouter(LoginInfo));
