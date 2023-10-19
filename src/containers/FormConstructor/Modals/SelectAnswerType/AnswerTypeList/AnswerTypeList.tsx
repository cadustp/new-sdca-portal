import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button } from '@material-ui/core';
import {
  PhotoCameraOutlined, Done, DoneAll, Event, ChatBubbleOutline, Filter9Plus, AddCircleOutline,
} from '@material-ui/icons';
import { captureEvent } from '../../../../../analytics';
import { ANSWER_TYPES_LIST, CHOOSE_QUESTION_TYPE_MODAL_OPTION, SELECTION_TYPES } from '../../../../../helpers/consts';
import { ListContainer, List, OptionContainer } from '../../../QuestionSection/styles';
import '../../../styles.css';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  answerType: number,
};

type DispatchProps = {
  setNewAnswerType: Function;
  setIndex: Function;
  handleConfirm: Function;
};

const typesWithOptions = [
  SELECTION_TYPES.SINGLE,
  SELECTION_TYPES.MULTI,
];

const AnswerTypeList: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  answerType,
  setNewAnswerType,
  setIndex,
  handleConfirm,
}) => {
  const [selectedAnswerType, setSelectedAnswerType] = useState<any>(null);

  const onClick = () => {
    const willLoseOptions = typesWithOptions.includes(answerType) && !typesWithOptions.includes(selectedAnswerType);

    if (willLoseOptions) {
      captureEvent('updateAnswerTypeWarning');
      setIndex(CHOOSE_QUESTION_TYPE_MODAL_OPTION.CONFIRM_MESSAGE);
    } else {
      handleConfirm();
    }
  };

  const updateAnswerType = selected => {
    setSelectedAnswerType(selected);
    setNewAnswerType(selected);
  };

  const TypeIcon = ({ answerType }) => {
    switch (answerType) {
      case SELECTION_TYPES.IMAGE:
        return <PhotoCameraOutlined />;
      case SELECTION_TYPES.MULTI:
        return <DoneAll />;
      case SELECTION_TYPES.SINGLE:
        return <Done />;
      case SELECTION_TYPES.RANGE:
        return <AddCircleOutline />;
      case SELECTION_TYPES.DATE:
        return <Event />;
      case SELECTION_TYPES.FREE_TEXT:
        return <ChatBubbleOutline />;
      case SELECTION_TYPES.NUMERIC:
        return <Filter9Plus />;
      default:
        return <></>;
    }
  };

  return (
    <ListContainer>
      <p>{intl.messages['forms.edit.answerTypesModal.subTitle']}</p>
      <List>
        {ANSWER_TYPES_LIST.TYPES.map(type => (
          <OptionContainer
            className={answerType === type.type ? 'disabled' : ''}
            selected={selectedAnswerType === type.type}
            onClick={() => { if (answerType !== type.type) updateAnswerType(type.type); }}
          >
            <div className="icon">
              <div className="box"><TypeIcon answerType={type.type} /></div>
            </div>
            <div className="description">
              <h4>{intl.messages[type.title]}</h4>
              <p>{intl.messages[type.description]}</p>
            </div>
          </OptionContainer>
        ))}
      </List>
      <footer className="buttons">
        <Button
          onClick={onClick}
          variant="contained"
          color="primary"
          disabled={selectedAnswerType === null}
        >
          {intl.messages['utils.save']}
        </Button>
      </footer>
    </ListContainer>
  );
};

export default injectIntl(AnswerTypeList);
