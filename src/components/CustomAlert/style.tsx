/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const MessageBody = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Container = styled.div`
  color: ${({ theme }) => theme.text.primary};
  text-align: center;
  size: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .title {
    font-weight: bold;
    padding-bottom: 16px;
  }

  .icon {
    margin: 32px;
  }

  footer {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 16px;

    button {
      width: 104px;

      &:first-child {
        margin-right: 12px;
      }

      &:last-child {
        margin-left: 12px;
      }
    }
  }
`;
