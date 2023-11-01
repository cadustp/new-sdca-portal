import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import moment from '../../../timezones/moment';
import { STATUSES } from '../../../assets/constants';

import {
  IconContainer,
  IconLabel,
  InfoContainer,
  HorizontalInfoContainer,
  RowTitle,
  RowInfo,
  RowInfoBold,
  AvatarContainer,
  AvatarText,
  AvatarNumber,
  TooltipText,
  WarapperIcon,
} from './styles';

import Avatar from '../../../components/Avatar';
import CalendarIcon from '../../../components/shared/Icons/CalendarIcon';
import EditReminderRow from '../../../components/shared/Icons/EditReminderRow';
import ViewReminders from '../../../components/shared/Icons/ViewReminders';
import FormattedDate from '../FormattedDate';
import NoCalendarIcon from '../../../components/shared/Icons/NoCalendarIcon';
import TableGenericRow from '../../../components/TableGenericRow';
import { captureEvent } from '../../../analytics';

const getInitials = name => {
  const nameArray = name.split(' ');
  const firstInitial = nameArray[0].charAt(0);
  const secondInitial = nameArray.length > 1 ? nameArray[1].charAt(0) : '';
  return `${firstInitial}${secondInitial}`;
};

const getUserColor = user => {
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

const isLateAccomplished = (user, reminderEndDate) => !!(user.already_valuated && moment(user.score_date).isAfter(reminderEndDate));

const getStatusMessage = (user, reminderIsLateAccomplished, messages) => {
  if (!user.status) {
    if (!user.already_valuated) return messages['reports.pending_label'];
    return reminderIsLateAccomplished
      ? messages['reports.done_delayed_label']
      : messages['reports.done_label'];
  }

  switch (user.status) {
    case STATUSES.ACCOMPLISHED.id:
      return messages['reports.done_label'];
    case STATUSES.PENDING.id:
      return messages['reports.pending_label'];
    case STATUSES.LATE.id:
      return messages['reports.delayed_label'];
    case STATUSES.CANCELED.id:
      return messages['reports.canceled_label'];
    default:
      return '';
  }
};

const getTooltipText = (user, reminderIsLateAccomplished, messages) => (
  <div>
    <TooltipText>
      {`${messages['reports.status_label']}: ${getStatusMessage(
        user,
        reminderIsLateAccomplished,
        messages
      )}`}
    </TooltipText>
    <TooltipText>{user.name}</TooltipText>
  </div>
);

const buildRowItem = (stringContent, length) => {
  if (stringContent.length > length) {
    return (
      <Tooltip
        title={<TooltipText>{stringContent}</TooltipText>}
        placement="top"
      >
        <div>
          {stringContent.substring(0, length)}
          <img
            src={require('../../../assets/icons/more-horizontal.svg')}
            alt="veja mais"
            style={{ marginLeft: '3px' }}
          />
        </div>
      </Tooltip>
    );
  }
  return stringContent;
};

const wrapAvatarList = (
  avatarList,
  reminderEndDate,
  handleOpenListModal,
  messages,
  modalTitle,
  idReminder
) => {
  const renderedList = avatarList.length <= 5 ? avatarList : avatarList.slice(0, 4);
  const avatarComponentWithTooltip = user => (
    <Tooltip
      title={getTooltipText(
        user,
        isLateAccomplished(user, reminderEndDate),
        messages
      )}
    >
      <AvatarContainer>
        <Avatar
          color={() => getUserColor(user)}
          width={30}
          height={30}
          empty={isLateAccomplished(user, reminderEndDate)}
          userName={user.name}
        >
          <AvatarText
            empty={isLateAccomplished(user, reminderEndDate)}
            color={user.already_valuated ? '#52AD8C' : '#59A1D0'}
          >
            {getInitials(user.name)}
          </AvatarText>
        </Avatar>
      </AvatarContainer>
    </Tooltip>
  );
  let clickShouldOpen = null;
  if (avatarList.length >= 5) {
    clickShouldOpen = () => {
      handleOpenListModal({
        list: avatarList,
        modalTitle,
        reminderEndDate,
        reminderId: idReminder,
      });
    };
  }

  return (
    <div style={{ cursor: clickShouldOpen ? 'pointer' : 'auto' }} onClick={clickShouldOpen}>
      {renderedList.map(user => {
        if (user.status != 2) return avatarComponentWithTooltip(user);

        return (
          <Link
            style={{ textDecoration: 'none' }}
            to={{
              pathname: `/app_users/${user.id}/answer/${idReminder}`,
              state: { idReminder },
            }}
            onClick={() => {
              captureEvent('openReport', { status: user.status ?? null });
            }}
          >
            { avatarComponentWithTooltip(user) }
          </Link>
        );
      })}
      {avatarList.length > 5 ? (
        <div
          onClick={() => handleOpenListModal({
            list: avatarList,
            modalTitle,
            reminderEndDate,
            reminderId: idReminder,
          })}
        >
          <Avatar width={30} height={30} empty color="#333333">
            <AvatarNumber>{`+${avatarList.length - 4}`}</AvatarNumber>
          </Avatar>
        </div>
      ) : null}
    </div>
  );
};

const TableRow = ({
  rowData,
  handleOpenListModal,
  intl,
  style,
  isAppUserReminderScreen,
}) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  return (
    <TableGenericRow
      style={style}
      styleInner={
        {
          cursor: 'auto',
          borderLeft: isAppUserReminderScreen && ` 4px ${getUserColor(rowData.app_users[0])} solid`,
        }
      }
    >
      <IconContainer width={8}>
        {isAppUserReminderScreen && (
          <Link
            style={{ textDecoration: 'none' }}
            to={{
              pathname: `/app_users/${localUser.id}/answer/${rowData.id}`,
              state: {
                idReminder: rowData.id,
              },
            }}
          >
            {rowData.app_users[0].status === 0
            || rowData.app_users[0].status === 1 ? (
              <WarapperIcon
                display="flex"
                d
                onClick={() => captureEvent('openReminder')}
              >

                <EditReminderRow />
                <IconLabel>
                  {intl.messages['reports.answer'].toUpperCase()}
                </IconLabel>
              </WarapperIcon>
              ) : (
                <div onClick={() => captureEvent('openAnswer')}>
                  <ViewReminders />
                  <IconLabel>
                    {intl.messages['reports.see'].toUpperCase()}
                  </IconLabel>
                </div>
              )}
          </Link>
        )}

        {!isAppUserReminderScreen
          && (rowData.active ? <CalendarIcon /> : <NoCalendarIcon />)}

        {!isAppUserReminderScreen
          && (rowData.active ? (
            <IconLabel>
              {intl.messages['reports.active_label'].toUpperCase()}
            </IconLabel>
          ) : (
            <IconLabel>
              {intl.messages['reports.inactive_label'].toUpperCase()}
            </IconLabel>
          ))}
      </IconContainer>
      <InfoContainer width={22}>
        <RowTitle>
          {buildRowItem(`${rowData.id} - ${rowData.name}`, 72)}
        </RowTitle>
      </InfoContainer>
      <InfoContainer width={21}>
        <RowInfoBold>
          {buildRowItem(rowData.form ? `${rowData.form.name}` : '', 56)}
        </RowInfoBold>
        {rowData.form ? (
          <RowInfoBold>
            {buildRowItem(
              rowData.form
                ? `${intl.messages['reports.version']}: ${rowData.form.version}`
                : '',
              56
            )}
          </RowInfoBold>
        ) : null}
        {!isAppUserReminderScreen && (
        <RowInfo>{rowData.form ? rowData.form.type.name : ''}</RowInfo>
        )}
      </InfoContainer>

      {!isAppUserReminderScreen ? (
        <HorizontalInfoContainer width={19}>
          {wrapAvatarList(
            rowData.app_users,
            rowData.end_date,
            handleOpenListModal,
            intl.messages,
            intl.messages['reports.evaluators_label'],
            rowData.id
          )}
        </HorizontalInfoContainer>
      ) : (
        <HorizontalInfoContainer width={19} style={{}}>
          <RowInfoBold>
            {rowData.app_users[0].score_date
              && `${rowData.app_users[0].score}%`}
          </RowInfoBold>
        </HorizontalInfoContainer>
      )}

      <HorizontalInfoContainer width={19}>
        {wrapAvatarList(
          rowData.valuated_users,
          rowData.end_date,
          handleOpenListModal,
          intl.messages,
          intl.messages['reports.evaluated_label']
        )}
      </HorizontalInfoContainer>
      <InfoContainer width={11}>
        <FormattedDate
          start={rowData.start_date}
          end={rowData.end_date}
          rescheduled={rowData.rescheduled}
          isAppUserReminderScreen={isAppUserReminderScreen}
          scoreDate={rowData.app_users[0].score_date}
        />
      </InfoContainer>
    </TableGenericRow>
  );
};

TableRow.propTypes = {
  rowData: PropTypes.shape({
    active: PropTypes.bool,
    title: PropTypes.string,
    form_name: PropTypes.string,
    form_type: PropTypes.string,
    date_start: PropTypes.string,
    date_end: PropTypes.string,
    rescheduled: PropTypes.bool,
    evaluators: PropTypes.arrayOf(PropTypes.object),
    evaluated: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  handleOpenListModal: PropTypes.func.isRequired,
  handleCloseListModal: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    messages: PropTypes.shape(),
  }).isRequired,
  modalStatus: PropTypes.bool.isRequired,
  isAppUserReminderScreen: PropTypes.bool,
};

export default injectIntl(TableRow);
