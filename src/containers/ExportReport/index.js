import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  toggleExportButton,
  closeSnackbar,
} from '../../redux/actions/reports-actions';
import { OuterContainer } from './styles';

import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';
import ExportModal from '../Reports/ExportModal';
import { SNACKBAR_VARIANTS } from '../../helpers/consts';

class ExportReport extends Component {
  static propTypes = {
    intl: PropTypes.shape({
      messages: PropTypes.shape().isRequired,
    }).isRequired,
    reportTypes: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }).isRequired,
    changeModalStatus: PropTypes.func.isRequired,
    handleCloseSnackbarAction: PropTypes.func.isRequired,
    exportModalOpened: PropTypes.bool.isRequired,
    isSnackbarOpened: PropTypes.bool.isRequired,
    failure: PropTypes.bool.isRequired,
  };

  handleCloseModal = () => {
    const { changeModalStatus } = this.props;
    changeModalStatus();
  };

  handleCloseSnackbar = () => {
    const { handleCloseSnackbarAction } = this.props;
    handleCloseSnackbarAction();
  };

  render() {
    const {
      intl,
      reportTypes,
      exportModalOpened,
      isSnackbarOpened,
      failure,
    } = this.props;

    const reportItems = reportTypes.map(type => ({
      id: type.id,
      value: type.label,
      label: intl.messages[type.label.toLowerCase()],
    }));

    const data = {
      reportItems,
    };

    return (
      <OuterContainer>
        <ExportModal
          data={data}
          open={exportModalOpened}
          handleCloseModal={this.handleCloseModal}
        />
        <CustomSnackbar
          data={{
            message: failure
              ? intl.messages.rel_export_failure
              : intl.messages.rel_export_success,
            type: failure ? SNACKBAR_VARIANTS.ERROR : SNACKBAR_VARIANTS.SUCCESS,
            open: isSnackbarOpened,
          }}
          handleClose={this.handleCloseSnackbar}
        />
      </OuterContainer>
    );
  }
}

const mapStateToProps = state => ({
  reportTypes: state.reportsReducer.reportTypes,
  exportModalOpened: state.reportsReducer.exportModalOpened,
  isSnackbarOpened: state.reportsReducer.isSnackbarOpened,
  failure: state.reportsReducer.failure,
});

const mapDispatchToProps = dispatch => ({
  changeModalStatus: () => dispatch(toggleExportButton()),
  handleCloseSnackbarAction: () => dispatch(closeSnackbar()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ExportReport));
