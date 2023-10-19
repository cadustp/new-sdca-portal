import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import QuestionsScreen from './QuestionsScreen';

const mapStateToProps = state => ({
  actionPlanUsers: state.lists.data.planUsers?.length ? state.lists.data.planUsers : state.publicAnswer.planUsers,
});

const mapDispatchToProps = dispatch => ({
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(QuestionsScreen),
);
