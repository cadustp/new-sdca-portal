import { all } from 'redux-saga/effects';
import appUsersSagas from './sagas/appUsersSagas';
import reportsSagas from './sagas/reportsSagas';
import actionPlanSagas from './sagas/actionPlanSagas';
import feedbackSagas from './sagas/feedbackSagas';
import statusSagas from './sagas/statusSagas';
import adherenceSagas from './sagas/adherenceSagas';
import qualitySagas from './sagas/qualitySagas';
import actionPlansSaga from './plans/plansSaga';
import appUserRemindersSaga from './appUserReminders/sagas';
import groupsSaga from './groups/sagas';
import usersSaga from './users/sagas';
import reportSaga from './report/sagas';
import evaluatedsSaga from './evaluateds/sagas';
import answerReminderSaga from './answerReminder/sagas';
import reminderSaga from './schedule/sagas';
import localeSaga from './locale/sagas';
import companySaga from './company/sagas';
import dashboardSaga from './dashboard/sagas';
import listsSaga from './lists/sagas';
import digitalContentsSaga from './digitalContents/sagas';
import publicAnswerSaga from './publicAnswer/sagas';
import formsSaga from './forms/sagas';
import loginSaga from './login/sagas';
import routinesSaga from './routines/sagas';
import featuresSaga from './features/sagas';

export default function* rootSaga() {
  yield all([
    ...appUsersSagas,
    ...actionPlansSaga,
    ...reportsSagas,
    ...actionPlanSagas,
    ...feedbackSagas,
    ...statusSagas,
    ...reportSaga,
    ...adherenceSagas,
    ...qualitySagas,
    ...appUserRemindersSaga,
    ...answerReminderSaga,
    ...groupsSaga,
    ...usersSaga,
    ...evaluatedsSaga,
    ...reminderSaga,
    ...localeSaga,
    ...companySaga,
    ...dashboardSaga,
    ...listsSaga,
    ...digitalContentsSaga,
    ...publicAnswerSaga,
    ...formsSaga,
    ...loginSaga,
    ...routinesSaga,
    ...featuresSaga
  ]);
}
