import React from 'react';
import { injectIntl } from 'react-intl';
import { Button, Box } from '@mui/material';
import CustomModal from '../../../components/CustomModal';

import '../styles.css';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  open: boolean,
  name: string,
};

type DispatchProps = {
  onClose: Function;
  onConfirm: Function;
};

const DeleteModal: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  open,
  name,
  onClose,
  onConfirm,
}) => (
  <>
    <CustomModal
      title={intl.messages['forms.delete']}
      open={open}
      onClose={() => { onClose(); }}
      centerTitle
    >
      <>
        <Box>
          <Box display="flex" flexDirection="column" alignItems="center" my="40px">
            <p>{intl.messages['forms.delete.description']}</p>
            <br />
            <p><b>{name}</b></p>
            <br />
            <p>{intl.messages['forms.delete.warning']}</p>
            <p>{intl.messages['forms.delete.subdescription']}</p>
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
            onClick={() => onConfirm()}
            variant="contained"
          >
            {intl.messages['utils.confirm']}
          </Button>
        </Box>
      </>
    </CustomModal>
  </>
);

export default injectIntl(DeleteModal);
