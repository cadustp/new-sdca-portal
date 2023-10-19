import {
    inComparison,
    notIn,
    fieldIsFilled,
    fieldIsNotFilled,
    defaultConditions
  } from "./LogicOperatorsFormaters";
  
  const textFormaterToJsonLogic = (conditionalObject) => {
    const { operatorField } = conditionalObject;
  
    switch (operatorField) {
      case "in":
        return inComparison(conditionalObject);
      case "notIn":
        return notIn(conditionalObject);
      case "isNot":
        return fieldIsNotFilled(conditionalObject);
      case "is":
        return fieldIsFilled(conditionalObject);
      default:
        return defaultConditions(conditionalObject);
    }
  };
  
  export default textFormaterToJsonLogic;
  