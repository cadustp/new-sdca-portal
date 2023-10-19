import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import {
  Box, Accordion, AccordionDetails, AccordionSummary,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  intl: {
    messages: [];
  };
  description: string,
};
const ExpansionDescription: React.FC<Props> = ({
  intl,
  description,
}) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      <Box width="100%" display="flex" flexDirection="column" alignItems="center">
        <Box width="100%" maxWidth="900px" mt={2}>
          <Accordion
            expanded={expanded}
            onChange={() => {
              setExpanded(!expanded);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Box display="flex" flexDirection="column">
                <p className="public-description-title">{intl.messages['public.form.description']}</p>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </>
  );
};

export default injectIntl(ExpansionDescription);
