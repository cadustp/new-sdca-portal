import { combineReducers } from 'redux';
import { createRouterReducer } from '@lagunovsky/redux-react-router';
import companyReducer from './company-reducer';
import qualityReducer from './quality-reducer';
import statusReducer from './status-reducer';
import adherenceReducer from './adherence-reducer';
import formReducer from './form-reducer';
import groupReducer from './group-reducer';
import ActionPlanReducer from './action-plan-reducer';
import FeedbackReducer from './feedback-reducer';
import filters from '../app/filters/duck.ts';
import reportsReducer from './reports-reducer';
import reminderStatusesReducer from './reminder-statuses-reducer';
import appUsersReducer from './app-users-reducer';
import valuatedUsersReducer from './valuated-users-reducer';
import localeReducer from './locale-reducer';
import app from '../app/duck';
import plans from '../plans/duck.ts';
import appUserReminders from '../appUserReminders/index.ts';
import plansSideFilters from '../plansSideFilter/index.ts'
import remindersSideFilters from '../RemindersSideFilters/index.ts';
import answerReminder from '../answerReminder/index.ts';
import groups from '../groups/index.ts';
import users from '../users/index.ts';
import evaluateds from '../evaluateds/index.ts';
import report from '../report/index';
import reminder from '../schedule/index.ts';
import locale from '../locale/index.ts';
import company from '../company/index.ts';
import dashboard from '../dashboard/index.ts';
import lists from '../lists/index.ts';
import digitalContents from '../digitalContents/index.ts';
import publicAnswer from '../publicAnswer/index.ts';
import forms from '../forms/index.ts';
import login from '../login/index';
import routines from '../routines/index';
import features from '../features/index';

const rootReducer = history => combineReducers({
  router: createRouterReducer(history),
  app,
  companyReducer,
  qualityReducer,
  statusReducer,
  adherenceReducer,
  formReducer,
  ActionPlanReducer,
  groupReducer,
  FeedbackReducer,
  filters,
  reminderStatusesReducer,
  appUsersReducer,
  valuatedUsersReducer,
  reportsReducer,
  localeReducer,
  plans,
  appUserReminders,
  plansSideFilters,
  remindersSideFilters,
  answerReminder,
  groups,
  users,
  evaluateds,
  reminder,
  report,
  locale,
  company,
  dashboard,
  lists,
  digitalContents,
  publicAnswer,
  forms,
  login,
  features,
  routines,
});

export default rootReducer;
