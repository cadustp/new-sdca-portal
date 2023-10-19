import React from 'react';
import PropTypes from 'prop-types';
import FailureState from '../containers/FailureState';

const withFailure = (Component) => {
  const WithFailure = ({ failure, ...props }) => (failure ? <FailureState /> : <Component {...props} />);

  WithFailure.propTypes = {
    failure: PropTypes.bool.isRequired,
  };

  return WithFailure;
};

export default withFailure;
