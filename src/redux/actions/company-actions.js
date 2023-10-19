export const types = {
  ADD_USER_COMPANY: 'ADD_USER_COMPANY',
};

export const addUserCompany = data => ({
  type: 'ADD_USER_COMPANY',
  payload: {
    company: data,
  },
});
