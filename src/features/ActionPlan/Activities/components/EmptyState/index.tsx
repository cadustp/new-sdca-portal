import React from 'react';
import { injectIntl } from 'react-intl';

import { Button } from '@material-ui/core';

import { Intl } from '../../../../../helpers/types';
import { EmptyActionPlanIcon } from '../../../../../components/shared/Icons/EmptyActionPlanIcon';
import { Container, DescriptionText } from './styles';

type Props = {
  intl: Intl;
};

const EmptyState = (props: Props): JSX.Element => {
  const { intl } = props;

  return (
    <Container>
      <EmptyActionPlanIcon />
      <DescriptionText>
        {intl.formatMessage({ id: 'action_plan.empty_state' })}
      </DescriptionText>
      <Button
        variant="contained"
        color="primary"
        style={{ fontWeight: 600 }}
        onClick={() => { }}
      >
        {intl.formatMessage({ id: 'action_plan.create' })}
      </Button>
    </Container>
  );
};

export default injectIntl(EmptyState);
