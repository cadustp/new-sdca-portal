import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import TableHeader from './TableHeader';
import {
  unselectAllReminders,
  setSelectedReminders,
} from '../../../../redux/schedule/actions';

const mapStateToProps = state => ({
  reminders: state.reminder.reminders,
  selectedReminders: state.reminder.selectedReminders,
});

const mapDispatchToProps = dispatch => ({
  unselectAllReminders: () => dispatch(unselectAllReminders()),
  selectReminders: payload => dispatch(setSelectedReminders(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(TableHeader),
);
