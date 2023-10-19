/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/material/styles';



export const TopMenuItem = styled.div`
  display: flex;
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

export const MenuLink = styled(NavLink)`
  text-decoration: none;
  &.active {
    button {
      color: ${({ theme }) => `${theme.light.primary} !important`};
      font-weight: 600;
      opacity: 1;
    }
  }
  &:hover {
    background: unset;
    color: #33383b;
  }
`;



export const StyledMenuItem = makeStyles({
  root: {
    color: 'var(--dark-grey-color)', 
    opacity: '0.5',
    fontWeight: '500',
    fontSize: '13px',
    textTransform: 'uppercase',
    lineHeight: '16px',
    letterSpacing: '1px',
    paddingTop: '11px',
    paddingBottom: '11px'
  },

})(MenuItem);


export const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.light.gray.dark};
  opacity: 0.5;
  font-weight: 500;
  font-size: 13px;
  text-transform: uppercase !important;
  margin-left: 10px;
  letter-spacing: 1px;
  line-height: 16px;
`;

export const Container = styled.div`
  z-index: 50;
  
`;

export const StyledPaper = styled(({ empty, ...otherProps }) => (
  <Paper {...otherProps} classes={{ root: 'root' }} />
))`
  box-shadow: 0 0 4px 0 rgba(164, 176, 196, 0.29);
`;

export const TopMenuContainer = styled.div`
  display: flex;
  flex: 1;
  padding-left: 10px;
`;
