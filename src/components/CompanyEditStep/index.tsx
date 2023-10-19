import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import {
  Box,
  Input,
  Tooltip,
  Modal,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  InfoOutlined,
} from '@mui/icons-material';
import SelectInput from '../SelectInput';
import StepperCard from '../StepperCard';
import LogoInput from '../LogoInput';
import { translateLabels } from '../../helpers/utils';
import { LANGUAGE_OPTIONS } from '../../helpers/consts';
import './styles.css';

type Props = {
  intl: {
    messages: Array<any>;
    locale: string,
  };
  companyData: {
    name: string,
    domain: string,
    language: {},
    logo: {
      url: string,
      file: {}
    },
    token: string,
  },
  companySettings: {
    qualityAvg: any,
    qualityHigh: any,
    adherenceAvg: any,
    adherenceHigh: any,
    reescheduleLimit: any,
    appCreate: any,
    appReeschedule: any,
    appCancel: any,
    allEvaluatorsCreate: any,
    reescheduleLow: any,
    reescheduleHigh: any,
    reescheduleAttached: any,
    sundayReeschedule: any,
    saturdayReeschedule: any,
    evaluatedEmail: any,
    evaluatorEmail: any,
  }
};

type DispatchProps = {
  setCompanyData: Function,
  setCompanySettings: Function,
};

const Field = ({
  children,
  title,
  tooltip = '',
}) => (
  <div className="company-field-container">
    <p style={{ display: 'flex', alignItems: 'center' }}>
      {title}
      {tooltip.length
        ? (
          <Tooltip
            title={tooltip}
          >
            <InfoOutlined
              style={{ marginLeft: '5px' }}
              fontSize="small"
            />
          </Tooltip>
        )
        : null }
    </p>
    <div className="company-field-input">
      {children}
    </div>
  </div>
);

const SwitchField = ({
  children,
  title,
}) => (
  <div className="company-switch-container">
    <p style={{ display: 'flex', alignItems: 'center' }}>
      {title}
    </p>
    {' '}
    {children}
  </div>
);

const CompanyEditStep: React.FC<Props & DispatchProps> = ({
  intl,
  companyData,
  setCompanyData,
  companySettings,
  setCompanySettings,
}) => {
  const [openLogoModal, setOpenLogoModal] = useState(false);
  const setLogo = (file: any) => {
    setCompanyData({ ...companyData, logo: file });
  };

  const deleteLogo = () => {
    setCompanyData({
      ...companyData,
      logo: {
        url: null,
        file: null,
      },
    });
  };

  return (
    <>
      <Box className="company-step-container">
        <StepperCard
          title={intl.messages['company.edit.step.one']}
        >
          <div className="row-fields">
            <Field
              title={intl.messages['company.edit.field.name']}
            >
              <Input
                onChange={event => setCompanyData({ ...companyData, name: event.target.value })}
                value={companyData.name}
                placeholder={intl.messages['company.edit.field.name.placeholder']}
                fullWidth
                disableUnderline
              />
            </Field>
            <Field
              title={intl.messages['company.edit.field.domain']}
            >
              <Input
                onChange={event => setCompanyData({ ...companyData, domain: event.target.value })}
                value={companyData.domain}
                placeholder={intl.messages['company.edit.field.domain.placeholder']}
                fullWidth
                disableUnderline
              />
            </Field>
          </div>
          <div className="row-fields">
            <Field
              title={intl.messages['company.edit.field.language']}
            >
              <SelectInput
                onChange={selectedItem => setCompanyData({ ...companyData, language: selectedItem })}
                selectedItems={companyData.language}
                placeholder={intl.messages['company.edit.field.language.placeholder']}
                items={translateLabels(intl, LANGUAGE_OPTIONS.LANGUAGES)}
                isAutoComplete
              />
            </Field>
            <Field
              title={intl.messages['company.edit.field.logo']}
            >
              <LogoInput
                text={intl.messages['company.edit.field.logo.placeholder']}
                logo={companyData.logo}
                setLogo={setLogo}
                openLogoModal={() => setOpenLogoModal(true)}
                deleteLogo={() => deleteLogo()}
              />
            </Field>
          </div>
          <div className="row-field-full">
            <Field
              title={intl.messages['company.edit.field.token']}
            >
              <Input
                onChange={event => setCompanyData({ ...companyData, token: event.target.value })}
                value={companyData.token}
                placeholder={intl.messages['company.edit.field.token.placeholder']}
                fullWidth
                disableUnderline
                disabled
              />
            </Field>
          </div>
        </StepperCard>
        <StepperCard
          title={intl.messages['company.edit.step.two']}
        >
          <StepperCard
            title={intl.messages['company.edit.step.a']}
            style={{ width: '100%' }}
          >
            <div className="row-fields">
              <Field
                title={intl.messages['company.edit.field.qualityavg']}
              >
                <Input
                  onChange={event => setCompanySettings({ ...companySettings, qualityAvg: { ...companySettings.qualityAvg, value: parseInt(event.target.value) } })}
                  value={companySettings.qualityAvg.value}
                  placeholder={intl.messages['company.edit.field.qualityavg.placeholder']}
                  fullWidth
                  disableUnderline
                  type="number"
                />
              </Field>
              <Field
                title={intl.messages['company.edit.field.qualityhigh']}
              >
                <Input
                  onChange={event => setCompanySettings({ ...companySettings, qualityHigh: { ...companySettings.qualityHigh, value: parseInt(event.target.value) } })}
                  value={companySettings.qualityHigh.value}
                  placeholder={intl.messages['company.edit.field.qualityhigh.placeholder']}
                  fullWidth
                  disableUnderline
                  type="number"
                />
              </Field>
            </div>
            <div className="row-fields">
              <Field
                title={intl.messages['company.edit.field.adherenceavg']}
              >
                <Input
                  onChange={event => setCompanySettings({ ...companySettings, adherenceAvg: { ...companySettings.adherenceAvg, value: parseInt(event.target.value) } })}
                  value={companySettings.adherenceAvg.value}
                  placeholder={intl.messages['company.edit.field.adherenceavg.placeholder']}
                  fullWidth
                  disableUnderline
                  type="number"
                />
              </Field>
              <Field
                title={intl.messages['company.edit.field.adherencehigh']}
              >
                <Input
                  onChange={event => setCompanySettings({ ...companySettings, adherenceHigh: { ...companySettings.adherenceHigh, value: parseInt(event.target.value) } })}
                  value={companySettings.adherenceHigh.value}
                  placeholder={intl.messages['company.edit.field.adherencehigh.placeholder']}
                  fullWidth
                  disableUnderline
                  type="number"
                />
              </Field>
            </div>
          </StepperCard>
          <StepperCard
            title={intl.messages['company.edit.step.b']}
            style={{ width: '100%' }}
          >
            <div className="row-fields">
              <SwitchField
                title={intl.messages['company.edit.field.appcreate']}
              >
                <FormControlLabel
                  style={{ justifyContent: 'left' }}
                  control={(
                    <Switch
                      checked={companySettings.appCreate.value}
                      value={companySettings.appCreate.value}
                      onChange={e => setCompanySettings({ ...companySettings, appCreate: { ...companySettings.appCreate, value: e.target.checked } })}
                      color="primary"
                    />
                    )}
                  label=""
                />
              </SwitchField>
              <SwitchField
                title={intl.messages['company.edit.field.appreeschedule']}
              >
                <FormControlLabel
                  style={{ justifyContent: 'left' }}
                  control={(
                    <Switch
                      checked={companySettings.appReeschedule.value}
                      value={companySettings.appReeschedule.value}
                      onChange={e => setCompanySettings({ ...companySettings, appReeschedule: { ...companySettings.appReeschedule, value: e.target.checked } })}
                      color="primary"
                    />
                    )}
                  label=""
                />
              </SwitchField>
            </div>
            <div className="row-fields">
              <SwitchField
                title={intl.messages['company.edit.field.appcancel']}
              >
                <FormControlLabel
                  style={{ justifyContent: 'left' }}
                  control={(
                    <Switch
                      checked={companySettings.appCancel.value}
                      value={companySettings.appCancel.value}
                      onChange={e => setCompanySettings({ ...companySettings, appCancel: { ...companySettings.appCancel, value: e.target.checked } })}
                      color="primary"
                    />
                    )}
                  label=""
                />
              </SwitchField>
              <SwitchField
                title={intl.messages['company.edit.field.allevaluatorscreate']}
              >
                <FormControlLabel
                  style={{ justifyContent: 'left' }}
                  control={(
                    <Switch
                      checked={companySettings.allEvaluatorsCreate.value}
                      value={companySettings.allEvaluatorsCreate.value}
                      onChange={e => setCompanySettings({ ...companySettings, allEvaluatorsCreate: { ...companySettings.allEvaluatorsCreate, value: e.target.checked } })}
                      color="primary"
                    />
                    )}
                  label=""
                />
              </SwitchField>
            </div>
          </StepperCard>
          <StepperCard
            title={intl.messages['company.edit.step.c']}
            style={{ width: '100%' }}
          >
            <div className="row-fields">
              <SwitchField
                title={intl.messages['company.edit.field.saturdayschedule']}
              >
                <FormControlLabel
                  style={{ justifyContent: 'left' }}
                  control={(
                    <Switch
                      checked={companySettings.saturdayReeschedule.value}
                      value={companySettings.saturdayReeschedule.value}
                      onChange={e => setCompanySettings({ ...companySettings, saturdayReeschedule: { ...companySettings.saturdayReeschedule, value: e.target.checked } })}
                      color="primary"
                    />
                  )}
                  label=""
                />
              </SwitchField>
              <SwitchField
                title={intl.messages['company.edit.field.sundayschedule']}
              >
                <FormControlLabel
                  style={{ justifyContent: 'left' }}
                  control={(
                    <Switch
                      checked={companySettings.sundayReeschedule.value}
                      value={companySettings.sundayReeschedule.value}
                      onChange={e => setCompanySettings({ ...companySettings, sundayReeschedule: { ...companySettings.sundayReeschedule, value: e.target.checked } })}
                      color="primary"
                    />
                    )}
                  label=""
                />
              </SwitchField>
            </div>
            <div className="row-fields">
              <Field
                title={intl.messages['company.edit.field.reeschedulelow']}
              >
                <Input
                  onChange={event => setCompanySettings({ ...companySettings, reescheduleLow: { ...companySettings.reescheduleLow, value: parseInt(event.target.value) } })}
                  value={companySettings.reescheduleLow.value}
                  placeholder={intl.messages['company.edit.field.reeschedulelow.placeholder']}
                  fullWidth
                  disableUnderline
                  type="number"
                />
              </Field>
              <Field
                title={intl.messages['company.edit.field.reeschedulehigh']}
              >
                <Input
                  onChange={event => setCompanySettings({ ...companySettings, reescheduleHigh: { ...companySettings.reescheduleHigh, value: parseInt(event.target.value) } })}
                  value={companySettings.reescheduleHigh.value}
                  placeholder={intl.messages['company.edit.field.reeschedulehigh.placeholder']}
                  fullWidth
                  disableUnderline
                  type="number"
                />
              </Field>
            </div>
            <div className="row-fields">
              <Field
                title={intl.messages['company.edit.field.reeschedulelimit']}
              >
                <Input
                  onChange={event => setCompanySettings({ ...companySettings, reescheduleLimit: { ...companySettings.reescheduleLimit, value: parseInt(event.target.value) } })}
                  value={companySettings.reescheduleLimit.value}
                  placeholder={intl.messages['company.edit.field.reeschedulelimit.placeholder']}
                  fullWidth
                  disableUnderline
                  type="number"
                />
              </Field>
              <Field
                title={intl.messages['company.edit.field.reescheduleattached']}
              >
                <Input
                  onChange={event => setCompanySettings({ ...companySettings, reescheduleAttached: { ...companySettings.reescheduleAttached, value: parseInt(event.target.value) } })}
                  value={companySettings.reescheduleAttached.value}
                  placeholder={intl.messages['company.edit.field.reescheduleattached.placeholder']}
                  fullWidth
                  disableUnderline
                  type="number"
                />
              </Field>
            </div>
          </StepperCard>
          <StepperCard
            title={intl.messages['company.edit.step.d']}
            style={{ width: '100%' }}
          >
            <div className="row-fields">
              <SwitchField
                title={intl.messages['company.edit.field.evaluatedemail']}
              >
                <FormControlLabel
                  style={{ justifyContent: 'left' }}
                  control={(
                    <Switch
                      checked={companySettings.evaluatedEmail.value}
                      value={companySettings.evaluatedEmail.value}
                      onChange={e => setCompanySettings({ ...companySettings, evaluatedEmail: { ...companySettings.evaluatedEmail, value: e.target.checked } })}
                      color="primary"
                    />
                  )}
                  label=""
                />
              </SwitchField>
              <SwitchField
                title={intl.messages['company.edit.field.evaluatoremail']}
              >
                <FormControlLabel
                  style={{ justifyContent: 'left' }}
                  control={(
                    <Switch
                      checked={companySettings.evaluatorEmail.value}
                      value={companySettings.evaluatorEmail.value}
                      onChange={e => setCompanySettings({ ...companySettings, evaluatorEmail: { ...companySettings.evaluatorEmail, value: e.target.checked } })}
                      color="primary"
                    />
                  )}
                  label=""
                />
              </SwitchField>
            </div>
          </StepperCard>
        </StepperCard>
      </Box>
      <Modal
        open={openLogoModal}
        onClose={() => setOpenLogoModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="logo-modal"
      >
        <div className="logo-paper">
          <img
            src={companyData.logo?.url}
            style={{
              maxWidth: '222px',
              width: '100%',
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default injectIntl(CompanyEditStep);
