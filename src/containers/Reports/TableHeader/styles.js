/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${props => (props.width ? `${props.width}%` : '100%')};
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: ${props => (props.width ? `${props.width}%` : '100%')};
`;

export const StatusBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #333333;
  border-radius: 7.84px;
  padding: 4.5px 7.5px;
  height: 17px;
  margin-top: 10px;
`;

export const StatusBadgeText = styled.p`
  color: #333333;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.61px;
  line-height: 7px;
  margin: 0;
`;

export const TableHeaderTitle = styled.p`
  color: #333333;
  font-size: 13px;
  font-weight: 600;
  line-height: 21px;
`;
