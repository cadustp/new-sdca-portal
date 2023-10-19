import React, { useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { motion } from 'framer-motion';
import { v4 as uuid } from 'uuid';
import {
  Button, TextField,
  IconButton,
} from '@material-ui/core';
import {
  SubdirectoryArrowRight, Layers, AddCircleOutline, DeleteOutline, BorderColor, PhotoCameraOutlined, Event, ChatBubbleOutline, Filter9Plus,
} from '@material-ui/icons';
import htmlToDraft from 'html-to-draftjs';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { captureEvent } from '../../../analytics';
import { Question } from '../../../redux/forms/types';
import RequiredFieldErrorText from '../../../components/shared/RequiredFieldErrorText';
import ErrorTooltip from '../../../components/shared/ErrorTooltip';
import RichTextEditor from '../../../components/RichTextEditor';
import { QUESTION_FIELDS, SELECTION_TYPES } from '../../../helpers/consts';
import {
  Container, CssTextField, AddButton, AnswerHeader, GenericContainer,
} from './styles';
import MultipleAnswers from './MultipleAnswers';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  question: Question,
  questionOrder: number,
  stepOrder: number,
  hasSingleStep: boolean,
  hasSingleQuestion: boolean,
  key: any,
  calcResult: boolean,
};

type DispatchProps = {
  editQuestionField: Function;
  addNewQuestion: Function;
  duplicateQuestion: Function;
  deleteQuestion: Function;
  handleMoveQuestionModal: Function;
  handleAnswerTypeModal: Function;
};

const questionAnimation = {
  hidden: {
    scale: 0.9,
    y: -40,
    transition: {
      type: 'spring',
    },
  },
  visible: {
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
    },
  },
};

const containerAnimation = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' },
  },
};

const typesWithScore = [
  SELECTION_TYPES.SINGLE,
  SELECTION_TYPES.MULTI,
];

const QuestionSection: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  question,
  questionOrder,
  stepOrder,
  hasSingleStep,
  hasSingleQuestion,
  key,
  calcResult,
  editQuestionField,
  addNewQuestion,
  duplicateQuestion,
  deleteQuestion,
  handleMoveQuestionModal,
  handleAnswerTypeModal,
}) => {
  const [points, setPoints] = useState(question.points);
  const [obsEditor, setObsEditor] = useState(() => {
    const blocksFromHtml = htmlToDraft(question.observations);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap,
    );
    return EditorState.createWithContent(contentState);
  });

  const questionSelectionType = question.selectionType ?? SELECTION_TYPES.NONE;

  const hasPoints = calcResult && typesWithScore.includes(Number(question.selectionType));

  const handleDuplicateQuestion = () => {
    const duplicatedQuestion = { ...question };
    duplicatedQuestion.key = `question-${uuid()}`;
    duplicatedQuestion.id = undefined;

    if (duplicatedQuestion.answerOptions.length > 0) {
      duplicatedQuestion.answerOptions = duplicatedQuestion.answerOptions.map(option => ({
        ...option,
        key: `answer-option-${uuid()}`,
        id: undefined,
      }));
    }

    duplicateQuestion({
      stepIndex: stepOrder,
      questionIndex: questionOrder,
      duplicatedQuestion,
    });
  };

  const handleUpdatePoints = value => {
    let newPoints = value;
    if (value > 0) { newPoints = Math.abs(value).toString(); }
    setPoints(newPoints);
  };

  const handleUpdateOnBlur = () => {
    if (points === question.points) return;
    editQuestionField({
      stepIndex: stepOrder,
      questionIndex: questionOrder,
      field: QUESTION_FIELDS.POINTS,
      value: points,
    });
    captureEvent('setQuestionPoints');
  };

  const questionHeader = () => (
    <div className="question-header">
      <h3>
        {`${intl.messages['forms.question']} ${questionOrder + 1} `}
      </h3>
      {hasPoints && (
      <ErrorTooltip open={question.errors.points}>
        <div
          className={`points ${question.errors.points ? 'invalid' : ''}`}
        >
          <CssTextField
            value={points}
            placeholder="0"
            type="number"
            onChange={e => { handleUpdatePoints(e.target.value); }}
            onBlur={() => handleUpdateOnBlur()}
          />
          <span>{intl.messages['forms.edit.points']}</span>
        </div>
      </ErrorTooltip>
      )}
      <div className="drag" />
    </div>
  );

  const questionArea = () => (
    <>
      <h4 className={`${question.errors?.question ? 'invalid' : ''}`}>
        {question.errors?.question && '*'}
        {intl.messages['forms.question']}
      </h4>
      {question.errors.question && <RequiredFieldErrorText />}
      <TextField
        tabIndex={1}
        className={`input ${question.errors?.question ? 'invalid' : ''}`}
        placeholder={intl.messages['forms.edit.question.question.placeholder']}
        type="text"
        autoFocus={!question.id}
        variant="outlined"
        rows={2}
        rowsMax={2}
        defaultValue={question.question}
        fullWidth
        multiline
        onBlur={e => editQuestionField({
          stepIndex: stepOrder,
          questionIndex: questionOrder,
          field: QUESTION_FIELDS.QUESTION,
          value: e.target.value,
        })}
      />
    </>
  );

  const observationArea = () => (
    <>
      <h4>
        {intl.messages['forms.edit.question.observationPoints']}
      </h4>
      <div style={{ marginBottom: 32 }}>
        <RichTextEditor
          editorState={obsEditor}
          setEditorState={setObsEditor}
          placeholder={intl.messages['forms.edit.question.observationPoints']}
          onBlur={() => {
            editQuestionField({
              stepIndex: stepOrder,
              questionIndex: questionOrder,
              field: QUESTION_FIELDS.OBSERVATIONS,
              value: draftToHtml(convertToRaw(obsEditor.getCurrentContent())),
            });
            captureEvent('setQuestionObservationPoints');
          }}
        />
      </div>
    </>
  );

  const questionFooter = () => (
    <footer>
      <Button
        onClick={() => {
          addNewQuestion({
            stepIndex: stepOrder,
            questionIndex: questionOrder,
          });
          captureEvent('addNewQuestion');
        }}
        disableRipple
        size="small"
      >
        <AddCircleOutline />
        {intl.messages['forms.edit.question.create']}
      </Button>
      <span className="vertical-divider" />
      <Button
        onClick={() => {
          handleMoveQuestionModal({
            stepIndex: stepOrder,
            questionIndex: questionOrder,
          });
          captureEvent('openMoveQuestion');
        }}
        disabled={hasSingleStep && hasSingleQuestion}
        disableRipple
        size="small"
      >
        <SubdirectoryArrowRight />
        {intl.messages['forms.edit.question.move']}
      </Button>
      <span className="vertical-divider" />
      <Button
        onClick={() => {
          handleDuplicateQuestion();
          captureEvent('duplicateQuestion');
        }}
        disableRipple
        size="small"
      >
        <Layers />
        {intl.messages['forms.edit.question.duplicate']}
      </Button>
      <span className="vertical-divider" />
      <Button
        onClick={() => {
          deleteQuestion({
            stepIndex: stepOrder,
            questionIndex: questionOrder,
          });
          captureEvent('deleteQuestion');
        }}
        disableRipple
        size="small"
        disabled={hasSingleQuestion}
      >
        <DeleteOutline />
        {intl.messages['forms.edit.question.delete']}
      </Button>
    </footer>
  );

  const renderTypeIcon = () => {
    switch (questionSelectionType) {
      case SELECTION_TYPES.IMAGE:
        return (
          <>
            <PhotoCameraOutlined />
            {intl.messages['forms.edit.imageType.description']}
          </>
        );
      case SELECTION_TYPES.DATE:
        return (
          <>
            <Event />
            {intl.messages['forms.edit.date.description']}
          </>
        );
      case SELECTION_TYPES.FREE_TEXT:
        return (
          <>
            <ChatBubbleOutline />
            {intl.messages['forms.edit.freeText.description']}
          </>
        );
      case SELECTION_TYPES.NUMERIC:
        return (
          <>
            <Filter9Plus />
            {intl.messages['forms.edit.numeric.description']}
          </>
        );
      default:
        return <></>;
    }
  };

  const renderQuestion = () => {
    if (questionSelectionType === SELECTION_TYPES.NONE) {
      return (
        <ErrorTooltip open={question.errors.selectionType}>
          <AddButton
            invalid={question.errors.selectionType}
            onClick={() => {
              handleAnswerTypeModal({
                stepIndex: stepOrder,
                questionIndex: questionOrder,
                answerType: SELECTION_TYPES.NONE,
              });
              captureEvent('openAnswerTypeAdd', { kind: 'new' });
            }}
          >
            <AddCircleOutline />
            {intl.messages['forms.edit.addQuestionType']}
          </AddButton>
        </ErrorTooltip>
      );
    }
    if (typesWithScore.includes(Number(questionSelectionType))) {
      return (
        <MultipleAnswers
          onIconClick={() => handleAnswerTypeModal({
            stepIndex: stepOrder,
            questionIndex: questionOrder,
            answerType: questionSelectionType,
          })}
          stepIndex={stepOrder}
          questionIndex={questionOrder}
          hasPoints={hasPoints}
          answerOptions={question.answerOptions}
          answerTotalError={questionSelectionType === SELECTION_TYPES.MULTI ? question.errors.answerOptionsTotal : null}
        />
      );
    }
    return (
      <>
        <AnswerHeader>
          <div className="header-answer">
            <h4 className="center no-margin">
              {intl.messages['forms.edit.question.answers']}
            </h4>
            <IconButton
              onClick={() => {
                handleAnswerTypeModal({
                  stepIndex: stepOrder,
                  questionIndex: questionOrder,
                  answerType: questionSelectionType,
                });
                captureEvent('openAnswerTypeEdit', { kind: 'update' });
              }}
              disableRipple
            >
              <BorderColor fontSize="small" style={{ width: '16px' }} />
            </IconButton>
          </div>
        </AnswerHeader>
        <motion.div variants={containerAnimation} initial="hidden" animate="visible">
          <GenericContainer>{renderTypeIcon()}</GenericContainer>
        </motion.div>
      </>
    );
  };

  return (
    <>
      <motion.div
        key={key}
        initial="hidden"
        animate="visible"
        variants={questionAnimation}
        exit={{
          scale: 0,
          opacity: 0,
          transition: {
            type: 'tween',
          },
        }}
      >
        <Container>
          <div className="question-content">
            {questionHeader()}
            <article>
              {questionArea()}
              {observationArea()}
              {renderQuestion()}
            </article>
          </div>
          {questionFooter()}
        </Container>
      </motion.div>
    </>
  );
};

export default injectIntl(QuestionSection);
