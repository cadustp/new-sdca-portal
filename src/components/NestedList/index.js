import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'mui-styles';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import { defineMessages, injectIntl } from 'react-intl';
import './styles.css';
import { captureEvent } from '../../analytics';

let stepLabel = '';
let averageLabel = '';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

function translate(intl) {
  stepLabel = intl.formatMessage({
    id: 'step_list.step',
    defaultMessage: 'Etapa',
  });
  averageLabel = intl.formatMessage({
    id: 'step_list.average',
    defaultMessage: 'Média',
  });

  defineMessages({
    stepLabel: { id: 'step_list.step', defaultMessage: 'Etapa' },
    averageLabel: { id: 'step_list.average', defaultMessage: 'Média' },
  });
}

function defineColor(score, upper, lower) {
  if (score >= upper) return '#52AD8C';
  if (score >= lower) return '#ECC15F';
  return '#C86D61';
}

function QuestionList(props) {
  const { questions } = props;
  const questionList = questions.map(question => (
    <div className="question-box" key={question.id}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={10}
          sm={10}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div className="question-name-div">{question.name}</div>
        </Grid>
        <Grid item xs={2} sm={2}>
          <div
            className="question-score-div"
            style={{
              color: defineColor(
                Math.round(question.score),
                props.upper,
                props.lower
              ),
            }}
          >
            {`${Math.round(question.score)}%`}
          </div>
        </Grid>
      </Grid>
    </div>
  ));
  return questionList;
}

function MyExpand() {
  return (
    <img
      alt=""
      className="seta"
      src={require('../../assets/icons/chevron-right.svg')}
    />
  );
}

function MyCollapse() {
  return (
    <img
      alt=""
      className="seta"
      src={require('../../assets/icons/chevron-down.svg')}
    />
  );
}

class NestedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      upper: props.upper,
      lower: props.lower,
    };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.questions !== this.props.questions) {
      this.setState({ questions: this.props.questions });
    }
  }

  defineWhichSmiley(score) {
    if (score >= this.props.upper) return 'bom';
    if (score >= this.props.lower) return 'medio';
    return 'ruim';
  }

  defineColor(score) {
    if (score >= this.props.upper) return '#52AD8C';
    if (score >= this.props.lower) return '#ECC15F';
    return '#C86D61';
  }

  handleClick = e => {
    captureEvent('handleQuestionQualityExpanse');
    this.setState({ [e]: !this.state[e] });
  };

  render() {
    const { classes, intl } = this.props;
    const steps = this.props.questions;
    translate(intl);

    const itemSteps = steps.map(step => (
      <div>
        <div button onClick={this.handleClick.bind(this, step.id)}>
          <div className="step-card">
            <Grid container spacing={2}>
              <Grid item xs={10} sm={10}>
                <div className="left-div">
                  {this.state[step.id] ? <MyCollapse /> : <MyExpand />}
                  <div className="etapa-div">
                    <div className="step-div">{stepLabel}</div>
                    <div className="step">{step.name}</div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={2} sm={2}>
                <div className="outside-score-div">
                  <img
                    className="smiley"
                    alt=""
                    src={require(`../../assets/icons/icon_${this.defineWhichSmiley(
                      Math.round(step.score)
                    )}.svg`)}
                  />
                  <div className="score-div">
                    <div className="media-div">
                      <div
                        className="media-text"
                        style={{
                          color: this.defineColor(Math.round(step.score)),
                        }}
                      >
                        {averageLabel}
                      </div>
                      <div
                        className="media-value"
                        style={{
                          color: this.defineColor(Math.round(step.score)),
                        }}
                      >
                        {`${Number(Math.round(step.score)).toFixed(0)}%`}
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <Collapse
          in={this.state[step.id]}
          timeout="auto"
          unmountOnExit
          key={step.id}
        >
          <QuestionList
            questions={step.questions}
            upper={this.props.upper}
            lower={this.props.lower}
          />
        </Collapse>
      </div>
    ));

    return (
      <List component="nav" className={classes.root}>
        {itemSteps}
      </List>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const StyledNestedList = (props) => {
  const classes = makeStyles(styles);

  return (
    <NestedList classes={{ ...classes }} {...props} />
  )
}

export default injectIntl(StyledNestedList);
