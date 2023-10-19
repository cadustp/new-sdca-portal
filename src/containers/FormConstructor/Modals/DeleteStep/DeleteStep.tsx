import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Box, Input } from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import '../../styles.css';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  open: boolean,
  title: string,
  stepIndex: number,
};

type DispatchProps = {
  onClose: Function;
  onConfirm: Function;
};

const DeleteStep: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  open,
  title,
  stepIndex,
  onClose,
  onConfirm,
}) => {
  const [stepName, setStepName] = useState('');
  const confirmDisabled = title !== stepName;

  return (
    <>
      <CustomModal
        title={intl.messages['forms.edit.step.delete']}
        open={open}
        onClose={() => { onClose(); setStepName(''); }}
        centerTitle
        disableBackdropClick
      >
        <>
          <Box>
            <Box display="flex" flexDirection="column" alignItems="center" my="40px">
              <p>
                {intl.messages['forms.edit.step.deleteModal.message1']}
              </p>
              <p><b>{title}</b></p>
              <br />
              <p>{intl.messages['forms.edit.step.deleteModal.message2']}</p>
              <p>{intl.messages['forms.edit.step.deleteModal.message3']}</p>
            </Box>
            <Box>
              <div className="sd-input-container">
                <Input
                  style={{ width: '100%' }}
                  onChange={event => setStepName(event.target.value)}
                  value={stepName}
                  disableUnderline
                  placeholder={`${intl.messages['forms.edit.step.deleteModal.label']}`}
                />
              </div>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" gridGap="1.5rem" className="modal-footer">
            <Button
              onClick={() => { onClose(); setStepName(''); }}
              variant="outlined"
            >
              {intl.messages['utils.cancel']}
            </Button>
            <Button
              onClick={() => {
                onConfirm({
                  stepIndex,
                });
                setStepName('');
              }}
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

export default injectIntl(DeleteStep);
