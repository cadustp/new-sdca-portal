/* eslint-disable import/prefer-default-export */

import React from 'react';
import styled from 'styled-components';
import ErrorIcon from '../shared/Icons/ErrorIcon';

export const RedWarningIcon = styled(() => (
  <ErrorIcon style={{ fontSize: '18px' }} />
))``;

export const WarningMessage = styled.label`
  padding-left: 8px;
  cursor: text;
`;

export const WarningContainer = styled(({ errorWarning, ...otherProps }) => (
  <div {...otherProps} />
))`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${props => (props.errorWarning ? '#C86D61' : '#333333')};
  font-weight: 600;
`;
