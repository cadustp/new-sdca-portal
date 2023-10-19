import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { motion } from 'framer-motion';
import {
  Button, TextField,
  Tooltip,
  Fab,
  Switch,
  AccordionDetails,
  makeStyles,
} from '@mui/material';
import {
  ArrowUpward,
  MoreVert,
  FlipToFront,
  DeleteOutline,
  ArrowDownward,
  Settings,
  ExpandMore,
} from '@mui/icons-material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import RequiredFieldErrorText from '../../../../../components/shared/RequiredFieldErrorText';
import ErrorTooltip from '../../../../../components/shared/ErrorTooltip';
import { captureEvent } from '../../../../../analytics';
import { Answer } from '../../../../../redux/forms/types';
import {
  ItemsVariants,
} from '../../../../../assets/constants';
import { StyledMenu, MenuItem } from '../../styles';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  hasPoints: boolean,
  option: Answer,
  optionIndex: number,
  questionIndex: number,
  stepIndex: number,
  optionsAmount: number,
};

type DispatchProps = {
  editAnswerOption: Function;
  deleteAnswerOption: Function;
  moveOption: Function;
};

const Accordion = makeStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = makeStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AnswerOption: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  option,
  hasPoints,
  optionsAmount,
  editAnswerOption,
  optionIndex,
  questionIndex,
  stepIndex,
  deleteAnswerOption,
  moveOption,
}) => {
  const [expandedMove, setExpandedMove] = useState(true);
  const [expandSettings, setExpandSettings] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [weight, setWeight] = useState(option.weight);
  const hasErrors = option.errors.answer;
  const hasWeightErrors = option.errors.weight;

  const handleEditOption = (field, value) => {
    editAnswerOption({
      questionIndex,
      stepIndex,
      optionIndex,
      field,
      value,
    });
  };

  const formatWeight = value => {
    const maxPercentage = 100;
    if (value === null || value === '') return '';
    const formattedWeight = Math.abs(Math.round(value));
    return (formattedWeight > maxPercentage ? maxPercentage : formattedWeight).toString();
  };

  const handleWeight = e => {
    const value = formatWeight(e.target.value);
    setWeight(value);
  };

  const handleWeightBlur = e => {
    if (e.target.value === option.weight) return;

    handleWeight(e);
    handleEditOption('weight', weight);
  };

  const openOptionMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleKnockOut = (isChecked, knockForm) => {
    let field = knockForm ? 'is_knockout_form' : 'is_knockout_step';
    handleEditOption(field, isChecked);
    if (isChecked) {
      field = knockForm ? 'is_knockout_step' : 'is_knockout_form';
      handleEditOption(field, !isChecked);
    }
    captureEvent(knockForm ? 'knockOutForm' : 'knockOutStep', { set: isChecked });
  };

  const Item = ({
    title,
    description,
    value,
    onChange,
    disabled = false,
  }) => (
    <MenuItem className="menu-item">
      <div className={disabled ? 'text text--disabled' : 'text'}>
        <strong className="title">{title}</strong>
        <p className="description">{description}</p>
      </div>
      <div>
        <Switch
          color="primary"
          disabled={disabled}
          onChange={onChange}
          value={value}
          checked={value}
        />
      </div>
    </MenuItem>
  );

  return (
    <motion.div
      key={option.key}
      variants={ItemsVariants}
      className={`section ${hasPoints ? '' : 'does-not-have-weight'}`}
    >
      <div className="answer">
        {hasErrors && <RequiredFieldErrorText />}
        <TextField
          name="option"
          className={`input ${hasErrors ? 'invalid' : ''}`}
          type="text"
          variant="outlined"
          fullWidth
          placeholder={intl.messages['forms.edit.answerOptionsTypes.option.placeholder']}
          defaultValue={option.answer}
          onBlur={e => handleEditOption('answer', e.target.value)}
        />
      </div>
      {hasPoints && (
        <div className={`total ${hasErrors ? 'answer-invalid' : ''}`}>
          <ErrorTooltip open={hasWeightErrors}>
            <TextField
              name="weight"
              className={`input center ${hasWeightErrors ? 'invalid' : ''}`}
              type="number"
              variant="outlined"
              fullWidth
              placeholder={intl.messages['forms.edit.answerOptionsTypes.weight.placeholder']}
              value={weight}
              onChange={handleWeight}
              onBlur={handleWeightBlur}
            />
          </ErrorTooltip>
        </div>
      )}
      <div className="actions">
        <Tooltip title={intl.messages['forms.edit.answerTypes.delete']} placement="top">
          <Fab
            className="delete"
            disabled={optionsAmount === 1}
            onClick={() => {
              captureEvent('deleteAnswerOption');
              deleteAnswerOption({
                optionIndex,
                questionIndex,
                stepIndex,
              });
            }}
            disableRipple
          >
            <DeleteOutline />
          </Fab>
        </Tooltip>
        <Tooltip title={intl.messages['forms.edit.answerTypes.actions']} placement="top">
          <Fab
            onClick={openOptionMenu}
            disableRipple
          >
            <MoreVert />
          </Fab>
        </Tooltip>
        <StyledMenu
          id={`contextual-menu-forms-${option.key}`}
          disableScrollLock
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            style: {
              width: 360,
              padding: 0,
            },
          }}
        >
          <div>
            <Accordion
              expanded={expandedMove}
              onChange={() => setExpandedMove(!expandedMove)}
              className="menu-question-options"
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                className="menu-title"
              >
                <FlipToFront />
                <p>{intl.messages['forms.edit.answerOptionsTypes.question.move.title']}</p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="menu-itens">
                  <div className="menu-item move">
                    <Button
                      disabled={optionIndex === 0}
                      onClick={() => {
                        moveOption({
                          optionIndex,
                          questionIndex,
                          stepIndex,
                          move: (optionIndex - 1),
                        });
                        captureEvent('moveAnswerOptionUp');
                      }}
                    >
                      <ArrowUpward />
                      <p className="description">{intl.messages['forms.edit.answerOptionsTypes.question.move.up']}</p>
                    </Button>
                  </div>
                  <div className="menu-item move">
                    <Button
                      disabled={optionIndex === (optionsAmount - 1)}
                      onClick={() => {
                        moveOption({
                          optionIndex,
                          questionIndex,
                          stepIndex,
                          move: (optionIndex + 1),
                        });
                        captureEvent('moveAnswerOptionUp');
                      }}
                    >
                      <ArrowDownward />
                      <p className="description">{intl.messages['forms.edit.answerOptionsTypes.question.move.down']}</p>
                    </Button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expandSettings}
              onChange={() => setExpandSettings(!expandSettings)}
              className="menu-question-options"
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                className="menu-title"
              >
                <Settings />
                <p>{intl.messages['forms.edit.answerOptionsTypes.question.option.title']}</p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="menu-itens">
                  <Item
                    title={intl.messages['forms.new.answers.form_knockout.title']}
                    description={intl.messages['forms.new.answers.form_knockout.description']}
                    value={option.is_knockout_form}
                    onChange={(_, isChecked) => handleKnockOut(isChecked, true)}
                    disabled={option.is_knockout_step}
                  />
                  <Item
                    title={intl.messages['forms.new.answers.step_knockout.title']}
                    description={intl.messages['forms.new.answers.step_knockout.description']}
                    value={option.is_knockout_step}
                    onChange={(_, isChecked) => handleKnockOut(isChecked, false)}
                    disabled={option.is_knockout_form}
                  />
                  <Item
                    title={intl.messages['forms.new.answers.ignore_result.title']}
                    description={intl.messages['forms.new.answers.ignore_result.description']}
                    value={option.shouldDismiss}
                    onChange={(_, isChecked) => {
                      handleEditOption('shouldDismiss', isChecked);
                      captureEvent('ignoreResult', { set: isChecked });
                    }}
                  />
                  <Item
                    title={intl.messages['forms.new.answers.required_comment.title']}
                    description={intl.messages['forms.new.answers.required_comment.description']}
                    value={option.isCommentRequired}
                    onChange={(_, isChecked) => {
                      handleEditOption('isCommentRequired', isChecked);
                      captureEvent('commentRequired', { set: isChecked });
                    }}
                  />
                  <Item
                    title={intl.messages['forms.new.answers.required_image.title']}
                    description={intl.messages['forms.new.answers.required_image.description']}
                    value={option.isImageRequired}
                    onChange={(_, isChecked) => {
                      handleEditOption('isImageRequired', isChecked);
                      captureEvent('imageRequired', { set: isChecked });
                    }}
                  />
                  <Item
                    title={intl.messages['forms.new.answers.required_action_plan.title']}
                    description={intl.messages['forms.new.answers.required_action_plan.description']}
                    value={option.isPlanRequired}
                    onChange={(_, isChecked) => {
                      handleEditOption('isPlanRequired', isChecked);
                      captureEvent('actionPlanRequired', { set: isChecked });
                    }}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </StyledMenu>
      </div>
    </motion.div>
  );
};

export default injectIntl(AnswerOption);
