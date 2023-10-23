import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import SwipeableViews from 'react-swipeable-views-v18';

import '../../styles.css';
import { CHOOSE_QUESTION_TYPE_MODAL_OPTION, QUESTION_FIELDS, SELECTION_TYPES } from '../../../../helpers/consts';
import { ReactComponent as AlertSVG } from '../../../../assets/icons/alert.svg';
import { AlertContainer } from '../../QuestionSection/styles';
import CustomAlert from '../../../../components/CustomAlert';
import { captureEvent } from '../../../../analytics';
import CustomModal from '../../../../components/CustomModal';
import AnswerTypeList from './AnswerTypeList/AnswerTypeList';

type Props = {
  intl: {
    messages: [];
    locale: string,
  };
};

type StateProps = {
  open: boolean,
  answersType: any,
  stepIndex: number,
  questionIndex: number,
  answerType: number,
};

type DispatchProps = {
  onClose: Function;
  selectAnswerType: Function;
  selectType: Function;
};

const SelectAnswerType: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  open,
  onClose,
  selectAnswerType,
  answerType,
}) => {
  const [index, setIndex] = useState(CHOOSE_QUESTION_TYPE_MODAL_OPTION.LIST_TYPE);
  const [newAnswerType, setNewAnswerType] = useState(SELECTION_TYPES.NONE);

  const handleConfirm = () => {
    selectAnswerType({
      answerType: newAnswerType,
      field: QUESTION_FIELDS.SELECTION_TYPE,
    });
    setIndex(CHOOSE_QUESTION_TYPE_MODAL_OPTION.LIST_TYPE);
  };

  const handleClose = () => {
    onClose();
    setIndex(CHOOSE_QUESTION_TYPE_MODAL_OPTION.LIST_TYPE);
  };

  return (
    <CustomModal
      title={intl.messages['forms.edit.answerTypesModal.title']}
      open={open}
      onClose={() => {
        handleClose();
        captureEvent('closeAnswerType');
      }}
    >
      <SwipeableViews
        index={index}
        className="swipeable-views"
        onChangeIndex={setIndex}
        style={{ width: '100%' }}
      >
        <AnswerTypeList
          answerType={answerType}
          setNewAnswerType={setNewAnswerType}
          setIndex={setIndex}
          handleConfirm={handleConfirm}
        />
        <AlertContainer>
          <CustomAlert
            title={intl.messages['warning_label.warning']}
            message={intl.messages['forms.edit.answerTypesModal.alert.subTitle']}
            icon={<AlertSVG />}
            onCancel={() => {
              handleClose();
              captureEvent('cancelSelectAnswerType');
            }}
            onConfirm={handleConfirm}
          />
        </AlertContainer>
      </SwipeableViews>
    </CustomModal>
  );
};

export default injectIntl(SelectAnswerType);
