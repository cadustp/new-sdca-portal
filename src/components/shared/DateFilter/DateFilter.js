import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import moment from '../../../timezones/moment';
import DatePicker from '../../DatePicker';
import 'moment/locale/pt-br';
import 'moment/locale/es';
import 'moment/locale/en-gb';
import { DateFilterStyled } from './styles';

class DateFilter extends React.Component {
  constructor(props) {
    super(props);
    const { intl } = this.props;
    moment.locale(intl.locale);

    const { startDate, endDate } = this.getInitialDateValues();
    this.state = {
      anchorEl: false,
      startDate,
      endDate,
    };
  }

  getInitialDateValues() {
    const {
      daysOffset, startDate, endDate, notObrigatoryFilter,
    } = this.props;
    return {
      startDate: notObrigatoryFilter
        ? startDate
        : startDate
          || moment()
            .subtract(daysOffset, 'day')
            .startOf('day'),
      endDate: notObrigatoryFilter ? endDate : endDate || moment().endOf('day'),
    };
  }

  handleDateChange(startDate, endDate) {
    const { onChange } = this.props;
    this.setState({ startDate, endDate }, () => {
      if (startDate && endDate) {
        onChange(this.state);
      }
    });
  }

  render() {
    const { intl, notObrigatoryFilter } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <DateFilterStyled>
        <DatePicker
          notObrigatoryFilter={notObrigatoryFilter}
          selectedStartDate={startDate}
          selectedEndDate={endDate}
          startDatePlaceholder={intl.messages['date_filter.start_date']}
          endDatePlaceholder={intl.messages['date_filter.end_date']}
          onChange={(selectedStartDate, selectedEndDate) => {
            this.handleDateChange(selectedStartDate, selectedEndDate);
          }}
          daySize={28}
        />
      </DateFilterStyled>
    );
  }
}

DateFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  daysOffset: PropTypes.number,
  startDate: PropTypes.objectOf(PropTypes.object),
  endDate: PropTypes.objectOf(PropTypes.object),
  notObrigatoryFilter: PropTypes.bool.isRequired,
  intl: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    messages: PropTypes.objectOf(PropTypes.object).isRequired,
  }).isRequired,
};

DateFilter.defaultProps = {
  daysOffset: 30,
  startDate: undefined,
  endDate: undefined,
};

export default injectIntl(DateFilter);
