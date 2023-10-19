/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.aside`
  background-color: ${({ theme }) => theme.light.white};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 32px 0px 16px 0px;
  min-width: 40%;

  header {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 40px;
    .icon {
      align-self: flex-end;
    }
  }

  section.body {
    display: flex;
    flex-direction: column;

    .control + .control {
      margin: 16px 0;
    }

    h4 {
      font-size: 14px;
      margin-bottom: 8px;
    }
  }

  p {
    text-align: left;
    margin-bottom: 8px;

    &.label {
      font-size: 14px;
      margin-top: 6px;
      margin-bottom: 12px;
      color: ${({ theme }) => theme.light.gray.light};
    }
  }

  footer {
    margin-top: 24px;
    display: flex;
    justify-content: flex-end;

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
