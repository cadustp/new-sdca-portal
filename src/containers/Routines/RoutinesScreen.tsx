import React, { useEffect, useState } from 'react';
import { withRouter } from '../../helpers/withRouter';
import { AutoSizer, List } from 'react-virtualized';
import SearchBar from './SearchBar/SearchBar';
import EmptyRoutinesState from './EmptyRoutinesState/EmptyRoutinesState';
import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';
import CreateNewCard from './CreateNewCard/CreateNewCard';
import RoutineCard from './RoutineCard/RoutineCard';
import DeleteModal from './DeleteModal/DeleteModal';
import Loading from '../../components/Loading';
import { ORDER_TYPES, RESPONSE_STATUS } from '../../helpers/consts';
import FailureState from '../FailureState';
import {
  replaceLatinCharacters,
  sortAlphabeticalAscending,
  sortAlphabeticalDescending,
} from '../../helpers/utils';

import './styles.css';

const cardHeight = 185;

type Props = {
  intl: {
    messages: [];
    formatMessage: Function,
  };
  history: {
    push: Function;
  };
};

type DispatchProps = {
  loadAllRoutinesRequest: Function;
  handleDeleteModal: Function;
  deleteRoutineRequest: Function;
  clearDeleteRoutineStatus: Function;
  activatePauseRoutineRequest: Function;
  clearErrorStatus: Function;
  setSelectedRoutineId: Function;
};

type StateProps = {
  loading: boolean,
  error: boolean,
  routines: Array<any>,
  openDelete: boolean,
  deleteError: string,
  deleteStatus: string,
  errorMessage: string,
};

const RoutinesScreen: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  history,
  loadAllRoutinesRequest,
  routines,
  error,
  loading,
  handleDeleteModal,
  deleteRoutineRequest,
  clearDeleteRoutineStatus,
  openDelete,
  deleteError,
  deleteStatus,
  activatePauseRoutineRequest,
  errorMessage,
  clearErrorStatus,
  setSelectedRoutineId,
}) => {
  const [filteredRoutines, setFilteredRoutines] = useState([{
    id: null,
    name: '',
    endAt: '',
    status: '',
  }]);
  const [routineToDelete, setRoutineToDelete] = useState({
    id: null,
    name: '',
  });
  const [orderType, setOrderType] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAllRoutinesRequest();
  }, []);

  const getSortingMethod = () => {
    const methodMap = {
      [ORDER_TYPES.ALPHABETICAL_ASCENDING]: sortAlphabeticalAscending,
      [ORDER_TYPES.ALPHABETICAL_DESCENDING]: sortAlphabeticalDescending,
    };
    return methodMap[orderType];
  };

  const onFilter = () => {
    const filtered = routines?.filter(routine => replaceLatinCharacters(routine.name).includes(
      replaceLatinCharacters(searchTerm),
    ));
    if (orderType) {
      filtered.sort(getSortingMethod());
    }
    setFilteredRoutines(filtered);
  };

  useEffect(() => {
    setFilteredRoutines(routines);
    onFilter();
  }, [routines]);

  useEffect(() => {
    onFilter();
  }, [searchTerm, orderType]);

  const handleDelete = (id, name) => {
    setRoutineToDelete({
      id,
      name,
    });
    handleDeleteModal();
  };

  const handleEdit = id => {
    setSelectedRoutineId({ id });
    history.push('/routines/edit');
  };

  const renderList = () => {
    if (error) { return <FailureState />; }
    return <RoutinesList />;
  };

  const openCreateNewRoutine = () => {
    history.push('/routines/new');
  };

  const renderCard = ({ index }) => {
    const {
      status, id, name, endAt,
    } = filteredRoutines[index];
    return (
      <>
        {index === 0 && <CreateNewCard openCreateNewRoutine={openCreateNewRoutine} />}
        <RoutineCard
          key={id}
          id={id}
          handleDeleteModal={() => handleDelete(id, name)}
          handleActive={() => activatePauseRoutineRequest(id)}
          handleEdit={() => handleEdit(id)}
          title={name}
          status={status}
          endAt={endAt}
        />
      </>
    );
  };

  const RoutinesList = () => (routines?.length ? (
    <div className="routine-list-container">
      <AutoSizer>
        {({ width }) => (
          <List
            className="virtualized-routine-list"
            id="virtualizedRoutines"
            rowCount={filteredRoutines.length}
            rowRenderer={renderCard}
            height={filteredRoutines.length * cardHeight}
            width={width}
            rowHeight={cardHeight}
          />
        )}
      </AutoSizer>
    </div>
  ) : (
    <>
      <EmptyRoutinesState
        mainText={intl.messages['routines.noRoutines']}
        description=""
        openCreateNewRoutine={openCreateNewRoutine}
      />
    </>
  ));

  const DeleteSnackBar = () => (
    <CustomSnackbar
      data={{
        message: deleteStatus === RESPONSE_STATUS.SUCCESS ? intl.messages['utils.success'] : deleteError,
        type: deleteStatus === RESPONSE_STATUS.SUCCESS ? 'success' : 'error',
        open: deleteStatus.length,
      }}
      handleClose={clearDeleteRoutineStatus}
    />
  );

  const ErrorSnackBar = () => (
    <CustomSnackbar
      data={{
        message: errorMessage,
        type: 'error',
        open: !!errorMessage,
      }}
      handleClose={clearErrorStatus}
    />
  );

  return (
    <>
      {loading && <Loading size="small" />}
      <div className="routine-screen-container">
        <SearchBar
          onSearch={term => setSearchTerm(term)}
          onFilter={type => setOrderType(type)}
        />
        {renderList()}
      </div>
      <DeleteModal
        open={openDelete}
        name={routineToDelete.name}
        onClose={handleDeleteModal}
        onConfirm={() => deleteRoutineRequest(routineToDelete.id)}
      />
      <DeleteSnackBar />
      <ErrorSnackBar />
    </>
  );
};

export default withRouter(RoutinesScreen);
