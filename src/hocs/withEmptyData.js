import React from 'react';
import PropTypes from 'prop-types';
import EmptyData from '../components/EmptyData';

const withEmptyData = Component => {
  const WithEmptyData = ({ isEmpty, customMessage, ...props }) =>
    isEmpty ? (
      <EmptyData customMessage={customMessage} />
    ) : (
      <Component {...props} />
    );

  WithEmptyData.propTypes = {
    isEmpty: PropTypes.bool.isRequired,
  };

  return WithEmptyData;
};

export default withEmptyData;
