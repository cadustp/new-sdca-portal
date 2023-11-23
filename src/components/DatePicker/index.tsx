import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import EventIcon from '@mui/icons-material/Event';
import moment from '../../timezones/moment';
// import { OPEN_DOWN } from 'react-dates/constants';
// import 'react-dates/initialize';
// import CalendarIcon from '../shared/Icons/CalendarIcon';

import { StyledDateRangePickerContainer, StyledTitle } from './styles';

type StateProps = {
  title: string | null;
  error: any;
  isDisabled?: boolean;
}

const MyDatePicker: React.FC<StateProps> = ({
  // intl,
  title,
  // selectedStartDate,
  // selectedEndDate,
  // daySize,
  // startDatePlaceholder,
  // endDatePlaceholder,
  // onChange,
  // openDirection,
  // isOutsideRange,
  error,
  // keepOpenOnDateSelect,
  // onClose, 
  isDisabled,
}) => {
  // const titleComponent = title ? (
  //   <StyledTitle error={error}>{title}</StyledTitle>
  // ) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['SingleInputDateRangeField']}>
        <DateRangePicker
          slots={{ field: SingleInputDateRangeField }}
          slotProps={{ textField: { InputProps: { endAdornment: <EventIcon /> } } }}
          calendars={1}
          disabled={isDisabled}
        />
      </DemoContainer>
    </LocalizationProvider>
    // <StyledDateRangePickerContainer error={error}>
    //   {titleComponent}
    //   <DateRangePicker
    //     minimumNights={0}
    //     startDate={selectedStartDate}
    //     startDateId="startDate"
    //     startDatePlaceholderText={
    //       startDatePlaceholder
    //       || intl.messages['date_picker.date_placeholder']
    //     }
    //     endDate={selectedEndDate}
    //     endDateId="endDate"
    //     endDatePlaceholderText={
    //       endDatePlaceholder || intl.messages['date_picker.date_placeholder']
    //     }
    //     onDatesChange={({ startDate, endDate }) => onChange(startDate, endDate)}
    //     focusedInput={focusedInput}
    //     keepOpenOnDateSelect={keepOpenOnDateSelect}
    //     onFocusChange={newFocusedInput => this.setState({ focusedInput: newFocusedInput })}
    //     numberOfMonths={1}
    //     customArrowIcon={<p className="Separator">-</p>}
    //     showDefaultInputIcon
    //     customInputIcon={<CalendarIcon />}
    //     inputIconPosition="after"
    //     displayFormat={() => moment.localeData(intl.locale).longDateFormat('L')}
    //     renderMonthElement={({ month }) => moment(month)
    //       .locale(intl.locale)
    //       .format('MMMM YYYY')}
    //     hideKeyboardShortcutsPanel
    //     isOutsideRange={() => isOutsideRange}
    //     verticalSpacing={10}
    //     daySize={daySize}
    //     openDirection={openDirection}
    //     onClose={onClose}
    //   />
    // </StyledDateRangePickerContainer>
  );
}

MyDatePicker.propTypes = {
  // title: PropTypes.string,
  // startDatePlaceholder: PropTypes.string,
  // endDatePlaceholder: PropTypes.string,
  // daySize: PropTypes.number,
  // selectedStartDate: PropTypes.shape({}).isRequired,
  // selectedEndDate: PropTypes.shape({}).isRequired,
  // onChange: PropTypes.func.isRequired,
  // intl: PropTypes.shape({
  //   messages: PropTypes.object.isRequired,
  //   locale: PropTypes.string.isRequired,
  // }).isRequired,
  // openDirection: PropTypes.string,
  // error: PropTypes.bool,
  // isOutsideRange: PropTypes.bool,
  // keepOpenOnDateSelect: PropTypes.bool,
  // onClose: PropTypes.func,
  // isDisabled: PropTypes.bool,
};

MyDatePicker.defaultProps = {
  // title: null,
  // daySize: 32,
  // startDatePlaceholder: null,
  // endDatePlaceholder: null,
  // // openDirection: OPEN_DOWN,
  // error: false,
  // isOutsideRange: false,
  // keepOpenOnDateSelect: true,
  // onClose: null,
  // isDisabled: false,
};

export default injectIntl(MyDatePicker);
