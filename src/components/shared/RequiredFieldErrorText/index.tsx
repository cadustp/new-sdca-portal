import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { Intl } from '../../../helpers/types';

const ErrorText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.light.error.dark};
  line-height: 2.8;
`;

type Props = {
  intl: Intl;
};

function RequiredFieldErrorText({ intl }: Props): JSX.Element {
  return (
    <ErrorText>{intl.formatMessage({ id: 'forms.edit.fieldError' })}</ErrorText>
  );
}

export default injectIntl(RequiredFieldErrorText);
