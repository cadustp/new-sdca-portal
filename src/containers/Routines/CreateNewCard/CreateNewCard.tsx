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
  openCreateNewRoutine: Function,
};

const CreateNewCard: React.FC<Props & DispatchProps> = ({
  intl,
  openCreateNewRoutine,
}) => (
  <>
    <div
      className="routine-create-card"
      onClick={() => {
        openCreateNewRoutine();
        captureEvent('openCreateNewRoutine');
      }}
      style={{ background: light.primaryLight, border: `1px dashed ${light.primary}` }}
    >
      <AddCircleOutline
        style={{ color: light.primary }}
      />
      <span
        className="routine-create-text"
        style={{ color: light.primary }}
      >
        {intl.formatMessage({ id: 'routines.createNewRoutine' })}
      </span>
    </div>
  </>
);

export default injectIntl(CreateNewCard);
