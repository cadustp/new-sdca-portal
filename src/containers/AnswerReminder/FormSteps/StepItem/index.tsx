import React from "react";
import ConditionalComponent from "./ConditionStepComponent";
import DefaultStepComponent from "./DefaultStepComponent";

const StepItem = (props) => {
  const {
    conditionalObject,
  } = props

  if(conditionalObject && Object.keys(conditionalObject)?.length){
    return <ConditionalComponent {...props}/>
  }

  return (
    <DefaultStepComponent {...props}/>
  )
}

export default StepItem;