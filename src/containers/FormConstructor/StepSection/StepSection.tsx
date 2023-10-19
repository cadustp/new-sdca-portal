import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { v4 as uuid } from 'uuid';
import { Fab, Tooltip } from '@mui/material';
import {
  Add, SubdirectoryArrowRight, DeleteOutline, FileCopy,
} from '@mui/icons-material';
import { captureEvent } from '../../../analytics';
import { Step, StepErrors } from '../../../redux/forms/types';
import RequiredFieldErrorText from '../../../components/shared/RequiredFieldErrorText';

import { Container, CssTextField } from './styles';
import QuestionSection from '../QuestionSection';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  key: any,
  stepOrder: number,
  stepErrors: StepErrors,
  steps: Array<Step>,
  step: Step,
  calcResult: boolean,
};

type DispatchProps = {
  setStepTitle: Function;
  createNewStep: Function;
  handleMoveStepModal: Function;
  handleDeleteStepModal: Function;
  duplicateStep: Function;
  deleteStep: Function;
};

const variants = {
  hidden: {
    y: -40,
    scale: 0.8,
    transition: {
      type: 'spring',
      damping: 20,
    },
  },
  visible: {
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      when: 'beforeChildren',
      damping: 20,
    },
  },
};

const StepSection: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  key,
  stepOrder,
  stepErrors,
  step,
  steps,
  setStepTitle,
  calcResult,
  createNewStep,
  handleMoveStepModal,
  handleDeleteStepModal,
  duplicateStep,
  deleteStep,
}) => {
  const [title, setTitle] = useState(steps[stepOrder]?.title ?? '');
  const stepQuestions = steps[stepOrder]?.questions ?? [];
  const hasSingleStep = steps.length <= 1;
  const hasSingleQuestion = stepQuestions.length <= 1;

  const totalStepPoints = () => {
    const decimalPrecisionSum = stepQuestions.reduce(
      (total, current) => +total + +current.points,
      0,
    );

    const totalSum = +decimalPrecisionSum.toFixed(8);
    return totalSum;
  };

  const handleDelete = () => {
    if (stepQuestions.length > 1) {
      handleDeleteStepModal({ title, index: stepOrder });
    } else {
      captureEvent('deleteStep');
      deleteStep({
        stepIndex: stepOrder,
      });
    }
  };

  const handleDuplicateStep = () => {
    const duplicatedStep = ({
      ...step,
      title: `${step.title} - ${intl.messages['utils.copy']}`,
      id: undefined,
      key: `question-${uuid()}`,
      order: undefined,
      questions: step.questions.map(question => ({
        ...question,
        key: `question-${uuid()}`,
        id: undefined,
        answerOptions: question.answerOptions.map(answerOption => ({
          ...answerOption, key: `question-${uuid()}`, id: undefined,
        })),
      })),
    });
    duplicateStep({
      stepIndex: stepOrder,
      duplicatedStep,
    });
  };

  const renderQuestions = stepQuestions.map((question, index) => (
    <QuestionSection
      question={question}
      questionOrder={index}
      stepOrder={stepOrder}
      hasSingleStep={hasSingleStep}
      hasSingleQuestion={hasSingleQuestion}
      key={question.key}
    />
  ));

  return (
    <motion.div
      key={`motion-actions-step-${key}`}
      initial="hidden"
      animate="visible"
      variants={variants}
      exit={{
        opacity: 0,
      }}
    >
      <Container className={stepErrors?.title ? 'invalid' : ''}>
        {stepErrors?.title && (
          <span className="title-error">
            <RequiredFieldErrorText />
          </span>
        )}
        <header className="step-header">
          <div className="text-wrapper">
            <div className="step">
              {`${intl.messages['forms.step']} ${stepOrder + 1} `}
            </div>
            <CssTextField
              fullWidth
              placeholder={stepErrors?.title
                ? `*${intl.messages['forms.edit.step.deleteModal.label']}`
                : intl.messages['forms.edit.step.placeholder.title']}
              onBlur={() => setStepTitle({ stepOrder, title })}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          {calcResult && (
            <div className="points">
              {`${totalStepPoints()} ${intl.messages['forms.edit.points']}`}
            </div>
          )}
          <div className="drag" />
        </header>
        <div className="step-actions">
          <div className="step-actions-row">
            <Tooltip
              title={intl.messages['forms.edit.step.new']}
              placement="top"
            >
              <Fab onClick={() => {
                createNewStep({ index: stepOrder });
                captureEvent('createNewStep');
              }}
              >
                <Add />
              </Fab>
            </Tooltip>
            <Tooltip
              title={intl.messages['forms.edit.step.duplicate']}
              placement="top"
            >
              <Fab
                onClick={() => {
                  handleDuplicateStep();
                  captureEvent('duplicateStep');
                }}
              >
                <FileCopy />
              </Fab>
            </Tooltip>
          </div>
          <div className="step-actions-row">
            <Tooltip
              title={intl.messages['forms.edit.step.move']}
              placement="top"
            >
              <Fab
                disabled={hasSingleStep}
                onClick={() => {
                  handleMoveStepModal({ index: stepOrder });
                  captureEvent('openMoveStep');
                }}
              >
                <SubdirectoryArrowRight />
              </Fab>
            </Tooltip>
            <Tooltip
              title={intl.messages['forms.edit.step.delete']}
              placement="top"
            >
              <Fab
                disabled={hasSingleStep}
                onClick={() => handleDelete()}
              >
                <DeleteOutline />
              </Fab>
            </Tooltip>
          </div>
        </div>
        <div className="questions">
          <AnimatePresence>{renderQuestions}</AnimatePresence>
        </div>
      </Container>
    </motion.div>
  );
};

export default injectIntl(StepSection);
