import React from 'react';
import { injectIntl } from 'react-intl';
import { motion } from 'framer-motion';
import {
  Button,
  IconButton,
} from '@mui/material';
import {
  AddCircleOutline, BorderColor,
} from '@mui/icons-material';
import { captureEvent } from '../../../../analytics';
import { Answer } from '../../../../redux/forms/types';
import ErrorTooltip from '../../../../components/shared/ErrorTooltip';
import AnswerOption from './AnswerOption/AnswerOption';
import {
  ItemsVariants,
  SectionVariants,
} from '../../../../assets/constants';
import { SELECTION_TYPES } from '../../../../helpers/consts';
import {
  Option, AnswerHeader,
} from '../styles';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  hasPoints: boolean,
  isMulti: boolean,
  answerTotalError: boolean,
  answerOptions: Array<Answer>,
  stepIndex: number,
  questionIndex: number,
};

type DispatchProps = {
  editQuestionField: Function;
  addAnswerOption: Function;
  onIconClick: Function;
  deleteAnswerOption: Function;
  editAnswerOption: Function;
  moveOption: Function;
};

const MultipleAnswers: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  hasPoints,
  isMulti,
  answerOptions,
  answerTotalError,
  stepIndex,
  questionIndex,
  addAnswerOption,
  onIconClick,
  deleteAnswerOption,
  editAnswerOption,
  moveOption,
}) => {
  const checkTotalPoints = (hasPoints && isMulti);
  const weight = answerOptions.reduce((t, o) => t + Number(o.weight), 0);
  const totalError = weight !== 100;
  const showError = answerTotalError && totalError;
  const selectionType = isMulti ? SELECTION_TYPES.MULTI : SELECTION_TYPES.SINGLE;

  const answerHeader = () => (
    <motion.div variants={ItemsVariants} className="section header-wrapper">
      <AnswerHeader>
        <div className="header-answer">
          <h4 className="center no-margin">
            {intl.messages['forms.edit.question.answers']}
          </h4>
          <IconButton
            onClick={() => {
              onIconClick();
              captureEvent('openAnswerTypeEdit', { kind: 'update' });
            }}
            disableRipple
          >
            <BorderColor fontSize="small" style={{ width: '16px' }} />
          </IconButton>
        </div>
      </AnswerHeader>
      {checkTotalPoints
        && (
        <ErrorTooltip
          open={showError}
          message={intl.messages['forms.edit.totalError']}
        >
          <div className={`total-label ${totalError && 'invalid'}`}>
            {`${intl.messages['forms.edit.totalError']} ${weight}%`}
          </div>
        </ErrorTooltip>
        )}
    </motion.div>
  );

  const renderOptions = () => (
    answerOptions.map((option, index) => (
      <AnswerOption
        key={option.key}
        option={option}
        optionsAmount={answerOptions?.length}
        optionIndex={index}
        questionIndex={questionIndex}
        stepIndex={stepIndex}
        selectionType={Number(selectionType)}
        hasPoints={hasPoints}
        deleteAnswerOption={op => { deleteAnswerOption(op); }}
        editAnswerOption={editAnswerOption}
        moveOption={moveOption}
      />
    ))
  );

  const answerFooter = () => (
    <motion.div variants={ItemsVariants} className="add-answer-types">
      <Button
        onClick={() => {
          addAnswerOption({ stepIndex, questionIndex });
          captureEvent('addNewAnswerOption');
        }}
        disableRipple
        variant="text"
      >
        <AddCircleOutline />
        {intl.messages['forms.edit.answerOptionsTypes.create']}
      </Button>
    </motion.div>
  );

  return (
    <>
      <Option>
        <motion.div initial="hidden" animate="visible" variants={SectionVariants}>
          {answerHeader()}
          {renderOptions()}
          {answerFooter()}
        </motion.div>
      </Option>
    </>
  );
};

export default injectIntl(MultipleAnswers);
