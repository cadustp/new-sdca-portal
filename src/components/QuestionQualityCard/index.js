import React from 'react';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NestedList from '../NestedList';
import WithLoading from '../../hocs/withLoading';
import WithEmptyData from '../../hocs/withEmptyData';
import Skeleton from 'react-loading-skeleton';
import './styles.css';

const NestedListWithLoading = WithLoading(WithEmptyData(NestedList));

const theme = createTheme({
  typography: {},
  overrides: {
    MuiList: {
      root: {
        '&$root': {
          overflow: 'auto',
          maxHeight: '420px',
          marginTop: '10px',
        },
      },
    },
    MuiListItem: {
      root: {
        '&$root': {
          padding: '0px',
        },
      },
    },
  },
});

const verifyEmptyData = (data) => {
  let valuesIsEmpty = true;
  data.forEach((item) => {
    valuesIsEmpty = item.score === 0 && valuesIsEmpty;
  });
  return valuesIsEmpty;
};

function QuestionQuality({
  title, questions, upper, lower, loading, forms,
}) {
  return (
    <div className="step-quality-card">
      <Grid container spacing={24}>
        <Grid item xs={11} sm={12}>
          <div className="step-quality-card-title">
            {loading ? <Skeleton width={240} height={26} /> :
              <p>{title}</p>
            }
          </div>
        </Grid>
      </Grid>
      <ThemeProvider theme={theme}>
        {loading ? <Skeleton width={1130} height={160} count={1} /> :
          <NestedListWithLoading
            isLoading={loading}
            isEmpty={verifyEmptyData(forms)}
            questions={questions}
            className="NestedList"
            upper={upper}
            lower={lower}
          />
        }
      </ThemeProvider>
    </div>
  );
}

export default QuestionQuality;
