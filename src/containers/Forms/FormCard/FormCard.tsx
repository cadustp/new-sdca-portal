import React, { useState } from 'react';
import { withRouter } from '../../../helpers/withRouter'; 
import { injectIntl } from 'react-intl';
import {
  IconButton, MenuItem, Menu, Tooltip,
} from '@mui/material';
import { DeleteOutline, MoreVert, FileCopy } from '@mui/icons-material';
import moment from '../../../timezones/moment';
import { captureEvent } from '../../../analytics';

import '../styles.css';
import { useNavigate } from 'react-router';

type Props = {
  intl: {
    messages: [];
    formatMessage: Function,
    locale: string,
  };
};

type StateProps = {
  title: string;
  id: number;
  date: string;
  version: string;
  loading: boolean;
};

type DispatchProps = {
  handleDeleteModal: Function,
  duplicateForm: Function;
};

const FormCard: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  handleDeleteModal,
  title,
  id,
  date,
  version,
  duplicateForm,
}) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = event => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const openDeleteModal = event => {
    event.stopPropagation();
    event.preventDefault();
    handleDeleteModal();
  };

  const handleDuplicate = event => {
    event.stopPropagation();
    event.preventDefault();
    duplicateForm({ formId: id });
  };

  const handleClose = event => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  const redirectToForm = () => {
    captureEvent('openEditForm');
    navigate(`/forms/${id}`);
  };

  const FormMenu = () => (
    <Menu
      id={`contextual-menu-forms-${id}`}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={e => handleClose(e)}
      PaperProps={{
        style: {
          padding: 0,
          transform: 'translate(10%, 50%)',
        },
      }}
      MenuListProps={{
        style: {
          padding: 0,
        },
      }}
    >
      <MenuItem
        className="form-menu-item"
        onClick={e => {
          handleDuplicate(e);
          captureEvent('cloneForm');
        }}
      >
        <FileCopy fontSize="small" />
        {intl.formatMessage({ id: 'forms.clone' })}
      </MenuItem>
      <MenuItem
        className="form-menu-item"
        onClick={e => {
          openDeleteModal(e);
          captureEvent('deleteForm');
        }}
      >
        <DeleteOutline fontSize="small" />
        {intl.formatMessage({ id: 'forms.delete' })}
      </MenuItem>
    </Menu>
  );

  const FormInfo = ({ intlKey, info }) => (
    <div className="form-card-section">
      <div>
        <p className="form-card-label">
          {intl.formatMessage({ id: intlKey })}
        </p>
        <p className="form-card-info">
          {info}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <div className="form-card" onClick={redirectToForm}>
        <div className="form-card-section">
          <Tooltip title={title} placement="top">
            <h3 className="form-card-title">{title}</h3>
          </Tooltip>
          <IconButton
            className="form-card-button"
            aria-owns={anchorEl ? `contextual-menu-forms-${id}` : undefined}
            aria-haspopup
            onClick={e => {
              handleOpen(e);
              captureEvent('formMenu');
            }}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </div>
        <FormInfo
          intlKey="forms.version"
          info={version}
        />
        <FormInfo
          intlKey="forms.createdAt"
          info={moment(date)
            .locale(intl.locale)
            .format('L')}
        />
      </div>
      <FormMenu />
    </>
  );
};

export default injectIntl(withRouter(FormCard));
