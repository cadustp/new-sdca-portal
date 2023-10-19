import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from '../../../../../helpers/withRouter'; 
import {
  closeExportModal,
  exportReport,
} from '../../../../../redux/actions/reports-actions';
import ExportReportModal from './ExportReportModal';
import { Intl } from '../../../../../helpers/types';

type StateProps = {
  loading: boolean;
  loggedUser: any;
  failure: boolean;
};

type DispatchProps = {
  handleCloseExportModal: () => void;
  exportReport: ({ reportData, user }) => void;
};

type OwnProps = {
  intl: Intl;
  startDate: any;
  endDate: any;
  open: boolean;
  selectedUsers: any;
};

export type ExportReportModalTypes = StateProps & DispatchProps & OwnProps;

const mapStateToProps = state => ({
  loading: state.reportsReducer.loading,
  loggedUser: state.login.information,
});

const mapDispatchToProps = dispatch => ({
  handleCloseExportModal: () => dispatch(closeExportModal()),
  exportReport: ({ reportData, user }) =>
    dispatch(exportReport({ reportData, user })),
});

export default withRouter(
  injectIntl(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(ExportReportModal),
  ),
);
