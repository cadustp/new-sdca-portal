import React from 'react';
import { injectIntl } from 'react-intl';

import { Checkbox } from '@material-ui/core/';
import TableGenericRow from '../../../../components/TableGenericRow';

import '../styles.css';
import { captureEvent } from '../../../../analytics';

const titles = [
  {
    key: 'register',
    label: 'evaluateds.register',
  },
  {
    key: 'name',
    label: 'evaluateds.name',
  },
  {
    key: 'email',
    label: 'evaluateds.email',
  },
  {
    key: 'group',
    label: 'evaluateds.group',
  },
  {
    key: 'actions',
    label: 'evaluateds.actions',
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
  handleSelectAllEvaluateds: Function;
};

const TableHeader: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  width,
  handleSelectAllEvaluateds,
}) => (
  <TableGenericRow header width={width}>
    <Checkbox
      color="primary"
      onChange={e => {
        handleSelectAllEvaluateds(e.target.checked);
        captureEvent('checkAllEvaluateds', { checked: e.target.checked });
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
