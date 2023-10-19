import React from 'react';
import { injectIntl } from 'react-intl';

import Tooltip from '@material-ui/core/Tooltip';
import { Checkbox } from '@material-ui/core';
import ActionMenu from '../ActionMenu';
import TableGenericRow from '../../../../components/TableGenericRow';
import Avatar from '../../../../components/Avatar';
import { STATUSES } from '../../../../assets/constants';
import '../styles.css';
import { REMINDER_MODAL_TYPES } from '../../../../helpers/consts';
import { captureEvent } from '../../../../analytics';

type Props = {
  intl: {
    messages: [],
    locale: string,
  }
};

type StateProps = {
  rowData: {
    id: number,
    name: string,
    start_date: string,
    end_date: string,
    has_auto_scheduling: boolean,
    active: boolean,
    app_users: [],
    form: {
      id: number,
      name: string,
    },
    valuated_users: [],
  },
  style: any,
};

type DispatchProps = {
  handleEditReminder: Function,
  handleOpenModal: (event) => void;
  handleSelectReminder: (rowData) => void;
  setMembersModal: (event) => void;
  selectReminders: Function,
  selectedReminders: Array<number>,
};

const TableRow: React.FC<Props & StateProps & DispatchProps> = ({
  handleEditReminder,
  handleOpenModal,
  handleSelectReminder,
  setMembersModal,
  intl,
  selectReminders,
  selectedReminders,
  style,
  rowData,
}) => {
  const parseDate = (dateString, locale) => new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(dateString));

  const getInitials = name => {
    const names = name.trim().split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const changeSelectReminders = (e, id: number) => {
    let newSelectedReminders = selectedReminders;
    if (e?.target?.checked) {
      newSelectedReminders = [...newSelectedReminders, id];
    } else {
      newSelectedReminders = newSelectedReminders.filter(reminder_id => reminder_id !== id);
    };
    selectReminders(newSelectedReminders);
  };

  const triggerActions = event => {
    if (event === REMINDER_MODAL_TYPES.EDIT.key) {
      handleEditReminder(rowData);
    } else {
      handleOpenModal(event);
      handleSelectReminder(rowData);
    }
  };

  const triggerFromCheck = (e, id) => {
    changeSelectReminders(e, id);
  };

  const setColor = user => {
    switch (user.status) {
      case STATUSES.LATE.id:
        return '#E36262';
      case STATUSES.PENDING.id:
        return '#59A1D0';
      case STATUSES.CANCELED.id:
        return '#A8B2B9';
      case undefined:
        return user.already_valuated ? '#52AD8C' : '#59A1D0';
      default:
        return '#52AD8C';
    }
  };

  const getUserStatus = user => {
    switch (user.status) {
      case STATUSES.LATE.id:
        return STATUSES.LATE.label;
      case STATUSES.PENDING.id:
        return STATUSES.PENDING.label;
      case STATUSES.CANCELED.id:
        return STATUSES.CANCELED.label;
      case undefined:
        return user.already_valuated ? '' : '';
      default:
        return STATUSES.ACCOMPLISHED.label;
    }
  };

  const isAcomplished = reminder => reminder.app_users.some(
    m => (m.status === STATUSES.ACCOMPLISHED.id),
  );

  const setTooltipText = member => (
    <div>
      <p className="tooltip-text">{member.name}</p>
      <p style={{ fontSize: '12px' }}>{intl.messages[getUserStatus(member)]}</p>
    </div>
  );

  const renderAvatar = (member, key) => (
    <Tooltip
      key={key}
      title={setTooltipText(member)}
    >
      <div className="avatar-container">
        <Avatar
          color={setColor(member)}
          width={30}
          height={30}
          empty={false}
        >
          <p className="avatar-text">
            {getInitials(member.name)}
          </p>
        </Avatar>
      </div>
    </Tooltip>
  );

  const renderMembersList = (users, modalType) => {
    const list = users;
    const renderList = list.length <= 4 ? list : list.slice(0, 3);
    return (
      <div className="avatar-list">
        {renderList.map((member, key) => renderAvatar(member, key))}
        {list.length > 4 ? (
          // eslint-disable-next-line
          <div onClick={() => {
            setMembersModal({
              modalType,
              isOpen: true,
              modalData: { list },
            });
            captureEvent('openMembersSchedule', { type: modalType });
          }}
          >
            <Avatar width={30} height={30} empty color="#333">
              <p className="avatar-text" style={{ color: '#333' }}>
                {`+${list.length - 3}`}
              </p>
            </Avatar>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <TableGenericRow
      style={style}
      styleInner={{ cursor: 'auto' }}
    >
      <Checkbox
        color="primary"
        onChange={e => {
          triggerFromCheck(e, rowData.id);
          captureEvent('selectReminder', { checked: e.target.checked });
        }}
        checked={selectedReminders?.includes(rowData.id)}
        disabled={isAcomplished(rowData)}
      />
      <div className="horizontal-row">
        <p>{rowData.name}</p>
      </div>
      <div className="horizontal-row">
        <p>{rowData?.form?.name}</p>
      </div>
      <div className="horizontal-row">
        {renderMembersList(rowData.app_users, 'app_users')}
      </div>
      <div className="horizontal-row">
        {renderMembersList(rowData.valuated_users, 'evaluateds')}
      </div>
      <div className="horizontal-row">
        <p>{intl.messages[`schedule.${rowData.has_auto_scheduling ? 'automatic' : 'manual'}`]}</p>
      </div>
      <div className="horizontal-row">
        {parseDate(rowData.start_date, intl.locale)}
        {' '}
        {intl.messages['schedule.until']}
        {' '}
        {parseDate(rowData.end_date, intl.locale)}
      </div>
      <div className="horizontal-row">
        <ActionMenu
          intl={intl}
          rowData={rowData}
          handleOpenModal={triggerActions}
        />
      </div>
    </TableGenericRow>
  );
};

export default injectIntl(TableRow);
