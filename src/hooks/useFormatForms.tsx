import { useEffect, useState, useCallback } from 'react';
import { IForm } from '../redux/RemindersSideFilters/types';
import { Intl } from '../helpers/types';

type Props = {
  isFormatDataSet?: boolean | any;
  isFormActive?: boolean | any;
  intl: Intl;
  forms: Array<IForm>;
};

export type typeFormFormated = {
  value:number;
  label:string;
  key:number;
};

const useFormatForms = ({
  forms,
  isFormatDataSet,
  isFormActive,
  intl,
}: Props) => {
  const [myForms, setMyForms] = useState<Array<IForm>>([]);

  const filterFormsActive = forms => {
    return forms.filter(form => form.active === true);
  };

  const formatDataSet = useCallback(
    ({ items }) => {
      if (items) {
        return items.map(item => ({
          value: item.id || item.value,
          label: formatLabel({ item }),
          key: item.id || item.value || Math.random(),
        }));
      }
      return items;
    },

    [forms],
  );

  const formatLabel = ({ item }) => {
    return `${item.name} - ${intl.formatMessage({ id: 'reports.version' })}: ${
      item.version
    }`;
  };

  useEffect(() => {
    let formatForms = forms;

    if (isFormActive) {
      formatForms = filterFormsActive(forms);
    }

    if (isFormatDataSet) {
      formatForms = formatDataSet({ items: forms });
    }

    setMyForms(formatForms);
  }, [forms]);

  return myForms;
};

export default useFormatForms;
