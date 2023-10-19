import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Loading from '../../components/Loading';
import ActionHeader from '../../components/ActionHeader';
import { RESPONSE_STATUS, LANGUAGE_OPTIONS } from '../../helpers/consts';
import { translateLabels } from '../../helpers/utils';
import CompanyEditStep from '../../components/CompanyEditStep';
import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';

import './styles.css';
import { Company } from '../../redux/company/types';

type Props = {
  intl: {
    messages: Array<any>;
  };
};

type DispatchProps = {
  saveCompanyRequest: Function,
  companyDataRequest: Function,
  clearCompanyData: Function,
};

type StateProps = {
  isLoading: boolean,
  saveStatus: string,
  saveError: string,
  company: Company,
  settings: {
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
  },
};

const EditCompanyScreen: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  isLoading,
  company,
  settings,
  companyDataRequest,
  clearCompanyData,
  saveCompanyRequest,
  saveStatus,
  saveError,
}) => {
  const [snackBar, setSnackBar] = useState({
    show: false,
    message: '',
    kind: '',
  });
  const [companyData, setCompanyData] = useState({
    id: 0,
    name: '',
    domain: '',
    language: {
      id: '',
      value: '',
      label: '',
    },
    logo: {
      url: '',
      file: null,
    },
    token: '',
  });
  const [companySettings, setCompanySettings] = useState({
    qualityAvg: {
      id: -1,
      value: -1,
    },
    qualityHigh: {
      id: -1,
      value: -1,
    },
    adherenceAvg: {
      id: -1,
      value: -1,
    },
    adherenceHigh: {
      id: -1,
      value: -1,
    },
    reescheduleLimit: {
      id: -1,
      value: -1,
    },
    appCreate: {
      id: -1,
      value: false,
    },
    appReeschedule: {
      id: -1,
      value: false,
    },
    appCancel: {
      id: -1,
      value: false,
    },
    allEvaluatorsCreate: {
      id: -1,
      value: false,
    },
    reescheduleLow: {
      id: -1,
      value: -1,
    },
    reescheduleHigh: {
      id: -1,
      value: -1,
    },
    reescheduleAttached: {
      id: -1,
      value: -1,
    },
    sundayReeschedule: {
      id: -1,
      value: false,
    },
    saturdayReeschedule: {
      id: -1,
      value: false,
    },
    evaluatedEmail: {
      id: -1,
      value: false,
    },
    evaluatorEmail: {
      id: -1,
      value: false,
    },
  });

  const handleClear = () => {
    setSnackBar({ show: false, message: '', kind: '' });
    clearCompanyData();
  };

  const handleSave = () => {
    const results = Object.values(companySettings).filter(setting => Object.values(settings).some(s => s.id === setting.id && s.value !== setting.value));
    const saveData = {
      company: companyData,
      settings: results.length ? results : null,
    };
    saveCompanyRequest(saveData);
  };

  const loadCompanyData = () => {
    setCompanyData({
      ...companyData,
      id: company.id,
      name: company.name,
      domain: company.domain,
      language: translateLabels(intl, LANGUAGE_OPTIONS.LANGUAGES).filter(language => language.key === company.language.toString())?.[0],
      logo: { ...companyData.logo, url: company.logo },
      token: company.token,
    });
  };

  const loadCompanySettings = () => {
    setCompanySettings({ ...settings });
  };

  const handleResult = () => {
    if (saveStatus === RESPONSE_STATUS.SUCCESS) {
      setSnackBar(
        {
          show: true,
          message: intl.messages['company.edit.success'],
          kind: 'success',
        },
      );
    } else if (saveStatus === RESPONSE_STATUS.FAILURE) {
      setSnackBar(
        {
          show: true,
          message: saveError,
          kind: 'error',
        },
      );
    }
  };

  useEffect(() => {
    if (company.id === 0) {
      companyDataRequest();
    } else if (companyData.id === 0) {
      loadCompanyData();
      loadCompanySettings();
    }
    if (saveStatus) {
      handleResult();
    }
  }, [company, saveStatus]);

  const hasMissingFields = () => {
    const isFilled = companyData.name.trim().length > 0
                     && companyData.language
                      && companyData.token;
    return (!isFilled);
  };

  const LoadingSelects = () => (isLoading ? <Loading size="small" /> : <></>);

  const SnackBar = ({ message, open, handleClose }) => (
    <CustomSnackbar
      data={{
        message,
        type: snackBar.kind,
        open,
      }}
      handleClose={handleClose}
    />
  );

  return (
    <>
      <LoadingSelects />
      <ActionHeader
        title={intl.messages['company.edit.title']}
        subtitle={intl.messages['company.edit.subtitle']}
        handleSave={() => handleSave()}
        handleCancel={handleClear}
        hasMissingFields={hasMissingFields}
        cancelRedirect="/dashboard"
      />
      <Box className="edit-company-container">
        <CompanyEditStep
          company={company}
          companyData={companyData}
          setCompanyData={setCompanyData}
          companySettings={companySettings}
          setCompanySettings={setCompanySettings}
        />
      </Box>
      <SnackBar
        message={snackBar.message}
        open={snackBar.show}
        handleClose={() => handleClear()}
      />
    </>
  );
};

export default EditCompanyScreen;
