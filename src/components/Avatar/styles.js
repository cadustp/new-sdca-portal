/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';

export const StyledAvatar = styled(Avatar)`
  border-color: ${props => (props.empty ? props.color : null)};
  border-style: ${props => (props.empty ? 'solid' : null)};
  border-width: ${props => (props.empty ? '1px' : null)};
  background-color: ${props => (props.empty ? '#FFFFFF' : props.color)} !important;
  height: ${props => props.height}px !important;
  width: ${props => props.width}px !important;
  opacity: ${props => (props.empty ? '0.7' : null)};

  &:hover {
    cursor: ${props => (props.empty ? 'pointer' : null)};
  }
`;
