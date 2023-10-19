import React from 'react';
import { injectIntl } from 'react-intl';
import { Box, Button } from '@mui/material';
import styled from 'styled-components';
import { SContainer } from '../../../components/NavFixed/styles';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  name: string,
  isAccomplished: boolean,
};

type DispatchProps = {
  handleSendAnswers: Function,
};

const PublicHeader = styled(SContainer)`
  padding: 15px;
  margin: 0;  
`;

const Header: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  name,
  isAccomplished,
  handleSendAnswers,
}) => (
  <PublicHeader>
    <Box display="flex" alignItems="center">
      <h4>{name}</h4>
    </Box>
    <Button
      variant="contained"
      color="primary"
      style={{ width: 146, fontWeight: 600 }}
      onClick={() => { handleSendAnswers(); }}
      disabled={isAccomplished}
    >
      {intl.messages['answer.send']}
    </Button>
  </PublicHeader>
);

export default injectIntl(Header);
