import { Reducer } from 'redux';
import { featuresTypes, FeaturesState } from './types';

const INITIAL_STATE: FeaturesState = {
  features: [],
  isLoading: false
};

const reducer: Reducer<FeaturesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case featuresTypes.UPDATE_FEATURES_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case featuresTypes.GET_FEATURES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case featuresTypes.FEATURES_REQUEST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        features: action.payload.data,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default reducer;
