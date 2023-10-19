import React from 'react';
import { injectIntl } from 'react-intl';
import { captureEvent } from '../../../analytics';
import Button from '../../../components/Button';

import '../styles.css';

type Props = {
  intl: {
    messages: [];
  };
};

type DispatchProps = {
  handleSearchRequest: Function,
  openCreateModal: Function,
};

const Header: React.FC<Props & DispatchProps> = ({
  intl,
  openCreateModal,
}) => (
  <div className="gp-header">
    <p id="page-title">{intl.messages['groups.title']}</p>
    <div className="buttons">
      <Button
        variant="contained"
        onClick={() => {
          openCreateModal();
          captureEvent('openCreate');
        }}
      >
        {intl.messages['groups.create']}
      </Button>
    </div>
  </div>
);

export default injectIntl(Header);
