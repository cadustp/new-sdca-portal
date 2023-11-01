import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { RedWarningIcon, WarningContainer, WarningMessage } from './styles';

const WarningLabel = (props) => {
  const { intl, errorWarning } = props;
  return (
    <WarningContainer errorWarning={errorWarning}>
      <RedWarningIcon />
      <WarningMessage>{intl.messages['warning_label.warning']}</WarningMessage>
    </WarningContainer>
  );
};

WarningLabel.propTypes = {
  intl: PropTypes.shape().isRequired,
  errorWarning: PropTypes.bool,
};

WarningLabel.defaultProps = {
  errorWarning: false,
};

export default injectIntl(WarningLabel);
