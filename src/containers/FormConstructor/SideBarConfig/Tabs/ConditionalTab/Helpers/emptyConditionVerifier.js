const emptyConditionVerifier = ({
  conditionsArray,
  action,
  operators
}) => {
  let errorInCondition = false;
  Object.keys(conditionsArray).map(item => {
    if(parseInt(item) > 0 && !operators[item]) errorInCondition = true
    if(!conditionsArray[item].fieldToCompare) errorInCondition = true
    if(!conditionsArray[item].operatorField) errorInCondition = true
    if(!conditionsArray[item].baseQuestion.locationInHash) errorInCondition = true
    if(!action.actionOption) errorInCondition = true
    if(action.stepSelected === "" && !action.questionSelected) errorInCondition = true
  })
  return errorInCondition;
}

export default emptyConditionVerifier;