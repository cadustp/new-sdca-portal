
import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const Button = styled.button`
background-color:  var(--primary-color)};
border: 1.2px solid rgba(0, 0, 0, 0.12);
width: 90px;
border-radius: 10px;
color :  white;
cursor: pointer;
padding: 0.5rem;
float:right;
transition: 0.5s;
&:hover{
  color: black;
  background-color: white;
}
`;

export const ButtonLink = styled.button`
  margin-top:20px
  background-color: var(--primary-color);
  border: 1.2px solid rgba(0, 0, 0, 0.12);
  padding: 0.2rem 1rem;
  border-radius: 10px;
  color :  white;
  cursor: pointer;
  transition:0.5s;
  &:hover{
    background-color: white;
    color:var(--primary-color);
    border: 1.2px solid var(--primary-color);
  }
`;

export const Line = styled(Box)`
  margin-top:3px
  width:100%;
  background: var(--primary-color);
  height:0.5px;
`;

export const Subtitle = styled.p`
font-weight: 600;
`;