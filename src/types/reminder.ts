export type TCompanyEmployee = {
  id?: number,
  name?: string,
  label?: string
};

export type TImage = {
  file: File,
  name: string,
  url: string,
};

export type TAnomaly = {
  causes: Array<string>,
  description: string,
  id?: number,
};

export type TPlan = {
  name: string,
  description?: string | null,
  start_date: string,
  end_date: string,
  anomalies?: TAnomaly | null,
  plan_users?: Array<TCompanyEmployee> | null,
};

export type TAnswerOptions = {
  id: number,
  option_text: string,
  should_dismiss: boolean,
  is_knock_out_form: boolean,
  is_knock_out_step: boolean,
  is_comment_required: boolean,
  is_plan_required: boolean,
  is_image_required: boolean
};
export type TAnswer = {
  selected_options: Array<number>,
  uuid: string | null,
  free_text: string | null,
  custom_date: any | null,
  custom_value: number | null,
  observation: string | null,
  dismissed: boolean | null,
  knocked_out: boolean | null,
  images: Array<TImage> | [] | null,
  feedback: any,
  action_plan: any,
  plan: TPlan | null,
};

export type TAnswerExtraOptions = {
  is_comment_required: boolean,
  is_plan_required: boolean,
  is_image_required: boolean,
};

export type TQuestion = {
  id: number,
  order: number,
  step_number: number,
  question: string
  selection_type: string,
  weight: string,
  is_comment_required: boolean,
  description: string | null,
  answer_options: Array<TAnswerOptions>,
  answer: TAnswer,
  answer_extra_options: TAnswerExtraOptions | any,
  missing_answer: boolean | null,
  missing_association: boolean | false,
};

export type TStep = {
  step_id: number,
  name: string,
  questions:Array<TQuestion>,
  hasKnockedOutQuestions: boolean | null | undefined,
};

export type TForm ={
  id:number | string,
  version: string,
  name: string,
  type: number,
  pop: string,
  fluxogram: string,
  external_link: string,
  steps:Array<TStep>,
  hasKnockedOutQuestions: boolean | null | undefined,
  selected_company_employee: TCompanyEmployee | null | undefined,
  geolocation_required: boolean | false,
  description: string | null | undefined,
};

export interface IReminder {
  id: number | null,
  name: string,
  score_date: string | null,
  start_date: string,
  end_date: string,
  type: number,
  score: number | string | null,
  status: string,
  company_employees:Array<TCompanyEmployee> | [],
  location: string | null,
  form:TForm
}
