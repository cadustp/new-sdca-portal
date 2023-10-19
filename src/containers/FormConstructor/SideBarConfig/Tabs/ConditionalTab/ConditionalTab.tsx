import React, { useState } from "react";
import ConditionalEditor from "./ConditionalEditor";
import { Paper, IconButton }from "@material-ui/core";
import CustomAlert from "src/components/CustomAlert";
import { ReactComponent as AlertSVG } from 'src/assets/icons/alert.svg';

import { Edit, Delete, AddCircleOutline } from "@material-ui/icons";
import {
  AddContainer,
  AddBtn,
} from "./Shared";
import styled from "styled-components";

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom:20px;
`

const AlertContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const CenterText = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`

const ConditionCardContainer = styled(Paper)`
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
`
const ConditionTitleContainer = styled.div`
  width: 70%;
`
const ConditionIconsContainer = styled.div`
  width:30%;
  display: flex;
  justify-content: space-evenly;
`

const ConditionalItemComponent = ({
  title,
  onEdit,
  alertTitle,
  alertMessage,
  onDelete
}) => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <ConditionCardContainer elevation={2}>
      {
        showAlert ? (
          <AlertContainer>
            <CustomAlert
              title={alertTitle}
              message={alertMessage}
              icon={<AlertSVG />}
              onCancel={() => setShowAlert(false)}
              onConfirm={onDelete}
            />
          </AlertContainer>
        ) : (
          <>
            <ConditionTitleContainer>
              {title}
            </ConditionTitleContainer>
            <ConditionIconsContainer>
              <IconButton onClick={onEdit}><Edit /></IconButton>
              <IconButton onClick={() => setShowAlert(true)}><Delete /></IconButton>
            </ConditionIconsContainer>
          </>
        )
      }
    </ConditionCardContainer>
  )
}

const EmptyComponent = ({
  addNewCondition,
  emptyConditionText
}) => {
  return (
    <FlexColumn>
      <CenterText>
        {emptyConditionText}
      </CenterText>
             
      <AddContainer>
        <AddBtn onClick={addNewCondition} >
          <AddCircleOutline/>
        </AddBtn>
      </AddContainer>
    </FlexColumn>
  )
}

function ConditionalTab({
  form,
  setFormSettings,
  intl
}){

  const conditionInitialObject = {
    conditionsArray: {
      0 :{
        baseQuestion: {
          fieldType: null,
          locationInHash: ""
        },
        operatorField: "",
        fieldToCompare: ""
      }
    },
    operators: {},
    action: {
      stepSelected: "",
      questionSelected: "",
      actionOption: null
    },
  }

  const emptyConditionState = intl.messages["forms.edit.conditional.empty_state"];
  const alertTitle = intl.messages["forms.edit.conditional.delete_title"];
  const alertMessage = intl.messages["forms.edit.conditional.delete_message"];
  const conditionItemTitle = intl.messages["forms.edit.conditional.condition_item"]

  const [editCondition, seEditCondition] = useState(false);
  const [currentCondition,setCurrentCondition] = useState(conditionInitialObject)

  const onEditConditional = ({stepIndex,questionIndex}) => {
    seEditCondition(true);
    if(stepIndex) {
      setCurrentCondition(
        questionIndex ?
        form.conditionTriggersObject.steps[stepIndex].questions[questionIndex].conditionToEdit 
        : form.conditionTriggersObject.steps[stepIndex].inStep.conditionToEdit
      )
    }
   
  }

  const onNewConditional = () => {
    seEditCondition(true);
    setCurrentCondition(conditionInitialObject)
  }

  const onDeleteConditional = ({stepIndex, questionIndex}) => {
    let currentFormItem = form.conditionTriggersObject;

    if(questionIndex){
      delete currentFormItem["steps"][stepIndex]["questions"][questionIndex]
    }else if(stepIndex) {
      delete currentFormItem["steps"][stepIndex]["inStep"]
    }

    setFormSettings({...form, conditionTriggersObject: currentFormItem})
  }

  const onCloseEditMode = () => {
    seEditCondition(false);
  }

  const renderQuestionsTriggers = (stepIndex, questions) => {
    return Object.keys(questions).map(question => {
      return (
        <ConditionalItemComponent
          alertTitle={alertTitle}
          alertMessage={alertMessage}
          onDelete={() => onDeleteConditional({stepIndex, questionIndex: question})}
          onEdit={() => onEditConditional({stepIndex, questionIndex: question})}
          title={`${conditionItemTitle} ${question}`} 
        />
      )
    })
  }

  const renderStepTrigger = (step,stepIndex) => {
    return (
      <ConditionalItemComponent
        alertTitle={alertTitle}
        alertMessage={alertMessage}
        onDelete={() => onDeleteConditional({stepIndex, questionIndex: ""})}
        onEdit={() => onEditConditional({stepIndex, questionIndex: ""})}
        title={`${conditionItemTitle} ${stepIndex}`} 
      />
    )
  }

const renderConditionalTriggers = (currentStep, stepIndex) => {
  return (
    <>
      {currentStep.inStep && renderStepTrigger(currentStep, stepIndex)}
      {currentStep.questions && renderQuestionsTriggers(stepIndex, currentStep.questions)}
    </>
  )
}

  const renderConditionListContainer = () => {
    return (
      <React.Fragment >
        {renderConditionsList()}
        <AddContainer>
          <AddBtn onClick={onNewConditional} >
            <AddCircleOutline/>
          </AddBtn>
        </AddContainer>
      </React.Fragment>
    )
  }

  const renderConditionsList = () => {
    return (
      Object.keys(form.conditionTriggersObject.steps).map((stepIndex) => {
        const currentStepTrigger = form.conditionTriggersObject.steps[stepIndex]

        return renderConditionalTriggers(currentStepTrigger, stepIndex)
      })
    )
  }

  const renderConditionEditor = () => {
    return (
        <ConditionalEditor 
          form={form}
          initialConditional={currentCondition}
          closeEditMode={onCloseEditMode}
          setFormSettings={setFormSettings}
          intl={intl}
        />
    )
  }

  const cleanConditionTriggers = (totalTriggers) => {
    if(totalTriggers < 1) {
      setFormSettings({...form, conditionTriggersObject: null})
    }
  }

  const hasAnyTrigger = () => {
    let totalTriggers = 0
    let conditionTriggers = form?.conditionTriggersObject?.steps

    if(!conditionTriggers) return false;

    Object.keys(conditionTriggers).forEach(stepTrigger => {
      const questionsTriggers = conditionTriggers[stepTrigger]?.questions
      const inStepTriggers = conditionTriggers[stepTrigger]?.inStep
      if(inStepTriggers) totalTriggers += 1;
      if(questionsTriggers && Object.keys(questionsTriggers).length) totalTriggers += 1;
    })

    cleanConditionTriggers(totalTriggers);

    return totalTriggers > 0
  }

  return (
    <FlexColumn>
      {editCondition && renderConditionEditor()}
      {(hasAnyTrigger() && !editCondition)&& renderConditionListContainer()}
      {(!hasAnyTrigger() && !editCondition) && <EmptyComponent emptyConditionText={emptyConditionState} addNewCondition={onNewConditional} /> }
    </FlexColumn>
  )
}


export default ConditionalTab;