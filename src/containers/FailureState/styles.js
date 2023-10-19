/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 120px auto 0;
`;

export const MainText = styled.p`
  color: ${({ theme }) => theme.light.gray.dark};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-top: 46px;
`;

export const DescriptionText = styled.p`
  color: ${({ theme }) => theme.light.gray.light};
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  margin-top: 18px;
  max-width: 280px;
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.light.gray.light};
  text-decoration:none;
`;
