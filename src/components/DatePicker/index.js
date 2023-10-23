import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
// import { OPEN_DOWN } from 'react-dates/constants';
// import { DateRangePicker } from 'react-dates';
import moment from '../../timezones/moment';
// import 'react-dates/initialize';
// import CalendarIcon from '../shared/Icons/CalendarIcon';

import { StyledDateRangePickerContainer, StyledTitle } from './styles';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
    };
  }

  render() {
    const {
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
      // onClose, isDisabled,
    } = this.props;
    // const { focusedInput } = this.state;

    const titleComponent = title ? (
      <StyledTitle error={error}>{title}</StyledTitle>
    ) : null;
    return (
      <StyledDateRangePickerContainer error={error}>
        {titleComponent}
        <h1>Tem um date range aqui</h1>
        {/* <DateRangePicker
          disabled={isDisabled}
          minimumNights={0}
          startDate={selectedStartDate}
          startDateId="startDate"
          startDatePlaceholderText={
            startDatePlaceholder
            || intl.messages['date_picker.date_placeholder']
          }
          endDate={selectedEndDate}
          endDateId="endDate"
          endDatePlaceholderText={
            endDatePlaceholder || intl.messages['date_picker.date_placeholder']
          }
          onDatesChange={({ startDate, endDate }) => onChange(startDate, endDate)}
          focusedInput={focusedInput}
          keepOpenOnDateSelect={keepOpenOnDateSelect}
          onFocusChange={newFocusedInput => this.setState({ focusedInput: newFocusedInput })}
          numberOfMonths={1}
          customArrowIcon={<p className="Separator">-</p>}
          showDefaultInputIcon
          customInputIcon={<CalendarIcon />}
          inputIconPosition="after"
          displayFormat={() => moment.localeData(intl.locale).longDateFormat('L')}
          renderMonthElement={({ month }) => moment(month)
            .locale(intl.locale)
            .format('MMMM YYYY')}
          hideKeyboardShortcutsPanel
          isOutsideRange={() => isOutsideRange}
          verticalSpacing={10}
          daySize={daySize}
          openDirection={openDirection}
          onClose={onClose}
        /> */}
      </StyledDateRangePickerContainer>
    );
  }
}

DatePicker.propTypes = {
  title: PropTypes.string,
  startDatePlaceholder: PropTypes.string,
  endDatePlaceholder: PropTypes.string,
  daySize: PropTypes.number,
  selectedStartDate: PropTypes.instanceOf(moment).isRequired,
  selectedEndDate: PropTypes.instanceOf(moment).isRequired,
  onChange: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    messages: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  }).isRequired,
  openDirection: PropTypes.string,
  error: PropTypes.bool,
  isOutsideRange: PropTypes.bool,
  keepOpenOnDateSelect: PropTypes.bool,
  onClose: PropTypes.func,
  isDisabled: PropTypes.bool,
};

DatePicker.defaultProps = {
  title: null,
  daySize: 32,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  // openDirection: OPEN_DOWN,
  error: false,
  isOutsideRange: false,
  keepOpenOnDateSelect: true,
  onClose: null,
  isDisabled: false,
};

export default injectIntl(DatePicker);
