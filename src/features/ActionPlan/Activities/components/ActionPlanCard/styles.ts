import styled from 'styled-components';
import { IconButton, MenuItem } from '@material-ui/core';
import { light } from '../../../../../styles/palette';

export const Container = styled.div`
  position: relative;
  background: ${light.white};
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  cursor: grab;
  font-size: 15px;
  min-height: 128px;
  border-radius: 5px;
  flex: 1;

  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  div {
    display: flex;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: column;
      span {
        font-size: 11px;
        line-height: 16px;
      }
    }
  }
`;

export const CardTitle = styled.p`
  font-size: 12.8px;
  font-weight: 600;
  text-wrap: avoid;
  text-overflow: ellipsis;
  cursor: pointer;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const AvatarContainer = styled.div`
  position: absolute;
  right: 10px;
  bottom: 16px;
`;

export const MenuButton = styled(IconButton)`
  cursor: pointer;
  padding: 6px;
  position: relative;
  left: 12px;
`;

export const DataContainer = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 16px;
`;

export const MenuItemStyled = styled(MenuItem)`
  font-size: 12px;
  padding: 8px 16px;
  font-weight: 600;
  color: ${({ theme, selectedType }) =>
    selectedType ? theme.light.primaryDark : theme.light.gray.dark};
  background-color: ${({ theme, selectedType }) =>
    selectedType ? theme.light.primaryLight : theme.light.white} !important;
  svg {
    margin-right: 6px;
  }
  &:hover {
    background: ${({ theme }) => theme.light.primaryLight};
    color: ${({ theme }) => theme.light.primaryDark};
  }
`;

export const AvatarText = styled.p`
  color: ${props => (props.isColored ? light.white : props.color)};
  margin-top: 4px;
  font-weight: 600;
  line-height: 16px;
  font-size: 10.8px;
  margin-bottom: 22px;
`;

export const DataItem = styled.span`
  p {
    color: ${light.gray.gray};
    font-size: 11px;
    display: inline;
    font-weight: normal;
  }

  span {
    font-size: 11px;
  }
`;
