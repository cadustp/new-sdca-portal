/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const TopMenuItem = styled.div`
  display: flex;
  justify-content: conter;
  align-items: center;

  margin-left: 8px;
  padding: 8px;

  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    cursor: pointer;
  }

  p {
    color: ${props => (props.choosen ? '#3580B2' : '#33383B')};
    opacity: 0.5;
    font-weight: 500;
    font-size: 13px;
    text-transform: uppercase;
  }
`;
