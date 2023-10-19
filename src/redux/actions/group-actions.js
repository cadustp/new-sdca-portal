export const types = {
  ADD_USER_GROUPS: 'ADD_USER_GROUPS',
};

export const addUserGroups = (data) => {
  const ids = [];
  const names = [];
  const parent_ids = [];
  let groups = [];
  groups = data;
  data.forEach((info) => {
    ids.push(info.id);
    names.push(info.name);
    parent_ids.push(info.parent_id);
  });
  return {
    type: 'ADD_USER_GROUPS',
    payload: {
      ids, names, parent_ids, groups,
    },
  };
};
