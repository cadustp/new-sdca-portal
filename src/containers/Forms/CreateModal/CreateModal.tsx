import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from '../../../helpers/withRouter';
import { Tabs, Tab, Button } from '@mui/material';
import CustomModal from '../../../components/CustomModal';
import CustomSnackbar from '../../../components/shared/CustomSnackbar/CustomSnackbar';
import Loading from '../../../components/Loading';

import AdvancedTab from './Tabs/AdvancedTab';
import SimpleTab from './Tabs/SimpleTab';
import SharingTab from './Tabs/SharingTab';

import '../styles.css';
import { Form } from '../../../redux/forms/types';
import { SNACKBAR_VARIANTS } from '../../../helpers/consts';
import { useNavigate } from 'react-router';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  open: boolean,
  forms: [],
  form: Form,
  isNew: boolean,
  shareMode: string,
  availableUsers: [],
  loadingLists: boolean,
  loadFailure: boolean,
};

type DispatchProps = {
  onClose: Function;
  listsDataRequest: Function;
  setFormSettings: Function;
  clearFormSettings: Function;
  handleShareMode: Function;
  loadAvailableUsers: Function;
  clearLoadUsersStatus: Function;
};

const tabs = {
  SIMPLE: 'simple',
  ADVANCED: 'advanced',
  SHARING: 'sharing',
};

const CreateModal: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  open,
  onClose,
  listsDataRequest,
  forms,
  form,
  setFormSettings,
  isNew,
  clearFormSettings,
  handleShareMode,
  shareMode,
  loadAvailableUsers,
  availableUsers,
  loadingLists,
  loadFailure,
  clearLoadUsersStatus,
}) => {
  const [activeTab, setActiveTab] = useState(tabs.SIMPLE);

  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    if (!availableUsers.length) loadAvailableUsers();
    if (!forms.length) listsDataRequest({ forms: true });
  }, [open]);

  const hasValidLink = () => {
    if (form.externalLink?.trim().length) {
      const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+;=.%]+$/;
      return urlRegex.test(String(form.externalLink).toLowerCase());
    }
    return true;
  };

  const hasValidSettings = () => {
    const isFilled = form.name.trim().length > 0 && hasValidLink();
    return !isFilled;
  };

  const handleClose = () => {
    onClose();
    setActiveTab(tabs.SIMPLE);
    if (isNew) { clearFormSettings(); }
  };

  const handleSave = () => {
    onClose();
    if (isNew) navigate('/forms/new');
  };

  const Separator = () => (<div className="cf-tabs-separator" />);

  const renderHeader = () => (
    <Tabs
      value={activeTab}
      onChange={(event, newValue) => { setActiveTab(newValue); }}
      indicatorColor="primary"
      textColor="primary"
    >
      {Object.keys(tabs).map((tab, key) => (
        <Tab
          label={intl.messages[`forms.create.tab.${tabs[tab]}`]}
          value={tabs[tab]}
          key={key}
        />
      ))}
    </Tabs>
  );

  const renderTab = () => (
    <>
      {activeTab === tabs.SIMPLE && (<SimpleTab form={form} setFormSettings={setFormSettings} />)}
      {activeTab === tabs.ADVANCED && (<AdvancedTab form={form} forms={forms} setFormSettings={setFormSettings} />)}
      {activeTab === tabs.SHARING && (<SharingTab form={form} setFormSettings={setFormSettings} handleShareMode={handleShareMode} shareMode={shareMode} availableUsers={availableUsers} />)}
    </>
  );

  const renderFooter = () => (
    <div className="cf-tabs-footer">
      <Button
        variant="outlined"
        onClick={handleClose}
      >
        {intl.messages['utils.cancel']}
      </Button>
      <Button
        variant="contained"
        onClick={handleSave}
        disabled={hasValidSettings()}
      >
        {intl.messages['utils.save']}
      </Button>
    </div>
  );

  const LoadErrorsSnackBar = () => (
    <CustomSnackbar
      data={{
        message: intl.messages['utils.errorLoadingOptions'],
        type: SNACKBAR_VARIANTS.ERROR,
        open: loadFailure,
      }}
      handleClose={clearLoadUsersStatus}
    />
  );

  return (
    <>
      <CustomModal
        title={intl.messages['forms.create.title']}
        open={open}
        onClose={handleClose}
        disableBackdropClick
      >
        <>
          <Separator />
          {renderHeader()}
          {renderTab()}
          {renderFooter()}
        </>
      </CustomModal>
      {open && <LoadErrorsSnackBar />}
      {(open && loadingLists) && <Loading size="small" />}
    </>
  );
};

export default injectIntl(withRouter(CreateModal));
