import { action } from 'typesafe-actions';
import { featuresTypes } from './types';

export const getFeaturesRequest = () => action(
  featuresTypes.GET_FEATURES_REQUEST
);

export const updateFeaturesRequest = payload => action(
  featuresTypes.UPDATE_FEATURES_USER_REQUEST, payload
)

export const featuresRequestResponse = payload => action(
  featuresTypes.FEATURES_REQUEST_RESPONSE, payload
)