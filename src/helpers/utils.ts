import { ACTION_PLAN_STATUSES } from './consts';
import { actionPlanColors } from '../styles/palette';

export function replaceLatinCharacters(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export const sortAlphabeticalAscending = (a, b) => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;

  return 0;
};

export const sortAlphabeticalDescending = (a, b) => {
  if (a.name > b.name) return -1;
  if (a.name < b.name) return 1;

  return 0;
};

export const sortCreationDateAscending = (a, b) => {
  if (a.created_at > b.created_at) return -1;
  if (a.created_at < b.created_at) return 1;

  return 0;
};

export const sortCreationDateDescending = (a, b) => {
  if (a.created_at > b.created_at) return 1;
  if (a.created_at < b.created_at) return -1;

  return 0;
};

export const sortUpdateDateAscending = (a, b) => {
  if (a.updated < b.updated) return -1;
  if (a.updated > b.updated) return 1;

  return 0;
};

export const sortUpdateDateDescending = (a, b) => {
  if (a.updated < b.updated) return 1;
  if (a.updated > b.updated) return -1;

  return 0;
};

export const sortOrderAscending = (a, b) => {
  if (a.order > b.order) return 1;
  if (a.order < b.order) return -1;

  return 0;
};

export function obtainNameInitialLetters(wholeName = ''): string {
  return (
    wholeName
      .split(' ')
      .map(name => name.charAt(0))
      .filter(
        firstLetter => firstLetter.charAt(0).toUpperCase() === firstLetter.charAt(0),
      )
      .slice(0, 2)
      .join('') || wholeName.charAt(0).toUpperCase()
  );
}

export function getInitials(name): string {
  const nameArray = name.split(' ');
  const firstInitial = nameArray[0].charAt(0);
  const secondInitial = nameArray.length > 1 ? nameArray[1].charAt(0) : '';
  return `${firstInitial}${secondInitial}`;
}

export function getActionPlanColor(actionPlanStatus): string {
  const statusName = Object.values(ACTION_PLAN_STATUSES).find(
    status => status.code === actionPlanStatus,
  )?.name;
  return actionPlanColors[statusName];
}

export const removeDuplicatedUsers = (usersArray, user) => {
  const isUserOnArray = usersArray.some(u => u.value === user.id);
  if (!isUserOnArray) {
    usersArray.push({ label: user.name, value: user.id });
  }
  return usersArray;
};

export const getItemIds = ({
  selection,
}: {
  selection: Record<string, boolean>;
}): string[] => Object.keys(selection).filter(id => selection[id]);

export const formatDataSet = (
  items,
  customLabels?,
  customValue?,
) => {
  if (items) {
    return items.map(item => {
      const label = customLabels ? customLabels.map(text => item[text]).join(' - ') : item.name || item.label;
      const value = customValue ? item[customValue] : item.id || item.value;
      const key = item.id || Math.random();

      return { value, label, key };
    });
  }

  return items;
};

export const translateLabels = (intl, items) => {
  if (items) {
    return items.map(item => ({
      value: item.value || item.id,
      label: intl.messages[item.label || item.name],
      key: item.id || Math.random(),
    }));
  }

  return items;
};

export const getUniqueItemsByKey = (items, key) => Array.from(new Set(items.map(item => item[key])))
  .map(uniqueKey => items.find(item => item[key] === uniqueKey));

export const isValidEmail = email => {
  if (email?.trim().length) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(String(email).toLowerCase());
  }
  return true;
};

export const isValidPassword = password => {
  if (password?.trim().length) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
    return regex.test(String(password));
  }
  return true;
};

export const isValidURL = (url: string) :boolean => {
  const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+;=.%]+$/;
  return urlRegex.test(String(url).toLowerCase());
};

export const validateURL = (url: string, showError: (arg: boolean) => any) :void => {
  if (!url?.trim().length) {
    showError(false);
    return;
  };
  showError(!isValidURL(url));
};
