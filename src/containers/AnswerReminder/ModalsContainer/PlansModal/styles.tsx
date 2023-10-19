
import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${props=> props.isSave ?' var(--primary-color)' :'transparent' };
  border: 1.2px solid rgba(0, 0, 0, 0.12);
  width: 90%;
  border-radius: 10px;
  color : ${props=> props.isSave ?' white' :'black' };
  cursor: pointer;
  padding: 0.5rem;
  transition: 0.5s;
  &:hover{
    color: 'black' ;
    background-color: ${props=> !props.isSave ?' #f9f9f9' :'transparent' };
  }
`;

export const Body = styled.article`
  padding: 2px;
  .description {
    margin-bottom: 32px;
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
`;
