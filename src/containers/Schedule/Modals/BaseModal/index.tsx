import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import BaseModal from './BaseModal';
import {
  triggerSnackBarError,
  deleteReminders,
  rescheduleReminders,
  setSelectedReminders,
} from '../../../../redux/schedule/actions';

const mapStateToProps = state => ({
  selectedReminders: state.reminder.selectedReminders,
});

const mapDispatchToProps = dispatch => ({
  rescheduleReminders: payload => dispatch(rescheduleReminders(payload)),
  deleteReminders: selectedReminders => dispatch(deleteReminders(selectedReminders)),
  triggerError: message => dispatch(triggerSnackBarError(message)),
  selectReminders: payload => dispatch(setSelectedReminders(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(BaseModal),
);
