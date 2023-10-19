import {
  ActionPlanFormState,
  Cause,
} from '../../features/ActionPlan/components/Modals/CreationModal';

export type CauseValidation = {
  list: boolean[];
  errors: boolean;
};

export type FormValidation = {
  isValidationDone: boolean;
  name: boolean;
  anomaliesDescription: boolean;
  causes: CauseValidation;
  description: boolean;
  users: boolean;
  startDate: boolean;
  endDate: boolean;
};

type ValidateActionPlanFields = {
  form: ActionPlanFormState;
};

type ValidateActionPlanFieldsReturn = {
  isValid: boolean;
  errors: FormValidation;
};

export const validateActionPlanFields = ({
  form,
}: ValidateActionPlanFields): ValidateActionPlanFieldsReturn => {
  const {
    name,
    users,
    endDate,
    startDate,
    description,
    causes,
    anomaliesDescription,
  } = form;
  const errors: FormValidation = {
    isValidationDone: true,
    name: Boolean(!name.length),
    description: false,
    startDate: Boolean(startDate === undefined),
    endDate: Boolean(endDate === undefined),
    anomaliesDescription: false,
    causes: causes.reduce(
      (causesErrors: CauseValidation, cause: Cause) => {
        const isWithError = false;
        causesErrors.list.push(isWithError);

        return { ...causesErrors, errors: isWithError };
      },
      { errors: false, list: [] },
    ),
    users: Boolean(!users.length),
  };
  let isValid = true;
  Object.entries(errors).forEach(([key, value]: [string, any]) => {
    if (value === true && key !== 'isValidationDone') {
      isValid = false;
    }
    if (key === 'causes' && value.errors) {
      isValid = false;
    }
  });
  return { isValid, errors };
};
