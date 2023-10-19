
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