/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const OuterContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const ContentContainer = styled.div`
  width: 367px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainText = styled.p`
  color: #333333;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
`;

export const DescriptionText = styled.p`
  color: #333333;
  opacity: 0.5;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  margin-top: 18px;
`;
