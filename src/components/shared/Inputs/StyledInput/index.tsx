/* eslint-disable import/prefer-default-export */
import React, { useMemo } from 'react';
import { injectIntl } from 'react-intl';
import { TextField, Tooltip, WithStyles, withStyles } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { IconContainer } from '../../../EmailInput/styles';
import InfoIcon from '../../Icons/InfoIcon';
import { ErrorMessage, Label } from './styles';
import { Intl } from '../../../../helpers/types';

const styles = {
  root: {
    height: 40,
  },
  input: {
    height: 32,
    padding: 8,
  },
};

type Props = {
  tooltip?: string;
  label: string;
  error?: boolean;
  errorMessage?: string;
  noErrorMessage?: boolean;
  intl: Intl;
};

function Input({
  classes,
  multiline,
  defaultValue,
  tooltip,
  label,
  error = false,
  errorMessage,
  noErrorMessage,
  intl,
  ...props
}: Props & TextFieldProps & WithStyles<typeof styles>) {
  // eslint-disable-next-line react/jsx-props-no-spreading

  const renderDefaultErrorText = useMemo(
    () => (
      <ErrorMessage>
        {errorMessage || intl.formatMessage({ id: 'forms.edit.fieldError' })}
      </ErrorMessage>
    ),
    [],
  );

  const renderLabel = () => {
    if (tooltip) {
      return (
        <Tooltip title={tooltip} placement="right">
          <Label error={error}>
            <span>{label}</span>
            <IconContainer tooltip>
              <InfoIcon fontSize="small" />
            </IconContainer>
          </Label>
        </Tooltip>
      );
    }
    return <Label error={error}>{label}</Label>;
  };

  const renderLabelMemo = useMemo(() => renderLabel(), [error]);

  return (
    <>
      {renderLabelMemo}
      {error && !noErrorMessage ? renderDefaultErrorText : null}
      <TextField
        {...props}
        variant="outlined"
        fullWidth
        error={error}
        defaultValue={defaultValue}
        multiline={multiline}
        InputProps={multiline ? {} : { classes }}
      />
    </>
  );
}

export const StyledTextField = React.memo(
  injectIntl(withStyles(styles)(Input)),
);
