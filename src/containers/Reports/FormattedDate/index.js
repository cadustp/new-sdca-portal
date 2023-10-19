import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import moment from '../../../timezones/moment';

import { InfoContainer, TimeInfoContainer, TimeInfo } from './styles';

const FormattedDate = ({
  start,
  end,
  intl,
  isAppUserReminderScreen,
  scoreDate,
}) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const formattedScoreDate = moment(scoreDate).locale(intl.locale).format('L');
  const scoreFormattedHour = moment(endDate).locale(intl.locale).format('LT');

  const startFormattedDate = moment(startDate).locale(intl.locale).format('L');
  const endFormattedDate = moment(endDate).locale(intl.locale).format('L');

  const startFormattedHour = moment(startDate).locale(intl.locale).format('LTS');
  const endFormattedHour = moment(endDate).locale(intl.locale).format('LT');
  return (
    <InfoContainer>
      {!isAppUserReminderScreen && (
        <TimeInfo>{`${startFormattedDate}`}</TimeInfo>
      )}
      <TimeInfoContainer>
        <TimeInfo>
          {!isAppUserReminderScreen
            && `${startFormattedHour} ${intl.messages['reports.to']} ${endFormattedHour}`}

          {isAppUserReminderScreen
            && (!scoreDate ? (
              <>
                {`${startFormattedDate} ${intl.messages['reports.to']} ${startFormattedHour}  
                ${intl.messages['reports.thereIs']} 
                ${endFormattedDate} ${intl.messages['reports.to']} ${endFormattedHour}
                `}
              </>
            ) : (
              `${formattedScoreDate} ${intl.messages['reports.to']}  ${scoreFormattedHour}`
            ))}
        </TimeInfo>
      </TimeInfoContainer>
    </InfoContainer>
  );
};

FormattedDate.propTypes = {
  end: PropTypes.string.isRequired,
  rescheduled: PropTypes.bool,
  start: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    messages: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  }).isRequired,
  isAppUserReminderScreen: PropTypes.bool,
  scoreDate: PropTypes.string,
};

FormattedDate.defaultProps = {
  rescheduled: false,
};

export default injectIntl(FormattedDate);
