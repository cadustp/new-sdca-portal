import React from 'react';
import { Button } from '@mui/material';
import { Container } from './styles';
import { Intl } from '../../../../../helpers/types';
import { DeletePlanAction } from '../../../../../redux/plans/duck';
import { captureEvent } from '../../../../../analytics';

type Props = {
  planId: number;
  planName: string;
  cancel: () => void;
  deletePlan: (args: DeletePlanAction) => void;
  intl: Intl;
};

export default function DeleteFormModal({
  planId,
  planName,
  cancel,
  deletePlan,
  intl,
}: Props): JSX.Element {
  const handleDeletePlan = () => {
    deletePlan({
      planId,
      planName,
      successMessage: intl.formatMessage({ id: 'action_plan.delete.success' }),
      errorMessage: intl.formatMessage({ id: 'action_plan.delete.error' }),
      shouldRedirect: false,
    });
  };

  return (
    <Container>
      <p>
        <p>{intl.formatMessage({ id: 'action_plan.delete.warning1' })}</p>
        <strong>{planName}</strong>
      </p>
      <p>{intl.formatMessage({ id: 'action_plan.delete.warning2' })}</p>
      <footer className="buttons">
        <Button
          onClick={() => {
            cancel();
            captureEvent('cancelDeletePDA');
          }}
          variant="outlined"
          style={{ width: 146 }}
        >
          {intl.formatMessage({ id: 'utils.cancel' })}
        </Button>
        <Button
          onClick={handleDeletePlan}
          variant="contained"
          color="primary"
          style={{ width: 146 }}
        >
          {intl.formatMessage({ id: 'utils.delete' })}
        </Button>
      </footer>
    </Container>
  );
}
