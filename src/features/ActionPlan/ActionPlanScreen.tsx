import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from '@mui/material';

import { Intl } from '../../helpers/types';

import { Moment } from 'moment-timezone';

import TabBar from './components/TabBar';
import FloatingButton from '../../components/CreateFloatingButton';
import CreationModal from './components/Modals/CreationModal';
import ExportReportModal from './components/Modals/ExportReportModal';
import CustomModal from '../../components/CustomModal';
import DeletePlanModal from './components/Modals/DeletePlanModal';
import FilterModal from './components/Modals/FilterModal';
import ActionPlanSideFilter from './ActionPlanSideFilter';

import FilterIcon from '../../components/shared/Icons/FilterIcon';
import ExportIcon from '../../components/shared/Icons/ExportIcon';
import Button from '../../components/Button';

import { ModalVisibility } from '../../redux/plans/duck';

import { Container, ModalStyles, ButtonsContainer } from './styles';
import { captureEvent } from '../../analytics';

type Props = {
  intl: Intl;
  groups: Array<any>;
  appUsers: Array<any>;
  valuatedUsers: Array<any>;
  actionPlanUsers: Array<any>;
  displayDeletionModal: boolean;
  displayFilterModal: boolean;
  closeFilterModal: () => void;
  isCreationModalVisible: boolean;
  closeDeletionModal: () => void;
  handleCreationModalVisibility: ({ isVisible }: ModalVisibility) => void;
  exportModalOpened: boolean;
  handleOpenExportModal: () => void;
  handleCloseExportModal: () => void;
  listsDataRequest: Function;
  planUsersRequest: Function;
  fetchPlansList: Function;
  startRange: Moment;
  endRange: Moment;
  selectedResponsibles: Array<any>
};

const ActionPlanScreen = ({
  intl,
  displayDeletionModal,
  closeDeletionModal,
  handleCreationModalVisibility,
  isCreationModalVisible,
  displayFilterModal,
  closeFilterModal,
  handleOpenExportModal,
  handleCloseExportModal,
  exportModalOpened,
  groups,
  appUsers,
  valuatedUsers,
  actionPlanUsers,
  listsDataRequest,
  planUsersRequest,
  fetchPlansList,
  startRange,
  endRange,
}: Props): JSX.Element => {
  const [sideFilterOpened, setSideFilterOpened] = useState(false);

  const handleCloseSideFilter = () => setSideFilterOpened(false);

  const handleFetchPlans = () => {
    fetchPlansList();
  }

  const handleOpenSideFilter = (e) => {
    const hasData = groups.length
      && appUsers.length
      && valuatedUsers.length
      && actionPlanUsers.length;

    if (!hasData) {
      const requestParams = {
        groups: true,
        evaluators: true,
        evaluateds: true,
      };

      listsDataRequest(requestParams);
      planUsersRequest();
    }

    captureEvent('openFilterReports');
    setSideFilterOpened(true);
  }

  return (
    <Container>
      <ActionPlanSideFilter
        open={sideFilterOpened}
        onClose={handleCloseSideFilter}
        onSearch={handleFetchPlans}
        groups={groups}
        appUsers={appUsers}
        valuatedUsers={valuatedUsers}
        actionPlanUsers={actionPlanUsers}
      />
      <div className='sc-header'>
        <div className='page-title'>
          {intl.formatMessage({ id: 'action_plan.title' })}
        </div>
        <ButtonsContainer>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              handleOpenExportModal();
              captureEvent('openExportPDA');
            }}
          >
            <ExportIcon />
            {intl.formatMessage({ id: 'reports.export_label' })}
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="white"
            onClick={handleOpenSideFilter}
          >
            <FilterIcon />
            {intl.formatMessage({ id: 'reports.filter_label' })}
          </Button> 
          <ExportReportModal
            endDate={endRange}
            startDate={startRange}
            open={exportModalOpened}
            handleCloseModal={handleCloseExportModal}
          />
        </ButtonsContainer>
      </div>
      <TabBar />
      <CustomModal
        title={intl.formatMessage({ id: 'action_plan.delete' })}
        open={displayDeletionModal}
        onClose={closeDeletionModal}
      >
        <DeletePlanModal plan shouldRedirect />
      </CustomModal>
      <FloatingButton
        onClick={() => {
          handleCreationModalVisibility({ isVisible: true });
          captureEvent('openActionCreation');
        }}
      />
      <Modal
        style={ModalStyles}
        open={isCreationModalVisible}
        onClose={() => handleCreationModalVisibility({ isVisible: false })}
        disableBackdropClick
      >
        <CreationModal
          closeCreationModal={() => handleCreationModalVisibility({ isVisible: false })}
        />
      </Modal>
      <Modal
        style={ModalStyles}
        open={displayFilterModal}
        onClose={closeFilterModal}
      >
        <FilterModal />
      </Modal>
    </Container>
  )
};
export default injectIntl(ActionPlanScreen);
