import {
  takeLatest, put, call,
} from 'redux-saga/effects';
import { AnyAction } from 'redux';
import apiService from '../../services/apiService';
import { RESPONSE_STATUS } from '../../helpers/consts';
import { CompanyTypes } from './types';
import {
  saveCompanyRequestResponse,
  companyDataRequestResponse,
} from './actions';
import { captureEvent } from '../../analytics';

export function* companyDataRequest({
  payload,
}: AnyAction) {
  try {
    const url = '/company';
    const { data } = yield call(apiService.get, url);
    const settings = {
      qualityAvg: data.settings.filter(setting => setting.setting_id === 3)[0],
      qualityHigh: data.settings.filter(setting => setting.setting_id === 4)[0],
      adherenceAvg: data.settings.filter(setting => setting.setting_id === 5)[0],
      adherenceHigh: data.settings.filter(setting => setting.setting_id === 6)[0],
      reescheduleLimit: data.settings.filter(setting => setting.setting_id === 7)[0],
      appCreate: data.settings.filter(setting => setting.setting_id === 11)[0],
      appReeschedule: data.settings.filter(setting => setting.setting_id === 22)[0],
      appCancel: data.settings.filter(setting => setting.setting_id === 23)[0],
      allEvaluatorsCreate: data.settings.filter(setting => setting.setting_id === 33)[0],
      reescheduleLow: data.settings.filter(setting => setting.setting_id === 8)[0],
      reescheduleHigh: data.settings.filter(setting => setting.setting_id === 9)[0],
      reescheduleAttached: data.settings.filter(setting => setting.setting_id === 10)[0],
      sundayReeschedule: data.settings.filter(setting => setting.setting_id === 26)[0],
      saturdayReeschedule: data.settings.filter(setting => setting.setting_id === 27)[0],
      evaluatedEmail: data.settings.filter(setting => setting.setting_id === 31)[0],
      evaluatorEmail: data.settings.filter(setting => setting.setting_id === 32)[0],
    };
    yield put(companyDataRequestResponse({
      company: data.company,
      settings,
    }));
  } catch (error: any) {
    yield put(companyDataRequestResponse({
      failure: true,
    }));
  }
}

export function* saveCompanyRequest({
  payload,
}: AnyAction) {
  try {
    const params = {
      id: payload.company.id,
      name: payload.company.name,
      domain: payload.company.domain.length ? payload.company.domain : null,
      language_id: payload.company.language.key,
      settings: payload.settings ?? null,
    };

    const url = '/company/update';
    const response = yield call(apiService.post, url, params);

    if (response.status === 200 && payload.company.logo?.file) {
      const image = new FormData();
      image.append('image', payload.company.logo.file, 'original');
      image.append('id', payload.company.id);

      const { data, status } = yield call(apiService.post, url, image);
      if (status === 200) {
        const localUser = JSON.parse(localStorage.getItem('user') || '{}');
        localUser.companyLogo = data.company.logo;
        localStorage.setItem('user', JSON.stringify(localUser));
        window.location.reload();
      }
    }
    yield put(saveCompanyRequestResponse({
      saveStatus: RESPONSE_STATUS.SUCCESS,
    }));
    captureEvent('updateCompanySettings', {
      status: 'success',
      name: payload.company.name,
      newLogo: !!payload.company.logo?.file,
      settings: payload.settings,
    });
    return true;
  } catch (error: any) {
    captureEvent('updateCompanySettings', {
      status: 'error',
      name: payload.company.name,
      newLogo: !!payload.company.logo?.file,
      settings: payload.settings,
      error: error.response.data.message,
    });
    yield put(saveCompanyRequestResponse({
      saveStatus: RESPONSE_STATUS.FAILURE,
      saveError: error.response.data.message,
    }));
  }
}

export default [
  takeLatest(
    CompanyTypes.COMPANY_DATA_REQUEST,
    companyDataRequest,
  ),
  takeLatest(
    CompanyTypes.SAVE_COMPANY_REQUEST,
    saveCompanyRequest,
  ),
];
