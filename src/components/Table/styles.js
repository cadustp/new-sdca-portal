/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import React from 'react';
import { Table } from 'react-virtualized';

export const StyledTable = styled(({ ...otherProps }) => (
  <Table {...otherProps} classes={{ root: 'root' }} />
))``;

export const InnerRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80px;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 12px 0px;
  box-shadow: 0 0 5px 0 #e5e9f2;
  margin-right: 12px;
`;
