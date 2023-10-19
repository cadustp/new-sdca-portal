import styled from 'styled-components';
import { text } from '../../styles/palette';

export const StyledButtonDiv = styled.div`
  display: flex;
  height: auto;
  justify-content: flex-end;
  align-items: center;
  margin-top: 32px;
`;

export const StyledFormDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  p {
    font-size: 12px;
    &.message {
      margin-bottom: 16px;
    }
  }
`;

export const StyledItemContainer = styled.div`
  margin-bottom: 20px;
`;

export const DateText = styled.div`
  font-size: 12px;
  margin-bottom: 16px;
`;

export const WarningMessage = styled.div`
  font-size: 12px;
  color: ${props => (props.errorWarning ? '#C86D61' : '#333333')};
  font-weight: 500;
  line-height: 1;
  margin: 0;
  padding-top: 8px;
`;

export const FilterLabelMessage = styled.div`
  color: ${text.primary};
`;

export const StyledAlertsContainer = styled.div`
  margin-top: 24px;
`;
