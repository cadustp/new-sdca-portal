import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';

import { EmptyDataChartIcon } from '../shared/Icons';
import './styles.css';

let errorMessage = '';
let titleErrorMessage = '';

function translate(intl) {
  titleErrorMessage = intl.formatMessage({
    id: 'flat_tree.noResultsFound',
    defaultMessage: 'Nenhum resultado encontrado',
  });
  errorMessage = intl.formatMessage({
    id: 'flat_tree.noResultsFoundSubtitle',
    defaultMessage: 'Tente ajustar sua busca ou filtro para encontrar o que você está procurando.',
  });

  defineMessages({
    titleErrorMessage: {
      id: 'flat_tree.noResultsFound',
      defaultMessage: 'Nenhum resultado encontrado',
    },
    errorMessage: {
      id: 'flat_tree.noResultsFoundSubtitle',
      defaultMessage: 'Tente ajustar sua busca ou filtro para encontrar o que você está procurando.',
    },
  });
}

function EmptyData({ intl, customMessage }) {
  translate(intl);
  return (
    <div className="empty-data">
      <div>
        <EmptyDataChartIcon />
      </div>
      <p className="title">{customMessage?.title || titleErrorMessage}</p>
      <p className="description">
        {customMessage?.description || errorMessage}
      </p>
    </div>
  );
}

EmptyData.propTypes = {
  intl: PropTypes.instanceOf(Object).isRequired,
  customMessage: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

EmptyData.defaultProps = {
  customMessage: {},
};

export default injectIntl(EmptyData);
