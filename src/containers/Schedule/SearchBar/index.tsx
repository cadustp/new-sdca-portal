import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import {
  triggerSnackBarError,
  rescheduleReminders,
} from '../../../redux/schedule/actions';

const mapStateToProps = state => ({
  selectedReminders: state.reminder.selectedReminders,
});

const mapDispatchToProps = dispatch => ({
  triggerError: message => dispatch(triggerSnackBarError(message)),
  rescheduleReminders: payload => dispatch(rescheduleReminders(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar),
);
