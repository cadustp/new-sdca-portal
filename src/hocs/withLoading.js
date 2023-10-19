import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

const withLoading = (Component) => {
  const WithLoading = ({ isLoading, ...props }) => (isLoading ? <Loading /> : <Component {...props} />);

  WithLoading.propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };

  return WithLoading;
};

export default withLoading;
