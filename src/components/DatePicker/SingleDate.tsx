import React, { useState } from 'react';
// import 'react-dates/initialize';
// import { SingleDatePicker } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.module.css';
import { StyledDateRangePickerContainer } from './styles';
import moment from '../../timezones/moment';

type Props = {
  valueDate: string | moment.Moment
  setValueDate:Function,
  disabled:boolean
};

const SingleDate: React.FC<Props> = ({ valueDate, setValueDate, disabled }) => {
  // const [focused, setFocused] = useState();

  return (
    <StyledDateRangePickerContainer>
      {/* <SingleDatePicker
        numberOfMonths={1}
        onDateChange={date => setValueDate(date)}
        onFocusChange={({ focused }) => setFocused(focused)}
        focused={focused}
        date={valueDate}
        placeholder="dd/mm/aaaa"
        disabled={disabled}
        key={Math.random().toString()}
      /> */}
      {/* <DatePicker
        selected={valueDate} // provavelmente será necessário alterar para Date
        focused={focused}
        onChange={(date) => setValueDate(date)}
        onFocusChange={({ focused }: any) => setFocused(focused)}
        placeholderText="dd/mm/aaaa"
        disabled={disabled}
        dateFormat="dd/MM/yyyy"
      /> */}
    </StyledDateRangePickerContainer>
  );
};
export default SingleDate;
