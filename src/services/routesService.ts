export const listFormsRoute = '/forms/active';
export const checkFormCreationValidityRoute = '/forms/validity';
export const deleteFormRoute = '/forms/delete';
export const getFormRoute = '/forms';
export const SharingFormDataRoute = (formId: number): string => `/forms/${formId}/sharing_data`;
export const attachmentsRoute = (formId: number): string => `forms/${formId}/set_attachments`;
export const SharingFormDataUserRoute = (userId: number): string => `/users/${userId}/sharing_data`;

export const plansRoute = '/plans';
export const userPlansRoute = '/plan_users';
export const imagesRoute = 'images/';
export const sendAnswersRoute = 'answers/';