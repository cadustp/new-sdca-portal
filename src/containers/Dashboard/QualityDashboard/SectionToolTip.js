import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';

let toolTipLabel = '';

function translate(intl) {
  toolTipLabel = intl.formatMessage({
    id: 'selection_tool_tip.tool_tip',
    defaultMessage:
      "tooltipAlertCircle: 'Ao selecionar um formulário da lista do gráfico “Qualidade por formulário e etapas”, esta filtragem será replicada nos demais gráficos: Qualidade por avalido e Média por perguntas.'",
  });

  defineMessages({
    toolTipLabel: {
      id: 'selection_tool_tip.tool_tip',
      defaultMessage:
        'Ao selecionar um formulário da lista do gráfico “Qualidade por formulário e etapas”, esta filtragem será replicada nos demais gráficos: Qualidade por avalido e Média por perguntas.',
    },
  });
}

function arrowGenerator() {
  const color = '#333333';
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      marginLeft: '6em',
      width: '5em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
  };
}

const styles = theme => ({
  lightTooltip: {
    backgroundColor: '#333333',
    color: '#FFFFFF',
    boxShadow: theme.shadows[5],
    fontSize: 12,
    fontWeight: 500,
    padding: '20px',
  },
  arrowPopper: arrowGenerator(),
  arrow: {
    position: 'absolute',
    fontSize: 7,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  bootstrapTooltip: {
    backgroundColor: theme.palette.common.black,
  },
});

class SectionToolTip extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    const { intl } = this.props;
    translate(intl);

    const { classes } = this.props;
    return (
      <Tooltip
        placement="bottom"
        title={(
          <React.Fragment>
            {toolTipLabel}
            <span className={classes.arrow} ref={this.handleArrowRef} />
          </React.Fragment>
        )}
        classes={{ popper: classes.arrowPopper, tooltip: classes.lightTooltip }}
        PopperProps={{
          popperOptions: {
            modifiers: {
              arrow: {
                enabled: Boolean(this.state.arrowRef),
                element: this.state.arrowRef,
              },
            },
          },
        }}
      >
        <img
          src={require('../../../assets/icons/alert-circle.svg')}
          alt="alert-icon"
        />
      </Tooltip>
    );
  };
}

SectionToolTip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectIntl(withStyles(styles)(SectionToolTip));
