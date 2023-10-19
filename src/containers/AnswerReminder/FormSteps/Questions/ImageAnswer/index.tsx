import { Box } from '@mui/material';
import React from 'react';
import InputImage from '../../../../../components/InputImage'
import { TQuestion, TImage } from '../../../../../types/reminder';

type Props = {
 handleUpdateReminderAnswers: Function;
 answerQuestion: TQuestion;
 reminderIsAccomplished: boolean;
};

const ImageAnswer: React.FC<Props> = ({  handleUpdateReminderAnswers, answerQuestion, reminderIsAccomplished }) => {
  const images = answerQuestion.answer.images || [];
  const addImage = (image: TImage) => {
    handleUpdateReminderAnswers({ answerQuestion, images: image, answerType: 'image' })
  };

  const removeImage = (_imagesUrl: Array<string>) => {
    handleUpdateReminderAnswers({ answerQuestion, images: [], answerType: 'image' })
  };

  return (
    <Box width="100%" pl={5} pr={5} pb={4} display="flex" flexDirection="column" alignItems="center">
      <InputImage reminderIsAccomplished={reminderIsAccomplished} images={images} isMultiple={false} deleteImage={removeImage} setImage={addImage} />
    </Box>
  );
};

export default ImageAnswer;
