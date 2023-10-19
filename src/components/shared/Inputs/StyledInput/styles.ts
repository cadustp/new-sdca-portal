import styled from 'styled-components';
import { IconContainer } from '../../../EmailInput/styles';

type LabelType = {
  error?: boolean;
};

export const Label = styled.h4<LabelType>`
  margin-bottom: 8px;
  color: ${({ theme, error }) => error && theme.light.error.dark};
  display: inline-flex;
  ${IconContainer} {
    margin-left: 8px;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.light.error.dark};
  margin: 2px 0 8px 0;
`;
