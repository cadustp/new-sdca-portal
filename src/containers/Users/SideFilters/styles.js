import React from 'react';
import styled from 'styled-components';
import SelectInput from '../../../components/SelectInput';
import DatePicker from '../../../components/DatePicker';
import CheckList from '../../../components/CheckList';
import RadioList from '../../../components/RadioList';
import { Switch, FormControlLabel } from '@material-ui/core';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2%;
  padding-right: 8%;
  padding-left: 8%;
  overflow: auto;
  z-index: -1;
  position: relative;
  border: 0;
  flex: 1;
`;

export const Header = styled.div`
  margin: 0 0 12px 0;
  border: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.p`
  color: var(--dark-grey-color);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.18px;
  margin: 12px 0 20px 0;
`;

export const ClearFilters = styled.button`
  color: var(--primary-color);
  background-color: transparent;
  border: 0;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18px;
  outline: 0;
  cursor: pointer;
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const FilterButton = styled.div`
  border: 0;
  padding: 24px;
  padding-right: 45px;
  padding-top: 12px;
  display: flex;
  align-items: center
  justify-content: flex-end;
`;

export const MarginDiv = styled.div`
  margin: ${props => props.margin};
`;

const SwitchLabel = styled.label`
  letter-spacing: 0.18px;
  color: var(--dark-grey-color);
  font-size: 12px;
  font-weight: 600;
`;

export const StyledSelectInput = styled(({ ...otherProps }) => (
  <MarginDiv margin="0 0 24px 0">
    <SelectInput {...otherProps} />
  </MarginDiv>
))``;

export const StyledDatePicker = styled(({ ...otherProps }) => (
  <MarginDiv margin="0 0 24px 0">
    <DatePicker {...otherProps} />
  </MarginDiv>
))``;

export const StyledCheckList = styled(({ ...otherProps }) => (
  <MarginDiv margin="0 0 16px 0">
    <CheckList {...otherProps} />
  </MarginDiv>
))``;

export const StyledRadioList = styled(({ ...otherProps }) => (
  <MarginDiv margin="0 0 16px 0">
    <RadioList {...otherProps} />
  </MarginDiv>
))``;

export const StyledSwitch = styled(({ ...otherProps }) => (
  <MarginDiv margin="0 0 16px 0">
    <SwitchLabel>{otherProps.title}</SwitchLabel>
    <Switch {...otherProps} />
  </MarginDiv>
))``;

export const AnimatedHiddenDiv = styled.div`
  max-height: ${props => (props.hidden ? '0' : '60%')};
  opacity: ${props => (props.hidden ? '0' : '1')};
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  overflow: ${props => (props.hidden ? 'hidden' : 'visible')};
`;
