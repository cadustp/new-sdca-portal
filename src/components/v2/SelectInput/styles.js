import styled from 'styled-components';

export const Title = styled.div`
  letter-spacing: 0.18px;
  margin: 0;
  margin-bottom: ${props => (props.isMulti ? '8px' : 0)};
  color: ${props => (props.error ? '#E35151' : 'var(--dark-grey-color)')};
  font-size: 12px;
  font-weight: 600;
`;

export const Container = styled.div`
  margin: 0;
`;

export const CloseIconContainer = styled.div`
  padding: 0 4px 0 4px;
  display: flex;
  align-items: center;
  height: 100%;
  transition: color 0.3s;
  :hover {
    color: var(--primary-color);
  }
`;

const getBorderColor = (isFocused, error) => {
  if (error) {
    return '1px solid #E35151';
  }
  return isFocused
    ? '1px solid var(--primary-color)'
    : '1px solid var(--light-grey-color)';
};

export const CustomStyles = (isAutoComplete, error) => ({
  container: provided => ({
    ...provided,
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'transparent',
    cursor: isAutoComplete ? 'text' : 'pointer',
    border: 'none',
    borderRadius: 'none',
    borderBottom: getBorderColor(state.isFocused, error),
    boxShadow: 'none',
    ':hover': {
      borderBottom: getBorderColor(state.isFocused, error),
    },
    minHeight: '24px',
  }),
  valueContainer: provided => ({
    ...provided,
    paddingLeft: '0',
    bottom: '2px',
    minHeight: '32px',
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none',
  }),
  indicatorsContainer: provided => ({
    ...provided,
    height: '24px',
    position: 'relative',
    alignSelf: 'flex-end',
    bottom: '4px',
    right: 10,
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: 'var(--dark-grey-color)',
    cursor: 'pointer',
    width: '16px',
    padding: 0,
    ':hover': {
      color: 'var(--grey-color)',
    },
  }),
  clearIndicator: provided => ({
    ...provided,
    cursor: 'pointer',
    padding: 0,
    color: 'var(--dark-grey-color)',
    width: '14px',
    ':hover': {
      color: 'var(--grey-color)',
    },
  }),
  placeholder: provided => ({
    ...provided,
    position: 'absolute',
    left: 0,
    top: '20px',
    fontWeight: 400,
    color: 'var(--dark-grey-color)',
    opacity: 0.3,
    fontSize: '12px',
    height: '20px',
  }),
  input: provided => ({
    ...provided,
    position: 'relative',
    fontWeight: 400,
    left: 0,
    top: '2px',
    height: '20px',
    fontSize: '12px',
    color: '#333333',
    '& input': {
      font: 'inherit',
    },
  }),
  singleValue: provided => ({
    ...provided,
    position: 'relative',
    fontWeight: 400,
    left: 0,
    top: 12,
    bottom: 0,
    marginRight: 0,
    height: '18px',
    fontSize: '12px',
    color: '#333333',
  }),
  menu: provided => ({
    ...provided,
    margin: 0,
  }),
  menuList: provided => ({
    ...provided,
    maxHeight: '132px',
    fontWeight: 400,
    cursor: 'pointer',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '12px',
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? 'var(--light-grey-color)'
      : 'transparent',
    color: 'var(--dark-grey-color)',
    backgroundPosition: 'center',
    transition: 'background 0.3s',
    ':hover': {
      backgroundColor: 'var(--light-grey-color)',
    },
    height: '100%',
    padding: '0',
  }),
  noOptionsMessage: (provided, state) => ({
    ...provided,
    fontSize: '12px',
    cursor: 'default',
    backgroundColor: state.isSelected ? 'var(--light-grey-color)' : '#FFFFFF',
    color: 'var(--dark-grey-color)',
  }),
  multiValue: (provided, { data }) => ({
    ...provided,
    color: `var(${data.invalid ? '--error' : '--primary-color'})`,
    backgroundColor: `var(${data.invalid ? '--error-translucent' : '--primary-color-translucent'})`,
    borderRadius: '20px',
    fontWeight: '500',
    height: '20px',
    alignItems: 'center',
    margin: '4px 8px 4px 0',
    cursor: 'pointer',
  }),
  multiValueLabel: provided => ({
    ...provided,
    color: 'inherit',
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

export const ScrollableDiv = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: ${props => props.height || 128}px;
`;

export const SizerWrapper = styled.div`
  position: relative;
  height: ${({ height }) => height}px;
`;
