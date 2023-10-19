import { Form, Step } from "src/redux/forms/types";

export interface StepSelectOption {
  label: string;
  value: string | number | null;
}

function useSelectSteps(form: Form): Array<StepSelectOption> {
  
  const itemIndexByOrder = (itemOrder, index) => itemOrder ? itemOrder-1 : index

  return form.steps.map((step: Step, index: number): StepSelectOption => {
    return {
      label: step.title,
      value: itemIndexByOrder(step.order, index)
    } as StepSelectOption
  });
}


export default useSelectSteps;