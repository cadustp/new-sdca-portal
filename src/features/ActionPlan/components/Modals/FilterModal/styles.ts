import styled from 'styled-components';
import { Button, IconButton } from '@mui/material';

import { light } from '../../../../../styles/palette';

export const Container = styled.div`
  background-color: ${light.white};
  width: 580px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
`;

export const HeaderFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: ${light.primary};
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
`;
export const StyledDivider = styled.hr`
  background-color: ${light.primary};
  border: 0;
  height: 2px;
`;

export const InformativeLabel = styled.span`
  margin-top: 24px;
  margin-bottom: 24px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.footer`
  margin: 0px 24px 24px 16px;
  display: flex;
  justify-content: space-between;

  span {
    display: flex;
    margin-left: 8px;
    font-size: 14px;
    align-items: center;
  }
`;

export const StyledButton = styled(Button)`
  margin-top: 0px;
  display: flex;
  justify-content: center;
  width: 150px;

  span {
    display: flex;
    margin: 0;
    align-items: center;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div`
  color: ${light.gray.dark};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  margin: 16px 24px 0px 24px;
`;

export const StyledIconButton = styled(IconButton)`
  border: none;
  color: #4a4a4a;
  cursor: pointer;
  float: right;

  &:hover {
    cursor: pointer;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ListContainer = styled.div`
  width: 100vw;
  height: 200px;
  flex: 1;
  padding-bottom: 0;
  overflow: auto;
  margin: 0px 24px;
`;
