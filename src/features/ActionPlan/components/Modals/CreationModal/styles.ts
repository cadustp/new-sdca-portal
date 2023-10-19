import styled from 'styled-components';
import { IconContainer } from '../../../../../components/EmailInput/styles';

export const Body = styled.article`
  display: flex;
  overflow-y: scroll;
  padding: 2px;
  margin-bottom: 16px;
  max-height: 50vh;
  justify-content: space-between;
  .description {
    margin-bottom: 32px;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 24px;
    flex: 1;
  }

  .image {
    min-width: 200px;
    margin-top: 16px;
    @media (max-width: 1100px) {
      display: none;
    }
  }

  .question {
    min-width: 100%;
    padding: 8px 0 16px 0;

    .count {
      text-align: right;
      font-size: 12px;
      color: ${({ theme }) => theme.light.gray.light};
    }
    h4 {
      margin-bottom: 8px;
      &.invalid {
        color: ${({ theme }) => theme.light.error.dark};
      }
    }
    .error {
      font-size: 12px;
      color: ${({ theme }) => theme.light.error.dark};
      margin: 2px 0 8px 0;
    }

    .tooltip {
      display: inline-flex;
      ${IconContainer} {
        margin-left: 8px;
      }
    }

    .select {
      padding: 0 0 8px 0;
      flex: 1;
    }

    .add-more {
      display: flex;
      align-items: center;
      min-width: 100%;
      justify-content: space-between;

      svg {
        margin-left: 16px;
        animation: all 0.2s ease-in-out;
      }
    }
  }

  .DateInput_input {
    font-size: 16px;
  }

  .DateRangePickerInput {
    width: 240px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  div {
    display: flex;
    justify-content: flex-end;
    flex: 1;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
`;

export const ModalContainer = styled.aside`
  background-color: ${({ theme }) => theme.light.white};
  width: 1050px;
  height: fit-content;
  border-radius: 6px;
  padding: 40px;
  display: flex;
  flex-direction: column;
`;
