/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

export const OuterContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 30px 0px;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 62px;
  width: 62%;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 0 5px 0 #e5e9f2;
  margin-left: 142px;
  margin-right: 30px;
`;

export const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 75%;
  height: 62px;
  padding: 20px;
  border-radius: 4px;
  flex: 3;
  img {
    height: 16px;
    width: 16px;
  }
`;

export const ButtonStyledContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 170px;
`;

export const StyledInput = styled(({ empty, ...otherProps }) => (
  <Input {...otherProps} disableUnderline classes={{ root: 'root' }} />
))`
  width: 100%;
  margin: 0px;
  border: none;
  outline: none;
  margin-left: 10px;
  font-size: 15px;
  line-height: 24px;
  color: #333333;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: transparent;
  }

  ::placeholder {
    font-size: 15px;
    line-height: 24px;
    color: #333333;
    opacity: 0.3;
    text-align: left;
  }
`;

export const Separator = styled.div`
  box-sizing: border-box;
  height: 50px;
  width: 1px;
  border: 1px solid #dcdcdc;
  opacity: 0.59;
`;

export const StyledButton = styled(({ empty, ...otherProps }) => (
  <Button {...otherProps} classes={{ label: 'label' }} />
))`
  background-color: transparent;
  border: none;
  border-radius: 4px;
  height: 100%;
  flex: 1;

  &:hover {
    .label {
      color: var(--primary-color);
    }
    background-color: transparent;
  }

  svg {
    margin-right: 8px;
  }

  & .label {
    font-weight: 500;
    font-size: 14px;
    color: var(--dark-grey-color);
    text-transform: none;
  }
`;

export const AvatarListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const StyledIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

export const SkeletonButtonWrapper = styled.div`
  margin: auto;
`;
