/** @format */
import styled from 'styled-components';
import { makeStyles } from 'mui-styles';

export const SCardTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
`;

export const SFakeSkeleton = styled.div`
  background: ${({ theme }) => theme.light.disabledContrast};
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  border-radius: 5px;
  margin-top: 8px;
`;

export const SAnsweredCard = styled.span`
  display: flex;
  flex-direction: column;
  padding: 6px 12px;
  margin-top: 12px;
  border: 1px solid ${({ theme }) => theme.light.contrast};
  background: ${({ colors }) =>
    `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 100%) `};
`;

export const STotalGradient = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const SPercentageGradient = styled.div`
  max-width: ${({ percentage }) => (percentage === 0 ? 100 : percentage)}%;
  height: 4px;
  background: ${({ colors }) =>
    `linear-gradient(90deg, ${colors[1]} 0%, ${colors[0]} 100%) `};
`;

export const STotalAnswers = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${({ variant, theme }) =>
    variant === 'dark' ? theme.light.secondary : 'white'};
`;

export const useStyles = makeStyles({
  
  accordion:{
    boxShadow:'none',
    background: '#fafafa !important'
  },
  accordionSummary:{
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important',
    background: '#fff !important',
    borderRadius: '5px !important'
  },
})
