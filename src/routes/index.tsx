import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthenticateWithRedirectCallback, ClerkProvider, SignIn } from '@clerk/clerk-react';
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
import SsoLogin from '../containers/Login/Sso';
import Callback from '../containers/Login/Sso/SsoCallback';
import RecoverScreen from '../containers/Login/Recover';

function RouterSwitch(): JSX.Element {
  const localUser = JSON.parse(localStorage.getItem('user') || '{}');
  const enableHubspot = localUser?.enable_hubspot_chat;
  const userType = localUser?.majority_type;
  const navigate = useNavigate();
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || "";

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

  const stagingRoutes = [
    { path: "/admin/groups", element: <ProtectedRoutes.GroupsScreen /> },
    { path: "/admin/users", element: <ProtectedRoutes.UsersScreen /> },
    { path: "/admin/users/new", element: <ProtectedRoutes.EditUserScreen /> },
    { path: "/admin/users/edit", element: <ProtectedRoutes.EditUserScreen /> },
    { path: "/admin/evaluateds", element: <ProtectedRoutes.EvalutedsScreen /> },
    { path: "/admin/evaluateds/new", element: <ProtectedRoutes.EditEvaluatedScreen /> },
    { path: "/admin/evaluateds/edit", element: <ProtectedRoutes.EditEvaluatedScreen /> },
    { path: "/admin/schedule", element: <ProtectedRoutes.ScheduleScreen /> },
    { path: "/admin/schedule/new", element: <ProtectedRoutes.CreateReminderScreen /> },
    { path: "/admin/schedule/edit", element: <ProtectedRoutes.CreateReminderScreen /> },
    { path: "/admin/company/edit", element: <ProtectedRoutes.EditCompanyScreen /> },
    { path: "/admin/contents", element: <ProtectedRoutes.DigitalContentsScreen /> }
  ];

  const masterRoutes = [
    { path: "/forms", element: <ProtectedRoutes.FormsScreen /> },
    { path: "/forms/new", element: <ProtectedRoutes.FormConstructorScreen /> },
    { path: "/forms/:id", element:  <ProtectedRoutes.FormConstructorScreen /> },
    { path: "/routines", element: <ProtectedRoutes.RoutinesScreen /> },
    { path: "/routines/new", element: <ProtectedRoutes.CreateRoutineScreen /> },
    { path: "/routines/edit", element: <ProtectedRoutes.CreateRoutineScreen /> }
  ];

  const adminRoutes = [
    { path: "/dashboard/quality", element: <ProtectedRoutes.QualityDashboard /> }
  ];

  const renderMasterRoutes = () => (
    userType === 'master'
      ? masterRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      )) : null
  );

  const renderAdminRoutes = () => (
    ['sub_admin', 'master'].includes(userType)
      ? adminRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      )) : null
  );

  const renderStagingRoutes = () => (
    stagingRoutes.map(({ path, element }) => (
      <Route
        key={path}
        path={path}
        element={element}
      />
    ))
  );

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/reset/:token" element={<RecoverScreen />} />
        <Route path="/forms/public/:id" element={<PublicAnswerScreen />} />
        <Route path="/sso-login" element={<SsoLogin />} />
        <Route path="/sso-callback" element={<Callback />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoutes.HomeDashboard />}
        />
        <Route
          path="/app_users/:app_user_id/answer/:id"
          element={<ProtectedRoutes.AnswerReminder />}
        />
        <Route
          path="/app_user/reminders"
          element={<ProtectedRoutes.AppUserReminders />}
        />
        <Route
          path="/reports/reminders"
          element={<ProtectedRoutes.Reports />}
        />
        <Route
          path="/action-plan"
          element={<ProtectedRoutes.ActionPlanScreen />}
        />
        {renderMasterRoutes()}
        {renderAdminRoutes()}
        {renderStagingRoutes()}
        <Route path='/*' element={<Navigate to="/login" />} />
      </Routes>
    </ClerkProvider>
  );
}

export default (RouterSwitch);
