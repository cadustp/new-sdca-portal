import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import {
  Tooltip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  InfoOutlined,
} from '@mui/icons-material';
import './styles.css';
import { v4 as uuid } from 'uuid';
import { Form } from '../../../../redux/forms/types';
import PublicLinkShare from './SharingOptions/PublicLinkShare';
import SystemUsersShare from './SharingOptions/SystemUsersShare'
import { SHARE_MODE, SNACKBAR_VARIANTS } from '../../../../helpers/consts';
import CustomSnackbar from '../../../../components/shared/CustomSnackbar/CustomSnackbar';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  form: Form,
  shareMode: string,
  availableUsers: [],
};

type DispatchProps = {
  setFormSettings: Function,
  handleShareMode: Function,
};

const SharingTab: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  form,
  setFormSettings,
  handleShareMode,
  shareMode,
  availableUsers,
}) => {
  const [isErrorMessageActive, setErrorMessageVisibility] = useState<boolean>(
    false,
  );

  useEffect(() => {
    setInitialMode()
  }, []);

  const setInitialMode = () => {
    if(form?.publicLink?.active) setPublicLinkMode(true);
    else if(form?.sharedUsers?.length > 0) setSharedUserMode(true);
  }

  const handlePublicLinkChange = e => {
    setFormSettings({...form, publicLink: {...form.publicLink, active: e.target.checked }});

    if (e.target.checked && form.mandatoryApproval) {
      setErrorMessageVisibility(true)
      setFormSettings({...form, publicLink: {...form.publicLink, active: true }, mandatoryApproval: false });
    }

    setPublicLinkMode(e.target.checked);
  }

  const handleSharedUserChange = e => {
    setSharedUserMode(e.target.checked);
  }

  const setPublicLinkMode = checked => {
    handleShareMode({ mode: checked ? SHARE_MODE.PUBLIC_LINK : '' });
  }

  const setSharedUserMode = checked => {
    handleShareMode({ mode: checked ? SHARE_MODE.SYSTEM_USERS : '' })
  }

  const CustomTooltip = ({ content }) => (
    <Tooltip
      title={content}
      placement="right-start"
      arrow
    >
      <InfoOutlined
        style={{ marginLeft: '5px' }}
        fontSize="small"
      />
    </Tooltip>
  );

  const CustomSwitch = ({
    value, onChange, label, disabled = false, tooltip = null,
  }) => (
    <div className="cf-field-switch">
      <FormControlLabel
        control={(
          <Switch
            checked={value}
            value={value}
            onChange={onChange}
            color="primary"
          />
      )}
        label={label}
        disabled={disabled}
      />
      {tooltip && <CustomTooltip content={tooltip} />}
    </div>
  );

  const ShareHeader = () => (
    <div className="cf-advanced-row">
      <div className="cf-field">
        <CustomSwitch
          value={shareMode === SHARE_MODE.SYSTEM_USERS}
          onChange={handleSharedUserChange}
          label={intl.messages['forms.new.systemUsers']}
          tooltip={intl.messages['forms.new.systemUsers.tooltip']}
        />
      </div>
      <div className="cf-field">
        <CustomSwitch
          value={shareMode === SHARE_MODE.PUBLIC_LINK}
          onChange={handlePublicLinkChange}
          label={intl.messages['forms.new.publicLink']}
          tooltip={intl.messages['forms.new.publicLink.tooltip']}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="cf-tab-container">
        <div className="cf-advanced-fields">
          <ShareHeader />
          {shareMode === SHARE_MODE.SYSTEM_USERS && <SystemUsersShare form={form} setFormSettings={setFormSettings} availableUsers={availableUsers} />}
          {shareMode === SHARE_MODE.PUBLIC_LINK && <PublicLinkShare form={form} setFormSettings={setFormSettings} />}
        </div>
      </div>
      <CustomSnackbar
        data={{
          message: intl.messages['forms.new.mandatoryApproval.snackbar.enablePublicLink'],
          type: SNACKBAR_VARIANTS.INFO,
          open: isErrorMessageActive,
        }}
        handleClose={() => setErrorMessageVisibility(false)}
      />
    </>
  );
};

export default injectIntl(SharingTab);
