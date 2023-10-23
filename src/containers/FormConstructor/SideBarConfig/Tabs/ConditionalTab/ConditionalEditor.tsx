
import React, { useState } from "react";
import {ActionListSelector} from "./ActionListSelector";
import {
  AddCircleOutline ,
} from '@mui/icons-material';
import ConditionSelector from "./ConditionSelector";
import {Form} from "../../../../../redux/forms/types";
import SelectInput from "../../../../../components/v2/SelectInput";
import { SNACKBAR_VARIANTS } from '../../../../../helpers/consts';
import CustomSnackbar from '../../../../../components/shared/CustomSnackbar/CustomSnackbar';
import Button from "../../../../../components/Button";
import {
  InputContainer,
  AddContainer,
  TitleText,
  ConditionalCard,
  BottonButtonsContainer,
  AddBtn,
  ConditionContainer
} from "./Shared";

import concatConditionChain from "./Helpers/concatConditionChain";
import formatActionSelected from "./Helpers/formatActionSelected";
import emptyConditionVerifier from "./Helpers/emptyConditionVerifier";

type Props = {
  form: Form,
  setFormSettings: Function,
  initialConditional: {
    conditionsArray: {},
    operators: {},
    action: {
      stepSelected: string,
      questionSelected: string,
      actionOption: any,
    }
  },
  closeEditMode: Function,
  intl: {
    messages: [];
  };
};

type StateProps = {
  form: Form,
};

const ActionComponent = ({
  intl,
  updateAction,
  form,
  action
}: any) => {


  return (
    <ConditionContainer>
      <TitleText>{intl.messages['forms.edit.conditional.action_label']}</TitleText>
      <InputContainer>
        <ActionListSelector
          action={action}
          intl={intl}
          updateAction={updateAction}
          form={form}
        />
      </InputContainer>
    </ConditionContainer>
  )
}

const PlusOperator = ({
  updatePlusOperator,
  intl,
  value,
}: any) => {
  const intlPrefix = "forms.edit.conditional.operator_type"
  const operatorTypes = {
    "or": "or",
    "and": "and"
  }
  const operators = Object.keys(operatorTypes).map(item => {
    return {
      value: item,
      label: intl.messages[`${intlPrefix}.${item}`]
    }
  })
  return (
    <InputContainer>
      <SelectInput
        className="cf-field-input"
        setSelectedItems={updatePlusOperator}
        selectedItems={operators.filter(item => item.value === value)}
        items={operators} />
    </InputContainer>
  )
}


const ConditionalEditor: React.FC<Props  & StateProps> = ({
  form,
  setFormSettings,
  initialConditional,
  closeEditMode,
  intl
}) => {
  const conditionEmptyErrorMessage = intl.messages["forms.edit.conditional.snackbar_message.empty_error"]
  const conditionSuccessfullySaved = intl.messages["forms.edit.conditional.snackbar_message.saved"]
  const conditionInitialObject = {
    baseQuestion: {
      fieldType: null,
    },
    operatorField: "",
    fieldToCompare: ""
  }
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    status: "",
    message: ""
  });
  const [conditionsArray, setConditionsArray] = useState(initialConditional.conditionsArray)
  const [action, setAction] = useState({
    stepSelected: initialConditional.action.stepSelected,
    questionSelected:  initialConditional.action.questionSelected,
    actionOption: initialConditional.action.actionOption
  });
  const [operators,setOperators] = useState(initialConditional.operators);

  const updateConditionalObject = ({componentId, newCondition}: any) => {
    setConditionsArray({...conditionsArray, [componentId]: newCondition})
  }

  const handleUpdateAction = (item: any) => {   
    setAction(item)
  }
  
  const handleConditionChange = (value: any, index: any) => {
    updateConditionalObject({componentId: index, newCondition: value})
  }

  const pushToConditionToRedux = () => {
    const conditionChainFormatted = concatConditionChain(conditionsArray, operators)
    const formattedTrigger = formatActionSelected({
      conditionToEdit: {
        operators,
        conditionsArray,
        action
      },
      conditionalObject: form.conditionTriggersObject,
      condition: conditionChainFormatted, 
      ...action
    })
    setFormSettings({ ...form, conditionTriggersObject: formattedTrigger});
    handleOpenSbackBar({status: SNACKBAR_VARIANTS.SUCCESS, message: conditionSuccessfullySaved});
  }

  const handleSaveCondition = () => {
    if(emptyConditionVerifier({conditionsArray, action, operators})){
      handleOpenSbackBar({status: SNACKBAR_VARIANTS.ERROR, message: conditionEmptyErrorMessage});
    }else {
      pushToConditionToRedux()
    }
  }

  const handleCancelCondition = () => {
    closeEditMode()
  }

  const handleOpenSbackBar = ({status, message}: any) => {
    setSnackBarState({
      status,
      message,
      open: true,
    });
  }

  const handleCloseSnackBar = () => {
    setSnackBarState({
      status: snackBarState.status,
      message: "",
      open: false,
    });
  }

  const addNewItem = () => {
    const conditionArrayLength = Object.keys(conditionsArray).length
    const lastIndex = parseInt(Object.keys(conditionsArray)[conditionArrayLength - 1])
    const newIndex = conditionArrayLength ? lastIndex+1 : 0
    let itemToadd = {
      ...conditionsArray,
      [newIndex]: conditionInitialObject
    }
    setConditionsArray(itemToadd);
  }

  const removeItem = (itemIndex: any) => {
    let filteredList = {...conditionsArray};
    delete filteredList[`${itemIndex}`]
    setConditionsArray(filteredList);
  }

    return (
      <div style={{display: "flex", flexDirection: "column"}}> 
          {Object.keys(conditionsArray).map((item, index) => {
            const lastCondition = Object.keys(conditionsArray).length-1 === index
            return (
              <React.Fragment key={index}>
                <ConditionalCard>
                  <ConditionSelector
                    form={form}
                    conditionalObject={conditionsArray[item]}
                    onConditionValueChange={value => handleConditionChange(value, index)}
                    onRemoveChange={() => removeItem(item)}
                    intl={intl}
                  />
                
                  {
                    lastCondition && <ActionComponent
                                        form={form}
                                        action={action}
                                        intl={intl}
                                        updateAction={handleUpdateAction}/>
                  }
              
                </ConditionalCard>
                {
                  !lastCondition && (
                    <PlusOperator
                      intl={intl}
                      value={operators[index+1]} 
                      updatePlusOperator={item => setOperators({ ...operators, [index+1]: item?.value})}
                    />
                  )
                }
              </React.Fragment>
            )
          })}
          
          <AddContainer>
            <AddBtn onClick={() => addNewItem()} >
              <AddCircleOutline/>
            </AddBtn>
          </AddContainer>

          <BottonButtonsContainer>
            <Button
              variant="outlined"
              color="primary"
              style={{ width: 146, fontWeight: 600, marginLeft: '10px' }}
              onClick={handleCancelCondition}
            >
              {intl.messages['utils.cancel']}
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ width: 146, fontWeight: 600, marginLeft: '10px' }}
              onClick={handleSaveCondition}
            >
              {intl.messages['utils.save']}
            </Button>
          </BottonButtonsContainer>
          <CustomSnackbar
            data={{
              message: snackBarState.message,
              type: snackBarState.status,
              open: snackBarState.open,
            }}
            handleClose={handleCloseSnackBar}
          />
      </div>
    )
}

export default ConditionalEditor;