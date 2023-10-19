import React from 'react';
import Divider from '@material-ui/core/Divider';
import { defineMessages, injectIntl } from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import ScoredList from '../ScoredList';
import ChartCardRadar from '../ChartCardRadar';
import WithLoading from '../../hocs/withLoading';
import WithEmptyData from '../../hocs/withEmptyData';
import './styles.css';

let titleLabel = '';
const ChartCardRadarWithLoading = WithLoading(WithEmptyData(ChartCardRadar));

const translate = intl => {
  titleLabel = intl.formatMessage({
    id: 'form_card.title',
    defaultMessage: 'Qualidade por formulários e etapas',
  });

  defineMessages({
    titleLabel: {
      id: 'form_card.title',
      defaultMessage: 'Qualidade por formulários e etapas',
    },
  });
};

const verifyEmptyData = data => {
  let valuesIsEmpty = true;
  data.forEach(item => {
    valuesIsEmpty = item.score === 0 && valuesIsEmpty;
  });
  return valuesIsEmpty;
};

const renderScoredList = (forms, loading, selectedForm, selectFormEvent) => {
  if (loading || verifyEmptyData(forms)) return null;
  return (
    <div className="dashboard-forms">
      <ScoredList
        data={forms}
        clickable="true"
        callBack={selectFormEvent}
        selectedItem={selectedForm}
      />
    </div>
  );
};

function FormCardRadar({
  intl,
  company,
  steps,
  loadingSteps,
  loadingForms,
  selectedForm,
  selectFormEvent,
  forms,
}) {
  translate(intl);
  return (
    <div className="dashboard-form-card">
      <div className="title">
        {loadingForms ? <Skeleton width={392} />
          : <p>{titleLabel}</p>}
      </div>
      <Divider />
      <div className="content">
        {loadingForms ? <Skeleton width={370} height={388} /> : (
          renderScoredList(forms, loadingForms, selectedForm, selectFormEvent)
        )}
        <div id="radar" className="chart-radar">
          {loadingForms ? <Skeleton width={760} height={388} /> : (
            <ChartCardRadarWithLoading
              className="card"
              data={steps}
              upper={company.max_quality}
              lower={company.min_quality}
              isLoading={loadingSteps}
              isEmpty={verifyEmptyData(forms)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default injectIntl(FormCardRadar);
