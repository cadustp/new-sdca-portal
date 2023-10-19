import styled from 'styled-components';
import { text } from '../../styles/palette';

export const Container = styled.div`
  box-sizing: content-box;
  width: 100%;
`;

export const Title = styled.p`
  color: ${text.primary};
  font-size: 36px;
  font-weight: 600;
  line-height: 49px;
  margin-top: 48px;
`;

export const ModalStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 99,
};

export const ButtonsContainer = styled.div`
  display: flex;

  > button {
    min-width: 200px
    margin-left: 10px
  }
`;
