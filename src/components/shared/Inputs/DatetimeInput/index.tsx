import React from 'react';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {
  CalendarTodayOutlined,
} from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

import { REMINDER_MINIMAL_DATE } from 'src/helpers/consts';

const Field = ({
  children,
  title,
}) => (
  <div className="reminder-field-container">
    <p style={{ display: 'flex', alignItems: 'center' }}>
      {title}
    </p>
    <div className="reminder-field-input">
      {children}
    </div>
  </div>
);

type Props = {
  title: string,
  placeholder: string,
  date: any,
  setDate: any,
  minDate?: Date,
  intl: {
    messages: [];
    locale: string;
  };
};

const DatetimeInput: React.FC<Props> = ({
  title,
  intl,
  placeholder,
  date,
  setDate,
  minDate,
}) => (
  <Field
    title={title}
  >
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DateTimePicker
        placeholder={placeholder}
        minDate={minDate ?? REMINDER_MINIMAL_DATE}
        minDateMessage={intl.messages['datepicker.minDateMessage']}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <CalendarTodayOutlined />
              </IconButton>
            </InputAdornment>
          ),
        }}
        ampm={false}
        value={date}
        format={intl.locale === 'en' ? 'MM/DD/YYYY, HH:mm' : 'DD/MM/YYYY, HH:mm'}
        onChange={setDate}
        fullWidth
      />
    </MuiPickersUtilsProvider>
  </Field>
);

export default DatetimeInput;
