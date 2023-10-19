import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import {
  Tooltip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import SelectInput from '../../../../components/v2/SelectInput';
import CustomSnackbar from '../../../../components/shared/CustomSnackbar/CustomSnackbar';
import { SNACKBAR_VARIANTS } from '../../../../helpers/consts';
import { formatDataSet } from '../../../../helpers/utils';
import './styles.css';
import { Form } from '../../../../redux/forms/types';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  forms: any,
  form: Form,
};

type DispatchProps = {
  setFormSettings: Function,
};

const AdvancedTab: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  forms,
  form,
  setFormSettings,
}) => {
  const [isErrorMessageActive, setErrorMessageVisibility] = useState<boolean>(
    false,
  );

  const handleMandatoryApprovalChange = ({form, mandatoryApproval}) => {
    setFormSettings({ ...form, mandatoryApproval: mandatoryApproval })

    if (mandatoryApproval && form.publicLink.active) {
      setErrorMessageVisibility(true)
      setFormSettings({...form, publicLink: {...form.publicLink, active: false }, mandatoryApproval: true });
    }
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
    <div className="cf-field">
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
    </div>
  );

  return (
    <>
      <div className="cf-tab-container">
        <div className="cf-field">
          <p>
            {intl.messages['forms.new.attachedForm']}
            <CustomTooltip content={intl.messages['forms.new.attachedForm.tooltip']} />
          </p>
          <div className="cf-field-input">
            <SelectInput
              placeholder={intl.messages['forms.new.attachedForm.placeholder']}
              setSelectedItems={f => {
                setFormSettings({ ...form, attachedForm: f?.value });
              }}
              items={formatDataSet(forms, ['name'])}
              selectedItems={formatDataSet(forms.filter(f => f.id === form.attachedForm))[0]}
            />
          </div>
        </div>
        {false &&
        <CustomSwitch
          value={form.mandatoryApproval}
          onChange={e => handleMandatoryApprovalChange({ form, mandatoryApproval: e.target.checked })}
          label={intl.messages['forms.new.mandatoryApproval']}
          tooltip={intl.messages['forms.new.mandatoryApproval.tooltip']}
        />
        }
        <CustomSwitch
          value={form.evaluatedRequired}
          onChange={e => setFormSettings({ ...form, evaluatedRequired: e.target.checked })}
          label={intl.messages['forms.new.evaluatedRequired']}
          tooltip={intl.messages['forms.new.evaluatedRequired.tooltip']}
        />
        <CustomSwitch
          value={form.calcResult}
          onChange={e => setFormSettings({ ...form, calcResult: e.target.checked })}
          label={intl.messages['forms.new.calcResult']}
          tooltip={intl.messages['forms.new.calcResult.tooltip']}
        />
        <CustomSwitch
          value={form.geolocation}
          onChange={e => setFormSettings({ ...form, geolocation: e.target.checked })}
          label={intl.messages['forms.new.geolocation']}
          tooltip={intl.messages['forms.new.geolocation.tooltip']}
        />
      </div>
      <CustomSnackbar
        data={{
          message: intl.messages['forms.new.mandatoryApproval.snackbar.enableApproval'],
          type: SNACKBAR_VARIANTS.INFO,
          open: isErrorMessageActive,
        }}
        handleClose={() => setErrorMessageVisibility(false)}
      />
    </>
  );
};

export default injectIntl(AdvancedTab);
