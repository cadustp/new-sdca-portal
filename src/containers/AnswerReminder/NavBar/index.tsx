import React, { useContext, useState }  from 'react';

import { Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { ReactComponent as LeftSVG } from '../../../assets/icons/left.svg';
import SelectInput from '../../../components/SelectInput';
import NavFixed from '../../../components/NavFixed';
import { TCompanyEmployee } from '../../../types/reminder';
import {
  ContextReminderAnswers
} from '../../../context/ContextReminderAnswers';
import Loading from '../../../components/Loading';
import { captureEvent } from '../../../analytics';
import { useNavigate } from 'react-router';

type Props = {
  intl: {
    messages: [];
    formatMessage: Function;
  };
  disableSaveButton: boolean;
  status: boolean;
  appUserId: string | number;
};

const NavBar: React.FC<Props> = ({
  intl,
  disableSaveButton,
  status,
  appUserId,
}) => {
  const {
    valuatedUsers,
    setEmployee,
    selectedValuatedEmployee,
    reminderName,
    answerReminder,
    sendReminder,
    generatePdf,
    handleSetLocation,
  } = useContext(ContextReminderAnswers);

  const navigate = useNavigate();

  const formatDataSet = ({ items }) => {
    if (items) {
      return items.map(item => ({
        value: item.id || item.value,
        label: `${item.name}`,
        key: item.id || item.value || Math.random(),
      }));
    }
    return items;
  };

  const formatEmployee = (employee: TCompanyEmployee | undefined) => {
    if (employee) {
      if (employee.hasOwnProperty('name')) {
        return { ...employee, label: employee.name };
      }
      return employee;
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const getCurrentPosition = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };

    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        options
      )
    })
  }

  const handleSendReminder = async () => {
    const send = window.confirm(`${intl.messages['reminders.answer.send']}`);
    if(send) {
      let location, coordsValue;

      setIsLoading(true);
      try {
        location = await getCurrentPosition();
      } catch(e) {
        location = null
      }
      setIsLoading(false);

      if(location?.coords){
        coordsValue = JSON.stringify({longitude: location.coords.longitude, latitude: location.coords.latitude});
        handleSetLocation(coordsValue);
      } else {
        if (answerReminder?.reminder.form.geolocation_required) {
          alert(`${intl.messages['reminders.answer.geolocation_required']}`)
          return;
        }
      }
    
      const reminderParams = {
        ...answerReminder?.reminder,
        location: coordsValue,
      }

      sendReminder({ reminder: reminderParams })
    }
  }

  const handleGeneratePDF = () => {
    generatePdf({ reminderId: answerReminder?.reminder.id, appUserId });
    captureEvent('generatePDF');
  };

  const LoadingState = () => (isLoading
    ? (
      <Loading
        size="small"
      />
    )
    : <></>);

  return (
    <>
    <LoadingState />
    <NavFixed>
      <Box display="flex" alignItems="center">
        <IconButton
          className="back-button"
          onClick={() => {
            navigate('/app_user/reminders');
            captureEvent('backToReminders');
          }}
        >
          <LeftSVG />
        </IconButton>
        <h4>{reminderName}</h4>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
      >
        <Box mr={8} width="250px">
          {(valuatedUsers.length > 0
          || selectedValuatedEmployee !== null) && (
            <SelectInput
              isAutoComplete
              title={intl.messages['report_side_filter.evaluated_title']}
              placeholder={
                intl.messages['report_side_filter.evaluated_placeholder']
              }
              onChange={selectedValuatedUsers => {
                setEmployee(selectedValuatedUsers);
                captureEvent(selectedValuatedUsers ? 'selectEvaluatedReminders' : 'clearEvaluated');
              }}
              items={formatDataSet({
                items: valuatedUsers,
              })}
              selectedItems={
                selectedValuatedEmployee
                  ? formatEmployee(selectedValuatedEmployee)
                  : []
              }
              isDisabled={!status}
            />
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          disabled={status && disableSaveButton}
          style={{ width: 146, fontWeight: 600 }}
          onClick={() => (status ? handleSendReminder() : handleGeneratePDF())}
        >
          {status
            ? intl.messages['answer.send']
            : intl.messages['reminders.answer.downloadAnswersPDF']}
        </Button>
      </Box>
    </NavFixed>
    </>
  );
};

export default NavBar;
