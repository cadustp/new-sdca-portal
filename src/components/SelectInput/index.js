import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Title, Container, CustomStyles } from './styles';
import VirtualizedList from '../VirtualizedList';

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      inputValue: '',
    };
  }

  handleInputChange = (newValue, { action }) => {
    const { isMulti, minLength } = this.props;
    const isSettingValue = action === 'set-value';
    const showMenu = !!(newValue && newValue.length >= minLength);

    this.setState({ showMenu: isSettingValue || showMenu });

    if (!isSettingValue || !isMulti) {
      this.setState({ inputValue: newValue });
    }

    if (isSettingValue && !isMulti) {
      this.setState({
        inputValue: '',
        showMenu: false,
      });
    }

    if (newValue.includes(';')) {
      const { setSelectedItems, selectedItems = [], items } = this.props;
      const newEntriesEmails = newValue.split(';');
      const newEntries = newEntriesEmails
        .filter(string => string?.trim().length > 0)
        .map(email => {
          // Este metodo esta O(N²) e pode ser transformado em O(N) se houver gargalo na listagem de opcoes
          const match = items.find(item => item.value.email === email);
          return match || { label: email, invalid: true, value: email };
        })
        .filter(
          option =>
            !(selectedItems ?? []).some(
              otherOption => option.label === otherOption.label,
            ),
        );

      const finalResult = [...selectedItems, ...newEntries];
      setSelectedItems(finalResult);
    }

    return newValue;
  };

  tryOpenMenu = () => {
    const { inputValue } = this.state;
    const { minLength } = this.props;
    if (inputValue.length < minLength) return;
    this.setState(prevState => ({ ...prevState, showMenu: true }));
  };

  render() {
    const {
      selectedItems,
      title,
      items,
      placeholder,
      isAutoComplete,
      onChange,
      openTop,
      intl,
      error,
      isMulti,
      autoCompleteCustomComponents,
      getOptionValue,
      lineHeight,
      isDisabled
    } = this.props;
    const { showMenu, inputValue } = this.state;
    const titleComponent = title ? (
      <Title isMulti={isMulti} error={error}>
        {title}
      </Title>
    ) : null;
    return (
      <Container>
        {titleComponent}
        <Select
          lineHeight={lineHeight}
          isMulti={isMulti}
          inputValue={inputValue}
          onInputChange={this.handleInputChange}
          menuIsOpen={showMenu}
          closeMenuOnSelect={false}
          isClearable={!isMulti}
          onChange={selected => {
            onChange(selected);
          }}
          getOptionValue={getOptionValue}
          tabSelectsValue={false}
          components={
            isAutoComplete
              ? {
                  ...autoCompleteCustomComponents,
                  DropdownIndicator: () => null,
                  MenuList: VirtualizedList,
                }
              : { MenuList: VirtualizedList }
          }
          onFocus={this.tryOpenMenu}
          isSearchable={!!isAutoComplete}
          styles={CustomStyles(isAutoComplete, error)}
          value={selectedItems}
          options={showMenu ? items : []}
          placeholder={placeholder}
          menuPlacement={openTop ? 'top' : 'bottom'}
          noOptionsMessage={() => intl.messages['select_input.no_options']}
          isDisabled={isDisabled}
        />
      </Container>
    );
  }
}

const itemShape = PropTypes.shape({
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
});

SelectInput.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  items: PropTypes.arrayOf(itemShape).isRequired,
  placeholder: PropTypes.string,
  selectedItems: PropTypes.arrayOf(itemShape).isRequired,
  isAutoComplete: PropTypes.bool,
  isMulti: PropTypes.bool,
  openTop: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    messages: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  }).isRequired,
  error: PropTypes.bool,
  minLength: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  autoCompleteCustomComponents: PropTypes.object,
  setSelectedItems: PropTypes.func,
  getOptionValue: PropTypes.func,
  lineHeight: PropTypes.number,
  isDisabled:PropTypes.bool
};

SelectInput.defaultProps = {
  minLength: 0,
  title: null,
  placeholder: '',
  isAutoComplete: false,
  openTop: false,
  isMulti: false,
  error: false,
  autoCompleteCustomComponents: {},
  setSelectedItems: () => {},
  getOptionValue: value => value,
  lineHeight: 32.64,
  isDisabled:false
};

export default injectIntl(SelectInput);
