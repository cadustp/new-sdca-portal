import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  searchDigitalContentsRequest,
  deleteContentRequest,
  clearDeleteStatus,
  openCreateModal,
  clearCreateModal,
  saveContentRequest,
  clearCreateStatus,
} from '../../redux/digitalContents/actions';
import {
  listsDataRequest,
} from '../../redux/lists/actions';

import DigitalContentsScreen from './DigitalContentsScreen';

const mapStateToProps = state => ({
  contents: state.digitalContents.contents,
  isLoading: state.digitalContents.isLoading,
  deleteStatus: state.digitalContents.deleteStatus,
  deleteError: state.digitalContents.deleteError,
  saveStatus: state.digitalContents.saveStatus,
  saveError: state.digitalContents.saveError,
  createModal: state.digitalContents.createModal,
  loadingLists: state.lists.isLoading,
  usersList: state.lists.data.evaluators,
});

const mapDispatchToProps = dispatch => ({
  searchDigitalContentsRequest: requestParams => dispatch(
    searchDigitalContentsRequest(requestParams),
  ),
  deleteContentRequest: payload => dispatch(deleteContentRequest(payload)),
  clearDeleteStatus: () => dispatch(clearDeleteStatus()),
  openCreateModal: content => dispatch(openCreateModal(content)),
  clearCreateModal: () => dispatch(clearCreateModal()),
  clearCreateStatus: () => dispatch(clearCreateStatus()),
  listsDataRequest: requestParams => dispatch(listsDataRequest(requestParams)),
  saveContentRequest: payload => dispatch(saveContentRequest(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(DigitalContentsScreen),
);
