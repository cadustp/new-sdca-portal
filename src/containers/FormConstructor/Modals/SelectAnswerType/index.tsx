import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import SelectAnswerType from './SelectAnswerType';
import {
  handleAnswerTypeModal,
  selectAnswerType,
} from '../../../../redux/forms/actions';

const mapStateToProps = state => ({
  open: state.forms.answerType.show,
  answerType: state.forms.answerType.answerType,
});

const mapDispatchToProps = dispatch => ({
  onClose: payload => dispatch(handleAnswerTypeModal(payload)),
  selectAnswerType: payload => dispatch(selectAnswerType(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(SelectAnswerType),
);
