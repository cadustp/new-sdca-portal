import React, { useState } from 'react';
import { Box } from '@mui/material';
import CustomModal from '../../../../components/CustomModal';
import { StyledTextField } from '../../../../components/shared/Inputs/StyledInput';
import { Button } from './styles';
import { captureEvent } from '../../../../analytics';

type Props = {
  visible: boolean;
  observation: string;
  reminderIsAccomplished: boolean;
  setVisible: Function | any;
  handleSetQuestionObservation: Function;
  title: string;
  placeholder: string;
  saveLabel: string;
  exitLabel: string;
};

const CommentsModal: React.FC<Props> = ({
  visible,
  observation,
  setVisible,
  reminderIsAccomplished,
  handleSetQuestionObservation,
  title,
  placeholder,
  saveLabel,
  exitLabel,
}) => {
  const [valueTextArea, setValueTextArea] = useState<string>(observation);
  return (
    <CustomModal
      open={visible}
      title={title}
      onClose={setVisible}
      loading={false}
    >
      <Box width="100%" pt={5} pl={2} pr={2} pb={3}>
        <StyledTextField
          error={false}
          type="text"
          disabled={reminderIsAccomplished}
          onChange={e => setValueTextArea(e.target.value)}
          value={valueTextArea}
          placeholder={placeholder}
          multiline
          rows={4}
        />
        <Box
          pt={4}
          display="flex"
          justifyContent="flex-end"

        >
          <Box maxWidth="200px" width="100%" display="flex">
            <Button onClick={setVisible} isSave={false}>
              {exitLabel}
            </Button>
            <Box pl={2} />
            {!reminderIsAccomplished && (
              <Button
                onClick={() => {
                  handleSetQuestionObservation(valueTextArea);
                  captureEvent('saveQuestionComment', { hasText: !!valueTextArea });
                }}
                isSave
              >
                {saveLabel}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default CommentsModal;
