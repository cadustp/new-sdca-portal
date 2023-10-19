import React from 'react';
import { Button } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { Container, MessageBody } from './style';
import { Intl } from '../../helpers/types';

type Props = {
  icon: JSX.Element;
  intl: Intl;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

function CustomAlert({
  icon,
  title,
  message,
  onCancel,
  onConfirm,
  intl,
}: Props): JSX.Element {
  return (
    <Container>
      <MessageBody>
        <div className="icon">{icon}</div>
        <div className="title">{title}</div>
        <div className="message">
          <span>{message}</span>
        </div>
      </MessageBody>
      <footer>
        <Button variant="outlined" color="primary" onClick={onCancel}>
          {intl.formatMessage({ id: 'custon_alert.cancel' })}
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          {intl.formatMessage({ id: 'custon_alert.confirm' })}
        </Button>
      </footer>
    </Container>
  );
}

export default injectIntl(CustomAlert);
