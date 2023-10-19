import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const StyledAddButton = styled(Button)`
  margin: 0;
  padding: 0;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${({ theme, disabled }) =>
      disabled ? theme.light.disabled : theme.light.primaryDark};
    svg{
      fill: color: ${({ theme, disabled }) =>
        disabled ? theme.light.disabled : theme.light.primaryDark};
    }
  }
  span {
    color: ${({ theme, disabled }) =>
      disabled ? theme.light.disabled : theme.light.primary};
    font-weight: 600;
  }
  svg {
    margin-right: 8px;
  }
`;
