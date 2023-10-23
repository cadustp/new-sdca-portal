import { SELECTION_TYPES } from "../../../../../../helpers/consts";

const numberConditionalItems = {
  "<": "less",
  ">": "greater",
  "===": "equals",
  "!==": "not_equals",
}

const selectOptionsConditionalItems = {
  "===": "equals",
  "!==": "not_equals",
}

const textConditionalItems = {
  "===": "equals",
  "!==": "not_equals",
  "notIn": "not_in",
  "in": "in"
}

const conditionalItemsByType = (baseFieldType) => {
  switch(baseFieldType){
    case SELECTION_TYPES.NUMERIC:
      return numberConditionalItems;
    case SELECTION_TYPES.FREE_TEXT:
      return  textConditionalItems;
    case SELECTION_TYPES.DATE:
      return numberConditionalItems;
    default:
      return selectOptionsConditionalItems;
  }
}

const items = (intl, conditionalItems) => {
  return (
    Object.keys(conditionalItems).map(conditional => {
      return {value: conditional, label: intl.messages[`forms.edit.conditional.operator_item.${conditionalItems[conditional]}`] }
    })
  )
}
const formattedConditionalItems = (intl, baseFieldType) => {
  const itemsByBaseFieldType = conditionalItemsByType(baseFieldType)
  return items(intl, itemsByBaseFieldType)
}

export {
  formattedConditionalItems
}