/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const OuterRowContainer = styled.div`
  height: 88px;
  background-color: transparent;
`;

export const OuterHeaderContainer = styled.div`
  width: ${props => props.width}px;
  background-color: transparent;
  position: relative;
  direction: ltr;
  padding-right: 5px;
  padding-bottom: 13px;
`;

export const InnerRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80px;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 12px 0px;
  box-shadow: 0 0 5px 0 #e5e9f2;
  margin-right: 12px;
  overflow: hidden;

  &:hover {
    background-color: ${props => (props.hover ? '#FAFDFF' : null)};
    cursor: ${props => (props.hover ? 'pointer' : null)};
  }
`;
