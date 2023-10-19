import styled from 'styled-components';
import { Fab } from '@mui/material';

export const FloatingContainer = styled(Fab)`
  background: ${({ theme }) => theme.light.primary} !important;
  position: fixed !important;
  bottom: 15px !important;
  right: 50px !important;

  &:hover {
    background: ${({ theme }) => theme.light.primaryDark} !important;
  }
`;
