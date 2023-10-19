import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import withLoginAuth from '../components/withLoginAuth';
import HomeDashboard from '../containers/Dashboard/HomeDashboard';
import QualityDashboard from '../containers/Dashboard/QualityDashboard/QualityDashboard';
import Reports from '../containers/Reports';
import AppUserReminders from '../containers/appUserReminders';
import ActionPlanScreen from '../features/ActionPlan';
import AnswerReminder from '../containers/AnswerReminder';
import GroupsScreen from '../containers/Groups';
import UsersScreen from '../containers/Users';
import EditUserScreen from '../containers/EditUser';
import EvalutedsScreen from '../containers/Evaluateds';
import EditEvaluatedScreen from '../containers/EditEvaluated';
import ScheduleScreen from '../containers/Schedule/index';
import CreateReminderScreen from '../containers/CreateReminder';
import EditCompanyScreen from '../containers/EditCompany';
import DigitalContentsScreen from '../containers/DigitalContents';
import PublicAnswerScreen from '../containers/PublicAnswer';
import FormsScreen from '../containers/Forms';
import FormConstructorScreen from '../containers/FormConstructor';
import RoutinesScreen from '../containers/Routines';
import CreateRoutineScreen from '../containers/CreateRoutine';
import LoginScreen from '../containers/Login';
import useChatHubSpot from '../hooks/useHubSpotChat';
import { history } from '../redux/store';

function RouterSwitch(): JSX.Element {
  const localUser = JSON.parse(localStorage.getItem('user') || '{}');
  const enableHubspot = localUser?.enable_hubspot_chat;
  const userType = localUser?.majority_type;

  useChatHubSpot(enableHubspot, localUser);

  const ProtectedRoutes = {
    HomeDashboard: withLoginAuth(HomeDashboard),
    QualityDashboard: withLoginAuth(QualityDashboard),
    Reports: withLoginAuth(Reports),
    FormsScreen: withLoginAuth(FormsScreen),
    FormConstructorScreen: withLoginAuth(FormConstructorScreen),
    ActionPlanScreen: withLoginAuth(ActionPlanScreen),
    AppUserReminders: withLoginAuth(AppUserReminders),
    AnswerReminder: withLoginAuth(AnswerReminder),
    GroupsScreen: withLoginAuth(GroupsScreen),
    UsersScreen: withLoginAuth(UsersScreen),
    EditUserScreen: withLoginAuth(EditUserScreen),
    EvalutedsScreen: withLoginAuth(EvalutedsScreen),
    EditEvaluatedScreen: withLoginAuth(EditEvaluatedScreen),
    ScheduleScreen: withLoginAuth(ScheduleScreen),
    CreateReminderScreen: withLoginAuth(CreateReminderScreen),
    EditCompanyScreen: withLoginAuth(EditCompanyScreen),
    DigitalContentsScreen: withLoginAuth(DigitalContentsScreen),
    RoutinesScreen: withLoginAuth(RoutinesScreen),
    CreateRoutineScreen: withLoginAuth(CreateRoutineScreen),
  };

  const stagingRoutes = {
    '/admin/groups': ProtectedRoutes.GroupsScreen,
    '/admin/users': ProtectedRoutes.UsersScreen,
    '/admin/users/new': ProtectedRoutes.EditUserScreen,
    '/admin/users/edit': ProtectedRoutes.EditUserScreen,
    '/admin/evaluateds': ProtectedRoutes.EvalutedsScreen,
    '/admin/evaluateds/new': ProtectedRoutes.EditEvaluatedScreen,
    '/admin/evaluateds/edit': ProtectedRoutes.EditEvaluatedScreen,
    '/admin/schedule': ProtectedRoutes.ScheduleScreen,
    '/admin/schedule/new': ProtectedRoutes.CreateReminderScreen,
    '/admin/schedule/edit': ProtectedRoutes.CreateReminderScreen,
    '/admin/company/edit': ProtectedRoutes.EditCompanyScreen,
    '/admin/contents': ProtectedRoutes.DigitalContentsScreen,
  };

  const masterRoutes = {
    '/forms': ProtectedRoutes.FormsScreen,
    '/forms/new': ProtectedRoutes.FormConstructorScreen,
    '/forms/:id': ProtectedRoutes.FormConstructorScreen,
    '/routines': ProtectedRoutes.RoutinesScreen,
    '/routines/new': ProtectedRoutes.CreateRoutineScreen,
    '/routines/edit': ProtectedRoutes.CreateRoutineScreen,
  };

  const adminRoutes = {
    '/dashboard/quality': ProtectedRoutes.QualityDashboard,
  };

  const renderMasterRoutes = () => (
    userType === 'master'
      ? Object.keys(masterRoutes).map((path, key) => (
        <Route
          key={key}
          exact
          path={path}
          component={masterRoutes[path]}
        />
      )) : null
  );

  const renderAdminRoutes = () => (
    ['sub_admin', 'master'].includes(userType)
      ? Object.keys(adminRoutes).map((path, key) => (
        <Route
          key={key}
          exact
          path={path}
          component={adminRoutes[path]}
        />
      )) : null
  );

  const renderStagingRoutes = () => (
    Object.keys(stagingRoutes).map((path, key) => (
      <Route
        key={key}
        exact
        path={path}
        component={stagingRoutes[path]}
      />
    ))
  );

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/reset/:token" component={LoginScreen} />
        <Route exact path="/forms/public/:id" component={PublicAnswerScreen} />
        <Route
          exact
          path="/dashboard"
          component={ProtectedRoutes.HomeDashboard}
        />
        <Route
          exact
          path="/app_users/:app_user_id/answer/:id"
          component={ProtectedRoutes.AnswerReminder}
        />
        <Route
          exact
          path="/app_user/reminders"
          component={ProtectedRoutes.AppUserReminders}
        />
        <Route
          exact
          path="/reports/reminders"
          component={ProtectedRoutes.Reports}
        />
        <Route
          exact
          path="/action-plan"
          component={ProtectedRoutes.ActionPlanScreen}
        />
        {renderMasterRoutes()}
        {renderAdminRoutes()}
        {renderStagingRoutes()}
        <Redirect to="/login" />
      </Switch>
    </ConnectedRouter>
  );
}

export default (RouterSwitch);
