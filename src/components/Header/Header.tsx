import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import { HelpOutline } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import DaywayLogo from '../../assets/branding/new_logo.svg';

import { captureEvent } from '../../analytics';

import TopMenu from '../shared/TopMenu/TopMenu';
import LanguagePicker from '../LanguagePicker';
import LoginInfo from '../LoginInfo/LoginInfo';
import FeaturePreviewMenu from './FeaturePreviewMenu';
import AdminAccess from '../AdminAccess/AdminAccess';

import './header.css';

type Props = {
  children: any,
  intl: any,
  user: any,
  doLogout: any,
  features: any,
  updateFeaturesRequest: Function,
  loadingFeatures: boolean,
  getFeaturesRequest: any,
};

const Header: React.FC<Props> = ({
  children,
  intl,
  user,
  features,
  getFeaturesRequest,
  updateFeaturesRequest,
  loadingFeatures,
  doLogout,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [previewMenuOpen, setPreviewMenuOpen] = useState(false);

  const openKnowledgeBase = () => {
    const knowledgeLink = process.env.REACT_APP_KNOWLEDGE_LINK;
    captureEvent('openKnowledgeBase', { from: window.location.pathname });
    return window.open(knowledgeLink, '_blank');
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const togglePreviewMenu = () => setPreviewMenuOpen(!previewMenuOpen);

  return (
    <>
      <AppBar position="static" className="app-header">
        <ToolBar className="app-header-toolbar">
          <div className="app-header-user-options">
            <IconButton
              className="app-header-menu-button"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/dashboard" onClick={() => captureEvent('clickCompanyLogo', { from: window.location.pathname })}>
              <img
                className="app-header-logo"
                src={user.companyLogo ?? DaywayLogo}
                height={35}
                alt={intl.messages['menu_wrapper.company_logo']}
              />
            </Link>
            <Box className="app-header-links">
              <TopMenu />
            </Box>
          </div>
          <Box className="app-header-user-options">
            {user.majority_type !== undefined && ['sub_admin', 'master'].includes(user.majority_type) ? <AdminAccess /> : null}
            <HelpOutline
              onClick={openKnowledgeBase}
              fontSize="default"
              style={{ color: '#6A6A6A', cursor: 'pointer', marginRight: '12px' }}
            />
            <LoginInfo 
              name={user.name}
              openPreviewMenu={() => togglePreviewMenu() }
              isMasterAdmin={user.majority_type === 'master'} 
              logout={() => doLogout({ manualLogout: true })} />
            <LanguagePicker />
          </Box>
          <FeaturePreviewMenu
            features={features}
            loadingFeatures={loadingFeatures}
            getFeaturesRequest={getFeaturesRequest}
            updateFeaturesRequest={updateFeaturesRequest}
            handleCloseTab={togglePreviewMenu} 
            isOpen={previewMenuOpen} 
            intl={intl}
          />
          <Drawer
            {...{
              anchor: 'left',
              open: drawerOpen,
              onClose: toggleDrawer,
            }}
          >
            <Box className="app-header-drawer-links">
              <TopMenu />
            </Box>
          </Drawer>
        </ToolBar>
      </AppBar>
      <div className="dashboardWrapper">{children}</div>
    </>
  );
};

export default injectIntl(Header);
