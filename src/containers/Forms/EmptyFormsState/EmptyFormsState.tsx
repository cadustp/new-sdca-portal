import React from 'react';
import { injectIntl } from 'react-intl';
import EmptyState from '../../Reports/EmptyState';
import Button from '../../../components/Button';

import { FormsIcon } from '../../../components/shared/Icons';
import '../styles.css';

type Props = {
  intl: {
    messages: [];
    formatMessage: Function,
  };
  mainText: string,
  description: string,
};

type DispatchProps = {
  openCreationModal: Function,
};

const EmptyFormsState: React.FC<Props & DispatchProps> = ({
  intl,
  openCreationModal,
  mainText,
  description,
}) => (
  <>
    <div
      className="empty-state"
      style={{ marginTop: '100px' }}
    >
      <EmptyState
        icon={<FormsIcon />}
        descriptionText={description}
        mainText={mainText}
      />
      <Button
        variant="contained"
        onClick={openCreationModal}
      >
        {intl.messages['forms.createNewForm']}
      </Button>
    </div>
  </>
);

export default injectIntl(EmptyFormsState);
