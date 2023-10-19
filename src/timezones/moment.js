import moment from 'moment-timezone';

const userTimeZone = Intl.DateTimeFormat()
  .resolvedOptions().timeZone;

moment.tz.setDefault(userTimeZone);

export default moment;
