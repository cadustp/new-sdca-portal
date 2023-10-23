import React, { useEffect } from "react";
import { StyledTextField } from "../../../../../../components/shared/Inputs/StyledInput";
import SingleDate from "../../../../../../components/DatePicker/SingleDate";
import SelectInput from "../../../../../../components/v2/SelectInput";
import {
  RemoveCircleOutline ,
} from '@mui/icons-material';
import useSelectQuestions from "../Helpers/useSelectQuestions";
import {
  InputContainer,
  ConditionalCardHeaderContainer,
  RemoveBtn,
  TitleText,
  ConditionContainer
} from "../Shared";
import { formattedConditionalItems } from "./conditionList";
import { SELECTION_TYPES } from "../../../../../../helpers/consts";
import moment from "moment";

const ComparatorField = ({
  fieldType,
  value,
  onChange,
  question
}: any) => {
  let currentQuestion = question?.step?.questions[question.questionIndex];
  let answerOptions = currentQuestion?.answerOptions?.map((item: any,index: any) => ({
    index,
    label: item.answer,
    value: item.answer
  }));

  switch(fieldType){
    case  SELECTION_TYPES.SINGLE: {
      return (
        <SelectInput
          items={answerOptions}
          selectedItems={answerOptions.filter(item => item.value === value)}
          setSelectedItems={e => onChange(e)} 
        />
      ) 
    }
    case SELECTION_TYPES.MULTI: {
      return (
        <SelectInput
          items={answerOptions}
          selectedItems={answerOptions.filter(item => item.value === value)}
          setSelectedItems={e => onChange(e)} 
        />
      ) 
    }
    case SELECTION_TYPES.NUMERIC: {
      return (
        <StyledTextField 
          value={value}
          type="number"
          onChange={e => onChange(e.target.value)} 
        />
      )
    }
    case SELECTION_TYPES.DATE: {
      return (
        <SingleDate
          valueDate={value ? moment(`${value}`, "x") : moment()}
          disabled={false}
          setValueDate={e => onChange( Date.parse(e.format()) )}
        />
      )
    }
    case null: {
      return (
        <></>
      )
    }
    default: {
      return (
        <StyledTextField 
          value={value} 
          onChange={e => onChange(e.target.value)} 
        />
      )
    }
  }
}

const formatBaseQuestionAndFieldToCompare = ({baseQuestion, fieldToCompare}: any) => {

  const formatMultSelectLocation = () => {
    const locationInHashWithAnswerIndex = `steps.${baseQuestion.stepIndex}.questions.${baseQuestion.questionIndex}.${fieldToCompare.index}`
    return {...baseQuestion, locationInHash: locationInHashWithAnswerIndex}
  }

  switch(baseQuestion.selectionType){
    case SELECTION_TYPES.MULTI: {
      return {
        baseQuestion: formatMultSelectLocation(),
        fieldToCompare: fieldToCompare.value
      }
    }
    case  SELECTION_TYPES.SINGLE: {
      return {
        baseQuestion: formatMultSelectLocation(),
        fieldToCompare: fieldToCompare.value
      }
    } 
    default: {
      return {
        baseQuestion,
        fieldToCompare
      } 
    }
  }
}

function ConditionSelector({
  intl,
  form,
  conditionalObject,
  onConditionValueChange,
  onRemoveChange
}: any){
  const questions = useSelectQuestions(form, intl.messages["forms.edit.conditional.action_types.step"]);
  const conditionalItemsByType = formattedConditionalItems(intl, conditionalObject?.baseQuestion?.selectionType);

  const onConditionChange = (value: any) => {
    let newConditionObject = {
      ...conditionalObject,
      ...value
    }
    onConditionValueChange(newConditionObject)
  };

  const handleBaseQuestionChanged = (selectedItem: any) => {
    onConditionChange({
      fieldToCompare: "",
      baseQuestion: selectedItem
    })
  }

  const handleOperatorFieldChanged = (e: any) => {
    onConditionChange({operatorField: e?.value})
  }

  const handleFieldToCompareChanged = (e: any) => {
    const { baseQuestion, fieldToCompare } = formatBaseQuestionAndFieldToCompare({
      baseQuestion: conditionalObject?.baseQuestion, 
      fieldToCompare: e
    });

    onConditionChange({fieldToCompare, baseQuestion })
  }

  return (
    <ConditionContainer>
      <ConditionalCardHeaderContainer>
        <TitleText>{intl.messages['forms.edit.conditional.condition_label']}</TitleText>
        <RemoveBtn onClick={onRemoveChange} >
          <RemoveCircleOutline />
        </RemoveBtn>
      </ConditionalCardHeaderContainer>
      <InputContainer>
        <SelectInput
          className="cf-field-input"
          items={questions}
          setSelectedItems={handleBaseQuestionChanged}
          selectedItems={questions.filter(item => item.value === conditionalObject?.baseQuestion?.value) }
        />
      </InputContainer>
      <InputContainer>
        <SelectInput
          className="cf-field-input"
          items={conditionalItemsByType} 
          selectedItems={conditionalItemsByType.filter(item => item.value === conditionalObject.operatorField)}
          setSelectedItems={handleOperatorFieldChanged} 
        />
      </InputContainer>
      <InputContainer>
        <ComparatorField
          onChange={handleFieldToCompareChanged}
          value={conditionalObject.fieldToCompare}
          fieldType={conditionalObject?.baseQuestion?.selectionType}
          question={conditionalObject.baseQuestion}
        />
      </InputContainer>
    </ConditionContainer>
  )
}

export default ConditionSelector;