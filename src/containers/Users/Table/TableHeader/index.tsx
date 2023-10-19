import React from 'react';
import { injectIntl } from 'react-intl';

import { Checkbox } from '@mui/material/';
import TableGenericRow from '../../../../components/TableGenericRow';

import '../styles.css';
import { captureEvent } from '../../../../analytics';

const titles = [
  {
    key: 'id',
    label: 'users.id',
  },
  {
    key: 'name',
    label: 'users.name',
  },
  {
    key: 'email',
    label: 'users.email',
  },
  {
    key: 'group',
    label: 'users.group',
  },
  {
    key: 'userType',
    label: 'users.userType',
  },
  {
    key: 'actions',
    label: 'users.actions',
  },
];

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  width: number,
};

type DispatchProps = {
  handleSelectAllUsers: Function;
};

const TableHeader: React.FC<Props & StateProps & DispatchProps> = ({ intl, width, handleSelectAllUsers }) => (
  <TableGenericRow header width={width}>
    <Checkbox
      color="primary"
      onChange={e => {
        handleSelectAllUsers(e.target.checked);
        captureEvent('checkAllUsers', { checked: e.target.checked });
      }}
    />
    {titles.map(title => (
      <div key={title.key} className="column-title">
        <p>
          {(intl.messages[title.label] || '').toUpperCase()}
        </p>
      </div>
    ))}
  </TableGenericRow>
);

export default injectIntl(TableHeader);
