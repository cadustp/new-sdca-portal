import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { Body } from './styles';
import CustomModal from '../../../../components/CustomModal';
import { StyledTextField } from '../../../../components/shared/Inputs/StyledInput';
import SingleDate from '../../../../components/DatePicker/SingleDate';
import PlanUsers from './components/planUsers';
import Anomalies from './components/anomalies';
import { captureEvent } from '../../../../analytics';
import * as S from './styles';

const Moment = require('moment');

type Props = {
  visible: boolean;
  setVisible: Function | any;
  basePlan: any;
  intl: any;
  reminderIsAccomplished: boolean;
  setPlan: Function;
  actionPlanUsers: any;
};

const PlansModal: React.FC<Props> = ({
  visible,
  setVisible,
  basePlan,
  intl,
  reminderIsAccomplished,
  setPlan,
  actionPlanUsers,
}) => {
  const [plan, setPlanState] = useState(basePlan || {});
  const [endDate, setEndDate] = useState(Moment(basePlan?.end_date));
  const [startDate, setStartDate] = useState(Moment(basePlan?.start_date));
  const [nameError, setNameError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [usersError, setUsersError] = useState<boolean>(false);

  const setName = text => {
    plan.name = text;
  };

  const setDescription = text => {
    plan.description = text;
  };
  const handleSetPlanAnomalies = anomalies => {
    const newPlan = { ...plan, anomalies };
    setPlanState(newPlan);
  };

  const setEmployeeHash = user => ({
    id: user.value,
    name: user.label,
  });

  const sendPlanPayload = () => {
    const hasDateError = startDate === null || endDate === null || startDate > endDate;
    const hasNameError = (plan.name === undefined || plan.name === null || plan.name === '');
    const hasUserError = plan?.plan_users ? (plan?.plan_users.length <= 0) : true;

    const eventParams = {
      hasAnomaly: !!plan.anomalies?.description,
      causes: plan.anomalies?.causes?.filter(c => c.length).length,
      hasDescription: !!plan.description,
      responsibles: plan.plan_users?.length,
    };
    if (hasDateError === false && hasNameError === false && hasUserError === false) {
      plan.start_date = startDate;
      plan.end_date = endDate;
      setPlan(plan);
      captureEvent('saveActionPlan', { ...eventParams, status: 'success' });
    } else {
      captureEvent('saveActionPlan', { ...eventParams, status: 'error', error: 'incomplete' });
      setNameError(hasNameError);
      setDateError(hasDateError);
      setUsersError(hasUserError);
    };
  };

  const handleChangePlanUsers = planUsers => {
    const newPlan = { ...plan, plan_users: planUsers.map(user => setEmployeeHash(user)) };
    setPlanState(newPlan);
  };
  const anomalies = plan?.anomalies || {};

  return (
    <CustomModal
      open={visible}
      title={intl.messages['action_plan.title']}
      onClose={setVisible}
      loading={false}
    >
      <Body>
        <div className="question">
          <Anomalies
            anomalies={anomalies}
            isDisabled={reminderIsAccomplished}
            anomalyTitle={intl.messages['action_plan.create.anomaly.label']}
            anomalyPlaceholder={intl.messages['action_plan.create.anomaly.placeholder']}
            causeTitle={intl.messages['action_plan.create.causes.label']}
            buttonText={intl.messages['action_plan.create.causes.add']}
            handleSetPlan={handleSetPlanAnomalies}
          />
        </div>
        <div className="question">
          <StyledTextField
            disabled={reminderIsAccomplished}
            error={nameError}
            type="text"
            inputProps={{
              maxLength: 150,
            }}
            label={intl.messages['action_plan.create.name.label']}
            onBlur={e => setName(e.target.value)}
            defaultValue={plan.name}
            placeholder={intl.messages['action_plan.create.name.placeholder']}
          />
        </div>

        <div className="question">
          <h4 className={`${usersError ? 'invalid' : ''}`}>
            {intl.formatMessage({ id: 'action_plan.create.user.label' })}
          </h4>
          { usersError && <span className="error">{intl.messages['action_plan.create.error.user']}</span> }
          <PlanUsers
            users={actionPlanUsers}
            selectedUsers={plan?.plan_users || []}
            title=""
            placeholder={intl.messages['action_plan.create.user.placeholder']}
            handleChangePlanUsers={handleChangePlanUsers}
            isDisabled={reminderIsAccomplished}
          />
        </div>
        <div className="question">
          <h4 className={`${dateError ? 'invalid' : ''}`}>
            { intl.messages['action_plan.expected_start'] }
          </h4>
          { dateError && <span className="error">{intl.messages['action_plan.create.error.date']}</span> }
          <SingleDate
            valueDate={startDate}
            setValueDate={setStartDate}
            disabled={reminderIsAccomplished}
          />
        </div>
        <div className="question">
          <h4>
            { intl.messages['action_plan.expected_end'] }
          </h4>
          <SingleDate
            valueDate={endDate}
            setValueDate={setEndDate}
            disabled={reminderIsAccomplished}
          />
        </div>

        <div className="question">
          <StyledTextField
            error={false}
            disabled={reminderIsAccomplished}
            label={intl.messages['action_plan.create.description.label']}
            onBlur={e => setDescription(e.target.value)}
            type="text"
            inputProps={{
              maxLength: 250,
            }}
            multiline
            rows={4}
            defaultValue={plan.description}
            placeholder={reminderIsAccomplished ? '' : intl.messages['action_plan.create.description.placeholder']}
          />
        </div>
        <Box
          pt={4}
          display="flex"
          justifyContent="flex-end"
        >
          <Box maxWidth="200px" width="100%" display="flex">
            <S.Button onClick={setVisible} isSave={false}>
              {intl.messages['utils.exit']}
            </S.Button>
            <Box pl={2} />
            {!reminderIsAccomplished && (
            <S.Button
              onClick={sendPlanPayload}
              isSave
            >
              {intl.messages['utils.save']}
            </S.Button>
            )}
          </Box>
        </Box>
      </Body>
    </CustomModal>
  );
};

export default PlansModal;
