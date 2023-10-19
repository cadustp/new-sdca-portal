import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { captureEvent, captureNavigation } from '../../../analytics';
import Button from '../../../components/Button';
import useFormatDateHeader from '../../../hooks/useFormatDateHeader';
import '../styles.css';

type Props = {
  intl: {
    messages: [];
    formatMessage: Function;
    locale: string,
  };
  onNewSchedule: Function;
};

type StateProps = {
  startDate: any,
  endDate: any,
};

type DispatchProps = {
  handleSearchRequest: Function,
};

const Header: React.FC<Props & StateProps & DispatchProps> = ({
  endDate,
  intl,
  onNewSchedule,
  startDate,
}) => {
  const [title, setTitle] = useState(intl.messages['schedule.title']);
  const headerTitle = useFormatDateHeader({
    intl,
    startDate,
    endDate,
    textId: 'schedule.title',
  });

  useEffect(() => {
    setTitle(headerTitle);
  }, [startDate, endDate]);

  const handleClick = () => {
    captureNavigation('/admin/schedule/new');
    onNewSchedule();
  };

  return (
    <div className="sc-header">
      <p id="page-title">{title}</p>
      <div className="buttons">
        <Button
          variant="contained"
          onClick={handleClick}
        >
          {intl.messages['schedule.create']}
        </Button>
      </div>
    </div>
  );
};

export default injectIntl(Header);
