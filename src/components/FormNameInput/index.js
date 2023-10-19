import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Title, Container, Input } from './styles';

class FormNameInput extends Component {

  render() {
    const {
      title,
      placeholder,
      onChange,
      inputSearchValue,
      intl,
      lineHeight,
      isDisabled
    } = this.props;
    const titleComponent = title ? (
      <Title>
        {title}
      </Title>
    ) : null;
    return (
      <Container>
        {titleComponent}
        <Input
          lineHeight={lineHeight}
          onChange={selected => {
            onChange(selected);
          }}
          tabSelectsValue={false}
          isSearchable={true}
          value={inputSearchValue}
          placeholder={placeholder}
          noOptionsMessage={() => intl.messages['select_input.no_options']}
          isDisabled={isDisabled}
        />
      </Container>
    );
  }
}

Input.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    messages: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  }).isRequired,
  error: PropTypes.bool,
  minLength: PropTypes.number,
  lineHeight: PropTypes.number,
  isDisabled:PropTypes.bool
};

Input.defaultProps = {
  minLength: 0,
  title: null,
  placeholder: '',
  error: false,
  lineHeight: 32,
  isDisabled:false
};

export default injectIntl(FormNameInput);
