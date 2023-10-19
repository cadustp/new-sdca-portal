import React from 'react';
import { injectIntl } from 'react-intl';

import TableGenericRow from '../../../../components/TableGenericRow';

import '../styles.css';

const titles = [
  {
    key: 'name',
    label: 'groups.groupName',
  },
  {
    key: 'members',
    label: 'groups.members',
  },
  {
    key: 'createdAt',
    label: 'groups.created',
  },
  {
    key: 'actions',
    label: 'groups.actions',
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

const TableHeader: React.FC<Props & StateProps> = ({ intl, width }) => (
  <TableGenericRow header width={width}>
    {titles.map(title => (
      <div key={title.key} className="group-column-title">
        <p>
          {(intl.messages[title.label] || '').toUpperCase()}
        </p>
      </div>
    ))}
  </TableGenericRow>
);

export default injectIntl(TableHeader);
