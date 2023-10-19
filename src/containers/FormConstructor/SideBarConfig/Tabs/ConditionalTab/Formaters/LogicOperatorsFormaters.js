//contem
const inComparison = ({ operatorField, baseQuestion, fieldToCompare }) => {
    return { [operatorField]: [fieldToCompare, { var: baseQuestion }] };
  };
  
  const notIn = ({ baseQuestion, fieldToCompare }) => {
    return { in: [{ var: baseQuestion }, fieldToCompare] };
  };
  
  const defaultConditions = ({ operatorField, baseQuestion, fieldToCompare }) => {
    return { [operatorField]: [{ var: baseQuestion }, fieldToCompare] };
  };
  
  const defaultConditionsToDate = ({ operatorField, baseQuestion, fieldToCompare }) => {
    return {
      [operatorField]: [
        { "Date.parse": { var: baseQuestion } },
        { "Date.parse": fieldToCompare }
      ]
    };
  };
  
  const fieldIsFilled = ({ baseQuestion }) => {
    return { ">": [{ var: baseQuestion }, ""] };
  };
  
  const fieldIsNotFilled = ({ baseQuestion }) => {
    return { "<": [{ var: baseQuestion }, ""] };
  };
  
  export {
    inComparison,
    notIn,
    defaultConditionsToDate,
    defaultConditions,
    fieldIsFilled,
    fieldIsNotFilled
  };
  