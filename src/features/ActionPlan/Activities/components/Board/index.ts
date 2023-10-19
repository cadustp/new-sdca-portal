import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Moment } from 'moment-timezone';
import {
  openExportModal,
  closeExportModal,
  closeSnackbar,
} from '../../../../../redux/actions/reports-actions';
import PlanBoard from './PlanBoard';
import {
  fetchPlansList,
  moveCard,
  reorderCard,
  BoardColumns,
  filterUsers,
  openFilterModal,
  User,
  filterPeriod,
  clearUserFilter,
} from '../../../../../redux/plans/duck';
import {
  setFilterPeriodDate
} from '../../../../../redux/app/filters/duck';
import { Intl } from '../../../../../helpers/types';

type StateProps = {
  planId: number | null;
  boardData: BoardColumns;
  loading: boolean;
  users: User[];
  selectedUsers: number[];
  startDate: Moment | null;
  endDate: Moment | null;
  exportModalOpened: boolean;
  failure: boolean;
  isSnackbarOpened: boolean;
};

type DispatchProps = {
  fetchPlansList: () => void;
  moveCard: (args: {
    boardColumns: BoardColumns;
    source: number;
    destination: number;
    errorMessage: string;
  }) => void;
  reorderCard: (args: {
    boardColumns: BoardColumns;
    source: number;
    destination: number;
  }) => void;
  filterUsers: (args: number[]) => void;
  fetchFilteredCards: () => void;
  openFilterModal: () => void;
  filterPeriod: (args: {
    startDate: string | null;
    endDate: string | null;
  }) => void;
  setDatesFilter: (args: { start: Moment | null; end: Moment | null }) => void;
  clearUserFilter: () => void;
  handleOpenExportModal: () => void;
  handleCloseExportModal: () => void;
  handleCloseSnackbarAction: () => void;
};

type OwnProps = {
  intl: Intl;
};

export type PlanBoardTypes = StateProps & DispatchProps & OwnProps;

const mapStateToProps = state => ({
  planId: state.plans.creationModal.planId,
  boardData: state.plans.boardData,
  loading: state.plans.loading,
  users: state.plans.filterModal.users,
  selectedUsers: state.plans.filterModal.selectedUsers,
  startDate: state.filters.filterPeriod.start,
  endDate: state.filters.filterPeriod.end,
  exportModalOpened: state.reportsReducer.exportModalOpened,
  failure: state.reportsReducer.failure,
  isSnackbarOpened: state.reportsReducer.isSnackbarOpened,
});

const mapDispatchToProps = dispatch => ({
  fetchPlansList: () => dispatch(fetchPlansList()),
  moveCard: ({
    boardColumns, source, destination, errorMessage,
  }) => dispatch(
    moveCard({
      boardColumns,
      source,
      destination,
      errorMessage,
    }),
  ),
  reorderCard: ({
    boardColumns, source, destination, errorMessage,
  }) => dispatch(
    reorderCard({
      boardColumns,
      source,
      destination,
      errorMessage,
    }),
  ),
  filterUsers: selectedUsers => dispatch(filterUsers(selectedUsers)),
  openFilterModal: () => dispatch(openFilterModal()),
  filterPeriod: ({ startDate, endDate }) => dispatch(filterPeriod({ startDate, endDate })),
  setDatesFilter: ({ start, end }) => dispatch(setFilterPeriodDate({ start, end })),
  clearUserFilter: () => dispatch(clearUserFilter()),
  handleOpenExportModal: () => dispatch(openExportModal()),
  handleCloseExportModal: () => dispatch(closeExportModal()),
  handleCloseSnackbarAction: () => dispatch(closeSnackbar()),
});

export default withRouter(
  injectIntl(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(PlanBoard),
  ),
);
