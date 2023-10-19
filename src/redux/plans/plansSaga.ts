import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import moment from '../../timezones/moment';
import apiService from '../../services/apiService';
import { stringfyActionPlansParams } from '../../helpers/api_service_helper'
import { plansRoute, userPlansRoute } from '../../services/routesService';
import { fetchPlansRoute } from '../../services/v2Routes';
import {
  fetchPlansList,
  fetchPlansError,
  fetchUsersSuccess,
  setPlansList,
  filterUsers,
  Types,
  deletePlan as deletePlanGenerator,
  deletePlanSuccess,
  actionPlanCreationSuccess,
  actionPlanCreationError,
  fetchActionPlanSuccess,
} from './duck';

import { ACTION_PLAN_STATUSES, SNACKBAR_VARIANTS } from '../../helpers/consts';
import { showNotification } from '../app/duck';
import { ActionPlanFormState } from '../../features/ActionPlan/components/Modals/CreationModal';
import { ModalMessagesType } from '../../helpers/types';
import { removeDuplicatedUsers } from '../../helpers/utils';
import { captureEvent } from '../../analytics';

const aggregateActionPlansByStatus = actionPlansList => {
  const plansAggregatedByStatus = {};

  Object.values(ACTION_PLAN_STATUSES).forEach(status => {
    plansAggregatedByStatus[status.code] = {
      id: status.code,
      title: status.name,
      list: [],
    };
  });

  actionPlansList.forEach(actionPlan => {
    plansAggregatedByStatus[actionPlan.status].list.push(actionPlan);
  });

  return plansAggregatedByStatus;
};

const sortLists = aggregatedActionPlans => {
  Object.values(ACTION_PLAN_STATUSES).forEach(status => {
    aggregatedActionPlans[status.code].list.sort((a, b) => b.order - a.order);
  });
  return aggregatedActionPlans;
};

function formatBodyPlan(body: ActionPlanFormState) {
  return {
    form_id: body.form?.value,
    questions_id: body.questions.map(question => question.value),
    anomalies: [
      {
        description: body.anomaliesDescription,
        causes: body.causes.map(cause => cause.text),
      },
    ],
    plans_users_id: body.users.map(user => user.value),
    start_date: moment(body.startDate).toDate(),
    end_date: moment(body.endDate).toDate(),
    name: body.name,
    description: body.description,
  };
}

function* fetchPlans() {
  try {
    const sideFilter = yield select(state => state.plansSideFilters.sideFilterParams);
    const sideFilterParamsString = stringfyActionPlansParams(sideFilter);

    const response = yield call(apiService.get, `${fetchPlansRoute}${sideFilterParamsString}`);
    const formattedResponse = response.data.data.map(r => {
      return {
        ...r.attributes,
        id: r.id
      }
    });

    const aggregatedActionPlans = sortLists(aggregateActionPlansByStatus(formattedResponse));

    yield put(setPlansList({ plans: aggregatedActionPlans }));
  } catch (error: any) {
    yield put(fetchPlansError());
  }
}

function* updatePlan({
  payload: {
    errorMessage, successMessage, id, body,
  },
}) {
  const eventParams = {
    hasForm: !!body.form,
    questions: body.questions.length,
    hasAnomaly: !!body.anomaliesDescription,
    causes: body.causes?.filter(c => c.text.length).length,
    responsibles: body.users.length,
    hasBothDates: (!!body.startDate && !!body.endDate),
    hasDescription: !!body.description,
  };
  try {
    yield call(apiService.put, `plans/${id}`, formatBodyPlan(body));
    yield put(
      showNotification({
        message: successMessage,
        variant: SNACKBAR_VARIANTS.SUCCESS,
        duration: 5000,
      }),
    );
    yield put(actionPlanCreationSuccess());
    captureEvent('editActionPlan', { ...eventParams, status: 'success' });
  } catch (e) {
    yield put(
      showNotification({
        message: errorMessage,
        variant: SNACKBAR_VARIANTS.ERROR,
        duration: 5000,
      }),
    );
    captureEvent('editActionPlan', { ...eventParams, status: 'error', error: e.message });
  }
}

function* deletePlan({
  payload: {
    planId, successMessage, errorMessage, shouldRedirect,
  },
}: ReturnType<typeof deletePlanGenerator>) {
  try {
    if (planId) {
      yield call(apiService.delete, `${plansRoute}/${planId}`);
    }
    yield put(deletePlanSuccess());

    if (!shouldRedirect) {
      yield put(fetchPlansList());
    }
    yield put(filterUsers([]));
    yield put(
      showNotification({
        message: successMessage,
        variant: SNACKBAR_VARIANTS.SUCCESS,
        duration: 5000,
      }),
    );
    captureEvent('deleteActionPlan', { status: 'success' });
  } catch (e) {
    yield put(
      showNotification({
        message: errorMessage,
        variant: SNACKBAR_VARIANTS.ERROR,
        duration: 5000,
      }),
    );
    captureEvent('deleteActionPlan', { status: 'error', error: e.message });
  }
}

function* createActionPlan({
  payload: { body, messages },
}: {
  payload: { body: ActionPlanFormState; messages: ModalMessagesType };
}) {
  const eventParams = {
    hasForm: !!body.form,
    questions: body.questions.length,
    hasAnomaly: !!body.anomaliesDescription,
    causes: body.causes?.filter(c => c.text.length).length,
    responsibles: body.users.length,
    hasBothDates: (!!body.startDate && !!body.endDate),
    hasDescription: !!body.description,
  };
  try {
    yield call(apiService.post, plansRoute, formatBodyPlan(body));
    yield put(
      showNotification({
        message: messages.success,
        variant: SNACKBAR_VARIANTS.SUCCESS,
        duration: 5000,
      }),
    );
    yield put(actionPlanCreationSuccess());
    yield put(filterUsers([]));
    captureEvent('createActionPlan', { ...eventParams, status: 'success' });
  } catch (error: any) {
    yield put(
      showNotification({
        message: messages.error,
        variant: SNACKBAR_VARIANTS.ERROR,
        duration: 5000,
      }),
    );
    captureEvent('createActionPlan', { ...eventParams, status: 'error', error: error.message });
    yield put(actionPlanCreationError());
  }
}

function* moveCard({
  payload: {
    boardColumns, source, destination, errorMessage,
  },
}) {
  const sourceColumn = boardColumns[source.droppableId];
  const destinationColumn = boardColumns[destination.droppableId];
  const removedItem = sourceColumn.list[source.index];
  const newSourceList = sourceColumn.list.filter(
    (_, idx) => idx !== source.index,
  );
  const newDestinationList = [...destinationColumn.list];
  newDestinationList.splice(destination.index, 0, removedItem);

  try {
    const updatedState = {
      ...boardColumns,
      [sourceColumn.id]: {
        ...sourceColumn,
        list: newSourceList,
      },
      [destinationColumn.id]: {
        ...destinationColumn,
        list: newDestinationList,
      },
    };

    yield put(setPlansList({ plans: updatedState }));

    const { id } = sourceColumn.list[source.index];
    const data = newDestinationList.map((item, idx) => {
      let mappedItem;
      if (item.id == id) {
        mappedItem = {
          id: item.id,
          order: newDestinationList.length - idx,
          status: destinationColumn.id,
        };
      } else {
        mappedItem = {
          id: item.id,
          order: newDestinationList.length - idx,
        };
      }
      return mappedItem;
    });

    const body = { data };
    yield call(apiService.patch, `${plansRoute}`, body);
  } catch (e) {
    const updatedState = {
      ...boardColumns,
      [sourceColumn.id]: {
        ...sourceColumn,
      },
      [destinationColumn.id]: {
        ...destinationColumn,
      },
    };

    yield put(setPlansList({ plans: updatedState }));

    yield put(
      showNotification({
        message: errorMessage,
        variant: SNACKBAR_VARIANTS.ERROR,
      }),
    );
  }
}

function* reorderCard({ payload: { boardColumns, source, destination } }) {
  const sourceColumn = boardColumns[source.droppableId];

  const removedItem = sourceColumn.list[source.index];

  const list = sourceColumn.list.filter((_, idx) => idx !== source.index);

  list.splice(destination.index, 0, removedItem);

  try {
    const updatedState = {
      ...boardColumns,
      [sourceColumn.id]: {
        ...sourceColumn,
        list,
      },
    };
    yield put(setPlansList({ plans: updatedState }));

    const bodyData = list.map((item, idx) => ({
      id: item.id,
      order: list.length - idx,
    }));

    const body = { data: bodyData };
    yield call(apiService.patch, `${plansRoute}`, body);
  } catch (e) {}
}

function* fetchActionPlan({ payload: { planId } }) {
  try {
    const { data } = yield call(apiService.get, `${plansRoute}/${planId}`);

    const formatData: ActionPlanFormState = {
      form: {
        value: data.form?.id,
        label: data.form?.name,
      },
      name: data?.name,
      questions: data.form ? data.form.questions.map(question => ({
        value: question.id,
        label: question.question,
      })) : [],
      users: data.users ? data.users.reduce(removeDuplicatedUsers, []) : [],
      description: data?.description,
      anomaliesDescription: data.anomalies[0] ? data.anomalies[0].description : '',
      causes: data.anomalies[0] ? data.anomalies[0].causes.map(cause => ({
        key: cause.id,
        text: cause.description,
      })) : [],
      startDate: data.start_date ? moment(data?.start_date) : '',
      endDate: data.end_date ? moment(data?.end_date) : '',
    };
    yield put(fetchActionPlanSuccess({ actionPlan: formatData }));
  } catch (e) {}
}

function* fetchUsers() {
  try {
    const { data } = yield call(apiService.get, `${userPlansRoute}`);
    yield put(fetchUsersSuccess(data));
  } catch (e) {}
}

export default [
  // @ts-ignore
  takeLatest(Types.PLANS_START, fetchPlans),
  // @ts-ignore
  takeLatest(Types.FILTER_USERS, fetchPlans),
  // @ts-ignore
  takeLatest(Types.DELETE_PLAN_START, deletePlan),
  // @ts-ignore
  takeLatest(Types.CREATE_ACTION_PLAN_START, createActionPlan),
  // @ts-ignore
  takeLatest(Types.MOVE_CARD, moveCard),
  // @ts-ignore
  takeLatest(Types.REORDER_CARD, reorderCard),
  // @ts-ignore
  takeLatest(Types.FETCH_ACTION_PLAN_START, fetchActionPlan),
  // @ts-ignore
  takeLatest(Types.FETCH_USERS, fetchUsers),
  // @ts-ignore
  takeLatest(Types.UPDATE_PLAN, updatePlan),
];
