import React from 'react';
import { injectIntl } from 'react-intl';
import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import NavFixed from '../NavFixed';

import './styles.css';
import { captureEvent } from '../../analytics';

type Props = {
  intl: {
    messages: [];
  };
  title: string,
  subtitle: string,
  cancelRedirect: string,
};

type DispatchProps = {
  handleSave: Function,
  handleCancel: Function,
  hasMissingFields: Function,
};

const ActionHeader: React.FC<Props & DispatchProps> = ({
  intl,
  title,
  subtitle,
  handleSave,
  handleCancel,
  hasMissingFields,
  cancelRedirect,
}) => (
  <NavFixed>
    <div className="action-header-nav">
      <Box display="flex" alignItems="center">
        <div>
          <p className="action-header-title">{title}</p>
          <p className="action-header-subtitle">{subtitle}</p>
        </div>
      </Box>
      <Box display="flex" alignItems="center" className="action-header-buttons">
        <Button
          component={Link}
          to={cancelRedirect}
          variant="outlined"
          color="primary"
          onClick={() => {
            handleCancel();
            captureEvent('cancelEditCompany');
          }}
        >
          {intl.messages['utils.cancel']}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSave()}
          disabled={hasMissingFields()}
        >
          {intl.messages['utils.save']}
        </Button>
      </Box>
    </div>
  </NavFixed>
);

export default injectIntl(ActionHeader);
