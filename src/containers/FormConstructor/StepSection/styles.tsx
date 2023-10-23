/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import React from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from 'mui-styles';
import { TextFieldProps } from '@mui/material/TextField';

const styles = {
  underline: {
    '&:before': {
      borderBottomColor: 'white',
    },
    '&:hover:not($disabled):not($focused):not($error):before': {
      borderBottomColor: 'white',
    },
    '&:hover:before': {
      borderBottomColor: 'white !important',
    },
  },
};
function StyledTextField(props: TextFieldProps & makeStyles<typeof styles>) {
  const { classes } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TextField {...props} InputProps={{ classes, className: 'title' }} />;
}
export const CssTextField = (props: any) => {
  const classes = makeStyles(styles);

  return <StyledTextField classes={{ ...classes }} {...props} />
}

export const Container = styled.section`
  margin-top: 48px;
  display: grid;
  grid-template-rows: 60px 1fr;
  grid-template-areas: '. step actions' '. questions .';
  grid-gap: 24px;
  &.invalid {
    grid-template-rows: 12px 60px 1fr;
    grid-template-areas: '. error .' '. step actions' '. questions .';
    .step-header {
      background: ${({ theme }) => theme.light.error.dark};
    }
  }
  .title-error {
    grid-area: error;
  }
  .step-header {
    grid-area: step;
    background: ${({ theme }) => theme.light.primary};
    padding: 12px 24px;
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
    display: grid;
    grid-template-columns: 6fr 1fr auto;
    grid-template-rows: 1fr;
    grid-template-areas: 'title points drag';
    .text-wrapper {
      grid-area: title;
      color: ${({ theme }) => theme.light.white};
      align-items: center;
      font-size: 16px;
      font-weight: 400;
      margin-left: 12px;
      display: flex;
      .step {
        color: inherit;
        min-width: fit-content;
        font-weight: 700;
      }
      .title {
        margin-left: 16px;
        color: ${({ theme }) => theme.light.white};
      }
    }
    .points {
      grid-area: points;
      border-radius: 5px;
      color: ${({ theme }) => theme.light.white};
      text-align: center;
      padding: 2px;
      font-weight: 600;
    }
    .drag {
      grid-area: drag;
    }
  }

  .step-actions {
    grid-area: actions;
    display: flex;
    align-items: center;
    .step-actions-row {
      padding-bottom: 5px;
      grid-area: actions;
      display: flex;
      align-items: center;
      button {
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.12);
        margin-right: 12px;
        max-width: 36px;
        max-height: 36px;
        background: ${({ theme }) => theme.light.white};
        &:disabled {
          span svg {
            fill: ${({ theme }) => theme.light.gray.light};
          }
        }
        span svg {
          fill: ${({ theme }) => theme.light.primary};
        }
      }
    }
  }

  .questions {
    grid-area: questions;
    margin: 0 24px;
  }

  @media screen and (min-width: 1961px) {
    margin-top: 48px;
  }

  @media screen and (max-width: 1080px) {
    margin-top: 48px;
    grid-template-columns: auto 6fr 1fr;
  }
`;
