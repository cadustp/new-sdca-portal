import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Box } from '@material-ui/core';
import SelectInput from '../../../../components/SelectInput';
import CustomModal from '../../../../components/CustomModal';
import '../../styles.css';
import { Step } from '../../../../redux/forms/types';
import { captureEvent } from '../../../../analytics';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  open: boolean,
  questionIndex: number,
  stepIndex: number,
  steps: Array<Step>,
};

type DispatchProps = {
  onClose: Function;
  moveQuestion: Function;
  deleteStep: Function;
};

const MoveQuestion: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  open,
  questionIndex,
  stepIndex,
  steps,
  onClose,
  moveQuestion,
  deleteStep,
}) => {
  const [newStepPosition, setNewStepPosition] = useState<any>(null);
  const [stepPositions, setStepPositions] = useState([]);
  const [newQuestionPosition, setNewQuestionPosition] = useState<any>(null);
  const [questionPositions, setQuestionPositions] = useState([]);

  const confirmDisabled = (
    (newStepPosition?.value === stepIndex
    && newQuestionPosition?.value === questionIndex)
    || newStepPosition === null
    || newQuestionPosition === null
  );

  const generateList = content => content.map((_, idx) => ({ label: idx + 1, value: idx }));

  useEffect(() => {
    if (steps) {
      setStepPositions(generateList(steps));
    };
  }, [steps]);

  useEffect(() => {
    if (newStepPosition) {
      setNewQuestionPosition(null);
      setQuestionPositions(generateList(steps[newStepPosition.value]?.questions));
    };
  }, [newStepPosition]);

  const handleClearPositions = () => {
    setNewStepPosition(null);
    setNewQuestionPosition(null);
    setQuestionPositions([]);
  };

  const onConfirm = () => {
    const hasSingleQuestion = steps[stepIndex]?.questions?.length === 1;

    moveQuestion({
      questionIndex,
      newQuestionPosition,
      stepIndex,
      newStepPosition,
    });

    if (hasSingleQuestion) {
      deleteStep({
        stepIndex,
      });
    };

    captureEvent('moveQuestion', {
      currentPosition: questionIndex + 1,
      currentStep: stepIndex + 1,
      newPositon: newQuestionPosition + 1,
      newStep: newStepPosition + 1,
    });
    handleClearPositions();
  };

  const handleClose = () => {
    handleClearPositions();
    onClose();
  };

  return (
    <>
      <CustomModal
        title={intl.messages['forms.edit.question.move']}
        open={open}
        onClose={() => { handleClose(); }}
        centerTitle
        disableBackdropClick
        overflowVisible
      >
        <>
          <Box>
            <Box display="flex" flexDirection="column" alignItems="center" my="40px">
              <p>
                {intl.messages['forms.edit.position.select_placeholder']}
              </p>
            </Box>
            <Box>
              <div className="sd-input-container">
                <SelectInput
                  placeholder={intl.messages['forms.edit.step.select_placeholder']}
                  onChange={position => setNewStepPosition(position)}
                  items={stepPositions}
                  selectedItems={newStepPosition}
                />
              </div>
              <div className="sd-input-container">
                <SelectInput
                  placeholder={intl.messages['forms.edit.position.select_placeholder']}
                  onChange={position => setNewQuestionPosition(position)}
                  items={questionPositions}
                  selectedItems={newQuestionPosition}
                />
              </div>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" gridGap="1.5rem" className="modal-footer">
            <Button
              onClick={() => { handleClose(); }}
              variant="outlined"
            >
              {intl.messages['utils.cancel']}
            </Button>
            <Button
              onClick={() => { onConfirm(); }}
              variant="contained"
              disabled={confirmDisabled}
            >
              {intl.messages['utils.confirm']}
            </Button>
          </Box>
        </>
      </CustomModal>
    </>
  );
};

export default injectIntl(MoveQuestion);
