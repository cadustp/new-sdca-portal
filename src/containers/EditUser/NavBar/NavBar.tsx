import React from 'react';
import { injectIntl } from 'react-intl';
import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import NavFixed from '../../../components/NavFixed';

import '../styles.css';

type Props = {
  intl: {
    messages: [];
  };
};

type DispatchProps = {
  handleCreate: Function,
  handleCancel: Function,
  hasMissingFields: Function,
};

type StateProps = {
};

const NavBar: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  handleCreate,
  handleCancel,
  hasMissingFields,
}) => (
  <NavFixed>
    <div className="edit-user-nav">
      <Box display="flex" alignItems="center">
        <div>
          <p className="edit-user-title">{intl.messages['users.edit.title']}</p>
          <p className="edit-user-subtitle">{intl.messages['users.edit.subtitle']}</p>
        </div>
      </Box>
      <Box display="flex" alignItems="center" className="edit-user-buttons">
        <Button
          component={Link}
          to="/admin/users"
          variant="outlined"
          color="primary"
          onClick={handleCancel}
        >
          {intl.messages['users.edit.cancel']}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCreate()}
          disabled={hasMissingFields()}
        >
          {intl.messages['users.edit.save']}
        </Button>
      </Box>
    </div>
  </NavFixed>
);

export default injectIntl(NavBar);
