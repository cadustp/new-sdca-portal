import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { createStyles, Tooltip } from '@mui/material';
import { light } from '../../../styles/palette';
import { makeStyles } from '@mui/material/styles';
import { Intl } from '../../../helpers/types';

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      top: '5px !important',
      marginLeft: '-1em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
}

const styles = (theme: any) =>
  createStyles({
    arrowPopper: arrowGenerator(light.error.dark),
    errorTooltip: {
      backgroundColor: light.error.dark,
      color: light.white,
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
    arrow: {
      position: 'absolute',
      fontSize: 6,
      width: '3em',
      height: '3em',
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
      },
    },
    bootstrapPopper: arrowGenerator(light.error.dark),
    bootstrapTooltip: {
      backgroundColor: light.error.dark,
    },
    bootstrapPlacementLeft: {
      margin: '0 8px',
    },
    bootstrapPlacementRight: {
      margin: '0 8px',
    },
    bootstrapPlacementTop: {
      margin: '8px 0',
    },
    bootstrapPlacementBottom: {
      margin: '8px 0',
    },
    htmlPopper: arrowGenerator(light.error.dark),
    htmlTooltip: {
      backgroundColor: light.error.dark,
      color: 'rgba(0, 0, 0, 1)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      '& b': {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
  });

type Props = {
  children: any;
  classes: any;
  open: boolean;
  message: string;
  intl: Intl;
};

function ErrorTooltip({
  children,
  classes,
  open,
  message,
  intl,
}: Props): JSX.Element {
  const [arrowRef, setArrowRef] = useState<any>(null);
  const handleArrowRef = node => {
    setArrowRef(node);
  };
  return (
    <Tooltip
      open={!!open}
      placement="right"
      style={{ opacity: 1, zIndex: 88 }}
      title={
        <React.Fragment>
          {message || intl.formatMessage({ id: 'forms.edit.fieldError' })}
          <span className={classes.arrow} ref={handleArrowRef} />
        </React.Fragment>
      }
      classes={{ popper: classes.arrowPopper, tooltip: classes.errorTooltip }}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
}

export default injectIntl(makeStyles(styles)(ErrorTooltip));
