import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Tooltip, IconButton } from '@mui/material';

import CloseIcon from '../../../../../components/shared/Icons/CloseIcon';
import {
  AppStates,
  FormDescriptionMaxLength,
  FormTextAreaMaxLength,
} from '../../../../../helpers/consts';

import LoadingIcon from '../../../../../components/shared/LoadingIcon';
import InfoIcon from '../../../../../components/shared/Icons/InfoIcon';
import { IconContainer } from '../../../../../components/EmailInput/styles';
import { Question, Step } from '../../../../../redux/forms/types';
import DatePicker from '../../../../../components/DatePicker';
import { StyledTextField } from '../../../../../components/shared/Inputs/StyledInput';
import AddButton from '../../../../../components/shared/AddButton';
import SelectInput from '../../../../../components/shared/Inputs/SelectInput';
import { EmptyActionPlanIcon } from '../../../../../components/shared/Icons/EmptyActionPlanIcon';
import CausesField from './components/CausesField';

import {
  Body,
  Footer,
  Header,
  ModalContainer,
} from './styles';

import {
  ActionPlanFormState,
  CreationModalTypes,
  DefaultSelect,
  Cause,
  QuestionSelect,
} from './index';
import {
  FormValidation,
  validateActionPlanFields,
} from '../../../../../helpers/validation/plan';
import { captureEvent } from '../../../../../analytics';

function CreationModal({
  closeCreationModal,
  intl,
  fetchForms,
  formsList,
  fetchFormById,
  formSteps,
  loadingForm,
  fetchUsers,
  userList,
  createActionPlan,
  modalState,
  planId,
  fetchActionPlan,
  currentPlanData,
  clearActionPlanModal,
  updatePlan,
}: CreationModalTypes) {
  const initialCause: Cause = {
    key: uuidv4(),
    text: '',
  };

  const [formattedForms, setFormattedForms] = useState<DefaultSelect[]>([]);
  const [formattedUsers, setFormattedUsers] = useState<DefaultSelect[]>([]);
  const [formErrors, setFormErrors] = useState<FormValidation>({
    isValidationDone: false,
    name: false,
    anomaliesDescription: false,
    causes: {
      list: [],
      errors: false,
    },
    description: false,
    users: false,
    startDate: false,
    endDate: false,
  } as FormValidation);
  const [
    formattedStepsWithQuestions,
    setFormattedStepsWithQuestions,
  ] = useState<QuestionSelect[]>([]);

  const [formState, setFormState] = useState<ActionPlanFormState>({
    form: null,
    name: '',
    description: '',
    causes: [initialCause],
    users: [],
    anomaliesDescription: '',
    questions: [],
    startDate: undefined,
    endDate: undefined,
  });

  const selectAddActions = ['select-option'];
  const selectRemoveActions = ['pop-value', 'remove-value', 'clear'];

  useEffect(() => {
    fetchForms();
    fetchUsers();
    if (planId !== null) {
      fetchActionPlan({ planId });
    }

    return () => {
      clearActionPlanModal();
    };
  }, []);

  useEffect(() => {
    if (currentPlanData && currentPlanData.name) {
      setFormState(currentPlanData);
    }
  }, [currentPlanData]);

  const formatUsersSelect = () => {
    if (userList.length) {
      const users: DefaultSelect[] = userList.map(user => ({
        label: user.name,
        value: String(user.id),
      }));
      setFormattedUsers(users);
    }
  };

  useEffect(() => {
    formatUsersSelect();
  }, [userList]);

  const addCause = () => {
    const newCause: Cause = {
      key: uuidv4(),
      text: '',
    };

    setFormState(prevState => ({
      ...prevState,
      causes: [...prevState.causes, newCause],
    }));
  };

  const deleteCause = ({ index }: { index: number }) => {
    const causesCopy = [...formState.causes];
    causesCopy.splice(index, 1);
    setFormState(prevState => ({
      ...prevState,
      causes: causesCopy,
    }));
  };

  const updateDateFilter = (startDate, endDate) => {
    setFormState(prevState => ({
      ...prevState,
      startDate,
      endDate,
    }));
  };

  const formatFormsSelect = () => {
    if (formsList.length) {
      const forms: DefaultSelect[] = formsList.map(form => ({
        label: form.name,
        value: String(form.id),
      }));
      setFormattedForms(forms);
    }
  };

  useEffect(() => {
    formatFormsSelect();
  }, [formsList]);

  const formatQuestionsSelect = () => {
    if (formSteps.length) {
      const stepsWithOptions: QuestionSelect[] = formSteps.map(
        (step: Step) => ({
          label: step.title,
          options: step.questions.map((question: Question) => ({
            label: question.question,
            value: String(question.id),
          })),
        }),
      );
      setFormattedStepsWithQuestions(stepsWithOptions);
    }
  };

  useEffect(() => {
    formatQuestionsSelect();
  }, [formSteps]);

  const fetchFormQuestions = () => {
    const selectedFormId = formState.form?.value ?? undefined;
    if (selectedFormId) {
      fetchFormById(Number(selectedFormId));
    }
  };

  useEffect(() => {
    fetchFormQuestions();
  }, [formState.form?.value]);

  const handleFormSelection = (value, { action }) => {
    if (selectAddActions.includes(action)) {
      setFormState(prevState => ({
        ...prevState,
        form: value,
        questions: [],
      }));
      setFormattedStepsWithQuestions([]);
    }
    if (selectRemoveActions.includes(action)) {
      setFormState(prevState => ({
        ...prevState,
        form: {} as DefaultSelect,
        questions: [],
      }));
      setFormattedStepsWithQuestions([]);
    }
  };

  const handleSelectSelection = (value, { action, field }) => {
    if (selectAddActions.includes(action)) {
      setFormState(prevState => ({
        ...prevState,
        [field]: value,
      }));
    }
    if (selectRemoveActions.includes(action)) {
      setFormState(prevState => ({
        ...prevState,
        [field]: value ?? [],
      }));
    }
  };

  const editCause = ({ value, index }) => {
    const causesCopy = [...formState.causes];
    causesCopy[index].text = value;
    setFormState(prevState => ({ ...prevState, causes: causesCopy }));
  };

  const handleChangeField = ({ e, field }) => {
    const { value } = e.target;
    setFormState((prevState: ActionPlanFormState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const validateFields = () => {
    const { isValid, errors } = validateActionPlanFields({ form: formState });
    setFormErrors(errors);
    return isValid;
  };

  useEffect(() => {
    if (formErrors.isValidationDone) {
      validateFields();
    }
  }, [formState]);

  const handleSubmitActionPlan = () => {
    const isValid = validateFields();
    if (isValid) {
      createActionPlan({
        body: formState,
        messages: {
          success: intl.formatMessage({ id: 'action_plan.create.success' }),
          error: intl.formatMessage({ id: 'action_plan.create.error' }),
        },
      });
    }
  };

  const handleUpdate = () => {
    const isValid = validateFields();
    if (isValid) {
      updatePlan({
        body: formState,
        id: planId,
        errorMessage: intl.formatMessage({ id: 'action_plan.edit.error' }),
        successMessage: intl.formatMessage({ id: 'action_plan.edit.success' }),
      });
    }
  };

  const formatGroupLabel = data => <span>{data.label}</span>;

  const renderErrorText = (
    <div className="error">
      {intl.formatMessage({ id: 'forms.edit.fieldError' })}
    </div>
  );

  const renderCausesFields = () => formState.causes.map((cause, index) => {
    const hasError = formErrors.causes.list[index] ?? false;
    return (
      <div key={cause.key}>
        {hasError ? renderErrorText : null}
        <CausesField
          isDisabled={false}
          onBlur={e => editCause({ value: e.target.value, index })}
          onDelete={() => {
            deleteCause({ index });
            captureEvent('deleteCausePDA');
          }}
          causes={formState.causes}
          hasError={hasError}
          defaultValue={cause.text}
        />
      </div>
    );
  });

  const isQuestionDisabled = Boolean(
    !formState.form?.label?.length ?? true,
  );

  const isOptionSelected = (option, selectValue) => selectValue.some(value => value.label === option.label);

  const isLoading = Boolean(modalState === AppStates.LOADING);

  const isLoadingExistingActionPlan = Boolean(
    Boolean(currentPlanData && planId && !currentPlanData.name),
  );

  const isEditing = Boolean(planId);

  const isDescriptionEdited = Boolean(
    currentPlanData.description !== formState.description,
  );

  if (isLoadingExistingActionPlan) {
    return <LoadingIcon theme="light" size={24} />;
  }
  return (
    <ModalContainer>
      <Header>
        <h2>
          {isEditing
            ? intl.formatMessage({ id: 'action_plan.edit.title' })
            : intl.formatMessage({ id: 'action_plan.create.title' })}
        </h2>
        <div>
          <IconButton className="filterIconButton" onClick={closeCreationModal}>
            <CloseIcon />
          </IconButton>
        </div>
      </Header>
      <Body>
        <section className="form">
          <div className="question">
            <h4>
              {intl.formatMessage({ id: 'action_plan.create.form.label' })}
            </h4>
            <SelectInput
              isLoading={isLoading}
              className="select"
              onChange={handleFormSelection}
              options={formattedForms}
              isSearchable
              isDisabled={isEditing}
              isOptionSelected={isOptionSelected}
              value={formState.form}
              placeholder={intl.formatMessage({
                id: 'action_plan.create.form.placeholder',
              })}
            />
          </div>
          <div className="question">
            <h4>
              {intl.formatMessage({
                id: 'action_plan.create.question.label',
              })}
            </h4>
            <SelectInput
              className="select"
              isDisabled={isEditing}
              isLoading={loadingForm || isLoading}
              value={formState.questions}
              onChange={(value, { action }) => handleSelectSelection(value, {
                action,
                field: 'questions',
              })}
              isOptionSelected={isOptionSelected}
              hideSelectedOptions={false}
              options={formattedStepsWithQuestions}
              isSearchable
              isClearable={false}
              isMulti
              formatGroupLabel={formatGroupLabel}
              placeholder={intl.formatMessage({
                id: 'action_plan.create.question.placeholder',
              })}
            />
          </div>
          <div className="question">
            <StyledTextField
              label={`${intl.formatMessage({
                id: 'action_plan.create.anomaly.label',
              })}`}
              tooltip={intl.formatMessage({
                id: 'action_plan.create.anomaly.tooltip',
              })}
              error={formErrors.anomaliesDescription}
              type="text"
              disabled={false}
              inputProps={{
                maxLength: FormDescriptionMaxLength,
              }}
              onChange={e => handleChangeField({ e, field: 'anomaliesDescription' })}
              value={formState.anomaliesDescription}
              placeholder={intl.formatMessage({
                id: 'action_plan.create.anomaly.placeholder',
              })}
            />
          </div>
          <div className="question">
            <Tooltip
              title={intl.formatMessage({
                id: 'action_plan.create.causes.tooltip',
              })}
              placement="right"
            >
              <h4
                className={`tooltip ${
                  formErrors.causes.errors ? 'invalid' : ''
                }`}
              >
                {intl.formatMessage({
                  id: 'action_plan.create.causes.label',
                })}
                <IconContainer tooltip>
                  <InfoIcon fontSize="small" />
                </IconContainer>
              </h4>
            </Tooltip>
            {renderCausesFields()}
            <AddButton
              isDisabled={false}
              onClick={() => {
                addCause();
                captureEvent('addCausePDA');
              }}
              text={intl.formatMessage({
                id: 'action_plan.create.causes.add',
              })}
            />
          </div>
          <div className="question">
            <StyledTextField
              disabled={false}
              label={`${intl.formatMessage({
                id: 'action_plan.create.name.label',
              })}`}
              error={formErrors.name}
              onChange={e => handleChangeField({ e, field: 'name' })}
              type="text"
              value={formState.name}
              placeholder={intl.formatMessage({
                id: 'action_plan.create.name.placeholder',
              })}
            />
          </div>
          <div className="question">
            <h4 className={`${formErrors.users ? 'invalid' : ''}`}>
              {intl.formatMessage({ id: 'action_plan.create.user.label' })}
            </h4>
            {formErrors.users ? renderErrorText : null}
            <SelectInput
              isDisabled={false}
              isLoading={isLoading}
              className="select"
              error={formErrors.users}
              value={formState.users}
              onChange={(value, { action }) => handleSelectSelection(value, { action, field: 'users' })}
              isOptionSelected={isOptionSelected}
              options={formattedUsers}
              isSearchable
              isMulti
              isClearable={false}
              placeholder={intl.formatMessage({
                id: 'action_plan.create.user.placeholder',
              })}
            />
          </div>
          <div className="question">
            <h4
              className={`${
                formErrors.startDate && formErrors.endDate ? 'invalid' : ''
              }`}
            >
              {intl.formatMessage({ id: 'action_plan.create.date.label' })}
            </h4>
            {formErrors.startDate && formErrors.endDate
              ? renderErrorText
              : null}
            <DatePicker
              isDisabled={false}
              className="date-filter"
              error={formErrors.startDate && formErrors.endDate}
              selectedStartDate={formState.startDate}
              selectedEndDate={formState.endDate}
              onChange={updateDateFilter}
              daySize={28}
            />
          </div>
          <div className="question">
            <StyledTextField
              label={`${intl.formatMessage({
                id: 'action_plan.create.description.label',
              })}`}
              error={formErrors.description}
              onChange={e => handleChangeField({ e, field: 'description' })}
              type="text"
              inputProps={{
                maxLength: FormTextAreaMaxLength,
              }}
              multiline
              rows={4}
              value={formState.description}
              placeholder={intl.formatMessage({
                id: 'action_plan.create.description.placeholder',
              })}
            />
          </div>
        </section>
        <div className="image">
          <EmptyActionPlanIcon />
        </div>
      </Body>
      <Footer>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            closeCreationModal();
            captureEvent(isEditing ? 'cancelEditAction' : 'cancelCreateAction');
          }}
          style={{ width: 146 }}
        >
          {intl.formatMessage({ id: 'utils.cancel' })}
        </Button>
        <Button
          disabled={isEditing ? false : Boolean(currentPlanData && currentPlanData.name)}
          variant="contained"
          color="primary"
          onClick={isEditing ? handleUpdate : handleSubmitActionPlan}
          style={{ width: 146, marginLeft: 16 }}
        >
          {isLoading ? (
            <LoadingIcon theme="light" size={24} />
          ) : (
            intl.formatMessage({ id: isEditing ? 'utils.edit' : 'utils.continue' })
          )}
        </Button>
      </Footer>
    </ModalContainer>
  );
}

export default React.memo(CreationModal);
