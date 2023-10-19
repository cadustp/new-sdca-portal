import React, { useEffect, useState } from 'react';
import { withRouter } from '../../helpers/withRouter';
import { AutoSizer, List } from 'react-virtualized';
import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';
import Loading from '../../components/Loading';
import FailureState from '../FailureState';
import CreateNewCard from './CreateNewCard/CreateNewCard';
import FormCard from './FormCard/FormCard';
import EmptyFormsState from './EmptyFormsState/EmptyFormsState';
import SearchBar from './SearchBar/SearchBar';
import CreateModal from './CreateModal';
import DeleteModal from './DeleteModal/DeleteModal';
import { ORDER_TYPES, RESPONSE_STATUS } from '../../helpers/consts';

import {
  replaceLatinCharacters,
  sortAlphabeticalAscending,
  sortAlphabeticalDescending,
  sortCreationDateAscending,
  sortCreationDateDescending,
} from '../../helpers/utils';

import './styles.css';

export const ModalStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 99,
};
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
  handleCreationModal: Function;
  loadAllFormsRequest: Function;
  handleDeleteModal: Function;
  deleteFormRequest: Function;
  clearDeleteFormStatus: Function;
  clearSaveFormStatus: Function;
  duplicateForm: Function;
};

type StateProps = {
  loading: boolean,
  error: boolean,
  forms: Array<any>,
  openDelete: boolean;
  deleteStatus: string;
  deleteError: string;
  saveStatus: string;
  formTitle: string;
  isAClone: boolean;
};

const FormsScreen: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  history,
  handleCreationModal,
  loadAllFormsRequest,
  handleDeleteModal,
  deleteFormRequest,
  clearDeleteFormStatus,
  forms,
  error,
  loading,
  openDelete,
  deleteStatus,
  deleteError,
  saveStatus,
  formTitle,
  clearSaveFormStatus,
  duplicateForm,
  isAClone,
}) => {
  const [filteredForms, setFilteredForms] = useState([{
    id: null,
    name: '',
    created_at: null,
    version: null,
  }]);
  const [formToDelete, setFormToDelete] = useState({
    id: null,
    name: '',
  });
  const [orderType, setOrderType] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAllFormsRequest();
  }, []);

  useEffect(() => {
    if (isAClone) {
      history.push('/forms/new');
    }
  }, [isAClone]);

  const getSortingMethod = () => {
    const methodMap = {
      [ORDER_TYPES.ALPHABETICAL_ASCENDING]: sortAlphabeticalAscending,
      [ORDER_TYPES.ALPHABETICAL_DESCENDING]: sortAlphabeticalDescending,
      [ORDER_TYPES.CREATION_DATE_ASCENDING]: sortCreationDateAscending,
      [ORDER_TYPES.CREATION_DATE_DESCENDING]: sortCreationDateDescending,
    };
    return methodMap[orderType];
  };

  const onFilter = () => {
    const filtered = forms?.filter(form => replaceLatinCharacters(form.name).includes(
      replaceLatinCharacters(searchTerm),
    ));
    if (orderType) {
      filtered.sort(getSortingMethod());
    }
    setFilteredForms(filtered);
  };

  useEffect(() => {
    setFilteredForms(forms);
    onFilter();
  }, [forms]);

  useEffect(() => {
    onFilter();
  }, [searchTerm, orderType]);

  const handleDelete = (id, name) => {
    setFormToDelete({
      id,
      name,
    });
    handleDeleteModal();
  };

  if (!filteredForms.length && forms.length) {
    return (
      <div className="form-screen-container">
        <SearchBar
          onSearch={term => setSearchTerm(term)}
          onFilter={type => setOrderType(type)}
        />
        <EmptyFormsState
          mainText={intl.messages['action_plan.filter.empty_state.main_text']}
          description={intl.messages['forms.empty_state.description_text']}
          openCreationModal={handleCreationModal}
        />
      </div>
    );
  }

  const renderCard = ({ index }) => {
    const {
      version, id, name, created_at,
    } = filteredForms[index];
    return (
      <React.Fragment key={id}>
        {index === 0 && <CreateNewCard openCreationModal={handleCreationModal} />}
        <FormCard
          key={id}
          id={id}
          handleDeleteModal={() => handleDelete(id, name)}
          duplicateForm={duplicateForm}
          title={name}
          version={version}
          date={created_at}
        />
      </React.Fragment>
    );
  };

  const FormsList = () => (forms?.length ? (
    <div className="form-list-container">
      <AutoSizer>
        {({ width, key}) => (
          <List
            className="virtualized-form-list"
            id="virtualizedForms"
            rowCount={filteredForms.length}
            rowRenderer={renderCard}
            height={filteredForms.length * cardHeight}
            width={width}
            rowHeight={cardHeight}
          />
        )}
      </AutoSizer>
    </div>
  ) : (
    <>
      <EmptyFormsState
        mainText={intl.messages['forms.noForms']}
        description=""
        openCreationModal={handleCreationModal}
      />
    </>
  ));

  const renderList = () => {
    if (loading) { return <Loading size="small" />; }
    if (error) { return <FailureState />; }
    return <FormsList />;
  };

  const DeleteSnackBar = () => (
    <CustomSnackbar
      data={{
        message: deleteStatus === RESPONSE_STATUS.SUCCESS ? intl.messages['utils.success'] : deleteError,
        type: deleteStatus === RESPONSE_STATUS.SUCCESS ? 'success' : 'error',
        open: deleteStatus.length,
      }}
      handleClose={clearDeleteFormStatus}
    />
  );

  const SuccessSaveSnackBar = () => (
    <CustomSnackbar
      data={{
        message: intl.formatMessage({ id: 'forms.edit.success' }, { formTitle }),
        type: 'success',
        open: saveStatus === RESPONSE_STATUS.SUCCESS,
      }}
      handleClose={() => { clearSaveFormStatus({ status: RESPONSE_STATUS.SUCCESS }); }}
    />
  );

  return (
    <>
      <div className="form-screen-container">
        <SearchBar
          onSearch={term => setSearchTerm(term)}
          onFilter={type => setOrderType(type)}
        />
        {renderList()}
      </div>
      <CreateModal isNew />
      <DeleteModal
        open={openDelete}
        name={formToDelete.name}
        onClose={handleDeleteModal}
        onConfirm={() => deleteFormRequest(formToDelete.id)}
      />
      <DeleteSnackBar />
      <SuccessSaveSnackBar />
    </>
  );
};

export default withRouter(FormsScreen);
