import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import {
  IconButton, MenuItem, Menu, Tooltip,
} from '@material-ui/core';
import { DeleteOutline, MoreVert, Update } from '@material-ui/icons';
import moment from '../../../timezones/moment';
import { captureEvent } from '../../../analytics';

import '../styles.css';

type Props = {
  intl: {
    messages: [];
    formatMessage: Function,
    locale: string,
  };
  history: { push: (route: string) => void };
};

type StateProps = {
  title: string;
  id: number;
  endAt: string;
  status: string;
  loading: boolean;
};

type DispatchProps = {
  handleDeleteModal: Function,
  handleActive: Function,
  handleEdit: Function,
};

const RoutineCard: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  history,
  handleDeleteModal,
  title,
  id,
  endAt,
  status,
  handleActive,
  handleEdit,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isActive = status === 'running';

  const handleOpen = event => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const updateRoutineStatus = event => {
    event.stopPropagation();
    event.preventDefault();
    handleActive();
  };

  const openDeleteModal = event => {
    event.stopPropagation();
    event.preventDefault();
    handleDeleteModal();
  };

  const handleClose = event => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  const RoutineMenu = () => (
    <Menu
      id={`contextual-menu-routines-${id}`}
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
        className="routine-menu-item"
        onClick={e => {
          updateRoutineStatus(e);
          captureEvent('updateRoutineStatus');
        }}
      >
        <Update fontSize="small" />
        {intl.messages[`utils.${isActive ? 'inactivate' : 'activate'}`]}
      </MenuItem>
      <MenuItem
        className="routine-menu-item"
        onClick={e => {
          openDeleteModal(e);
          captureEvent('deleteRoutine');
        }}
      >
        <DeleteOutline fontSize="small" />
        {intl.messages['utils.delete']}
      </MenuItem>
    </Menu>
  );

  const RoutineInfo = ({ intlKey, info, status = false }) => (
    <div className="routine-card-section">
      <div>
        <p className="routine-card-label">
          {intl.messages[intlKey]}
        </p>
        <p className={`routine-card-info routine-card-${status ? 'status' : ''}-${isActive ? 'active' : 'inactive'}`}>
          {info}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <div className="routine-card" onClick={() => handleEdit()}>
        <div className="routine-card-section">
          <Tooltip title={title} placement="top">
            <h3 className="routine-card-title">{title}</h3>
          </Tooltip>
          <IconButton
            className="routine-card-button"
            aria-owns={anchorEl ? `contextual-menu-routine-${id}` : undefined}
            aria-haspopup
            onClick={e => {
              handleOpen(e);
              captureEvent('routineMenu');
            }}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </div>
        <RoutineInfo
          intlKey="routines.status"
          info={intl.messages[`utils.${isActive ? 'active' : 'inactive'}`]}
          status
        />
        <RoutineInfo
          intlKey="routines.endAt"
          info={moment(endAt)
            .locale(intl.locale)
            .format('L')}
        />
      </div>
      <RoutineMenu />
    </>
  );
};

export default injectIntl(withRouter(RoutineCard));
