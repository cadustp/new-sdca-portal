import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { isEmpty } from 'lodash';
import { injectIntl } from 'react-intl';
import CommentsModal from './CommentsModal/index';
import PointsModal from './PointsModal';
import { TQuestion } from '../../../types/reminder';
import { ContextReminderAnswers } from '../../../context/ContextReminderAnswers';
import { ContextPublicAnswers } from '../../../context/ContextPublicAnswers';
import ObservationIcon from '../../../components/shared/Icons/ObservationIcon';
import ImageIcon from '../../../components/shared/Icons/ImageIcon';
import ActionPlanIcon from '../../../components/shared/Icons/ActionPlanIcon';
import CommentIcon from '../../../components/shared/Icons/CommentIcon';
import ImagesModal from './ImagesModal';
import PlansModal from './PlansModal';
import { captureEvent } from '../../../analytics';

type Props = {
  question: TQuestion;
  intl: {
    messages: [];
    formatMessage: Function;
  };
  handleUpdateReminderAnswers: Function;
  setPlan: Function;
  actionPlanUsers: Array<any>;
  isPublic: boolean,
  hasAuth: boolean,
  reminderIsAccomplished: boolean,
};

const ModalsContainer: React.FC<Props> = ({
  question,
  intl,
  isPublic,
  hasAuth,
  reminderIsAccomplished,
  handleUpdateReminderAnswers,
  setPlan,
  actionPlanUsers,
}) => {
  const [modalStatus, setModalStatus] = useState({
    comments: false,
    images: false,
    points: false,
    plan: false,
  });
  const {
    handleSetObservation,
    answerReminder,
  } = useContext(ContextReminderAnswers);

  const {
    setQuestionObservation,
  } = useContext(ContextPublicAnswers);

  const toggleModal = modalToOpen => {
    const modals = {
      comments: () => setModalStatus({ ...modalStatus, comments: !modalStatus.comments }),
      plan: () => setModalStatus({ ...modalStatus, plan: !modalStatus.plan }),
      images: () => setModalStatus({ ...modalStatus, images: !modalStatus.images }),
      points: () => setModalStatus({ ...modalStatus, points: !modalStatus.points }),
    };
    modals[modalToOpen]();
  };
  const handleSetPlan = plan => {
    setPlan({ answerQuestion: question, plan });
    toggleModal('plan');
  };

  // is comment
  const questionObservation = question.answer.observation
    ? question.answer.observation
    : '';

  const plan = question.answer.plan ? question.answer.plan : {};
  const images = question.answer?.images ? question.answer.images : [];

  const handleSetQuestionObservation = observation => {
    if (isPublic) {
      setQuestionObservation({
        answerQuestion: question,
        observation,
      });
    } else {
      handleSetObservation({
        answerQuestion: question,
        observation,
      });
    }
    toggleModal('comments');
  };

  return (
    <Box
      width="100%"
      borderColor="#EBECF0"
      borderTop="1px solid"
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={3}
      mt={4}
    >

      <BottomNavigation style={{ width: '100%' }}>
        {(question.description
          || answerReminder?.reminder.form['pop']
          || answerReminder?.reminder.form['fluxogram']
          || answerReminder?.reminder.form['external_link']) && (
          <BottomNavigationAction
            onClick={() => {
              toggleModal('points');
              captureEvent('openQuestionNotes');
            }}
            icon={<ObservationIcon width={20} height={20} color="#000000" />}
          />
        )}
        { question.selection_type === 'image'
          || (!reminderIsAccomplished || (reminderIsAccomplished && !isEmpty(images)))
          && (
          <BottomNavigationAction
            onClick={() => {
              toggleModal('images');
              captureEvent('openQuestionImages');
            }}
            icon={(
              <ImageIcon
                width={20}
                height={20}
                color="#000000"
                iconCheck={images.length > 0}
                iconWarning={
                  !reminderIsAccomplished
                  && images.length <= 0
                  && question.answer_extra_options?.is_image_required === true
                }
              />
            )}
          />
          )}

        { hasAuth && (!reminderIsAccomplished || (reminderIsAccomplished && !isEmpty(plan)))
          && (
          <BottomNavigationAction
            onClick={() => {
              toggleModal('plan');
              captureEvent('openQuestionActionPlan');
            }}
            icon={(
              <ActionPlanIcon
                width={20}
                height={20}
                color="#000000"
                iconCheck={!isEmpty(plan)}
                iconWarning={
                  !reminderIsAccomplished
                  && isEmpty(plan)
                  && question.answer_extra_options?.is_plan_required === true
                }
              />
            )}
          />
          )}

        { (!reminderIsAccomplished || (reminderIsAccomplished && questionObservation !== ''))
          && (
          <BottomNavigationAction
            onClick={() => {
              toggleModal('comments');
              captureEvent('openQuestionComment');
            }}
            icon={(
              <CommentIcon
                width={20}
                height={20}
                iconCheck={questionObservation !== ''}
                iconWarning={
                  !reminderIsAccomplished
                  && questionObservation === ''
                  && question.answer_extra_options?.is_comment_required === true
                }
              />
            )}
          />
          )}
      </BottomNavigation>

      {modalStatus.comments && (
        <CommentsModal
          setVisible={() => {
            toggleModal('comments');
            captureEvent('closeQuestionComment');
          }}
          visible={modalStatus.comments}
          observation={questionObservation}
          reminderIsAccomplished={reminderIsAccomplished}
          handleSetQuestionObservation={handleSetQuestionObservation}
          title={intl.messages['reminders.answers.comment_modal.title']}
          placeholder={
            intl.messages['reminders.answers.comment_modal.placeholder']
          }
          saveLabel={intl.messages['utils.save']}
          exitLabel={intl.messages['utils.exit']}
        />
      )}

      {modalStatus.points && (
        <PointsModal
          setVisible={() => {
            toggleModal('points');
            captureEvent('closeQuestionNotes');
          }}
          visible={modalStatus.points}
          title={intl.messages['forms.edit.question.observationPoints']}
          exitLabel={intl.messages['utils.exit']}
          description={question.description}
          pop={answerReminder?.reminder.form['pop']}
          fluxogram={answerReminder?.reminder.form['fluxogram']}
          externalLink={answerReminder?.reminder.form['external_link']}
        />
      )}

      {modalStatus.plan && (
        <PlansModal
          setVisible={() => {
            toggleModal('plan');
            captureEvent('closeQuestionActionPlan');
          }}
          visible={modalStatus.plan}
          basePlan={question.answer?.plan}
          intl={intl}
          reminderIsAccomplished={reminderIsAccomplished}
          setPlan={handleSetPlan}
          actionPlanUsers={actionPlanUsers}
        />
      )}
      {modalStatus.images && (
        <ImagesModal
          setVisible={() => {
            toggleModal('images');
            captureEvent('closeQuestionImages');
          }}
          visible={modalStatus.images}
          // eslint-disable-next-line dot-notation
          title={intl.messages['rel_images']}
          exitLabel={intl.messages['utils.exit']}
          images={images}
          handleUpdateReminderAnswers={handleUpdateReminderAnswers}
          answerQuestion={question}
          reminderIsAccomplished={reminderIsAccomplished}
        />
      )}
    </Box>
  );
};

export default injectIntl(ModalsContainer);
