import React from 'react';

import { TCompanyEmployee } from '../../../../../types/reminder';
import SelectInput from '../../../../../components/SelectInput';

type Props = {
  users: Array<TCompanyEmployee> | [],
  isDisabled: boolean,
  selectedUsers: Array<TCompanyEmployee> | [],
  title: string,
  placeholder: string,
  handleChangePlanUsers: Function,
};

const PlanUsers: React.FC<Props> = ({
    users,
    isDisabled,
    selectedUsers,
    title,
    placeholder,
    handleChangePlanUsers,
}) => {

    const formatDataSet = ({ items }) => {
        if (items) {
          return items.map(item => formatData(item));
        }
        return items;
    };

    const formatData = (item) => {
        return {
          value: item.id || item.value,
          label: `${item.name}`,
          key: Math.random(),
        };
    };

    return (
        <>
            <SelectInput
                isAutoComplete
                title={title}
                placeholder={placeholder}
                onChange={handleChangePlanUsers}
                items={formatDataSet({
                    items: users,
                })}
                isSearchable
                isMulti
                isClearable={false}
                selectedItems={formatDataSet({
                    items: selectedUsers,
                })}
                isDisabled={isDisabled}
            />
        </>
    )
};


export default PlanUsers;