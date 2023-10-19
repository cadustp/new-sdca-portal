export enum featuresTypes {
  GET_FEATURES_REQUEST = 'GET_FEATURES_REQUEST',
  UPDATE_FEATURES_USER_REQUEST = 'UPDATE_FEATURES_USER_REQUEST',
  FEATURES_REQUEST_RESPONSE = 'FEATURES_REQUEST_RESPONSE'
}

export interface FeatureUser {
  id: number,
  title: string,
  translation_key: string,
  routes: object,
  preview: boolean 
};
export interface FeaturesState {
  features: Array<FeatureUser> | [],
  isLoading: boolean
}
