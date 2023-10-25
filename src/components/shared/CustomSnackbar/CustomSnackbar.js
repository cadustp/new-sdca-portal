import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { makeStyles } from 'mui-styles';
import WarningIcon from '../Icons/WarningIcon';
import InfoIcon from '../Icons/InfoIcon';
import ErrorIcon from '../Icons/ErrorIcon';
import SuccessIcon from '../Icons/SuccessIcon';

const defaultAutoHideDuration = 5000;

const variantIcon = {
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: '#52AD8C',
  },
  error: {
    backgroundColor: '#C86D61',
  },
  info: {
    backgroundColor: '#333',
  },
  warning: {
    backgroundColor: '#ECC15F',
  },
  iconVariant: {
    fontSize: 16,
    marginRight: 16,
  },
  icon: {
    fontSize: 16,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const {
    classes, className, message, onClose, variant, ...other
  } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <div className={classes.iconVariant}>
            <Icon />
          </div>
          {message}
        </span>
      )}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = (props) => {
  const classes = makeStyles(styles1);

  return (
    <MySnackbarContent classes={{ ...classes }} {...props} />
  )
}

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

export default class CustomSnackbar extends Component {
  render() {
    return (
      <Snackbar
        classes={makeStyles(styles2)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.props.data.open}
        onClose={this.props.handleClose}
        autoHideDuration={this.props.data.duration || defaultAutoHideDuration}
      >
        <MySnackbarContentWrapper
          onClose={this.props.handleClose}
          variant={this.props.data.type}
          message={this.props.data.message}
        />
      </Snackbar>
    );
  }
}

Snackbar.propTypes = {
  classes: PropTypes.func.isRequired,
};
