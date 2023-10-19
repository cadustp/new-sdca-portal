import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles'
export const S_Title = styled.p`
  margin-top: 0.2rem;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 0.9rem;
  line-height: 19px;
  color: #6a6a6a;
  color : ${props=> props.missingAnswer ? '#CD6566' : '#6a6a6a' }
`;

export const S_Warn_Title = styled.p`
  margin-top: 0.2rem;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 0.813rem;
  line-height: 23px;
  color: #CD6566;
`;

export const S_SubTitle = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 0.9rem;
  line-height: 19px;
  margin-top: 1rem;
  margin-bottom: 0.2rem;
  color: #333333;
`;


export const useStyles = makeStyles({
  
  accordion:{
    boxShadow:'none',
    border: '1.2px solid #EBECF0',
    borderRadius:'10px '
  }
})