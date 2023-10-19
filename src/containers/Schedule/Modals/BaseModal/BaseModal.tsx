import React from 'react';
import { captureEvent } from '../../../../analytics';
import CustomModal from '../../../../components/CustomModal';
import modalTypes from './modalTypes';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  title: string,
  isOpen: boolean,
  modalType: string,
};

type DispatchProps = {
  onClose: Function;
  selectReminders: Function;
};

const BaseModal: React.FC<Props & DispatchProps & StateProps> = props => {
  const {
    intl,
    isOpen,
    modalType,
    onClose,
    selectReminders,
    title,
  } = props;

  return (
    <CustomModal
      title={intl.messages[title]}
      open={isOpen}
      onClose={() => {
        captureEvent('closeModal', { type: modalType });
        onClose();
        selectReminders([]);
      }}
      centerTitle
    >
      { modalTypes({ modalType, props }) }
    </CustomModal>
  );
};

export default BaseModal;
