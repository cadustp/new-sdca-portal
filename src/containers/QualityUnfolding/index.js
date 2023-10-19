import Grid from '@mui/material/Grid';
import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux';
import { captureEvent } from '../../analytics';
import ChartCardBar from '../../components/ChartCardBar';
import FormCardRadar from '../../components/FormCardRadar';
import QuestionQualityCard from '../../components/QuestionQualityCard';
import FilterIcon from '../../components/shared/Icons/FilterIcon';
import UserFilterIcon from '../../components/shared/Icons/UserFilterIcon';
import { tabs } from '../../components/shared/NewFilter/FilterDialog/FilterDialog';
import NewFilter from '../../components/shared/NewFilter/NewFilter';
import Subtitle from '../../components/Subtitles/Subtitle/Subtitle';
import Subtitles from '../../components/Subtitles/Subtitles';
import { FilterTabs } from '../../helpers/consts';
import {
  fetchQualityByEmployees,
  fetchQualityByForms,
  fetchQualityByQuestions,
  fetchQualityBySteps,
} from '../../redux/actions/quality-actions';
import SectionToolTip from '../Dashboard/QualityDashboard/SectionToolTip';
import './styles.css';

let groupsLabel = '';
let formsLabel = '';
let qualityUnfoldingLabel = '';
let questionQualityTitleLabel = '';
let employeesTitleLabel = '';
let employeesLabel = '';

const mapDispatchToProps = dispatch => ({
  handleEmployeesQualityFetch: body => dispatch(fetchQualityByEmployees({ body })),
  handleFormsQualityFetch: body => dispatch(fetchQualityByForms({ body })),
  handleQuestionsQualityFetch: body => dispatch(fetchQualityByQuestions({ body })),
  handleStepsQualityFetch: body => dispatch(fetchQualityBySteps({ body })),
});

const mapStateToProps = state => ({
  user: state.login.information,
  company: state.companyReducer.company,
  userEmployees: state.valuatedUsersReducer.valuatedUsers,
  userForms: state.formReducer.forms,
  userGroups: state.groupReducer.data.userGroups.groups,
  usersQuality: state.qualityReducer.users,
  formsQuality: state.qualityReducer.forms,
  questionsQuality: state.qualityReducer.questions,
  stepsQuality: state.qualityReducer.steps,
  loading: state.qualityReducer.loading,
});

class QualityUnfolding extends Component {
  state = {
    forms: [],
    steps: [],
    questions: [],
    employees: [],
    selectedEmployees: [],
    selectedGroups: [],
    selectedForm: null,
    loading: {
      form: true,
      steps: true,
      questions: true,
      employees: true,
    },
    isFetchData: true,
  };

  componentDidMount() {
    this.fetchQualityForms();
  }

  componentDidUpdate = prevProps => {
    const {
      userForms,
      formsQuality,
      userGroups,
      user,
      company,
      startDate,
      endDate,
      userEmployees,
    } = this.props;

    if (formsQuality.data !== prevProps.formsQuality.data) {
      this.fetchStepsQuestionsEmployees();
    }

    if (formsQuality.data !== prevProps.formsQuality.data) {
      this.fetchStepsQuestionsEmployees();
    }

    const propsHaveChanged = company !== prevProps.company
      || userForms !== prevProps.userForms
      || userGroups !== prevProps.userGroups
      || user !== prevProps.user
      || userEmployees !== prevProps.userEmployees
      || startDate !== prevProps.startDate
      || endDate !== prevProps.endDate;

    if (propsHaveChanged) {
      const isDataReady = !!company
        && !!formsQuality.data
        && userForms.length > 0
        && userGroups.length > 0
        && !!user
        && !!user.id;

      if (isDataReady) {
        this.fetchQualityForms();
      }
    }
  };

  fetchQualityForms = () => {
    const {
      handleFormsQualityFetch,
      startDate,
      endDate,
      userForms,
      userGroups,
      user,
      company,
    } = this.props;

    const ready = !!company
      && userForms.length > 0
      && userGroups.length > 0
      && !!user
      && !!user.id;

    if (ready) {
      handleFormsQualityFetch(this.buildBody(startDate, endDate));
    }
  };

  fetchQualityBySteps = () => {
    const { handleStepsQualityFetch, startDate, endDate } = this.props;
    handleStepsQualityFetch(this.buildBody(startDate, endDate));
  };

  fetchQualityByQuestions = () => {
    const { handleQuestionsQualityFetch, startDate, endDate } = this.props;
    handleQuestionsQualityFetch(this.buildBody(startDate, endDate));
  };

  fetchQualityByEmployees = () => {
    const { handleEmployeesQualityFetch, startDate, endDate } = this.props;
    handleEmployeesQualityFetch(this.buildBody(startDate, endDate));
  };

  buildBody = (startDate, endDate) => {
    const { selectedGroups, selectedEmployees } = this.state;
    const { userGroups, userEmployees } = this.props;

    const groups = selectedGroups.length
      ? selectedGroups
      : userGroups.map(group => group.id);
    const employees = selectedEmployees.length ? selectedEmployees : []; // Se está vazio, retorna todos os compromissos, pois existem aqueles que não têm avaliado

    return {
      data: {
        start_date: startDate,
        end_date: endDate,
        groups,
        forms: [this.getSelectedForm()?.id],
        users: employees,
      },
    };
  };

  fetchStepsQuestionsEmployees = () => {
    this.fetchQualityBySteps();
    this.fetchQualityByEmployees();
    this.fetchQualityByQuestions();
  };

  onFilterGeneral = selected => {
    const { startDate, endDate } = this.props;
    if (startDate && endDate) {
      this.setState(
        {
          selectedGroups: selected.groups,
          selectedEmployees: selected.employees,
          loading: {
            form: true,
            steps: true,
            questions: true,
            employees: true,
          },
        },
        () => {
          this.fetchQualityForms();
          this.fetchQualityByEmployees();
        }
      );
    }
  };

  onFilterEmployees = filterData => {
    const { employees } = filterData;
    if (employees.length) {
      this.setState(
        {
          selectedEmployees: employees,
        },
        () => this.fetchQualityByEmployees()
      );
    }
  };

  onSelectedForm = form => {
    if (form) {
      captureEvent('selectUnfoldingQualityForm');
      this.setState(
        {
          selectedForm: form,
        },
        () => this.fetchStepsQuestionsEmployees()
      );
    }
  };

  getOrderedForms = () => {
    const { formsQuality } = this.props;

    return formsQuality.data.sort((a, b) => +a.score - +b.score) || [];
  };

  getSelectedForm = () => {
    const { selectedForm } = this.state;
    return selectedForm || this.getOrderedForms()[0];
  };

  getSelectedGroupsLabels = () => {
    const { selectedGroups } = this.state;
    const { userGroups } = this.props;
    return selectedGroups.map(
      id => userGroups.find(group => group.id === +id).name
    );
  };

  getSelectedUsers = () => {
    const { selectedEmployees } = this.state;

    const { userEmployees } = this.props;

    return selectedEmployees.map(
      id => userEmployees.find(employee => employee.id === +id).name
    );
  };

  translate = intl => {
    groupsLabel = intl.formatMessage({
      id: 'thorough_analysis_section.groups',
      defaultMessage: 'Grupos',
    });
    formsLabel = intl.formatMessage({
      id: 'thorough_analysis_section.forms',
      defaultMessage: 'Formulários',
    });
    qualityUnfoldingLabel = intl.formatMessage({
      id: 'thorough_analysis_section.quality_unfolding',
      defaultMessage: 'Desdobramento da qualidade',
    });
    questionQualityTitleLabel = intl.formatMessage({
      id: 'thorough_analysis_section.question_quality_title',
      defaultMessage: 'Média por perguntas',
    });
    employeesTitleLabel = intl.formatMessage({
      id: 'quality_evaluated_bar.title',
      defaultMessage: 'Qualidade por Avaliados',
    });
    employeesLabel = intl.formatMessage({
      id: 'quality_evaluated_bar.collaborator',
      defaultMessage: 'Colaborador',
    });

    defineMessages({
      groupsLabel: {
        id: 'thorough_analysis_section.groups',
        defaultMessage: 'Grupos',
      },
      formsLabel: {
        id: 'thorough_analysis_section.forms',
        defaultMessage: 'Formulários',
      },
      qualityUnfoldingLabel: {
        id: 'thorough_analysis_section.quality_unfolding',
        defaultMessage: 'Desdobramento da qualidade',
      },
      questionQualityTitleLabel: {
        id: 'thorough_analysis_section.question_quality_title',
        defaultMessage: 'Média por perguntas',
      },
      employeesTitleLabel: {
        id: 'quality_evaluated_bar.title',
        defaultMessage: 'Qualidade por Avaliados',
      },
      employeesLabel: {
        id: 'quality_evaluated_bar.collaborator',
        defaultMessage: 'Colaborador',
      },
    });
  };

  render = () => {
    const {
      intl,
      startDate,
      endDate,
      userGroups,
      company,
      usersQuality,
      formsQuality,
      questionsQuality,
      stepsQuality,
      userEmployees,
    } = this.props;

    const { selectedEmployees } = this.state;
    this.translate(intl);
    return (
      <Grid container spacing={24}>
        <div className="section-header">
          <div className="section-titles-column">
            {usersQuality.loading ? (
              <Skeleton width={288} />
            ) : (
              <div className="section-title">
                <div className="alert-circle-icon">
                  <SectionToolTip />
                </div>
                <div>
                  <p>{qualityUnfoldingLabel}</p>
                </div>
              </div>
            )}
            {usersQuality.loading ? (
              <Skeleton width={150} count={2} className="loading-skeleton" />
            ) : (
              <Subtitles>
                <Subtitle
                  label={groupsLabel}
                  values={this.getSelectedGroupsLabels()}
                  limit={3}
                  total={userGroups.length}
                />
                <Subtitle
                  label={formsLabel}
                  values={[this.getSelectedForm()?.name]}
                />
              </Subtitles>
            )}
          </div>
          <div className="filter-section-div">
            <NewFilter
              filterIcon={<FilterIcon color="primary" />}
              selectedTab={tabs.GROUP}
              callBack={this.onFilterGeneral}
              enabledTabs={[FilterTabs.GROUP, FilterTabs.WORKER]}
            />
          </div>
        </div>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            {usersQuality.loading ? (
              <Skeleton width={1208} height={526} count={1} />
            ) : (
              <FormCardRadar
                startDate={startDate}
                endDate={endDate}
                steps={stepsQuality.data}
                selectedForm={this.getSelectedForm()}
                selectFormEvent={this.onSelectedForm}
                forms={this.getOrderedForms()}
                company={company}
                loadingSteps={stepsQuality.loading}
                loadingForms={formsQuality.loading}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            {usersQuality.loading ? (
              <Skeleton width={1208} height={224} count={1} />
            ) : (
              <QuestionQualityCard
                title={questionQualityTitleLabel}
                questions={questionsQuality.data}
                loading={questionsQuality.loading}
                forms={formsQuality.data}
                upper={company.max_quality}
                lower={company.min_quality}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            {usersQuality.loading ? (
              <Skeleton width={1208} height={408} count={1} />
            ) : (
              <ChartCardBar
                selectedTab={tabs.WORKER}
                filterIcon={<UserFilterIcon color="primary" />}
                onFilter={this.onFilterEmployees}
                title={employeesTitleLabel}
                labels={usersQuality.employees.map(employee => employee.name)}
                data={[
                  {
                    title: employeesLabel,
                    values: usersQuality.employees.map(
                      employee => employee.score
                    ),
                    color: 'primary',
                  },
                ]}
                lower={company.min_adherence}
                upper={company.max_adherence}
                enabledTabs={[FilterTabs.WORKER]}
                loading={usersQuality.loading}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(QualityUnfolding)
);
