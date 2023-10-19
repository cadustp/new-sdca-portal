export enum CompanyTypes {
  COMPANY_DATA_REQUEST = 'COMPANY_DATA_REQUEST',
  COMPANY_DATA_REQUEST_RESPONSE = 'COMPANY_DATA_REQUEST_RESPONSE',
  CLEAR_COMMPANY_DATA = 'CLEAR_COMMPANY_DATA',
  SAVE_COMPANY_REQUEST = 'SAVE_COMPANY_REQUEST',
  SAVE_COMPANY_REQUEST_RESPONSE = 'SAVE_COMPANY_REQUEST_RESPONSE',
};

export interface Company {
  id: number,
  name: string,
  domain: string,
  language: number,
  logo: string,
  token: string,
};
export interface CompanyState {
  company: Company,
  settings: {},
  isLoading: boolean,
  failure: boolean,
  saveStatus: string,
  saveError: string,
}
