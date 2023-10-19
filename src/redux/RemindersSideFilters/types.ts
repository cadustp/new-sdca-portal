import { Moment } from 'moment';

export enum remindersSideFilterTypes {
  UPDATE_REMINDERS_FILTER = 'UPDATE_REMINDERS_FILTER',
  CLEAR_REMINDERS_FILTER = 'CLEAR_REMINDERS_FILTER',
}

export interface RemindersSideFilters {
  active: boolean,
  app_user: AppUser,
  start_date: string,
  end_date: string,
  form:{
    id: number,
    name: string,
    type: {id: number, name: string} | [],
    version: '1',
  } | [],

  rescheduled_reminders: [],
  valuated_users: [],
}

export interface RemindersSideFiltersState {
  sideFilterParams: {
    selectedForms: [],
    selectedStartDate: Moment,
    selectedEndDate: Moment,
    selectedStatuses: [],
    selectedGroups: [],
    selectedValuatedUsers: [],
  },
}

export interface IForm {
  active: boolean
  company_id: number
  created_at: string
  description: string
  external_link: string
  fluxogram_content_type: string
  fluxogram_file_name: string
  fluxogram_file_size: number
  fluxogram_updated_at: string
  form_id: number
  form_type_id: number
  has_eliminatory_question: boolean
  has_only_accordance_questions: boolean
  has_required_valuated: boolean
  has_signature: boolean
  id: number
  name: string
  pop_content_type: string
  pop_file_name: string
  pop_file_size: number
  pop_updated_at: string
  updated_at: string
  version: string

}

export interface AppUser {
  id: number
  name: string
  score_date: string
  status: number
  score:number

}
