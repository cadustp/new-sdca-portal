
import {
  textFormaterToJsonLogic, 
  numberFormaterToJsonLogic, 
} from "../Formaters";
import { SELECTION_TYPES } from "../../../../../../helpers/consts";

function concatConditionChain(conditionList, operators){
  let copyCurrentCondition = {};

  Object.keys(conditionList).map((index) => {
    if(index === "0") {
      copyCurrentCondition = formatToJsonLogicByType(conditionList["0"])
    }else{
      copyCurrentCondition = { [operators[index]]: [copyCurrentCondition, formatToJsonLogicByType(conditionList[index]) ] };
    }  
  });
  
  return copyCurrentCondition
}

const formatToJsonLogicByType = ({baseQuestion, fieldToCompare, operatorField}) => {
  const formattedObject = {
    baseQuestion: baseQuestion.locationInHash,
    fieldToCompare,
    operatorField
  }

  switch (baseQuestion.selectionType) {
    case SELECTION_TYPES.NUMERIC:
      return numberFormaterToJsonLogic(formattedObject);
    case SELECTION_TYPES.DATE:
      return numberFormaterToJsonLogic(formattedObject);
    default:
      return textFormaterToJsonLogic(formattedObject);
  }
};




export default concatConditionChain;