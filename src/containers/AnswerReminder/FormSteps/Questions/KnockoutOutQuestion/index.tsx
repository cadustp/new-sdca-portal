import { Box, Typography } from '@material-ui/core';
import React from 'react';
import  KnockoutOutIcon from '../../../../../components/shared/Icons/knockoutIcon'
import { injectIntl } from 'react-intl';

type Props ={
  intl: {
    messages: [];
    formatMessage: Function;
  };
}

const KnockoutOutQuestion:React.FC<Props> =  ({intl}) => {
 
  return (
    <Box width="100%" pl={5} pr={5} pb={12} display="flex" flexDirection="column" alignItems="center" >
   
      <KnockoutOutIcon width={250} height={150} />
      <Box mt={5} textAlign="center">
      <Typography> {intl.messages['Knockout.description']}</Typography>
      </Box>

    </Box>
  );
};

export default injectIntl( KnockoutOutQuestion);
