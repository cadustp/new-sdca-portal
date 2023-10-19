import { AppStates } from '../../helpers/consts';
import { ActionPlanFormState } from '../../features/ActionPlan/components/Modals/CreationModal';

export enum Types {
  CLEAR_ACTION_PLAN_MODAL = 'action-plan/CLEAR_ACTION_PLAN_MODAL',
  CLOSE_DELETION_MODAL = 'action_plans/CLOSE_DELETION_MODAL',
  CLOSE_FILTER_MODAL = 'action_plans/CLOSE_FILTER_MODAL',
  CREATE_ACTION_PLAN_ERROR = 'action-plan/CREATE_ACTION_PLAN_ERROR',
  CREATE_ACTION_PLAN_START = 'action-plan/CREATE_ACTION_PLAN_START',
  CREATE_ACTION_PLAN_SUCCESS = 'action-plan/CREATE_ACTION_PLAN_SUCCESS',
  DELETE_PLAN_START = 'action_plans/DELETE_PLAN_START',
  DELETE_PLAN_SUCCESS = 'action_plans/DELETE_PLAN_SUCCESS',
  FETCH_ACTION_PLAN_START = 'action-plan/FETCH_ACTION_PLAN_START',
  FETCH_ACTION_PLAN_SUCCESS = 'action-plan/FETCH_ACTION_PLAN_SUCCESS',
  FETCH_USERS_SUCCESS = 'action-plan/FETCH_USERS_START',
  FETCH_USERS = 'action-plan/FETCH_USERS',
  FILTER_USERS = 'action_plans/FILTER_USERS',
  FILTER_USERS_SUCCESS = 'action_plans/FILTER_USERS_SUCCESS',
  MOVE_CARD = 'action_plans/MOVE_CARD',
  OPEN_DELETION_MODAL = 'action_plans/OPEN_DELETION_MODAL',
  OPEN_FILTER_MODAL = 'action_plans/OPEN_FILTER_MODAL',
  PLANS_ERROR = 'action_plans/PLANS_ERROR',
  PLANS_START = 'action_plans/PLANS_START',
  PLANS_SUCCESS = 'action_plans/PLANS_SUCCESS',
  POPULATE_FILTER = 'action_plans/POPULATE_FILTER',
  REORDER_CARD = 'action_plans/REORDER_CARD',
  SET_CREATION_MODAL_VISIBILITY = 'action-plan/SET_CREATION_MODAL_VISIBILITY',
  FILTER_PERIOD = 'action-plan/FILTER_PERIOD',
  CLEAR_FILTER = 'action-plan/CLEAR_FILTER',
  UPDATE_PLAN = 'action-plan/UPDATE_PLAN',
}

export type DeletePlanAction = {
  planId: number;
  planName: string;
  successMessage: string;
  errorMessage: string;
  shouldRedirect?: boolean;
};

export type BoardColumns = {
  id: number;
  title: string;
  list: PlanBasicData[];
};

export type UpdatePlanAction = {
  boardColumns: BoardColumns;
  source: number;
  destination: number;
  errorMessage: string;
};

export type PlanBasicData = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  users: [
    {
      id: number;
      name: string;
      email: string;
    },
  ];
  status: number;
};

type CreationModal = {
  modalState: keyof typeof AppStates;
  isVisible: boolean;
  planId: number | null;
  data: ActionPlanFormState;
};

export type UserData = {
  id: number;
  name: string;
  email: string;
};

export type User = {
  id: number;
  name: string;
  select: boolean;
};

type FilterModal = {
  isVisible: boolean;
  users: User[];
  selectedUsers: number[];
};

interface ActionPlanInitialState {
  loading: boolean;
  error: boolean;
  users: UserData[];
  boardData: PlanBasicData[];
  startDate: string | null;
  endDate: string | null;
  deletionModal: {
    planToDelete: number | null;
    planName: string | null;
    visible: boolean;
  };
  creationModal: CreationModal;
  filterModal: FilterModal;
}

const initialState: ActionPlanInitialState = {
  loading: true,
  error: false,
  users: [] as UserData[],
  boardData: [] as PlanBasicData[],
  startDate: null,
  endDate: null,
  deletionModal: {
    planToDelete: null,
    planName: null,
    visible: false,
  },
  creationModal: {
    isVisible: false,
    planId: null,
    modalState: AppStates.IDLE,
    data: {} as ActionPlanFormState,
  },
  filterModal: {
    isVisible: false,
    users: [] as User[],
    selectedUsers: [] as number[],
  },
};

export type PlansReducer = typeof initialState;

export default (
  state: typeof initialState = initialState,
  action: Action,
): typeof initialState => {
  switch (action.type) {
    case Types.PLANS_START:
      return { ...state, loading: true, error: false };
    case Types.PLANS_SUCCESS: {
      return {
        ...state,
        loading: false,
        boardData: { ...action.payload.plans },
      };
    }
    case Types.PLANS_ERROR:
      return { ...state, error: true, loading: false };
    case Types.OPEN_DELETION_MODAL:
      return {
        ...state,
        deletionModal: {
          planToDelete: action.payload.planId,
          planName: action.payload.planName,
          visible: true,
        },
      };
    case Types.CLOSE_DELETION_MODAL:
      return {
        ...state,
        deletionModal: { ...state.deletionModal, visible: false },
      };
    case Types.CLOSE_FILTER_MODAL:
      return {
        ...state,
        filterModal: { ...state.filterModal, isVisible: false },
      };
    case Types.DELETE_PLAN_SUCCESS:
      return {
        ...state,
        deletionModal: {
          ...state.deletionModal,
          visible: false,
          planName: null,
          planToDelete: null,
        },
      };
    case Types.CREATE_ACTION_PLAN_START:
      return {
        ...state,
        creationModal: {
          ...state.creationModal,
          modalState: AppStates.LOADING,
        },
      };
    case Types.SET_CREATION_MODAL_VISIBILITY:
      return {
        ...state,
        creationModal: {
          ...state.creationModal,
          isVisible: action.payload.isVisible,
          planId: action.payload.planId,
        },
      };

    case Types.CREATE_ACTION_PLAN_SUCCESS:
      return {
        ...state,
        creationModal: {
          ...state.creationModal,
          isVisible: false,
          modalState: AppStates.SUCCESS,
        },
      };

    case Types.CREATE_ACTION_PLAN_ERROR:
      return {
        ...state,
        creationModal: {
          ...state.creationModal,
          modalState: AppStates.ERROR,
        },
      };
    case Types.FETCH_ACTION_PLAN_START:
      return {
        ...state,
        creationModal: {
          ...state.creationModal,
          modalState: AppStates.LOADING,
        },
      };
    case Types.FETCH_ACTION_PLAN_SUCCESS:
      return {
        ...state,
        creationModal: {
          ...state.creationModal,
          data: action.payload.actionPlan,
          modalState: AppStates.IDLE,
        },
      };
    case Types.CLEAR_ACTION_PLAN_MODAL:
      return {
        ...state,
        creationModal: {
          ...state.creationModal,
          data: {} as ActionPlanFormState,
          planId: null,
        },
      };
    case Types.OPEN_FILTER_MODAL:
      return {
        ...state,
        filterModal: {
          ...state.filterModal,
          isVisible: true,
        },
      };

    case Types.POPULATE_FILTER:
      return {
        ...state,
        filterModal: {
          ...state.filterModal,
          users: action.payload.users,
          isVisible: false,
        },
      };
    case Types.FILTER_USERS:
      return {
        ...state,
        filterModal: {
          ...state.filterModal,
          selectedUsers: action.payload.selectedUsers,
        },
      };
    case Types.FILTER_PERIOD:
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    case Types.FILTER_USERS_SUCCESS:
      return {
        ...state,
        filterModal: {
          ...state.filterModal,
          isVisible: false,
        },
      };
    case Types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
      };
    case Types.CLEAR_FILTER:
      return {
        ...state,
        filterModal: {
          ...state.filterModal,
          selectedUsers: [],
        },
      };
    case Types.UPDATE_PLAN:
      return {
        ...state,
        creationModal: {
          ...state.creationModal,
          modalState: AppStates.LOADING,
        },
      };
    default:
      return state;
  }
};

export const moveCard = ({
  boardColumns,
  source,
  destination,
  errorMessage,
}: UpdatePlanAction) =>
  ({
    type: Types.MOVE_CARD,
    payload: {
      boardColumns,
      source,
      destination,
      errorMessage,
    },
  } as const);

export const reorderCard = ({
  boardColumns,
  source,
  destination,
}: UpdatePlanAction) =>
  ({
    type: Types.REORDER_CARD,
    payload: {
      boardColumns,
      source,
      destination,
    },
  } as const);

export const fetchPlansList = () =>
  ({
    type: Types.PLANS_START,
  } as const);

export const fetchPlansError = () =>
  ({
    type: Types.PLANS_ERROR,
  } as const);

export const setPlansList = ({ plans }) =>
  ({
    type: Types.PLANS_SUCCESS,
    payload: { plans },
  } as const);

export const openDeletionModal = ({ planId, planName }) =>
  ({
    type: Types.OPEN_DELETION_MODAL,
    payload: { planId, planName },
  } as const);

export const openFilterModal = () =>
  ({
    type: Types.OPEN_FILTER_MODAL,
  } as const);

export const closeDeletionModal = () =>
  ({
    type: Types.CLOSE_DELETION_MODAL,
  } as const);

export const closeFilterModal = () =>
  ({
    type: Types.CLOSE_FILTER_MODAL,
  } as const);

export const deletePlan = ({
  planId,
  planName,
  successMessage,
  errorMessage,
  shouldRedirect = false,
}: DeletePlanAction) =>
  ({
    type: Types.DELETE_PLAN_START,
    payload: {
      planId,
      planName,
      successMessage,
      errorMessage,
      shouldRedirect,
    },
  } as const);

export const deletePlanSuccess = () =>
  ({
    type: Types.DELETE_PLAN_SUCCESS,
  } as const);

export const createActionPlan = ({ body, messages }) =>
  ({
    type: Types.CREATE_ACTION_PLAN_START,
    payload: { body, messages },
  } as const);

export type ModalVisibility = {
  isVisible: boolean;
  planId?: number | null;
};

export const setCreationModalVisibility = ({
  isVisible,
  planId = null,
}: ModalVisibility) =>
  ({
    type: Types.SET_CREATION_MODAL_VISIBILITY,
    payload: { isVisible, planId },
  } as const);

export const actionPlanCreationSuccess = () =>
  ({
    type: Types.CREATE_ACTION_PLAN_SUCCESS,
  } as const);

export const fetchActionPlan = ({ planId }) =>
  ({
    type: Types.FETCH_ACTION_PLAN_START,
    payload: { planId },
  } as const);

export const fetchActionPlanSuccess = ({ actionPlan }) =>
  ({
    type: Types.FETCH_ACTION_PLAN_SUCCESS,
    payload: { actionPlan },
  } as const);

export const actionPlanCreationError = () =>
  ({
    type: Types.CREATE_ACTION_PLAN_ERROR,
  } as const);

export const clearActionPlanModal = () =>
  ({
    type: Types.CLEAR_ACTION_PLAN_MODAL,
  } as const);

export const populateFilterData = ({ users }) =>
  ({
    type: Types.POPULATE_FILTER,
    payload: { users },
  } as const);

export const filterUsers = selectedUsers =>
  ({
    type: Types.FILTER_USERS,
    payload: { selectedUsers },
  } as const);

export const filterUsersSuccess = () =>
  ({
    type: Types.FILTER_USERS_SUCCESS,
  } as const);

export const fetchUsersSuccess = users =>
  ({
    type: Types.FETCH_USERS_SUCCESS,
    payload: { users },
  } as const);

export const fetchUsers = () =>
  ({
    type: Types.FETCH_USERS,
  } as const);

export const filterPeriod = ({ startDate, endDate }) =>
  ({
    type: Types.FILTER_PERIOD,
    payload: { startDate, endDate },
  } as const);

export const clearUserFilter = () =>
  ({
    type: Types.CLEAR_FILTER,
  } as const);

export const updatePlan = ({ body, id, errorMessage, successMessage }
: {body: ActionPlanFormState, id: number, errorMessage: string, successMessage: string}) =>
    ({
      type: Types.UPDATE_PLAN,
      payload: { body, id, errorMessage, successMessage },
    } as const);

type Action = ReturnType<
  | typeof setPlansList
  | typeof fetchPlansList
  | typeof fetchPlansError
  | typeof openDeletionModal
  | typeof closeDeletionModal
  | typeof deletePlan
  | typeof deletePlanSuccess
  | typeof moveCard
  | typeof createActionPlan
  | typeof setCreationModalVisibility
  | typeof actionPlanCreationError
  | typeof actionPlanCreationSuccess
  | typeof fetchActionPlan
  | typeof fetchActionPlanSuccess
  | typeof clearActionPlanModal
  | typeof openFilterModal
  | typeof closeFilterModal
  | typeof populateFilterData
  | typeof filterUsers
  | typeof filterUsersSuccess
  | typeof fetchUsersSuccess
  | typeof filterPeriod
  | typeof clearUserFilter
  | typeof updatePlan
>;
