import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  loadForm,
  loadAllFormsRequest,
} from '../../../../../redux/forms/actions';
import {
  Form,
  Step,
} from '../../../../../redux/forms/types';

import {
  clearActionPlanModal,
  createActionPlan,
  fetchActionPlan,
  fetchUsers, updatePlan,
} from '../../../../../redux/plans/duck';
import { Intl, ModalMessagesType } from '../../../../../helpers/types';
import { AppStates } from '../../../../../helpers/consts';
import CreationModal from './CreationModal';

export type Cause = {
  key: string;
  text: string;
};

export type QuestionSelect = {
  label: string;
  options: DefaultSelect[];
};

export type ActionPlanFormState = {
  form: DefaultSelect | null;
  questions: DefaultSelect[];
  anomaliesDescription: string;
  causes: Cause[];
  users: DefaultSelect[];
  name: string;
  description: string;
  startDate: any | undefined;
  endDate: any | undefined;
};

export type DefaultSelect = {
  label: string;
  value: string;
  isDisabled?: boolean;
};

type StateProps = {
  formsList: Form[];
  formSteps: Step[];
  loadingForm: boolean;
  modalState: keyof typeof AppStates;
  userList: any[];
  planId?: number | null;
  currentPlanData: ActionPlanFormState;
};

type DispatchProps = {
  createActionPlan: ({
    body,
    messages,
  }: {
    body: ActionPlanFormState;
    messages: ModalMessagesType;
  }) => void;
  fetchActionPlan: ({ planId }) => void;
  updatePlan: ({
    body, id, errorMessage, successMessage,
  }) => void;
  clearActionPlanModal: () => void;
  fetchFormById: (formId: number) => void;
  fetchForms: () => void;
  fetchUsers: () => void;
};

type OwnProps = {
  intl: Intl;
  closeCreationModal: () => void;
};

export type CreationModalTypes = StateProps & DispatchProps & OwnProps;

const mapStateToProps = (state) : StateProps => ({
  formsList: state.forms.list ?? [],
  loadingForm: state.forms.loading,
  formSteps: state.forms.form.steps,
  userList: state.plans.users ?? [],
  modalState: state.plans.creationModal.modalState,
  planId: state.plans.creationModal.planId,
  currentPlanData: state.plans.creationModal.data,
});

const mapDispatchToProps = (dispatch) : DispatchProps => ({
  fetchForms: () => dispatch(loadAllFormsRequest()),
  createActionPlan: ({ body, messages }) => dispatch(createActionPlan({ body, messages })),
  fetchFormById: formId => dispatch(loadForm({ formId })),
  fetchActionPlan: ({ planId }) => dispatch(fetchActionPlan({ planId })),
  clearActionPlanModal: () => dispatch(clearActionPlanModal()),
  fetchUsers: () => dispatch(fetchUsers()),
  updatePlan: ({
    body, id, errorMessage, successMessage,
  }) => dispatch(updatePlan({
    errorMessage, id, body, successMessage,
  })),
});

export default injectIntl(
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(CreationModal),
);
