/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${props => (props.width ? `${props.width}%` : '100%')};
`;

export const IconLabel = styled.p`
  color: #333333;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.61px;
  line-height: 7px;
  text-align: center;
  margin-top: 8px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 0;
  height: 100%;
  width: ${props => (props.width ? `${props.width}%` : '100%')};
`;

export const HorizontalInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: ${props => (props.width ? `${props.width}%` : '100%')};
  &>div { display: flex; }
`;

export const RowTitle = styled.p`
  width: 90%;
  color: #000000;
  font-size: 12px;
  font-weight: 600;
  line-height: 21px;
  word-wrap: break-word;
`;

export const RowInfo = styled.p`
  color: #333333;
  font-size: 12px;
  line-height: 17px;
  word-wrap: break-word;
  width: 90%;
`;

export const RowInfoBold = styled.p`
  color: #000000;
  font-size: 12px;
  line-height: 17px;
  font-weight: 600;
  word-wrap: break-word;
  width: 90%;
`;

export const AvatarContainer = styled.div`
  margin-right: 8px;
`;

export const AvatarText = styled.p`
  color: ${props => (props.empty ? props.color : '#FFFFFF')};
  font-weight: 600;
  line-height: 17px;
  font-size: 10px;
`;
export const AvatarNumber = styled.p`
  color: #333333;
  font-size: 10px;
  font-weight: 600;
  line-height: 17px;
`;

export const TooltipText = styled.p`
  font-size: 12px;
`;

export const WarapperIcon = styled.div`
  display:flex;
  align-items:center;
  justify-content: center;
  flex-direction:column;
`; 