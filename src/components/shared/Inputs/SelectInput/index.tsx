import React from 'react';
import Select, { Props } from 'react-select';

import { light } from '../../../../styles/palette';

const theme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: light.primary,
    primary75: light.primary,
    primary50: light.primaryLight,
    primary25: light.primaryLight,
  },
});

const styles = ({ error }) => ({
  control: (provided, state) => ({
    ...provided,
    borderColor: `${error ? 'var(--error)' : 'var(--grey-color)'}`,
    backgroundColor: state.isDisabled ? light.selected : 'white',
  }),
  placeholder: provided => ({
    ...provided,
    color: 'darkgray',
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? 'var(--primary-color-translucent)'
      : 'transparent',
    color: state.isSelected ? 'var(--primary-color)' : 'var(--dark-grey-color)',
    backgroundPosition: 'center',
    transition: 'background 0.2s',
    ':hover': {
      backgroundColor: 'var(--primary-color-translucent)',
    },
    height: 'fit-content',
  }),
  multiValue: (provided, { data }) => ({
    ...provided,
    color: 'var(--primary-color)',
    backgroundColor: `var(${
      data.invalid ? '--error-translucent' : '--primary-color-translucent'
    })`,
    borderRadius: '20px',
    fontWeight: '500',
    height: '20px',
    alignItems: 'center',
    margin: '4px 8px 4px 0',
    cursor: 'pointer',
    maxWidth: 200,
  }),
  multiValueLabel: provided => ({
    ...provided,
    color: 'var(--primary-color)',
    fontSize: '12px',
    padding: 0,
    paddingLeft: '8px',
  }),
  multiValueRemove: provided => ({
    ...provided,
    paddingRight: '4px',
    color: 'inherit',
    backgroundColor: 'transparent',
    svg: {
      height: '12px',
      strokeWidth: '0px',
    },
    ':hover': {
      backgroundColor: 'transparent',
    },
  }),
});

type OwnProps = {
  error?: boolean;
};

function SelectInput({ error = false, ...props }: Props & OwnProps) {
  return <Select theme={theme} styles={styles({ error })} {...props} />;
}

export default React.memo(SelectInput);
