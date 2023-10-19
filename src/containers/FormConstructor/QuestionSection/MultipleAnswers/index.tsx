import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import MultipleAnswers from './MultipleAnswers';
import {
  addAnswerOption,
  deleteAnswerOption,
  editAnswerOption,
  moveOption,
} from '../../../../redux/forms/actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  deleteAnswerOption: payload => dispatch(deleteAnswerOption(payload)),
  addAnswerOption: payload => dispatch(addAnswerOption(payload)),
  editAnswerOption: payload => dispatch(editAnswerOption(payload)),
  moveOption: payload => dispatch(moveOption(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(MultipleAnswers),
);
