import React, { Fragment } from 'react';
import Divider from '@mui/material/Divider';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import moment from '../../../timezones/moment';
import { STATUSES } from '../../../assets/constants';

import {
  ItemContainer,
  AvatarContainer,
  InfoContainer,
  NameText,
  StatusText,
  AvatarText,
} from './styles';

import Avatar from '../../../components/Avatar';

const getInitials = name => {
  const nameArray = name.split(' ');
  const firstInitial = nameArray[0].charAt(0);
  const secondInitial = nameArray.length > 1 ? nameArray[1].charAt(0) : '';
  return `${firstInitial}${secondInitial}`;
};

const getAvatarColor = user => {
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
  if (!user.status && user.already_valuated) {
    return reminderIsLateAccomplished
      ? messages['reports.done_delayed_label']
      : messages['reports.done_label'];
  }

  if (!user.status && !user.already_valuated) {
    return messages['reports.pending_label'];
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

const AvatarList = ({
  data, reminderEndDate, reminderId, intl,
}) => {
  const renderItemContainer = user => (
    <ItemContainer>
      <AvatarContainer>
        <Avatar
          color={() => getAvatarColor(user)}
          width={30}
          height={30}
          empty={isLateAccomplished(user, reminderEndDate)}
          userName={user.name}
        >
          <AvatarText
            empty={isLateAccomplished(user, reminderEndDate)}
            color={() => getAvatarColor(user)}
          >
            {getInitials(user.name)}
          </AvatarText>
        </Avatar>
      </AvatarContainer>
      <InfoContainer>
        <NameText>{user.name}</NameText>
        <StatusText>
          {getStatusMessage(
            user,
            isLateAccomplished(user, reminderEndDate),
            intl.messages
          )}
        </StatusText>
      </InfoContainer>
    </ItemContainer>
  );

  return (
    data.map((user, index) => (
      <>
        { user.status === 2
            && (
            <Link style={{ textDecoration: 'none' }} to={{ pathname: `/app_users/${user.id}/answer/${reminderId}`, state: { idReminder: reminderId } }}>
              { renderItemContainer(user) }
            </Link>
            )}
        { user.status !== 2 && renderItemContainer(user) }
        { index < data.length - 1 ? <Divider /> : null }
      </>
    ))
  );
};

export default injectIntl(AvatarList);
