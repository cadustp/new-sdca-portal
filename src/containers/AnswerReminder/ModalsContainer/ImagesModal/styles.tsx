
import styled from 'styled-components';

export const Button = styled.button`
background-color:  var(--primary-color);
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