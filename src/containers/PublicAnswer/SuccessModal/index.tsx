import React from 'react';
import { Box } from '@mui/material';

type Props = {
  afterMessage: string,
  afterImageLink: string | null,
  afterImageRedirect: string | null,
};
const SuccessModal: React.FC<Props> = ({
  afterMessage,
  afterImageLink,
  afterImageRedirect,
}) => (
  <>
    <div className="public-auth">
      <Box className="public-auth-container">
        {afterImageLink && afterImageRedirect ? (
          <a href={afterImageRedirect} className="public-auth-logo" target="_blank" rel="noreferrer">
            <img src={afterImageLink} alt="Logo" />
          </a>
        )
          : afterImageLink && <img src={afterImageLink} alt="Logo" className="public-auth-logo" /> }

        <div>
          <p className="public-success-text">
            <div>{afterMessage}</div>
          </p>
        </div>
      </Box>
    </div>
  </>
);

export default SuccessModal;
