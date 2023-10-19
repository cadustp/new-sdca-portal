/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import React from 'react';
import { TextField, WithStyles, Menu } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { TextFieldProps } from '@material-ui/core/TextField';

const styles = {
  underline: {
    '&:before': {
      borderBottomColor: '#fff',
    },
    '&:after': {
      borderBottomColor: '#fff',
    },
    '&:hover:not($disabled):not($focused):not($error):before': {
      borderBottomColor: 'white',
    },
    '&:hover:before': {
      borderBottomColor: 'white !important',
    },
  },
};
function StyledTextField(props: TextFieldProps & WithStyles<typeof styles>) {
  const { classes } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <TextField {...props} InputProps={{ classes, className: 'points-value' }} />
  );
}
export const CssTextField = withStyles(styles)(StyledTextField);

export const Container = styled.section`
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .question-content {
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    border: 1.2px solid ${({ theme }) => theme.light.gray.border};
    padding: 16px 24px 32px 24px;
    background: ${({ theme }) => theme.light.white};

    .question-header {
      grid-area: step;
      min-height: 60px;
      align-items: center;
      justify-content: space-between;
      display: grid;
      grid-template-columns: 6fr auto auto;
      grid-template-rows: 1fr;
      grid-template-areas: 'title points drag';
      h3 {
        grid-area: title;
        color: ${({ theme }) => theme.text.primary};
        font-size: 16px;
        font-weight: 700;
      }

      .points {
        display: flex;
        justify-items: center;
        align-items: center;
        grid-area: points;
        border-radius: 5px;
        color: ${({ theme }) => theme.light.primary};
        border: 1px solid ${({ theme }) => theme.light.primary};
        text-align: center;
        padding: 2px 8px;
        font-weight: 600;
        justify-content: center;
        &.invalid {
          color: ${({ theme }) => theme.light.gray.light};
          border-color: ${({ theme }) => theme.light.error.dark};
        }
      }

      .points-value {
        color: ${({ theme }) => theme.light.primary};
        width: 40px;
        input {
          text-align: center;
          margin-right: 8px;
        }
      }

      .drag {
        grid-area: drag;
      }
    }

    article {
      h4 {
        &.no-margin {
          margin-top: 0;
        }
        font-size: 14px;
        margin: 16px 0;
        &.invalid {
          color: ${({ theme }) => theme.light.error.dark};
          margin-bottom: 0;
        }
      }

      .input {
        &.invalid fieldset {
          border-color: ${({ theme }) => theme.light.error.dark};
        }

        div > div > textarea {
          font-size: 14px;
        }
      }
    }
  }

  footer {
    margin: 16px 24px 48px 24px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: ${({ theme }) => theme.light.gray.default};

    .vertical-divider {
      border-right: 1px solid ${({ theme }) => theme.light.gray.light};
      height: 24px;
    }

    button {
      transition: all 0.2s;

      &:hover {
        opacity: 0.8;
      }

      &:disabled {
        opacity: 0.5;
      }
      span {
        color: ${({ theme }) => theme.light.gray.default};
        text-decoration: underline;

        svg {
          width: 18px;
          height: 18px;
          margin-right: 8px;
          fill: ${({ theme }) => theme.light.gray.default};
        }
      }
    }
  }
`;

export const AddButton = styled.button`
  min-width: 100%;
  background: ${({ theme, invalid }) => (invalid ? theme.light.error.light : theme.light.primaryLight)};
  min-height: 80px;
  border: 1px dashed
    ${({ theme, invalid }) => (invalid ? theme.light.error.dark : theme.light.primary)};
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:focus {
    border-style: solid;
    border-width: 2px;
  }

  svg {
    fill: ${({ theme, invalid }) => (invalid ? theme.light.error.dark : theme.light.primary)};
    width: 24px;
    margin-right: 16px;
  }

  color: ${({ theme, invalid }) => (invalid ? theme.light.error.dark : theme.light.primary)};
  font-size: 16px;
  font-weight: 700;
`;

export const ModalContainer = styled.aside`
  background-color: ${({ theme }) => theme.light.white};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 32px 32px 16px 0px;
  min-width: 40%;
  max-height: 70vh;
  overflow-y: auto;

  header {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 40px;
    .icon {
      align-self: flex-end;
    }
  }

  section.body {
    display: flex;
    flex-direction: column;

    .control + .control {
      margin: 16px 0;
    }

    h4 {
      font-size: 14px;
      margin-bottom: 8px;
    }
  }

  p {
    text-align: left;
    margin-bottom: 8px;

    &.label {
      font-size: 14px;
      margin-top: 6px;
      margin-bottom: 12px;
      color: ${({ theme }) => theme.light.gray.light};
    }
  }

  footer {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;

    button {
      width: 104px;

      &:first-child {
        margin-right: 12px;
      }

      &:last-child {
        margin-left: 12px;
      }
    }
  }
`;

export const AlertContainer = styled(ModalContainer)`
padding: 0;
height: 100%;
`;
export const ListContainer = styled(ModalContainer)`
padding-right: 0;
`;

export const List = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 16px;
`;

export const OptionContainer = styled.div`
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  margin: 12px 0;
  padding: 8px;
  display: grid;
  grid-template-areas: 'icon description';
  grid-template-rows: 1fr;
  grid-template-columns: 48px 1fr;
  box-shadow: 0 4px 24px 0 ${({ theme }) => theme.light.shadow};
  grid-gap: 16px;
  border: 2px solid
    ${({ selected, theme }) => (selected ? theme.light.primary : 'transparent')};

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: icon;

    .box {
      background: ${({ theme }) => theme.light.primary};
      border-radius: 3px;
      width: 30px;
      height: 30px;
      padding: 5px;
      svg {
        fill: ${({ theme }) => theme.light.white};
        width: 20px;
      }
    }
  }

  &.disabled {
    cursor: default;
    background: ${({ theme }) => theme.light.selected};
    box-shadow: none;
    color: #333333;
    border: none;

    &:hover {
      box-shadow: none;
      border: none;
    }

    .description {
      color: ${({ theme }) => theme.light.gray.light};
    }
    .box {
      background: ${({ theme }) => theme.light.disabled};
    }
  }

  &:hover {
    box-shadow: 0 4px 10px 0 ${({ theme }) => theme.light.shadow};
    border: 2px solid
      ${({ selected, theme }) => (selected ? theme.light.primary : theme.light.gray.border)};
  }

  .description {
    grid-area: description;

    h4 {
      font-size: 14px;
      text-align: left;
      line-height: 24px;
      font-weight: 600;
    }

    p {
      text-align: left;
      font-size: 12px;
      color: ${({ theme }) => theme.light.gray.light};
    }
  }
`;

export const AnswerHeader = styled.div`
  .header-answer {
    display:flex;
    align-items: center;
    
    .center {
      margin-bottom: 0px
    }
  }
`;

export const GenericContainer = styled.div`
  min-width: 100%;
  min-height: 24px;
  padding: 8px 16px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
  margin-top: 16px;
  background: ${({ theme }) => theme.light.contrast};
  svg {
    fill: ${({ theme }) => theme.light.gray.dark};
    width: 24px;
    margin-right: 8px;
  }
  color: ${({ theme }) => theme.light.gray.dark};
  font-size: 14px;
`;

export const Option = styled.div`
  min-width: 100%;
  .section {
    display: grid;
    grid-template-areas: 'answer total actions';
    grid-template-rows: 1fr;
    grid-template-columns: 6fr 1fr 64px;
    grid-gap: 16px;
    margin: 8px 0;

    &.does-not-have-weight {
      grid-template-areas: 'answer actions';
      grid-template-columns: 6fr 64px;
    }

    &.header-wrapper {
      align-items: center;
      margin-bottom: 8px;
      grid-template-rows: 24px;
    }
    .input {
      &.invalid {
        div {
          input {
            border-color: ${({ theme }) => theme.light.error.dark};
          }
        }
      }
      &.center {
        div {
          input {
            text-align: center;
          }
        }
      }
      div {
        input {
          height: 48px;
        }
        max-height: 40px;
        font-size: 14px;
      }
    }
    .answer {
      grid-area: answer;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .total {
      display: flex;
      align-items: center;
      div {
        //margin-bottom: 10px !important;
      }
      &.answer-invalid {
        align-items: flex-end;
      }
      &-label {
        &.invalid {
          background: ${({ theme }) => theme.light.error.light};
          color: ${({ theme }) => theme.light.error.dark};
        }
        grid-area: total;
        background: ${({ theme }) => theme.light.green.light};
        color: ${({ theme }) => theme.light.green.dark};
        margin: 0;
        text-align: center;
        font-weight: 600;
        font-size: 14px;
        height: 24px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 2px;
      }
    }

    .actions {
      grid-area: actions;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      button {
        width: 24px;
        box-shadow: none;
        background: ${({ theme }) => theme.light.white};
        margin-right: 12px;
        &:last-child {
          margin-right: 0;
        }
        &.delete:disabled {
          svg * {
            color: ${({ theme }) => theme.light.gray.light};
          }
        }
        svg {
          transition: all 0.2s ease-in-out;
          width: 24px;
          &:hover * {
            color: ${({ theme }) => theme.light.gray.light};
          }
        }
      }
    }
  }
  .add-answer-types {
    button {
      padding-left: 0;
      transition: all 0.2s ease-in-out;
      &:hover {
        opacity: 0.8;
      }
      span {
        svg {
          width: 16px;
          margin-right: 8px;
          fill: ${({ theme }) => theme.light.primary};
        }
        font-weight: 600;
        font-size: 14px;
        color: ${({ theme }) => theme.light.primary};
      }
    }
  }
`;

export const StyledMenu = styled(Menu)`
    .menu-question-options {
        .menu-title {
            display:flex;
            font-weight: bold;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
            align-items: center;
            
            svg {
                width: 16px;
                margin-left: 16px;
                margin-right: 8px;
            }
        }

      svg {
        width: 16px;
        margin-left: 16px;
        margin-right: 8px;
      }
    }

    .menu-question-options {
      &:not(:first-child) {
        border-top: ${({ theme }) => `1px solid ${theme.light.gray.border}`};
      }
    }

    .description {
      font-size: 0.825em;
    }

    .menu-item {
      display: flex;
      min-height: 46px;
      align-items: center;

      button {
        width: 100%;
        justify-content: flex-start;
      }

      &:not(:first-child):not(:last-child) {
        border-bottom: ${({ theme }) => `1px solid ${theme.light.gray.border}`};
      }

      &.move {
        button {
          border-radius: unset;

          &:hover:not(:disabled) {
            background: ${({ theme }) => theme.light.f5f5f5};

            svg {
              fill: ${({ theme }) => theme.light.primaryDark};
            }
          }

          &:disabled {
            color: ${({ theme }) => theme.light.gray.light};
            svg {
              fill: ${({ theme }) => theme.light.gray.light};
            }
          }
        }
      }

      svg {
        width: 16px;
        margin-left: 8px;
        margin-right: 8px;
      }
    }
  }
`;

export const MenuItem = styled.div`
  display: flex;
  padding: 16px 12px 16px 24px;

.text {
  display: flex;
  flex-direction: column;
  font-size: 0.825em;

  &--disabled {
    color: ${({ theme }) => theme.light.gray.light};
  }

  .title {
    margin-bottom: 8px;
    font-size: 0.9em;
  }
}
`;
