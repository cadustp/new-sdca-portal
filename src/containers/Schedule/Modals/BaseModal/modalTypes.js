import React from 'react'
import CancelReminderModal from '../CancelReminderModal';
import RescheduleReminderModal from '../RescheduleReminderModal';
import DeleteReminderModal from '../DeleteReminderModal';

const modalTypes = ({modalType, props}) => {
  switch (modalType) {
      case 'CANCEL':
        return <CancelReminderModal {...props} />
      case 'RESCHEDULE':
        return <RescheduleReminderModal {...props} />
      case 'DELETE':
        return <DeleteReminderModal {...props} />
  }
}

export default modalTypes;