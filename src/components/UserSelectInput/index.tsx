/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { components } from 'react-select';
import { Avatar } from '@material-ui/core';
import SelectInput from '../SelectInput';
import { obtainNameInitialLetters } from '../../helpers/utils';
import withLoading from '../../hocs/withLoading';

type OptionValue = {
  data: {
    label: string;
    value: {
      email: string;
      name: string;
    };
  };
};

const CustomOption = (props: React.ComponentProps<typeof components.Option> & OptionValue) => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <div style={{ display: 'flex' }}>
        <Avatar style={{ width: 32, height: 32, marginRight: 12 }}>
          <span style={{ fontSize: 10 }}>
            {obtainNameInitialLetters(data.label)}
          </span>
        </Avatar>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong>{data.label}</strong>
          <span>{data?.value.email}</span>
        </div>
      </div>
    </components.Option>
  );
};

type Props = React.ComponentProps<typeof SelectInput>;

function UserSelectInput(props: Props): JSX.Element {
  return (
    <SelectInput
      {...props}
      lineHeight={48}
      getOptionValue={(option => option?.value?.email)}
      autoCompleteCustomComponents={{ Option: CustomOption }}
    />
  );
}

export default withLoading(UserSelectInput);
