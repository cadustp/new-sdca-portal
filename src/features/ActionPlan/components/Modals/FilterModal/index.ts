import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from '../../../../../helpers/withRouter';
import {
  filterUsers,
  closeFilterModal,
  User,
} from '../../../../../redux/plans/duck';
import FilterModal from './FilterModal';
import { Intl } from '../../../../../helpers/types';

type StateProps = {
  users: User[];
  isVisible: boolean;
  selectedUsers: number[];
};

type DispatchProps = {
  closeFilterModal: () => void;
  filterUsers: (args: number[]) => void;
};

type OwnProps = {
  intl: Intl;
};

export type FilterModalTypes = StateProps & DispatchProps & OwnProps;

const mapStateToProps = state => ({
  isVisible: state.plans.filterModal.isVisible,
  selectedUsers: state.plans.filterModal.selectedUsers,
  users: state.plans.filterModal.users,
});

const mapDispatchToProps = dispatch => ({
  filterUsers: selectedUsers => dispatch(filterUsers(selectedUsers)),
  closeFilterModal: () => dispatch(closeFilterModal()),
});

export default withRouter(
  injectIntl(
    connect<StateProps, DispatchProps, OwnProps>(
      mapStateToProps,
      mapDispatchToProps,
    )(FilterModal),
  ),
);
