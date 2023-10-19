import styled from 'styled-components';
import { text } from '../../../../../styles/palette';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
`;

export const DescriptionText = styled.p`
  color: ${text.primary};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 24px;
`;
