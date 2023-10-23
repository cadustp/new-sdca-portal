import React from 'react';
import { answerReminderState } from '../../redux/answerReminder/types';
import { TCompanyEmployee } from '../../types/reminder';

type DispatchProps = {
  requestReminderForAnswer: Function;
  setEmployee: Function;
  handleUpdateReminderAnswers: Function;
  handleKnockoutStep: Function;
  handleRemoveKnockoutStep: Function;
  handleKnockoutForm: Function;
  reminderIsAccomplished: boolean;
  handleSetObservation: Function;
  sendReminder: Function;
  setPlan: Function;
  generatePdf: Function;
  handleSetLocation: Function;
};
type StateProps = {
  answerReminder: answerReminderState | null;
  actionPlanUsers: any;
  valuatedUsers: Array<
  {
    id: number;
    name: string;
  }
  | []
  >;
};

type PropsProvider = DispatchProps &
StateProps & {
  //  children?: React.ReactNode;
  selectedValuatedEmployee: TCompanyEmployee | undefined | null;
  reminderName: string | undefined | null;
  intl: {
    messages: Array<any>;
    formatMessage: Function;
  };
};

const intial = {
  requestReminderForAnswer: () => {},
  setEmployee: () => {},
  handleUpdateReminderAnswers: () => {},
  handleKnockoutStep: () => {},
  handleRemoveKnockoutStep: () => {},
  handleKnockoutForm: () => {},
  sendReminder: () => {},
  generatePdf: () => {},
  answerReminder: null,
  valuatedUsers: [],
  actionPlanUsers: [],
  reminderIsAccomplished: false,
  selectedValuatedEmployee: null,
  reminderName: null,
  handleSetObservation: () => {},
  handleSetLocation: () => {},
  setPlan: () => {},
  intl: {
    messages: [],
    formatMessage: () => {},
  },
};

const ContextReminderAnswers = React.createContext<PropsProvider>(intial);

const ReminderAnswersProvider = ({ value, children }) => (
  <ContextReminderAnswers.Provider
    value={{
      ...value,
      actionPlanUsers: value?.actionPlanUsers ?? [],
      valuatedUsers: value?.answerReminder?.reminder?.company_employees ?? [],
      selectedValuatedEmployee: value?.answerReminder?.reminder?.form?.selected_company_employee ?? null,
      reminderName: value?.answerReminder?.reminder?.name ?? null,
      reminderIsAccomplished: value?.answerReminder?.reminder.status === 'accomplished',
    }}
  >
    {children}
  </ContextReminderAnswers.Provider>
);

export { ReminderAnswersProvider, ContextReminderAnswers };
