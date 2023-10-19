/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components';
import Drawer from '@mui/material/Drawer';

const StyledDrawer = styled(({ ...otherProps }) => (
  <Drawer {...otherProps} classes={{ paper: 'paper' }} />
))`
  .paper {
    background-color: #ffffff;
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: var(--dark-grey-color);
    font-weight: 500;
    width: 380px;
  }
`;

export default StyledDrawer;
