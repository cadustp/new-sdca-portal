import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Box } from '@mui/material';
import SelectInput from '../../../../components/SelectInput';
import CustomModal from '../../../../components/CustomModal';
import '../../styles.css';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  open: boolean,
  stepIndex: number,
  positions: any,
};

type DispatchProps = {
  onClose: Function;
  onConfirm: Function;
};

const MoveStep: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  open,
  stepIndex,
  positions,
  onClose,
  onConfirm,
}) => {
  const [stepPosition, setStepPosition] = useState<any>(null);
  const confirmDisabled = stepPosition?.value === stepIndex || stepPosition === null;

  return (
    <>
      <CustomModal
        title={intl.messages['forms.edit.step.move']}
        open={open}
        onClose={() => { onClose(); }}
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
                  placeholder={intl.messages['forms.edit.position.select_placeholder']}
                  onChange={position => setStepPosition(position)}
                  items={positions}
                  selectedItems={stepPosition}
                />
              </div>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" gridGap="1.5rem" className="modal-footer">
            <Button
              onClick={() => { onClose(); }}
              variant="outlined"
            >
              {intl.messages['utils.cancel']}
            </Button>
            <Button
              onClick={() => {
                onConfirm({
                  currentIndex: stepIndex,
                  newIndex: stepPosition.value,
                });
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

export default injectIntl(MoveStep);
