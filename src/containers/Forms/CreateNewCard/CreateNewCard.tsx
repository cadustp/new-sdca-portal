import React from 'react';
import { injectIntl } from 'react-intl';
import { AddCircleOutline } from '@material-ui/icons/';
import { light } from '../../../styles/palette';
import { captureEvent } from '../../../analytics';

import '../styles.css';

type Props = {
  intl: {
    messages: [];
    formatMessage: Function,
  };
};

type DispatchProps = {
  openCreationModal: Function,
};

const CreateNewCard: React.FC<Props & DispatchProps> = ({
  intl,
  openCreationModal,
}) => (
  <>
    <div
      className="form-create-card"
      onClick={() => {
        openCreationModal();
        captureEvent('openCreateNewForm');
      }}
      style={{ background: light.primaryLight, border: `1px dashed ${light.primary}` }}
    >
      <AddCircleOutline
        style={{ color: light.primary }}
      />
      <span
        className="form-create-text"
        style={{ color: light.primary }}
      >
        {intl.formatMessage({ id: 'forms.createNewForm' })}
      </span>
    </div>
  </>
);

export default injectIntl(CreateNewCard);
