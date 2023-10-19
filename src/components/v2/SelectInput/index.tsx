import React, { useRef, useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import { injectIntl } from 'react-intl';
import { Title, Container, CustomStyles } from './styles';
import VirtualizedList from './virtualizedList';
import { Tooltip } from '@material-ui/core';
import './styles.css'

type Props = {
  lineHeight: any,
  title: string,
  placeholder: string,
  error: any,
  isMulti: boolean,
  items: any,
  selectedItems: any,
  isDisabled: boolean,
  openTop: any,
  intl: any,
  autoCompleteCustomComponents: any,
  setSelectedItems: any,
  controlShouldRenderValue: boolean,
  customFilterFunction: any,
}

type OptionValue = {
  data: {
    label: string;
    value: any;
    key: any;
  };
};

const DefaultOption = (props: React.ComponentProps<typeof components.Option> & OptionValue) => {
  const { data } = props;
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props };
  // @ts-expect-error
  newProps.innerProps = rest;

  const [showTooltip, setShowTooltip] = useState(false);

  const child = useRef(null);

  useEffect(() => {
    setShowTooltip(!isEllipsisActive(child.current));
  }, [])

  const isEllipsisActive = (element) => {
    return element.offsetWidth < element.scrollWidth;
  }

  return (
    <components.Option {...newProps} className="default-custom-option">
      <Tooltip  title={data.label} disableHoverListener={showTooltip}>
        <span className='option-text' ref={child}>{data.label}</span>
      </Tooltip>
    </components.Option>
  );
};

const SelectInputV2: React.FC<Props> = ({
  lineHeight = 30,
  title,
  placeholder,
  error,
  isMulti,
  items,
  selectedItems,
  isDisabled,
  openTop,
  intl,
  autoCompleteCustomComponents = { Option: DefaultOption },
  setSelectedItems,
  controlShouldRenderValue = true,
  customFilterFunction,
}) => {
  const titleComponent = title ? (
    <Title isMulti={isMulti} error={error}>
      {title}
    </Title>
  ) : null;

  const handleChange = (newValue) => {
    setSelectedItems(isMulti ? (newValue || []) : newValue);
  };

  return (
    <>
      <Container>
        {titleComponent}

        <Select
          lineHeight={lineHeight}
          placeholder={placeholder}
          options={items}
          value={selectedItems}
          closeMenuOnSelect={!isMulti}
          isMulti={isMulti}
          isClearable={!isMulti}
          isDisabled={isDisabled}
          menuPlacement={openTop ? 'top' : 'bottom'}
          isSearchable
          noOptionsMessage={() => intl.messages['select_input.no_options']}
          styles={CustomStyles(true, error)}
          components={{ ...autoCompleteCustomComponents, MenuList: VirtualizedList }}
          onChange={handleChange}
          controlShouldRenderValue={controlShouldRenderValue}
          backspaceRemovesValue={false}
          filterOption={customFilterFunction}
        />
      </Container>
    </>
  );
};

export default injectIntl(SelectInputV2);