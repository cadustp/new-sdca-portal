import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/material/styles';
import classNames from 'classnames';
import {
  Title,
  Container,
  Inline,
  InputStyle,
  ErrorText,
  IconContainer,
} from './styles';
import InfoIcon from '../shared/Icons/InfoIcon';

class EmailInput extends Component {
  state = {
    error: false,
    email: '',
  };

  checkEmailOnBlur = () => {
    const { email } = this.state;
    const { onBlur } = this.props;
    if (email.length) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const validate = regex.test(String(email).toLowerCase());
      this.setState({ error: !validate });
      if(validate){
        onBlur(email);
      };
    } else {
      this.setState({ error: false });
    }
  };

  handleOnChange = (e) => {
    const { onChange } = this.props;
    this.setState({ email: e.target.value });
    onChange(e);
  };

  render() {
    const {
      title, placeholder, tooltip, classes, errorMessage,
    } = this.props;

    const { error } = this.state;
    const titleComponent = title && (
      <Title error={error} icon>
        {title}
      </Title>
    );
    const tooltipComponent = tooltip && (
      <IconContainer tooltip>
        <Tooltip title={tooltip} placement="right">
          <InfoIcon nativeColor={error ? '#E35151' : ''} fontSize="small" />
        </Tooltip>
      </IconContainer>
    );
    const errorComponent = (
      <ErrorText error={error}>{error && errorMessage}</ErrorText>
    );
    return (
      <Container>
        <Inline>
          {tooltipComponent}
          {titleComponent}
        </Inline>
        <TextField
          fullWidth
          type="email"
          placeholder={placeholder}
          className={classNames(classes.textField)}
          InputProps={{ className: classes.root }}
          margin="normal"
          onBlur={this.checkEmailOnBlur}
          error={error}
          onChange={this.handleOnChange}
        />
        {errorComponent}
      </Container>
    );
  }
}

EmailInput.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  tooltip: PropTypes.string,
  classes: PropTypes.instanceOf(Object).isRequired,
  errorMessage: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

EmailInput.defaultProps = {
  title: null,
  placeholder: '',
  tooltip: null,
  onChange: () => {},
  onBlur: () => {},
};

export default injectIntl(makeStyles(InputStyle)(EmailInput));
