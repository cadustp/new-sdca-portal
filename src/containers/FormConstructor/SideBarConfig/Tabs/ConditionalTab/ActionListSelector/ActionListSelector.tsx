import React, { useState } from "react";
import { Form } from '../../../../../../redux/forms/types';
import StepOptions from "./StepOptions";

import useSelectSteps from "../Helpers/useSelectSteps";
import useSelectQuestions from "../Helpers/useSelectQuestions";
import QuestionOptions from "./QuestionOptions";
import { InputContainer } from "../Shared";
import SelectInput from "../../../../../../components/v2/SelectInput";

type Props = {
  form: Form,
  action: any,
  intl: {
    messages: [];
  };
  updateAction: Function;
};

type StateProps = {
  form: Form,
};

const ActionListSelector: React.FC<Props & StateProps> = ({
  form,
  updateAction,
  action,
  intl
}) => {
  const conditionalActions = {
    options: "forms.edit.conditional.action_options",
    types: "forms.edit.conditional.action_types",
    selectLabel: "forms.edit.conditional.action_select_label",
    typeSelectLabel: "forms.edit.conditional.action_select_label"
  }

  const translatedStepName = intl?.messages[`${conditionalActions.types}.step`]

  const steps = useSelectSteps(form);
  const questions = useSelectQuestions(form, translatedStepName);

  const actionOptions = {
    show: "show",
    hide: "hide"
  }

  const actionTypeOptions = {
    question: "question",
    step: "step"
  }

  const actionTypeItems = Object.keys(actionTypeOptions).map(item => {
    return {value: item, label: intl?.messages[`${conditionalActions.types}.${item}`] }
  })

  const actionOptionsItems = Object.keys(actionOptions).map(item => {
    return {value: item, label: intl?.messages[`${conditionalActions.options}.${item}`] }
  })

  const actionTypeSelected = action?.stepSelected ? {value: "step"} : {value: "question"}
  const initalAction = action?.stepSelected || action?.questionSelected ? actionTypeSelected : {value: ""}
  const actionOptionValue = actionOptionsItems.filter(item => item.value === action?.actionOption)

  const [actionType, setActionType] = useState(initalAction);

  const handleQuestionChange = (e: any) => {
    updateAction({
      ...action,
      stepSelected: "",
      questionSelected: e?.value
    })
  }

  const handleStepChange = (e: any) => {
    updateAction({
      ...action,
      questionSelected: "",
      stepSelected: e?.value
    })
  }

  const handleActionOptionChange = (e: any) => {
    updateAction({
      ...action,
      actionOption: e?.value
    })
  }

  const handleActionTypeChange = (e: any) => {
    e ? setActionType(e) : setActionType({value: ""});
    updateAction({
      ...action,
      questionSelected: "",
      stepSelected: ""
    })
  }

  return (
    <div>
      <InputContainer>
        <SelectInput 
          items={actionOptionsItems}
          setSelectedItems={(e: any) => handleActionOptionChange(e)}
          selectedItems={actionOptionValue}
          placeholder={intl?.messages[conditionalActions.selectLabel]}
        />
      </InputContainer>
      <InputContainer>
        <SelectInput 
          items={actionTypeItems}
          setSelectedItems={handleActionTypeChange}
          selectedItems={actionTypeItems.filter(item => item.value === actionType.value)}
          placeholder={intl?.messages[conditionalActions.typeSelectLabel]}
        />
      </InputContainer>
      <InputContainer>
        {
          actionType.value === 'step' && ( 
            <StepOptions
              onSelectChange={(e: any) => handleStepChange(e)}
              value={action.stepSelected}
              steps={steps} />
            )
        }
        {
          actionType.value === 'question' && ( 
            <QuestionOptions 
              onSelectChange={(e: any) => handleQuestionChange(e)}
              value={action.questionSelected}
              questions={questions} />
            )
        }
      </InputContainer>
    </div>
  )
}


export default ActionListSelector;