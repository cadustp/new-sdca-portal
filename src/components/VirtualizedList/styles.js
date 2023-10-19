/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const ScrollableDiv = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: ${props => props.height || 128}px;
`;

export const SizerWrapper = styled.div`
  position: relative;
  height: ${({ height }) => height}px;
`;
