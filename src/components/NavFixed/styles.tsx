/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const SContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding: 16px 54px;
  background: white;
  margin: 0 -54px;
  border-bottom: 1px solid #ddd;
  min-height: 88px;
  height:50px;
  position:fixed;
  ${props=>props.scroll > 0 ? `top:${80 - props.scroll > 0 ? (80 - props.scroll) -1 :0}px ` : ''}
  z-index:999;
  ${props=>props.scroll > 0 ? (props=>props.scroll > 80 ? 'margin-top:0px ':`margin-top:3px `):''}
  @media screen and (min-width: 1961px) {
    padding: 16px 20%;
  }
`;
