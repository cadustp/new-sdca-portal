import React from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from '../../../helpers/withRouter';
import { ArrowBack, Settings, DeleteOutline } from '@mui/icons-material';
import { IconButton, Tooltip, Button } from '@mui/material';
import moment from '../../../timezones/moment';
import { RESPONSE_STATUS } from '../../../helpers/consts';
import { captureEvent } from '../../../analytics';
import CustomSnackbar from '../../../components/shared/CustomSnackbar/CustomSnackbar';
import LoadingIcon from '../../../components/shared/LoadingIcon';
import CreateModal from '../../Forms/CreateModal';
import DeleteModal from '../../Forms/DeleteModal/DeleteModal';
import DeleteStep from '../Modals/DeleteStep';
import MoveStep from '../Modals/MoveStep';
import MoveQuestion from '../Modals/MoveQuestion';
import { Container } from './styles';
import '../styles.css';
import SelectAnswerType from '../Modals/SelectAnswerType';
import { useNavigate } from 'react-router';

type Props = {
  intl: {
    messages: [];
    locale: string,
  };
};

type StateProps = {
  open: boolean,
  title: string,
  version: string,
  lastModified: string,
  openDelete: boolean,
  formId: number,
  deleteError: string,
  deleteStatus: string,
  isSaving: boolean,
  formErrors: boolean,
  saveStatus: string,
  saveError: string,
};

type DispatchProps = {
  onClose: Function;
  handleToggleSideBar: Function;
  handleDeleteModal: Function;
  deleteFormRequest: Function;
  clearDeleteFormStatus: Function;
  saveForm: Function;
  clearValidateErrors: Function;
  clearSaveFormStatus: Function;
};

const Menu: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  title,
  version,
  lastModified,
  handleToggleSideBar,
  handleDeleteModal,
  openDelete,
  deleteFormRequest,
  formId,
  deleteError,
  deleteStatus,
  clearDeleteFormStatus,
  isSaving,
  saveForm,
  formErrors,
  clearValidateErrors,
  saveStatus,
  saveError,
  clearSaveFormStatus,
}) => {
  const navigate = useNavigate();

  const getLastModified = lastModified => moment(lastModified).locale(intl.locale).format('L');

  const formValidate = () => {
    if (!title.length) {
      handleToggleSideBar();
    } else {
      saveForm();
    }
  };

  const Option = ({
    title,
    onClick,
    event,
    icon,
  }) => (
    <Tooltip
      title={title}
      placement="top"
    >
      <IconButton
        style={{ marginInline: '5px' }}
        onClick={() => {
          onClick();
          captureEvent(event);
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );

  const DeleteErrorSnackBar = () => (
    <CustomSnackbar
      data={{
        message: deleteError,
        type: 'error',
        open: deleteStatus === RESPONSE_STATUS.FAILURE,
      }}
      handleClose={clearDeleteFormStatus}
    />
  );

  const ValidateErrorsSnackBar = () => (
    <CustomSnackbar
      data={{
        message: intl.messages['forms.edit.message'],
        type: 'error',
        open: formErrors,
      }}
      handleClose={clearValidateErrors}
    />
  );
  const SaveErrorSnackBar = () => (
    <CustomSnackbar
      data={{
        message: saveError,
        type: 'error',
        open: saveStatus === RESPONSE_STATUS.FAILURE,
      }}
      handleClose={() => { clearSaveFormStatus({ status: RESPONSE_STATUS.FAILURE }); }}
    />
  );

  return (
    <>
      <Container>
        <div className="general-info">
          <IconButton
            className="back-button"
            onClick={() => {
              navigate('/forms');
            }}
          >
            <ArrowBack />
          </IconButton>
          <div className="title-container">
            <h4 className="title">
              {title}
            </h4>
            <small className="version">
              {`${intl.messages['forms.version']}: ${version ?? 1}`}
            </small>
            <p className="status">
              {`${intl.messages['forms.edit.last_modified']} ${getLastModified(lastModified)}`}
            </p>
          </div>
        </div>
        <div className="buttons-section">
          <div className="subsection">
            <Option
              title={intl.messages['forms.edit.edit']}
              onClick={() => handleToggleSideBar()}
              event="openSettings"
              icon={<Settings />}
            />
            <Option
              title={intl.messages['forms.edit.delete']}
              onClick={() => handleDeleteModal()}
              event="openDeleteConstructor"
              icon={<DeleteOutline />}
            />
          </div>
        </div>
        <div className="subsection" style={{ position: 'relative' }}>
          <Button
            variant="contained"
            color="primary"
            disabled={isSaving}
            style={{ width: 146, fontWeight: 600, marginLeft: '10px' }}
            onClick={() => formValidate()}
          >
            {intl.messages['utils.save']}
          </Button>
          {isSaving && <LoadingIcon size={24} />}
        </div>
      </Container>
      <>
        <DeleteModal
          open={openDelete}
          name={title}
          onClose={handleDeleteModal}
          onConfirm={() => deleteFormRequest(formId)}
        />
        <DeleteErrorSnackBar />
        <DeleteStep />
        <MoveStep />
        <MoveQuestion />
        <SelectAnswerType />
        <ValidateErrorsSnackBar />
        <SaveErrorSnackBar />
      </>
    </>
  );
};

export default injectIntl(withRouter(Menu));
