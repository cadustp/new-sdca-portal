
import styled from 'styled-components';

export const SOption = styled.button`
  margin-top: 1rem;
  background-color: ${props=> props.isAnswer ?' var(--primary-color)' :'transparent' };
  border: 1.2px solid rgba(0, 0, 0, 0.12);
  width: 100%;
  padding: 1rem 0px 1rem 2.5rem;
  text-align: left;
  border-radius: 10px;
  transition:0.1s;
  color : ${props=> props.isAnswer ?' white' :'black' }
  ${props=> props.reminderIsAccomplished === false && `
      &:hover {
        background-color: var(--primary-color);
        color: white;
      };
      cursor: pointer;
    `
  }
`;