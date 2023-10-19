import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import CustomCheckBox from './CustomCheckBox';
import TableGenericRow from '../../../../components/TableGenericRow';
import {
  Reminders,
} from '../../../../redux/schedule/types';
import { STATUSES } from '../../../../assets/constants';
import '../styles.css';
import { captureEvent } from '../../../../analytics';

const titles = [
  {
    key: 'name',
    label: 'schedule.remindName',
  },
  {
    key: 'form',
    label: 'schedule.formName',
  },
  {
    key: 'app_users',
    label: 'schedule.app_users',
  },
  {
    key: 'evaluateds',
    label: 'schedule.evaluateds',
  },
  {
    key: 'booking',
    label: 'schedule.booking',
  },
  {
    key: 'interval',
    label: 'schedule.interval',
  },
  {
    key: 'actions',
    label: '',
  },
];

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  width: number,
  selectReminders: Function,
  reminders: {
    data: Array<Reminders>,
    pagination: {
      total: number,
      links: [],
    }
  },
  unselectAllReminders: Function,
  selectedReminders: Array<number>,
};

const TableHeader: React.FC<Props & StateProps> = ({
  intl,
  width,
  reminders,
  selectReminders,
  unselectAllReminders,
  selectedReminders,
}) => {
  const [checked, setChecked] = useState(false);

  const selectAllReminders = () => selectReminders(
    reminders.data.filter(r => !r.app_users.some(
      m => m.status === STATUSES.ACCOMPLISHED.id,
    )).map(r => r.id),
  );
  const triggerActions = () => (checked ? selectAllReminders() : unselectAllReminders());

  useEffect(() => {
    triggerActions();
  }, [checked]);

  useEffect(() => {
    if (!selectedReminders.length) {
      setChecked(false);
    }
  }, [selectedReminders]);

  return (
    <TableGenericRow header width={width}>
      <CustomCheckBox
        onChange={e => {
          setChecked(e?.target?.checked);
          captureEvent('checkAllReminders', { checked: e.target.checked });
        }}
        checked={checked}
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
};

export default injectIntl(TableHeader);
