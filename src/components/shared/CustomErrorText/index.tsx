import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { Intl } from '../../../helpers/types';

const ErrorText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.light.error.dark};
  line-height: 2;
`;

type Props = {
  text: string;
  intl: Intl;
};

function RequiredFieldErrorText({ text, intl }: Props): JSX.Element {
  return (
    <ErrorText>{intl.formatMessage({ id: text })}</ErrorText>
  );
}

export default injectIntl(RequiredFieldErrorText);
