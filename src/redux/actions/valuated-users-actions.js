export const types = {
  ADD_VALUATED_USERS: 'ADD_VALUATED_USERS',
};

export const addValuatedUsers = data => {
  const ids = [];
  const names = [];
  const emails = [];
  const valuatedUsers = data || [];
  valuatedUsers.forEach(valuatedUser => {
    ids.push(valuatedUser.id);
    names.push(valuatedUser.name);
    emails.push(valuatedUsers.email);
  });
  return {
    type: 'ADD_VALUATED_USERS',
    payload: { ids, names, valuatedUsers },
  };
};
