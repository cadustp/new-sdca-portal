import React from 'react';

type DispatchProps = {
  loadFormRequest: Function;
  knockoutStep: Function;
  removeKnockoutStep: Function;
  updateFormAnswers: Function;
  knockoutForm: Function;
  handleSetLocation: Function;
  setQuestionObservation: Function;
};

type PropsProvider = DispatchProps & {
  intl: {
    messages: Array<any>;
    formatMessage: Function;
  };
  form: {} | null;
};

const initial = {
  loadFormRequest: () => {},
  updateFormAnswers: () => {},
  knockoutStep: () => {},
  removeKnockoutStep: () => {},
  knockoutForm: () => {},
  sendPublicAnswer: () => {},
  handleSetLocation: () => {},
  setQuestionObservation: () => {},
  form: {
    id: '',
    name: '',
  },
  intl: {
    messages: [],
    formatMessage: () => {},
  },
};

const ContextPublicAnswers = React.createContext<PropsProvider>(initial);
const usePublicAnswers = () => React.useContext(ContextPublicAnswers);

const PublicAnswersProvider = ({ value, children }) => (
  <ContextPublicAnswers.Provider
    value={{
      ...value,
    }}
  >
    {children}
  </ContextPublicAnswers.Provider>
);

export { PublicAnswersProvider, usePublicAnswers };
