/* eslint-disable import/prefer-default-export */

export const STATUSES = {
  PENDING: {
    id: 0,
    label: 'reminder_statuses.pending',
  },
  LATE: {
    id: 1,
    label: 'reminder_statuses.late',
  },
  ACCOMPLISHED: {
    id: 2,
    label: 'reminder_statuses.accomplished',
  },
  CANCELED: {
    id: 3,
    label: 'reminder_statuses.cancelled',
  },
  RESCHEDULED: {
    id: 'reschedule_code',
    label: 'reminder_statuses.rescheduled',
  },
};

export const REMINDER_TYPES = {
  HAS_ACTION_PLAN: {
    id: 0,
    label: 'reminder_types.action_plan',
  },
  HAS_FEEDBACK: {
    id: 1,
    label: 'reminder_types.feedback',
  },
  OTHER: {
    id: 2,
    label: 'reminder_types.other',
  },
};

export const FORM_TYPE = {
  DTO: 1,
  CHECKLIST: 2,
  TRAINING: 3,
};

export const SectionVariants = {
  hidden: {
    transition: {
      type: 'spring',
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  visible: {
    transition: {
      type: 'spring',
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
} as const;

export const ItemsVariants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
} as const;
