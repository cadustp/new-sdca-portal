import styled from 'styled-components';
import Button from '@mui/material/Button';

export const StyledButton = styled(Button)`
  svg {
    margin-right: 8px;
  }

  & .label {
    font-weight: 700;
    font-size: 12px;
    text-transform: none;
  }
  p {
    margin: 0;
  }
`;

export default null;
