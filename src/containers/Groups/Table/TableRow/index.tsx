import React from 'react';
import { injectIntl } from 'react-intl';

import { Edit, Delete } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';

import ActionMenu from '../ActionMenu';
import TableGenericRow from '../../../../components/TableGenericRow';
import Avatar from '../../../../components/Avatar';
import { GROUP_MODAL_TYPES } from '../../../../helpers/consts';

import '../styles.css';

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
    parent: number,
    created_at: string,
    child_groups: [],
    members: []
  },
  style: any,
};

type DispatchProps = {
  handleOpenModal: () => void;
  handleEditGroup: Function,
  handleDeleteGroup: Function,
};

const TableRow: React.FC<Props & StateProps & DispatchProps> = ({
  rowData,
  handleOpenModal,
  style,
  intl,
  handleEditGroup,
  handleDeleteGroup,
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

  const setTooltipText = member => (
    <div>
      <p className="tooltip-text">{member.name}</p>
      <p style={{ fontSize: '12px' }}>{intl.messages[member.type]}</p>
    </div>
  );

  const renderAvatar = member => (
    <Tooltip
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

  const renderMembersList = (members, handleOpenModal) => {
    const list = members;
    const renderList = list.length <= 4 ? list : list.slice(0, 3);

    return (
      <div className="avatar-list">
        {renderList.map(member => renderAvatar(member))}
        {list.length > 4 ? (
          // eslint-disable-next-line
          <div onClick={() => handleOpenModal({
            list,
          })}
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

  const triggerAction = event => {
    switch (event) {
      case GROUP_MODAL_TYPES.EDIT.key:
        handleEditGroup(rowData);
        break;
      case GROUP_MODAL_TYPES.DELETE.key:
        handleDeleteGroup(rowData);
        break;
      default:
        break;
    }
  };

  return (
    <TableGenericRow
      style={style}
      styleInner={{ cursor: 'auto' }}
    >
      <div className="horizontal-container">
        <p>{rowData.name}</p>
      </div>
      <div className="group-container">
        {renderMembersList(rowData.members, handleOpenModal)}
      </div>
      <div className="centered horizontal-container">
        <p>{parseDate(rowData.created_at, intl.locale)}</p>
      </div>
      <div className="horizontal-container">
        <ActionMenu
          intl={intl}
          rowData={rowData}
          triggerAction={triggerAction}
        />
      </div>
    </TableGenericRow>
  );
};

export default injectIntl(TableRow);
