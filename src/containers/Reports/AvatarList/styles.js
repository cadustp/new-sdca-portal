/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 15px 0;

  &:first-child {
    padding: 0 0 15px 0;
  }
`;

export const AvatarContainer = styled.div`
  margin-right: 16px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const NameText = styled.p`
  color: #333333;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.96px;
  line-height: 14px;
`;

export const StatusText = styled.p`
  opacity: 0.64;
  color: #333333;
  font-size: 10.08px;
  letter-spacing: 0.9px;
  line-height: 13px;
`;

export const AvatarText = styled.p`
  color: ${props => (props.empty ? props.color : '#FFFFFF')};
  font-weight: 600;
  line-height: 17px;
  font-size: 10px;
`;
