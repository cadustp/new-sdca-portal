import React, { useState } from 'react';
import { injectIntl } from 'react-intl';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Divider from '@mui/material/Divider';

import { Intl } from '../../../../helpers/types';
import PlanBoard from '../../Activities/components/Board';
import { Container } from './styles';

type Props = {
  intl: Intl;
};

const TabBar = (props: Props): JSX.Element => {
  const { intl } = props;

  const tabs = {
    activities: 0,
  };

  const [selectedTab, setSelectedTab] = useState(tabs.activities);

  const handleChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="primary"
      >
        <Tab label={intl.formatMessage({ id: 'action_plan.activities' })} />
      </Tabs>
      <Divider />
      {selectedTab === tabs.activities && <PlanBoard />}
    </Container>
  );
};

export default injectIntl(TabBar);
