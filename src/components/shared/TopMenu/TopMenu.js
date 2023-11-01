/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import MenuListComposition from './MenuListComposition';

import { toggleExportButton } from '../../../redux/actions/reports-actions';

import { TopMenuContainer } from './styles';

const TopMenu = ({ intl, user }) => {
  const hasMasterAccess = () => {
    if (user?.majority_type) {
      return ['master'].includes(user.majority_type);
    }
    const localUser = JSON.parse(localStorage.getItem('user'));
    return ['master'].includes(localUser.majority_type);
  };

  const hasAdminAccess = () => {
    if (user?.majority_type) {
      return ['sub_admin', 'master'].includes(user.majority_type);
    }
    const localUser = JSON.parse(localStorage.getItem('user'));
    return ['sub_admin', 'master'].includes(localUser.majority_type);
  };

  const actionPlan = {
    menuTitle: {
      label: intl.messages['top_menu.action_plan'],
      link: '/action-plan',
    },
  };

  const forms = {
    menuTitle: { label: intl.messages['top_menu.forms'], link: '/forms' },
  };

  const routines = {
    menuTitle: { label: intl.messages['user_settings.routines'], link: '/routines' },
  };

  let dashboards = {};
  if (hasAdminAccess()) {
    dashboards = {
      menuTitle: {
        label: intl.messages['top_menu.dashboards'],
        type: 'dashboards',
      },
      menuItems: [
        {
          label: intl.messages['top_menu.adherence'],
          link: '/dashboard',
        },
        {
          label: intl.messages['top_menu.quality'],
          link: '/dashboard/quality',
        },
      ],
    };
  } else {
    dashboards = {
      menuTitle: {
        label: intl.messages['top_menu.adherence'],
        link: '/dashboard',
      },
    };
  }
  const reportsMenu = {
    label: intl.messages['top_menu.reports'],
    type: 'reports',
    link: '/reports/reminders',
  };

  const remindersMenu = {
    label: intl.messages['top_menu.reminders'],
    type: 'app_user_reminder',
    link: '/app_user/reminders',
  };

  return (
    <TopMenuContainer>
      <MenuListComposition
        menuTitle={dashboards.menuTitle}
        menuItems={dashboards.menuItems}
      />
      {hasMasterAccess() && (
      <>
        <MenuListComposition menuTitle={forms.menuTitle} />
        <MenuListComposition menuTitle={routines.menuTitle} />
      </>
      )}
      <MenuListComposition
        menuTitle={remindersMenu}
      />
      <MenuListComposition
        menuTitle={reportsMenu}
      />
      <MenuListComposition menuTitle={actionPlan.menuTitle} />
    </TopMenuContainer>
  );
};

TopMenu.propTypes = {
  intl: PropTypes.shape({
    messages: PropTypes.shape(),
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.login.information,
});

const mapDispatchToProps = dispatch => ({
  handleButtonClick: () => dispatch(toggleExportButton()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TopMenu));
