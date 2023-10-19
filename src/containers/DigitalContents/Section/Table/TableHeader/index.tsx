import React from 'react';
import { injectIntl } from 'react-intl';

import TableGenericRow from '../../../../../components/TableGenericRow';

import '../styles.css';

const titles = [
  {
    key: 'name',
    label: 'contents.name',
  },
  {
    key: 'description',
    label: 'contents.description',
  },
  {
    key: 'users',
    label: 'contents.users',
  },
  {
    key: 'updated',
    label: 'contents.updated',
  },
  {
    key: 'actions',
    label: 'contents.actions',
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
      <div key={title.key} className="dc-column-title">
        <p>
          {(intl.messages[title.label] || '').toUpperCase()}
        </p>
      </div>
    ))}
  </TableGenericRow>
);

export default injectIntl(TableHeader);
