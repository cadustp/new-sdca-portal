import styled from 'styled-components';

export const StyledButtonDiv = styled.div`
  display: flex;
  height: auto;
  justify-content: flex-end;
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

export const StyledAlertsContainer = styled.div`
  margin-top: 24px;
`;
