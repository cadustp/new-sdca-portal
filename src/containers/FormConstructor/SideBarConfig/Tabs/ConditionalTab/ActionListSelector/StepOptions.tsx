import React from "react";
import SelectInput from "../../../../../../components/v2/SelectInput";
import {StepSelectOption} from "../Helpers/useSelectSteps";

type Props = {
  steps: Array<StepSelectOption>,
  onSelectChange: Function,
  value: any,
}

const StepOptions: React.FC<Props> = ({
  steps,
  value,
  onSelectChange
}) => {

  return (
    <SelectInput 
      items={steps}
      setSelectedItems={onSelectChange}
      selectedItems={steps.filter(item => item.value === value)}
    />
  )
};


export default StepOptions;



