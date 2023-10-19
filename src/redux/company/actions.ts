import { action } from 'typesafe-actions';
import { CompanyTypes } from './types';

export const companyDataRequest = () => action(CompanyTypes.COMPANY_DATA_REQUEST);
export const companyDataRequestResponse = response => action(CompanyTypes.COMPANY_DATA_REQUEST_RESPONSE, response);
export const clearCompanyData = () => action(CompanyTypes.CLEAR_COMMPANY_DATA);
export const saveCompanyRequest = payload => action(CompanyTypes.SAVE_COMPANY_REQUEST, payload);
export const saveCompanyRequestResponse = response => action(CompanyTypes.SAVE_COMPANY_REQUEST_RESPONSE, response);
