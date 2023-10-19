import React from 'react';
import { injectIntl } from 'react-intl';
import { Divider } from '@mui/material';
import CustomModal from '../CustomModal';
import Avatar from '../Avatar';
import { GroupMembers } from '../../redux/groups/types';
import { STATUSES } from '../../assets/constants';

import './styles.css';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  open: boolean,
  title: string,
  members: Array<GroupMembers>,
};

type DispatchProps = {
  onClose: () => void;
};

const MembersModal: React.FC<Props & StateProps & DispatchProps> = ({
  title,
  open,
  onClose,
  members,
  intl,
}) => {
  const getInitials = name => {
    const names = name.trim().split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const getTypeColor = member => {
    switch (member.type) {
      case 'sub_admin':
        return '#E36262';
      case 'master':
        return '#59A1D0';
      case 'app_user':
        return '#7540EE';
      case 'company_employee':
        return '#52AD8C';
      default:
        return 'grey';
    }
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

  const setColor = member => {
    if (member.status !== undefined || member.already_valuated !== undefined) {
      return getUserColor(member);
    }
    return getTypeColor(member);
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

  const renderMember = member => (
    <div className="member-container">
      <div className="avatar">
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
      <div className="info-container">
        <p>{member.name}</p>
        <p style={{ fontSize: '10px' }}>
          {intl.messages[member.type] || intl.messages[getUserStatus(member)]}
        </p>
      </div>
    </div>
  );

  const AvatarList = members => (
    members.map((member, index) => (
      <div>
        {renderMember(member)}
        {index < members.length - 1
          ? <Divider />
          : null}
      </div>
    ))
  );

  return (
    <CustomModal
      title={title}
      open={open}
      onClose={onClose}
    >
      <div className="avatar-list-container">
        <Divider />
        {AvatarList(members)}
      </div>
    </CustomModal>
  );
};

export default injectIntl(MembersModal);
