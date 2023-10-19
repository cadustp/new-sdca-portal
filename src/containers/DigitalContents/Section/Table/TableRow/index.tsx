import React from 'react';
import { injectIntl } from 'react-intl';
import Tooltip from '@mui/material/Tooltip';
import TableGenericRow from '../../../../../components/TableGenericRow';
import { CONTENTS_MODAL_TYPES } from '../../../../../helpers/consts';
import Avatar from '../../../../../components/Avatar';

import ActionMenu from '../ActionMenu';
import '../styles.css';
import { captureEvent } from '../../../../../analytics';

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
    description: string,
    type: string,
    url: string,
    users: [],
    updated: string,
  },
  style: any,
};

type DispatchProps = {
  openUsersModal: Function;
  handleDeleteContent: Function;
  handleEditContent: Function;
};

const TableRow: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  handleDeleteContent,
  handleEditContent,
  openUsersModal,
  style,
  rowData,
}) => {
  const handleFile = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.pdf`);
    link.setAttribute('target', '_blank');
    link.click();
  };

  const handleOpenContent = content => {
    handleFile(content.url, content.name);
  };

  const triggerAction = event => {
    switch (event) {
      case CONTENTS_MODAL_TYPES.ACCESS.key:
        handleOpenContent(rowData);
        break;
      case CONTENTS_MODAL_TYPES.EDIT.key:
        handleEditContent(rowData);
        break;
      case CONTENTS_MODAL_TYPES.DELETE.key:
        handleDeleteContent(rowData);
        break;
      default:
        break;
    }
  };

  const setTooltipText = member => (
    <div>
      <p className="tooltip-text">{member.name}</p>
      <p style={{ fontSize: '12px' }}>{intl.messages[member.type]}</p>
    </div>
  );

  const setColor = member => {
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

  const getInitials = name => {
    const names = name.trim().split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const parseDate = (dateString, locale) => new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(dateString));

  const renderAvatar = user => (
    <Tooltip
      title={setTooltipText(user)}
    >
      <div className="avatar-container">
        <Avatar
          color={setColor(user)}
          width={30}
          height={30}
          empty={false}
        >
          <p className="avatar-text">
            {getInitials(user.name)}
          </p>
        </Avatar>
      </div>
    </Tooltip>
  );

  const renderUsersList = users => {
    const list = users;
    const renderList = list.length <= 4 ? list : list.slice(0, 3);

    return (
      <div className="avatar-list">
        {renderList.map(user => renderAvatar(user))}
        {list.length > 4 ? (
          // eslint-disable-next-line
          <div onClick={() => {
            openUsersModal({
              list,
            });
            captureEvent('openUsers');
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
      <div className="strong h-container">
        <p>{rowData.name}</p>
      </div>
      <div className="h-container">
        <p>{rowData.description}</p>
      </div>
      <div className="users-container">
        <p>{renderUsersList(rowData.users)}</p>
      </div>
      <div className="centered h-container">
        <p>{parseDate(rowData.updated, intl.locale)}</p>
      </div>
      <div className="h-container">
        <ActionMenu
          intl={intl}
          triggerAction={triggerAction}
        />
      </div>
    </TableGenericRow>
  );
};

export default injectIntl(TableRow);
