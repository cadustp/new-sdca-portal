import React, { useEffect, useState } from 'react';
import { Evaluated, EvaluatedsState } from '../../redux/evaluateds/types';
import Loading from '../../components/Loading';
import Header from './Header';
import SearchBar from './SearchBar';
import Section from './Section';
import ActivateInactivateConfirmModal from './ActivateInactivateConfirmModal';
import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';
import { RESPONSE_STATUS } from '../../helpers/consts';

import './styles.css';

type Props = {
  intl: {
    messages: [];
  };
  history: { push: (route: string) => void };
};

type DispatchProps = {
  searchEvaluatedsRequest: Function;
  updateFilterParams: Function;
  changeFilterModalStatus: Function;
  activateInactivateEvaluatedsRequest: Function;
  clearEditEvaluatedStepper: Function;
  setEditEvaluated: Function;
  importEvaluatedsRequest: Function;
  clearImportStatus: Function;
  listsDataRequest: Function;
  exportEvaluatedsRequest: Function,
  clearExportStatus: Function,
};

type StateProps = EvaluatedsState & {
  evaluatedsList: Array<Evaluated>,
  groupsList: Array<any>,
  saveStatus: string,
  exportObject: Blob,
  importStatus: string,
  importRowErrors: [],
  loadingLists: boolean,
  exportStatus: string,
  exportError: string,
};

const EvaluatedsScreen: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  isLoading,
  loadingLists,
  failure,
  activateInactivateFailure,
  evaluateds,
  exportObject,
  searchEvaluatedsRequest,
  activateInactivateEvaluatedsRequest,
  updateFilterParams,
  changeFilterModalStatus,
  filterModalIsOpen,
  filterParams,
  evaluatedsList,
  groupsList,
  setEditEvaluated,
  clearEditEvaluatedStepper,
  history,
  saveStatus,
  importEvaluatedsRequest,
  importStatus,
  importRowErrors,
  clearImportStatus,
  listsDataRequest,
  exportEvaluatedsRequest,
  clearExportStatus,
  exportStatus,
  exportError,
}) => {
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [selectedEvaluatedsIds, setSelectedEvaluatedsIds] = useState<Array<number>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activateInactivateError, setActivateInactivateError] = useState({
    isOpen: false,
    message: intl.messages['users.errors.unselected_users'],
  });

  const modalEntityTypeTranslate = intl.messages['evaluateds.activateInactivateConfirmModal.type'];
  const modalActionTranslate = `${intl.messages[`evaluateds.activateInactivateConfirmModal.active.${filterParams.active}`]}`;

  useEffect(() => {
    searchEvaluatedsRequest({
      params: filterParams,
      paginate: true,
      page: 1,
    });
  }, [searchEvaluatedsRequest]);

  const handleSearchRequest = (params = filterParams, text = inputSearchValue, page = 1) => {
    searchEvaluatedsRequest({
      params: {
        ...params,
        text,
      },
      paginate: true,
      page,
    });
  };

  useEffect(() => {
    if (activateInactivateFailure === false) {
      setSelectedEvaluatedsIds([]);
      handleSearchRequest(filterParams);
    }
  }, [activateInactivateFailure]);

  const handleUpdateEvaluateds = () => {
    if (selectedEvaluatedsIds.length) {
      const ids = { ids: selectedEvaluatedsIds, active: !filterParams.active };
      setIsOpen(false);
      activateInactivateEvaluatedsRequest(ids);
    }
  };

  const handleSelectAllEvaluateds = selectAll => {
    if (selectAll) {
      setSelectedEvaluatedsIds([...evaluateds.data].map(evaluated => evaluated.id));
    } else {
      setSelectedEvaluatedsIds([]);
    }
  };

  const handleSelectOneEvaluated = (e, evaluatedId) => {
    if (e.target.checked) {
      setSelectedEvaluatedsIds([...selectedEvaluatedsIds, evaluatedId]);
    } else {
      setSelectedEvaluatedsIds(selectedEvaluatedsIds.filter(e => e !== evaluatedId));
    }
  };

  const handleEditEvaluated = evaluated => {
    setEditEvaluated(evaluated);
    history.push('/admin/evaluateds/edit');
  };

  const triggerSnackBarError = () => {
    setActivateInactivateError({ ...activateInactivateError, isOpen: !activateInactivateError.isOpen });
  };

  const handleExport = () => {
    exportEvaluatedsRequest(filterParams);
  };

  const LoadingState = () => (isLoading || loadingLists ? <Loading size="small" /> : <></>);

  return (
    <>
      <LoadingState />
      <div className="screen">
        <Header />
        <SearchBar
          setInputSearchValue={setInputSearchValue}
          inputSearchValue={inputSearchValue}
          handleSearchRequest={handleSearchRequest}
          updateFilterParams={updateFilterParams}
          filterModalIsOpen={filterModalIsOpen}
          changeFilterModalStatus={changeFilterModalStatus}
          filterParams={filterParams}
          evaluatedsList={evaluatedsList}
          emailsList={evaluatedsList}
          groupsList={groupsList}
          updateEvaluateds={() => setIsOpen(true)}
          setSelectedEvaluatedsIds={setSelectedEvaluatedsIds}
          selectedEvaluatedsIds={selectedEvaluatedsIds}
          action={modalActionTranslate}
          listsDataRequest={listsDataRequest}
          importEvaluatedsRequest={importEvaluatedsRequest}
          importStatus={importStatus}
          importRowErrors={importRowErrors}
          clearImportStatus={clearImportStatus}
          handleExport={handleExport}
          clearExportStatus={clearExportStatus}
          exportStatus={exportStatus}
          exportObject={exportObject}
          triggerSnackBarError={triggerSnackBarError}
        />
        <Section
          evaluateds={evaluateds}
          isLoading={isLoading}
          failure={failure}
          searchEvaluatedsRequest={searchEvaluatedsRequest}
          inputSearchValue={inputSearchValue}
          handleSearchRequest={handleSearchRequest}
          filterParams={filterParams}
          selectedEvaluatedsIds={selectedEvaluatedsIds}
          openModal={() => setIsOpen(true)}
          setSelectedEvaluatedsIds={setSelectedEvaluatedsIds}
          handleSelectAllEvaluateds={handleSelectAllEvaluateds}
          handleSelectOneEvaluated={handleSelectOneEvaluated}
          action={modalActionTranslate}
          handleEditEvaluated={handleEditEvaluated}
        />
        <ActivateInactivateConfirmModal
          title={`${modalActionTranslate} ${modalEntityTypeTranslate}`}
          action={modalActionTranslate}
          type={modalEntityTypeTranslate}
          isOpen={isOpen}
          intl={intl}
          evaluatedsNumber={selectedEvaluatedsIds.length}
          onClose={() => setIsOpen(false)}
          onConfirm={handleUpdateEvaluateds}
        />
        <CustomSnackbar
          data={{
            message: intl.messages['users.edit.success'],
            type: 'success',
            open: saveStatus === RESPONSE_STATUS.SUCCESS,
          }}
          handleClose={clearEditEvaluatedStepper}
        />
        <CustomSnackbar
          data={{
            message: activateInactivateError.message,
            type: 'error',
            open: activateInactivateError.isOpen,
          }}
          handleClose={triggerSnackBarError}
        />
        <CustomSnackbar
          data={{
            message: exportError,
            type: 'error',
            open: exportStatus === RESPONSE_STATUS.FAILURE,
          }}
          handleClose={clearExportStatus}
        />
      </div>
    </>
  );
};

export default EvaluatedsScreen;
