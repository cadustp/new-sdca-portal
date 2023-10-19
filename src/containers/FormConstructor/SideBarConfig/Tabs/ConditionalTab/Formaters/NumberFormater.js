import {
    inComparison,
    notIn,
    fieldIsFilled,
    fieldIsNotFilled,
    defaultConditions
  } from "./LogicOperatorsFormaters";
  
  const numberFormaterToJsonLogic = (conditionalObject) => {
    const formatedConditionObject = {
      ...conditionalObject,
      fieldToCompare: parseInt(conditionalObject.fieldToCompare)
    };
  
    switch (formatedConditionObject.operatorField) {
      case "in":
        return inComparison(formatedConditionObject);
      case "notIn":
        return notIn(formatedConditionObject);
      case "isNot":
        return fieldIsNotFilled(formatedConditionObject);
      case "is":
        return fieldIsFilled(formatedConditionObject);
      default:
        return defaultConditions(formatedConditionObject);
    }
  };
  
  export default numberFormaterToJsonLogic;
  