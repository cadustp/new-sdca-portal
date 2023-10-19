import React from 'react';
import { injectIntl } from 'react-intl';
import { Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavFixed from '../../../components/NavFixed';

import '../styles.css';

type Props = {
  intl: {
    messages: [];
  };
  isEdit: boolean,
};

type DispatchProps = {
  handleCreate: Function,
  handleCancel: Function,
  hasMissingFields: Function,
};

const NavBar: React.FC<Props & DispatchProps> = ({
  intl,
  handleCreate,
  handleCancel,
  hasMissingFields,
  isEdit,
}) => (
  <NavFixed>
    <div className="create-routine-nav">
      <Box display="flex" alignItems="center">
        <div>
          <p className="create-routine-title">{intl.messages[`routines.${isEdit ? 'edit' : 'create'}.title`]}</p>
          <p className="create-routine-subtitle">{intl.messages[`routines.${isEdit ? 'edit' : 'create'}.subtitle`]}</p>
        </div>
      </Box>
      <Box display="flex" alignItems="center" className="create-routine-buttons">
        <Button
          component={Link}
          to="/routines"
          variant="outlined"
          color="primary"
          onClick={handleCancel}
        >
          {intl.messages['utils.cancel']}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCreate()}
          disabled={hasMissingFields()}
        >
          {intl.messages['utils.save']}
        </Button>
      </Box>
    </div>
  </NavFixed>
);

export default injectIntl(NavBar);
