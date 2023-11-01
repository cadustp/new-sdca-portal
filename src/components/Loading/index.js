import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'mui-styles';
import CircularProgress from '@mui/material/CircularProgress';
import './styles.css';
import { light } from '../../styles/palette';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    color: light.primary,
  },
});

export const circularProgressSize = {
  large: 'large',
  small: 'small',
};

function Loading(props) {
  const {
    classes, title, message, secondMessage, size,
  } = props;

  const showTitle = title.length !== 0 && title !== null;
  const showMessage = title.length !== 0 && title !== null;
  const showSecondMessage = title.length !== 0 && title !== null;
  let progressSize = 40;

  switch (size) {
    case circularProgressSize.large:
      progressSize = 60;
      break;
    case circularProgressSize.small:
      progressSize = 20;
      break;
    default:
      progressSize = 40;
  }

  return (
    <div className="circular-progress">
      <CircularProgress className={classes.progress} size={progressSize} />
      {showTitle ? <b>{title}</b> : null}
      {showMessage ? <p>{message}</p> : null}
      {showSecondMessage ? <p>{secondMessage}</p> : null}
    </div>
  );
}

Loading.propTypes = {
  classes: PropTypes.shape({ progress: PropTypes.string }).isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  secondMessage: PropTypes.string,
  size: PropTypes.oneOf(Object.values(circularProgressSize)),
};

Loading.defaultProps = {
  title: '',
  message: '',
  secondMessage: '',
  size: '',
};

const StyledLoading = (props) => {
  const classes = makeStyles(styles)();
  const newProps = { ...props, classes }

  return (
    <Loading { ...newProps } />
  )
}

export default StyledLoading;
