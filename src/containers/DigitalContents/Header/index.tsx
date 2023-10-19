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

type StateProps = {
};

type DispatchProps = {
  openCreateModal: Function,
};

const Header: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  openCreateModal,
}) => (
  <div className="header">
    <p className="page-title">{intl.messages['contents.title']}</p>
    <div className="buttons">
      <Button
        variant="contained"
        onClick={() => {
          openCreateModal();
          captureEvent('openCreateContents');
        }}
      >
        {intl.messages['contents.create']}
      </Button>
    </div>
  </div>
);

export default injectIntl(Header);
