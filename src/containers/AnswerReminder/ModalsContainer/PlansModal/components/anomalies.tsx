import React from 'react';

import { Box } from '@mui/material';
import { StyledTextField } from '../../../../../components/shared/Inputs/StyledInput';
import AddButton from '../../../../../components/shared/AddButton';
import CausesField from '../../../../../features/ActionPlan/components/Modals/CreationModal/components/CausesField/index';
import { TAnomaly } from '../../../../../types/reminder';
import { captureEvent } from '../../../../../analytics';

type Props = {
  anomalies: TAnomaly,
  isDisabled: boolean,
  anomalyTitle: string,
  anomalyPlaceholder: string,
  causeTitle: string,
  buttonText: string,
  handleSetPlan: Function,
};

const Anomalies: React.FC<Props> = ({
  isDisabled,
  anomalies,
  anomalyTitle,
  anomalyPlaceholder,
  buttonText,
  handleSetPlan,
  causeTitle,
}) => {
  let anomaliesDescription = anomalies.description || '';
  const setAnomaliesDescription = text => {
    anomaliesDescription = text;
  };

  const editText = text => {
    anomalies.description = text;
    handleSetPlan(anomalies);
  };

  const editCause = (value, index) => {
    anomalies.causes[index] = value;
    handleSetPlan(anomalies);
  };

  const deleteCause = index => {
    anomalies.causes.splice(index, 1);
    captureEvent('deleteCauseReminders');
    handleSetPlan(anomalies);
  };

  const addCause = () => {
    anomalies.causes = anomalies.causes ? [...anomalies.causes, ''] : [''];
    captureEvent('addCauseReminders');
    handleSetPlan(anomalies);
  };

  const renderCausesFields = () => anomalies?.causes.map((cause, index) => (
    <div key={Math.random()}>
      <CausesField
        key={Math.random()}
        isDisabled={isDisabled}
        onBlur={e => editCause(e.target.value, index)}
        onDelete={() => deleteCause(index)}
        causes={anomalies.causes}
        hasError={false}
        defaultValue={cause}
      />
    </div>
  ));

  return (
    <Box>
      <div>
        <div key={Math.random()} className="question">
          <StyledTextField
            label={anomalyTitle}
            key={Math.random()}
            tooltip={false}
            error={false}
            type="text"
            disabled={isDisabled}
            onChange={e => setAnomaliesDescription(e.target.value)}
            onBlur={() => editText(anomaliesDescription)}
            defaultValue={anomaliesDescription}
            placeholder={isDisabled ? '' : anomalyPlaceholder}
          />
        </div>
        <div key={Math.random()} className="question">
          <h4>
            { causeTitle }
          </h4>
          {anomalies?.causes && renderCausesFields()}
          { !isDisabled
                && (
                <AddButton
                  key={Math.random()}
                  isDisabled={isDisabled}
                  onClick={addCause}
                  text={buttonText}
                />
                )}
        </div>
      </div>
    </Box>
  );
};

export default Anomalies;
